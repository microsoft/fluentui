import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';
import { getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps, TestWrapperDecorator } from '../../utilities';

const PopoverPositioning: React.FC = () => {
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
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: 'flex', padding: '100px 150px' }}>
      <div
        ref={setTarget}
        className="target"
        style={{ width: '400px', height: '300px', border: `1px solid ${tokens.colorNeutralStroke1}` }}
      >
        {positions.map(([position, align]) => (
          <Popover withArrow open={open} positioning={{ position, align, target }} key={position + '' + align}>
            <PopoverSurface>
              <div>{position + ' ' + align}</div>
            </PopoverSurface>
          </Popover>
        ))}

        <button id="show-popovers" onClick={() => setOpen(true)}>
          Show popovers
        </button>
      </div>
    </div>
  );
};

export default {
  title: 'Popover Converged',

  decorators: [
    TestWrapperDecorator,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().click('#show-popovers').snapshot('positioned popovers', { cropTo: '.testWrapper' }).end(),
      }),
  ],
} satisfies Meta<typeof Popover>;

export const Positioning = () => <PopoverPositioning />;
Positioning.storyName = 'positioning';

export const PositioningRTL = getStoryVariant(Positioning, RTL);

export const PositioningHighContrast = getStoryVariant(Positioning, HIGH_CONTRAST);
