import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecorator, TestWrapperDecoratorFixedWidth } from '../utilities/index';

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
    <StoryWright
      steps={new Steps().click('#show-popovers').snapshot('positioned popovers', { cropTo: '.testWrapper' }).end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('positioning', () => <PopoverPositioning />, { includeRtl: true, includeHighContrast: true });

storiesOf('Popover Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().click('#show-popover').snapshot('PopoverSurface focused').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('avoid scrolling', () => {
    return (
      <Popover trapFocus>
        <PopoverTrigger>
          <button id="show-popover">Show Popover</button>
        </PopoverTrigger>
        <PopoverSurface
          tabIndex={-1}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            maxHeight: '300px',
            overflowY: 'scroll',
          }}
        >
          <span>{sampleText}</span>
          <div>
            <button>close</button>
            <button>accept</button>
          </div>
        </PopoverSurface>
      </Popover>
    );
  })
  .addStory('when rendering inline, it should not render behind relatively positioned elements', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Popover inline>
        <PopoverTrigger>
          <button id="show-popover">Show Popover</button>
        </PopoverTrigger>
        <PopoverSurface>
          <span>Sample PopoverSurface text</span>
        </PopoverSurface>
      </Popover>
      <input style={{ position: 'relative' }} />
    </div>
  ));

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
 et dolore magna aliqua. Felis donec et odio pellentesque diam volutpat commodo sed. In pellentesque massa placerat duis
 ultricies lacus sed turpis. Eros donec ac odio tempor. Mattis molestie a iaculis at erat. Aenean euismod elementum nisi
  quis eleifend quam. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Sed euismod nisi porta
  lorem mollis aliquam ut porttitor leo. Lorem ipsum dolor sit amet. Id faucibus nisl tincidunt eget nullam. Fermentum
  posuere urna nec tincidunt praesent semper. Dolor sit amet consectetur adipiscing. Ut enim blandit volutpat maecenas
  volutpat blandit aliquam etiam erat. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.
  Dignissim convallis aenean et tortor at risus. Tristique senectus et netus et malesuada. Sed blandit libero volutpat
  sed cras ornare arcu dui. Arcu dictum varius duis at consectetur lorem. Montes nascetur ridiculus mus mauris vitae. Ut
   ornare lectus sit amet est placerat in egestas.`;
