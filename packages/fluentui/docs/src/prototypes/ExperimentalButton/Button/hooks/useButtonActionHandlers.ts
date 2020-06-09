import { ButtonProps } from '@fluentui/react-northstar';
import { Extendable } from '@fluentui/styles';

export type ButtonActionHandlers<P = ButtonProps> = {
  performClick?: (event: React.KeyboardEvent) => void;
};

const useButtonActionHandlers = <P extends ButtonProps>(
  props: P,
  inputActionHandlers: Extendable<ButtonActionHandlers<P>> = {},
): Extendable<ButtonActionHandlers<P>> => {
  const handleClick = e => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }
    inputActionHandlers.performClick && inputActionHandlers.performClick(e);
    props.onClick && props.onClick(e, props);
  };

  return {
    performClick: handleClick,
  };
};

export default useButtonActionHandlers;
