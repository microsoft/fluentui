import * as React from 'react';
import { IMicroFeedbackQuestion, VoteType, IMicroFeedbackStyles } from '../MicroFeedback.types';
import { MicroFeedbackCallout } from '../MicroFeedbackCallout';

export class MicroFeedbackCalloutExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnThumbsDown: IMicroFeedbackQuestion = {
      options: ['Translation is incorrect', 'Context is incorrect', 'Language can be better'],
      question: 'Please help us improve',
      id: 'dislike'
    };

    const followUpOnThumbsUp: IMicroFeedbackQuestion = {
      options: ['Translation is great', 'Context is great'],
      question: 'Please help us improve',
      id: 'like'
    };

    const sendFeedbackCallback = (vote: VoteType) => {
      console.log('Logged vote type:', vote);
    };

    const sendFollowupIndexCallback = (id: string, index: number) => {
      console.log('Logged selection index:', index, 'with id:', id);
    };

    const microfeedbackStyles: IMicroFeedbackStyles = {
      root: {
        float: 'left'
      }
    };
    return (
      <div>
        <MicroFeedbackCallout
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
