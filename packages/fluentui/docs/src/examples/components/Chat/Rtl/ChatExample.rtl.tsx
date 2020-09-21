import * as React from 'react';
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const items: ShorthandCollection<ChatItemProps> = [
  {
    message: (
      <Chat.Message content="مرحبا، يمكننا الحديث؟ من المهم!" author="John Doe" timestamp="بالأمس ، 10:15" mine />
    ),
    contentPosition: 'end',
    key: 'message-id-1',
  },
  {
    gutter: (
      <Avatar
        image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/ade.jpg"
        status={{ color: 'green', icon: <AcceptIcon /> }}
      />
    ),
    message: <Chat.Message content="تأكد منJohn. دعونا جدولة اجتماع." author="Jane Doe" timestamp="بالأمس ، 10:15" />,
    attached: 'top',
    key: 'message-id-2',
  },
];

const ChatExampleRtl = () => <Chat items={items} />;

export default ChatExampleRtl;
