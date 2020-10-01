import * as React from 'react';
import { ToggleButton, ToggleButtonProps } from '@fluentui/react-button';
import { Stack, Text } from 'office-ui-fabric-react';
import * as classes from '../utils/Button.stories.scss';

const ToggleButtonVariants = (props: ToggleButtonProps) => (
  <div className={classes.hStack}>
    <ToggleButton {...props} icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} primary icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} disabled icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} primary disabled icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} ghost icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} ghost disabled icon="X">
      Hello, world
    </ToggleButton>
  </div>
);

export const ToggleButtonCss = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <ToggleButtonVariants />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <ToggleButtonVariants circular />

    <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
    <div className={classes.vStack}>
      <ToggleButton fluid icon="X">
        Hello, world
      </ToggleButton>
      <ToggleButton fluid primary icon="X">
        Hello, world
      </ToggleButton>
      <ToggleButton fluid disabled icon="X">
        Hello, world
      </ToggleButton>
      <ToggleButton fluid primary disabled icon="X">
        Hello, world
      </ToggleButton>
      <ToggleButton fluid ghost icon="X">
        Hello, world
      </ToggleButton>
      <ToggleButton fluid ghost disabled icon="X">
        Hello, world
      </ToggleButton>
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <ToggleButtonVariants iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <ToggleButtonVariants circular iconOnly />

    <Text variant="xLarge">An icon button can format its Icon to appear before or after its content.</Text>
    <div className={classes.vStack}>
      <ToggleButtonVariants iconPosition="before" />
      <ToggleButtonVariants iconPosition="after" />
    </div>

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <ToggleButtonVariants loading />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <ToggleButtonVariants size="smallest" />
      <ToggleButtonVariants size="smaller" />
      <ToggleButtonVariants size="small" />
      <ToggleButtonVariants size="large" />
      <ToggleButtonVariants size="larger" />
      <ToggleButtonVariants size="largest" />
    </div>
  </Stack>
);
