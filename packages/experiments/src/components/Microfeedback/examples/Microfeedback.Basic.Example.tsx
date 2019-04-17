import * as React from 'react';
import { Microfeedback } from '../Microfeedback';
import { IMicrofeedbackQuestion, VoteType } from '../Microfeedback.types';

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

    const sendFeedbackCallback = (vote: VoteType) => {
      console.log('Logged vote type:', vote);
    };

    const sendFollowupIndexCallback = (index: number) => {
      console.log('Logged selection index:', index);
    };

    return (
      <div>
        <Microfeedback
          thumbsDownQuestion={followUpOnThumbsDown}
          thumbsUpQuestion={followUpOnThumbsUp}
          thumbsUpTitle="Like"
          thumbsDownTitle="Dislike"
          sendFeedback={sendFeedbackCallback}
          sendFollowupIndex={sendFollowupIndexCallback}
        />
      </div>
    );
  }
}
