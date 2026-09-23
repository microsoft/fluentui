import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useTabsterAttributes } from '@fluentui/react-tabster';

import { Dropdown, Option } from '@fluentui/react-combobox';
import type { DropdownProps } from '@fluentui/react-combobox';

import { triggerSelector, listboxSelector, triggerId } from '../../testing/selectors';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Dropdown - controlling open/close state', () => {
  const ControlledOpenCloseStateDropdown = (props: Partial<DropdownProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    const [open, setOpen] = React.useState(false);
    const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open);
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => setOpen(!!event.target.checked);

    return (
      <>
        <label>
          <input id={triggerId} type="checkbox" name="state" value="open" checked={open} onChange={handleInputChange} />
          Open/Close
        </label>

        <Dropdown placeholder="Select an animal" open={open} onOpenChange={handleOpenChange}>
          {options.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </Dropdown>
      </>
    );
  };

  it('should open/close dropdown when the controlled input state changes', () => {
    mount(<ControlledOpenCloseStateDropdown />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get(triggerSelector).uncheck();
    cy.get(listboxSelector).should('not.exist');
  });

  it('should close dropdown when clicked outside', () => {
    mount(<ControlledOpenCloseStateDropdown />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get('body').click({ force: true });
    cy.get(listboxSelector).should('not.exist');
  });
});

describe('Dropdown - tab navigation', () => {
  const TabsterRoot = (props: { children?: React.ReactNode }) => {
    const tabsterAttrs = useTabsterAttributes({ root: {} });
    return <div {...tabsterAttrs}>{props.children}</div>;
  };

  const DropdownComponent = (props: Partial<DropdownProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    return (
      <Dropdown placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
    );
  };

  it('can tab between multiple dropdowns', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" />
        <DropdownComponent id="second" />
        <DropdownComponent id="third" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'second');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');

    // Loop back to the previous dropdown
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.id', 'second');
  });

  it('can tab between multiple dropdowns (clearable)', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" clearable selectedOptions={['Cat']} />
        <DropdownComponent id="second" />
        <DropdownComponent id="third" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigates to the clear button, since the dropdown is clearable and has selected options
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'aria-label', 'Clear selection');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'second');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');
  });

  it('can tab between multiple dropdowns (skip disabled)', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" />
        <DropdownComponent id="second" disabled />
        <DropdownComponent id="third" />
        <DropdownComponent id="fourth" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigate to the next dropdown and skip disabled one
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');

    // Navigate to the previous dropdown and skip disabled one
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.id', 'first');
  });

  it('selects the active option after keyboard-opening a single-select dropdown', () => {
    const KeyboardOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      const [selectionCount, setSelectionCount] = React.useState(0);
      return (
        <>
          <button id="before-button">Before</button>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => {
              setSelectedOptions(data.selectedOptions);
              setSelectionCount(count => count + 1);
            }}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <output data-testid="selection-count">{selectionCount}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<KeyboardOpenedDropdown />);

    cy.get('#before-button').click().realPress('Tab');
    cy.get('#dropdown').should('be.focused').realPress('Enter');
    cy.get(listboxSelector).should('be.visible');
    cy.get('#dropdown').should('be.focused');
    cy.get('#dropdown').should('have.attr', 'aria-activedescendant').and('not.be.empty');
    cy.realPress('Tab');

    cy.get('[data-testid="selected-options"]').should('have.text', 'Cat');
    cy.get('[data-testid="selection-count"]').should('have.text', '1');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });

  it('selects the active option after reverse-tabbing from a keyboard-opened single-select dropdown', () => {
    const KeyboardOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <button id="before-button">Before</button>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<KeyboardOpenedDropdown />);

    cy.get('#after-button').click().realPress(['Shift', 'Tab']);
    cy.get('#dropdown').should('be.focused').realPress('Enter');
    cy.get(listboxSelector).should('be.visible');
    cy.get('#dropdown').should('have.attr', 'aria-activedescendant').and('not.be.empty');
    cy.get('#dropdown').realPress(['Shift', 'Tab']);

    cy.get('[data-testid="selected-options"]').should('have.text', 'Cat');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#before-button').should('be.focused');
  });

  it('selects the active option when tabbing from a mouse-opened single-select dropdown', () => {
    const MouseOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<MouseOpenedDropdown />);

    cy.get('#dropdown').realClick();
    cy.get(listboxSelector).should('be.visible');
    cy.get('#dropdown').should('have.attr', 'aria-activedescendant').and('not.be.empty');
    cy.realPress('Tab');

    cy.get('[data-testid="selected-options"]').should('have.text', 'Cat');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });

  it('does not select the active option when light-dismissing a single-select dropdown', () => {
    const MouseOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<MouseOpenedDropdown />);

    cy.get('#dropdown').realClick();
    cy.get(listboxSelector).should('be.visible');
    cy.get('#after-button').realClick();

    cy.get('[data-testid="selected-options"]').should('be.empty');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });

  it('does not select after keyboard navigation when light-dismissing with a pointer', () => {
    const MouseOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<MouseOpenedDropdown />);

    cy.get('#dropdown').realClick().realPress('ArrowDown');
    cy.get('#dropdown').should('have.attr', 'aria-activedescendant').and('not.be.empty');
    cy.get('#after-button').realClick();

    cy.get('[data-testid="selected-options"]').should('be.empty');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });

  it('does not select when focus is moved programmatically after keyboard opening', () => {
    const KeyboardOpenedDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <Dropdown
            id="dropdown"
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<KeyboardOpenedDropdown />);

    cy.get('#dropdown').focus().realPress('Enter');
    cy.get(listboxSelector).should('be.visible');
    cy.get('#after-button').focus();

    cy.get('[data-testid="selected-options"]').should('be.empty');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });

  it('does not select the active option when tabbing from a multiselect dropdown', () => {
    const MultiselectDropdown = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
      return (
        <>
          <Dropdown
            defaultOpen
            inlinePopup
            id="dropdown"
            multiselect
            selectedOptions={selectedOptions}
            onOptionSelect={(_, data) => setSelectedOptions(data.selectedOptions)}
          >
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
          <output data-testid="selected-options">{selectedOptions.join(',')}</output>
          <button id="after-button">After</button>
        </>
      );
    };

    mount(<MultiselectDropdown />);

    cy.get('#dropdown').focus();
    cy.realPress('Tab');

    cy.get('[data-testid="selected-options"]').should('be.empty');
    cy.get(listboxSelector).should('not.exist');
    cy.get('#after-button').should('be.focused');
  });
});
