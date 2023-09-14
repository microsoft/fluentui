import { useCallback, useRef, useState } from 'react';
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
  const likeRef = useRef<HTMLDivElement | null>(null);
  const dislikeRef = useRef<HTMLDivElement | null>(null);
  const [timerHandle, setTimerHandle] = useState<number | undefined>(undefined);
  const [vote, setVote] = useState<VoteType>('no_vote');
  const [isFollowUpVisible, setIsFollowUpVisible] = useState(false);
  const [isThanksVisible, setIsThanksVisible] = useState(false);

  const onCalloutDismiss = useCallback((): void => {
    setIsFollowUpVisible(false);
  }, []);

  const onThanksDismiss = useCallback((): void => {
    clearTimeout(timerHandle);
    setIsThanksVisible(false);
  }, [timerHandle]);

  const processVote = useCallback(
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

  const onLikeVote = useCallback((): void => {
    processVote('like');
  }, [processVote]);

  const onDislikeVote = useCallback((): void => {
    processVote('dislike');
  }, [processVote]);

  const hideThanksMessage = useCallback((): void => {
    setIsThanksVisible(false);
  }, []);

  const onThanksShow = useCallback((): void => {
    setIsThanksVisible(true);

    // Hide the Thanks message after 2 seconds
    setTimerHandle(setTimeout(hideThanksMessage, 2000) as unknown as number);
  }, [hideThanksMessage]);

  const viewProps: IMicroFeedbackViewProps = {
    ...props,
    vote: vote,
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
