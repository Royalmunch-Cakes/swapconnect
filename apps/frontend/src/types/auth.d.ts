export interface UserData {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  [key: string]: unknown;
}

export interface AuthResponse {
  user?: UserData;
  token?: string;
  error?: string;
  message?: string;
}
interface OtpVerifyResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
  };
  message?: string;
}
