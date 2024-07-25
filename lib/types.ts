import { ImageSourcePropType } from "react-native";

export interface NewsFeedItem {
  posted_by: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  avatar: ImageSourcePropType;
}

export interface MessageType {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

type Coordinates = {
  latitude: string;
  longitude: string;
};

type Timezone = {
  offset: string;
  description: string;
};

type Street = {
  number: number;
  name: string;
};

type Location = {
  city: string;
  coordinates: Coordinates;
  country: string;
  postcode: number;
  state: string;
  street: Street;
  timezone: Timezone;
};

type Login = {
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  uuid: string;
};

type Name = {
  first: string;
  last: string;
  title: string;
};

type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

type Dob = {
  age: number;
  date: string;
};

type Registered = {
  age: number;
  date: string;
};

type Id = {
  name: string;
  value: string;
};

export type User = {
  cell: string;
  dob: Dob;
  email: string;
  gender: string;
  id: Id;
  location: Location;
  login: Login;
  name: Name;
  nat: string;
  phone: string;
  picture: Picture;
  registered: Registered;
};
