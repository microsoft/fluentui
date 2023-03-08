import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import ChatExampleHeader from '../../examples/components/Chat/Content/ChatExampleHeader.shorthand';
import ChatExampleHeaderOverride from '../../examples/components/Chat/Content/ChatExampleHeaderOverride.shorthand';
import ChatExampleReactionGroup from '../../examples/components/Chat/Content/ChatExampleReactionGroup.shorthand';
import ChatExampleReadStatus from '../../examples/components/Chat/Content/ChatExampleReadStatus.shorthand';
import ChatExampleRtl from '../../examples/components/Chat/Rtl/ChatExample.rtl';
import ChatExampleComfyRefresh from '../../examples/components/Chat/Types/ChatExampleComfyRefresh';
import ChatExampleCompact from '../../examples/components/Chat/Types/ChatExampleCompact';
import ChatExampleContentPosition from '../../examples/components/Chat/Types/ChatExampleContentPosition.shorthand';
import ChatMessageExampleStyled from '../../examples/components/Chat/Types/ChatMessageExampleStyled.shorthand';

export default { component: Chat, title: 'Chat' } as ComponentMeta<typeof Chat>;

export {
  ChatExampleHeader,
  ChatExampleHeaderOverride,
  ChatExampleReactionGroup,
  ChatExampleReadStatus,
  ChatExampleRtl,
  ChatExampleComfyRefresh,
  ChatExampleCompact,
  ChatExampleContentPosition,
  ChatMessageExampleStyled,
};
