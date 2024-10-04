import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { HighContrastSelectorBlack, HighContrastSelector } from '../../utilities/index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';
import { IPopoverComponentProps, IPopoverComponentStyles } from './Popover.types';

/**
 * @internal
 */
export const popoverClassNames: SlotClassNames<IPopoverComponentStyles> = {
  calloutContentRoot: 'fui-cart__calloutContentRoot',
  calloutDateTimeContainer: 'fui-cart__calloutDateTimeContainer',
  calloutContentX: 'fui-cart__calloutContentX',
  calloutBlockContainerCartesian: 'fui-cart__calloutBlockContainerCartesian',
  calloutBlockContainerNonCartesian: 'fui-cart__calloutBlockContainerNonCartesian',
  calloutBlockContainertoDrawShapefalse: 'fui-cart__calloutBlockContainertoDrawShapefalse',
  calloutBlockContainertoDrawShapetrue: 'fui-cart__calloutBlockContainertoDrawShapetrue',
  shapeStyles: 'fui-cart__shapeStyles',
  calloutlegendText: 'fui-cart__calloutlegendText',
  calloutContentYCartesian: 'fui-cart__calloutContentYCartesian',
  calloutContentYNonCartesian: 'fui-cart__calloutContentYNonCartesian',
  descriptionMessage: 'fui-cart__descriptionMessage',
  ratio: 'fui-cart__ratio',
  numerator: 'fui-cart__numerator',
  denominator: 'fui-cart__denominator',
  calloutInfoContainer: 'fui-cart__calloutInfoContainer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  calloutContentRoot: {
    display: 'contents',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('11px 16px 10px 16px'),
    backgroundColor: tokens.colorNeutralBackground1,
    backgroundBlendMode: 'normal, luminosity',
  },
  calloutDateTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calloutContentX: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: '16px',
    opacity: '0.8',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainerCartesian: {
    fontSize: tokens.fontSizeBase200,
    marginTop: '13px',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainerNonCartesian: {
    fontSize: tokens.fontSizeHero700,
    color: tokens.colorNeutralForeground2,
    paddingLeft: '8px',
    lineHeight: '22px',
    '& selectors': {
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
  },
  calloutBlockContainertoDrawShapefalse: {
    '& selectors': {
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
    paddingLeft: '8px',
  },
  calloutBlockContainertoDrawShapetrue: {
    display: 'flex',
  },
  shapeStyles: {
    marginRight: '8px',
  },
  calloutLegendText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: '16px',
    color: tokens.colorNeutralForeground2,
    '& selectors': {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  calloutContentYCartesian: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: 'bold',
    lineHeight: '22px',
    '& selectors': {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  calloutContentYNonCartesian: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: 'bold',
    lineHeight: '36px',
    '& selectors': {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  descriptionMessage: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: '10px',
    paddingTop: '10px',
    ...shorthands.borderTop(`1px solid ${tokens.colorNeutralStroke2}`),
  },
  ratio: {
    fontSize: tokens.fontSizeBase100,
    marginLeft: '6px',
    color: tokens.colorNeutralForeground1,
  },
  numerator: {
    fontWeight: tokens.fontWeightBold,
  },
  denominator: {
    fontWeight: tokens.fontWeightSemibold,
  },
  calloutInfoContainer: {
    paddingLeft: '8px',
  },
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const usePopoverStyles_unstable = (props: IPopoverComponentProps): IPopoverComponentStyles => {
  const baseStyles = useStyles();
  return {
    calloutContentRoot: mergeClasses(
      popoverClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot /*props.styles?. calloutContentRoot*/,
    ),
    calloutDateTimeContainer: mergeClasses(
      popoverClassNames.calloutDateTimeContainer,
      baseStyles.calloutDateTimeContainer /*props.styles?.calloutDateTimeContainer*/,
    ),
    calloutContentX: mergeClasses(
      popoverClassNames.calloutContentX,
      baseStyles.calloutContentX /*props.styles?.calloutContentX*/,
    ),
    calloutBlockContainerCartesian: mergeClasses(
      popoverClassNames.calloutBlockContainerCartesian,
      baseStyles.calloutBlockContainerCartesian /*props.styles?.calloutBlockContainerCartesian*/,
    ),
    calloutBlockContainerNonCartesian: mergeClasses(
      popoverClassNames.calloutBlockContainerNonCartesian,
      baseStyles.calloutBlockContainerNonCartesian /*props.styles?.calloutBlockContainerNonCartesian*/,
    ),
    calloutBlockContainertoDrawShapefalse: mergeClasses(
      popoverClassNames.calloutBlockContainertoDrawShapefalse,
      baseStyles.calloutBlockContainertoDrawShapefalse /*props.styles?.calloutBlockContainertoDrawShapefalse*/,
    ),
    calloutBlockContainertoDrawShapetrue: mergeClasses(
      popoverClassNames.calloutBlockContainertoDrawShapetrue,
      baseStyles.calloutBlockContainertoDrawShapetrue /*props.styles?.calloutBlockContainertoDrawShapetrue*/,
    ),
    shapeStyles: mergeClasses(popoverClassNames.shapeStyles, baseStyles.shapeStyles /*props.styles?.shapeStyles*/),
    calloutlegendText: mergeClasses(
      popoverClassNames.calloutlegendText,
      baseStyles.calloutLegendText /*props.styles?.calloutlegendText*/,
    ),
    calloutContentYCartesian: mergeClasses(
      popoverClassNames.calloutContentYCartesian,
      baseStyles.calloutContentYCartesian /*props.styles?.calloutContentYCartesian*/,
    ),
    calloutContentYNonCartesian: mergeClasses(
      popoverClassNames.calloutContentYNonCartesian,
      baseStyles.calloutContentYNonCartesian /*props.styles?.calloutContentYNonCartesian*/,
    ),
    descriptionMessage: mergeClasses(
      popoverClassNames.descriptionMessage,
      baseStyles.descriptionMessage /*props.styles?. descriptionMessage*/,
    ),
    ratio: mergeClasses(popoverClassNames.ratio, baseStyles.ratio /*props.styles?.ratio*/),
    numerator: mergeClasses(popoverClassNames.numerator, baseStyles.numerator /*props.styles?.numerator*/),
    denominator: mergeClasses(popoverClassNames.denominator, baseStyles.denominator /*props.styles?.denominator*/),
    calloutInfoContainer: mergeClasses(popoverClassNames.calloutInfoContainer, baseStyles.calloutInfoContainer),
  };
};
