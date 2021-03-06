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
  messages: string;
};

export type Message = {
  senderId: number;
  subject: string;
  text: string;
  hostFirstName: string;
  hostLastName: string;
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
  messages: string;
};

export type Hobby = {
  id: number;
  hobbyId: number;
  hobbyOffer: string;
  city: string;
  availability: string[];
  hobbyPhoto: string;
  aboutMe: string;
  hostFirstName: string;
  hostLastName: string;
};

export type HobbySnakeCase = {
  userId: number;
  hobby_id: number;
  hobby_offer: string;
  city: string;
  availability: string[];
  hobby_photo: string;
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

export type MessageSnakeCase = {
  messageId: number;
  senderId: string;
  subject: string;
  text: string;
  host_first_name: string;
  host_last_name: string;
};

export type Conversations = {
  messageId: number;
  senderId: string;
  subject: string[];
  text: string[];
  host_first_name: string;
  host_last_name: string;
};
