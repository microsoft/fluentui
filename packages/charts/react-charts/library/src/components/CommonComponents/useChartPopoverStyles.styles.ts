import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { ChartPopoverProps, PopoverComponentStyles } from './ChartPopover.types';

/**
 * @internal
 */
export const popoverClassNames: SlotClassNames<PopoverComponentStyles> = {
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
  ratio: 'fui-cart__ratio',
  numerator: 'fui-cart__numerator',
  denominator: 'fui-cart__denominator',
  calloutInfoContainer: 'fui-cart__calloutInfoContainer',
  calloutContainer: 'fui-cart__calloutContainer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  calloutContentRoot: {
    display: 'grid',
    overflow: 'hidden',
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
    ...typographyStyles.caption1,
    opacity: '0.8',
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainer: {
    color: tokens.colorNeutralForeground2,
  },
  calloutBlockContainerCartesian: {
    ...typographyStyles.caption1,
    forcedColorAdjust: 'none',
  },
  calloutBlockContainerNonCartesian: {
    fontSize: tokens.fontSizeHero700,
    lineHeight: '22px',
    forcedColorAdjust: 'none',
  },
  calloutBlockContainertoDrawShapefalse: {
    paddingLeft: tokens.spacingHorizontalS,
    forcedColorAdjust: 'none',
  },
  calloutBlockContainertoDrawShapetrue: { display: 'inline-grid' },
  shapeStyles: {
    marginRight: tokens.spacingHorizontalS,
  },
  calloutLegendText: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
    forcedColorAdjust: 'auto',
    marginBottom: tokens.spacingVerticalXS,
  },
  calloutContentY: {
    forcedColorAdjust: 'auto',
  },
  calloutContentYCartesian: {
    ...typographyStyles.subtitle2Stronger,
  },
  calloutContentYNonCartesian: {
    ...typographyStyles.title2,
  },
  descriptionMessage: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalMNudge,
    paddingTop: tokens.spacingVerticalMNudge,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  ratio: {
    ...typographyStyles.caption2,
    marginLeft: tokens.spacingHorizontalSNudge,
    color: tokens.colorNeutralForeground1,
  },
  numerator: {
    ...typographyStyles.caption2Strong,
  },
  denominator: {
    ...typographyStyles.caption2Strong,
  },
  calloutInfoContainer: {
    paddingLeft: tokens.spacingHorizontalS,
    forcedColorAdjust: 'none',
  },
  calloutContainer: {},
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const usePopoverStyles_unstable = (props: ChartPopoverProps): PopoverComponentStyles => {
  const { isCartesian } = props;
  const baseStyles = useStyles();
  return {
    calloutContentRoot: mergeClasses(
      popoverClassNames.calloutContentRoot,
      baseStyles.calloutContentRoot,
      props.styles?.calloutContentRoot,
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
      baseStyles.calloutBlockContainer /*props.styles?.calloutBlockContainerCartesian*/,
      isCartesian ? baseStyles.calloutBlockContainerCartesian : baseStyles.calloutBlockContainerNonCartesian,
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
      baseStyles.calloutContentY /*props.styles?.calloutContentYNonCartesian*/,
      isCartesian ? baseStyles.calloutContentYCartesian : baseStyles.calloutContentYNonCartesian,
    ),
    descriptionMessage: mergeClasses(
      popoverClassNames.descriptionMessage,
      baseStyles.descriptionMessage /*props.styles?. descriptionMessage*/,
    ),
    ratio: mergeClasses(popoverClassNames.ratio, baseStyles.ratio /*props.styles?.ratio*/),
    numerator: mergeClasses(popoverClassNames.numerator, baseStyles.numerator /*props.styles?.numerator*/),
    denominator: mergeClasses(popoverClassNames.denominator, baseStyles.denominator /*props.styles?.denominator*/),
    calloutInfoContainer: mergeClasses(popoverClassNames.calloutInfoContainer, baseStyles.calloutInfoContainer),
    calloutContainer: mergeClasses(popoverClassNames.calloutContainer, baseStyles.calloutContainer),
  };
};
