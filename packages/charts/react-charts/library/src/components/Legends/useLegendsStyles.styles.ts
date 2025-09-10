import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { LegendsProps, LegendsStyles } from './Legends.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HighContrastSelector } from '../../utilities/index';

// Constants needed to create legends using SVG for image export
export const LEGEND_CONTAINER_MARGIN_TOP = 8;
export const LEGEND_CONTAINER_MARGIN_START = 12;
export const LEGEND_PADDING = 8;
export const LEGEND_HEIGHT = 32;
export const LEGEND_SHAPE_BORDER = 1;
const LEGEND_SHAPE_SIZE_WITHOUT_BORDER = 12;
// SVG strokes are drawn centered around the path, with half of the stroke width extending inward
// (overlapping the fill area) and half outward. To ensure the filled area maintains its intended size,
// expand the shape accordingly.
export const LEGEND_SHAPE_SIZE = LEGEND_SHAPE_SIZE_WITHOUT_BORDER + LEGEND_SHAPE_BORDER;
export const LEGEND_SHAPE_MARGIN_END = 8;
export const INACTIVE_LEGEND_TEXT_OPACITY = 0.67;

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
  legendContainer: 'fui-legend__legendContainer',
  annotation: 'fui-legend__annotation',
};

const useStyles = makeStyles({
  root: {
    // FIXME: Removing this style allows the legend container in responsive donut chart to resize
    // properly (horizontally) within a flexbox or grid layout. But it causes vertical resizing issues
    // in responsive charts where legends consist of multiple words.
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
    padding: `${LEGEND_PADDING}px`,
    textTransform: 'capitalize',
    // The default min-width is 64px. Setting it to 0 allows the legend container in responsive
    // cartesian charts to resize properly within a flexbox or grid layout.
    minWidth: 0,
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
    width: `${LEGEND_SHAPE_SIZE_WITHOUT_BORDER}px`,
    marginRight: `${LEGEND_SHAPE_MARGIN_END}px`,
    border: `${LEGEND_SHAPE_BORDER}px solid`,
  },
  shape: {
    marginRight: `${LEGEND_SHAPE_MARGIN_END}px`,
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
    forcedColorAdjust: 'auto',
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
  legendContainer: {
    flex: '0 1 auto',
    margin: '4px',
  },
  annotation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
});

export const useLegendStyles = (props: LegendsProps): LegendsStyles => {
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
    legendContainer: mergeClasses(
      legendClassNames.legendContainer,
      baseStyles.legendContainer,
      props.styles?.legendContainer,
    ),
    annotation: mergeClasses(legendClassNames.annotation, baseStyles.annotation, props.styles?.annotation),
  };
};
