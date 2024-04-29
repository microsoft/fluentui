import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
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

export default {
  title: 'FluentProvider CustomStyleHooks',
  Component: FluentProvider,
} as ComponentMeta<typeof Button>;

export const Default = () => <FluentProvider>Hello, world</FluentProvider>;

const useCustomStyles = makeStyles({
  button: {
    backgroundColor: 'red',
    color: 'white',
    ...shorthands.borderWidth('4px'),
    ...shorthands.borderColor('crimson'),
    ...shorthands.borderRadius('0'),
  },
});

export const ButtonCustomStyles = () => {
  const styles = useCustomStyles();

  const customStyleHooks: FluentProviderCustomStyleHooks = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useButtonStyles_unstable: (state: unknown) => {
      const componentState = state as ButtonState;
      componentState.root.className = mergeClasses(componentState.root.className, styles.button);
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useCompoundButtonStyles_unstable: (state: unknown) => {
      const componentState = state as CompoundButtonState;
      componentState.root.className = mergeClasses(componentState.root.className, styles.button);
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useMenuButtonStyles_unstable: (state: unknown) => {
      const componentState = state as MenuButtonState;
      componentState.root.className = mergeClasses(componentState.root.className, styles.button);
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useSplitButtonStyles_unstable: (state: unknown) => {
      const componentState = state as SplitButtonState;
      if (componentState.menuButton) {
        componentState.menuButton.className = mergeClasses(componentState.menuButton.className, styles.button);
      }
      if (componentState.primaryActionButton) {
        componentState.primaryActionButton.className = mergeClasses(
          componentState.primaryActionButton.className,
          styles.button,
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useToggleButtonStyles_unstable: (state: unknown) => {
      const componentState = state as ToggleButtonState;
      componentState.root.className = mergeClasses(componentState.root.className, styles.button);
    },
  };

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <ToggleButton>Hello, world</ToggleButton>
    </FluentProvider>
  );
};

ToggleButtonCustomStyles.storyName = 'ToggleButton';
