export type User = {
  id: number;
  passwordHash: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  city: string;
  interests: string[];
  photo: string;
  email: string;
};

export type Hobby = {
  hobbyId: number;
  hobbyOffer: string;
  city: string;
  availability: string[];
  aboutMe: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};
