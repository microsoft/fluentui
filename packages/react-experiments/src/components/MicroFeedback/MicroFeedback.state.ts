import { IMicroFeedbackComponent, IMicroFeedbackViewProps, VoteType } from './MicroFeedback.types';
import { useRef, useState } from 'react';

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

  const onCalloutDismiss = (): void => {
    setIsFollowUpVisible(false);
  };

  const onThanksDismiss = (): void => {
    clearTimeout(timerHandle);
    setIsThanksVisible(false);
  };

  const processVote = (newVote: VoteType): void => {
    // If the vote that is already selected is picked, then toggle off
    const updatedVote: VoteType = vote === newVote ? 'no_vote' : newVote;
    setIsFollowUpVisible(true);
    setVote(updatedVote);
    if (updatedVote !== 'no_vote' && sendFeedback) {
      sendFeedback(updatedVote);
    }
  };

  const onLikeVote = (): void => {
    processVote('like');
  };

  const onDislikeVote = (): void => {
    processVote('dislike');
  };

  const hideThanksMessage = (): void => {
    setIsThanksVisible(false);
  };

  const onThanksShow = (): void => {
    setIsThanksVisible(true);

    // Hide the Thanks message after 2 seconds
    setTimerHandle((setTimeout(hideThanksMessage, 2000) as unknown) as number);
  };

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
