/** @jsx withSlots */
import { Button } from '@uifabric/experiments';
import { Callout, IconButton, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../Foundation';
import { getNativeProps, MicroFeedbackProperties } from '../../Utilities';
import { Icon } from '../../utilities/factoryComponents';

import { IMicroFeedbackComponent, IMicroFeedbackProps, IMicroFeedbackSlots, IMicroFeedbackViewProps } from './MicroFeedback.types';

export const MicroFeedbackView: IMicroFeedbackComponent['view'] = props => {
  const { thumbsUpTitle, thumbsDownTitle, thumbsUpQuestion, thumbsDownQuestion } = props;

  const likeIcon = this.state.vote === 'like' ? 'LikeSolid' : 'Like';
  const dislikeIcon = this.state.vote === 'dislike' ? 'DislikeSolid' : 'Dislike';
  const hideThumbsDownCallout = this.state.vote !== 'dislike' || !this.state.isFollowupVisible;
  const hideThumbsUpCallout = this.state.vote !== 'like' || !this.state.isFollowupVisible;

  this.classNames = getClassNames(this.props.styles, {
    theme: this.props.theme
  });

  const callout = (
    <Stack
      className={this.classNames.followUpContainer}
      role="alertdialog"
      gapSpace={0}
      /* target={this.likeRef} */
      setInitialFocus={true}
      onDismiss={this._onCalloutDismiss}
    />
  );

  const Slots = getSlots<IMicroFeedbackProps, IMicroFeedbackSlots>(props, {
    root: Stack,
    iconContainer: Stack,
    followUpContainer: _deriveFollowUpContainerType(props),
    followUpQuestion: Text,
    followUpOption: Button
  });

  return (
    <Slots.root>
      <Slots.iconContainer horizontal>
        {this.props.children}
        <div ref={this.likeRef}>
          <IconButton menuIconProps={{ iconName: likeIcon }} title={thumbsUpTitle} onClick={this._likeVote} />
        </div>
        <div ref={this.dislikeRef}>
          <IconButton menuIconProps={{ iconName: dislikeIcon }} title={thumbsDownTitle} onClick={this._dislikeVote} />
        </div>
      </Slots.iconContainer>
      {thumbsUpQuestion && !hideThumbsUpCallout ? (
        <Slots.followUpContainer>
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {this.props.thumbsUpQuestion.question}
            </Slots.followUpQuestion>
            <List
              items={this.props.thumbsUpQuestion.options}
              className={this.classNames.followUpOptionText}
              onRenderCell={this._onRenderCalloutItem}
            />
          </FocusZone>
          , this.classNames, this.likeRef.current, this._onCalloutDismiss
        </Slots.followUpContainer>
      ) : null}
      {thumbsDownQuestion && !hideThumbsDownCallout ? (
        <Slots.followUpContainer>
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {this.props.thumbsDownQuestion.question}
            </Slots.followUpQuestion>
            <List
              items={this.props.thumbsDownQuestion.options}
              className={this.classNames.followUpOptionText}
              onRenderCell={this._onRenderCalloutItem}
            />
          </FocusZone>
          , this.classNames, this.dislikeRef.current, this._onCalloutDismiss
        </Slots.followUpContainer>
      ) : null}
    </Slots.root>
  );
};

function _deriveFollowUpContainerType(props: IMicroFeedbackViewProps): any {
  return Callout;
}
