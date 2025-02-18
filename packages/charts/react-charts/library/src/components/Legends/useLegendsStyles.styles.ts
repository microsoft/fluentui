import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { LegendsProps, LegendsStyles } from './Legends.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HighContrastSelector } from '../../utilities/index';

/**
 * @internal
 */
export const legendClassNames: SlotClassNames<LegendsStyles> = {
  root: 'fui-legend__root',
  legend: 'fui-legend__legend',
  rect: 'fui-legend__rect',
  shape: 'fui-legend__shape',
  triangle: 'fui-legend__triangle',
  text: 'fui-legend__text',
  hoverChange: 'fui-legend__hoverChange',
  resizableArea: 'fui-legend__resizableArea',
};

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    width: '100%',
    alignItems: 'center',
    ...shorthands.margin('-8px 0 0 -8px'),
  },
  legend: {
    // setting display to flex does not work
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    cursor: 'pointer',
    ...shorthands.border('none'),
    ...shorthands.padding(tokens.spacingHorizontalS),
    textTransform: 'capitalize',
    [HighContrastSelector]: {
      color: 'WindowText',
      forcedColorAdjust: 'none',
    },
    '&:hover': {
      [HighContrastSelector]: {
        color: 'HighlightText',
        forcedColorAdjust: 'none',
      },
    },
  },
  rect: {
    [HighContrastSelector]: {
      content: 'var(--rect-content-high-contrast)',
      opacity: 'var(--rect-opacity-high-contrast)',
    },
    width: '12px',
    border: '1px solid',
    marginRight: tokens.spacingHorizontalS,
  },
  shape: {
    marginRight: tokens.spacingHorizontalS,
  },
  // TO DO Add props when these styles are used in the component
  triangle: {
    width: '0',
    height: '0',
    ...shorthands.borderLeft('6px solid transparent'),
    ...shorthands.borderRight('6px solid transparent'),
    ...shorthands.borderTop('10.4px solid'),
    marginRight: tokens.spacingHorizontalS,
  },
  // TO DO Add props when these styles are used in the component
  text: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground1,
    [HighContrastSelector]: {
      color: 'WindowText',
      forcedColorAdjust: 'none',
    },
  },
  // TO DO Add props when these styles are used in the component
  hoverChange: {
    width: '12px',
    height: '12px',
    marginRight: tokens.spacingHorizontalS,
    ...shorthands.border('1px solid'),
  },
  resizableArea: {
    position: 'relative',
    textAlign: 'left',
    transform: 'translate(-50%, 0)',
    top: 'auto',
    left: '50%',
    minWidth: '200px',
    maxWidth: '800px',
    '::after': {
      ...shorthands.padding('1px 4px 1px'),
      ...shorthands.borderTop('-2px'),
      ...shorthands.borderLeft('-2px'),
    },
  },
});

export const useLegendStyles_unstable = (props: LegendsProps): LegendsStyles => {
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
    resizableArea: mergeClasses(legendClassNames.resizableArea, baseStyles.resizableArea, props.styles?.resizableArea),
  };
};
