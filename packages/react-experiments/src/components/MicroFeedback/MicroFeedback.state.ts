import * as React from 'react';
import type { IMicroFeedbackComponent, IMicroFeedbackViewProps, VoteType } from './MicroFeedback.types';

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

export const useMicroFeedbackState: IMicroFeedbackComponent['state'] = props => {
  const { sendFeedback } = props;
  const likeRef = React.useRef<HTMLDivElement | null>(null);
  const dislikeRef = React.useRef<HTMLDivElement | null>(null);
  const [timerHandle, setTimerHandle] = React.useState<number | undefined>(undefined);
  const [vote, setVote] = React.useState<VoteType>('no_vote');
  const [isFollowUpVisible, setIsFollowUpVisible] = React.useState(false);
  const [isThanksVisible, setIsThanksVisible] = React.useState(false);

  const onCalloutDismiss = React.useCallback((): void => {
    setIsFollowUpVisible(false);
  }, []);

  const onThanksDismiss = React.useCallback((): void => {
    clearTimeout(timerHandle);
    setIsThanksVisible(false);
  }, [timerHandle]);

  const processVote = React.useCallback(
    (newVote: VoteType): void => {
      // If the vote that is already selected is picked, then toggle off
      const updatedVote: VoteType = vote === newVote ? 'no_vote' : newVote;
      setIsFollowUpVisible(true);
      setVote(updatedVote);
      if (updatedVote !== 'no_vote' && sendFeedback) {
        sendFeedback(updatedVote);
      }
    },
    [sendFeedback, vote],
  );

  const onLikeVote = React.useCallback((): void => {
    processVote('like');
  }, [processVote]);

  const onDislikeVote = React.useCallback((): void => {
    processVote('dislike');
  }, [processVote]);

  const hideThanksMessage = React.useCallback((): void => {
    setIsThanksVisible(false);
  }, []);

  const onThanksShow = React.useCallback((): void => {
    setIsThanksVisible(true);

    // Hide the Thanks message after 2 seconds
    setTimerHandle(setTimeout(hideThanksMessage, 2000) as unknown as number);
  }, [hideThanksMessage]);

  const viewProps: IMicroFeedbackViewProps = {
    ...props,
    vote,
    isFollowUpVisible,
    likeRef,
    dislikeRef,
    onCalloutDismiss,
    onThanksDismiss,
    onThanksShow,
    onLikeVote,
    onDislikeVote,
    isThanksVisible,
  };
  return viewProps;
};
