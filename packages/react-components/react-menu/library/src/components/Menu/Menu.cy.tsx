import { mount as mountBase } from '@fluentui/scripts-cypress';
import { makeStyles } from '@griffel/react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuGroupHeader,
  MenuSplitGroup,
  type MenuProps,
  menuItemClassNames,
} from '@fluentui/react-menu';
import { FluentProvider } from '@fluentui/react-provider';
import { Portal } from '@fluentui/react-portal';
import { teamsLightTheme } from '@fluentui/react-theme';
import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-tabster';

import {
  menuItemRadioSelector,
  menuItemCheckboxSelector,
  menuTriggerSelector,
  menuItemSelector,
  menuSelector,
  menuTriggerId,
} from '../../testing/selectors';

// eslint-disable-next-line @griffel/styles-file
const useStyles = makeStyles({
  pointerPortal: {
    zIndex: 10000000,
  },
});

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('External editable trigger', () => {
  let requests: { query: string; resolve: (commands: string[]) => void }[];
  const loadCommands = (query: string) =>
    new Promise<string[]>(resolve => {
      requests.push({ query, resolve });
    });
  const completeQuery = (query: string) => {
    cy.then(() => {
      requests
        .filter(request => request.query === query)
        .forEach(request =>
          request.resolve(
            ['New document', 'Print document', 'More commands'].filter(command =>
              command.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        );
    });
  };

  beforeEach(() => {
    requests = [];
  });

  const Example = ({
    disableAutoFocus = true,
    initialOpen = false,
    asyncResults = false,
  }: {
    disableAutoFocus?: boolean;
    initialOpen?: boolean;
    asyncResults?: boolean;
  }) => {
    const [element, setElement] = React.useState<HTMLInputElement | null>(null);
    const [requestedOpen, setRequestedOpen] = React.useState(initialOpen);
    const [value, setValue] = React.useState('');
    const [suppressFocus, setSuppressFocus] = React.useState(disableAutoFocus);
    const [results, setResults] = React.useState<{ query: string; commands: string[] }>();
    const [resultSuffix, setResultSuffix] = React.useState('');
    const [executedCommand, setExecutedCommand] = React.useState('');
    const listRef = React.useRef<HTMLDivElement>(null);
    const enterMenuRef = React.useRef<'ArrowDown' | 'ArrowUp' | null>(null);
    const { findFirstFocusable, findLastFocusable } = useFocusFinders();
    const loading = asyncResults && requestedOpen && results?.query !== value;
    const open = requestedOpen && (!asyncResults || (!loading && !!results?.commands.length));

    React.useEffect(() => {
      if (!asyncResults || !requestedOpen || results?.query === value) {
        return;
      }
      let active = true;
      loadCommands(value).then(commands => {
        if (active) {
          setResults({ query: value, commands });
        }
      });
      return () => {
        active = false;
      };
    }, [asyncResults, requestedOpen, results?.query, value]);

    React.useEffect(() => {
      if (open && enterMenuRef.current) {
        const findFocusable = enterMenuRef.current === 'ArrowDown' ? findFirstFocusable : findLastFocusable;
        enterMenuRef.current = null;
        findFocusable(listRef.current)?.focus();
      }
    }, [open, findFirstFocusable, findLastFocusable]);

    const dismiss = () => {
      enterMenuRef.current = null;
      setRequestedOpen(false);
    };

    return (
      <>
        <div role="status" aria-atomic="true">
          {asyncResults && requestedOpen
            ? loading
              ? 'Loading commands...'
              : results?.commands.length
              ? `${results.commands.length} command${results.commands.length === 1 ? '' : 's'} found.`
              : 'No commands found.'
            : executedCommand
            ? `Executed ${executedCommand}.`
            : ''}
        </div>
        <button>Before input</button>
        <input
          ref={setElement}
          aria-label="Find commands"
          aria-haspopup="menu"
          aria-controls={open ? 'external-commands' : undefined}
          value={value}
          onChange={event => {
            setValue(event.target.value);
            setExecutedCommand('');
            setRequestedOpen(true);
          }}
          onClick={() => setRequestedOpen(true)}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) {
              return;
            }
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              if (asyncResults && (results?.query !== value || !results.commands.length)) {
                setRequestedOpen(true);
              } else if (open) {
                const findFocusable = event.key === 'ArrowDown' ? findFirstFocusable : findLastFocusable;
                findFocusable(listRef.current)?.focus();
              } else {
                enterMenuRef.current = event.key;
                setRequestedOpen(true);
              }
            } else if (event.key === 'Escape' || event.key === 'Tab') {
              dismiss();
            } else if (event.key === 'F2') {
              setSuppressFocus(false);
            }
          }}
          onBlur={() => {
            if (!open) {
              dismiss();
            }
          }}
        />
        <button>After input</button>
        <Menu
          open={open}
          onOpenChange={(_, data) => {
            if (!data.open) {
              dismiss();
            }
          }}
          unstable_disableAutoFocus={suppressFocus}
          unstable_triggerElement={element}
        >
          <MenuPopover onKeyDown={event => event.key === 'F4' && setResultSuffix(' updated')}>
            <MenuList id="external-commands" ref={listRef} aria-label="Commands" aria-labelledby={undefined}>
              {asyncResults ? (
                <MenuGroup>
                  <MenuGroupHeader>Matching commands</MenuGroupHeader>
                  {results?.commands
                    .filter(command => command !== 'More commands')
                    .map(command => (
                      <MenuItem key={command} onClick={() => setExecutedCommand(command)}>
                        {command}
                      </MenuItem>
                    ))}
                </MenuGroup>
              ) : (
                <MenuItem>
                  Command {value}
                  {resultSuffix}
                </MenuItem>
              )}
              {(!asyncResults || results?.commands.includes('More commands')) && (
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuItem>More commands</MenuItem>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={() => setExecutedCommand('Nested command')}>Nested command</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              )}
            </MenuList>
          </MenuPopover>
        </Menu>
      </>
    );
  };

  it('keeps editing and selection in the input across opening and result updates', () => {
    mount(
      <React.StrictMode>
        <Example />
      </React.StrictMode>,
    );
    cy.get('input').type('abc').should('be.focused').should('have.value', 'abc');
    cy.get('[role="menu"]').should('have.attr', 'aria-label', 'Commands');
    cy.get('input').then(input => {
      input[0].setSelectionRange(1, 2);
    });
    cy.get('input').realPress('x');
    cy.get('input').should('have.value', 'axc').should('be.focused');
    cy.contains('[role="menuitem"]', 'Command axc').should('be.visible');
    cy.get('input').should(input => {
      expect(input[0].selectionStart).to.equal(2);
      expect(input[0].selectionEnd).to.equal(2);
    });
    cy.get('input').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'Command axc').should('be.focused').realPress('Escape');
    cy.get('input').should('be.focused').should('not.have.attr', 'aria-controls');
    cy.get('input').type('d').should('be.focused');
    cy.contains('[role="menuitem"]', 'Command axdc').should('be.visible');
  });

  it('restores focus on close without reopening and preserves nested-menu autofocus', () => {
    mount(<Example />);
    cy.get('input').type('a').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'Command a').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="menuitem"]', 'Nested command').should('be.focused').realPress('Escape');
    cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('Escape');
    cy.get('input').should('be.focused').should('not.have.attr', 'aria-controls');
    cy.get('[role="menu"]').should('not.exist');
  });

  (['Tab', ['Shift', 'Tab']] as const).forEach(key => {
    it(`retains native ${typeof key === 'string' ? key : key.join('+')} progression from root items`, () => {
      mount(<Example />);
      cy.get('input').type('a').realPress('ArrowDown');
      cy.contains('[role="menuitem"]', 'Command a').should('be.focused');
      cy.realPress(typeof key === 'string' ? key : [...key]);
      cy.contains('button', typeof key === 'string' ? 'After input' : 'Before input').should('be.focused');
      cy.get('[role="menu"]').should('not.exist');
    });

    it(`retains native ${typeof key === 'string' ? key : key.join('+')} progression from nested items`, () => {
      mount(<Example />);
      cy.get('input').type('a').realPress('ArrowDown').realPress('ArrowDown').realPress('ArrowRight');
      cy.contains('[role="menuitem"]', 'Nested command').should('be.focused');
      cy.realPress(typeof key === 'string' ? key : [...key]);
      cy.contains('button', typeof key === 'string' ? 'After input' : 'Before input').should('be.focused');
      cy.get('[role="menu"]').should('not.exist');
    });
  });

  it('treats the external trigger as inside and does not restore over another focused control', () => {
    mount(<Example />);
    cy.get('input').type('a').click().should('have.attr', 'aria-controls', 'external-commands');
    cy.contains('button', 'After input').click().should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
    cy.contains('button', 'After input').should('be.focused');
  });

  it('dismisses from the input on Escape and Tab without preventing native Tab', () => {
    mount(<Example />);
    cy.get('input').type('a').realPress('Escape');
    cy.get('input').should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
    cy.get('input').type('b').realPress('Tab');
    cy.contains('button', 'After input').should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
  });

  it('keeps result status text above the open popup', () => {
    mount(<Example asyncResults />);
    cy.get('input').type('doc');
    completeQuery('doc');
    cy.get('[role="status"]').should('have.text', '2 commands found.');
    cy.get('[role="menu"]').then(menu => {
      cy.get('[role="status"]').should(status => {
        const range = status[0].ownerDocument.createRange();
        range.selectNodeContents(status[0]);
        expect(range.getBoundingClientRect().bottom).to.be.at.most(menu[0].getBoundingClientRect().top);
      });
    });
  });

  it('filters asynchronous results without replaying entry keys or changing input selection', () => {
    mount(
      <React.StrictMode>
        <Example asyncResults />
      </React.StrictMode>,
    );
    cy.get('[role="status"]').should('be.empty');
    cy.get('input').type('doc').should('not.have.attr', 'aria-expanded');
    cy.get('[role="status"]').should('have.text', 'Loading commands...');
    cy.get('[role="menu"]').should('not.exist');
    cy.get('input').then(input => input[0].setSelectionRange(1, 2));
    cy.get('input').realPress('ArrowDown');
    completeQuery('doc');
    cy.get('[role="status"]').should('have.text', '2 commands found.');
    cy.get('[role="menu"]').should('have.attr', 'aria-label', 'Commands').should('not.have.attr', 'aria-labelledby');
    cy.get('input').should('have.attr', 'aria-controls', 'external-commands').should('be.focused');
    cy.get('input').should(input => {
      expect(input[0].selectionStart).to.equal(1);
      expect(input[0].selectionEnd).to.equal(2);
    });
    cy.get('[role="menuitem"]').should('have.length', 2);
    cy.get('input').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'New document').should('be.focused');
  });

  it('removes old results while editing and exposes no empty menu for settled zero results', () => {
    mount(<Example asyncResults />);
    cy.get('input').type('doc');
    completeQuery('doc');
    cy.get('[role="menuitem"]').should('have.length', 2);
    cy.get('input').clear().type('unmatched').should('be.focused');
    cy.get('[role="status"]').should('have.text', 'Loading commands...');
    completeQuery('unmatched');
    cy.get('[role="status"]').should('have.text', 'No commands found.');
    cy.get('[role="menu"]').should('not.exist');
    cy.get('input').should('be.focused').should('not.have.attr', 'aria-controls').realPress('ArrowDown');
    cy.get('[role="menu"]').should('not.exist');
    cy.get('input').clear().type('print');
    completeQuery('print');
    cy.get('[role="menuitem"]').should('have.length', 1).should('have.text', 'Print document');
    cy.get('input').should('be.focused');
  });

  it('cancels obsolete queries rather than displaying or announcing their results', () => {
    mount(<Example asyncResults />);
    cy.get('input').type('new');
    cy.get('input').clear().type('print');
    completeQuery('new');
    cy.get('[role="status"]').should('have.text', 'Loading commands...');
    cy.get('[role="menu"]').should('not.exist');
    completeQuery('print');
    cy.get('[role="status"]').should('have.text', '1 command found.');
    cy.get('[role="menuitem"]').should('have.length', 1).should('have.text', 'Print document');
    cy.get('input').should('be.focused');
  });

  (['Escape', 'Tab', 'Shift+Tab', 'outside click'] as const).forEach(dismissal => {
    it(`does not reopen or steal focus after ${dismissal} during loading`, () => {
      mount(<Example asyncResults />);
      cy.get('input').type('doc');
      if (dismissal === 'outside click') {
        cy.contains('button', 'After input').click();
      } else {
        cy.get('input').realPress(dismissal === 'Shift+Tab' ? ['Shift', 'Tab'] : dismissal);
      }
      const target = dismissal === 'Escape' ? 'input' : dismissal === 'Shift+Tab' ? 'Before input' : 'After input';
      if (target === 'input') {
        cy.get('input').should('be.focused');
      } else {
        cy.contains('button', target).should('be.focused');
      }
      completeQuery('doc');
      cy.get('[role="menu"]').should('not.exist');
      cy.get('[role="status"]').should('be.empty');
      if (target === 'input') {
        cy.get('input').should('be.focused');
      } else {
        cy.contains('button', target).should('be.focused');
      }
    });
  });

  it('supports first and last entry after dismissal and executes a nested command with Enter', () => {
    mount(<Example asyncResults />);
    cy.get('input').click();
    completeQuery('');
    cy.get('input').realPress('Escape').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'New document').should('be.focused').realPress('Escape');
    cy.get('input').should('be.focused').realPress('ArrowUp');
    cy.contains('[role="menuitem"]', 'More commands').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="menuitem"]', 'Nested command').should('be.focused').realPress('Enter');
    cy.get('[role="status"]').should('have.text', 'Executed Nested command.');
    cy.get('[role="menu"]').should('not.exist');
    cy.get('input').should('be.focused').should('not.have.attr', 'aria-controls');
  });

  it('does not execute a result on input Enter or intercept IME navigation', () => {
    mount(<Example asyncResults />);
    cy.get('input').type('print');
    completeQuery('print');
    cy.get('input').realPress('Enter');
    cy.get('input').should('be.focused');
    cy.get('[role="status"]').should('have.text', '1 command found.');
    cy.get('input').trigger('compositionstart');
    ['ArrowDown', 'ArrowUp', 'Escape', 'Enter'].forEach(key => {
      cy.get('input')
        .trigger('keydown', { eventConstructor: 'KeyboardEvent', key, isComposing: true })
        .should('be.focused');
      cy.contains('[role="menuitem"]', 'Print document').should('be.visible').should('not.be.focused');
    });
    cy.get('input').trigger('compositionend').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'Print document').should('be.focused').realPress('Enter');
    cy.get('[role="status"]').should('have.text', 'Executed Print document.');
    cy.get('input').should('be.focused');
  });

  (['Tab', ['Shift', 'Tab']] as const).forEach(key => {
    ([false, true] as const).forEach(nested => {
      it(`preserves native ${typeof key === 'string' ? key : key.join('+')} exit from ${
        nested ? 'nested' : 'root'
      } asynchronous results`, () => {
        mount(<Example asyncResults />);
        cy.get('input').click();
        completeQuery('');
        cy.get('input').realPress(nested ? 'ArrowUp' : 'ArrowDown');
        if (nested) {
          cy.contains('[role="menuitem"]', 'More commands').realPress('ArrowRight');
          cy.contains('[role="menuitem"]', 'Nested command').should('be.focused');
        } else {
          cy.contains('[role="menuitem"]', 'New document').should('be.focused');
        }
        cy.realPress(typeof key === 'string' ? key : [...key]);
        cy.contains('button', typeof key === 'string' ? 'After input' : 'Before input').should('be.focused');
        cy.get('[role="menu"]').should('not.exist');
      });
    });
  });

  it('preserves a focused item when its rendered result content changes', () => {
    mount(<Example />);
    cy.get('input').type('a').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'Command a').should('be.focused').realPress('F4');
    cy.contains('[role="menuitem"]', 'Command a updated').should('be.focused');
  });

  it('focuses the first item when suppression is turned off while open', () => {
    mount(<Example />);
    cy.get('input').type('a');
    cy.get('input').realPress('F2');
    cy.contains('[role="menuitem"]', 'Command a').should('be.focused');
  });

  it('does not focus the trigger when suppression changes while closed', () => {
    mount(<Example />);
    cy.get('input').trigger('keydown', { key: 'F2' });
    cy.get('input').should('not.be.focused');
  });

  it('preserves explicit false autofocus behavior on opening', () => {
    mount(<Example disableAutoFocus={false} />);
    cy.get('input').click();
    cy.contains('[role="menuitem"]', 'Command').should('be.focused');
  });

  it('preserves item focus when autofocus changes between undefined and false', () => {
    const DefaultAutofocus = () => {
      const [disableAutoFocus, setDisableAutoFocus] = React.useState<boolean | undefined>(undefined);
      return (
        <Menu defaultOpen unstable_disableAutoFocus={disableAutoFocus}>
          <MenuTrigger disableButtonEnhancement>
            <button>Open commands</button>
          </MenuTrigger>
          <MenuPopover
            onKeyDown={event => {
              if (event.key === 'F2') {
                setDisableAutoFocus(false);
              } else if (event.key === 'F3') {
                setDisableAutoFocus(undefined);
              }
            }}
          >
            <MenuList>
              <MenuItem>First command</MenuItem>
              <MenuItem>Second command</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      );
    };
    mount(<DefaultAutofocus />);
    cy.contains('[role="menuitem"]', 'First command').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="menuitem"]', 'Second command').should('be.focused').realPress('F2');
    cy.contains('[role="menuitem"]', 'Second command').should('be.focused').realPress('F3');
    cy.contains('[role="menuitem"]', 'Second command').should('be.focused');
  });

  it('suppresses autofocus when initially open', () => {
    mount(<Example initialOpen />);
    cy.contains('[role="menuitem"]', 'Command').should('be.visible').should('not.be.focused');
  });

  it('keeps descendant containment and scroll dismissal separate from an explicit positioning target', () => {
    const SeparateTarget = () => {
      const [trigger, setTrigger] = React.useState<HTMLSpanElement | null>(null);
      const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <span ref={setTrigger} tabIndex={-1}>
            <button onClick={() => setOpen(true)}>External child</button>
          </span>
          <button ref={setAnchor}>Geometry anchor</button>
          <button>Outside target</button>
          <Menu
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{ target: anchor }}
            closeOnScroll
            unstable_disableAutoFocus
            unstable_triggerElement={trigger}
          >
            <MenuPopover>
              <MenuList aria-label="Commands" aria-labelledby={undefined}>
                <MenuItem>External command</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      );
    };
    mount(<SeparateTarget />);
    cy.contains('button', 'External child').click().click().trigger('wheel');
    cy.contains('[role="menuitem"]', 'External command').should('be.visible');
    cy.contains('button', 'Geometry anchor').then(anchor => {
      cy.get('[role="menu"]')
        .parent()
        .should(popover => {
          expect(popover[0].getBoundingClientRect().left).to.be.closeTo(anchor[0].getBoundingClientRect().left, 1);
        });
    });
    cy.contains('button', 'Geometry anchor').trigger('wheel');
    cy.get('[role="menu"]').should('not.exist');
    cy.contains('button', 'External child').click();
    cy.contains('button', 'Outside target').click().should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
  });
});

