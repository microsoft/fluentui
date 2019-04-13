/** @jsx withSlots */
import * as React from 'react';
import { withSlots } from '../../Foundation';
import { Stack } from '../../Stack';
import { IconButton, IButtonStyles, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';

import { IMicrofeedbackComponent, IMicrofeedbackProps } from './Microfeedback.types';
import { getTheme, mergeStyleSets, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { IMicrofeedbackState } from './Microfeedback.state';

import { initializeIcons } from '@uifabric/icons';

const theme = getTheme();

const microfeedbackStyles: IStackStyles = {
  root: [
    {
      margin: 8,
      float: 'right'
    }
  ]
};

const microfeedbackItemStyles: IButtonStyles = {
  root: [
    theme.fonts.small,
    {
      width: '100%',
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.light,
      fontSize: 12
    }
  ]
};

const styles = mergeStyleSets({
  title: [
    theme.fonts.medium,
    {
      margin: 8,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semibold
    }
  ],
  body: [
    theme.fonts.small,
    {
      margin: 6,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.regular
    }
  ]
});

class MicrofeedbackViewComponent extends React.Component<IMicrofeedbackProps, IMicrofeedbackState> {
  // ref's will be linked to each of the icons for callout placement
  private dislikeRef = React.createRef<HTMLDivElement>();
  private likeRef = React.createRef<HTMLDivElement>();

  constructor(props: IMicrofeedbackProps) {
    super(props);

    initializeIcons();

    this.state = {
      // initial state of icons is neutral and followup is not visible
      vote: 0,
      isFollowupVisible: false
    };
  }

  public render() {
    const likeIcon = this.state.vote > 0 ? 'LikeSolid' : 'Like';
    const dislikeIcon = this.state.vote < 0 ? 'DislikeSolid' : 'Dislike';
    const hideThumbsDownCallout = this.state.vote !== -1 || !this.state.isFollowupVisible;
    const hideThumbsUpCallout = this.state.vote !== 1 || !this.state.isFollowupVisible;
    const onCalloutDismiss = this._onCalloutDismiss.bind(this);

    return (
      <div>
        <Stack horizontal styles={microfeedbackStyles}>
          <div ref={this.likeRef}>
            <IconButton menuIconProps={{ iconName: likeIcon }} title={this.props.thumbsUpTitle} onClick={this._vote.bind(this, 1)} />
          </div>
          <div ref={this.dislikeRef}>
            <IconButton menuIconProps={{ iconName: dislikeIcon }} title={this.props.thumbsDownTitle} onClick={this._vote.bind(this, -1)} />
          </div>
        </Stack>
        {this.props.ThumbsUpQuestion ? (
          <Callout
            hidden={hideThumbsUpCallout}
            role="alertdialog"
            gapSpace={0}
            target={this.likeRef.current}
            setInitialFocus={true}
            onDismiss={onCalloutDismiss}
          >
            <div>
              <FocusZone direction={FocusZoneDirection.vertical}>
                <p className={styles.title}>{this.props.ThumbsUpQuestion.question}</p>
                <List items={this.props.ThumbsUpQuestion.options} onRenderCell={this._onRenderCalloutItem} />
              </FocusZone>
            </div>
          </Callout>
        ) : null}
        {this.props.ThumbsDownQuestion ? (
          <Callout
            hidden={hideThumbsDownCallout}
            role="alertdialog"
            gapSpace={0}
            target={this.dislikeRef.current}
            setInitialFocus={true}
            onDismiss={onCalloutDismiss}
          >
            <FocusZone direction={FocusZoneDirection.vertical}>
              <p className={styles.title}>{this.props.ThumbsDownQuestion.question}</p>
              <List items={this.props.ThumbsDownQuestion.options} onRenderCell={this._onRenderCalloutItem} />
            </FocusZone>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _onCalloutDismiss(): void {
    this.setState({ isFollowupVisible: false });
  }

  private _onRenderCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    return (
      <DefaultButton
        data-is-focusable={true}
        styles={microfeedbackItemStyles}
        text={`${item}`}
        onClick={this._listOptions.bind(this, index)}
      />
    );
  };

  private _listOptions(option: number): void {
    this._onCalloutDismiss();
    if (this.props.sendFollowupIndex) {
      this.props.sendFollowupIndex(option);
    }
  }

  private _vote(vote: number): void {
    // If the vote that is already selected is picked, then toggle off
    const updatedVote: number = this.state.vote === vote ? 0 : vote;
    this.setState({ isFollowupVisible: true, vote: updatedVote });
    if (updatedVote !== 0 && this.props.sendFeedback) {
      this.props.sendFeedback(vote);
    }
  }
}

export const MicrofeedbackView: IMicrofeedbackComponent['view'] = props => {
  return (
    <div>
      <MicrofeedbackViewComponent
        ThumbsDownQuestion={props.ThumbsDownQuestion}
        ThumbsUpQuestion={props.ThumbsUpQuestion}
        thumbsUpTitle={props.thumbsUpTitle}
        thumbsDownTitle={props.thumbsDownTitle}
      />
    </div>
  );
};
