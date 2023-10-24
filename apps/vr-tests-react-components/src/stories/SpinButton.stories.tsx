import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { SpinButton, spinButtonClassNames } from '@fluentui/react-spinbutton';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { FluentProvider } from '@fluentui/react-provider';
import { makeStyles } from '@griffel/react';

const cropTo = '.testWrapper';

storiesOf('SpinButton Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo })
        .hover('input')
        .snapshot('hoverInput', { cropTo })

        .hover(`.${spinButtonClassNames.incrementButton}`)
        .snapshot('hoverIncrement', { cropTo })

        .hover(`.${spinButtonClassNames.decrementButton}`)
        .snapshot('hoverDecrement', { cropTo })

        .mouseDown(`.${spinButtonClassNames.incrementButton}`)
        .wait(250)
        .snapshot('mouseDownIncrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.incrementButton}`)

        .mouseDown(`.${spinButtonClassNames.decrementButton}`)
        .wait(250)
        .snapshot('mouseDownDecrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.decrementButton}`)

        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Appearance: outline (default)', () => <SpinButton value={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Appearance: underline', () => <SpinButton appearance="underline" value={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Appearance: filled-darker', () => <SpinButton appearance="filled-darker" value={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Appearance: filled-lighter',
    () => (
      // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
      <div style={{ background: '#f5f5f5', padding: '10px' }}>
        <SpinButton appearance="filled-lighter" value={10} />
      </div>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Invalid: outline', () => <SpinButton aria-invalid value={10} />)
  .addStory('Invalid: underline', () => <SpinButton aria-invalid appearance="underline" value={10} />)
  .addStory('Invalid: filled-darker', () => <SpinButton aria-invalid appearance="filled-darker" value={10} />)
  .addStory('Invalid: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <SpinButton aria-invalid appearance="filled-lighter" value={10} />
    </div>
  ))
  .addStory('Display Value', () => <SpinButton value={10} displayValue="$10.00" />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled', () => <SpinButton disabled value={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  });

// The order of increment/decrement mouse down matters for max bound
storiesOf('SpinButton Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo })
        .hover('input')
        .snapshot('hoverInput', { cropTo })

        .hover(`.${spinButtonClassNames.incrementButton}`)
        .snapshot('hoverIncrement', { cropTo })

        .hover(`.${spinButtonClassNames.decrementButton}`)
        .snapshot('hoverDecrement', { cropTo })

        .mouseDown(`.${spinButtonClassNames.incrementButton}`)
        .wait(250)
        .snapshot('mouseDownIncrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.incrementButton}`)

        .mouseDown(`.${spinButtonClassNames.decrementButton}`)
        .wait(250)
        .snapshot('mouseDownDecrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.decrementButton}`)

        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('At Max Bound', () => <SpinButton value={10} max={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  });

// The order of increment/decrement mouse down matters for min bound
storiesOf('SpinButton Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo })
        .hover('input')
        .snapshot('hoverInput', { cropTo })

        .hover(`.${spinButtonClassNames.incrementButton}`)
        .snapshot('hoverIncrement', { cropTo })

        .hover(`.${spinButtonClassNames.decrementButton}`)
        .snapshot('hoverDecrement', { cropTo })

        .mouseDown(`.${spinButtonClassNames.decrementButton}`)
        .wait(250)
        .snapshot('mouseDownDecrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.decrementButton}`)

        .mouseDown(`.${spinButtonClassNames.incrementButton}`)
        .wait(250)
        .snapshot('mouseDownIncrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.incrementButton}`)

        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('At Min Bound', () => <SpinButton value={10} min={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  });

storiesOf('SpinButton Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => <StoryWright steps={new Steps().snapshot('default', { cropTo }).end()}>{story()}</StoryWright>)
  .addStory('Size: small', () => <SpinButton size="small" value={10} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Size: medium (default)', () => <SpinButton value={10} />, { includeRtl: true })
  .addStory('With appearance override', () => (
    <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SpinButton value={10} />
        <SpinButton value={10} appearance="outline" />
      </div>
    </FluentProvider>
  ))
  .addStory(
    'Custom Width',
    () => {
      const useStyles = makeStyles({
        customWidth: { width: '50px' },
      });
      const classes = useStyles();
      return <SpinButton value={10} className={classes.customWidth} />;
    },
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
