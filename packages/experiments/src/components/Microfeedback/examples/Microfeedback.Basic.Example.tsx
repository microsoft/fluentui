import * as React from 'react';
import { Microfeedback } from '../Microfeedback';
import { IMicrofeedbackQuestion } from '../Microfeedback.types';

export class MicrofeedbackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnThumbsDown: IMicrofeedbackQuestion = {
      options: ['Translation is incorrect', 'Context is incorrect', 'Language can be better'],
      question: 'Please help us improve'
    };

    const followUpOnThumbsUp: IMicrofeedbackQuestion = {
      options: ['Translation is great', 'Context is great'],
      question: 'Please help us improve'
    };

    return (
      <div>
        <Microfeedback
          ThumbsDownQuestion={followUpOnThumbsDown}
          ThumbsUpQuestion={followUpOnThumbsUp}
          thumbsUpTitle="Like"
          thumbsDownTitle="Dislike"
        />
      </div>
    );
  }
}
