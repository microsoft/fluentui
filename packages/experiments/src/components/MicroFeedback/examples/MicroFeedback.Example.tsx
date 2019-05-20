import * as React from 'react';
import { MicroFeedback } from '../MicroFeedback';
import { VoteType, IMicroFeedbackStyles } from '../MicroFeedback.types';

export class MicroFeedbackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const sendFeedbackCallback = (vote: VoteType) => {
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
