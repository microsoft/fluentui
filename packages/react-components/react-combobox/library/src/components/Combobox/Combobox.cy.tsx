import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useTabsterAttributes } from '@fluentui/react-tabster';

import { Combobox, Option } from '@fluentui/react-combobox';
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
      cy.get('#combobox').should('have.value', 'Cat').and('have.attr', 'aria-expanded', 'false');
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
    cy.focused().should('have.id', 'after');
  });
});
