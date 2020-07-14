import { buttonBehavior } from '@fluentui/accessibility';
import { useBehaviorKeyActions } from '@uifabric/react-hooks';
import { ButtonProps, ButtonState } from './Button.types';

export const useButtonBehavior = (props: ButtonProps, ref: React.RefObject<HTMLElement>): Partial<ButtonState> => {
  const { disabled, loading, onClick, onKeyDown: _onKeyDown } = props;

  const { attributes, keyActions } = buttonBehavior({ as: ref.current?.tagName || 'button', disabled, loading });
  const { onKeyDown } = useBehaviorKeyActions(keyActions, { onClick, onKeyDown: _onKeyDown });

  return { ...attributes?.root, onKeyDown };
};
