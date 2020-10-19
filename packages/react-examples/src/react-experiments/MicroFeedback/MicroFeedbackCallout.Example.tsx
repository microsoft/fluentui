import * as React from 'react';
import { IMicroFeedbackQuestion, VoteType, MicroFeedback } from '@fluentui/react-experiments';

export class MicroFeedbackCalloutExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnDislike: IMicroFeedbackQuestion = {
      options: ['Translation is incorrect', 'Context is incorrect', 'Language can be better'],
      question: 'Please help us improve',
      id: 'dislike',
    };

    const followUpOnLike: IMicroFeedbackQuestion = {
      options: ['Translation is great', 'Context is great'],
      question: 'Please help us improve',
      id: 'like',
    };

    const sendFeedbackCallback = (vote: VoteType) => {
      // can be sent to a backend that collects user feedback
      console.log('Logged vote type:', vote);
    };

    const sendFollowupIndexCallback = (id: string, index: number) => {
      // can be sent to a backend that collects user feedback
      console.log('Logged selection index:', index, 'with id:', id);
    };

    return (
      <div>
        <MicroFeedback
          dislikeQuestion={followUpOnDislike}
          likeQuestion={followUpOnLike}
          likeIconTitle="Like"
          dislikeIconTitle="Dislike"
          /* eslint-disable react/jsx-no-bind */
          sendFeedback={sendFeedbackCallback}
          sendFollowUpIndex={sendFollowupIndexCallback}
          /* eslint-enable react/jsx-no-bind */
          thanksText="Thank you!"
        />
      </div>
    );
  }
}
