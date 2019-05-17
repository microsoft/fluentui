import { useCallback, useState } from 'react';
import { ISplitButtonComponent, ISplitButtonViewProps } from './SplitButton.types';
import { KeyCodes } from '../../../Utilities';

export const useSplitButtonState: ISplitButtonComponent['state'] = props => {
  const [menuTarget, setMenuTarget] = useState<HTMLElement | undefined>(undefined);
  const [expanded, setExpanded] = useState<boolean>(false);

  const _onMenuDismiss = useCallback(() => {
    setExpanded(false);
  }, []);

  const { disabled } = props;

  const _onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
      if (!disabled && (ev.altKey || ev.metaKey) && ev.keyCode === KeyCodes.down) {
        setExpanded(!expanded);
        setMenuTarget(ev.currentTarget);
      }
    },
    [disabled, expanded, menuTarget]
  );

  const viewProps: ISplitButtonViewProps = {
    ...props,
    expanded,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss,
    menuTarget
  };

  return viewProps;
};
