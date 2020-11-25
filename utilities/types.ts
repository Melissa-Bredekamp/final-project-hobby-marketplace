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

export type HobbySnakeCase = {
  hobby_id: number;
  hobby_offer: string;
  city: string;
  availability: string[];
  about_me: string;
  host_first_name: string;
  host_last_name: string;
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

export type Message = {
  messageId: number;
  senderId: string;
  recipientId: string;
  sentDate: string;
  subject: string;
  text: string;
};
