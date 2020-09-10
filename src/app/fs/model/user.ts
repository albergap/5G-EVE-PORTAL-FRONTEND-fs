export class User {

  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  toString(): string {
    return 'User: [email = ' + this.email + ', password = ' + this.password +
      ', accessToken = ' + this.accessToken + ', refreshToken = ' + this.refreshToken + ']';
  }

}
