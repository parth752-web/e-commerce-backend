export interface IAuthConfig {
  emailVerificationValidityDisplayTime: string;
  resetPasswordValidityDisplayTime: string;
  emailVerificationValidityInMilliseconds: number;
  resetPasswordValidityInJwtFormat: string;
}

export const authConfig = (): IAuthConfig => ({
  emailVerificationValidityDisplayTime: process.env.EMAIL_VERIFICATION_VALIDITY_DISPLAY_TIME || '10 minutes',
  emailVerificationValidityInMilliseconds: parseInt(process.env.EMAIL_VERIFICATION_VALIDITY_IN_MILLISECONDS, 10) || 600000, // 10 minutes
  resetPasswordValidityDisplayTime: process.env.RESET_PASSWORD_VALIDITY_DISPLAY_TIME || '1 hour',
  resetPasswordValidityInJwtFormat: process.env.RESET_PASSWORD_VALIDITY_IN_JWT_FORMAT || '1h',
});
