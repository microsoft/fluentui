import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../common/isConformant';
import { useKeytipRef } from '../../Keytips';
import { SelectableOptionMenuItemType } from '../../SelectableOption';
import { resetIds } from '../../Utilities';
import { ComboBox } from './ComboBox';
import type { IComboBox, IComboBoxOption } from './ComboBox.types';

const RENDER_OPTIONS: IComboBoxOption[] = [
  { key: 'header', text: 'Header', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'Option 1' },
  { key: 'divider', text: '', itemType: SelectableOptionMenuItemType.Divider },
  { key: '2', text: 'Option 2' },
];

const DEFAULT_OPTIONS: IComboBoxOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
];

const DEFAULT_OPTIONS2: IComboBoxOption[] = [
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' },
];
const DEFAULT_OPTIONS3: IComboBoxOption[] = [
  { key: '0', text: 'Zero', itemType: SelectableOptionMenuItemType.Header },
  { key: '1', text: 'One' },
  { key: '2', text: 'Foo' },
  { key: '3', text: 'Bar' },
];

const RUSSIAN_OPTIONS: IComboBoxOption[] = [
  { key: '0', text: 'сестра' },
  { key: '1', text: 'брат' },
  { key: '2', text: 'мама' },
  { key: '3', text: 'папа' },
];

const returnUndefined = () => undefined;

