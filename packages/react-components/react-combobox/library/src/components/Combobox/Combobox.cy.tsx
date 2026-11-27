import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useTabsterAttributes } from '@fluentui/react-tabster';

import { Combobox, Dropdown, Option } from '@fluentui/react-combobox';
import type { ComboboxProps } from '@fluentui/react-combobox';

import { triggerSelector, listboxSelector, triggerId } from '../../testing/selectors';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const TabsterRoot = (props: { children?: React.ReactNode }) => {
  const tabsterAttrs = useTabsterAttributes({ root: {} });
  return <div {...tabsterAttrs}>{props.children}</div>;
};

const ComboboxComponent = (props: Partial<ComboboxProps>) => (
  <Combobox placeholder="Select an animal" {...props}>
    {['Cat', 'Dog', 'Ferret'].map(option => (
      <Option key={option}>{option}</Option>
    ))}
  </Combobox>
);

for (const Component of [Combobox, Dropdown]) {
  describe(`${Component.displayName} - scroll stability`, () => {
    it('preserves listbox scrollTop across hover-driven parent re-renders', () => {
      const ScrollStability = () => {
        const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

        // Center and pin the popup so autoSize, not the CSS max-height, constrains the listbox.
        // Disable resize updates to isolate positioning changes caused by parent re-renders.
        return (
          <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <span data-testid="hovered-option">Hovered: {hoveredOption ?? 'none'}</span>
            <Component aria-label="Select an option" positioning={{ pinned: true, disableUpdateOnResize: true }}>
              {Array.from({ length: 50 }, (_, index) => {
                const option = `Option ${index + 1}`;
                return (
                  <Option key={option} onMouseEnter={() => setHoveredOption(option)}>
                    {option}
                  </Option>
                );
              })}
            </Component>
          </div>
        );
      };

      mount(<ScrollStability />);

      cy.get('[role="combobox"]').click();
      cy.get(listboxSelector).should('be.visible').scrollTo('bottom');
      cy.get(listboxSelector)
        .invoke('prop', 'scrollTop')
        .then(scrollTop => {
          expect(scrollTop).to.be.greaterThan(0);

          cy.contains('[role="option"]', /^Option 50$/).trigger('mouseover', { scrollBehavior: false });
          cy.get('[data-testid="hovered-option"]').should('have.text', 'Hovered: Option 50');

          // Allow positioning updates after the parent re-render to finish before checking the scroll position.
          cy.window().then(
            win =>
              new Cypress.Promise<void>(resolve => {
                win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()));
              }),
          );
          cy.get(listboxSelector).should('have.prop', 'scrollTop', scrollTop);
        });

      cy.contains('[role="option"]', /^Option 50$/).click({ scrollBehavior: false });
      cy.get(listboxSelector).should('not.be.visible');
      if (Component === Combobox) {
        cy.get('[role="combobox"]').should('have.value', 'Option 50');
      } else {
        cy.get('[role="combobox"]').should('have.text', 'Option 50');
      }
    });
  });
}

