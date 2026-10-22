import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { createPresenceComponent } from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  Menu,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuProvider,
  MenuTrigger,
  menuPopoverClassNames,
  renderMenu_unstable,
  useMenuBase_unstable,
  useMenuContextValues_unstable,
  useMenuFocusFirst_unstable,
  useMenuRestoreFocus_unstable,
  useMenuState_unstable,
} from '@fluentui/react-menu';
import type { MenuProps } from '@fluentui/react-menu';

const mount = (element: JSXElement, dir: 'ltr' | 'rtl' = 'ltr') => {
  mountBase(
    <FluentProvider theme={webLightTheme} dir={dir}>
      {element}
    </FluentProvider>,
  );
};

const RebuiltMenu = (props: MenuProps): JSXElement => {
  const state = useMenuState_unstable(props);
  useMenuFocusFirst_unstable(state);
  useMenuRestoreFocus_unstable(state);
  return renderMenu_unstable(state, useMenuContextValues_unstable(state));
};

const BaseMenu = (props: MenuProps): JSXElement => {
  const state = useMenuBase_unstable(props);
  return (
    <MenuProvider value={state}>
      {state.menuTrigger}
      {state.open && state.menuPopover}
    </MenuProvider>
  );
};

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
  return renderMenu_unstable(state, useMenuContextValues_unstable(state));
};

