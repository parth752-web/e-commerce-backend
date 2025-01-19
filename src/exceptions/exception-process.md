# Full Error Handling Process: Registering with an Invalid Email

This document explains the complete process from when an error occurs to how it is handled and returned to the client. We use the **"Invalid email during user registration"** example as a reference.

---

## **1. Error Detection**

When the user sends a request (e.g., POST `/users/register`), the server begins processing it. In this example:

1. **The user provides invalid data** (e.g., an invalid email format).
2. The `registerUser` function checks the email format using the `isValidEmail` function.
3. If the email is invalid, the function **throws an error** using a custom `BadRequestException`:

```typescript
if (!isValidEmail(userData.email)) {
    throw BadRequestException.VALIDATION_ERROR("Invalid email format provided");
}
```

At this point:
- The error is **created** and **thrown**.
- The error includes details like a message (`Invalid email format provided`) and a code (`1001`).

---

## **2. Error Creation**

When `BadRequestException.VALIDATION_ERROR()` is called, it creates an error object with detailed information:

1. The `VALIDATION_ERROR` static method is called:
   ```typescript
   static VALIDATION_ERROR = (msg?: string) => {
       return new BadRequestException({
           message: msg || 'Validation Error',
           code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
       });
   };
   ```
   - This method initializes the error with a **message** and a **code**.

2. The `BadRequestException` constructor is called:
   ```typescript
   constructor(exception: IException) {
       super(exception.message, HttpStatus.BAD_REQUEST, {
           cause: exception.cause,
           description: exception.description,
       });
       this.message = exception.message;
       this.code = exception.code;
       this.timestamp = new Date().toISOString();
   }
   ```
   - The constructor:
     - Sets properties like `message`, `code`, and `timestamp`.
     - Formats the error object to be **consistent**.

At this stage:
- The error object is **ready** and contains all the details.

---

## **3. Error Interception**

The error is now thrown and propagates up the call stack. NestJS provides an **exception filter** to catch such errors.

1. The custom `HttpExceptionFilter` catches the error:
   ```typescript
   @Catch(BadRequestException)
   export class HttpExceptionFilter implements ExceptionFilter {
       catch(exception: BadRequestException, host: ArgumentsHost) {
           const ctx = host.switchToHttp();
           const response = ctx.getResponse<Response>();
           const request = ctx.getRequest<Request>();

           exception.setTraceId(request.headers['x-trace-id'] || uuid());

           const errorResponse = exception.generateHttpResponseBody();

           response
               .status(HttpStatus.BAD_REQUEST)
               .json(errorResponse);
       }
   }
   ```

2. In this filter:
   - The error object is intercepted.
   - A **trace ID** (unique identifier for debugging) is added.
   - The error is formatted into a **response-friendly format** using `generateHttpResponseBody`.

---

## **4. Error Response Sent to Client**

After the filter processes the error, it sends a JSON response back to the client:

```json
{
    "code": 1001,
    "message": "Invalid email format provided",
    "description": "Validation Error",
    "timestamp": "2025-01-18T10:30:00.000Z",
    "traceId": "65b5f773-df95-4ce5-a917-62ee832fcdd0"
}
```

### Key Fields:
- **`code`**: The specific error code (e.g., `1001` for validation errors).
- **`message`**: A human-readable error message.
- **`description`**: A brief description of the error type.
- **`timestamp`**: When the error occurred.
- **`traceId`**: A unique identifier to trace the request in logs.

---

## **Summary of Flow**

1. **Error Detection**:
   - Code identifies an issue (e.g., invalid email).
   - An error is thrown (`BadRequestException`).

2. **Error Creation**:
   - The error is formatted into a detailed object (e.g., message, code, timestamp).

3. **Error Interception**:
   - The error is caught by the exception filter.
   - Additional details (like `traceId`) are added.
   - The error is prepared for the response.

4. **Error Response**:
   - A structured error response is sent to the client.
   - The client sees consistent error messages.

---

## **Benefits of This System**

- Standardized error responses.
- Easy to create common error types (using static methods).
- Built-in request tracing.
- Automatic timestamp generation.
- Swagger documentation support.
- Type safety with TypeScript.
- Easy to log and monitor errors.
- Consistent error handling across the application.

---

## **Error Types Available**

```typescript
// Examples of different error types you can use
throw BadRequestException.RESOURCE_NOT_FOUND("User not found");
throw BadRequestException.VALIDATION_ERROR("Invalid input");
throw BadRequestException.HTTP_REQUEST_TIMEOUT();
throw BadRequestException.TRIAL_EXPIRED("Your trial ended");
throw BadRequestException.SUBSCRIPTION_DISABLED("Please renew subscription");
```

This system ensures that:
1. Errors are caught and handled properly.
2. Error details are properly formatted.
3. Debugging information is included.
4. The client receives a consistent error response.
5. Errors can be easily tracked and monitored.
