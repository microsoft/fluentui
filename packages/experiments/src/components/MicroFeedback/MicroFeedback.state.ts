import * as React from 'react';
import { BaseState } from '../../utilities/BaseState';
import { IMicroFeedbackProps, IMicroFeedbackViewProps, VoteType } from './MicroFeedback.types';

export type IMicroFeedbackState = Pick<
  IMicroFeedbackViewProps,
  'vote' | 'isFollowUpVisible' | 'likeRef' | 'dislikeRef' | 'onCalloutDismiss' | 'onLikeVote' | 'onDislikeVote'
>;

export class MicroFeedbackState extends BaseState<IMicroFeedbackProps, IMicroFeedbackViewProps, IMicroFeedbackState> {
  private _likeRef = React.createRef<HTMLDivElement>();
  private _dislikeRef = React.createRef<HTMLDivElement>();

  constructor(props: MicroFeedbackState['props']) {
    super(props, {});

    this.state = {
      vote: 'no_vote',
      isFollowUpVisible: false,
      likeRef: this._likeRef,
      dislikeRef: this._dislikeRef,
      onCalloutDismiss: this._onCalloutDismiss,
      onLikeVote: this._onLikeVote,
      onDislikeVote: this._onDislikeVote
    };
  }

  private _onCalloutDismiss = (): void => {
    this.setState({ isFollowUpVisible: false });
  };

  private _onLikeVote = (): void => {
    this._vote('like');
  };

  private _onDislikeVote = (): void => {
    this._vote('dislike');
  };

  private _vote = (newVote: VoteType): void => {
    const { sendFeedback } = this.props;
    const { vote } = this.state;

    // If the vote that is already selected is picked, then toggle off
    const updatedVote: VoteType = vote === newVote ? 'no_vote' : newVote;
    this.setState({ isFollowUpVisible: true, vote: updatedVote });
    if (updatedVote !== 'no_vote' && sendFeedback) {
      sendFeedback(updatedVote);
    }
  };
}
