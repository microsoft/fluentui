import * as React from 'react';
import { IMicroFeedbackStyles, VoteType, MicroFeedback } from '@uifabric/experiments';

export class MicroFeedbackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const sendFeedbackCallback = (vote: VoteType) => {
      // can be sent to a backend that collects user feedback
      console.log('Logged vote type:', vote);
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
          likeIconTitle="Like"
          dislikeIconTitle="Dislike"
          thanksText="Thank you!"
          sendFeedback={sendFeedbackCallback}
        />
      </div>
    );
  }
}