describe('MenuTrigger', () => {
  it('should open menu and focus first item when clicked', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('be.visible')
      .get(menuItemSelector)
      .should('be.focused');
  });

  it('should open menu on hover if openOnHover is set', () => {
    mount(
      <Menu openOnHover hoverDelay={1}>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .realHover()
      .wait(1)
      .get(menuSelector)
      .should('be.visible')
      .get(menuItemSelector)
      .should('be.focused');
  });

  it('should close menu on escape when focus is on the trigger', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('be.visible')
      .get(menuTriggerSelector)
      .type('{esc}')
      .get(menuSelector)
      .should('not.exist');
  });

  (['ArrowDown', 'Enter', 'Space'] as const).forEach(key => {
    it(`should open menu with ${key} and focus first menuitem`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      cy.get(menuTriggerSelector).focus().realPress(key);
      cy.get(menuSelector).should('be.visible').get(menuItemSelector).first().should('be.focused');
    });
  });

  it('should not automatically focus itself when mounted', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).should('not.be.focused');
  });

  it('should not focus itself after re-render', () => {
    const Example = () => {
      const [count, setCount] = React.useState(0);

      React.useEffect(() => {
        // trigger 2 re-renders to make sure that the focus effect has finished running
        // after first re-render
        if (count < 2) {
          setCount(c => c + 1);
        }
      }, [count]);

      return (
        <>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <button data-status={count < 2 ? 'incomplete' : 'complete'} id={menuTriggerId}>
                Menu
              </button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Item</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <input type="text" />
        </>
      );
    };

    mount(<Example />);
    cy.get(menuTriggerSelector).should('have.attr', 'data-status', 'complete').should('not.be.focused');
  });
});

