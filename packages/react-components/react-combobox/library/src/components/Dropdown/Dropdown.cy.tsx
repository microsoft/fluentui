import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useDebounce } from '@fluentui/react-utilities';

import { Dropdown, Option } from '@fluentui/react-combobox';
import type { DropdownProps } from '@fluentui/react-combobox';

import { triggerSelector, listboxSelector, triggerId } from '../../testing/selectors';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Dropdown controlling open/close state', () => {
  const ControlledOpenCloseStateDropdown = (props: Partial<DropdownProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    const [open, setOpen] = React.useState(false);
    const debouncedOpen = useDebounce(open, 100);
    const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open);
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => setOpen(!!event.target.checked);

    return (
      <>
        <label>
          <input
            id={triggerId}
            type="checkbox"
            name="state"
            value="open"
            checked={debouncedOpen}
            onChange={handleInputChange}
          />
          Open/Close
        </label>

        <Dropdown placeholder="Select an animal" open={debouncedOpen} onOpenChange={handleOpenChange}>
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
