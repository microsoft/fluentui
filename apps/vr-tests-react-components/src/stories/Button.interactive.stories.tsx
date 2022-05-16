import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Button, CompoundButton, ToggleButton, MenuButton } from '@fluentui/react-button';

const steps = new Screener.Steps()
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

const buttonId = 'button-id';

storiesOf('Button Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive('Default', () => <Button id={buttonId}>Hello, world</Button>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStoryInteractive('Circular', () => (
    <Button id={buttonId} shape="circular">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Outline', () => (
    <Button id={buttonId} appearance="outline">
      Hello, world
    </Button>
  ))
  .addStoryInteractive(
    'Primary',
    () => (
      <Button id={buttonId} appearance="primary">
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive(
    'Subtle',
    () => (
      <Button id={buttonId} appearance="subtle">
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive(
    'Transparent',
    () => (
      <Button id={buttonId} appearance="transparent">
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive(
    'Disabled',
    () => (
      <Button id={buttonId} disabled>
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive(
    'Outline Disabled',
    () => (
      <Button id={buttonId} appearance="outline" disabled>
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive(
    'Primary Disabled',
    () => (
      <Button id={buttonId} appearance="primary" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStoryInteractive(
    'Subtle Disabled',
    () => (
      <Button id={buttonId} appearance="subtle" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStoryInteractive(
    'Transparent Disabled',
    () => (
      <Button id={buttonId} appearance="transparent" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStoryInteractive('Size small', () => (
    <Button id={buttonId} icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Size large', () => (
    <Button id={buttonId} icon="X" size="large">
      Hello, world
    </Button>
  ))
  .addStoryInteractive(
    'With icon before content',
    () => (
      <Button id={buttonId} icon="X">
        Hello, world
      </Button>
    ),
    {
      includeRtl: true,
    },
  )
  .addStoryInteractive(
    'With icon after content',
    () => (
      <Button id={buttonId} icon="X" iconPosition="after">
        Hello, world
      </Button>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Icon only', () => <Button id={buttonId} icon="X" />)
  .addStoryInteractive('Circular and icon only', () => <Button id={buttonId} shape="circular" icon="X" />, {
    includeRtl: true,
  });

storiesOf('Button Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive(
    'Default',
    () => (
      <Button id={buttonId} block>
        Hello, world
      </Button>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Circular', () => (
    <Button id={buttonId} block shape="circular">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Outline', () => (
    <Button id={buttonId} block appearance="outline">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Primary', () => (
    <Button id={buttonId} block appearance="primary">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Subtle', () => (
    <Button id={buttonId} block appearance="subtle">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Transparent', () => (
    <Button id={buttonId} block appearance="transparent">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Disabled', () => (
    <Button id={buttonId} block disabled>
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Size small', () => (
    <Button id={buttonId} block icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStoryInteractive('Size large', () => (
    <Button id={buttonId} block icon="X" size="large">
      Hello, world
    </Button>
  ));

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        // https://github.com/microsoft/fluentui/issues/21998
        // .hover('#button-id')
        // .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('#button-id')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive(
    'Default',
    () => (
      <CompoundButton id={buttonId} secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive(
    'With icon before content',
    () => (
      <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive(
    'With icon after content',
    () => (
      <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" iconPosition="after">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  );

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive('Outline', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Primary', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Subtle', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Outline Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Primary Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Subtle Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Transparent Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Circular', () => (
    <CompoundButton shape="circular" id={buttonId} secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Size small', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Size large', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" size="large">
      Hello, world
    </CompoundButton>
  ))

  .addStoryInteractive('Icon only', () => <CompoundButton id={buttonId} icon="X" />)
  .addStoryInteractive('Circular and icon only', () => <CompoundButton id={buttonId} shape="circular" icon="X" />, {
    includeRtl: true,
  });

storiesOf('CompoundButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive(
    'Default',
    () => (
      <CompoundButton id={buttonId} block secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Circular', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" shape="circular">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Outline', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="outline">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Primary', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="primary">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Subtle', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="subtle">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="transparent">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Size small', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStoryInteractive('Size large', () => (
    <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" icon="X" size="large">
      Hello, world
    </CompoundButton>
  ));

storiesOf('ToggleButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive('Default', () => <ToggleButton id={buttonId}>Hello, world</ToggleButton>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStoryInteractive('Circular', () => (
    <ToggleButton id={buttonId} shape="circular">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Outline', () => (
    <ToggleButton id={buttonId} appearance="outline">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive(
    'Primary',
    () => (
      <ToggleButton id={buttonId} appearance="primary">
        Hello, world
      </ToggleButton>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStoryInteractive('Subtle', () => (
    <ToggleButton id={buttonId} appearance="subtle">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <ToggleButton id={buttonId} appearance="transparent">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <ToggleButton id={buttonId} disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Primary Disabled', () => (
    <ToggleButton id={buttonId} appearance="primary" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Subtle Disabled', () => (
    <ToggleButton id={buttonId} appearance="subtle" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Transparent Disabled', () => (
    <ToggleButton id={buttonId} appearance="transparent" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Size small', () => (
    <ToggleButton id={buttonId} icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Size large', () => (
    <ToggleButton id={buttonId} icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('With icon before content', () => (
    <ToggleButton id={buttonId} icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('With icon after content', () => (
    <ToggleButton id={buttonId} icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Icon only', () => <ToggleButton id={buttonId} icon="X" />)
  .addStoryInteractive('Circular and icon only', () => <ToggleButton id={buttonId} shape="circular" icon="X" />)
  .addStoryInteractive('Checked', () => (
    <ToggleButton id={buttonId} checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Primary Checked', () => (
    <ToggleButton id={buttonId} appearance="primary" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Subtle Checked', () => (
    <ToggleButton id={buttonId} appearance="subtle" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Transparent Checked', () => (
    <ToggleButton id={buttonId} appearance="transparent" checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive(
    'Default',
    () => (
      <ToggleButton id={buttonId} block>
        Hello, world
      </ToggleButton>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Circular', () => (
    <ToggleButton id={buttonId} block shape="circular">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Outline', () => (
    <ToggleButton id={buttonId} block appearance="primary">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Primary', () => (
    <ToggleButton id={buttonId} block appearance="primary">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Subtle', () => (
    <ToggleButton id={buttonId} block appearance="subtle">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <ToggleButton id={buttonId} block appearance="transparent">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <ToggleButton id={buttonId} block disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Size small', () => (
    <ToggleButton id={buttonId} block icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Size large', () => (
    <ToggleButton id={buttonId} block icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Checked', () => (
    <ToggleButton id={buttonId} block checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Primary Checked', () => (
    <ToggleButton id={buttonId} block appearance="primary" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Subtle Checked', () => (
    <ToggleButton id={buttonId} block appearance="subtle" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStoryInteractive('Transparent Checked', () => (
    <ToggleButton id={buttonId} block appearance="transparent" checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('MenuButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive('Default', () => <MenuButton id={buttonId}>Hello, world</MenuButton>, { includeRtl: true })
  .addStoryInteractive('Circular', () => (
    <MenuButton id={buttonId} shape="circular">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Outline', () => (
    <MenuButton id={buttonId} appearance="outline">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Primary', () => (
    <MenuButton id={buttonId} appearance="primary">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Subtle', () => (
    <MenuButton id={buttonId} appearance="subtle">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <MenuButton id={buttonId} appearance="transparent">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <MenuButton id={buttonId} disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Outline Disabled', () => (
    <MenuButton id={buttonId} appearance="outline" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Primary Disabled', () => (
    <MenuButton id={buttonId} appearance="primary" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Subtle Disabled', () => (
    <MenuButton id={buttonId} appearance="subtle" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Transparent Disabled', () => (
    <MenuButton id={buttonId} appearance="transparent" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Size small', () => (
    <MenuButton id={buttonId} icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Size large', () => (
    <MenuButton id={buttonId} icon="X" size="large">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('With icon', () => (
    <MenuButton id={buttonId} icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Icon only', () => <MenuButton id={buttonId} icon="X" />)
  .addStoryInteractive('Circular and icon only', () => <MenuButton id={buttonId} shape="circular" icon="X" />);

storiesOf('MenuButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStoryInteractive(
    'Default',
    () => (
      <MenuButton id={buttonId} block>
        Hello, world
      </MenuButton>
    ),
    { includeRtl: true },
  )
  .addStoryInteractive('Circular', () => (
    <MenuButton id={buttonId} block shape="circular">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Outline', () => (
    <MenuButton id={buttonId} block appearance="outline">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Primary', () => (
    <MenuButton id={buttonId} block appearance="primary">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Subtle', () => (
    <MenuButton id={buttonId} block appearance="subtle">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Transparent', () => (
    <MenuButton id={buttonId} block appearance="transparent">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Disabled', () => (
    <MenuButton id={buttonId} block disabled>
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Size small', () => (
    <MenuButton id={buttonId} block icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStoryInteractive('Size large', () => (
    <MenuButton id={buttonId} block icon="X" size="large">
      Hello, world
    </MenuButton>
  ));
