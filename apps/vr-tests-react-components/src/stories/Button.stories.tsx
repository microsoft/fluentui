import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Button, CompoundButton, ToggleButton, MenuButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles } from '@griffel/react';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

const buttonId = 'button-id';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

storiesOf('Button Converged', module)
  .addDecorator(story => <StoryWright steps={steps}>{story()}</StoryWright>)
  .addStory('Default', () => <Button id={buttonId}>Hello, world</Button>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('As an anchor', () => (
    <Button id={buttonId} as="a" href="#">
      Hello, world
    </Button>
  ))
  .addStory('Circular', () => (
    <Button id={buttonId} shape="circular">
      Hello, world
    </Button>
  ))
  .addStory('Outline', () => (
    <Button id={buttonId} appearance="outline">
      Hello, world
    </Button>
  ))
  .addStory(
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
  .addStory(
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
  .addStory(
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
  .addStory(
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
  .addStory(
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
  .addStory(
    'Primary Disabled',
    () => (
      <Button id={buttonId} appearance="primary" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Subtle Disabled',
    () => (
      <Button id={buttonId} appearance="subtle" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Transparent Disabled',
    () => (
      <Button id={buttonId} appearance="transparent" disabled>
        Hello, world
      </Button>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Size small', () => (
    <Button id={buttonId} icon={<CalendarMonth />} size="small">
      Hello, world
    </Button>
  ))
  .addStory('Size large', () => (
    <Button id={buttonId} icon={<CalendarMonth />} size="large">
      Hello, world
    </Button>
  ))
  .addStory('Size small - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
        Long text wraps after it hits the max width of the component
      </Button>
    );
  })
  .addStory('Size medium - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
        Long text wraps after it hits the max width of the component
      </Button>
    );
  })
  .addStory('Size large - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
        Long text wraps after it hits the max width of the component
      </Button>
    );
  })
  .addStory(
    'With icon before content',
    () => (
      <Button id={buttonId} icon={<CalendarMonth />}>
        Hello, world
      </Button>
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'With icon after content',
    () => (
      <Button id={buttonId} icon={<CalendarMonth />} iconPosition="after">
        Hello, world
      </Button>
    ),
    { includeRtl: true },
  )
  .addStory('Icon only', () => <Button id={buttonId} icon={<CalendarMonth />} />)
  .addStory('Circular and icon only', () => <Button id={buttonId} shape="circular" icon={<CalendarMonth />} />, {
    includeRtl: true,
  });

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        // https://github.com/microsoft/fluentui/issues/21998
        // .hover('#button-id')
        // .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('#button-id')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Default',
    () => (
      <CompoundButton id={buttonId} secondaryContent="This is some secondary text">
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStory(
    'With icon before content',
    () => (
      <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />}>
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  )
  .addStory(
    'With icon after content',
    () => (
      <CompoundButton
        id={buttonId}
        secondaryContent="This is some secondary text"
        icon={<CalendarMonth />}
        iconPosition="after"
      >
        Hello, world
      </CompoundButton>
    ),
    { includeRtl: true },
  );

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => <StoryWright steps={steps}>{story()}</StoryWright>)
  .addStory('Outline', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Outline Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent Disabled', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Circular', () => (
    <CompoundButton shape="circular" id={buttonId} secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size small', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />} size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size large', () => (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />} size="large">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size small - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <CompoundButton
        id={buttonId}
        className={styles.longText}
        secondaryContent="This is some secondary text"
        icon={<CalendarMonth />}
        size="small"
      >
        Long text wraps after it hits the max width of the component
      </CompoundButton>
    );
  })
  .addStory('Size medium - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <CompoundButton
        id={buttonId}
        className={styles.longText}
        secondaryContent="This is some secondary text"
        icon={<CalendarMonth />}
        size="medium"
      >
        Long text wraps after it hits the max width of the component
      </CompoundButton>
    );
  })
  .addStory('Size large - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <CompoundButton
        id={buttonId}
        className={styles.longText}
        secondaryContent="This is some secondary text"
        icon={<CalendarMonth />}
        size="large"
      >
        Long text wraps after it hits the max width of the component
      </CompoundButton>
    );
  })
  .addStory('Icon only', () => <CompoundButton id={buttonId} icon={<CalendarMonth />} />)
  .addStory(
    'Circular and icon only',
    () => <CompoundButton id={buttonId} shape="circular" icon={<CalendarMonth />} />,
    {
      includeRtl: true,
    },
  );

