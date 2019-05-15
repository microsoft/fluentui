import * as React from 'react';
import { IMicroFeedbackQuestion, VoteType, IMicroFeedbackStyles } from '../MicroFeedback.types';
import { MicroFeedback } from '../MicroFeedback';
import { Stack } from 'office-ui-fabric-react';

// tslint:disable:jsx-no-lambda

export class MicroFeedbackStackExample extends React.Component<{}, {}> {
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
        width: '100%'
      },
      iconContainer: {
        float: 'right'
      },
      followUpContainer: {
        background: '#f3f2f1'
      }
    };

    return (
      <MicroFeedback
        followUpContainer={render => render((ContainerType, props) => <Stack {...props as any} horizontal={false} />)}
        styles={microfeedbackStyles}
        thumbsDownQuestion={followUpOnThumbsDown}
        thumbsUpQuestion={followUpOnThumbsUp}
        thumbsUpTitle="Like"
        thumbsDownTitle="Dislike"
        sendFeedback={sendFeedbackCallback}
        sendFollowUpIndex={sendFollowupIndexCallback}
      />
    );
  }
}