describe('Custom Trigger', () => {
  const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
    return (
      <button id={menuTriggerId} {...props} ref={ref}>
        Custom Trigger
      </button>
    );
  });

  const CustomTriggerExample = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <CustomMenuTrigger />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  it('should open menu when clicked', () => {
    mount(<CustomTriggerExample />);

    cy.contains('Custom Trigger').click().get(menuSelector).should('be.visible');
  });

  it('should dismiss the menu when click outside', () => {
    mount(<CustomTriggerExample />);
    cy.contains('Custom Trigger').click().get('body').click('bottomRight').get(menuSelector).should('not.exist');
  });
});

describe('MenuItem', () => {
  it('should close the menu when clicked', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .first()
      .click()
      .get(menuSelector)
      .should('not.be.exist');
  });

  it('should not close the menu when disabled on click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem disabled>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-disabled="true"]')
      .first()
      .click()
      .get(menuSelector)
      .should('be.visible');
  });

  it('should focus on hover', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemSelector)
      .each(el => {
        cy.wrap(el).trigger('mouseover').should('be.focused');
      });
  });
});

describe('MenuItemCheckbox', () => {
  it('should be selected on click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="test" value="test">
              Item
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemCheckboxSelector)
      .first()
      .click()
      .should('have.attr', 'aria-checked', 'true');
  });

  ['enter', ' '].forEach(key => {
    it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox name="test" value="test">
                Item
              </MenuItemCheckbox>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemCheckboxSelector)
        .first()
        .click()
        .should('have.attr', 'aria-checked', 'true');
    });
  });
});