describe('Combobox controlling open/close state', () => {
  const ControlledOpenCloseStateCombobox = (props: Partial<ComboboxProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    const [open, setOpen] = React.useState(false);
    const handleOpenChange: ComboboxProps['onOpenChange'] = (e, data) => setOpen(data.open);
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => setOpen(!!event.target.checked);

    return (
      <>
        <label>
          <input id={triggerId} type="checkbox" name="state" value="open" checked={open} onChange={handleInputChange} />
          Open/Close
        </label>

        <Combobox placeholder="Select an animal" open={open} onOpenChange={handleOpenChange} {...props}>
          {options.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </Combobox>
      </>
    );
  };

  it('should open/close dropdown when the controlled input state changes', () => {
    mount(<ControlledOpenCloseStateCombobox />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get(triggerSelector).uncheck();
    cy.get(listboxSelector).should('not.exist');
  });

  it('should close dropdown when clicked outside', () => {
    mount(<ControlledOpenCloseStateCombobox />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get('body').click({ force: true });
    cy.get(listboxSelector).should('not.exist');
  });
});

describe('Combobox tab selection', () => {
  it('commits once before leaving a real Tabster root', () => {
    const onMoveFocus = cy.stub().as('onMoveFocus');
    const onOptionSelect = cy
      .stub()
      .callsFake((event: React.KeyboardEvent<HTMLElement>) => {
        expect(event.currentTarget.ownerDocument.activeElement).to.equal(event.currentTarget);
      })
      .as('onOptionSelect');

    mount(
      <>
        <TabsterRoot>
          <ComboboxComponent id="combobox" expandIcon={{ tabIndex: -1 }} onOptionSelect={onOptionSelect} />
        </TabsterRoot>
        <button id="after">After</button>
      </>,
    );
    cy.document().then(doc => doc.addEventListener('tabster:movefocus', onMoveFocus));
    cy.get('#combobox').focus().realPress('ArrowDown');
    cy.get('#combobox').should('have.attr', 'aria-activedescendant').realPress('Tab');

    cy.get('@onMoveFocus').should('have.been.called');
    cy.get('@onOptionSelect').should('have.been.calledOnce');
    cy.focused().should('have.id', 'after');
    cy.get('#combobox').should('have.value', 'Cat').and('have.attr', 'aria-expanded', 'false');
    cy.document().then(doc => doc.removeEventListener('tabster:movefocus', onMoveFocus));
  });

  (['Tab', ['Shift', 'Tab'] as ['Shift', 'Tab']] as const).forEach(keypress => {
    it(`selects the active option on ${keypress.toString()} when between focusable elements`, () => {
      const onOptionSelect = cy.stub().as('onOptionSelect');

      mount(
        <TabsterRoot>
          <button id="before">Before</button>
          <ComboboxComponent id="combobox" onOptionSelect={onOptionSelect} />
          <button id="after">After</button>
        </TabsterRoot>,
      );

      cy.get('#combobox').realClick().should('have.attr', 'aria-activedescendant');
      cy.get('#combobox').realPress(keypress);

      cy.get('@onOptionSelect').should('have.been.calledOnce');
      if (keypress === 'Tab') {
        // The expand button is a separate tab stop; selection precedes leaving the input.
        cy.focused().should('have.class', 'fui-Combobox__expandIcon').realPress('Tab');
      }
      cy.get('#combobox').should('have.value', 'Cat').and('have.attr', 'aria-expanded', 'false');
      cy.get('@onOptionSelect').should('have.been.calledOnce');
      cy.focused().should('have.id', keypress === 'Tab' ? 'after' : 'before');
    });
  });

  it('does not select the active option when focus is moved with a pointer', () => {
    const onOptionSelect = cy.stub().as('onOptionSelect');

    mount(
      <TabsterRoot>
        <ComboboxComponent id="combobox" onOptionSelect={onOptionSelect} />
        <button id="after">After</button>
      </TabsterRoot>,
    );

    cy.get('#combobox').realClick().should('have.attr', 'aria-activedescendant');
    cy.get('#after').realClick();

    cy.get('@onOptionSelect').should('not.have.been.called');
    cy.get('#combobox').should('have.value', '').and('have.attr', 'aria-expanded', 'false');
  });

  it('does not select the active option on Tab in multiselect mode', () => {
    const onOptionSelect = cy.stub().as('onOptionSelect');

    mount(
      <TabsterRoot>
        <ComboboxComponent id="combobox" multiselect onOptionSelect={onOptionSelect} />
        <button id="after">After</button>
      </TabsterRoot>,
    );

    cy.get('#combobox').realClick().should('have.attr', 'aria-activedescendant').realPress('Tab');

    cy.get('@onOptionSelect').should('not.have.been.called');
    cy.focused().should('have.class', 'fui-Combobox__expandIcon').realPress('Tab');
    cy.focused().should('have.id', 'after');
    cy.get('#combobox').should('have.attr', 'aria-expanded', 'false');
  });
});
