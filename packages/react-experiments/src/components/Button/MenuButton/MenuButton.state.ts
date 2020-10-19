import * as React from 'react';
import { useControlledState } from '@uifabric/foundation';
import { KeyCodes } from '../../../Utilities';
import { IMenuButtonComponent, IMenuButtonViewProps } from './MenuButton.types';

export const useMenuButtonState: IMenuButtonComponent['state'] = props => {
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useControlledState(props, 'expanded', {
    defaultPropName: 'defaultExpanded',
    defaultPropValue: false,
  });

  const { disabled, onClick, onKeyDown, onMenuDismiss } = props;

  const _onMenuDismiss = React.useCallback(() => {
    onMenuDismiss && onMenuDismiss();
    setExpanded(false);
  }, [onMenuDismiss, setExpanded]);

  const _onClick = React.useCallback(
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
    [disabled, expanded, onClick, setExpanded],
  );

  const _onKeyDown = React.useCallback(
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
    [disabled, onKeyDown, setExpanded],
  );

  const viewProps: IMenuButtonViewProps = {
    ...props,
    expanded,
    onClick: _onClick,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss,
    menuButtonRef,
  };

  return viewProps;
};
