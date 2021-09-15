import { useSwitch } from './useSwitch';
import { renderSwitch } from './renderSwitch';
import { useSwitchStyles } from './useSwitchStyles';
import type { SwitchProps } from './Switch.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * The Switch control enables users to trigger an option on or off through pressing on the component.
 */
export const Switch = forwardRef<SwitchProps>((props, ref) => {
  const state = useSwitch(props, ref);

  useSwitchStyles(state);

  return renderSwitch(state);
});

Switch.displayName = 'Switch';
