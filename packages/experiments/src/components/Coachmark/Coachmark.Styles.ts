import { IStyle } from '../../Styling';

export interface ICoachmarkStyleProps {

}

export interface ICoachmarkStyles {
  /**
  * Style for the root element in the default enabled/unchecked state.
  */
  root?: IStyle;

  /**
   * The pulsing beacon that animates when the coachmark
   * is collapsed.
   */
  pulsingBeacon?: IStyle;

  /**
   * The layer, or div, that the translate animation will be applied to.
   */
  translateAnimationContainer?: IStyle;

  /**
   * The layer the Scale animation will be applied to.
   */
  scaleAnimationLayer?: IStyle;

  /**
   * The layer the Rotate animation will be applied to.
   */
  rotateAnimationLayer?: IStyle;

  /**
   * The layer that content/components/elments will be hosted in.
   */
  layerHost?: IStyle;
};

export function CoachmarkWiggleSettingsOne() {
  return {
    animationDuration: '14s',
    animationTimingFunction: 'linear',
    animationDirection: 'normal',
    animationIterationCount: '1',
    animationDelay: '0s',
    animationFillMode: 'forwards',
  };
}

export function AnimationLayerSettings() {
  return {
    width: '100%',
    height: '100%'
  }
}

export function getStyles(props: ICoachmarkStyleProps): ICoachmarkStyles {
  return {
    root: {
      position: 'relative'
    },
    pulsingBeacon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '0px',
      height: '0px',
      borderRadius: '225px',
      borderStyle: 'solid',
      opacity: '0'
    },
    translateAnimationContainer: {

    },
    scaleAnimationLayer: {

    },
    rotateAnimationLayer: {

    },
    layerHost: {
      width: '100%',
      height: '100%',
      position: 'relative',
      outline: 'none',
      overflow: 'hidden'
    }
  };
}