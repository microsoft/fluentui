import * as _ from 'lodash';
import { lorem, random, name, internet } from 'faker';
import { MessageData, UserData, ChatData, UserStatus, getTimestamp, getRandomDates } from '.';

export interface ChatOptions {
  userCount?: number;
  msgCount?: number;
}

const userStatuses: UserStatus[] = ['Available', 'Away', 'DoNotDisturb', 'Offline'];

class ChatMock {
  private static readonly minUserCount = 2;
  private static readonly defaultCount = 10;
  private static readonly daysAgo = 40;

  private userIds: string[] = [];
  private usersMap: Map<string, UserData> = new Map();
  private chatMessages: MessageData[] = [];
  public chat: ChatData;

  constructor(
    private options: ChatOptions = {
      userCount: ChatMock.defaultCount,
      msgCount: ChatMock.defaultCount,
    },
  ) {
    if (this.options.userCount < ChatMock.minUserCount) {
      throw `[ChatMock]: A chat has a minimum of ${ChatMock.minUserCount} users`;
    }

    this.userIds = _.times(this.options.userCount, random.uuid);

    this.userIds.forEach(id => {
      const firstName = name.firstName();
      const lastName = name.lastName();
      const user: UserData = {
        id,
        firstName,
        lastName,
        avatar: internet.avatar(),
        displayName: internet.userName(firstName, lastName),
        email: internet.email(firstName, lastName),
        status: userStatuses[_.random(userStatuses.length - 1)],
      };

      this.usersMap.set(id, user);
    });

    const currentUser = this.usersMap.get(this.userIds[0]);
    const dates = getRandomDates(this.options.msgCount, ChatMock.daysAgo);

    this.chatMessages = _.times(this.options.msgCount, id => {
      const mine = random.boolean();
      const from = (mine ? currentUser : this.getRandomUser()).id;
      const date = dates[id];
      const timestamp = getTimestamp(date);

      const message: MessageData = {
        id: String(id),
        from,
        mine,
        date,
        content: lorem.sentences(_.random(1, 5, false)),
        timestamp: timestamp.short,
        timestampLong: timestamp.long,
        isImportant: random.boolean(),
        withAttachment: random.boolean(),
      };

      return message;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    this.chat = {
      id: random.uuid(),
      currentUser,
      isOneOnOne: this.usersMap.size === ChatMock.minUserCount,
      messages: this.chatMessages,
      members: this.usersMap,
      title: `${currentUser.firstName} ${currentUser.lastName}`,
    };
  }

  private getRandomUser(max: number = this.usersMap.size - 1): UserData {
    return this.usersMap.get(this.userIds[random.number({ max, precision: 1 })]);
  }
}

export const getChatMock = (options?: ChatOptions) => new ChatMock(options);
