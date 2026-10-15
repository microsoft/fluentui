import * as React from 'react';
import {
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFluent,
  useFocusFinders,
  useId,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const commands = ['New document', 'Print document', 'Share'];

export const ExternalEditableTrigger = (): JSXElement => {
  const [triggerElement, setTriggerElement] = React.useState<HTMLInputElement | null>(null);
  const [requested, setRequested] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<{ query: string; commands: string[] }>();
  const [executedCommand, setExecutedCommand] = React.useState('');
  const listRef = React.useRef<HTMLDivElement>(null);
  const enterMenuRef = React.useRef<'ArrowDown' | 'ArrowUp' | null>(null);
  const menuId = useId('commands');
  const instructionsId = useId('command-instructions');
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;
  const { findFirstFocusable, findLastFocusable } = useFocusFinders();
  const loading = requested && results?.query !== query;
  const open = requested && !loading && !!results?.commands.length;

  React.useEffect(() => {
    if (!requested || results?.query === query) {
      return;
    }

    // Simulate a query-bound request; dismissal or a new query cancels it.
    const timeout = targetWindow?.setTimeout(() => {
      setResults({
        query,
        commands: commands.filter(command => command.toLowerCase().includes(query.toLowerCase())),
      });
    }, 500);
    return () => targetWindow?.clearTimeout(timeout);
  }, [query, requested, results?.query, targetWindow]);

  React.useEffect(() => {
    if (open && enterMenuRef.current) {
      const findFocusable = enterMenuRef.current === 'ArrowDown' ? findFirstFocusable : findLastFocusable;
      enterMenuRef.current = null;
      findFocusable(listRef.current)?.focus();
    }
  }, [open, findFirstFocusable, findLastFocusable]);

  const dismiss = () => {
    enterMenuRef.current = null;
    setRequested(false);
  };

  return (
    <>
      <p id={instructionsId}>
        Type to filter commands. When results are ready, press Down Arrow to enter the first command or Up Arrow to
        enter the last. Press Escape to dismiss.
      </p>
      <Input
        aria-label="Find commands"
        aria-describedby={instructionsId}
        name="commandQuery"
        value={query}
        input={{
          ref: setTriggerElement,
          'aria-haspopup': 'menu',
          'aria-controls': open ? menuId : undefined,
        }}
        onChange={(_, data) => {
          setQuery(data.value);
          setExecutedCommand('');
          setRequested(true);
        }}
        onClick={() => setRequested(true)}
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) {
            return;
          }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (results?.query !== query || !results.commands.length) {
              setRequested(true);
            } else if (open) {
              const findFocusable = event.key === 'ArrowDown' ? findFirstFocusable : findLastFocusable;
              findFocusable(listRef.current)?.focus();
            } else {
              enterMenuRef.current = event.key;
              setRequested(true);
            }
          } else if (event.key === 'Escape' && requested) {
            event.preventDefault();
            event.stopPropagation();
            dismiss();
          } else if (event.key === 'Tab') {
            dismiss();
          }
        }}
        onBlur={() => {
          if (!open) {
            dismiss();
          }
        }}
      />
      <div role="status" aria-atomic="true">
        {requested
          ? loading
            ? 'Loading commands...'
            : results?.commands.length
            ? `${results.commands.length} command${results.commands.length === 1 ? '' : 's'} found.`
            : 'No commands found.'
          : executedCommand
          ? `Executed ${executedCommand}.`
          : ''}
      </div>
      <Menu
        open={open}
        onOpenChange={(_, data) => {
          if (!data.open) {
            dismiss();
          }
        }}
        unstable_disableAutoFocus
        unstable_triggerElement={triggerElement}
      >
        <MenuPopover>
          <MenuList id={menuId} ref={listRef} aria-label="Commands" aria-labelledby={undefined}>
            {results?.commands.map(command =>
              command === 'Share' ? (
                <Menu key={command}>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem>Share</MenuItem>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={() => setExecutedCommand('Copy link')}>Copy link</MenuItem>
                      <MenuItem onClick={() => setExecutedCommand('Send a copy')}>Send a copy</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <MenuItem key={command} onClick={() => setExecutedCommand(command)}>
                  {command}
                </MenuItem>
              ),
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

ExternalEditableTrigger.parameters = {
  docs: {
    description: {
      story: [
        'Experimental external-trigger composition: typing or clicking loads filtered commands without moving focus from the input.',
        'After results are ready, press ArrowDown or ArrowUp to move DOM focus into the first or last command, then use normal Menu navigation.',
        'Arrow keys during loading do not queue a later focus transfer. Loading and result counts are announced outside the menu.',
        'Only settled results can be entered; this example does not refresh or remove focused commands in the background.',
        'This is not a standardized search widget, combobox, or aria-activedescendant implementation; host accessibility validation is still required.',
        'Registration supplies containment, focus restoration, and a positioning fallback, not input event handlers or ARIA.',
        'The owner supplies keyboard entry, input Tab/Escape dismissal, supported ARIA relationships, and an explicit MenuList name.',
        'The textbox does not support aria-expanded, and assigning role=combobox would not make a menu a supported combobox popup.',
        'Focus restoration does not reopen the menu because opening is driven by editing or clicking, not onFocus.',
        'Only opening autofocus is suppressed; submenu defaults, close restoration, and native Tab progression are retained.',
      ].join(' '),
    },
  },
};
