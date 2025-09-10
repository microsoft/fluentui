import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { Tooltip } from '@fluentui/react-tooltip';
import type { PositioningProps } from '@fluentui/react-positioning';
import type { JSXElement } from '@fluentui/react-utilities';
import { useStyles } from './utils';
import { getStoryVariant, TestWrapperDecorator, RTL, HIGH_CONTRAST } from '../../utilities';

const TooltipPositioning: React.FC = () => {
  const positions = [
    ['above', 'start'],
    ['above', 'center'],
    ['above', 'end'],
    ['below', 'start'],
    ['below', 'center'],
    ['below', 'end'],
    ['before', 'top'],
    ['before', 'center'],
    ['before', 'bottom'],
    ['after', 'top'],
    ['after', 'center'],
    ['after', 'bottom'],
  ] as const;

  const [target, setTarget] = React.useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={useStyles().wrapper}>
      <div ref={setTarget} className="target" style={{ width: '300px', height: '300px' }}>
        {positions.map(([position, align]) => (
          <Tooltip
            key={position + align}
            content={{ children: position + ' ' + align, style: { height: 50 } }}
            relationship="label"
            positioning={{ position, align, target }}
            withArrow
            visible={visible}
          />
        ))}

        <button id="show-tooltips" onClick={() => setVisible(true)}>
          Show tooltips
        </button>
      </div>
    </div>
  );
};

const TooltipPositioningWithFallbacks: React.FC = () => {
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);

  const wrapWithTooltip = (content: string, element: JSXElement, fallback: PositioningProps['fallbackPositions']) => (
    <Tooltip
      content={content}
      relationship="label"
      withArrow
      visible
      positioning={{
        fallbackPositions: fallback,
        flipBoundary: boundaryRef,
      }}
    >
      {element}
    </Tooltip>
  );

  const positions = [
    {
      fallback: ['below-start'],
      style: { position: 'absolute', top: '0', left: '0' },
      content: 'top left',
    },
    {
      fallback: ['below'],
      style: { position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' },
      content: 'top center',
    },
    {
      fallback: ['below-end'],
      style: { position: 'absolute', top: '0', right: '0' },
      content: 'top right',
    },
    {
      fallback: ['after'],
      style: { position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)' },
      content: 'middle left',
    },
    {
      fallback: ['below', 'before'],
      style: { position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)' },
      content: 'middle right',
    },
    {
      fallback: ['above-start'],
      style: { position: 'absolute', bottom: '0', left: '0' },
      content: 'below left',
    },
    {
      fallback: ['above'],
      style: { position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' },
      content: 'below center',
    },
    {
      fallback: ['above-end'],
      style: { position: 'absolute', bottom: '0', right: '0' },
      content: 'below right',
    },
  ] satisfies {
    fallback: PositioningProps['fallbackPositions'];
    style: React.CSSProperties;
    content: string;
  }[];

  return (
    <div className={useStyles().wrapperBordered} ref={setBoundaryRef}>
      {positions.map(({ content, fallback, style }, index) =>
        wrapWithTooltip(
          content,
          <div key={index} style={style as React.CSSProperties}>
            {content}
          </div>,
          fallback,
        ),
      )}
    </div>
  );
};

export default {
  title: 'Tooltip Converged',
  decorators: [TestWrapperDecorator],
} satisfies Meta<typeof Tooltip>;

export const Positioning = () => <TooltipPositioning />;

Positioning.storyName = 'positioning';
Positioning.parameters = {
  storyWright: {
    steps: new Steps().click('#show-tooltips').snapshot('positioned tooltips', { cropTo: '.testWrapper' }).end(),
  },
} satisfies StoryParameters;

export const PositioningwithFallbacks = () => <TooltipPositioningWithFallbacks />;

PositioningwithFallbacks.storyName = 'positioning with fallbacks';
PositioningwithFallbacks.parameters = {
  storyWright: {
    steps: new Steps().snapshot('positioning fallbacks', { cropTo: '.testWrapper' }).end(),
  },
} satisfies StoryParameters;

export const PositioningRTL = getStoryVariant(Positioning, RTL);

export const PositioningHighContrast = getStoryVariant(Positioning, HIGH_CONTRAST);
