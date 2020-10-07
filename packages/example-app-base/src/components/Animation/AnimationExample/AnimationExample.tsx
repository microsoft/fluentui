import * as React from 'react';
import { mergeStyleSets, css, Icon, IIconStyles, IStyleSet } from '@fluentui/react';
import { NeutralColors, MotionDurations, MotionTimings, Depths } from '@fluentui/theme';
import { IAnimationExampleProps } from './AnimationExample.types';

const styles = mergeStyleSets({
  root: {
    alignItems: 'center',
    backgroundColor: NeutralColors.gray30,
    cursor: 'pointer',
    display: 'flex',
    height: 164,
    width: 164,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  playButton: {
    backgroundColor: NeutralColors.white,
    borderRadius: '50%',
    border: 'none',
    height: 32,
    margin: 0,
    padding: 0,
    pointerEvents: 'none',
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 32,
    zIndex: 120,
    transition: `opacity ${MotionDurations.duration2} ${MotionTimings.standard}`,
    selectors: {
      ':focus': {
        outline: 'none',
      },
    },
  },
  isHidden: {
    opacity: '0.6',
  },
  element: {
    boxShadow: Depths.depth4,
    backgroundColor: NeutralColors.white,
    position: 'absolute',
  },
  notification: {
    width: 108,
    height: 56,
  },
  opacityOff: {
    opacity: 0,
  },
});

const iconStyles: IStyleSet<Partial<IIconStyles>> = {
  root: {
    position: 'relative',
    top: 1,
    left: 1,
    color: NeutralColors.gray110,
    fontSize: '20px',
  },
};

export interface IAnimationExampleState {
  isReadyToPlay: boolean;
  isAnimating: boolean;
}

export class AnimationExample extends React.Component<IAnimationExampleProps, IAnimationExampleState> {
  public state = {
    isReadyToPlay: true,
    isAnimating: false,
  };

  public render(): JSX.Element {
    const { animation } = this.props;
    const { isAnimating } = this.state;

    const modifiers: string[] = [];
    switch (animation) {
      case 'ms-motion-scaleDownIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      case 'ms-motion-scaleDownOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-fadeIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      case 'ms-motion-fadeOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-slideLeftOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-slideRightOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-slideLeftIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      case 'ms-motion-slideRightIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      case 'ms-motion-slideUpOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-slideDownOut':
        modifiers.push(styles.notification);
        break;
      case 'ms-motion-slideUpIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      case 'ms-motion-slideDownIn':
        modifiers.push(styles.opacityOff, styles.notification);
        break;
      default:
        break;
    }

    const modifierClasses = css(...modifiers);

    return (
      <div className={styles.root} onClick={this.play}>
        <button
          className={css(styles.playButton, {
            [styles.isHidden]: !this.state.isReadyToPlay,
          })}
        >
          <Icon styles={iconStyles} iconName="Play" />
        </button>
        <div className={css(styles.element, modifierClasses, isAnimating && animation)} />
      </div>
    );
  }

  public play = () => {
    // Hide the play overlay.
    this.setState({
      isReadyToPlay: false,
    });

    // Apply the animation.
    setTimeout(() => {
      this.setState({
        isAnimating: true,
      });
    }, 200);

    // Reset the animation.
    setTimeout(() => {
      this.setState({
        isAnimating: false,
      });
    }, 1400);

    // Show the play overlay.
    setTimeout(() => {
      this.setState({
        isReadyToPlay: true,
      });
    }, 1400);
  };
}
