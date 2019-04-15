/** @jsx withSlots */
import * as React from 'react';
import { withSlots } from '../../Foundation';
import { Stack } from '../../Stack';
import { classNamesFunction } from '../../Utilities';
import { IconButton, IButtonStyles, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IMicrofeedbackProps, IMicrofeedbackStyleProps, IMicrofeedbackStyles, VoteType } from './Microfeedback.types';
import { IMicrofeedbackState } from './Microfeedback.state';
import { initializeIcons } from '@uifabric/icons';

const getClassNames = classNamesFunction<IMicrofeedbackStyleProps, IMicrofeedbackStyles>();

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
    {
      width: '100%'
    }
  ]
};

export class MicrofeedbackBase extends React.Component<IMicrofeedbackProps, IMicrofeedbackState> {
  // ref's will be linked to each of the icons for callout placement
  private dislikeRef = React.createRef<HTMLDivElement>();
  private likeRef = React.createRef<HTMLDivElement>();

  constructor(props: IMicrofeedbackProps) {
    super(props);

    initializeIcons();

    this.state = {
      // initial state of icons is neutral and followup is not visible
      vote: 'no_vote',
      isFollowupVisible: false
    };
  }

  public render() {
    const likeIcon = this.state.vote === 'like' ? 'LikeSolid' : 'Like';
    const dislikeIcon = this.state.vote === 'dislike' ? 'DislikeSolid' : 'Dislike';
    const hideThumbsDownCallout = this.state.vote !== 'dislike' || !this.state.isFollowupVisible;
    const hideThumbsUpCallout = this.state.vote !== 'like' || !this.state.isFollowupVisible;
    const onCalloutDismiss = this._onCalloutDismiss.bind(this);

    const classNames = getClassNames(this.props.styles, {
      theme: this.props.theme
    });

    return (
      <div className={classNames.root}>
        <Stack horizontal styles={microfeedbackStyles}>
          <div ref={this.likeRef}>
            <IconButton menuIconProps={{ iconName: likeIcon }} title={this.props.thumbsUpTitle} onClick={this._vote.bind(this, 'like')} />
          </div>
          <div ref={this.dislikeRef}>
            <IconButton
              menuIconProps={{ iconName: dislikeIcon }}
              title={this.props.thumbsDownTitle}
              onClick={this._vote.bind(this, 'dislike')}
            />
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
                <Stack padding={10}>
                  <Text variant="small">{this.props.ThumbsUpQuestion.question}</Text>
                </Stack>
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
              <Stack padding={10}>
                <Text variant="small">{this.props.ThumbsDownQuestion.question}</Text>
              </Stack>
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
      <DefaultButton data-is-focusable={true} styles={microfeedbackItemStyles} onClick={this._listOptions.bind(this, index)}>
        <Text variant="small">{`${item}`}</Text>
      </DefaultButton>
    );
  };

  private _listOptions(option: number): void {
    this._onCalloutDismiss();
    if (this.props.sendFollowupIndex) {
      this.props.sendFollowupIndex(option);
    }
  }

  private _vote(vote: VoteType): void {
    // If the vote that is already selected is picked, then toggle off
    const updatedVote: VoteType = this.state.vote === vote ? 'no_vote' : vote;
    this.setState({ isFollowupVisible: true, vote: updatedVote });
    if (updatedVote !== 'no_vote' && this.props.sendFeedback) {
      this.props.sendFeedback(vote);
    }
  }
}