const Example = ({ nested = false, ...props }: Omit<MenuProps, 'children'> & { nested?: boolean }): JSXElement => {
  const initialFocusRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <button>Before</button>
      <CustomOpeningMenu {...props} initialFocusRef={initialFocusRef}>
        <MenuTrigger disableButtonEnhancement>
          <button data-testid="root-trigger">Trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="commands" value="first">
              First
            </MenuItemCheckbox>
            <MenuItem ref={initialFocusRef}>Second</MenuItem>
            {nested && (
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem>Submenu</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Nested command</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
          </MenuList>
        </MenuPopover>
      </CustomOpeningMenu>
      <button>After</button>
    </>
  );
};

const trigger = '[data-testid="root-trigger"]';
const second = '[role="menuitem"]';

describe('Menu focus composition', () => {
  [Menu, RebuiltMenu, BaseMenu].forEach(MenuRoot => {
    describe(MenuRoot.name || 'Menu', () => {
      const DefaultExample = (props: Omit<MenuProps, 'children'>): JSXElement => (
        <MenuRoot {...props}>
          <MenuTrigger disableButtonEnhancement>
            <button data-testid="root-trigger">Trigger</button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>First</MenuItem>
              <MenuItem>Second</MenuItem>
            </MenuList>
          </MenuPopover>
        </MenuRoot>
      );

      it('does not steal focus on closed mount or unrelated rerender', () => {
        const RerenderExample = (): JSXElement => {
          const [count, setCount] = React.useState(0);
          return (
            <>
              <button onClick={() => setCount(count + 1)}>Rerender {count}</button>
              <DefaultExample />
            </>
          );
        };
        mount(<RerenderExample />);
        cy.get(trigger).should('not.be.focused');
        cy.contains('button', 'Rerender').click().should('be.focused');
        cy.get(trigger).should('not.be.focused');
      });

      [{ defaultOpen: true }, { open: true }].forEach(props => {
        it(`focuses first item on initial ${Object.keys(props)[0]}`, () => {
          mount(<DefaultExample {...props} />);
          cy.contains('[role="menuitem"]', 'First').should('be.focused');
        });
      });

      it('preserves first-focus and close restoration', () => {
        mount(<DefaultExample />);
        cy.get(trigger).click();
        cy.contains('[role="menuitem"]', 'First').should('be.focused').realPress('Escape');
        cy.get(trigger).should('be.focused');
      });

      it('focuses first item when controlled open changes', () => {
        const ControlledExample = (): JSXElement => {
          const [open, setOpen] = React.useState(false);
          return <DefaultExample open={open} onOpenChange={(_, data) => setOpen(data.open)} />;
        };
        mount(<ControlledExample />);
        cy.get(trigger).click();
        cy.contains('[role="menuitem"]', 'First').should('be.focused');
      });
    });
  });

  [{ defaultOpen: true }, { open: true }].forEach(props => {
    it(`allows a custom initial opening policy with ${Object.keys(props)[0]}`, () => {
      mount(<Example {...props} />);
      cy.contains(second, 'Second').should('be.focused');
      cy.contains('[role="menuitemcheckbox"]', 'First').should('not.be.focused');
    });
  });

  it('uses custom opening focus on each opening and restores focus after Escape', () => {
    mount(<Example />);
    cy.get(trigger).click();
    cy.contains(second, 'Second').should('be.focused').realPress('Escape');
    cy.get(trigger).should('be.focused').click();
    cy.contains(second, 'Second').should('be.focused');
  });

  it('supports controlled opening and closing with custom focus', () => {
    const ControlledExample = (): JSXElement => {
      const [open, setOpen] = React.useState(false);
      return <Example open={open} onOpenChange={(_, data) => setOpen(data.open)} />;
    };
    mount(<ControlledExample />);
    cy.get(trigger).click();
    cy.contains(second, 'Second').should('be.focused').realPress('Escape');
    cy.get(trigger).should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
  });

  it('restores focus after command activation', () => {
    mount(<Example />);
    cy.get(trigger).click();
    cy.contains(second, 'Second').realPress('Enter');
    cy.get(trigger).should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
  });

  it('retains selection and dismissal without the default opening policy', () => {
    mount(<Example />);
    cy.get(trigger).click();
    cy.contains('[role="menuitemcheckbox"]', 'First').click();
    cy.contains('[role="menuitemcheckbox"]', 'First').should('have.attr', 'aria-checked', 'true').realPress('Escape');
    cy.get('[role="menu"]').should('not.exist');
    cy.get(trigger).click();
    cy.contains('[role="menuitemcheckbox"]', 'First').should('have.attr', 'aria-checked', 'true');
  });

  it('preserves external focus on outside-click dismissal', () => {
    mount(<Example />);
    cy.get(trigger).click();
    cy.contains('button', 'After').realClick().should('be.focused');
    cy.get('[role="menu"]').should('not.exist');
    cy.contains('button', 'After').should('be.focused');
  });

  it('retains scroll-outside dismissal', () => {
    mount(<Example closeOnScroll />);
    cy.get(trigger).click();
    cy.get('body').trigger('wheel');
    cy.get('[role="menu"]').should('not.exist');
    cy.get(trigger).should('be.focused');
  });

  it('retains delayed hover opening and custom focus', () => {
    mount(<Example openOnHover hoverDelay={1} />);
    cy.get(trigger).realHover();
    cy.contains(second, 'Second').should('be.focused');
    cy.get(trigger).trigger('mouseout');
    cy.get('[role="menu"]').should('not.exist');
  });

  it('retains context-menu opening and dismissal', () => {
    mount(<Example openOnContext />);
    cy.get(trigger).rightclick();
    cy.contains(second, 'Second').should('be.focused').realPress('Escape');
    cy.get('[role="menu"]').should('not.exist');
    cy.get(trigger).should('be.focused');
  });

  [false, true].forEach(nested => {
    (['Tab', 'Shift+Tab'] as const).forEach(key => {
      it(`preserves native ${key} navigation${nested ? ' from a nested menu' : ''}`, () => {
        mount(<Example nested={nested} />);
        cy.get(trigger).click();
        if (nested) {
          cy.contains(second, 'Submenu').focus().realPress('ArrowRight');
          cy.contains(second, 'Nested command').should('be.focused');
        } else {
          cy.contains(second, 'Second').should('be.focused');
        }
        cy.realPress(key === 'Tab' ? 'Tab' : ['Shift', 'Tab']);
        cy.contains('button', key === 'Tab' ? 'After' : 'Before').should('be.focused');
        cy.get('[role="menu"]').should('not.exist');
      });
    });
  });

  (['ltr', 'rtl'] as const).forEach(dir => {
    it(`preserves nested directional focus and bubbling in ${dir}`, () => {
      mount(<Example nested />, dir);
      cy.get(trigger).click();
      cy.contains(second, 'Submenu')
        .focus()
        .realPress(dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft');
      cy.contains(second, 'Nested command').should('be.focused');
      cy.realPress(dir === 'ltr' ? 'ArrowLeft' : 'ArrowRight');
      cy.contains(second, 'Submenu').should('be.focused');
      cy.realPress(dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft');
      cy.contains(second, 'Nested command').should('be.focused').realPress('Enter');
      cy.get('[role="menu"]').should('not.exist');
      cy.get(trigger).should('be.focused');
    });
  });

  it('retains custom opening focus when motion is disabled', () => {
    mount(<Example surfaceMotion={null} />);
    cy.get(trigger).click();
    cy.contains(second, 'Second').should('be.focused').realPress('Escape');
    cy.get('[role="menu"]').should('not.exist');
    cy.get(trigger).should('be.focused');
  });

  describe('custom exit motion', () => {
    const SlowExit = createPresenceComponent({
      enter: { keyframes: [{ opacity: 1 }], duration: 1 },
      exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }], duration: 5000 },
    });
    const setMotionPreference = (value?: 'no-preference') =>
      cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
          command: 'Emulation.setEmulatedMedia',
          params: { features: value ? [{ name: 'prefers-reduced-motion', value }] : [] },
        }),
      );

    beforeEach(() => setMotionPreference('no-preference'));
    afterEach(() => setMotionPreference());

    it('restores focus before the animated popover unmounts', () => {
      mount(
        <Example
          surfaceMotion={{
            children: (_, motionProps) => <SlowExit {...motionProps} />,
          }}
        />,
      );
      cy.get(trigger).click();
      cy.contains(second, 'Second').should('be.focused').realPress('Escape');
      cy.get(trigger).should('be.focused');
      cy.get(`.${menuPopoverClassNames.root}`).then(([surface]) => {
        const animations = surface.getAnimations();
        expect(animations.length).to.be.greaterThan(0);
        animations.forEach(animation => animation.finish());
      });
      cy.get('[role="menu"]').should('not.exist');
    });
  });
});
