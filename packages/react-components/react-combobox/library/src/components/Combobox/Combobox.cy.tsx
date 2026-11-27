import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Combobox, Dropdown, Option } from '@fluentui/react-combobox';
import type { ComboboxProps } from '@fluentui/react-combobox';

import { triggerSelector, listboxSelector, triggerId } from '../../testing/selectors';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

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
