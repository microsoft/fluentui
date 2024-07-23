import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { ILegendsProps, ILegendsStyles } from './Legends.types';

/**
 * @internal
 */
export const legendClassNames: SlotClassNames<ILegendsStyles> = {
  root: 'fui-legend__root',
  legend: 'fui-legend__legend',
  rect: 'fui-legend__rect',
  shape: 'fui-legend__shape',
  triangle: 'fui-legend__triangle',
  text: 'fui-legend__text',
  hoverChange: 'fui-legend__hoverChange',
  overflowIndicationTextStyle: 'fui-legend__overflowIndicationTextStyle',
  hoverCardRoot: 'fui-legend__hoverCardRoot',
};

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    width: '100%',
    alignItems: 'center',
    ...shorthands.margin('-8px 0 0 -8px'),
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...shorthands.border('none'),
    ...shorthands.padding('8px'),
    textTransform: 'capitalize',
  },
  rect: {
    // selectors: {
    //   [HighContrastSelector]: {
    //     content: `linear-gradient(to right, ${props.colorOnSelectedState}, ${props.colorOnSelectedState})`,
    //     opacity: props.colorOnSelectedState === theme!.semanticColors.buttonBackground ? '0.6' : '',
    //   },
    // },
    width: '12px',
    height: 'var(--rect-height)',
    backgroundColor: 'var(--rect-backgroundColor)',
    ...shorthands.borderColor('var(--rect-borderColor)'),
    content: 'var(--rect-content)',
    marginRight: '8px',
    ...shorthands.border('1px solid'),
  },
  shape: {
    marginRight: '8px',
  },
  // TO DO Add props when these styles are used in the component
  triangle: {
    width: '0',
    height: '0',
    ...shorthands.borderLeft('6px solid transparent'),
    ...shorthands.borderRight('6px solid transparent'),
    ...shorthands.borderTop('10.4px solid'),
    marginRight: '8px',
  },
  // TO DO Add props when these styles are used in the component
  text: {
    lineHeight: '16px',
  },
  // TO DO Add props when these styles are used in the component
  hoverChange: {
    width: '12px',
    height: '12px',
    marginRight: '8px',
    ...shorthands.border('1px solid'),
  },
  // TO DO Add props when these styles are used in the component
  overflowIndicationTextStyle: {
    cursor: 'pointer',
    lineHeight: '16px',
    ...shorthands.padding('8px'),
  },
  // TO DO Add props when these styles are used in the component
  hoverCardRoot: {
    ...shorthands.padding('8px'),
  },
});

export const useLegendStyles_unstable = (props: ILegendsProps): ILegendsStyles => {
  const { className } = props; // ToDo - width, barHeight is non enumerable. Need to be used inline.
  const baseStyles = useStyles();

  return {
    root: mergeClasses(legendClassNames.root, baseStyles.root, className, props.styles?.root),
    legend: mergeClasses(legendClassNames.legend, baseStyles.legend, props.styles?.legend),
    rect: mergeClasses(legendClassNames.rect, baseStyles.rect, props.styles?.rect),
    shape: mergeClasses(legendClassNames.shape, baseStyles.shape, props.styles?.shape),
    triangle: mergeClasses(legendClassNames.triangle, baseStyles.triangle, props.styles?.triangle),
    text: mergeClasses(legendClassNames.text, baseStyles.text, props.styles?.text),
    hoverChange: mergeClasses(legendClassNames.hoverChange, baseStyles.hoverChange, props.styles?.hoverChange),
    overflowIndicationTextStyle: mergeClasses(
      legendClassNames.overflowIndicationTextStyle,
      baseStyles.overflowIndicationTextStyle,
      props.styles?.overflowIndicationTextStyle,
    ),
    hoverCardRoot: mergeClasses(legendClassNames.hoverCardRoot, baseStyles.hoverCardRoot, props.styles?.hoverCardRoot),
  };
};
