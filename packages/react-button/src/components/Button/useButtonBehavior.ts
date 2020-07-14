import { buttonBehavior } from '@fluentui/accessibility';
import { useBehaviorKeyActions } from '@uifabric/react-hooks';
import { ButtonProps, ButtonState } from './Button.types';

export const useButtonBehavior = (props: ButtonProps, ref: React.Ref<HTMLElement>): Partial<ButtonState> => {
  const { as, disabled, loading, onClick, onKeyDown: _onKeyDown } = props;

  const { attributes, keyActions } = buttonBehavior({
    as: (ref !== null && typeof ref !== 'function' && ref.current?.tagName) || (as as string),
    disabled,
    loading,
  });
  const { onKeyDown } = useBehaviorKeyActions(keyActions, { onClick, onKeyDown: _onKeyDown });

  return { ...attributes?.root, onKeyDown };
};
