import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Button, CompoundButton, ToggleButton, MenuButton } from '@fluentui/react-button';

const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('.fui-Button')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('.fui-Button')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

storiesOf('Button Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <Button>Hello, world</Button>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Circular', () => <Button shape="circular">Hello, world</Button>)
  .addStory('Outline', () => <Button appearance="outline">Hello, world</Button>)
  .addStory('Primary', () => <Button appearance="primary">Hello, world</Button>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Subtle', () => <Button appearance="subtle">Hello, world</Button>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Transparent', () => <Button appearance="transparent">Hello, world</Button>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Outline Disabled',
    () => (
      <Button appearance="outline" disabled>
        Hello, world
      </Button>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary Disabled',
    () => (
      <Button appearance="primary" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Subtle Disabled',
    () => (
      <Button appearance="subtle" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Transparent Disabled',
    () => (
      <Button appearance="transparent" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Size small', () => (
    <Button icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStory('Size large', () => (
    <Button icon="X" size="large">
      Hello, world
    </Button>
  ))
  .addStory('With icon before content', () => <Button icon="X">Hello, world</Button>, {
    includeRtl: true,
  })
  .addStory(
    'With icon after content',
    () => (
      <Button icon="X" iconPosition="after">
        Hello, world
      </Button>
    ),
    { includeRtl: true },
  )
  .addStory('Icon only', () => <Button icon="X" />)
  .addStory('Circular and icon only', () => <Button shape="circular" icon="X" />, {
    includeRtl: true,
  });

storiesOf('Button Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <Button block>Hello, world</Button>, { includeRtl: true })
  .addStory('Circular', () => (
    <Button block shape="circular">
      Hello, world
    </Button>
  ))
  .addStory('Outline', () => (
    <Button block appearance="outline">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button block appearance="primary">
      Hello, world
    </Button>
  ))
  .addStory('Subtle', () => (
    <Button block appearance="subtle">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button block appearance="transparent">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button block disabled>
      Hello, world
    </Button>
  ))
  .addStory('Size small', () => (
    <Button block icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStory('Size large', () => (
    <Button block icon="X" size="large">
      Hello, world
    </Button>
  ));

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory(
    'Default',
    () => <CompoundButton secondaryContent="This is some secondary text">Hello, world</CompoundButton>,
    { includeRtl: true },
  )
  .addStory('Circular', () => (
    <CompoundButton shape="circular" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Outline', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="outline">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="primary">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="subtle">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="transparent">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Outline Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="outline" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="primary" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="subtle" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" appearance="transparent" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size small', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size large', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="large">
      Hello, world
    </CompoundButton>
  ))
  .addStory(
    'With icon before content',
    () => (
      <CompoundButton secondaryContent="This is some secondary text" icon="X">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStory(
    'With icon after content',
    () => (
      <CompoundButton secondaryContent="This is some secondary text" icon="X" iconPosition="after">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStory('Icon only', () => <CompoundButton icon="X" />)
  .addStory('Circular and icon only', () => <CompoundButton shape="circular" icon="X" />, {
    includeRtl: true,
  });

storiesOf('CompoundButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory(
    'Default',
    () => (
      <CompoundButton block secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStory('Circular', () => (
    <CompoundButton block secondaryContent="This is some secondary text" shape="circular">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Outline', () => (
    <CompoundButton block secondaryContent="This is some secondary text" appearance="outline">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton block secondaryContent="This is some secondary text" appearance="primary">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle', () => (
    <CompoundButton block secondaryContent="This is some secondary text" appearance="subtle">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent', () => (
    <CompoundButton block secondaryContent="This is some secondary text" appearance="transparent">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton block secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size small', () => (
    <CompoundButton block secondaryContent="This is some secondary text" icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size large', () => (
    <CompoundButton block secondaryContent="This is some secondary text" icon="X" size="large">
      Hello, world
    </CompoundButton>
  ));

storiesOf('ToggleButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <ToggleButton>Hello, world</ToggleButton>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Circular', () => <ToggleButton shape="circular">Hello, world</ToggleButton>)
  .addStory('Outline', () => <ToggleButton appearance="outline">Hello, world</ToggleButton>)
  .addStory('Primary', () => <ToggleButton appearance="primary">Hello, world</ToggleButton>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Subtle', () => <ToggleButton appearance="subtle">Hello, world</ToggleButton>)
  .addStory('Transparent', () => <ToggleButton appearance="transparent">Hello, world</ToggleButton>)
  .addStory('Disabled', () => <ToggleButton disabled>Hello, world</ToggleButton>)
  .addStory('Primary Disabled', () => (
    <ToggleButton appearance="primary" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Disabled', () => (
    <ToggleButton appearance="subtle" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Disabled', () => (
    <ToggleButton appearance="transparent" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size small', () => (
    <ToggleButton icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size large', () => (
    <ToggleButton icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon before content', () => <ToggleButton icon="X">Hello, world</ToggleButton>)
  .addStory('With icon after content', () => (
    <ToggleButton icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Icon only', () => <ToggleButton icon="X" />)
  .addStory('Circular and icon only', () => <ToggleButton shape="circular" icon="X" />)
  .addStory('Checked', () => <ToggleButton checked>Hello, world</ToggleButton>)
  .addStory('Primary Checked', () => (
    <ToggleButton appearance="primary" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Checked', () => (
    <ToggleButton appearance="subtle" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Checked', () => (
    <ToggleButton appearance="transparent" checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <ToggleButton block>Hello, world</ToggleButton>, { includeRtl: true })
  .addStory('Circular', () => (
    <ToggleButton block shape="circular">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Outline', () => (
    <ToggleButton block appearance="primary">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton block appearance="primary">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle', () => (
    <ToggleButton block appearance="subtle">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent', () => (
    <ToggleButton block appearance="transparent">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton block disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size small', () => (
    <ToggleButton block icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size large', () => (
    <ToggleButton block icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Checked', () => (
    <ToggleButton block checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Checked', () => (
    <ToggleButton block appearance="primary" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Checked', () => (
    <ToggleButton block appearance="subtle" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Checked', () => (
    <ToggleButton block appearance="transparent" checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('MenuButton Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <MenuButton>Hello, world</MenuButton>, { includeRtl: true })
  .addStory('Circular', () => <MenuButton shape="circular">Hello, world</MenuButton>)
  .addStory('Outline', () => <MenuButton appearance="outline">Hello, world</MenuButton>)
  .addStory('Primary', () => <MenuButton appearance="primary">Hello, world</MenuButton>)
  .addStory('Subtle', () => <MenuButton appearance="subtle">Hello, world</MenuButton>)
  .addStory('Transparent', () => <MenuButton appearance="transparent">Hello, world</MenuButton>)
  .addStory('Disabled', () => <MenuButton disabled>Hello, world</MenuButton>)
  .addStory('Outline Disabled', () => (
    <MenuButton appearance="outline" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton appearance="primary" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle Disabled', () => (
    <MenuButton appearance="subtle" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent Disabled', () => (
    <MenuButton appearance="transparent" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Size small', () => (
    <MenuButton icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size large', () => (
    <MenuButton icon="X" size="large">
      Hello, world
    </MenuButton>
  ))
  .addStory('With icon', () => <MenuButton icon="X">Hello, world</MenuButton>)
  .addStory('Icon only', () => <MenuButton icon="X" />)
  .addStory('Circular and icon only', () => <MenuButton shape="circular" icon="X" />);

storiesOf('MenuButton Block Converged', module)
  .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
  .addStory('Default', () => <MenuButton block>Hello, world</MenuButton>, { includeRtl: true })
  .addStory('Circular', () => (
    <MenuButton block shape="circular">
      Hello, world
    </MenuButton>
  ))
  .addStory('Outline', () => (
    <MenuButton block appearance="outline">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton block appearance="primary">
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle', () => (
    <MenuButton block appearance="subtle">
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent', () => (
    <MenuButton block appearance="transparent">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton block disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Size small', () => (
    <MenuButton block icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size large', () => (
    <MenuButton block icon="X" size="large">
      Hello, world
    </MenuButton>
  ));
