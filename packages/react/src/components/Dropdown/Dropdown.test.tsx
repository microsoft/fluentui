import * as React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { KeyCodes, resetIds } from '../../Utilities';
import { Dropdown } from './Dropdown';
import { DropdownMenuItemType } from './Dropdown.types';
import { isConformant } from '../../common/isConformant';
import type { IDropdownOption, IDropdown } from './Dropdown.types';

const DEFAULT_OPTIONS: IDropdownOption[] = [
  { key: 'Header1', text: 'Header 1', itemType: DropdownMenuItemType.Header },
  { key: '1', text: '1' },
  { key: '2', text: '2', title: 'test' },
  { key: '3', text: '3' },
  { key: 'Divider1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: '4', text: '4' },
  { key: 'Header2', text: 'Header 2', itemType: DropdownMenuItemType.Header },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
];

const RENDER_OPTIONS: IDropdownOption[] = [
  { key: 'Header1', text: 'Header 1', itemType: DropdownMenuItemType.Header },
  { key: '1', text: '1', selected: true },
  { key: 'Divider1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: '2', text: '2', title: 'test' },
];

describe('Dropdown', () => {
  beforeEach(() => {
    resetIds();
    const win = window as any;
    Object.defineProperty(win.HTMLHtmlElement.prototype, 'clientWidth', { configurable: true, value: 1024 });
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
  });

  describe('single-select', () => {
    it('Renders correctly', () => {
      const { container } = render(<Dropdown options={DEFAULT_OPTIONS} />);
      expect(container).toMatchSnapshot();
    });

    it('Renders correctly when open', () => {
      // There's intermittent variation (maybe measurement-related) on different computers,
      // so use fake timers to make it more predictable even though we never advance the timers.
      jest.useFakeTimers();

      // Specify dropdownWidth to prevent inconsistent calculated widths from getting into the snapshot
      const { getByRole } = render(<Dropdown options={RENDER_OPTIONS} dropdownWidth={200} />);
      userEvent.click(getByRole('combobox'));
      // snapshot the whole body to capture both the field and the options list
      expect(document.body).toMatchSnapshot();
    });

    it('Renders groups based on header start and divider end', () => {
      const { getByRole, getAllByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));

      const groups = getAllByRole('group');
      // Expect 2 groups with role=group
      expect(groups.length).toEqual(2);
      // Expect first group to have 5 elements
      expect(groups[0].childElementCount).toEqual(5);
      // Expect first item to have text Header 1
      expect(groups[0].childNodes[0].textContent).toEqual('Header 1');
      // Expect first item (the header) to have id equal to the group's aria-labelledby
      expect(groups[0].firstElementChild!.getAttribute('id')).toEqual(groups[0].getAttribute('aria-labelledby'));
      // Expect last item to be the divider
      expect(groups[0].childNodes[groups[0].childNodes.length - 1].textContent).toEqual('');
      // Expect option 4 to be a sibling of the first group
      expect(groups[0].nextSibling!.textContent).toEqual('4');
      // Expect second group to have 3 elements
      expect(groups[1].childElementCount).toEqual(3);
    });

    it('Can flip between enabled and disabled.', () => {
      const { getByRole, rerender } = render(<Dropdown options={DEFAULT_OPTIONS} />);
      const dropdownRoot = getByRole('combobox');

      expect(dropdownRoot.className).not.toEqual(expect.stringMatching('is-disabled'));
      expect(dropdownRoot.getAttribute('data-is-focusable')).toEqual('true');

      rerender(<Dropdown options={DEFAULT_OPTIONS} disabled />);

      expect(dropdownRoot.className).toEqual(expect.stringMatching('is-disabled'));
      expect(dropdownRoot.getAttribute('data-is-focusable')).toEqual('false');
    });

    it('Renders no selected item in default case', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      // title element is empty (relying on current DOM structure since text query for empty string wouldn't work)
      expect(getByRole('combobox').querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('Renders a selected item if option specifies selected', () => {
      const { getByRole } = render(
        <Dropdown
          options={[
            { key: '1', text: '1', selected: true },
            { key: '2', text: '2' },
          ]}
        />,
      );

      const titleElement = within(getByRole('combobox')).queryByText('1');
      expect(titleElement).toBeTruthy();
    });

    it('Renders a selected item in uncontrolled case', () => {
      const { getByRole } = render(<Dropdown defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

      const titleElement = within(getByRole('combobox')).queryByText('1');
      expect(titleElement).toBeTruthy();
    });

    it('Renders live region attributes only when focused', () => {
      const { getByRole } = render(<Dropdown defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

      const titleElement = within(getByRole('combobox')).getByText('1');
      expect(titleElement.getAttribute('aria-live')).toBeNull();

      userEvent.tab(); // focus dropdown
      expect(titleElement.getAttribute('aria-live')).toEqual('polite');
    });

    it('does not change the selected item in when defaultSelectedKey changes', () => {
      const { getByRole, rerender } = render(<Dropdown defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

      const titleElement = within(getByRole('combobox')).getByText('1');

      rerender(<Dropdown defaultSelectedKey="2" options={DEFAULT_OPTIONS} />);
      expect(titleElement.textContent).toEqual('1');
    });

    it('Renders a selected item in controlled case', () => {
      const { getByRole } = render(<Dropdown selectedKey="1" options={DEFAULT_OPTIONS} />);
      const titleElement = within(getByRole('combobox')).queryByText('1');
      expect(titleElement).toBeTruthy();
    });

    it('changes the selected item in when selectedKey changes', () => {
      const { getByRole, rerender } = render(<Dropdown selectedKey="1" options={DEFAULT_OPTIONS} />);
      const titleElement = within(getByRole('combobox')).getByText('1');

      rerender(<Dropdown selectedKey="2" options={DEFAULT_OPTIONS} />);
      expect(titleElement.textContent).toEqual('2');
    });

    it('clears when the selectedKey is null', () => {
      const { getByRole, rerender } = render(<Dropdown selectedKey="1" options={DEFAULT_OPTIONS} />);
      const titleElement = within(getByRole('combobox')).getByText('1');

      rerender(<Dropdown selectedKey={null} options={DEFAULT_OPTIONS} />);
      expect(titleElement.textContent).toBe('');
    });

    it('Can change items in uncontrolled case', () => {
      const { getByRole, getAllByRole } = render(<Dropdown defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));

      const secondItemElement = getAllByRole('option')[1];
      expect(secondItemElement?.getAttribute('title')).toEqual('test');

      fireEvent.click(secondItemElement);
      const titleElement = within(getByRole('combobox')).queryByText('2');
      expect(titleElement).toBeTruthy();
    });

    it('calls onChange when the selected item is different', () => {
      const onChangeSpy = jest.fn();

      const { getByRole, getAllByRole } = render(
        <Dropdown id="foo" defaultSelectedKey="1" onChange={onChangeSpy} options={DEFAULT_OPTIONS} />,
      );

      userEvent.click(getByRole('combobox'));

      const secondItemElement = getAllByRole('option')[1];
      fireEvent.click(secondItemElement);

      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), DEFAULT_OPTIONS[2], 2);
      expect(onChangeSpy.mock.calls[0][0].target.id).toEqual('foo');
    });

    it('calls onChange when the selected item is the same if notifyOnReselect is true', () => {
      const onChangeSpy = jest.fn();

      const { getByRole, getAllByRole } = render(
        <Dropdown defaultSelectedKey="3" onChange={onChangeSpy} options={DEFAULT_OPTIONS} notifyOnReselect={true} />,
      );

      userEvent.click(getByRole('combobox'));

      const thirdItemElement = getAllByRole('option')[2];
      fireEvent.click(thirdItemElement);

      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), DEFAULT_OPTIONS[3], 3);
    });

    it('calls onDismiss when dismissing options callout', () => {
      const onDismissSpy = jest.fn();

      const { getByRole, getAllByRole } = render(<Dropdown onDismiss={onDismissSpy} options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));

      const secondItemElement = getAllByRole('option')[1];
      fireEvent.click(secondItemElement);

      expect(onDismissSpy).toHaveBeenCalledTimes(1);
    });

    it('sets the selected item even when key is number 0', () => {
      const options = [
        { key: 0, text: 'item1' },
        { key: 1, text: 'item2' },
      ];

      const { getByRole, rerender } = render(<Dropdown options={options} />);
      const titleElement = getByRole('combobox').querySelector('.ms-Dropdown-title');
      expect(titleElement?.textContent).toBe('');

      rerender(<Dropdown selectedKey={0} options={options} />);

      expect(titleElement?.textContent).toBe('item1');
    });

    it('selectedIndices should not contains -1 even when selectedKey is not in options', () => {
      const options = [
        { key: 0, text: 'item1' },
        { key: 1, text: 'item2' },
      ];

      const { getByRole, rerender } = render(<Dropdown selectedKey={0} options={options} />);
      const titleElement = within(getByRole('combobox')).getByText('item1');

      rerender(<Dropdown selectedKey={-1} options={options} />);
      expect(titleElement.textContent).toBe('');
    });

    it('does not call onChange when the selected item is not different', () => {
      const onChangeSpy = jest.fn();
      const { getByRole, getAllByRole } = render(
        <Dropdown defaultSelectedKey="1" onChange={onChangeSpy} options={DEFAULT_OPTIONS} />,
      );

      userEvent.click(getByRole('combobox'));

      const firstItemElement = getAllByRole('option')[0];
      fireEvent.click(firstItemElement);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('Keypresses on a disabled dropdown has no effect.', () => {
      const options = [...DEFAULT_OPTIONS];
      options[3] = { key: 3, text: '3', selected: true };
      const { getByRole } = render(<Dropdown disabled options={options} />);

      const dropdownRoot = getByRole('combobox');
      const titleElement = within(dropdownRoot).getByText('3');

      userEvent.type(dropdownRoot, '{arrowdown}', { skipClick: true });
      expect(titleElement.textContent).toEqual('3');
      userEvent.type(dropdownRoot, '{arrowup}', { skipClick: true });
      expect(titleElement.textContent).toEqual('3');
    });

    it('Keypresses on a normal dropdown selects the right, valid items.', () => {
      const options = [...DEFAULT_OPTIONS];
      options[3] = { key: 3, text: '3', selected: true };
      const { getByRole } = render(<Dropdown options={options} />);

      userEvent.tab();
      const dropdownRoot = getByRole('combobox');
      const titleElement = within(dropdownRoot).getByText('3');

      userEvent.type(dropdownRoot, '{arrowdown}', { skipClick: true });
      expect(titleElement.textContent).toEqual('4');
      userEvent.type(dropdownRoot, '{arrowup}', { skipClick: true });
      expect(titleElement.textContent).toEqual('3');
      userEvent.type(dropdownRoot, '{arrowup}', { skipClick: true });
      expect(titleElement.textContent).toEqual('2');
    });

    it('does not select any item on focus', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      userEvent.tab();

      const dropdownRoot = getByRole('combobox');
      expect(document.activeElement).toBe(dropdownRoot);
      expect(dropdownRoot.querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('can be programmatically focused when tabIndex=-1, and will not automatically select an item', () => {
      const dropdown = React.createRef<IDropdown>();

      const { getByRole } = render(<Dropdown componentRef={dropdown} tabIndex={-1} options={DEFAULT_OPTIONS} />);

      dropdown.current!.focus(false);

      const dropdownRoot = getByRole('combobox');
      expect(document.activeElement).toBe(dropdownRoot);
      expect(dropdownRoot.querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('opens and does not automatically select an item when focus(true) is called', () => {
      const dropdown = React.createRef<IDropdown>();

      const { getByRole } = render(<Dropdown componentRef={dropdown} options={DEFAULT_OPTIONS} />);

      const dropdownRoot = getByRole('combobox');
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title');
      expect(titleElement?.textContent).toBe('');

      dropdown.current!.focus(true);
      expect(document.activeElement).toBe(dropdownRoot);
      expect(titleElement?.textContent).toBe('');
    });

    it('selects the first valid item on Home keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      const dropdownRoot = getByRole('combobox');
      userEvent.type(dropdownRoot, '{home}');

      const titleElement = within(dropdownRoot).queryByText('1');
      expect(titleElement).toBeTruthy();
    });

    it('selects the last valid item on End keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      const dropdownRoot = getByRole('combobox');
      userEvent.type(dropdownRoot, '{end}');

      const titleElement = within(dropdownRoot).queryByText('6');
      expect(titleElement).toBeTruthy();
    });

    it('skips over headers and separators on keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);
      const dropdownRoot = getByRole('combobox');

      userEvent.type(dropdownRoot, '{arrowdown}');
      const titleElement = within(dropdownRoot).getByText('1');

      userEvent.type(dropdownRoot, '{arrowdown}');
      userEvent.type(dropdownRoot, '{arrowdown}');
      userEvent.type(dropdownRoot, '{arrowdown}');
      expect(titleElement.textContent).toEqual('4');
    });

    it('Shows correct tooltip only if title prop is specified', () => {
      const { getByRole, getAllByRole } = render(<Dropdown options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));

      const options = getAllByRole('option');
      expect(options).toHaveLength(6);

      expect(options[0].getAttribute('title')).toBeFalsy();
      expect(options[1].getAttribute('title')).toEqual('test');
      expect(options[2].getAttribute('title')).toBeFalsy();
    });

    it('opens on focus if openOnKeyboardFocus is true', () => {
      const { queryByRole } = render(<Dropdown openOnKeyboardFocus options={DEFAULT_OPTIONS} />);

      userEvent.tab();

      expect(queryByRole('listbox')).toBeTruthy();
    });

    it('opens on click if openOnKeyboardFocus is true', () => {
      const { getByRole, queryByRole } = render(<Dropdown openOnKeyboardFocus options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));

      expect(queryByRole('listbox')).toBeTruthy();
    });

    it('closes on blur when openOnKeyboardFocus is true', () => {
      const { getByRole, queryByRole } = render(<Dropdown openOnKeyboardFocus options={DEFAULT_OPTIONS} />);

      userEvent.tab();

      expect(queryByRole('listbox')).toBeTruthy();

      // blur, force the dropdown to close, then focus again
      // the second focus is simulating the behavior of the Callout when closed
      const dropdownRoot = getByRole('combobox');
      fireEvent.blur(dropdownRoot);
      fireEvent.keyDown(dropdownRoot, { which: KeyCodes.escape });
      fireEvent.focus(dropdownRoot);

      expect(queryByRole('listbox')).toBeFalsy();
    });

    it('closes when dismissMenu() is called', () => {
      const dropdown = React.createRef<IDropdown>();
      const { getByRole, queryByRole } = render(<Dropdown componentRef={dropdown} options={DEFAULT_OPTIONS} />);

      userEvent.click(getByRole('combobox'));
      expect(queryByRole('listbox')).toBeTruthy();

      dropdown.current?.dismissMenu();

      expect(queryByRole('listbox')).toBeFalsy();
    });

    it('uses item title attribute if provided', () => {
      const options: IDropdownOption[] = [{ key: 'a', text: 'a', title: 'b' }];
      const { getByRole } = render(<Dropdown options={options} />);

      userEvent.click(getByRole('combobox'));

      const item = getByRole('option');
      expect(item.title).toBe('b');
    });

    // This is a way to effectively disable setting a title
    it('uses empty string if provided for title', () => {
      const options: IDropdownOption[] = [{ key: 'a', text: 'a', title: '' }];
      const { getByRole } = render(<Dropdown options={options} />);

      userEvent.click(getByRole('combobox'));

      const item = getByRole('option');
      expect(item.title).toBe('');
    });
  });

  describe('multi-select', () => {
    it('Renders correctly', () => {
      const { container } = render(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);
      expect(container).toMatchSnapshot();
    });

    it('Renders correctly when open', () => {
      // There's intermittent variation (maybe measurement-related) on different computers,
      // so use fake timers to make it more predictable even though we never advance the timers.
      jest.useFakeTimers();

      // Specify dropdownWidth to prevent inconsistent calculated widths from getting into the snapshot
      const { getByRole } = render(<Dropdown multiSelect options={RENDER_OPTIONS} dropdownWidth={200} />);
      userEvent.click(getByRole('combobox'));
      // snapshot the whole body to capture both the field and the options list
      expect(document.body).toMatchSnapshot();
    });

    it('Renders correctly when options change', () => {
      const { getByRole, getAllByRole, queryByText, rerender } = render(
        <Dropdown options={DEFAULT_OPTIONS} multiSelect defaultSelectedKeys={['1', '4']} />,
      );

      expect(queryByText('1, 4')).toBeTruthy(); // expected initial title text

      rerender(<Dropdown options={DEFAULT_OPTIONS.slice(2)} multiSelect defaultSelectedKeys={['1', '4']} />);

      userEvent.click(getByRole('combobox'));

      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    it('Renders no selected item in default case', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);

      expect(getByRole('combobox').querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('Renders a selected item if option specifies selected', () => {
      const { getByRole } = render(
        <Dropdown
          options={[
            { key: '1', text: '1', selected: true },
            { key: '2', text: '2' },
          ]}
          multiSelect
        />,
      );

      const titleElement = within(getByRole('combobox')).queryByText('1');
      expect(titleElement).toBeTruthy();
    });

    it('sets the selected items even when key is number 0', () => {
      const options = [
        { key: 0, text: 'item1' },
        { key: 1, text: 'item2' },
      ];

      const { getByRole, rerender } = render(<Dropdown options={options} multiSelect />);
      const titleElement = getByRole('combobox').querySelector('.ms-Dropdown-title');
      expect(titleElement?.textContent).toBe('');

      rerender(<Dropdown selectedKeys={[0]} options={options} multiSelect />);

      expect(titleElement?.textContent).toBe('item1');
    });

    it('selectedIndices should not contains -1 even when selectedKeys item is not in options', () => {
      const options = [
        { key: 0, text: 'item1' },
        { key: 1, text: 'item2' },
      ];
      const { getByRole, rerender } = render(<Dropdown selectedKeys={[0]} options={options} multiSelect />);
      const titleElement = within(getByRole('combobox')).getByText('item1');

      rerender(<Dropdown selectedKey={-1} options={options} />);
      expect(titleElement.textContent).toBe('');
    });

    it('Renders multiple selected items if multiple options specify selected', () => {
      const { getByRole } = render(
        <Dropdown
          options={[
            { key: '1', text: '1', selected: true },
            { key: '2', text: '2', selected: true },
          ]}
          multiSelect
        />,
      );

      const titleElement = within(getByRole('combobox')).queryByText('1, 2');
      expect(titleElement).toBeTruthy();
    });

    it('Renders a selected item in uncontrolled case', () => {
      const { getByRole } = render(<Dropdown defaultSelectedKeys={['1', '2']} multiSelect options={DEFAULT_OPTIONS} />);

      const titleElement = within(getByRole('combobox')).queryByText('1, 2');
      expect(titleElement).toBeTruthy();
    });

    it('does not change the selected items when defaultSelectedKeys changes', () => {
      const { getByRole, rerender } = render(
        <Dropdown defaultSelectedKeys={['1', '2']} multiSelect options={DEFAULT_OPTIONS} />,
      );

      const titleElement = within(getByRole('combobox')).getByText('1, 2');

      rerender(<Dropdown defaultSelectedKeys={['3', '4']} multiSelect options={DEFAULT_OPTIONS} />);

      expect(titleElement.textContent).toEqual('1, 2');
    });

    it('Renders selected items in controlled case', () => {
      const { getByRole } = render(<Dropdown selectedKeys={['1', '3']} multiSelect options={DEFAULT_OPTIONS} />);

      const titleElement = within(getByRole('combobox')).queryByText('1, 3');
      expect(titleElement).toBeTruthy();
    });

    it('changes selected items in controlled case', () => {
      const { getByRole, rerender } = render(
        <Dropdown selectedKeys={['1', '3']} multiSelect options={DEFAULT_OPTIONS} />,
      );

      const titleElement = within(getByRole('combobox')).getByText('1, 3');

      rerender(<Dropdown selectedKeys={['2', '4']} multiSelect options={DEFAULT_OPTIONS} />);
      expect(titleElement.textContent).toEqual('2, 4');
    });

    it("Preserves selected items in controlled case if they don't change", () => {
      const { getByRole, getAllByRole, queryByRole } = render(<Dropdown selectedKey={'1'} options={DEFAULT_OPTIONS} />);
      const dropdownRoot = getByRole('combobox');
      const titleElement = within(dropdownRoot).getByText('1');

      userEvent.click(dropdownRoot);

      const secondItemElement = getAllByRole('option')[1];
      fireEvent.click(secondItemElement);

      expect(queryByRole('listbox')).toBeFalsy(); // verify menu closed
      expect(titleElement.textContent).toEqual('1');
    });

    it('Can change items in uncontrolled case', () => {
      const { getByRole, getAllByRole } = render(
        <Dropdown defaultSelectedKeys={['1']} multiSelect id="test" options={DEFAULT_OPTIONS} />,
      );

      const dropdownRoot = getByRole('combobox');
      userEvent.click(dropdownRoot);

      const secondItemElement = getAllByRole('option')[1];
      fireEvent.click(secondItemElement);

      const titleElement = within(dropdownRoot).queryByText('1, 2');
      expect(titleElement).toBeTruthy();
    });

    it('calls onChange when selecting an item', () => {
      const onChangeSpy = jest.fn();
      const { getByRole, getAllByRole } = render(
        <Dropdown defaultSelectedKeys={['1']} multiSelect onChange={onChangeSpy} options={DEFAULT_OPTIONS} />,
      );

      const dropdownRoot = getByRole('combobox');
      userEvent.click(dropdownRoot);

      const secondItemElement = getAllByRole('option')[1];
      fireEvent.click(secondItemElement);

      expect(onChangeSpy).toHaveBeenCalled();
      // mock.calls is the arguments for each call.
      // The first argument is the event object, which we don't care about.
      expect(onChangeSpy.mock.calls[0].slice(1)).toEqual([{ ...DEFAULT_OPTIONS[2], selected: true }, 2]);
    });

    it('calls onChange when unselecting an item', () => {
      const onChangeSpy = jest.fn();
      const { getByRole, getAllByRole } = render(
        <Dropdown defaultSelectedKeys={['1']} multiSelect onChange={onChangeSpy} options={DEFAULT_OPTIONS} />,
      );

      const dropdownRoot = getByRole('combobox');
      userEvent.click(dropdownRoot);

      const firstItemElement = getAllByRole('option')[0];
      fireEvent.click(firstItemElement);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy.mock.calls[0].slice(1)).toEqual([{ ...DEFAULT_OPTIONS[1], selected: false }, 1]);
    });

    it('Will not select the first valid item on keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);

      const dropdownRoot = getByRole('combobox');
      userEvent.type(dropdownRoot, '{arrowdown}');

      expect(dropdownRoot.querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('Will not select the first valid item on Home keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);

      const dropdownRoot = getByRole('combobox');
      userEvent.type(dropdownRoot, '{home}');

      expect(dropdownRoot.querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });

    it('Will not select the last valid item on End keypress', () => {
      const { getByRole } = render(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);

      const dropdownRoot = getByRole('combobox');
      userEvent.type(dropdownRoot, '{end}');

      expect(dropdownRoot.querySelector('.ms-Dropdown-title')?.textContent).toBe('');
    });
  });

  describe('Aria attributes', () => {
    it('does not apply aria-labelledby if no label is provided', () => {
      const options = [
        { key: 0, text: '1' },
        { key: 1, text: '2', disabled: true },
        { key: 2, text: '3' },
      ];

      const { getByRole } = render(<Dropdown options={options} />);
      const dropdownRoot = getByRole('combobox');

      expect(dropdownRoot.getAttribute('aria-labelledby')).toBeNull();
    });

    it('does not apply aria-labelledby if an empty label is provided', () => {
      const options = [
        { key: 0, text: '1' },
        { key: 1, text: '2', disabled: true },
        { key: 2, text: '3' },
      ];

      const { getByRole } = render(<Dropdown label="" options={options} />);
      const dropdownRoot = getByRole('combobox');

      expect(dropdownRoot.getAttribute('aria-labelledby')).toBeNull();
    });

    it('applies aria-labelledby if a non-empty label is provided', () => {
      const options = [
        { key: 0, text: '1' },
        { key: 1, text: '2', disabled: true },
        { key: 2, text: '3' },
      ];

      const { getByRole } = render(<Dropdown label="Test label" options={options} />);
      const dropdownRoot = getByRole('combobox');

      expect(dropdownRoot.getAttribute('aria-labelledby')).not.toBeNull();
    });

    it('sets role=error on included error message', () => {
      const { getByRole } = render(
        <Dropdown label="Test label" options={[]} id="sample-dropdown" errorMessage="This is an example error." />,
      );
      const alert = getByRole('alert');
      expect(alert.textContent).toBe('This is an example error.');
    });
  });

  describe('with simulated async loaded options', () => {
    /** See https://github.com/microsoft/fluentui/issues/7315 */
    const DropdownWithChangingProps = (props: { multi: boolean }) => {
      const [options, setOptions] = React.useState<IDropdownOption[]>([]);
      React.useEffect(() => {
        setOptions([
          { key: 'A', text: 'Option a', title: 'I am option a.' },
          { key: 'B', text: 'Option b' },
          { key: 'C', text: 'Option c', disabled: true },
          { key: 'D', text: 'Option d' },
          { key: 'E', text: 'Option e' },
        ]);
      }, []);

      return (
        <div className="docs-DropdownExample">
          {props.multi ? (
            <Dropdown defaultSelectedKeys={['B', 'D']} options={options} multiSelect />
          ) : (
            <Dropdown defaultSelectedKey={'B'} options={options} />
          )}
        </div>
      );
    };

    it('respects defaultSelectedKey if options change (single-select)', () => {
      const { getByRole } = render(<DropdownWithChangingProps multi={false} />);
      const titleElement = within(getByRole('combobox')).queryByText('Option b');
      expect(titleElement).toBeTruthy();
    });

    it('respects defaultSelectedKeys if options change (multi-select)', () => {
      const { getByRole } = render(<DropdownWithChangingProps multi={true} />);
      const titleElement = within(getByRole('combobox')).queryByText('Option b, Option d');
      expect(titleElement).toBeTruthy();
    });
  });
});
