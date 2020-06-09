import * as React from 'react';
import { ChatMessageProps } from '@fluentui/react-northstar';

export const groupControlMessageItems: ChatMessageProps[] = [
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe2</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe3</a> to the team
      </div>
    ),
  },
];

export const mainControlMessage: ChatMessageProps = {
  content: (
    <div>
      <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> and 2 other to the team
    </div>
  ),
};
