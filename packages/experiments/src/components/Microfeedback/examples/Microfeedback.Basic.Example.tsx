import * as React from 'react';
import { Microfeedback } from '../Microfeedback';
import { MicrofeedbackQuestion } from '../Microfeedback.types';

export class MicrofeedbackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnThumbsDown = new MicrofeedbackQuestion();
    followUpOnThumbsDown.options = ['Translation is incorrect', 'Context is incorrect', 'Language can be better'];
    followUpOnThumbsDown.question = 'Please help us improve';
    const followUpOnThumbsUp = new MicrofeedbackQuestion();
    followUpOnThumbsUp.options = ['Translation is great', 'Context is great'];
    followUpOnThumbsUp.question = 'Please help us improve';

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
