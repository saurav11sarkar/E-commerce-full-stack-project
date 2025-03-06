export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  bio: string;
  profession: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IEditProfile {
  userId: string;
  username: string;
  profileImage: string;
  bio: string;
  profession: string;
}
