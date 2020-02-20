export type UserStatus = 'Available' | 'DoNotDisturb' | 'Away' | 'Offline';

export interface UserData {
  id: string;
  avatar: string;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}

export interface MessageData {
  id: string;
  content: string;
  date: Date;
  timestamp: string;
  timestampLong: string;
  from: string;
  isImportant: boolean;
  mine: boolean;
  withAttachment?: boolean;
}

export interface ChatData {
  id: string;
  currentUser: UserData;
  isOneOnOne: boolean;
  members: Map<string, UserData>;
  messages: MessageData[];
  title: string;
}