describe('MenuItemRadio', () => {
  it('should be selected on', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="test" value="test">
              Item
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).trigger('click').get(menuItemRadioSelector).first().click();

    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .first()
      .should('have.attr', 'aria-checked', 'true');
  });

  ['enter', ' '].forEach(key => {
    it(`should be selected on ${key === ' ' ? 'space' : key} key`, () => {
      mount(
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="test" value="test">
                Item
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );
      cy.get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .click()
        .get(menuTriggerSelector)
        .trigger('click')
        .get(menuItemRadioSelector)
        .first()
        .should('have.attr', 'aria-checked', 'true');
    });
  });

  it('should only have one item selected', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="test" value="first">
              First
            </MenuItemRadio>
            <MenuItemRadio name="test" value="second">
              Second
            </MenuItemRadio>
            <MenuItemRadio name="test" value="third">
              Third
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .first()
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(1)
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get(menuItemRadioSelector)
      .eq(2)
      .click()
      .get(menuTriggerSelector)
      .trigger('click')
      .get('[aria-checked="true"]')
      .should('have.length', 1);
  });
});

describe('Menu', () => {
  it('should not focus trigger on dismiss if another element is focused', () => {
    mount(
      <>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <input type="text" />
      </>,
    );
    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').get('input').realClick();

    cy.get('input').should('be.focused');
  });

  it('should be dismissed with Escape', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .focused()
      .type('{esc}')
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('be.focused');
  });

  it('should be dismissed on outside click', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().get('body').click('bottomRight').get(menuSelector).should('not.exist');
  });

  it('should be dismissed on with {leftarrow} when not a submenu', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().focused().type('{leftarrow}').get(menuSelector).should('be.visible');
  });

  it('should dismiss when clicking a menu item', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector).click().get(menuItemSelector).first().click().get(menuSelector).should('not.exist');
  });

  it('should not dismiss when clicking a group header', () => {
    mount(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Header</MenuGroupHeader>
              <MenuItem>Item</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .contains('Header')
      .click()
      .get(menuSelector)
      .should('be.visible');
  });

  it('should close on scroll when closeOnScroll is set', () => {
    mount(
      <Menu closeOnScroll>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Menu</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );
    cy.get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('exist')
      .get('body')
      .trigger('wheel')
      .get(menuSelector)
      .should('not.exist');
  });

  it('should be able to tab to next element after the root trigger', () => {
    mount(
      <>
        <Menu closeOnScroll>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <button>After</button>
      </>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress('Tab');
    cy.contains('After').should('be.focused').get(menuSelector).should('not.exist');
  });

  it('should be able to shift tab to previous element after the root trigger', () => {
    mount(
      <>
        <button>Before</button>
        <Menu closeOnScroll>
          <MenuTrigger disableButtonEnhancement>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress(['Shift', 'Tab']);
    cy.contains('Before').should('be.focused').get(menuSelector).should('not.exist');
  });

  (['Enter', 'Space'] as const).forEach(key => {
    it(`should close menu and focus trigger on ${key}`, () => {
      mount(
        <Menu>
          <MenuTrigger>
            <button id={menuTriggerId}>Menu</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>,
      );

      cy.get(menuTriggerSelector).click().get(menuSelector).should('exist').realPress(key);
      cy.get(menuSelector).should('not.exist').get(menuTriggerSelector).should('be.focused');
    });
  });
});

describe('SplitMenuItem', () => {
  const example = (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>Menu</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuSplitGroup>
            <MenuItem>Split item</MenuItem>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Item</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuSplitGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
  it('should be able to reach the trigger with down arrow', () => {
    mount(example);
    cy.get(menuTriggerSelector).focus();

    // Can't find a better way than hard code the number of tabstops
    for (let i = 0; i < 3; i++) {
      cy.focused().focus().type('{downarrow}');
    }

    cy.focused().focus().type('{rightarrow}');
    cy.get(menuSelector).should('have.length', 2);
  });

  it('should be able to navigate horizontally within split item', () => {
    mount(example);
    cy.get(menuTriggerSelector).focus();

    // Can't find a better way than hard code the number of tabstops
    for (let i = 0; i < 3; i++) {
      cy.focused().focus().type('{downarrow}');
    }

    cy.focused()
      .focus()
      .type('{leftarrow}') // focus main action of split item
      .focused()
      .should('have.text', 'Split item')
      .focus()
      .type('{rightarrow}')
      .focused()
      .type('{rightarrow}'); // open submenu

    cy.get(menuSelector).should('have.length', 2);
  });
});

// [nestedMenuStory, nestedMenuControlledStory].forEach(story => {
describe(`Nested Menus`, () => {
  const MenuL22Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l2-2-trigger">Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l2-2">
          <MenuItem>Split Up</MenuItem>
          <MenuItem>Split Down</MenuItem>
          <MenuItem>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL21Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l2-1-trigger">Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l2-1">
          <MenuItem>Centered Layout</MenuItem>
          <MenuItem>Zen</MenuItem>
          <MenuItem disabled>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL1Uncontrolled = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem id="menu-l1-trigger">Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList id="menu-l1">
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <MenuL21Uncontrolled />
          <MenuL22Uncontrolled />
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const UncontrolledExample = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <MenuL1Uncontrolled />
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const MenuL21Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l2-1-trigger">Editor Layout</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l2-1">
            <MenuItem>Split Up</MenuItem>
            <MenuItem>Split Down</MenuItem>
            <MenuItem>Single</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const MenuL22Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l2-2-trigger">Appearance</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l2-2">
            <MenuItem>Centered Layout</MenuItem>
            <MenuItem>Zen</MenuItem>
            <MenuItem disabled>Zoom In</MenuItem>
            <MenuItem>Zoom Out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const MenuL1Controlled = () => {
    const [open, setOpen] = React.useState(false);
    const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
      setOpen(data.open);
    };

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem id="menu-l1-trigger">Preferences</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id="menu-l1">
            <MenuItem>Settings</MenuItem>
            <MenuItem>Online Services Settings</MenuItem>
            <MenuItem>Extensions</MenuItem>
            <MenuL21Controlled />
            <MenuL22Controlled />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const ControlledExample = () => {
    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button id={menuTriggerId}>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <MenuL1Controlled />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  ['controlled', 'uncontrolled'].forEach(scenario => {
    const Example = scenario === 'uncontrolled' ? UncontrolledExample : ControlledExample;

    describe(scenario, () => {
      it('should open on trigger hover and focus first item', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).trigger('mousemove');
          })
          .get(menuSelector)
          .should('have.length', 2)
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().should('be.focused');
          });
      });

      ['{rightarrow}', '{enter}', ' '].forEach(key => {
        it(`should open on trigger ${key === ' ' ? 'space' : key} and focus first item`, () => {
          mount(<Example />);
          cy.get(menuTriggerSelector)
            .click()
            .get(menuSelector)
            .within(() => {
              cy.get(menuItemSelector).eq(4).focus().type(key);
            })
            .get(menuSelector)
            .eq(1)
            .within(() => {
              cy.get(menuItemSelector).first().should('be.focused');
            })
            .get(menuSelector)
            .should('have.length', 2);
        });
      });

      it('should close on mouse enter parent menu', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector).click();

        cy.get(menuSelector).within(() => {
          cy.get(menuItemSelector).eq(4).trigger('mousemove');
        });
        cy.get(menuSelector).should('have.length', 2);

        // Mouseout is necessary because internally it will set a flag
        cy.get(menuSelector)
          .eq(0)
          .within(() => {
            cy.get(menuItemSelector).eq(4).trigger('mouseout');
          });

        // move mouse over first element in nested menu
        cy.get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).eq(0).trigger('mouseover');
          });

        // move mouse back to the first element in the root menu
        cy.get(menuItemSelector).first().trigger('mouseover');
        cy.get(menuSelector).should('have.length', 1);
      });

      it('should focus first menuitem in an open submenu with right arrow from the trigger', () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).click().focus().type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().should('be.focused');
          })
          .get(menuSelector)
          .should('have.length', 2);
      });

      ['{leftarrow}', '{esc}'].forEach(key => {
        it(`should close on ${key}`, () => {
          mount(<Example />);
          cy.get(menuTriggerSelector)
            .click()
            .get(menuSelector)
            .within(() => {
              cy.get(menuItemSelector).eq(4).focus().type('{rightarrow}').focused().type(key);
            })
            .get(menuSelector)
            .should('have.length', 1);
        });
      });

      it(`should all close when a menu item in the nested menu is clicked`, () => {
        mount(<Example />);
        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .within(() => {
            cy.get(menuItemSelector).first().click();
          })
          .get(menuSelector)
          .should('not.exist');
      });

      it('should be able to tab to next element after the root trigger', () => {
        mount(
          <>
            <Example />
            <button>After</button>
          </>,
        );

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress('Tab');

        cy.contains('After').should('be.focused').get(menuSelector).should('not.exist');
      });

      it('should move focus out of document if menu trigger is the last focusable element in DOM', () => {
        mount(<Example />);

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress('Tab');

        cy.realPress(['Shift', 'Tab']);
        cy.get(menuTriggerSelector).should('be.focused');
      });

      it('should be able to shift tab to previous element after the root trigger', () => {
        mount(
          <>
            <button>Before</button>
            <Example />
          </>,
        );

        cy.get(menuTriggerSelector)
          .click()
          .get(menuSelector)
          .within(() => {
            cy.get(menuItemSelector).eq(4).type('{rightarrow}');
          })
          .get(menuSelector)
          .eq(1)
          .realPress(['Shift', 'Tab']);
        cy.contains('Before').should('be.focused').get(menuSelector).should('not.exist');
      });

      it('respects ".hoverDelay" for opening via hover', () => {
        mount(<Example />);

        cy.get(menuTriggerSelector).click();

        cy.get('#menu-l1-trigger').realHover();
        cy.get('#menu-l1').should('be.visible');

        cy.get('#menu-l2-2-trigger').realHover();
        cy.get('#menu-l2-2').should('be.visible');

        // Quickly hover over the second item to ensure it doesn't open due to the timeout
        cy.get('#menu-l2-1-trigger').realHover();
        cy.get('#menu-l2-2-trigger').realHover();

        cy.get('#menu-l2-1').should('not.exist');
        cy.get('#menu-l2-2').should('be.visible');
      });
    });
  });
});

