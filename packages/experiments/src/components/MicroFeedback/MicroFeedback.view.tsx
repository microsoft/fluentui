/** @jsx withSlots */
import { Callout, IconButton, FocusZone, FocusZoneDirection, List, Stack, Text } from 'office-ui-fabric-react';
import { Button } from '../Button/Button';
import { IButtonTokens } from '../Button/Button.types';
import { withSlots, getSlots } from '../../Foundation';

import { IMicroFeedbackComponent, IMicroFeedbackProps, IMicroFeedbackSlots, IMicroFeedbackQuestion } from './MicroFeedback.types';

export const MicroFeedbackView: IMicroFeedbackComponent['view'] = props => {
  const {
    children,
    sendFollowUpIndex,
    thumbsUpTitle,
    thumbsDownTitle,
    thumbsUpQuestion,
    thumbsDownQuestion,
    vote,
    isFollowUpVisible,
    isThanksVisible,
    likeRef,
    dislikeRef,
    onCalloutDismiss,
    onThanksDismiss,
    onThanksShow,
    onLikeVote,
    onDislikeVote,
    thanksText,
    inline
  } = props;

  const likeIcon = vote === 'like' ? 'LikeSolid' : 'Like';
  const dislikeIcon = vote === 'dislike' ? 'DislikeSolid' : 'Dislike';
  const hideThumbsDownCallout = vote !== 'dislike' || !isFollowUpVisible;
  const hideThumbsUpCallout = vote !== 'like' || !isFollowUpVisible;

  const Slots = getSlots<IMicroFeedbackProps, IMicroFeedbackSlots>(props, {
    root: Stack,
    iconContainer: Stack,
    followUpContainer: inline ? Stack : Callout,
    followUpQuestion: Text,
    followUpOptionList: List,
    followUpOption: Button,
    followUpOptionText: Text,
    thanksContainer: Callout
  });

  const followUpOptionTokens: IButtonTokens = { contentPadding: '6px 0px' };

  const onRenderFollowup = (question: IMicroFeedbackQuestion, targetRef: HTMLDivElement | null): JSX.Element => {
    const onRenderCalloutItem = (item: string, index: number | undefined): JSX.Element => {
      const listOption = (): void => {
        onCalloutDismiss();
        if (sendFollowUpIndex && index !== undefined && question) {
          sendFollowUpIndex(question!.id, index);
          onThanksShow();
        }
      };

      return (
        <Slots.followUpOption data-is-focusable={true} onClick={listOption} tokens={followUpOptionTokens}>
          <Slots.followUpOptionText>{`${item}`}</Slots.followUpOptionText>
        </Slots.followUpOption>
      );
    };

    return (
      <Slots.followUpContainer gapSpace={0} onDismiss={onCalloutDismiss} role="alertdialog" setInitialFocus={true} target={targetRef}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <Slots.followUpQuestion block variant="small">
            {question.question}
          </Slots.followUpQuestion>
          <Slots.followUpOptionList items={question.options} onRenderCell={onRenderCalloutItem} />
        </FocusZone>
      </Slots.followUpContainer>
    );
  };

  return (
    <Slots.root>
      <Slots.iconContainer horizontal>
        {children}
        <div ref={likeRef}>
          <IconButton menuIconProps={{ iconName: likeIcon }} title={thumbsUpTitle} onClick={onLikeVote} />
        </div>
        <div ref={dislikeRef}>
          <IconButton menuIconProps={{ iconName: dislikeIcon }} title={thumbsDownTitle} onClick={onDislikeVote} />
        </div>
      </Slots.iconContainer>
      {thumbsUpQuestion && !hideThumbsUpCallout && onRenderFollowup(thumbsUpQuestion, likeRef.current)}
      {thumbsDownQuestion && !hideThumbsDownCallout && onRenderFollowup(thumbsDownQuestion, dislikeRef.current)}
      {thanksText && isThanksVisible && (
        <Slots.thanksContainer
          setInitialFocus={false}
          target={vote === 'like' ? likeRef.current : dislikeRef.current}
          gapSpace={0}
          isBeakVisible={false}
          onDismiss={onThanksDismiss}
        >
          <Slots.followUpOptionText block variant="small">
            {thanksText}
          </Slots.followUpOptionText>
        </Slots.thanksContainer>
      )}
    </Slots.root>
  );
};
