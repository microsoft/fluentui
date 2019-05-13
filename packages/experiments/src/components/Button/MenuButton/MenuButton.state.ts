import { useCallback, useImperativeHandle, useState } from 'react';
import { useControlledState } from '../../../Foundation';
import { KeyCodes } from '../../../Utilities';
import { IMenuButtonComponent, IMenuButtonViewProps } from './MenuButton.types';

export const useMenuButtonState: IMenuButtonComponent['state'] = props => {
  const [menuTarget, setMenuTarget] = useState<HTMLElement | undefined>(undefined);
  const [expanded, setExpanded] = useControlledState(props, 'expanded', {
    defaultPropName: 'defaultExpanded',
    defaultPropValue: false
  });

  const _onMenuDismiss = useCallback(() => {
    setExpanded(false);
  }, []);

  const { disabled, onClick } = props;

  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        if (onClick) {
          onClick(ev);

          if (ev.defaultPrevented) {
            return;
          }
        }
        setExpanded(!expanded);
        setMenuTarget(ev.currentTarget);
      }
    },
    [expanded, onClick]
  );

  const _onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      if (!disabled && (ev.altKey || ev.metaKey) && ev.keyCode === KeyCodes.down) {
        setExpanded(!expanded);
        setMenuTarget(ev.currentTarget);
      }
    },
    [disabled, expanded]
  );

  useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      /** no impl **/
    },
    onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => {
      _onKeyDown(ev);
    }
  }));

  const viewProps: IMenuButtonViewProps = {
    ...props,
    expanded,
    onClick: _onClick,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss,
    menuTarget
  };

  return viewProps;
};