describe('Context menu', () => {
  const ContextMenuExample = () => (
    <Menu openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <button id={menuTriggerId}>trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  it('should open on right click ', () => {
    mount(<ContextMenuExample />);

    cy.get(menuTriggerSelector).rightclick().get(menuSelector).should('exist');
  });

  it('should not open if event is prevented', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector).then(([trigger]) => {
      trigger.addEventListener('contextmenu', e => e.preventDefault(), { capture: true, once: true });
    });
    cy.get(menuTriggerSelector).rightclick().get(menuSelector).should('not.exist');
  });

  it('should close when the trigger is clicked', () => {
    mount(<ContextMenuExample />);

    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .get(menuTriggerSelector)
      .click()
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });

  it('should close on scroll outside', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .get('body')
      .trigger('wheel')
      .get(menuSelector)
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });

  it('should restore focus on escape', () => {
    mount(<ContextMenuExample />);
    cy.get(menuTriggerSelector)
      .rightclick()
      .get(menuSelector)
      .should('exist')
      .focused()
      .type('{esc}')
      .should('not.exist')
      .get(menuTriggerSelector)
      .should('have.focus');
  });
});

/**
 * Cypress doesn't display the cursor position in the viewport, this component shows a red dot at the mouse position.
 */
const DebugPointer: React.FC = () => {
  const styles = useStyles();
  const pointerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (pointerRef.current) {
        pointerRef.current.style.left = `${event.x - 2}px`;
        pointerRef.current.style.top = `${event.y - 2}px`;
      }
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <Portal mountNode={{ className: styles.pointerPortal }}>
      <div
        style={{
          borderRadius: '4px',
          pointerEvents: 'none',
          background: 'red',
          height: '4px',
          width: '4px',
          position: 'fixed',
        }}
        ref={pointerRef}
      />
    </Portal>
  );
};

