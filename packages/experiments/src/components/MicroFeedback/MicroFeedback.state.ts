import * as React from 'react';
import { BaseState } from '../../utilities/BaseState';
import { IMicroFeedbackProps, IMicroFeedbackViewProps, VoteType } from './MicroFeedback.types';

export type IMicroFeedbackState = Pick<
  IMicroFeedbackViewProps,
  | 'vote'
  | 'isFollowUpVisible'
  | 'likeRef'
  | 'dislikeRef'
  | 'onCalloutDismiss'
  | 'onThanksDismiss'
  | 'onThanksShow'
  | 'onLikeVote'
  | 'onDislikeVote'
  | 'isThanksVisible'
>;

export class MicroFeedbackState extends BaseState<IMicroFeedbackProps, IMicroFeedbackViewProps, IMicroFeedbackState> {
  private _likeRef = React.createRef<HTMLDivElement>();
  private _dislikeRef = React.createRef<HTMLDivElement>();
  private _timerHandle?: number;

  constructor(props: MicroFeedbackState['props']) {
    super(props, {});

    this.state = {
      vote: 'no_vote',
      isFollowUpVisible: false,
      likeRef: this._likeRef,
      dislikeRef: this._dislikeRef,
      onCalloutDismiss: this._onCalloutDismiss,
      onThanksDismiss: this._onThanksDismiss,
      onThanksShow: this._onThanksShow,
      onLikeVote: this._onLikeVote,
      onDislikeVote: this._onDislikeVote,
      isThanksVisible: false
    };
  }

  private _onCalloutDismiss = (): void => {
    this.setState({ isFollowUpVisible: false });
  };

  private _onThanksDismiss = (): void => {
    clearTimeout(this._timerHandle);
    this.setState({ isThanksVisible: false });
  };

  private _onLikeVote = (): void => {
    this._vote('like');
  };

  private _onDislikeVote = (): void => {
    this._vote('dislike');
  };

  private _onThanksShow = (): void => {
    this.setState({ isThanksVisible: true });

    // Hide the Thanks message after 2 seconds
    this._timerHandle = setTimeout(this._hideThanksMessage, 2000);
  };

  private _hideThanksMessage = (): void => {
    this.setState({ isThanksVisible: false });
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
