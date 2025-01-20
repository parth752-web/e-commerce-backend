import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEmailContentService {
  APP_LOGO: string;

  APP_NAME: string;

  APP_PANEL_URL: string;

  EMAIL_VERIFICATION_VALIDITY_DISPLAY_TIME: string;

  RESET_PASSWORD_VALIDITY_DISPLAY_TIME: string;

  RESET_PASSWORD_BASE_URL: string;

  constructor(private readonly configService: ConfigService) {
    this.APP_LOGO = this.configService.get('app.logo');
    this.APP_NAME = this.configService.get('app.name');
    this.APP_PANEL_URL = this.configService.get('app.panelUrl');
    this.EMAIL_VERIFICATION_VALIDITY_DISPLAY_TIME = this.configService.get('auth.emailVerificationValidityDisplayTime');
    this.RESET_PASSWORD_VALIDITY_DISPLAY_TIME = this.configService.get('auth.resetPasswordValidityDisplayTime');
    this.RESET_PASSWORD_BASE_URL = `${this.APP_PANEL_URL}/auth/reset?token=`;
  }

  generateVerificationEmailContent(otp: number): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Sign Up for ${this.APP_NAME}</title>
        <style type="text/css">
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .logo {
                max-width: 100px;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 20px;
                padding: 20px;
                background-color: #f2f2f2;
                border-radius: 8px;
            }
            .code {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #2e6cb7;
            }
            .code span {
                font-size: 14px;
                font-weight: normal;
                color: #666666;
            }
            .footer {
                font-size: 12px;
                color: #999999;
                margin-top: 20px;
            } 
        </style>
    </head>
    <body>
        <div class="container">
            <img src="${this.APP_LOGO}" alt="${this.APP_NAME} Logo" class="logo">
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for signing up for ${this.APP_NAME}! To complete your registration, please enter the following verification code:</p>
                <p class="code">${otp} <span>(valid for ${this.EMAIL_VERIFICATION_VALIDITY_DISPLAY_TIME})</span></p>
                <p>If you did not sign up for ${this.APP_NAME}, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>This email was sent by ${this.APP_NAME}. Please do not reply to this email.</p>
                <p>You received this email because you registered for ${this.APP_NAME}.</p>
            </div>
        </div>
    </body>
    </html>    
    `;
  }

  generatePasswordResetEmailContent(name: string, accessToken: string): string {
    return `
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <title>Forgot Password for ${this.APP_NAME}</title>
       <style type="text/css">
           body {
               font-family: Arial, sans-serif;
               background-color: #f8f8f8;
           }
           .container {
               max-width: 600px;
               margin: 0 auto;
               padding: 20px;
               background-color: #ffffff;
               border-radius: 8px;
               box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
           }
           .logo {
               max-width: 100px;
               margin-bottom: 20px;
           }
           .content {
               margin-bottom: 20px;
               padding: 20px;
               background-color: #f2f2f2;
               border-radius: 8px;
           }
           .button {
               display: inline-block;
               padding: 10px 20px;
               background-color: #2e6cb7;
               color: #ffffff;
               border-radius: 4px;
               text-decoration: none;
           }
           .button:hover {
               background-color: #1c4e8e;
           }
           .button:active {
            color: #ffffff;
           }
           .footer {
               font-size: 12px;
               color: #999999;
               margin-top: 20px;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <img src="${this.APP_LOGO}" alt="${this.APP_NAME} Logo" class="logo">
           <div class="content">
               <p>Hello ${name},</p>
               <p>You have requested to reset your password for ${this.APP_NAME}. To complete the process, please click the button below:</p>
               <a href="${this.RESET_PASSWORD_BASE_URL}${accessToken}" class="button" style="color: #ffffff;">Reset Password</a>
               <p>This link is only valid for the next ${this.RESET_PASSWORD_VALIDITY_DISPLAY_TIME}.</p>
               <p>If you did not request to reset your password, please ignore this email.</p>
           </div>
           <div class="footer">
               <p>This email was sent by ${this.APP_NAME}. Please do not reply to this email.</p>
               <p>You received this email because you are a registered user of ${this.APP_NAME}.</p>
           </div>
       </div>
   </body>
   </html> 
   `;
  }
}
