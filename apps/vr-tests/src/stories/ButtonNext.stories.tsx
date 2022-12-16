import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Button } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { withThemeProvider } from '@fluentui/storybook';
import { PartialTheme } from '@fluentui/react-theme-provider';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities/index';

const TeamsTheme: PartialTheme = {
  tokens: {
    color: {
      brand: {
        background: '#6264a7',

        disabled: {
          background: '#edebe9',
          contentColor: '#c8c6c4',
          borderColor: 'var(--color-brand-disabled-background)',
        },

        pressed: {
          background: '#464775',
        },

        focused: {
          background: '#585a96',
        },

        hovered: {
          background: '#585a96',
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily:
            `"Segoe UI", "Helvetica Neue", "Apple Color Emoji", ` +
            `"Segoe UI Emoji", Helvetica, Arial, sans-serif`,
          fontWeight: '600',
          borderColor: '#e1dfdd',
          transition: 'all 100ms ease 0s',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.2rem 0.4rem -0.075rem',

          contentColor: '#252423',
          focusColor: '#000',

          disabled: {
            background: '#edebe9',
            contentColor: '#c8c6c4',
            borderColor: 'var(--button-disabled-background)',
            boxShadow: 'none',
          },
          hovered: {
            background: '#edebe9',
            contentColor: 'var(--button-contentColor)',
            borderColor: 'var(--button-borderColor)',
          },
          pressed: {
            background: '#e1dfdd',
            contentColor: 'var(--button-contentColor)',
            borderColor: 'var(--button-borderColor)',
            transition: 'all 50ms ease 0s',
            boxShadow: 'none',
          },
        },
      },
    },
    CompoundButton: {
      variants: {
        root: {
          disabled: {
            secondaryContentColor: 'var(--button-idsabled-contentColor)',
          },
        },
      },
    },
  },
};

storiesOf('Button Next', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => <Button>Hello, world</Button>)
  .addStory('Primary', () => <Button primary>Hello, world</Button>)
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>)
  .addStory('Primary Disabled', () => (
    <Button primary disabled>
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => <Button ghost>Hello, world</Button>)
  .addStory('Ghost Disabled', () => (
    <Button disabled ghost>
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => <Button transparent>Hello, world</Button>)
  .addStory('Transparent Disabled', () => (
    <Button disabled transparent>
      Hello, world
    </Button>
  ))
  .addStory('Anchor', () => <Button href="https://www.bing.com">Hello, world</Button>);

storiesOf('Button Next - Teams Theme', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider({ theme: TeamsTheme }))
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => <Button>Hello, world</Button>)
  .addStory('Primary', () => <Button primary>Hello, world</Button>)
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>)
  .addStory('Primary Disabled', () => (
    <Button primary disabled>
      Hello, world
    </Button>
  ))
  .addStory('With icon before content', () => <Button icon="X">Hello, world</Button>);

storiesOf('Button Next - With icon before content', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')

        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => <Button icon="X">Hello, world</Button>)
  .addStory('Primary', () => (
    <Button primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - With icon after content', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button primary icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button disabled icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button ghost icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button disabled ghost icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button transparent icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button disabled transparent icon="X" iconPosition="after">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Circular', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button circular icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button circular primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button circular disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button circular primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button circular ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button circular disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button circular transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button circular disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Icon only', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button iconOnly icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button iconOnly primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button iconOnly disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button iconOnly primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button iconOnly ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button iconOnly disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button iconOnly transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button iconOnly disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Block', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button block icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button block primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button block disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button block primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button block ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button block disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button block transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button block disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Inverted', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button inverted icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button inverted primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button inverted disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button inverted primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button inverted ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button inverted disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button inverted transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button inverted disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Loading', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <Button loading icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button loading primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button loading disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button loading primary disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost', () => (
    <Button loading ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Ghost Disabled', () => (
    <Button loading disabled ghost icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent', () => (
    <Button loading transparent icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button loading disabled transparent icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Sizes', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Smallest', () => (
    <Button icon="X" size="smallest">
      Hello, world
    </Button>
  ))
  .addStory('Smaller', () => (
    <Button icon="X" size="smaller">
      Hello, world
    </Button>
  ))
  .addStory('Small', () => (
    <Button icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStory('Large', () => (
    <Button icon="X" size="large">
      Hello, world
    </Button>
  ))
  .addStory('Larger', () => (
    <Button icon="X" size="larger">
      Hello, world
    </Button>
  ))
  .addStory('Largest', () => (
    <Button icon="X" size="largest">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - With styled icon from react-icons via tokens', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => <Button icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Primary', () => <Button primary icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Disabled', () => <Button disabled icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Ghost', () => <Button ghost icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Ghost Disabled', () => (
    <Button disabled ghost icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Transparent', () => (
    <Button transparent icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Transparent Disabled', () => (
    <Button disabled transparent icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));
