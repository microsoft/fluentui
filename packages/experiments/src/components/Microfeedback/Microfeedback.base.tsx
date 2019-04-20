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
import { Text, ITextStyles } from 'office-ui-fabric-react/lib/Text';
import {
  IMicrofeedbackProps,
  IMicrofeedbackViewProps,
  IMicrofeedbackStyleProps,
  IMicrofeedbackStyles,
  VoteType
} from './Microfeedback.types';
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
      border: '0px',
      width: '100%'
    }
  ]
};

const microfeedbackTextStyles: ITextStyles = {
  root: [
    {
      margin: '10px',
      fontWeight: 'bold'
    }
  ]
};

export interface IMicrofeedbackState extends IMicrofeedbackViewProps {
  vote: VoteType;
  isFollowupVisible: boolean;
}

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

    const classNames = getClassNames(this.props.styles, {
      theme: this.props.theme
    });

    const likeVote = () => {
      this._vote('like');
    };
    const dislikeVote = () => {
      this._vote('dislike');
    };

    return (
      <Stack className={classNames.root} horizontal styles={microfeedbackStyles}>
        <div ref={this.likeRef}>
          <IconButton menuIconProps={{ iconName: likeIcon }} title={this.props.thumbsUpTitle} onClick={likeVote} />
        </div>
        <div ref={this.dislikeRef}>
          <IconButton menuIconProps={{ iconName: dislikeIcon }} title={this.props.thumbsDownTitle} onClick={dislikeVote} />
        </div>
        {this.props.thumbsUpQuestion ? (
          <Callout
            hidden={hideThumbsUpCallout}
            role="alertdialog"
            gapSpace={0}
            target={this.likeRef.current}
            setInitialFocus={true}
            onDismiss={this._onCalloutDismiss}
          >
            <FocusZone direction={FocusZoneDirection.vertical}>
              <Text block={true} styles={microfeedbackTextStyles} variant="small">
                {this.props.thumbsUpQuestion.question}
              </Text>
              <List items={this.props.thumbsUpQuestion.options} onRenderCell={this._onRenderCalloutItem} />
            </FocusZone>
          </Callout>
        ) : null}
        {this.props.thumbsDownQuestion ? (
          <Callout
            hidden={hideThumbsDownCallout}
            role="alertdialog"
            gapSpace={0}
            target={this.dislikeRef.current}
            setInitialFocus={true}
            onDismiss={this._onCalloutDismiss}
          >
            <FocusZone direction={FocusZoneDirection.vertical}>
              <Text block={true} styles={microfeedbackTextStyles} variant="small">
                {this.props.thumbsDownQuestion.question}
              </Text>
              <List items={this.props.thumbsDownQuestion.options} onRenderCell={this._onRenderCalloutItem} />
            </FocusZone>
          </Callout>
        ) : null}
      </Stack>
    );
  }

  private _onCalloutDismiss = (): void => {
    this.setState({ isFollowupVisible: false });
  };

  private _onRenderCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      this._onCalloutDismiss();
      if (this.props.sendFollowupIndex) {
        this.props.sendFollowupIndex(index!);
      }
    };

    return (
      <DefaultButton data-is-focusable={true} styles={microfeedbackItemStyles} onClick={listOption}>
        <Text variant="small">{`${item}`}</Text>
      </DefaultButton>
    );
  };

  private _vote(vote: VoteType): void {
    // If the vote that is already selected is picked, then toggle off
    const updatedVote: VoteType = this.state.vote === vote ? 'no_vote' : vote;
    this.setState({ isFollowupVisible: true, vote: updatedVote });
    if (updatedVote !== 'no_vote' && this.props.sendFeedback) {
      this.props.sendFeedback(vote);
    }
  }
}