describe('ComboBox', () => {
  const createPortal = ReactDOM.createPortal;

  function mockCreatePortal() {
    (ReactDOM as any).createPortal = (node: any) => node;
  }

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    (ReactDOM as any).createPortal = createPortal;
  });

  isConformant({
    Component: ComboBox,
    displayName: 'ComboBox',
  });

  it('Renders correctly', () => {
    const { container } = render(<ComboBox options={DEFAULT_OPTIONS} text="testValue" />);
    expect(container).toMatchSnapshot();
  });

  it('Renders correctly when open', () => {
    // Mock createPortal so that the options list ends up inside the wrapper for snapshotting.
    mockCreatePortal();

    const ref = React.createRef<IComboBox>();
    const { container, getByRole } = render(
      <ComboBox options={RENDER_OPTIONS} defaultSelectedKey="2" componentRef={ref} />,
    );
    userEvent.click(getByRole('combobox'));
    expect(container).toMatchSnapshot();
  });

  it('Renders correctly when opened in multi-select mode', () => {
    mockCreatePortal();
    const ref = React.createRef<IComboBox>();
    const { container, getByRole } = render(
      <ComboBox multiSelect options={RENDER_OPTIONS} defaultSelectedKey="2" componentRef={ref} />,
    );

    userEvent.click(getByRole('combobox'));
    expect(container).toMatchSnapshot();
  });

  it('renders with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
    };

    const TestComponent: React.FunctionComponent = () => {
      const keytipRef = useKeytipRef<HTMLDivElement>({ keytipProps });
      return <ComboBox ariaDescribedBy="test-foo" options={DEFAULT_OPTIONS} ref={keytipRef} />;
    };

    const { container } = render(<TestComponent />);
    expect(container).toMatchSnapshot();
  });

  it('Can flip between enabled and disabled.', () => {
    const { getByRole, rerender } = render(<ComboBox disabled={false} options={DEFAULT_OPTIONS} />);
    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-disabled')).toEqual('false');

    rerender(<ComboBox disabled={true} options={DEFAULT_OPTIONS} />);
    expect(combobox.getAttribute('aria-disabled')).toEqual('true');
  });

  it('Renders no selected item in default case', () => {
    const { getByRole } = render(<ComboBox options={DEFAULT_OPTIONS} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('1');
  });

  it('Renders a selected item in controlled case', () => {
    const { getByRole } = render(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('1');
  });

  it('Renders a selected item with zero key', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    const { getByRole } = render(<ComboBox selectedKey={0} options={options} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('zero');
  });

  it('changes to a selected key change the input', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    const { getByRole, rerender } = render(<ComboBox selectedKey={0} options={options} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('zero');

    rerender(<ComboBox selectedKey={1} options={options} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('one');
  });

  it('changes to a selected item on key change', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    const { getByRole, rerender } = render(<ComboBox selectedKey={0} options={options} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('zero');

    rerender(<ComboBox selectedKey={null} options={options} />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('');
  });

  it('Applies correct attributes to the selected option', () => {
    const { getByRole, getAllByRole } = render(<ComboBox options={DEFAULT_OPTIONS} defaultSelectedKey="2" />);

    const combobox = getByRole('combobox');
    // open combobox to select one option
    userEvent.click(combobox);
    userEvent.click(getAllByRole('option')[0], undefined, { skipPointerEventsCheck: true });
    // reopen combobox to check selected option
    userEvent.click(combobox);
    expect(getAllByRole('option')[0].getAttribute('aria-selected')).toEqual('true');
  });

  it('Renders a placeholder', () => {
    const placeholder = 'Select an option';
    const { getByRole } = render(<ComboBox options={DEFAULT_OPTIONS} placeholder={placeholder} />);

    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('placeholder')).toEqual(placeholder);
    expect(combobox.getAttribute('value')).toEqual('');
  });

  it('Does not automatically add new options when allowFreeform is on in controlled case', () => {
    const { getByRole, getAllByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform onChange={returnUndefined} />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f{enter}');

    const caretdownButton = getByRole('presentation', { hidden: true });
    userEvent.click(caretdownButton);

    expect(getAllByRole('option')).toHaveLength(DEFAULT_OPTIONS.length);
  });

  it('Automatically adds new options when allowFreeform is on in uncontrolled case', () => {
    const { getByRole, getAllByRole } = render(<ComboBox options={DEFAULT_OPTIONS} allowFreeform />);

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f{enter}');

    const caretdownButton = getByRole('presentation', { hidden: true });
    userEvent.click(caretdownButton);

    const options = getAllByRole('option');
    expect(options[options.length - 1].textContent).toEqual('f');
  });

  it('Renders a default value with options', () => {
    const { getByRole } = render(<ComboBox options={DEFAULT_OPTIONS} text="1" />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('1');
  });

  it('Renders a default value with no options', () => {
    const { getByRole } = render(<ComboBox options={[]} text="1" />);
    expect(getByRole('combobox').getAttribute('value')).toEqual('1');
  });

  it('Can change items in uncontrolled case', () => {
    const { getByRole, getAllByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />);

    // open the menu and click the second item
    const combobox = getByRole('combobox');
    userEvent.click(combobox);
    const selectedOption = getAllByRole('option')[1];
    userEvent.click(selectedOption, undefined, { skipPointerEventsCheck: true });

    // check item is selected
    expect(combobox.getAttribute('value')).toEqual('2');
  });

  it('Does not automatically change items in controlled case', () => {
    const { getByRole, getAllByRole } = render(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />);

    // open the menu and click the second item
    const combobox = getByRole('combobox');
    userEvent.click(combobox);
    const selectedOption = getAllByRole('option')[1];
    userEvent.click(selectedOption, undefined, { skipPointerEventsCheck: true });

    // check item is not selected since combobox is controlled
    expect(combobox.getAttribute('value')).toEqual('1');
  });

  it('Multiselect does not mutate props', () => {
    const { getByRole, getAllByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} multiSelect />,
    );

    // open combobox
    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    // select second option
    const secondOption = getAllByRole('option')[1];
    expect(secondOption.getAttribute('aria-selected')).toEqual('false'); // ensure it's not already selected
    userEvent.click(secondOption, undefined, { skipPointerEventsCheck: true });

    // checkbox selected
    expect(secondOption.getAttribute('aria-selected')).toEqual('true');
    // option object not mutated
    expect(!!DEFAULT_OPTIONS[1].selected).toBeFalsy();
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    const { getByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f');
    expect(combobox.getAttribute('value')).toEqual('Foo');
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />);

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f');
    expect(combobox.getAttribute('value')).toEqual('Foo');
  });

  it('Can insert non latin text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="0" options={RUSSIAN_OPTIONS} autoComplete="on" />);

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'п');
    expect(combobox.getAttribute('value')).toEqual('папа');
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    const { getByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f');
    expect(combobox.getAttribute('value')).toEqual('f');
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />);

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete and allowFreeform on', () => {
    const { getByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
    );

    const combobox = getByRole('combobox');
    userEvent.clear(combobox);
    userEvent.type(combobox, '{enter}');
    expect(combobox.getAttribute('value')).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete on and allowFreeform off', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />);

    const combobox = getByRole('combobox');
    userEvent.clear(combobox);
    userEvent.type(combobox, '{enter}');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Can insert an empty string in uncontrolled case with autoComplete off and allowFreeform on', () => {
    const { getByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
    );

    const combobox = getByRole('combobox');
    userEvent.clear(combobox);
    userEvent.type(combobox, '{enter}');
    expect(combobox.getAttribute('value')).toEqual('');
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete and allowFreeform off', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />);

    const combobox = getByRole('combobox');
    userEvent.clear(combobox);
    userEvent.type(combobox, '{enter}');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform on',
    () => {
      const { getByRole } = render(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform />,
      );

      const combobox = getByRole('combobox');
      userEvent.type(combobox, 'f');
      userEvent.clear(combobox);
      userEvent.type(combobox, '{enter}');
      expect(combobox.getAttribute('value')).toEqual('');
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete on and allowFreeform off',
    () => {
      const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" />);

      const combobox = getByRole('combobox');
      userEvent.type(combobox, 'f');
      userEvent.clear(combobox);
      userEvent.type(combobox, '{enter}');
      expect(combobox.getAttribute('value')).toEqual('Foo');
    },
  );

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete off and allowFreeform on',
    () => {
      const { getByRole } = render(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform />,
      );

      const combobox = getByRole('combobox');
      userEvent.type(combobox, 'f');
      userEvent.clear(combobox);
      userEvent.type(combobox, '{enter}');
      expect(combobox.getAttribute('value')).toEqual('');
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform off',
    () => {
      const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" />);

      const combobox = getByRole('combobox');
      userEvent.type(combobox, 'f');
      userEvent.clear(combobox);
      userEvent.type(combobox, '{enter}');
      expect(combobox.getAttribute('value')).toEqual('One');
    },
  );

  it('Can change selected option with keyboard', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{arrowdown}');
    expect(combobox.getAttribute('value')).toEqual('Foo');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{arrowup}');
    expect(combobox.getAttribute('value')).toEqual('Bar');
  });

  it('Can change selected option with keyboard, looping from bottom to top', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="3" options={DEFAULT_OPTIONS2} />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{arrowdown}');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{arrowup}');
    expect(combobox.getAttribute('value')).toEqual('Bar');
  });

  it('Changing selected option with keyboard triggers onChange with the correct value', () => {
    const onChange = jest.fn<
      void,
      [React.FormEvent<IComboBox>, IComboBoxOption | undefined, number | undefined, string | undefined]
    >();
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} onChange={onChange} />);
    const combobox = getByRole('combobox');
    expect(onChange).not.toHaveBeenCalled();

    userEvent.tab();
    userEvent.keyboard('{arrowdown}');
    userEvent.tab();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual(DEFAULT_OPTIONS3[2]);
    expect(onChange.mock.calls[0][2]).toEqual(2);
    expect(onChange.mock.calls[0][3]).toEqual(DEFAULT_OPTIONS3[2].text);

    userEvent.type(combobox, '{arrowup}');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Cannot insert text while disabled', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'a');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    const { getByRole } = render(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />);
    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{arrowdown}');
    expect(combobox.getAttribute('value')).toEqual('One');
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    const { getByRole, queryAllByRole } = render(<ComboBox options={DEFAULT_OPTIONS2} disabled />);
    const combobox = getByRole('combobox');
    userEvent.click(combobox);
    expect(queryAllByRole('option')).toHaveLength(0);
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    const { getByRole, queryAllByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled />,
    );
    const caretdownButton = getByRole('presentation', { hidden: true });
    userEvent.click(caretdownButton);
    expect(queryAllByRole('option')).toHaveLength(0);
  });

  it('Cannot expand the menu when focused with a button while combobox is disabled', () => {
    const comboBoxRef = React.createRef<any>();
    const { queryAllByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} componentRef={comboBoxRef} disabled />,
    );
    comboBoxRef.current?.focus(true);
    expect(queryAllByRole('option')).toHaveLength(0);
  });

  it('Calls onMenuOpen when clicking on the button', () => {
    const onMenuOpenMock = jest.fn();
    const { getByRole, queryAllByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
    );
    const combobox = getByRole('combobox');
    userEvent.click(combobox);
    expect(queryAllByRole('options')).toBeTruthy;
  });

  it('Opens on focus when openOnKeyboardFocus is true', () => {
    const onMenuOpenMock = jest.fn();
    const { queryAllByRole } = render(
      <ComboBox defaultSelectedKey="1" openOnKeyboardFocus options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
    );
    userEvent.tab();
    expect(queryAllByRole('options')).toBeTruthy;
  });

  it('Calls onMenuOpen when touch start on the input', () => {
    const onMenuOpenMock = jest.fn();
    const { getByRole, queryAllByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} allowFreeform />,
    );

    // in a normal scenario, when we do a touchstart we would also cause a click event to fire.
    // This doesn't happen in the simulator so we're manually adding this in.
    const combobox = getByRole('combobox');
    fireEvent.touchStart(combobox);
    userEvent.click(combobox);
    expect(queryAllByRole('options')).toBeTruthy;
  });

  it('onPendingValueChanged triggers for all indexes', () => {
    const indexSeen: number[] = [];
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      if (index !== undefined) {
        indexSeen.push(index);
      }
    };

    const { getByRole } = render(
      <ComboBox
        options={DEFAULT_OPTIONS}
        defaultSelectedKey="1"
        allowFreeform
        onPendingValueChanged={pendingValueChangedHandler}
      />,
    );
    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'f{arrowdown}{arrowup}');
    expect(indexSeen).toContain(0);
    expect(indexSeen).toContain(1);
  });

  it('onPendingValueChanged is called with an empty string when the input is cleared', () => {
    let changedValue: string | undefined = undefined;
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      changedValue = value;
    };

    const { getByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform onPendingValueChanged={pendingValueChangedHandler} />,
    );
    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'a');
    userEvent.clear(combobox);
    expect(changedValue).toEqual('');
  });

  it('onInputValueChange is called whenever the input changes', () => {
    let changedValue: string | undefined = undefined;
    const onInputValueChangeHandler = (value: string) => {
      changedValue = value;
    };

    const { getByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform onInputValueChange={onInputValueChangeHandler} />,
    );
    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'a');
    expect(changedValue).toEqual('a');

    userEvent.clear(combobox);
    expect(changedValue).toEqual('');
  });

  it('suggestedDisplayValue is set to undefined when the selected input is cleared', () => {
    const { getByRole, rerender } = render(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />);

    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('value')).toEqual('1');

    rerender(<ComboBox selectedKey={null} options={DEFAULT_OPTIONS} />);
    expect(combobox.getAttribute('value')).toEqual('');
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    const onChange = jest.fn<
      void,
      [React.FormEvent<IComboBox>, IComboBoxOption | undefined, number | undefined, string | undefined]
    >();
    const initialOption = { key: '1', text: 'Text' };

    const { getByRole } = render(
      <ComboBox options={[initialOption]} autoComplete="on" allowFreeform onChange={onChange} />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'text{enter}');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual(initialOption);
    expect(onChange.mock.calls[0][2]).toEqual(0);
    expect(onChange.mock.calls[0][3]).toEqual(initialOption.text);
    expect(combobox.getAttribute('value')).toEqual('Text');
  });

  it('merges callout classNames', () => {
    const { baseElement, getByRole } = render(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const callout = baseElement.querySelector('.ms-Callout');
    expect(callout).toBeTruthy();
    expect(callout!.classList.contains('ms-ComboBox-callout')).toBeTruthy();
    expect(callout!.classList.contains('foo')).toBeTruthy();
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;

    const { getByRole } = render(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform
        text="hikari"
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
    );

    const combobox = getByRole('combobox');
    userEvent.clear(combobox);
    userEvent.type(combobox, '{enter}');
    expect(updatedText).toEqual('');
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;

    const { getByRole } = render(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, 'ab{backspace}a{backspace}');
    userEvent.clear(combobox);
    expect(combobox.getAttribute('value')).toEqual('');

    userEvent.type(combobox, '{enter}');
    expect(updatedText).toEqual('');
  });

  it('in multiSelect mode, selectedOptions are correct after performing multiple selections using mouse click', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.type(combobox, '{enter}');

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[1], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['1', '2', '3']);
  });

  it('in multiSelect mode, defaultSelectedKey produces correct display input', () => {
    const comboBoxRef = React.createRef<any>();
    const keys = [DEFAULT_OPTIONS[0].key as string, DEFAULT_OPTIONS[2].key as string];
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={keys} />,
    );

    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('value')).toEqual(keys.join(', '));

    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(combobox.getAttribute('value')).toEqual('');
  });

  it('in multiSelect mode, input has correct value after selecting options', () => {
    const { container, getByRole, getAllByRole } = render(<ComboBox multiSelect options={DEFAULT_OPTIONS} />);

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    userEvent.click(combobox);
    userEvent.click(container);

    const keys = [DEFAULT_OPTIONS[0].key, DEFAULT_OPTIONS[2].key];
    expect(combobox.getAttribute('value')).toEqual(keys.join(', '));
  });

  it('in multiSelect mode, input has correct value when multiSelectDelimiter specified', () => {
    const delimiter = '; ';
    const { container, getByRole, getAllByRole } = render(
      <ComboBox multiSelect multiSelectDelimiter={delimiter} options={DEFAULT_OPTIONS} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    userEvent.click(combobox);
    userEvent.click(container);
    const keys = [DEFAULT_OPTIONS[0].key, DEFAULT_OPTIONS[2].key];
    expect(combobox.getAttribute('value')).toEqual(keys.join(delimiter));
  });

  it('in multiSelect mode, optional onItemClick callback invoked per option select', () => {
    const onItemClickMock = jest.fn();
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[1], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    expect(onItemClickMock).toHaveBeenCalledTimes(3);
  });

  it('in multiSelect mode, selectAll selects all options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    const { container, getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    userEvent.type(combobox, '{esc}');
    userEvent.click(container);
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2', '3']);
    expect(combobox.getAttribute('value')).toEqual('1, 2, 3');
  });

  it('in multiSelect mode, selectAll does not select disabled options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    SELECTALL_OPTIONS[1] = { ...SELECTALL_OPTIONS[1], disabled: true };

    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '2', '3']);
  });

  it('in multiSelect mode, selectAll does not select heeaders or dividers', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2']);
  });

  it('in multiSelect mode, selectAll checked calculation ignores headers, dividers, and disabled options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];
    SELECTALL_OPTIONS[2] = { ...SELECTALL_OPTIONS[2], disabled: true };
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', 'selectAll']);
  });

  it('in multiSelect mode, modifying option selection updates selectAll', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];

    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    // un-check one option
    userEvent.click(options[1], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', '3']);
    // re-check option
    userEvent.click(options[1], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['2', '3', '1', 'selectAll']);
  });

  it('in multiSelect mode with mixed selected, selectAll is indeterminate', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={['2']} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    expect(options[0].getAttribute('aria-checked')).toEqual('mixed');
  });

  it('in multiSelect mode, checking options sets selectAll to indeterminate', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];

    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={['2']} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[1], undefined, { skipPointerEventsCheck: true });
    expect(options[0].getAttribute('aria-checked')).toEqual('mixed');

    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    userEvent.click(options[3], undefined, { skipPointerEventsCheck: true });

    expect(options[0].getAttribute('aria-checked')).toEqual('mixed');
  });

  it('in multiSelect mode, checking an indeterminate selectAll checks all options', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...DEFAULT_OPTIONS,
    ];
    const { getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={SELECTALL_OPTIONS} componentRef={comboBoxRef} defaultSelectedKey={['2']} />,
    );

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(comboBoxRef.current!.selectedOptions.map(o => o.key)).toEqual(['selectAll', '1', '2', '3']);
  });

  it('in single-select mode, selectAll behaves as a normal option', () => {
    const comboBoxRef = React.createRef<IComboBox>();
    const SELECTALL_OPTIONS: IComboBoxOption[] = [
      { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
      ...RENDER_OPTIONS,
    ];

    const { getByRole, getAllByRole } = render(<ComboBox options={SELECTALL_OPTIONS} componentRef={comboBoxRef} />);

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(combobox.getAttribute('value')).toEqual('Select All');
  });

  it('invokes optional onItemClick callback on option select', () => {
    const onItemClickMock = jest.fn();
    const { getByRole, getAllByRole } = render(<ComboBox options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />);

    const combobox = getByRole('combobox');
    userEvent.click(combobox);

    const options = getAllByRole('option');
    userEvent.click(options[0], undefined, { skipPointerEventsCheck: true });
    expect(onItemClickMock).toHaveBeenCalledTimes(1);
  });

  it('defaults to ariaDescribedBy prop when passing id to input', () => {
    const ariaId = 'customAriaDescriptionId';
    const { getByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} ariaDescribedBy={ariaId} aria-describedby="usePropInstead" />,
    );

    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-describedby')).toBe(ariaId);
  });

  it('allows adding a custom aria-describedby id to the input via an attribute', () => {
    const ariaId = 'customAriaDescriptionId';
    const { getByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} ariaDescribedBy={ariaId} aria-describedby="usePropInstead" />,
    );

    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-describedby')).toBe(ariaId);
  });

  it('correctly handles (aria-labelledby) when label is also provided', () => {
    const customId = 'customAriaLabelledById';
    const { container, getByRole } = render(
      <ComboBox options={DEFAULT_OPTIONS} label="hello world" aria-labelledby={customId} />,
    );

    const combobox = getByRole('combobox');
    const labelElement = container.querySelector('.ms-Label');
    const labelId = labelElement!.getAttribute('id');
    expect(combobox.getAttribute('aria-labelledby')).toBe(customId + ' ' + labelId);
  });

  it('sets ariaLabel on both the input and the dropdown list', () => {
    const { getByRole } = render(<ComboBox options={RENDER_OPTIONS} ariaLabel="customAriaLabel" persistMenu />);
    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-label')).toBe('customAriaLabel');
    expect(combobox.getAttribute('aria-labelledby')).toBeNull();
    userEvent.click(combobox);
    const listElement = getByRole('listbox');
    expect(listElement.getAttribute('aria-label')).toBe('customAriaLabel');
    expect(listElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('adds aria-required to the DOM when the required prop is set to true', () => {
    const { getByRole } = render(<ComboBox options={DEFAULT_OPTIONS} required />);
    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-required')).toEqual('true');
  });

  it('does not add aria-required to the DOM when the required prop is not set', () => {
    const { getByRole } = render(<ComboBox options={DEFAULT_OPTIONS} />);
    const combobox = getByRole('combobox');
    expect(combobox.getAttribute('aria-required')).toBeNull();
  });

  it('with persistMenu, callout should exist before and after opening menu', () => {
    const onMenuOpenMock = jest.fn();
    const onMenuDismissedMock = jest.fn();

    const { baseElement, getByRole } = render(
      <ComboBox
        defaultSelectedKey="1"
        persistMenu
        options={DEFAULT_OPTIONS2}
        onMenuOpen={onMenuOpenMock}
        onMenuDismissed={onMenuDismissedMock}
      />,
    );
    const combobox = getByRole('combobox');

    // Find menu
    const calloutBeforeOpen = baseElement.querySelector('.ms-Callout');
    expect(calloutBeforeOpen).toBeTruthy();
    expect(calloutBeforeOpen!.classList.contains('ms-ComboBox-callout')).toBeTruthy();

    userEvent.click(combobox);
    expect(onMenuOpenMock.mock.calls.length).toBe(1);

    userEvent.click(combobox);
    expect(onMenuDismissedMock.mock.calls.length).toBe(1);

    // Ensure menu is still there
    const calloutAfterClose = baseElement.querySelector('.ms-Callout');
    expect(calloutAfterClose).toBeTruthy();
    expect(calloutAfterClose!.classList.contains('ms-ComboBox-callout')).toBeTruthy();
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeFrom is true for multiselect with default selected values
  it('adds currentPendingValue to options and selects if multiSelected with default values', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };
    const selectedKeys = ['1', '2', '3'];
    const { container, getByRole } = render(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} defaultSelectedKey={selectedKeys} allowFreeform />,
    );
    const combobox = getByRole('combobox');
    userEvent.type(combobox, comboBoxOption.text);
    //click on container to trigger onBlur
    userEvent.click(container);
    expect(combobox.getAttribute('value')).toEqual(selectedKeys.concat(comboBoxOption.text).join(', '));
  });

  // Adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for multiSelect with no default value selected
  it('adds currentPendingValue to options and selects for multiSelect with no default value', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
      selected: true,
    };

    const { container, getByRole, getAllByRole } = render(
      <ComboBox multiSelect options={DEFAULT_OPTIONS} allowFreeform />,
    );
    const combobox = getByRole('combobox');
    const caretdownButton = getByRole('presentation', { hidden: true });
    userEvent.type(combobox, comboBoxOption.text);
    //click on container to trigger onBlur
    userEvent.click(container);

    userEvent.type(combobox, comboBoxOption.text);
    userEvent.click(caretdownButton);
    const options = getAllByRole('option');
    // This should toggle the checkbox off. With multi-select the currentPendingValue is not reset on input change
    // because it would break keyboard accessibility
    userEvent.click(options[3], undefined, { skipPointerEventsCheck: true });
    // with 'ManuallyEnteredValue' still in the input, on blur it should toggle the check back to on
    userEvent.click(container);
    expect(combobox.getAttribute('value')).toEqual(comboBoxOption.text);
  });

  // adds currentPendingValue to options and makes it selected onBlur
  // if allowFreeForm is true for singleSelect
  it('adds currentPendingValue to options and selects for singleSelect', () => {
    const comboBoxOption: IComboBoxOption = {
      key: 'ManuallyEnteredValue',
      text: 'ManuallyEnteredValue',
    };

    const { container, getByRole, getAllByRole } = render(<ComboBox options={DEFAULT_OPTIONS} allowFreeform />);
    const combobox = getByRole('combobox');
    const caretdownButton = getByRole('presentation', { hidden: true });
    userEvent.type(combobox, comboBoxOption.text);
    userEvent.click(container);
    expect(combobox.getAttribute('value')).toEqual(comboBoxOption.text);

    userEvent.click(caretdownButton);
    const options = getAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });
    //click on container to trigger onBlur
    userEvent.click(container);
    expect(combobox.getAttribute('value')).toEqual(DEFAULT_OPTIONS[2].text);
  });
});
