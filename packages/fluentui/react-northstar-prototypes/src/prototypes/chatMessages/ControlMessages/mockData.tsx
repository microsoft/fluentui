import * as React from 'react';
import { ChatMessageProps } from '@fluentui/react-northstar';

export const groupControlMessageItems: ChatMessageProps[] = [
  {
    content: (
      <div>
        <a href="/">Cecil Folk</a> has added <a href="/">Robin Counts1</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">Cecil Folk</a> has added <a href="/">Robin Counts2</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">Cecil Folk</a> has added <a href="/">Robin Counts3</a> to the team
      </div>
    ),
  },
];

export const mainControlMessage: ChatMessageProps = {
  content: (
    <div>
      <a href="/">Cecil Folk</a> has added <a href="/">Robin Counts1</a> and 2 other to the team
    </div>
  ),
};
