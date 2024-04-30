import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { Dropdown } from './Dropdown';
import { Option } from '../Option/index';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { dropdownClassNames } from './useDropdownStyles.styles';
import { DropdownProps } from '@fluentui/react-combobox';

describe('Dropdown', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
    primarySlot: 'button',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inlinePopup: true,
          },
          // Classes are defined manually as there is no way to render "expandIcon" and "clearIcon" and the same time
          expectedClassNames: {
            root: dropdownClassNames.root,
            button: dropdownClassNames.button,
            expandIcon: dropdownClassNames.expandIcon,
            listbox: dropdownClassNames.listbox,
          },
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange', 'onOptionSelect'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders a hidden listbox when trigger is focused', () => {
    const result = render(
      <Dropdown inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    act(() => {
      result.getByRole('combobox').focus();
    });

    const listbox = result.container.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    expect(window.getComputedStyle(listbox!).display).toEqual('none');
  });

  it('renders an open listbox', () => {
    const result = render(
      <Dropdown open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders the popup under document.body by default', () => {
    const { container } = render(
      <Dropdown open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );
    expect(container.querySelector('[role=listbox]')).toBeNull();
    expect(document.body.querySelector('[role=listbox]')).not.toBeNull();
  });

  it('renders the popup inline when specified', () => {
    const { container } = render(
      <Dropdown open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );
    expect(container.querySelector('[role=listbox]')).not.toBeNull();
  });

  it('adds aria-owns and aria-controls pointing to the popup', () => {
    const { getByRole, container } = render(
      <Dropdown open className="root">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const listboxId = getByRole('listbox').id;
    expect(container.querySelector('.root')?.getAttribute('aria-owns')).toEqual(listboxId);
    expect(container.querySelector('button')?.getAttribute('aria-controls')).toEqual(listboxId);
  });

  /* open/close tests */
  it('opens the popup on click', () => {
    const { getByRole } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByRole('combobox'));

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('closes the popup on click with defaultOpen', () => {
    const { getByRole } = render(
      <Dropdown defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    expect(getByRole('listbox')).not.toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');

    fireEvent.click(combobox);

    expect(combobox.getAttribute('aria-expanded')).toEqual('false');
  });

  it('does not close the combobox on click with controlled open', () => {
    const { getByRole } = render(
      <Dropdown open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    expect(getByRole('listbox')).not.toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');

    fireEvent.click(combobox);

    expect(getByRole('listbox')).not.toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');
  });

  it('opens the popup on enter', () => {
    const { getByRole } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.keyDown(getByRole('combobox'), { key: 'Enter' });

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('opens and closes the popup with alt + arrow keys', () => {
    const { getByRole } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    fireEvent.keyDown(combobox, { key: 'ArrowDown', altKey: true });
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');

    fireEvent.keyDown(combobox, { key: 'ArrowUp', altKey: true });
    expect(combobox.getAttribute('aria-expanded')).toEqual('false');
  });

  it('closes the popup with escape', () => {
    const { getByRole } = render(
      <Dropdown defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.keyDown(getByRole('combobox'), { key: 'Escape' });

    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('false');
  });

  it('fires onOpen callback', () => {
    const onOpen = jest.fn();

    const { getByRole } = render(
      <Dropdown onOpenChange={onOpen}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByRole('combobox'));

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][1]).toEqual({ open: true });
  });

  /* Selection */
  it('should set defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Dropdown open defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set multiple defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Dropdown open multiselect defaultSelectedOptions={['Green', 'Red']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option data-testid="blue">Blue</Option>
      </Dropdown>,
    );

    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('red').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('false');
  });

  it('should set defaultSelectedOptions based on Option `value`', () => {
    const { getByTestId } = render(
      <Dropdown open multiselect defaultSelectedOptions={['b', 'c']}>
        <Option value="a">Red</Option>
        <Option data-testid="green" value="b">
          Green
        </Option>
        <Option data-testid="blue" value="c">
          Blue
        </Option>
      </Dropdown>,
    );

    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('true');
  });

  it('should set selectedOptions', () => {
    const { getByTestId } = render(
      <Dropdown open selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set selectedOptions based on Option `value`', () => {
    const { getByTestId } = render(
      <Dropdown open multiselect selectedOptions={['a', 'c']}>
        <Option data-testid="red" value="a">
          Red
        </Option>
        <Option data-testid="green" value="b">
          Green
        </Option>
        <Option data-testid="blue" value="c">
          Blue
        </Option>
      </Dropdown>,
    );

    expect(getByTestId('red').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('false');
  });

  it('should change defaultSelectedOptions on click', () => {
    const { getByTestId } = render(
      <Dropdown open defaultSelectedOptions={['Green']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByTestId('red'));

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('false');
    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
  });

  it('selects an option on click', () => {
    const { getByTestId, getByRole } = render(
      <Dropdown defaultOpen>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByTestId('red'));

    expect(getByRole('combobox').textContent).toEqual('Red');
  });

  it('selects an option on enter and space', () => {
    const { getByTestId, getByRole } = render(
      <Dropdown open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: 'Enter' });

    expect(getByRole('combobox').textContent).toEqual('Red');

    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(combobox, { key: ' ' });

    expect(getByRole('combobox').textContent).toEqual('Green');
  });

  it('does not select a disabled option with the keyboard', () => {
    const { getByTestId, getByRole } = render(
      <Dropdown open data-testid="combobox">
        <Option disabled>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: ' ' });

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('');
  });

  it('selects an option when tabbing away from an open combobox', () => {
    const { getByTestId, getByRole } = render(
      <Dropdown defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByTestId('combobox');
    fireEvent.keyDown(combobox, { key: 'Tab' });

    expect(getByRole('combobox').textContent).toEqual('Red');
  });

  it('adds to selection for multiselect', () => {
    const { getByText } = render(
      <Dropdown open multiselect defaultSelectedOptions={['Red']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByText('Red', { selector: '[role=menuitemcheckbox]' }).getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Blue').getAttribute('aria-checked')).toEqual('false');
  });

  it('calls onOptionSelect with correct data for single-select', () => {
    const onOptionSelect = jest.fn();

    const { getByRole, getByText } = render(
      <Dropdown value="Red" onOptionSelect={onOptionSelect}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getByText('Green'));

    expect(onOptionSelect).toHaveBeenCalledTimes(1);
    expect(onOptionSelect).toHaveBeenCalledWith(expect.anything(), {
      optionValue: 'Green',
      optionText: 'Green',
      selectedOptions: ['Green'],
    });
  });

  it('calls onOptionSelect with Option value prop', () => {
    const onOptionSelect = jest.fn();

    const { getByRole, getByText } = render(
      <Dropdown value="Red" onOptionSelect={onOptionSelect}>
        <Option>Red</Option>
        <Option value="test">Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getByText('Green'));

    expect(onOptionSelect).toHaveBeenCalledTimes(1);
    expect(onOptionSelect).toHaveBeenCalledWith(expect.anything(), {
      optionValue: 'test',
      optionText: 'Green',
      selectedOptions: ['test'],
    });
  });

  it('should set display value to option text', () => {
    const { getByRole, getByText } = render(
      <Dropdown defaultOpen>
        <Option value="r">Red</Option>
        <Option value="g">Green</Option>
        <Option value="b">Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByRole('combobox').textContent).toEqual('Green');
  });

  it('calls onOptionSelect with correct data for multi-select', () => {
    const onOptionSelect = jest.fn();

    const { getByRole, getByText } = render(
      <Dropdown value="Red" onOptionSelect={onOptionSelect} multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getByText('Green'));
    userEvent.click(getByText('Blue'));

    expect(onOptionSelect).toHaveBeenCalledTimes(2);
    expect(onOptionSelect).toHaveBeenNthCalledWith(1, expect.anything(), {
      optionValue: 'Green',
      optionText: 'Green',
      selectedOptions: ['Green'],
    });
    expect(onOptionSelect).toHaveBeenNthCalledWith(2, expect.anything(), {
      optionValue: 'Blue',
      optionText: 'Blue',
      selectedOptions: ['Green', 'Blue'],
    });
  });

  it('stays open on click for multiselect', () => {
    const { getByText, getByRole } = render(
      <Dropdown defaultOpen multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByRole('menu')).not.toBeNull();
  });

  it('should respect value over selected options', () => {
    const { getByRole } = render(
      <Dropdown value="foo" selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    expect(getByRole('combobox').textContent).toEqual('foo');
  });

  it('should change defaultValue on select', () => {
    const { getByRole, getByText } = render(
      <Dropdown defaultValue="foo" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByRole('combobox').textContent).toEqual('Green');
  });

  it('should update value after selection for multiselect', () => {
    const { getByRole, getByText } = render(
      <Dropdown defaultOpen defaultSelectedOptions={['Red']} multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect(getByRole('combobox').textContent).toEqual('Red, Green');
  });

  it('should not change controlled value on select', () => {
    const { getByRole, getByText } = render(
      <Dropdown value="Red" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByRole('combobox').textContent).toEqual('Red');
  });

  /* Active option */
  it('should set active option on click', () => {
    const { getByTestId } = render(
      <Dropdown open data-testid="combobox">
        <Option>Red</Option>
        <Option data-testid="clicked">Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const option = getByTestId('clicked');
    fireEvent.click(option);

    expect(getByTestId('combobox').getAttribute('aria-activedescendant')).toEqual(option.id);
  });

  it('should move active option with arrow down', () => {
    const { getByTestId, getByText } = render(
      <Dropdown defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should move active option with arrow up', () => {
    const { getByTestId, getByText } = render(
      <Dropdown open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.click(getByText('Blue'));

    fireEvent.keyDown(combobox, { key: 'ArrowUp' });
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should move to first matching active option by typing a matching string', () => {
    const { getByRole, getByText } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Groot</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    userEvent.type(combobox, 'gr');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should clear active option when typing a string with no matches', () => {
    const { getByRole, getByText } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    userEvent.click(combobox);

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);

    userEvent.keyboard('t');

    expect(combobox.getAttribute('aria-activedescendant')).toBeFalsy();
  });

  it('should cycle through options by repeating the same letter', () => {
    const { getByRole, getByText } = render(
      <Dropdown open>
        <Option>Cat</Option>
        <Option>Dog</Option>
        <Option>Dolphin</Option>
        <Option>Duck</Option>
        <Option>Horse</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    userEvent.type(combobox, 'dd');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Dolphin').id);

    userEvent.type(combobox, 'dd');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Dog').id);
  });

  it('should not move active option when typing a matching string', () => {
    const { getByRole, getByText } = render(
      <Dropdown>
        <Option>Red</Option>
        <Option>Redder</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>,
    );

    const combobox = getByRole('combobox');

    userEvent.tab();
    userEvent.keyboard('red');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Dropdown>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Dropdown>
      </Field>,
    );

    const combobox = result.getByRole('combobox') as HTMLInputElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(combobox.id).toEqual(label.htmlFor);
    expect(combobox.getAttribute('aria-describedby')).toEqual(message.id);
    expect(combobox.getAttribute('aria-invalid')).toEqual('true');
    expect(combobox.getAttribute('aria-required')).toEqual('true');
  });

  describe('clearable', () => {
    it('clears the selection on a button click', () => {
      const { getByLabelText, getByRole } = render(
        <Dropdown clearable defaultSelectedOptions={['Red']} defaultValue="Red">
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Dropdown>,
      );

      const dropdown = getByRole('combobox');
      const clearButton = getByLabelText('Clear selection');

      expect(clearButton).not.toHaveStyle({ display: 'none' });
      expect(dropdown).toHaveTextContent('Red');

      act(() => {
        fireEvent.click(clearButton);
      });

      expect(clearButton).toHaveStyle({ display: 'none' });
      expect(dropdown).toHaveTextContent('');
    });

    it('is not visible when there is no selection', () => {
      const { getByLabelText } = render(
        <Dropdown clearable>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Dropdown>,
      );
      const clearButton = getByLabelText('Clear selection');

      expect(clearButton).toHaveStyle({ display: 'none' });
    });
  });
  describe('Active item change', () => {
    it('should call onActiveOptionChange with arrow down', () => {
      let activeOptionText = '';
      const onActiveOptionChange: DropdownProps['onActiveOptionChange'] = (_, data) => {
        activeOptionText = data.nextOption?.text ?? '';
      };
      render(
        <Dropdown onActiveOptionChange={onActiveOptionChange}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Dropdown>,
      );

      userEvent.tab();
      userEvent.keyboard('{ArrowDown}');
      expect(activeOptionText).toBe('Red');
      userEvent.keyboard('{ArrowDown}');
      expect(activeOptionText).toBe('Green');
      userEvent.keyboard('{ArrowUp}');
      expect(activeOptionText).toBe('Red');
    });
  });
});
