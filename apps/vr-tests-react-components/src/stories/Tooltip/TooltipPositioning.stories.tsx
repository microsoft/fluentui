import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Tooltip } from '@fluentui/react-tooltip';

import { useStyles } from './utils';
import { getStoryVariant, withStoryWrightSteps, TestWrapperDecorator, RTL, HIGH_CONTRAST } from '../../utilities';

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

export default {
  title: 'Tooltip Converged',

  decorators: [
    TestWrapperDecorator,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().click('#show-tooltips').snapshot('positioned tooltips', { cropTo: '.testWrapper' }).end(),
      }),
  ],
} satisfies Meta<typeof Tooltip>;

export const Positioning = () => <TooltipPositioning />;
Positioning.storyName = 'positioning';

export const PositioningRTL = getStoryVariant(Positioning, RTL);

export const PositioningHighContrast = getStoryVariant(Positioning, HIGH_CONTRAST);
