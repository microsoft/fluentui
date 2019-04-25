import * as React from 'react';
import { MicroFeedback } from '../MicroFeedback';
import { IMicroFeedbackQuestion, VoteType, IMicroFeedbackStyles } from '../MicroFeedback.types';

export class MicroFeedbackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnThumbsDown: IMicroFeedbackQuestion = {
      options: ['Translation is incorrect', 'Context is incorrect', 'Language can be better'],
      question: 'Please help us improve'
    };

    const followUpOnThumbsUp: IMicroFeedbackQuestion = {
      options: ['Translation is great', 'Context is great'],
      question: 'Please help us improve'
    };

    const sendFeedbackCallback = (vote: VoteType) => {
      console.log('Logged vote type:', vote);
    };

    const sendFollowupIndexCallback = (index: number) => {
      console.log('Logged selection index:', index);
    };

    const microfeedbackStyles: IMicroFeedbackStyles = {
      root: {
        float: 'left'
      }
    };
    return (
      <div>
        <MicroFeedback
          styles={microfeedbackStyles}
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
