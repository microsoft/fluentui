import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecorator } from '../utilities/index';

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

storiesOf('Popover Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click('#show-popovers')
        .snapshot('positioned popovers', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('positioning', () => <PopoverPositioning />, { includeRtl: true, includeHighContrast: true });