const MenuWithSafeZoneExample = () => {
  // TODO: remove once "safeZone" is enabled by default
  const menuProps = { safeZone: true } as unknown as MenuProps;

  return (
    <Menu {...menuProps} open>
      <MenuTrigger disableButtonEnhancement>
        <button>root trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>item 1</MenuItem>
          <Menu {...menuProps}>
            <MenuTrigger>
              <MenuItem id="item-2">item 2</MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem id="secondary-item-2a">secondary item 1A</MenuItem>
                <MenuItem>secondary item 1B</MenuItem>
                <MenuItem>secondary item 1C</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Menu {...menuProps}>
            <MenuTrigger>
              <MenuItem id="item-3">item 3</MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem id="secondary-item-3a">secondary item 1A</MenuItem>
                <MenuItem>secondary item 1B</MenuItem>
                <MenuItem>secondary item 1C</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <MenuItem id="item-4">item 4</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

describe('safeZone', () => {
  it('safe zone prevents a submenu from being closed', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get('#item-2').realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get('#item-4').realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.clock(0).then(() => {
      cy.tick(500);
      cy.get('#secondary-item-2a').should('be.visible');
      cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

      cy.tick(2000);
      cy.get('#secondary-item-2a').should('not.exist');
      cy.get('[data-safe-zone]').should('not.exist');
    });
  });

  it('should not be able to open the menu if the safe zone is clicked', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get('#item-2').realHover();
    cy.get('#secondary-item-2a').should('be.visible');
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.clock(0).then(() => {
      cy.tick(500);
      cy.get('#secondary-item-2a').should('be.visible');
      cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

      cy.get('#secondary-item-2a').realHover();
      cy.get('[data-safe-zone]').should('have.css', 'display', 'none');
    });
  });

  it('another submenu could be opened once a safe zone timeouts', () => {
    mount(
      <>
        <DebugPointer />
        <MenuWithSafeZoneExample />
      </>,
    );

    cy.get('#item-2').should('be.visible');

    cy.get(`#item-2 .${menuItemClassNames.submenuIndicator}`).realHover();
    cy.get('[data-safe-zone]').should('have.css', 'display', 'block');

    cy.get(`#item-3 .${menuItemClassNames.submenuIndicator}`).realHover();
    cy.get('#secondary-item-2a').should('be.visible');
    cy.get('#secondary-item-3a').should('not.exist');

    cy.clock(0).then(() => {
      cy.tick(2000);

      cy.get('#secondary-item-2a').should('not.exist');
      cy.get('#secondary-item-3a').should('be.visible');
    });
  });
});
