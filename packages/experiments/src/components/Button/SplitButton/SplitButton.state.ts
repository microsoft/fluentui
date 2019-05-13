import { useCallback, useRef } from 'react';
import { ISplitButtonComponent, ISplitButtonViewProps } from './SplitButton.types';
import { IMenuButton } from '../MenuButton';
import { useControlledState } from '../../../Foundation';
import { KeyCodes } from '../../../Utilities';

export const useSplitButtonState: ISplitButtonComponent['state'] = props => {
  const menuButtonRef = useRef<IMenuButton | null>(null);
  const [expanded, setExpanded] = useControlledState(props, 'expanded', {
    defaultPropName: 'defaultExpanded',
    defaultPropValue: false
  });

  const _onMenuDismiss = useCallback(() => {
    setExpanded(false);
  }, []);

  const { disabled } = props;

  const _onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      if (!disabled && (ev.altKey || ev.metaKey) && ev.keyCode === KeyCodes.down) {
        setExpanded(true);
      }
    },
    [disabled, expanded, menuButtonRef]
  );

  const viewProps: ISplitButtonViewProps = {
    ...props,
    expanded,
    menuButtonRef,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss
  };

  return viewProps;
};