storiesOf('ToggleButton Converged', module)
  .addDecorator(story => <StoryWright steps={steps}>{story()}</StoryWright>)
  .addStory('Default', () => <ToggleButton id={buttonId}>Hello, world</ToggleButton>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Circular', () => (
    <ToggleButton id={buttonId} shape="circular">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Outline', () => (
    <ToggleButton id={buttonId} appearance="outline">
      Hello, world
    </ToggleButton>
  ))
  .addStory(
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
  .addStory('Subtle', () => (
    <ToggleButton id={buttonId} appearance="subtle">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent', () => (
    <ToggleButton id={buttonId} appearance="transparent">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton id={buttonId} disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton id={buttonId} appearance="primary" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Disabled', () => (
    <ToggleButton id={buttonId} appearance="subtle" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Disabled', () => (
    <ToggleButton id={buttonId} appearance="transparent" disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size small', () => (
    <ToggleButton id={buttonId} icon={<CalendarMonth />} size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size large', () => (
    <ToggleButton id={buttonId} icon={<CalendarMonth />} size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size small - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    );
  })
  .addStory('Size medium - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    );
  })
  .addStory('Size large - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    );
  })
  .addStory('With icon before content', () => (
    <ToggleButton id={buttonId} icon={<CalendarMonth />}>
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon after content', () => (
    <ToggleButton id={buttonId} icon={<CalendarMonth />} iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Icon only', () => <ToggleButton id={buttonId} icon={<CalendarMonth />} />)
  .addStory('Circular and icon only', () => <ToggleButton id={buttonId} shape="circular" icon={<CalendarMonth />} />)
  .addStory('Checked', () => (
    <ToggleButton id={buttonId} checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Checked', () => (
    <ToggleButton id={buttonId} appearance="primary" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Checked', () => (
    <ToggleButton id={buttonId} appearance="subtle" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Checked', () => (
    <ToggleButton id={buttonId} appearance="transparent" checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('MenuButton Converged', module)
  .addDecorator(story => <StoryWright steps={steps}>{story()}</StoryWright>)
  .addStory('Default', () => <MenuButton id={buttonId}>Hello, world</MenuButton>, { includeRtl: true })
  .addStory('Circular', () => (
    <MenuButton id={buttonId} shape="circular">
      Hello, world
    </MenuButton>
  ))
  .addStory('Outline', () => (
    <MenuButton id={buttonId} appearance="outline">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton id={buttonId} appearance="primary">
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle', () => (
    <MenuButton id={buttonId} appearance="subtle">
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent', () => (
    <MenuButton id={buttonId} appearance="transparent">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton id={buttonId} disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Outline Disabled', () => (
    <MenuButton id={buttonId} appearance="outline" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton id={buttonId} appearance="primary" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle Disabled', () => (
    <MenuButton id={buttonId} appearance="subtle" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent Disabled', () => (
    <MenuButton id={buttonId} appearance="transparent" disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Size small', () => (
    <MenuButton id={buttonId} icon={<CalendarMonth />} size="small">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size large', () => (
    <MenuButton id={buttonId} icon={<CalendarMonth />} size="large">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size small - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
        Long text wraps after it hits the max width of the component
      </MenuButton>
    );
  })
  .addStory('Size medium - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
        Long text wraps after it hits the max width of the component
      </MenuButton>
    );
  })
  .addStory('Size large - with long text wrapping', () => {
    const styles = useStyles();
    return (
      <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
        Long text wraps after it hits the max width of the component
      </MenuButton>
    );
  })
  .addStory('With icon', () => (
    <MenuButton id={buttonId} icon={<CalendarMonth />}>
      Hello, world
    </MenuButton>
  ))
  .addStory('Icon only', () => <MenuButton id={buttonId} icon={<CalendarMonth />} />)
  .addStory('Circular and icon only', () => <MenuButton id={buttonId} shape="circular" icon={<CalendarMonth />} />);
