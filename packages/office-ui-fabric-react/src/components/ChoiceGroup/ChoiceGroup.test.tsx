/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { ChoiceGroup } from './ChoiceGroup';
import { IChoiceGroupOption, IChoiceGroup, IChoiceGroupProps } from './ChoiceGroup.types';
import { merge, resetIds } from '../../Utilities';
import { mountAttached } from '../../common/testUtilities';

const TEST_OPTIONS: IChoiceGroupOption[] = [
  { key: '1', text: '1', 'data-automation-id': 'auto1', autoFocus: true } as IChoiceGroupOption,
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];
const CHOICE_QUERY_SELECTOR = '.ms-ChoiceField-input';

describe('ChoiceGroup', () => {
  let choiceGroup: ReactWrapper<IChoiceGroupProps> | undefined;

  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  afterEach(() => {
    if (choiceGroup) {
      choiceGroup.unmount();
      choiceGroup = undefined;
    }
  });

  it('renders ChoiceGroup correctly', () => {
    const component = renderer.create(<ChoiceGroup className="testClassName" options={TEST_OPTIONS} required />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ChoiceGroup with label correctly', () => {
    const component = renderer.create(<ChoiceGroup className="testClassName" label="test label" options={TEST_OPTIONS} required />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not use className prop from parent on label', () => {
    choiceGroup = mount(<ChoiceGroup className="testClassName" label="test label" options={TEST_OPTIONS} required />);
    const label = choiceGroup.getDOMNode().querySelector('label');
    expect(label).toBeDefined();
    expect(label!.textContent).toBe('test label');
    expect(label!.className).not.toContain('testClassName');
  });

  it('can change options', () => {
    choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions.length).toBe(3);

    expect(choiceOptions[0].checked).toEqual(false);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect(choiceOptions[0].checked).toEqual(false);
    expect(choiceOptions[1].checked).toEqual(true);
    expect(choiceOptions[2].checked).toEqual(false);

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);
  });

  it('An individual choice option can be disabled', () => {
    const options: IChoiceGroupOption[] = merge([], TEST_OPTIONS);
    options[0].disabled = true;

    choiceGroup = mount(<ChoiceGroup label="testgroup" options={options} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions[0].disabled).toEqual(true);
    expect(choiceOptions[1].disabled).toEqual(false);
    expect(choiceOptions[2].disabled).toEqual(false);
  });

  it('renders all choice options as disabled when disabled', () => {
    choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} disabled={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions[0].disabled).toEqual(true);
    expect(choiceOptions[1].disabled).toEqual(true);
    expect(choiceOptions[2].disabled).toEqual(true);
  });

  it('can act as an uncontrolled component', () => {
    choiceGroup = mount(<ChoiceGroup defaultSelectedKey="1" options={TEST_OPTIONS} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions[0].checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect(choiceOptions[1].checked).toEqual(true);
  });

  it('can render as a controlled component', () => {
    let _selectedItem;
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => {
      _selectedItem = item;
    };

    choiceGroup = mount(<ChoiceGroup selectedKey="1" options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions[0].checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);

    expect(_selectedItem).toEqual(TEST_OPTIONS[1]);
  });

  it('uses extra <input> attributes in dom if specified', () => {
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => undefined;

    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    const extraAttributeGetter: (index: number) => string | null = (index: number): string | null => {
      const input: HTMLInputElement = choiceOptions[index];
      return input.getAttribute('data-automation-id');
    };

    expect(extraAttributeGetter(0)).toEqual('auto1');
    expect(extraAttributeGetter(1)).toBeNull();
  });

  it('can set role attribute to empty string', () => {
    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} role="" />);
    const role = choiceGroup.getDOMNode().getAttribute('role');
    expect(role).toEqual('');
  });

  it('can set role attribute on the containing element', () => {
    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} role="Test" />);
    const role = choiceGroup.getDOMNode().getAttribute('role');
    expect(role).toEqual('Test');
  });

  it('can assign a custom aria label', () => {
    const option4: IChoiceGroupOption[] = [{ key: '4', text: '4', ariaLabel: 'Custom aria label' }];
    choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS.concat(option4)} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceOptions.length).toBe(4);

    expect(choiceOptions[0].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[1].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[2].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[3].getAttribute('aria-label')).toEqual('Custom aria label');
  });

  it('returns the current checked option with user interaction', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} componentRef={choiceGroupRef} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceGroupRef.current!.checkedOption).toBeUndefined();
    ReactTestUtils.Simulate.change(choiceOptions[0]);
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
  });

  it('returns the current checked option with defaultSelectedKey', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} defaultSelectedKey="1" componentRef={choiceGroupRef} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
    ReactTestUtils.Simulate.change(choiceOptions[1]);
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[1]);
  });

  it('returns the current checked option with selectedKey', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} selectedKey="1" componentRef={choiceGroupRef} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR) as NodeListOf<HTMLInputElement>;

    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
    ReactTestUtils.Simulate.change(choiceOptions[1]);
    // selectedKey is still used even though it didn't get updated for latest user click
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
  });

  it('can render element id', () => {
    choiceGroup = mount(<ChoiceGroup defaultSelectedKey="1" id="foo" options={TEST_OPTIONS} />);
    expect(choiceGroup.getDOMNode().getAttribute('id')).toBe('foo');
  });

  it('can focus the checked option', () => {
    // This test has to mount the element to the document since ChoiceGroup.focus() uses document.getElementById()
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    choiceGroup = mountAttached(<ChoiceGroup options={TEST_OPTIONS} defaultSelectedKey="1" componentRef={choiceGroupRef} />);

    const option = choiceGroup.getDOMNode().querySelector(CHOICE_QUERY_SELECTOR) as HTMLInputElement;
    const focusSpy = jest.spyOn(option, 'focus');

    choiceGroupRef.current!.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('can focus the first enabled option', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    choiceGroup = mountAttached(
      <ChoiceGroup options={[{ key: '0', text: 'disabled', disabled: true }, ...TEST_OPTIONS]} componentRef={choiceGroupRef} />
    );

    const option = choiceGroup.getDOMNode().querySelectorAll(CHOICE_QUERY_SELECTOR)![1] as HTMLInputElement;
    const focusSpy = jest.spyOn(option, 'focus');

    choiceGroupRef.current!.focus();
    expect(focusSpy).toHaveBeenCalled();
  });
});
