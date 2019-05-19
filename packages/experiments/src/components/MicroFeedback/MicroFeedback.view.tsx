/** @jsx withSlots */
import { Callout, IconButton, FocusZone, FocusZoneDirection, List, Stack, Text } from 'office-ui-fabric-react';
import { Button } from '../Button/Button';
import { IButtonTokens } from '../Button/Button.types';
import { withSlots, getSlots } from '../../Foundation';

import { IMicroFeedbackComponent, IMicroFeedbackProps, IMicroFeedbackSlots } from './MicroFeedback.types';

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

  const onRenderLikeCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      onCalloutDismiss();
      if (sendFollowUpIndex && index !== undefined && thumbsUpQuestion) {
        sendFollowUpIndex(thumbsUpQuestion!.id, index);
        onThanksShow();
      }
    };

    return (
      <Slots.followUpOption data-is-focusable={true} onClick={listOption} tokens={followUpOptionTokens}>
        <Slots.followUpOptionText>{`${item}`}</Slots.followUpOptionText>
      </Slots.followUpOption>
    );
  };

  const onRenderDislikeCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      onCalloutDismiss();
      if (sendFollowUpIndex && index !== undefined && thumbsDownQuestion) {
        sendFollowUpIndex(thumbsDownQuestion!.id, index);
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
      {thumbsUpQuestion && !hideThumbsUpCallout && (
        <Slots.followUpContainer
          gapSpace={0}
          onDismiss={onCalloutDismiss}
          role="alertdialog"
          setInitialFocus={true}
          target={likeRef.current}
        >
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {thumbsUpQuestion.question}
            </Slots.followUpQuestion>
            <Slots.followUpOptionList items={thumbsUpQuestion.options} onRenderCell={onRenderLikeCalloutItem} />
          </FocusZone>
        </Slots.followUpContainer>
      )}
      {thumbsDownQuestion && !hideThumbsDownCallout && (
        <Slots.followUpContainer
          gapSpace={0}
          onDismiss={onCalloutDismiss}
          role="alertdialog"
          setInitialFocus={true}
          target={dislikeRef.current}
        >
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {thumbsDownQuestion.question}
            </Slots.followUpQuestion>
            <Slots.followUpOptionList items={thumbsDownQuestion.options} onRenderCell={onRenderDislikeCalloutItem} />
          </FocusZone>
        </Slots.followUpContainer>
      )}
      {thanksText && isThanksVisible && (
        <Slots.thanksContainer
          setInitialFocus={false}
          target={likeRef.current}
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
