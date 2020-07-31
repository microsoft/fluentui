import { createButton } from '../Button/createButton';
import { ToggleButtonProps } from './ToggleButton.types';
import { useChecked } from './useChecked';

export const createToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: ToggleButtonProps,
) => {
  const buttonDefinition = createButton(props, ref, defaultProps);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useChecked(buttonDefinition.state as ToggleButtonProps);

  return buttonDefinition;
};
