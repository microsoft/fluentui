import * as React from 'react';
import { ToggleButton, ToggleButtonProps } from '@fluentui/react-button';
import { Stack, Text } from '@fluentui/react';

const ToggleButtonExamples = (props: ToggleButtonProps) => (
  <div>
    <ToggleButton {...props} icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} disabled icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} primary icon="X">
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
    <ToggleButton {...props} transparent icon="X">
      Hello, world
    </ToggleButton>
    <ToggleButton {...props} transparent disabled icon="X">
      Hello, world
    </ToggleButton>
  </div>
);

export const ToggleButtons = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <ToggleButtonExamples />

    <Text variant="xLarge">A button can be focusable when disabled</Text>
    <div>
      <ToggleButton disabled icon="X">
        Disabled, non-focusable button
      </ToggleButton>
      <ToggleButton disabled disabledFocusable icon="X">
        Disabled, focusable button
      </ToggleButton>
    </div>

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <ToggleButtonExamples circular />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div>
      <ToggleButtonExamples block />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <ToggleButtonExamples iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <ToggleButtonExamples circular iconOnly />

    <Text variant="xLarge">An icon button can format its Icon to appear before or after its content.</Text>
    <div>
      <ToggleButtonExamples iconPosition="before" />
      <ToggleButtonExamples iconPosition="after" />
    </div>

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <ToggleButtonExamples loading />

    <Text variant="xLarge">A button can be sized.</Text>
    <div>
      <ToggleButtonExamples size="smallest" />
      <ToggleButtonExamples size="smaller" />
      <ToggleButtonExamples size="small" />
      <ToggleButtonExamples size="large" />
      <ToggleButtonExamples size="larger" />
      <ToggleButtonExamples size="largest" />
    </div>
  </Stack>
);
