import { IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';

export const getStyles = (props: IKeytipStyleProps): IKeytipStyles => {
  const { theme, disabled } = props;
  return {
    container: [
      {
        backgroundColor: theme.palette.neutralDark
      },
      disabled && {
        opacity: 0.5,
      }
    ],
    root: [{
      textAlign: 'center',
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: theme.palette.neutralDark,
      color: theme.palette.neutralLight,
      minWidth: 11,
      lineHeight: 17,
      height: 17,
      display: 'inline-block'
    },
    disabled && {
      color: '#b1b1b1'
    }],
  };
};

export const getCalloutStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  return {
    container: [
    ],
    root: [{
      border: 'none'
    }],
    beak: [
    ],
    beakCurtain: [
    ],
    calloutMain: [
    ]
  };
};