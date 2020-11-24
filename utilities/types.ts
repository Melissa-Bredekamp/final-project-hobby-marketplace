export type User = {
  id: number;
  passwordHash: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  interests: string;
  photo: string;
  email: string;
};

export type Hobby = {
  hobbyId: number;
  hobbyOffer: string;
  city: string;
  availability: string[];
  aboutMe: string;
  hostFirstName: string;
  hostLastName: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export type UserWithDate = {
  id: number;
  passwordHash: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  city: string;
  interests: string;
  photo: string;
  email: string;
};
