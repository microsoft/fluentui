import { buttonBehavior } from '@fluentui/accessibility';
import { useBehaviorKeyActions, useTagNameFromRef } from '@uifabric/react-hooks';
import { ButtonProps, ButtonState } from './Button.types';

export const useButtonBehavior = (props: ButtonProps, ref: React.RefObject<HTMLElement>): Partial<ButtonState> => {
  const { disabled, loading, onClick, onKeyDown: _onKeyDown } = props;

  const { attributes, keyActions } = buttonBehavior({
    as: useTagNameFromRef(ref, 'button'),
    disabled,
    loading,
  });
  const buttonActions = useBehaviorKeyActions(keyActions, { root: { onClick, onKeyDown: _onKeyDown } });

  // We are already taking user input into consideration in useBehaviorKeyActions, so buttonActions should come after
  // props.
  return { ...attributes?.root, ...props, ...buttonActions };
};
