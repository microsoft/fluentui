import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { KeyCodes } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { IComboBox, IComboBoxOption } from './ComboBox.types';
import { SelectableOptionMenuItemType } from '../../SelectableOption';
import { isConformant } from '../../common/isConformant';
import { safeCreate } from '@uifabric/test-utilities';

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

const createNodeMock = (el: React.ReactElement<{}>) => {
  return {
    __events__: {},
  };
};

describe('ComboBox', () => {
  beforeEach(() => {
    spyOn(ReactDOM, 'createPortal').and.callFake(element => {
      return element;
    });
  });

  it('Renders correctly', () => {
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} text={'testValue'} />, { createNodeMock });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a Keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
    };
    const component = renderer.create(<ComboBox options={DEFAULT_OPTIONS} keytipProps={keytipProps} />, {
      createNodeMock,
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders`, () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} />, wrapper => {
      expect(wrapper.root).toBeDefined();
    });
  });

  isConformant({
    Component: ComboBox,
    displayName: 'ComboBox',
    // Disabled due to being required to mount by safeCreate. A test called "renders" was added here as a replacement.
    disabledTests: ['component-renders'],
  });

  it('Can flip between enabled and disabled.', () => {
    safeCreate(<ComboBox disabled={false} options={DEFAULT_OPTIONS} />, container => {
      expect(container.root.findAll(node => node.props.className?.split?.(' ')?.includes?.('is-disabled')).length).toBe(
        0,
      );

      expect(
        container.root.findAll(node => typeof node.type === 'string' && node.props['data-is-interactable'] === true)
          .length,
      ).toBe(1);

      renderer.act(() => {
        container.update(<ComboBox disabled={true} options={DEFAULT_OPTIONS} />);
      });

      expect(container.root.findAll(node => node.props.className?.split?.(' ')?.includes?.('is-disabled')).length).toBe(
        2,
      );
      expect(
        container.root.findAll(node => typeof node.type === 'string' && node.props['data-is-interactable'] === false)
          .length,
      ).toBe(1);
    });
  });

  it('Renders no selected item in default case', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('');
    });
  });

  it('Renders a selected item in uncontrolled case', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('1');
    });
  });

  it('Renders a selected item in controlled case', () => {
    safeCreate(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('1');
    });
  });

  it('Renders a selected item with zero key', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeCreate(<ComboBox selectedKey={0} options={options} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('zero');
    });
  });

  it('changes to a selected key change the input', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeCreate(<ComboBox selectedKey={0} options={options} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('zero');
      renderer.act(() => {
        container.update(<ComboBox selectedKey={1} options={options} />);
      });
      expect(input.props.value).toEqual('one');
    });
  });

  it('changes to a selected item on key change', () => {
    const options: IComboBoxOption[] = [
      { key: 0, text: 'zero' },
      { key: 1, text: 'one' },
    ];
    safeCreate(<ComboBox selectedKey={0} options={options} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('zero');
      renderer.act(() => {
        container.update(<ComboBox selectedKey={null} options={options} />);
      });
      expect(input.props.value).toEqual('');
    });
  });

  it('Renders a placeholder', () => {
    const placeholder = 'Select an option';
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} placeholder={placeholder} />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.placeholder).toEqual(placeholder);
      expect(inputElement.props.value).toEqual('');
    });
  });

  it('Does not automatically add new options when allowFreeform is on in controlled case', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} onChange={returnUndefined} />, container => {
      const inputElement = container.root.findByType('input');

      simulateInputEvent(inputElement, 'f');
      simulateKeydown(inputElement, KeyCodes.enter);

      // open combobox
      const buttonElement = container.root.findByType('button');
      ReactTestUtils.act(() => {
        buttonElement?.props?.onClick();
      });

      const options = container.root.findAll(
        node =>
          node.props.className &&
          node.props.className.split(' ').includes('ms-ComboBox-option') &&
          typeof node.type === 'string',
      );

      expect(options.length).toBe(DEFAULT_OPTIONS.length);
    });
  });

  it('Automatically adds new options when allowFreeform is on in uncontrolled case', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} />, container => {
      const inputElement = container.root.findByType('input');

      simulateInputEvent(inputElement, 'f');
      simulateKeydown(inputElement, KeyCodes.enter);

      // open combobox
      const buttonElement = container.root.findByType('button');
      ReactTestUtils.act(() => {
        buttonElement?.props?.onClick();
      });

      const options = container.root.findAll(
        node =>
          node.props.className &&
          node.props.className.split(' ').includes('ms-ComboBox-option') &&
          typeof node.type === 'string',
      );

      expect(options.length).toBe(DEFAULT_OPTIONS.length + 1);
      expect(options[options.length - 1].props.title).toEqual('f');
    });
  });

  it('Renders a default value with options', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} text="1" />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.value).toEqual('1');
    });
  });

  it('Renders a default value with no options', () => {
    safeCreate(<ComboBox options={[]} text="1" />, container => {
      const inputElement = container.root.findByType('input');
      expect(inputElement.props.value).toEqual('1');
    });
  });

  it('Can change items in uncontrolled case', () => {
    const ref = React.createRef<HTMLDivElement>();
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} ref={ref} />, container => {
      const buttonElement = ref.current?.querySelector('.ms-ComboBox button')!;
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.click(buttonElement);
      });

      const secondItemElement = ref.current?.querySelector('.ms-ComboBox-option[data-index="1"]')!;
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.click(secondItemElement);
      });

      const inputElement = ref.current?.querySelector('.ms-ComboBox input') as HTMLInputElement;
      expect(inputElement.value).toEqual('2');
    });
  });

  it('Does not automatically change items in controlled case', () => {
    const ref = React.createRef<HTMLDivElement>();
    safeCreate(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} ref={ref} />, container => {
      const buttonElement = ref.current?.querySelector('.ms-ComboBox button')!;
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.click(buttonElement);
      });

      const secondItemElement = ref.current?.querySelector('.ms-ComboBox-option[data-index="1"]')!;
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.click(secondItemElement);
      });

      const inputElement = ref.current?.querySelector('.ms-ComboBox input') as HTMLInputElement;
      expect(inputElement.value).toEqual('1');
    });
  });

  it('Multiselect does not mutate props', () => {
    const ref = React.createRef<HTMLDivElement>();
    safeCreate(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} multiSelect ref={ref} />, container => {
      const buttonElement = ref.current?.querySelector('.ms-ComboBox button')!;
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.click(buttonElement);
      });

      const buttons = ref.current?.querySelectorAll('.ms-ComboBox-option > input');
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.change(buttons![1]);
      });

      expect(!!DEFAULT_OPTIONS[1].selected).toEqual(false);
    });
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform on', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'f');
        expect(input.props.value).toBe('Foo');
      },
    );
  });

  it('Can insert text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'f');
        expect(input.props.value).toBe('Foo');
      },
    );
  });

  it('Can insert non latin text in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="0" options={RUSSIAN_OPTIONS} autoComplete="on" allowFreeform={false} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'п');
        expect(input.props.value).toBe('папа');
      },
    );
  });

  it('Can insert text in uncontrolled case with autoComplete off and allowFreeform on', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'f');
        expect(input.props.value).toBe('f');
      },
    );
  });

  it('Can insert text in uncontrolled case with autoComplete and allowFreeform off', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'f');
        expect(input.props.value).toBe('One');
      },
    );
  });

  it('Can insert an empty string in uncontrolled case with autoComplete and allowFreeform on', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, '');
        simulateKeydown(input, KeyCodes.enter);
        expect(input.props.value).toBe('');
      },
    );
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete on and allowFreeform off', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, '');
        simulateKeydown(input, KeyCodes.enter);
        expect(input.props.value).toBe('One');
      },
    );
  });

  it('Can insert an empty string in uncontrolled case with autoComplete off and allowFreeform on', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, '');
        simulateKeydown(input, KeyCodes.enter);
        expect(input.props.value).toBe('');
      },
    );
  });

  it('Cannot insert an empty string in uncontrolled case with autoComplete and allowFreeform off', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, '');
        simulateKeydown(input, KeyCodes.enter);
        expect(input.props.value).toBe('One');
      },
    );
  });

  // jeremy

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform on',
    () => {
      safeCreate(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={true} />,
        container => {
          const input = container.root.findByType('input');
          simulateInputEvent(input, 'f');
          simulateInputEvent(input, '');
          simulateKeydown(input, KeyCodes.enter);
          expect(input.props.value).toBe('');
        },
      );
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete on and allowFreeform off',
    () => {
      safeCreate(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="on" allowFreeform={false} />,
        container => {
          const input = container.root.findByType('input');
          simulateInputEvent(input, 'f');
          simulateInputEvent(input, '');
          simulateKeydown(input, KeyCodes.enter);
          expect(input.props.value).toBe('Foo');
        },
      );
    },
  );

  it(
    'Can insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete off and allowFreeform on',
    () => {
      safeCreate(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={true} />,
        container => {
          const input = container.root.findByType('input');
          simulateInputEvent(input, 'f');
          simulateInputEvent(input, '');
          simulateKeydown(input, KeyCodes.enter);
          expect(input.props.value).toBe('');
        },
      );
    },
  );

  it(
    'Cannot insert an empty string after removing a pending value in uncontrolled case ' +
      'with autoComplete and allowFreeform off',
    () => {
      safeCreate(
        <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} autoComplete="off" allowFreeform={false} />,
        container => {
          const input = container.root.findByType('input');
          simulateInputEvent(input, 'f');
          simulateInputEvent(input, '');
          simulateKeydown(input, KeyCodes.enter);
          expect(input.props.value).toBe('One');
        },
      );
    },
  );

  it('Can change selected option with keyboard', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.down);
      expect(input.props.value).toEqual('Foo');
    });
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.up);
      expect(input.props.value).toEqual('Bar');
    });
  });

  it('Can change selected option with keyboard, looping from bottom to top', () => {
    safeCreate(<ComboBox defaultSelectedKey="3" options={DEFAULT_OPTIONS2} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.down);
      expect(input.props.value).toEqual('One');
    });
  });

  it('Can change selected option with keyboard, looping from top to bottom', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS3} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.up);
      expect(input.props.value).toEqual('Bar');
    });
  });

  it('Cannot insert text while disabled', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.a);
      expect(input.props.value).toEqual('One');
    });
  });

  it('Cannot change selected option with keyboard while disabled', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />, container => {
      const input = container.root.findByType('input');
      simulateKeydown(input, KeyCodes.down);
      expect(input.props.value).toEqual('One');
    });
  });

  it('Cannot expand the menu when clicking on the input while disabled', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS2} disabled={true} />, container => {
      const input = container.root.findByType('input');
      input.props.onClick({});
      expect(findNodeWithClass(container, 'is-opened', true).length).toEqual(0);
    });
  });

  it('Cannot expand the menu when clicking on the button while disabled', () => {
    safeCreate(<ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} disabled={true} />, container => {
      const buttonElement = container.root.findByType('button');
      buttonElement.props.onClick({});
      expect(findNodeWithClass(container, 'is-opened', true).length).toEqual(0);
    });
  });

  it('Call onMenuOpened when clicking on the button', () => {
    const onMenuOpenMock = jest.fn();

    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
      container => {
        const buttonElement = container.root.findByType('button');
        buttonElement.props.onClick({});
        expect(onMenuOpenMock.mock.calls.length).toBe(1);
      },
    );
  });

  it('Opens on focus when openOnKeyboardFocus is true', () => {
    const onMenuOpenMock = jest.fn();

    safeCreate(
      <ComboBox defaultSelectedKey="1" openOnKeyboardFocus options={DEFAULT_OPTIONS2} onMenuOpen={onMenuOpenMock} />,
      container => {
        const input = container.root.findByType('input');

        input.props.onFocus?.();
        input.props.onKeyUp?.({});
        expect(onMenuOpenMock.mock.calls.length).toBe(1);
      },
    );
  });

  it('Call onMenuOpened when touch start on the input', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS2} onMenuOpen={returnUndefined} allowFreeform={true} />,
      container => {
        const input = container.root.findByType('input');

        input.props.onTouchStart?.();
        input.props.onClick?.();

        expect(findNodeWithClass(container, 'is-open', true).length).toEqual(1);
      },
      {
        createNodeMock: element =>
          element.type === 'div' ? { addEventListener: jest.fn(), removeEventListener: jest.fn() } : undefined,
      },
    );
  });

  it('onPendingValueChanged triggers for all indexes', () => {
    const indexSeen: number[] = [];
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      if (index !== undefined) {
        indexSeen.push(index);
      }
    };
    safeCreate(
      <ComboBox
        options={DEFAULT_OPTIONS}
        defaultSelectedKey="1"
        allowFreeform={true}
        onPendingValueChanged={pendingValueChangedHandler}
      />,
      container => {
        const input = container.root.findByType('input');

        simulateInputEvent(input, 'f');
        simulateKeydown(input, KeyCodes.down);
        simulateKeydown(input, KeyCodes.up);
        expect(indexSeen).toContain(0);
        expect(indexSeen).toContain(1);
      },
    );
  });

  it('onPendingValueChanged is called with an empty string when the input is cleared', () => {
    let changedValue: string | undefined = undefined;
    const pendingValueChangedHandler = (option?: IComboBoxOption, index?: number, value?: string) => {
      changedValue = value;
    };

    safeCreate(
      <ComboBox options={DEFAULT_OPTIONS} allowFreeform={true} onPendingValueChanged={pendingValueChangedHandler} />,
      container => {
        const input = container.root.findByType('input');

        simulateInputEvent(input, 'a');
        expect(changedValue).toEqual('a');

        simulateInputEvent(input, '');
        expect(changedValue).toEqual('');
      },
    );
  });

  it('suggestedDisplayValue is called undefined when the selected input is cleared', () => {
    safeCreate(<ComboBox selectedKey="1" options={DEFAULT_OPTIONS} />, container => {
      const input = container.root.findByType('input');
      expect(input.props.value).toEqual('1');

      renderer.act(() => {
        container.update(<ComboBox selectedKey={null} options={DEFAULT_OPTIONS} />);
      });
      expect(input.props.value).toEqual('');
    });
  });

  it('Can type a complete option with autocomplete and allowFreeform on and submit it', () => {
    let updatedOption: IComboBoxOption | undefined;
    let updatedIndex: number | undefined;
    const onChange = jest.fn((event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => {
      updatedOption = option;
      updatedIndex = index;
    });
    const initialOption = { key: '1', text: 'Text' };

    safeCreate(
      <ComboBox options={[initialOption]} autoComplete="on" allowFreeform={true} onChange={onChange} />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 't');
        simulateInputEvent(input, 'te');
        simulateInputEvent(input, 'tex');
        simulateInputEvent(input, 'text');
        simulateKeydown(input, KeyCodes.enter);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(updatedOption).toEqual(initialOption);
        expect(updatedIndex).toEqual(0);

        expect(input.props.value).toEqual('Text');
      },
    );
  });

  it('merges callout classNames', () => {
    safeCreate(
      <ComboBox defaultSelectedKey="1" options={DEFAULT_OPTIONS} calloutProps={{ className: 'foo' }} />,
      container => {
        const buttonElement = container.root.find(
          node => node.type === 'button' && node.props?.className?.includes?.('ms-ComboBox'),
        );

        ReactTestUtils.act(() => {
          buttonElement?.props?.onClick?.();
        });

        const callout = container.root.find(node => node.props?.className?.split?.(' ').includes?.('ms-Callout'));
        expect(callout).toBeDefined();
        expect(callout.props.className.includes('ms-ComboBox-callout')).toBeTruthy();
        expect(callout.props.className.includes('foo')).toBeTruthy();
      },
    );
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;
    safeCreate(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform={true}
        text="hikari"
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, '');
        simulateKeydown(input, KeyCodes.enter);

        expect(updatedText).toEqual('');
      },
    );
  });

  it('Can clear text in controlled case with autoComplete off and allowFreeform on', () => {
    let updatedText: string | undefined;
    safeCreate(
      <ComboBox
        options={DEFAULT_OPTIONS}
        autoComplete="off"
        allowFreeform={true}
        onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
          updatedText = value;
        }}
      />,
      container => {
        const input = container.root.findByType('input');
        simulateInputEvent(input, 'ab');
        simulateKeydown(input, KeyCodes.backspace);
        simulateInputEvent(input, 'a');
        simulateKeydown(input, KeyCodes.backspace);
        simulateInputEvent(input, '');
        expect(input.props.value).toEqual('');
        simulateKeydown(input, KeyCodes.enter);
        expect(updatedText).toEqual('');
      },
    );
  });

  //it('in multiSelect mode, selectedIndices are correct after performing multiple selections using mouse click', () =>
  // {
  //   const comboBoxRef = React.createRef<IComboBox>();
  //   wrapper = mount(<ComboBox multiSelect options={DEFAULT_OPTIONS} componentRef={comboBoxRef} />);

  //   const comboBoxRoot = wrapper.find('.ms-ComboBox');
  //   const inputElement = comboBoxRoot.find('input');
  //   inputElement.simulate('keydown', { which: KeyCodes.enter });
  //   const buttons = document.querySelectorAll('.ms-ComboBox-option > input');

  //   ReactTestUtils.Simulate.change(buttons[0]);
  //   ReactTestUtils.Simulate.change(buttons[2]);
  //   ReactTestUtils.Simulate.change(buttons[1]);

  //   expect(((comboBoxRef.current as unknown) as ComboBox).state.selectedIndices).toEqual([0, 2, 1]);
  // });

  it('in multiSelect mode, defaultselected keys produce correct display input', () => {
    safeCreate(
      <ComboBox
        multiSelect
        options={DEFAULT_OPTIONS}
        selectedKey={[DEFAULT_OPTIONS[0].key as string, DEFAULT_OPTIONS[2].key as string]}
      />,
      container => {
        const comboBoxRoot = findNodeWithClass(container, 'ms-ComboBox');
        const inputElement = comboBoxRoot.findByType('input');
        const caretElement = findNodeWithClass(container, 'ms-ComboBox-CaretDown-button');
        renderer.act(() => {
          caretElement.props?.onClick?.();
        });
        renderer.act(() => {
          inputElement.props.onBlur?.({});
        });
        const button = findNodeWithClass(container, 'ms-ComboBox-option', true)
          .filter(node => node.props.className.includes('ms-Checkbox'))
          .map(node => node.findByType('input'));
        renderer.act(() => {
          button[2]?.props?.onChange?.({ persist: jest.fn() });
        });
        renderer.act(() => {
          button[0]?.props?.onChange?.({ persist: jest.fn() });
        });
        const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].map(({ text }) => text).join(', ');

        expect(inputElement.props.value).toEqual(compare);
      },
    );
  });

  it('in multiSelect mode, input has correct value', () => {
    safeCreate(<ComboBox multiSelect options={DEFAULT_OPTIONS} />, container => {
      const comboBoxRoot = findNodeWithClass(container, 'ms-ComboBox');
      const inputElement = comboBoxRoot.findByType('input');
      const caretElement = findNodeWithClass(container, 'ms-ComboBox-CaretDown-button');
      renderer.act(() => {
        caretElement.props?.onClick?.();
      });
      renderer.act(() => {
        inputElement.props.onBlur?.({});
      });
      const button = findNodeWithClass(container, 'ms-ComboBox-option', true)
        .filter(node => node.props.className.includes('ms-Checkbox'))
        .map(node => node.findByType('input'));
      renderer.act(() => {
        button[0]?.props?.onChange?.({ persist: jest.fn() });
      });
      renderer.act(() => {
        button[2]?.props?.onChange?.({ persist: jest.fn() });
      });
      const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].map(({ text }) => text).join(', ');

      expect(inputElement.props.value).toEqual(compare);
    });
  });

  it('in multiSelect mode, input has correct value when multiSelectDelimiter specified', () => {
    safeCreate(<ComboBox multiSelect multiSelectDelimiter="; " options={DEFAULT_OPTIONS} />, container => {
      const comboBoxRoot = findNodeWithClass(container, 'ms-ComboBox');
      const inputElement = comboBoxRoot.findByType('input');
      const caretElement = findNodeWithClass(container, 'ms-ComboBox-CaretDown-button');
      renderer.act(() => {
        caretElement.props?.onClick?.();
      });
      renderer.act(() => {
        inputElement.props.onBlur?.({});
      });
      const button = findNodeWithClass(container, 'ms-ComboBox-option', true)
        .filter(node => node.props.className.includes('ms-Checkbox'))
        .map(node => node.findByType('input'));
      renderer.act(() => {
        button[0]?.props?.onChange?.({ persist: jest.fn() });
      });
      renderer.act(() => {
        button[2]?.props?.onChange?.({ persist: jest.fn() });
      });
      const compare = [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[2]].map(({ text }) => text).join('; ');

      expect(inputElement.props.value).toEqual(compare);
    });
  });

  it('in multiSelect mode, optional onItemClick callback invoked per option select', () => {
    const onItemClickMock = jest.fn();
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />, container => {
      const caretElement = findNodeWithClass(container, 'ms-ComboBox-CaretDown-button');
      renderer.act(() => {
        caretElement?.props?.onClick?.();
      });
      const button = findNodeWithClass(container, 'ms-ComboBox-option', true);
      renderer.act(() => {
        button[0]?.props?.onClick?.({ persist: jest.fn() });
        button[1]?.props?.onClick?.({ persist: jest.fn() });
        button[2]?.props?.onClick?.({ persist: jest.fn() });
      });
      expect(onItemClickMock).toHaveBeenCalledTimes(3);
    });
  });

  it('invokes optional onItemClick callback on option select', () => {
    const onItemClickMock = jest.fn();
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} onItemClick={onItemClickMock} />, container => {
      const caretElement = findNodeWithClass(container, 'ms-ComboBox-CaretDown-button');
      ReactTestUtils.act(() => {
        caretElement?.props?.onClick?.();
      });
      const button = findNodeWithClass(container, 'ms-ComboBox-option', true);
      renderer.act(() => {
        button?.[0]?.props?.onClick?.({ persist: jest.fn() });
      });
      expect(onItemClickMock).toHaveBeenCalledTimes(1);
    });
  });

  it('allows adding a custom aria-describedby id to the input', () => {
    const customId = 'customAriaDescriptionId';
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} ariaDescribedBy={customId} />, container => {
      const inputElement = container.root.findByType('input');
      expect((inputElement.props as React.HTMLAttributes<HTMLInputElement>)['aria-describedby']).toMatch(
        new RegExp('\\b' + customId + '\\b'),
      );
    });
  });

  it('adds aria-required to the DOM when the required prop is set to true', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} required={true} />, container => {
      const inputElement = container.root.findByType('input');
      expect((inputElement.props as React.HTMLAttributes<HTMLInputElement>)['aria-required']).toBe(true);
    });
  });

  it('does not add aria-required to the DOM when the required prop is not set', () => {
    safeCreate(<ComboBox options={DEFAULT_OPTIONS} />, container => {
      const inputElement = container.root.findByType('input');
      expect((inputElement.props as React.HTMLAttributes<HTMLInputElement>)['aria-required']).toBeUndefined();
    });
  });

  it('test persistMenu, callout should exist before and after opening menu', () => {
    const onMenuOpenMock = jest.fn();
    const onMenuDismissedMock = jest.fn();

    safeCreate(
      <ComboBox
        defaultSelectedKey="1"
        persistMenu={true}
        options={DEFAULT_OPTIONS2}
        onMenuOpen={onMenuOpenMock}
        onMenuDismissed={onMenuDismissedMock}
      />,
      container => {
        const comboBoxRoot = findNodeWithClass(container, 'ms-ComboBox');

        // Find menu
        const calloutBeforeOpen = findNodeWithClass(container, 'ms-Callout');
        expect(calloutBeforeOpen).toBeDefined();
        expect(calloutBeforeOpen?.props?.className?.includes?.('ms-ComboBox-callout')).toBeTruthy();

        // Open combobox
        const buttonElement = comboBoxRoot.findByType('button');
        ReactTestUtils.act(() => {
          buttonElement?.props?.onClick();
        });
        expect(onMenuOpenMock.mock.calls.length).toBe(1);

        // Close combobox
        ReactTestUtils.act(() => {
          buttonElement?.props?.onClick();
        });
        expect(onMenuDismissedMock.mock.calls.length).toBe(1);

        // Ensure menu is still there
        const calloutAfterClose = findNodeWithClass(container, 'ms-Callout');
        expect(calloutAfterClose).toBeDefined();
        expect(calloutBeforeOpen?.props?.className?.includes?.('ms-ComboBox-callout')).toBeTruthy();
      },
    );
  });
});

function simulateInputEvent(input: renderer.ReactTestInstance, value: string) {
  renderer.act(() => {
    input.props.onInput?.({ target: { value }, nativeEvent: { isComposing: false } });
  });
}

function simulateKeydown(input: renderer.ReactTestInstance, which: KeyCodes) {
  renderer.act(() => {
    input.props.onKeyDown?.({
      which,
      nativeEvent: { isComposing: false },
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      persist: jest.fn(),
    });
  });
}

function findNodeWithClass(container: renderer.ReactTestRenderer, className: string): renderer.ReactTestInstance;
function findNodeWithClass(
  container: renderer.ReactTestRenderer,
  className: string,
  findAll: true,
): renderer.ReactTestInstance[];
function findNodeWithClass(
  container: renderer.ReactTestRenderer,
  className: string,
  findAll?: true,
): renderer.ReactTestInstance | renderer.ReactTestInstance[] {
  return container.root[findAll ? 'findAll' : 'find'](node => node.props?.className?.split(' ')?.includes?.(className));
}
