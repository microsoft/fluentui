import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Button } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import { TeamsTheme } from '@fluentui/storybook/lib/themes/v8/index';
import { withCompatThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities/index';

storiesOf('Button Next', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withCompatThemeProvider())
  .addDecorator(story => (
    <Screener
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
    </Screener>
  ))
  .addStory('Default', () => <Button>Hello, world</Button>)
  .addStory('Primary', () => <Button primary>Hello, world</Button>)
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>)
  .addStory('Primary Disabled', () => (
    <Button primary disabled>
      Hello, world
    </Button>
  ))
  .addStory('Subtle', () => <Button subtle>Hello, world</Button>)
  .addStory('Subtle Disabled', () => (
    <Button disabled subtle>
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
  .addDecorator(withCompatThemeProvider({ theme: TeamsTheme }))
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button subtle icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button disabled subtle icon="X" iconPosition="after">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button circular subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button circular disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button iconOnly subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button iconOnly disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button block subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button block disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button inverted subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button inverted disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addStory('Subtle', () => (
    <Button loading subtle icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button loading disabled subtle icon="X">
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
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
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
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
    </Screener>
  ))
  .addStory('Default', () => <Button icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Primary', () => <Button primary icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Disabled', () => <Button disabled icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Subtle', () => <Button subtle icon={<AddIcon />} tokens={{ iconSize: '30px' }} />)
  .addStory('Subtle Disabled', () => (
    <Button disabled subtle icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Transparent', () => (
    <Button transparent icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Transparent Disabled', () => (
    <Button disabled transparent icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));
