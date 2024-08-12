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
  calloutBlockContainer: 'fui-cart__calloutBlockContainer',
  calloutBlockContainertoDrawShapefalse: 'fui-cart__calloutBlockContainertoDrawShapefalse',
  calloutBlockContainertoDrawShapetrue: 'fui-cart__calloutBlockContainertoDrawShapetrue',
  shapeStyles: 'fui-cart__shapeStyles',
  calloutlegendText: 'fui-cart__calloutlegendText',
  calloutContentY: 'fui-cart__calloutContentY',
  descriptionMessage: 'fui-cart__descriptionMessage',
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
  calloutBlockContainer: {
    fontSize: 'fontSizeBase400',
    marginTop: '13px',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainertoDrawShapefalse: {
    selectors: {
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
    ...shorthands.borderLeft('4px solid'),
    paddingLeft: '8px',
  },
  calloutBlockContainertoDrawShapetrue: {
    display: 'flex',
  },
  shapeStyles: {
    marginRight: '8px',
  },
  calloutLegendText: {
    fontSize: 'fontSizeBase200',
    lineHeight: '16px',
    color: tokens.colorNeutralForeground2,
    selectors: {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  calloutContentY: {
    fontSize: 'fontSizeBase400',
    fontWeight: 'bold',
    lineHeight: '22px',
    selectors: {
      [HighContrastSelectorBlack]: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  descriptionMessage: {
    fontSize: 'fontSizeBase200',
    color: tokens.colorNeutralForeground2,
    marginTop: '10px',
    paddingTop: '10px',
    ...shorthands.borderTop(`1px solid ${tokens.colorNeutralStroke2}`),
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
    calloutBlockContainer: mergeClasses(
      popoverClassNames.calloutBlockContainer,
      baseStyles.calloutBlockContainer /*props.styles?.calloutBlockContainer*/,
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
    calloutContentY: mergeClasses(
      popoverClassNames.calloutContentY,
      baseStyles.calloutContentY /*props.styles?.calloutContentY*/,
    ),
    descriptionMessage: mergeClasses(
      popoverClassNames.descriptionMessage,
      baseStyles.descriptionMessage /*props.styles?. descriptionMessage*/,
    ),
  };
};
