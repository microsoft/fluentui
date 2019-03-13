/** @jsx withSlots */
import * as React from 'react';
import { withSlots } from '../../Foundation';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';

import { IMicrofeedbackComponent, IMicrofeedbackProps } from './Microfeedback.types';
import { IMicrofeedbackState } from './Microfeedback.state';

const stackStyles: IStackStyles = {
  root: [
    {
      background: 'white',
      opacity: 0.5,
      bottom: '0',
      color: 'black',
      position: 'absolute',
      right: '0',
      margin: 8,
      // padding: 8,
      border: '1px red solid'
    }
  ]
};

class Microfeedback extends React.Component<IMicrofeedbackProps, IMicrofeedbackState> {
  constructor(props: {}) {
    super(props);
    this.state = { isLiked: false, isDisliked: false };
  }

  public render() {
    const { isLiked, isDisliked } = this.state;

    const likeIcon = isLiked ? 'LikeSolid' : 'Like';
    const dislikeIcon = isDisliked ? 'DislikeSolid' : 'Dislike';

    return (
      <div>
        <div>
          {this.props.children}
          <Stack horizontal styles={stackStyles}>
            <IconButton menuIconProps={{ iconName: likeIcon }} onClick={this._onToggleLike} />
            <IconButton menuIconProps={{ iconName: dislikeIcon }} onClick={this._onToggleDislike} />
          </Stack>
        </div>
        {isDisliked && (
          <Stack styles={{ root: { padding: 8 } }}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <Text variant="large">What did you expect differently?</Text>
              <IconButton menuIconProps={{ iconName: 'ChromeClose' }} onClick={this._onToggleDislike} />
            </Stack>
            <Text variant="medium">Question 1?</Text>
            <Text variant="medium">Question 2?</Text>
          </Stack>
        )}
      </div>
    );
  }

  private _onToggleDislike() {
    console.log('setState');
    this.setState(state => {
      return { isDisliked: !state.isDisliked };
    });
  }

  private _onToggleLike() {
    console.log('setState');
    this.setState(state => {
      return { isLiked: !state.isLiked };
    });
  }
}

export const MicrofeedbackView: IMicrofeedbackComponent['view'] = props => {
  return (
    <div>
      <Microfeedback />
    </div>
  );
};
