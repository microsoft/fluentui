import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Button, CompoundButton, ToggleButton, MenuButton, ButtonProps } from '@fluentui/react-button';

const buttonId = 'button-id';

const appearances: ButtonProps['appearance'][] = ['outline', 'primary', 'secondary', 'subtle', 'transparent'];
const shapes: ButtonProps['shape'][] = ['circular', 'rounded', 'square'];
const sizes: ButtonProps['size'][] = ['small', 'medium', 'large'];

storiesOf('Button Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <Button key={appearance} appearance={appearance}>
          {appearance}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <Button key={shape} shape={shape}>
          {shape}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <Button disabled key={appearance} appearance={appearance}>
          {appearance}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <Button icon="X" disabled key={size} size={size}>
          {size}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <Button id={buttonId} icon="X">
          Before content
        </Button>
        <Button id={buttonId} icon="X" iconPosition="after">
          After content
        </Button>
        <Button id={buttonId} icon="X" />
        <Button id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('Button Block Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory('Appearance', () => {
    return appearances.map(appearance => (
      <Button block key={appearance} appearance={appearance}>
        {appearance}
      </Button>
    ));
  })
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <Button block key={shape} shape={shape}>
          {shape}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <Button block disabled key={appearance} appearance={appearance}>
          {appearance}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <Button block icon="X" disabled key={size} size={size}>
          {size}
        </Button>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('CompoundButton Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
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
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <CompoundButton key={appearance} appearance={appearance} secondaryContent="This is some secondary text">
          {appearance}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <CompoundButton
          disabled
          key={appearance}
          appearance={appearance}
          secondaryContent="This is some secondary text"
        >
          {appearance}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <CompoundButton disabled key={size} size={size} secondaryContent="This is some secondary text">
          {size}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <CompoundButton key={shape} shape={shape}>
          {shape}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <CompoundButton id={buttonId} icon="X">
          Before content
        </CompoundButton>
        <CompoundButton id={buttonId} icon="X" iconPosition="after">
          After content
        </CompoundButton>
        <CompoundButton id={buttonId} icon="X" />
        <CompoundButton id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('CompoundButton Block Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <CompoundButton block key={appearance} appearance={appearance} secondaryContent="This is some secondary text">
          {appearance}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <CompoundButton
          block
          disabled
          key={appearance}
          appearance={appearance}
          secondaryContent="This is some secondary text"
        >
          {appearance}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <CompoundButton block disabled key={size} size={size} secondaryContent="This is some secondary text">
          {size}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <CompoundButton block key={shape} shape={shape}>
          {shape}
        </CompoundButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('ToggleButton Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <ToggleButton key={appearance} appearance={appearance}>
          {appearance}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <ToggleButton disabled key={appearance} appearance={appearance}>
          {appearance}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <ToggleButton disabled key={size} size={size}>
          {size}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <ToggleButton key={shape} shape={shape}>
          {shape}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <ToggleButton id={buttonId} icon="X">
          Before content
        </ToggleButton>
        <ToggleButton id={buttonId} icon="X" iconPosition="after">
          After content
        </ToggleButton>
        <ToggleButton id={buttonId} icon="X" />
        <ToggleButton id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory('Checked', () => {
    return appearances.map(appearance => (
      <ToggleButton key={appearance} checked appearance={appearance}>
        {appearance}
      </ToggleButton>
    ));
  });

storiesOf('ToggleButton Block Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <ToggleButton block key={appearance} appearance={appearance}>
          {appearance}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <ToggleButton block disabled key={appearance} appearance={appearance}>
          {appearance}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <ToggleButton block disabled key={size} size={size}>
          {size}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <ToggleButton block key={shape} shape={shape}>
          {shape}
        </ToggleButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <ToggleButton block id={buttonId} icon="X">
          Before content
        </ToggleButton>
        <ToggleButton block id={buttonId} icon="X" iconPosition="after">
          After content
        </ToggleButton>
        <ToggleButton block id={buttonId} icon="X" />
        <ToggleButton block id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory('Checked', () => {
    return appearances.map(appearance => (
      <ToggleButton block key={appearance} checked appearance={appearance}>
        {appearance}
      </ToggleButton>
    ));
  });

storiesOf('MenuButton Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <MenuButton key={appearance} appearance={appearance}>
          {appearance}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <MenuButton key={shape} shape={shape}>
          {shape}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <MenuButton disabled key={appearance} appearance={appearance}>
          {appearance}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <MenuButton icon="X" disabled key={size} size={size}>
          {size}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <MenuButton id={buttonId} icon="X">
          With icon
        </MenuButton>
        <MenuButton id={buttonId} icon="X" />
        <MenuButton id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('MenuButton Block Converged', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'Appearance',
    () => {
      return appearances.map(appearance => (
        <MenuButton block key={appearance} appearance={appearance}>
          {appearance}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Shape',
    () => {
      return shapes.map(shape => (
        <MenuButton block key={shape} shape={shape}>
          {shape}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => {
      return appearances.map(appearance => (
        <MenuButton block disabled key={appearance} appearance={appearance}>
          {appearance}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Size',
    () => {
      return sizes.map(size => (
        <MenuButton block icon="X" disabled key={size} size={size}>
          {size}
        </MenuButton>
      ));
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'With icon',
    () => (
      <>
        <MenuButton block id={buttonId} icon="X">
          With icon
        </MenuButton>
        <MenuButton block id={buttonId} icon="X" />
        <MenuButton block id={buttonId} shape="circular" icon="X" />
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );
