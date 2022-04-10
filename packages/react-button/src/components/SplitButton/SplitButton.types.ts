import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from '../Button/Button.types';
import type { MenuButtonProps, MenuButtonState } from '../MenuButton/MenuButton.types';
// import * as React from 'react';

export type SplitButtonSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: Slot<typeof MenuButton>;
  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: Slot<typeof Button>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Omit<ButtonProps, 'root'> &
  Omit<MenuButtonProps, 'root'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;

// type MenuButtonSlot = SplitButtonSlots['menuButton'];
// type TestType = ExtractSlotProps<SplitButtonSlots['menuButton']>;
// type OmittedComponentType<T extends { as?: unknown }> = Omit<T, 'as'> & { as?: Exclude<T['as'],
// React.ComponentType> };

// export type As1 = TestType['as'];
// export type As2 = OmittedComponentType<TestType>['as'];
// export const test: React.ComponentType<TestType> = MenuButton;
// export const test2: React.ComponentType<OmittedComponentType<TestType>> = MenuButton;
