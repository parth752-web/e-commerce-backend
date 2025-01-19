export interface IFirebaseConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export const firebaseConfig = (): IFirebaseConfig => ({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('utf-8').replace(/\\n/g, '\n'),
});
