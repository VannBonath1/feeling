export interface AuthenticatedRequest extends Request {
  user: UserTestAuth;
}
export interface UserTestAuth {
  userTestAuthId: number;
  name: string;
}
