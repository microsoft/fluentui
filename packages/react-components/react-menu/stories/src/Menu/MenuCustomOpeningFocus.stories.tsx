import * as React from 'react';
import {
  Button,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  renderMenu_unstable,
  useMenuContextValues_unstable,
  useMenuRestoreFocus_unstable,
  useMenuState_unstable,
} from '@fluentui/react-components';
import type { JSXElement, MenuProps } from '@fluentui/react-components';

const CustomOpeningMenu = (
  props: MenuProps & { initialFocusRef: React.RefObject<HTMLDivElement | null> },
): JSXElement => {
  const { initialFocusRef, ...menuProps } = props;
  const state = useMenuState_unstable(menuProps);
  useMenuRestoreFocus_unstable(state);

  React.useEffect(() => {
    if (state.open) {
      initialFocusRef.current?.focus();
    }
  }, [state.open, initialFocusRef]);

  const contextValues = useMenuContextValues_unstable(state);
  return renderMenu_unstable(state, contextValues);
};

export const CustomOpeningFocus = (): JSXElement => {
  const initialFocusRef = React.useRef<HTMLDivElement>(null);

  return (
    <CustomOpeningMenu initialFocusRef={initialFocusRef}>
      <MenuTrigger disableButtonEnhancement>
        <Button>Open menu</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>First command</MenuItem>
          <MenuItem ref={initialFocusRef}>Initially focused command</MenuItem>
          <MenuItem>Last command</MenuItem>
        </MenuList>
      </MenuPopover>
    </CustomOpeningMenu>
  );
};

CustomOpeningFocus.parameters = {
  docs: {
    description: {
      story: [
        '`useMenuState_unstable` creates complete Menu state, including positioning, dismissal, selection and motion,',
        'without installing root opening-focus or close-restoration effects. Pass that state to the existing context',
        'and render helpers. This example supplies its own opening-focus policy and composes',
        '`useMenuRestoreFocus_unstable` to retain restoration without stealing focus from an external element.',
        '',
        'Compose `useMenuFocusFirst_unstable` when the usual first-focusable opening policy is wanted.',
        '`useMenu_unstable` and `useMenuBase_unstable` continue to install both default focus policies.',
        'Use the stable refs from the state hook; a positioning target alone is not a trigger or return-focus anchor.',
        '',
        'The standard styled menu parts retain their own keyboard behavior: Tab dismisses relative to the root trigger,',
        'and a directional key can enter an already-open submenu. This command-menu example is not a search or editable',
        'combobox pattern; replacing root autofocus alone does not define those accessibility contracts.',
      ].join('\n'),
    },
  },
};
