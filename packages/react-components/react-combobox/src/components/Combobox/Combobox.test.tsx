import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { Combobox } from './Combobox';
import { Option } from '../Option/index';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { comboboxClassNames } from './useComboboxStyles.styles';
import { ComboboxProps } from '@fluentui/react-combobox';

describe('Combobox', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'input',
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
            root: comboboxClassNames.root,
            expandIcon: comboboxClassNames.expandIcon,
            listbox: comboboxClassNames.listbox,
            input: comboboxClassNames.input,
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
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders an open listbox', () => {
    const result = render(
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders a hidden listbox when trigger is focused', () => {
    const result = render(
      <Combobox inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    act(() => {
      result.getByRole('combobox').focus();
    });

    const listbox = result.container.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    expect(window.getComputedStyle(listbox!).display).toEqual('none');
  });

  it('renders the popup under document.body by default', () => {
    const { container } = render(
      <Combobox open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(container.querySelector('[role=listbox]')).toBeNull();
    expect(document.body.querySelector('[role=listbox]')).not.toBeNull();
  });

  it('renders the popup inline when specified', () => {
    const { container } = render(
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(container.querySelector('[role=listbox]')).not.toBeNull();
  });

  /* Expand icon name */
  it('Sets the chevron button name off the aria-label prop', () => {
    const { container } = render(
      <Combobox aria-label="test label">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const chevronButton = container.querySelector('[role=button]');
    expect(chevronButton?.getAttribute('aria-label')).toEqual('Open test label');
  });

  it('Sets the chevron button name off the aria-labelledby prop', () => {
    const { container } = render(
      <Combobox aria-labelledby="testId">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const chevronButton = container.querySelector('[role=button]');
    const chevronId = chevronButton?.id;
    expect(chevronButton?.getAttribute('aria-label')).toEqual('Open');
    expect(chevronButton?.getAttribute('aria-labelledby')).toEqual(chevronId + ' testId');
  });

  it('Defaults to "Open" as the chevron label', () => {
    const { container } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const chevronButton = container.querySelector('[role=button]');
    expect(chevronButton?.getAttribute('aria-label')).toEqual('Open');
    expect(chevronButton?.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('adds aria-owns and aria-controls pointing to the popup', () => {
    const { getByRole, container } = render(
      <Combobox open className="root">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    const listboxId = getByRole('listbox').id;
    expect(container.querySelector('.root')?.getAttribute('aria-owns')).toEqual(listboxId);
    expect(container.querySelector('input')?.getAttribute('aria-controls')).toEqual(listboxId);
  });

  /* open/close tests */
  it('opens the popup on click', () => {
    const { getByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByRole('combobox'));

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('closes the popup on click with defaultOpen', () => {
    const { getByRole, queryByRole } = render(
      <Combobox defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByRole('combobox');

    expect(getByRole('listbox')).not.toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');

    userEvent.click(combobox);

    expect(queryByRole('listbox')).toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('false');
  });

  it('opens the popup when typing', () => {
    const { getByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('xyz');

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('does not close the combobox on click with controlled open', () => {
    const { getByRole } = render(
      <Combobox open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByRole('listbox')).not.toBeNull();

    userEvent.click(getByRole('combobox'));

    expect(getByRole('listbox')).not.toBeNull();
  });

  it('opens the popup on enter', () => {
    const { getByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('opens and closes the popup with alt + arrow keys', () => {
    const { getByRole, queryByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');

    expect(getByRole('listbox')).not.toBeNull();

    userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');

    expect(queryByRole('listbox')).toBeNull();
  });

  it('closes the popup with escape', () => {
    const { queryByRole } = render(
      <Combobox defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('{Escape}');

    expect(queryByRole('listbox')).toBeNull();
  });

  it('fires onOpen callback', () => {
    const onOpen = jest.fn();

    const { getByRole } = render(
      <Combobox onOpenChange={onOpen}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByRole('combobox'));

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][1]).toEqual({ open: true });
  });

  /* Selection */
  it('should set defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set multiple defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open multiselect defaultSelectedOptions={['Green', 'Red']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option data-testid="blue">Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('red').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('false');
  });

  it('should set defaultSelectedOptions based on Option `value`', () => {
    const { getByTestId } = render(
      <Combobox open multiselect defaultSelectedOptions={['b', 'c']}>
        <Option value="a">Red</Option>
        <Option data-testid="green" value="b">
          Green
        </Option>
        <Option data-testid="blue" value="c">
          Blue
        </Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('true');
  });

  it('should set selectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set selectedOptions based on Option `value`', () => {
    const { getByTestId } = render(
      <Combobox open multiselect selectedOptions={['a', 'c']}>
        <Option data-testid="red" value="a">
          Red
        </Option>
        <Option data-testid="green" value="b">
          Green
        </Option>
        <Option data-testid="blue" value="c">
          Blue
        </Option>
      </Combobox>,
    );

    expect(getByTestId('red').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-checked')).toEqual('true');
    expect(getByTestId('green').getAttribute('aria-checked')).toEqual('false');
  });

  it('should set display value to option text', () => {
    const { getByRole, getByText } = render(
      <Combobox defaultOpen>
        <Option value="r">Red</Option>
        <Option value="g">Green</Option>
        <Option value="b">Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByText('Green'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('should change defaultSelectedOptions on click', () => {
    const { getByTestId } = render(
      <Combobox open defaultSelectedOptions={['Green']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByTestId('red'));

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('false');
    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
  });

  it('selects an option on click', () => {
    const { getByTestId, getByRole } = render(
      <Combobox defaultOpen>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByTestId('red'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  it('selects an option on enter and space', () => {
    const { getByTestId, getByRole } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.type(combobox, '{Enter}');

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');

    // space should select after an arrow down
    userEvent.keyboard('{ArrowDown} ');

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('allows to input space', () => {
    const { getByRole, getByText } = render(
      <Combobox open>
        <Option>Slice of pizza</Option>
        <Option>Slice of cake</Option>
        <Option>Slice of pie</Option>
      </Combobox>,
    );

    const combobox = getByRole('combobox');

    userEvent.type(combobox, 'Slice of pie');
    userEvent.type(combobox, '{Enter}');

    expect(getByText('Slice of pie').getAttribute('aria-selected')).toEqual('true');
    expect((combobox as HTMLInputElement).value).toEqual('Slice of pie');
  });

  it('does not select with space while typing', () => {
    const onSelect = jest.fn();

    const { getByTestId, getByRole } = render(
      <Combobox open data-testid="combobox" onOptionSelect={onSelect}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.type(combobox, 'abc def');

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('abc def');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not select a disabled option with the keyboard', () => {
    const { getByTestId, getByRole } = render(
      <Combobox open data-testid="combobox">
        <Option disabled>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.type(combobox, '{Enter}');

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('');
  });

  it('selects an option when tabbing away from an open combobox', () => {
    const { getByRole } = render(
      <Combobox defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab(); // tab to the combobox
    userEvent.tab(); // tab away from the combobox

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  it('adds to selection for multiselect', () => {
    const { getByText } = render(
      <Combobox open multiselect defaultSelectedOptions={['Red']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByText('Green'));

    expect(getByText('Red', { selector: '[role=menuitemcheckbox]' }).getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Blue').getAttribute('aria-checked')).toEqual('false');
  });

  it('stays open on click for multiselect', () => {
    const { getByText, getByRole } = render(
      <Combobox defaultOpen multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByText('Green'));

    expect(getByRole('menu')).not.toBeNull();
  });

  it('clears typed characters after selection for multiselect', () => {
    const { getByRole, getByText } = render(
      <Combobox open multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByRole('combobox');

    userEvent.type(combobox, 'gr');
    userEvent.click(getByText('Green'));

    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect((combobox as HTMLInputElement).value).toEqual('');
  });

  it('should respect value over selected options', () => {
    const { getByRole } = render(
      <Combobox value="foo" selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('foo');
  });

  it('should change defaultValue on select', () => {
    const { getByRole, getByText } = render(
      <Combobox defaultValue="foo" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByText('Green'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('should not change value on select', () => {
    const { getByRole, getByText } = render(
      <Combobox value="Red" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.click(getByText('Green'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  it('calls onOptionSelect with correct data for single-select', () => {
    const onOptionSelect = jest.fn();

    const { getByRole, getByText } = render(
      <Combobox value="Red" onOptionSelect={onOptionSelect}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
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
      <Combobox value="Red" onOptionSelect={onOptionSelect}>
        <Option>Red</Option>
        <Option value="test">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
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

  it('calls onOptionSelect with correct data for multi-select', () => {
    const onOptionSelect = jest.fn();

    const { getByRole, getByText } = render(
      <Combobox value="Red" onOptionSelect={onOptionSelect} multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
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

  /* Freeform space key behavior */
  it('inserts space character when typing in a freeform combobox', () => {
    const onOptionSelect = jest.fn();

    const { getByRole } = render(
      <Combobox onOptionSelect={onOptionSelect} freeform>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.type(getByRole('combobox'), 're ');

    expect(onOptionSelect).not.toHaveBeenCalled();
    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('re ');
  });

  it('uses space to select after arrowing through options in a freeform combobox', () => {
    const onOptionSelect = jest.fn();

    const { getByRole } = render(
      <Combobox onOptionSelect={onOptionSelect} freeform>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.type(getByRole('combobox'), 're{ArrowDown} ');

    expect(onOptionSelect).toHaveBeenCalledTimes(1);
    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('inserts space character in closed freeform combobox', () => {
    const onOptionSelect = jest.fn();

    const { getByRole } = render(
      <Combobox onOptionSelect={onOptionSelect} freeform>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.type(getByRole('combobox'), 'r{ArrowDown}{Escape} ');

    expect(onOptionSelect).not.toHaveBeenCalled();
    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('r ');
  });

  /* Active option */
  it('should set active option on click', () => {
    const { getByTestId } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option data-testid="clicked">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const option = getByTestId('clicked');
    userEvent.click(option);

    expect(getByTestId('combobox').getAttribute('aria-activedescendant')).toEqual(option.id);
  });

  it('should move active option with arrow down', () => {
    const { getByTestId, getByText } = render(
      <Combobox defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should move active option with arrow up', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.click(getByText('Blue'));
    userEvent.keyboard('{ArrowUp}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should move active option with home and end', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.click(getByText('Green'));
    userEvent.keyboard('{End}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Blue').id);

    userEvent.keyboard('{Home}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);
  });

  it('should move active option with page up and page down', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Aqua</Option>
        <Option>Black</Option>
        <Option>Blue</Option>
        <Option>Brown</Option>
        <Option>Green</Option>
        <Option>Grey</Option>
        <Option>Gold</Option>
        <Option>Indigo</Option>
        <Option>Orange</Option>
        <Option>Pink</Option>
        <Option>Purple</Option>
        <Option>Red</Option>
        <Option>Violet</Option>
        <Option>White</Option>
        <Option>Yellow</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.click(getByText('Aqua'));
    userEvent.keyboard('{PageDown}');

    // should move forward 10
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Purple').id);

    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{PageUp}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Black').id);
  });

  it('should move active option with page up and page down with less than 10 options', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Aqua</Option>
        <Option>Black</Option>
        <Option>Blue</Option>
        <Option>Brown</Option>
        <Option>Green</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.click(getByText('Aqua'));
    userEvent.keyboard('{PageDown}');

    // should move forward to last option if there are less than 10 options
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);

    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{PageUp}');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Aqua').id);
  });

  it('should move active option based on typing', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    userEvent.type(combobox, 'g');
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should not move active option based on typing if the current option matches', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Gold</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox') as HTMLInputElement;
    userEvent.click(getByText('Gold'));
    combobox.setSelectionRange(0, 4);
    userEvent.type(combobox, 'g');

    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Gold').id);
  });

  /* typing text */
  it('should allow text input', () => {
    const { getByRole, getByTestId } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');
    userEvent.type(combobox, 'foo');

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('foo');
  });

  it('should revert value to matching selection on blur', () => {
    const { getByRole, getByTestId, getByText } = render(
      <Combobox defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');
    userEvent.click(getByText('Green'));
    // delete a few characters
    userEvent.type(combobox, '{backspace}{backspace}{backspace}');
    userEvent.tab();

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('should clear selection with an empty/unmatching string', () => {
    const { getByRole, getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');
    userEvent.click(getByText('Green'));
    // remove full value of "Green"
    userEvent.type(combobox, '{backspace}{backspace}{backspace}{backspace}{backspace}');
    userEvent.tab();

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('');
    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('false');
  });

  it('should revert value to the empty string on blur when collapsed with no selected options', () => {
    const { getByRole } = render(
      <Combobox data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('xyz');
    userEvent.tab();

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('');
  });

  it('selects an option on blur from a closed combobox when the full value is typed', () => {
    const { getByRole } = render(
      <Combobox data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    userEvent.tab();
    userEvent.keyboard('blue');
    userEvent.tab();

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Blue');
  });

  it('should not revert value on blur with freeform', () => {
    const { getByRole, getByTestId, getByText } = render(
      <Combobox defaultOpen freeform data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox') as HTMLInputElement;
    userEvent.click(getByText('Green'));

    combobox.setSelectionRange(0, 5);
    userEvent.keyboard('foo');
    userEvent.tab();

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('foo');
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Combobox>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </Field>,
    );

    const combobox = result.getByRole('combobox') as HTMLInputElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(combobox.id).toEqual(label.htmlFor);
    expect(combobox.getAttribute('aria-describedby')).toEqual(message.id);
    expect(combobox.getAttribute('aria-invalid')).toEqual('true');
    expect(combobox.required).toBe(true);
  });

  describe('clearable', () => {
    it('clears the selection on a button click', () => {
      const { getByText, getByRole } = render(
        <Combobox
          clearable
          defaultSelectedOptions={['Red']}
          defaultValue="Red"
          clearIcon={{ children: 'CLEAR BUTTON' }}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );

      const combobox = getByRole('combobox');
      const clearButton = getByText('CLEAR BUTTON');

      expect(clearButton).not.toHaveStyle({ display: 'none' });
      expect(combobox).toHaveValue('Red');

      act(() => {
        fireEvent.click(clearButton);
      });

      expect(clearButton).toHaveStyle({ display: 'none' });
      expect(combobox).toHaveValue('');
    });

    it('is not visible when there is no selection', () => {
      const { getByText } = render(
        <Combobox clearable clearIcon={{ children: 'CLEAR BUTTON' }}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );
      const clearButton = getByText('CLEAR BUTTON');

      expect(clearButton).toHaveStyle({ display: 'none' });
      expect(clearButton).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Active item change', () => {
    it('should call onActiveOptionChange with arrow down', () => {
      let activeOptionText = '';
      const onActiveOptionChange: ComboboxProps['onActiveOptionChange'] = (_, data) => {
        activeOptionText = data.nextOption?.text ?? '';
      };
      render(
        <Combobox onActiveOptionChange={onActiveOptionChange}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
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

  describe('expandIcon', () => {
    it('respects author-provided labels for the chevron button', () => {
      const { container, rerender } = render(
        <Combobox aria-label="not used" aria-labelledby="not-used" expandIcon={{ 'aria-label': 'test label' }}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );

      const chevronButton = container.querySelector('[role=button]');
      expect(chevronButton?.getAttribute('aria-label')).toEqual('test label');
      expect(chevronButton?.getAttribute('aria-labelledby')).toBeFalsy();

      rerender(
        <Combobox aria-label="not used" aria-labelledby="not-used" expandIcon={{ 'aria-labelledby': 'testId' }}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );

      expect(chevronButton?.getAttribute('aria-label')).toBeFalsy();
      expect(chevronButton?.getAttribute('aria-labelledby')).toEqual('testId');
    });

    it('opens the popup on expand icon click', () => {
      const { getByRole, getByTestId } = render(
        <Combobox expandIcon={{ 'data-testid': 'icon' } as React.HTMLAttributes<HTMLSpanElement>}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );

      userEvent.click(getByTestId('icon'));
      expect(getByRole('listbox')).not.toBeNull();
    });

    it('closes the popup on expand icon click', () => {
      const { getByTestId, queryByRole } = render(
        <Combobox defaultOpen expandIcon={{ 'data-testid': 'icon' } as React.HTMLAttributes<HTMLSpanElement>}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>,
      );

      userEvent.tab();
      userEvent.click(getByTestId('icon'));

      expect(queryByRole('listbox')).toBeNull();
    });

    it('closes the popup on blur/outside click after clicking on the expand icon', () => {
      const { getByTestId, queryByRole } = render(
        <>
          <Combobox expandIcon={{ 'data-testid': 'icon' } as React.HTMLAttributes<HTMLSpanElement>}>
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
          </Combobox>
          <div data-testid="outside">outside</div>
        </>,
      );

      userEvent.click(getByTestId('icon'));
      expect(queryByRole('listbox')).not.toBeNull();

      userEvent.click(getByTestId('outside'));
      expect(queryByRole('listbox')).toBeNull();
    });

    it('allows to pass "null"', () => {
      const { container } = render(
        <Combobox expandIcon={null}>
          <Option>Red</Option>
        </Combobox>,
      );

      expect(container.querySelector(`.${comboboxClassNames.expandIcon}`)).not.toBeInTheDocument();
    });
  });
});
