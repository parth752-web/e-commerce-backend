export interface IGoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUrl?: string;
}

export const googleConfig = (): IGoogleConfig => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.GOOGLE_REDIRECT_URL,
});
