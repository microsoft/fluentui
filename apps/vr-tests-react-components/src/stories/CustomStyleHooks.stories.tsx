import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Button, CompoundButton, MenuButton, SplitButton, ToggleButton } from '@fluentui/react-button';
import type {
  ButtonState,
  CompoundButtonState,
  MenuButtonState,
  SplitButtonState,
  ToggleButtonState,
} from '@fluentui/react-button';
import { FluentProvider, FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { type StoryParameters, Steps } from 'storywright';

export default {
  title: 'FluentProvider CustomStyleHooks',
  component: FluentProvider,
  parameters: {
    storyWright: { steps: new Steps().snapshot('normal').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof FluentProvider>;

export const Default = () => <FluentProvider>Hello, world</FluentProvider>;

const useCustomStyles = makeStyles({
  button: {
    backgroundColor: 'red',
    color: 'white',
    ...shorthands.borderWidth('4px'),
    ...shorthands.borderColor('crimson'),
    ...shorthands.borderRadius('0'),
  },

  purpleButton: {
    ...shorthands.borderColor('indigo'),
    backgroundColor: 'purple',
    color: 'lavender',
  },
});

export const ButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useButtonStyles_unstable: (state: unknown) => {
      const componentState = state as ButtonState;
      componentState.root.className = mergeClasses(
        componentState.root.className,
        styles.button,
        getSlotClassNameProp_unstable(componentState.root),
      );
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <Button>Hello, world</Button>
    </FluentProvider>
  );
};

ButtonCustomStyles.storyName = 'Button';

export const CompoundButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useCompoundButtonStyles_unstable: (state: unknown) => {
      const componentState = state as CompoundButtonState;
      componentState.root.className = mergeClasses(
        componentState.root.className,
        styles.button,
        getSlotClassNameProp_unstable(componentState.root),
      );
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <CompoundButton secondaryContent={'Another hello'}>Hello, world</CompoundButton>
    </FluentProvider>
  );
};

CompoundButtonCustomStyles.storyName = 'CompoundButton';

export const MenuButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useMenuButtonStyles_unstable: (state: unknown) => {
      const componentState = state as MenuButtonState;
      componentState.root.className = mergeClasses(
        componentState.root.className,
        styles.button,
        getSlotClassNameProp_unstable(componentState.root),
      );
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <MenuButton>Hello, world</MenuButton>
    </FluentProvider>
  );
};

MenuButtonCustomStyles.storyName = 'MenuButton';

export const SplitButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useSplitButtonStyles_unstable: (state: unknown) => {
      const componentState = state as SplitButtonState;
      if (componentState.menuButton) {
        componentState.menuButton.className = mergeClasses(
          componentState.menuButton.className,
          styles.button,
          getSlotClassNameProp_unstable(componentState.menuButton),
        );
      }
      if (componentState.primaryActionButton) {
        componentState.primaryActionButton.className = mergeClasses(
          componentState.primaryActionButton.className,
          styles.button,
          getSlotClassNameProp_unstable(componentState.primaryActionButton),
        );
      }
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <SplitButton>Hello, world</SplitButton>
    </FluentProvider>
  );
};

SplitButtonCustomStyles.storyName = 'SplitButton';

export const ToggleButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useToggleButtonStyles_unstable: (state: unknown) => {
      const componentState = state as ToggleButtonState;
      componentState.root.className = mergeClasses(
        componentState.root.className,
        styles.button,
        getSlotClassNameProp_unstable(componentState.root),
      );
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <ToggleButton>Hello, world</ToggleButton>
    </FluentProvider>
  );
};

ToggleButtonCustomStyles.storyName = 'ToggleButton';

export const ClassNamePropWithCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    useButtonStyles_unstable: (state: unknown) => {
      const componentState = state as ButtonState;
      componentState.root.className = mergeClasses(
        componentState.root.className,
        styles.button,
        getSlotClassNameProp_unstable(componentState.root),
      );
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <Button className={styles.purpleButton}>Purple button</Button>
    </FluentProvider>
  );
};

ClassNamePropWithCustomStyles.storyName = 'Button with className';
