import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import {
  Button,
  ButtonProps,
  CompoundButton,
  ToggleButton,
  MenuButton,
} from '@fluentui/react-button';

import { FluentProviderDecorator, FabricDecorator } from '../utilities/index';

// TODO: this is here while waiting for react-icons to merge
const SVGIcon = () => (
  <span
    role="presentation"
    style={{
      width: '1em',
      height: '1em',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      style={{
        height: '100%',
        fill: 'currentColor',
        verticalAlign: 'top',
      }}
    >
      <path d="M768 768h128v128H768V768zm384 768h128v128h-128v-128zm384-768h128v128h-128V768zm-384 0h128v128h-128V768zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zM2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792z" />
    </svg>
  </span>
);
const SizeExample = ({ size }: ButtonProps) => (
  <>
    <h4>{size || '(default)'}</h4>
    <Button size={size}>Text</Button>
    <Button size={size} icon={<SVGIcon />}>
      Text
    </Button>
    <Button size={size} icon={<SVGIcon />} />
  </>
);
const AppearanceExample = (props: ButtonProps) => (
  <>
    <Button {...props} icon={<SVGIcon />} />
    <br />
    <Button {...props}>Text</Button>
    <Button {...props} icon={<SVGIcon />}>
      Text
    </Button>
    <Button {...props} icon={<SVGIcon />} iconPosition="after">
      Text
    </Button>
  </>
);

storiesOf('react-button Button', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <AppearanceExample />)
  .addStory('Text only', () => <Button>Text</Button>)
  .addStory('Text only long', () => (
    <Button>Text truncates after it hits the max width token value</Button>
  ))
  .addStory('Icon with text', () => (
    <>
      <Button icon={<SVGIcon />}>Text</Button>
      <Button icon={<SVGIcon />} iconPosition="after">
        Text
      </Button>
    </>
  ))

  .addStory('Icon only', () => <Button icon={<SVGIcon />} />)
  .addStory('Size', () => (
    <>
      <SizeExample size="small" />
      <SizeExample />
      <SizeExample size="large" />
    </>
  ))

  .addStory('Primary', () => <AppearanceExample primary />)
  .addStory('Subtle', () => <AppearanceExample subtle />)
  .addStory('Transparent', () => <AppearanceExample transparent />)
  .addStory('Disabled', () => (
    <>
      <Button disabled icon={<SVGIcon />}>
        Default disabled
      </Button>
      <Button primary disabled icon={<SVGIcon />}>
        Primary disabled
      </Button>
    </>
  ));

storiesOf('react-button CompoundButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <CompoundButton secondaryContent="This is some secondary text">Hello, world</CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle', () => (
    <CompoundButton secondaryContent="This is some secondary text" subtle>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent', () => (
    <CompoundButton secondaryContent="This is some secondary text" transparent>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" subtle disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" transparent disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon before content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon after content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" iconPosition="after">
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
  .addStory('Icon only', () => <CompoundButton icon="X" />);

storiesOf('react-button ToggleButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <ToggleButton>Hello, world</ToggleButton>)
  .addStory('Primary', () => <ToggleButton primary>Hello, world</ToggleButton>)
  .addStory('Subtle', () => <ToggleButton subtle>Hello, world</ToggleButton>)
  .addStory('Transparent', () => <ToggleButton transparent>Hello, world</ToggleButton>)
  .addStory('Disabled', () => <ToggleButton disabled>Hello, world</ToggleButton>)
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Disabled', () => (
    <ToggleButton subtle disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Disabled', () => (
    <ToggleButton transparent disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon before content', () => <ToggleButton icon="X">Hello, world</ToggleButton>)
  .addStory('With icon after content', () => (
    <ToggleButton icon="X" iconPosition="after">
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
  .addStory('Icon only', () => <ToggleButton icon="X" />)
  .addStory('Checked', () => (
    <ToggleButton icon="X" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Checked', () => (
    <ToggleButton icon="X" primary checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Checked', () => (
    <ToggleButton icon="X" subtle checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Checked', () => (
    <ToggleButton icon="X" transparent checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('react-button MenuButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <MenuButton>Hello, world</MenuButton>)
  .addStory('Primary', () => <MenuButton primary>Hello, world</MenuButton>)
  .addStory('Subtle', () => <MenuButton subtle>Hello, world</MenuButton>)
  .addStory('Transparent', () => <MenuButton transparent>Hello, world</MenuButton>)
  .addStory('Disabled', () => <MenuButton disabled>Hello, world</MenuButton>)
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle Disabled', () => (
    <MenuButton subtle disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent Disabled', () => (
    <MenuButton transparent disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('With icon', () => <MenuButton icon="X">Hello, world</MenuButton>)
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
  .addStory('Icon only', () => <MenuButton icon="X" />);
