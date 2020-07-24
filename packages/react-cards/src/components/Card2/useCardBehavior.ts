import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { CardProps, CardState } from './Card.types';

export const useCardBehavior = (props: CardProps): Partial<CardState> => {
  const { disabled, onClick: _onClick, onKeyDown: _onKeyDown } = props;

  let onClick: ((ev: React.MouseEvent<HTMLDivElement>) => void) | undefined = undefined;
  if (_onClick) {
    onClick = (ev: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        _onClick(ev);
      }
    };
  }

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      _onKeyDown?.(ev);

      if (onClick) {
        const eventCode = getCode(ev);
        if (eventCode === EnterKey || eventCode === SpacebarKey) {
          onClick(ev as any);
        }
      }
    }
  };

  return {
    'aria-disabled': disabled,
    tabIndex: disabled ? undefined : 0,
    ...props,
    onClick,
    onKeyDown,
  };
};
