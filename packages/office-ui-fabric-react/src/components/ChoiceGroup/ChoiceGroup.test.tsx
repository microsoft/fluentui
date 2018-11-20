/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { mount } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { ChoiceGroup } from './ChoiceGroup';
import { IChoiceGroupOption } from './ChoiceGroup.types';
import { resetIds } from '../../Utilities';

const TEST_OPTIONS: IChoiceGroupOption[] = [
  { key: '1', text: '1', 'data-automation-id': 'auto1' } as IChoiceGroupOption,
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];
const QUERY_SELECTOR = '.ms-ChoiceField-input';

describe('ChoiceGroup', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  it('renders ChoiceGroup correctly', () => {
    const component = renderer.create(<ChoiceGroup className="testClassName" options={TEST_OPTIONS} required />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('label does not have className prop from parent', () => {
    const component = renderer.create(<ChoiceGroup className="testClassName" label="testLabel" options={TEST_OPTIONS} required />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can change options', () => {
    const choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect(choiceOptions.length).toBe(3);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('true');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('true');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('true');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');

    ReactTestUtils.Simulate.change(choiceOptions[0]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).checked).toEqual(false);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('true');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
  });

  it('An individual choice option can be disabled', () => {
    const options = { ...TEST_OPTIONS };
    options[0].disabled = true;

    const choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).disabled).toEqual(false);
    expect((choiceOptions[2] as HTMLInputElement).disabled).toEqual(false);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('true');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
  });

  it('renders all choice options as disabled when disabled', () => {
    const choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} disabled={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[2] as HTMLInputElement).disabled).toEqual(true);
    expect((choiceOptions[0] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('data-is-focusable')).toEqual('false');
  });

  it('can act as an uncontrolled component', () => {
    const choiceGroup = mount(<ChoiceGroup defaultSelectedKey="1" options={TEST_OPTIONS} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(true);
  });

  it('can render as a controlled component', () => {
    let _selectedItem;
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => {
      _selectedItem = item;
    };

    const choiceGroup = mount(<ChoiceGroup selectedKey="1" options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);

    ReactTestUtils.Simulate.change(choiceOptions[1]);

    expect((choiceOptions[0] as HTMLInputElement).checked).toEqual(true);
    expect((choiceOptions[1] as HTMLInputElement).checked).toEqual(false);

    expect(_selectedItem).toEqual(TEST_OPTIONS[1]);
  });

  it('extra <input> attributes appear in dom if specified', () => {
    const onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, item: IChoiceGroupOption | undefined): void => undefined;

    const choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    const extraAttributeGetter: (index: number) => string | null = (index: number): string | null => {
      const input: HTMLInputElement = choiceOptions[index] as HTMLInputElement;
      return input.getAttribute('data-automation-id');
    };

    expect(extraAttributeGetter(0)).toEqual('auto1');
    expect(extraAttributeGetter(1)).toBeNull();
  });

  // By default, we need to assign the role 'application' on the containing div
  // because JAWS doesn't call OnKeyDown without this role
  it('has role="application" by default on the containing element', () => {
    const choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} />);
    const choiceGroupEl: Element = choiceGroup.getDOMNode();
    const role = choiceGroupEl.getAttribute('role');

    expect(role).toEqual('application');
  });

  it('has role attribute that can be omitted', () => {
    const choiceGroup = mount(<ChoiceGroup options={TEST_OPTIONS} role="" />);
    const choiceGroupEl: Element = choiceGroup.getDOMNode();
    const role = choiceGroupEl.getAttribute('role');

    expect(role).toEqual('');
  });

  it('can assign a custom aria label', () => {
    const option4: IChoiceGroupOption[] = [{ key: '4', text: '4', ariaLabel: 'Custom aria label' }];
    const choiceGroup = mount(<ChoiceGroup label="testgroup" options={TEST_OPTIONS.concat(option4)} required={true} />);

    const choiceOptions = choiceGroup.getDOMNode().querySelectorAll(QUERY_SELECTOR);

    expect(choiceOptions.length).toBe(4);

    expect((choiceOptions[0] as HTMLInputElement).getAttribute('aria-label')).toBeNull();
    expect((choiceOptions[1] as HTMLInputElement).getAttribute('aria-label')).toBeNull();
    expect((choiceOptions[2] as HTMLInputElement).getAttribute('aria-label')).toBeNull();
    expect((choiceOptions[3] as HTMLInputElement).getAttribute('aria-label')).toEqual('Custom aria label');
  });
});
