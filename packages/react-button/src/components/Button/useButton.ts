import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { tokensToStyleObject } from '@fluentui/react-theme-provider';
import { ButtonProps, ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button component props and returns state.
 * @param props - Button props to derive state from.
 */
export const useButton = (props: ButtonProps): ButtonState => {
  const { as, onClick, onKeyDown: onButtonKeyDown } = props;

  const onKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement> & React.MouseEvent<HTMLButtonElement>) => {
    if (onButtonKeyDown) {
      onButtonKeyDown(ev);
    }

    if (onClick) {
      const eventCode = getCode(ev);
      if (eventCode === EnterKey || eventCode === SpacebarKey) {
        onClick(ev);
      }
    }
  };

  const isButtonRootType = !as || as === 'button';
  const rootTypeProps = isButtonRootType
    ? {}
    : {
        onKeyDown,
        role: 'button',
        tabIndex: 0,
      };

  return {
    ...props,
    ...rootTypeProps,
    style: { ...props.style, ...tokensToStyleObject(props.tokens, '--button') },
  };
};
