export default interface IUserService {
  login(mail: string, password: string):
  Promise<{ status: number, message: string } | { status: null, message: string }>;
}
