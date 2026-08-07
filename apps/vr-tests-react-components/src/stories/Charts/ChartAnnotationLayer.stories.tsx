import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { ChartAnnotationLayer } from '@fluentui/react-charts';
import type { ChartAnnotationContext, ChartAnnotationLayerProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/ChartAnnotationLayer',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof ChartAnnotationLayer>;

/**
 * Deterministic context — relative/pixel coordinates only (no data scales, no dates:
 * the machine-TZ rule from the C4/C5 chart sets). The layer's root is
 * `position: absolute; inset: 0`, so each story hosts it in an explicitly sized
 * `position: relative` wrapper.
 */
const context: ChartAnnotationContext = {
  plotRect: { x: 40, y: 30, width: 520, height: 240 },
  svgRect: { width: 600, height: 300 },
};

const wrapperStyle: React.CSSProperties = { position: 'relative', width: '600px', height: '300px' };

/** Default annotation chrome (border + shadow + 0.8-opacity background) + simple markup. */
const defaultAnnotations: ChartAnnotationLayerProps['annotations'] = [
  {
    id: 'default-plain',
    text: 'Plain annotation',
    coordinates: { type: 'relative', x: 0.2, y: 0.2 },
  },
  {
    id: 'default-markup',
    text: 'Line one<br /><b>bold</b> and <i>italic</i>',
    coordinates: { type: 'relative', x: 0.7, y: 0.3 },
  },
  {
    id: 'default-pixel',
    text: 'Pixel anchored',
    coordinates: { type: 'pixel', x: 120, y: 180 },
  },
];

export const Default = () => {
  return (
    <div style={wrapperStyle}>
      <ChartAnnotationLayer annotations={defaultAnnotations} context={context} />
    </div>
  );
};

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

/** Connector geometry: end arrow (default), start arrow + dash, both arrows + custom stroke. */
const connectorAnnotations: ChartAnnotationLayerProps['annotations'] = [
  {
    id: 'connector-end',
    text: 'End arrow',
    coordinates: { type: 'relative', x: 0.25, y: 0.7 },
    layout: { offsetX: 60, offsetY: -60 },
    connector: {},
  },
  {
    id: 'connector-start-dashed',
    text: 'Start arrow, dashed',
    coordinates: { type: 'relative', x: 0.55, y: 0.35 },
    layout: { offsetX: -40, offsetY: 70 },
    connector: { arrow: 'start', dashArray: '4 4' },
  },
  {
    id: 'connector-both',
    text: 'Both arrows',
    coordinates: { type: 'relative', x: 0.85, y: 0.75 },
    layout: { offsetX: -70, offsetY: -50 },
    connector: { arrow: 'both', strokeColor: '#0078d4', strokeWidth: 3, endPadding: 4 },
  },
];

export const Connectors = () => {
  return (
    <div style={wrapperStyle}>
      <ChartAnnotationLayer annotations={connectorAnnotations} context={context} />
    </div>
  );
};

export const ConnectorsRTL = getStoryVariant(Connectors, RTL);

export const ConnectorsDarkMode = getStoryVariant(Connectors, DARK_MODE);

/** `hideDefaultStyles` (the `annotationNoDefaults` slot) + per-annotation style channels. */
const styledAnnotations: ChartAnnotationLayerProps['annotations'] = [
  {
    id: 'styled-background',
    text: 'Custom background',
    coordinates: { type: 'relative', x: 0.25, y: 0.25 },
    style: { backgroundColor: '#fff4ce', textColor: '#323130' },
  },
  {
    id: 'styled-border-rotated',
    text: 'Bordered, rotated',
    coordinates: { type: 'relative', x: 0.7, y: 0.45 },
    style: { borderColor: '#8a8886', borderWidth: 2, borderRadius: 8, rotation: -8 },
  },
  {
    id: 'styled-typography',
    text: 'Big text',
    coordinates: { type: 'relative', x: 0.45, y: 0.75 },
    style: { fontSize: '18px', fontWeight: 700, opacity: 0.5, backgroundColor: '#e1dfdd' },
  },
];

export const HideDefaultStyles = () => {
  return (
    <div style={wrapperStyle}>
      <ChartAnnotationLayer annotations={styledAnnotations} context={context} hideDefaultStyles={true} />
    </div>
  );
};

export const HideDefaultStylesRTL = getStoryVariant(HideDefaultStyles, RTL);

export const HideDefaultStylesDarkMode = getStoryVariant(HideDefaultStyles, DARK_MODE);
