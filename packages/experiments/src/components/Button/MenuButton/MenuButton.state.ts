import { useCallback, useRef } from 'react';
import { useControlledState } from '../../../Foundation';
import { KeyCodes } from '../../../Utilities';
import { IMenuButtonComponent, IMenuButtonViewProps } from './MenuButton.types';

export const useMenuButtonState: IMenuButtonComponent['state'] = props => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useControlledState(props, 'expanded', {
    defaultPropName: 'defaultExpanded',
    defaultPropValue: false
  });

  const { disabled, onClick, onKeyDown, onMenuDismiss } = props;

  const _onMenuDismiss = useCallback(() => {
    onMenuDismiss && onMenuDismiss();
    setExpanded(false);
  }, [onMenuDismiss]);

  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
      if (!disabled) {
        if (onClick) {
          onClick(ev);

          if (ev.defaultPrevented) {
            return;
          }
        }
        setExpanded(!expanded);
      }
    },
    [disabled, expanded, onClick]
  );

  const _onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
      if (!disabled) {
        if (onKeyDown) {
          onKeyDown(ev);

          if (ev.defaultPrevented) {
            return;
          }
        }

        if ((ev.altKey || ev.metaKey) && ev.keyCode === KeyCodes.down) {
          setExpanded(true);
        }
      }
    },
    [disabled, expanded, onKeyDown]
  );

  const viewProps: IMenuButtonViewProps = {
    ...props,
    expanded,
    onClick: _onClick,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss,
    menuButtonRef
  };

  return viewProps;
};
