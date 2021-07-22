export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Contacts: undefined;
  ChatRoom: undefined;
  CallVoice: undefined;
  Login: undefined;
  Register: undefined;
  UpdateAccount: undefined;
  UserDetail: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
}

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type FriendParamList = {
  FriendRequest: undefined;
  FriendList: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MainTabParamList = {
  Friend: undefined;
  Chats: undefined;
  Call: undefined;
  Profile: undefined;
};


export type User = {
  _id: String;
  username: String;
  email: String;
  imageUri: any;
  status?: String;
  createdAt: string;
}

export type Message = {
  id: String;
  content: string;
  createdAt: string;
  user: User;
}

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
}