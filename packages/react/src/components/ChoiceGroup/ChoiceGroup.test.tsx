import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChoiceGroup } from './ChoiceGroup';
import { merge, resetIds } from '../../Utilities';
import { isConformant } from '../../common/isConformant';
import type { IChoiceGroupOption, IChoiceGroup } from './ChoiceGroup.types';

const TEST_OPTIONS: IChoiceGroupOption[] = [
  { key: '1', text: '1', 'data-automation-id': 'auto1', autoFocus: true } as IChoiceGroupOption,
  { key: '2', text: '2' },
  { key: '3', text: '3' },
];

describe('ChoiceGroup', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  it('renders ChoiceGroup correctly', () => {
    const { container } = render(<ChoiceGroup className="testClassName" options={TEST_OPTIONS} required />);
    expect(container).toMatchSnapshot();
  });

  it('renders ChoiceGroup with label correctly', () => {
    const { container } = render(
      <ChoiceGroup className="testClassName" label="test label" options={TEST_OPTIONS} required />,
    );
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: ChoiceGroup,
    displayName: 'ChoiceGroup',
  });

  it('does not use className prop from parent on label', () => {
    const { getByRole } = render(
      <ChoiceGroup className="testClassName" label="test label" options={TEST_OPTIONS} required />,
    );
    const label = getByRole('radiogroup').firstElementChild;
    expect(label).toBeTruthy();
    expect(label!.textContent).toBe('test label');
    expect(label!.className).not.toContain('testClassName');
  });

  it('can change options', () => {
    const { getAllByRole } = render(<ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions.length).toBe(3);

    expect(choiceOptions[0].checked).toEqual(false);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);

    userEvent.click(choiceOptions[0]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);

    userEvent.click(choiceOptions[1]);

    expect(choiceOptions[0].checked).toEqual(false);
    expect(choiceOptions[1].checked).toEqual(true);
    expect(choiceOptions[2].checked).toEqual(false);

    userEvent.click(choiceOptions[0]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);
    expect(choiceOptions[2].checked).toEqual(false);
  });

  it('An individual choice option can be disabled', () => {
    const options: IChoiceGroupOption[] = merge([], TEST_OPTIONS);
    options[0].disabled = true;

    const { getAllByRole } = render(<ChoiceGroup label="testgroup" options={options} required={true} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions[0].disabled).toEqual(true);
    expect(choiceOptions[1].disabled).toEqual(false);
    expect(choiceOptions[2].disabled).toEqual(false);
  });

  it('renders all choice options as disabled when disabled', () => {
    const { getAllByRole } = render(
      <ChoiceGroup label="testgroup" options={TEST_OPTIONS} required={true} disabled={true} />,
    );

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions[0].disabled).toEqual(true);
    expect(choiceOptions[1].disabled).toEqual(true);
    expect(choiceOptions[2].disabled).toEqual(true);
  });

  /* Testing that the defaultSelectedKey is working correctly. */
  it('can act as an uncontrolled component', () => {
    const { getAllByRole } = render(<ChoiceGroup defaultSelectedKey="1" options={TEST_OPTIONS} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions[0].checked).toEqual(true);

    userEvent.click(choiceOptions[1]);

    expect(choiceOptions[1].checked).toEqual(true);
  });

  it('can render as a controlled component', () => {
    let _selectedItem;
    const onChange = (
      ev: React.FormEvent<HTMLElement | HTMLInputElement>,
      item: IChoiceGroupOption | undefined,
    ): void => {
      _selectedItem = item;
    };

    const { getAllByRole } = render(<ChoiceGroup selectedKey="1" options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions[0].checked).toEqual(true);

    userEvent.click(choiceOptions[1]);

    expect(choiceOptions[0].checked).toEqual(true);
    expect(choiceOptions[1].checked).toEqual(false);

    expect(_selectedItem).toEqual(TEST_OPTIONS[1]);
  });

  it('uses extra <input> attributes in dom if specified', () => {
    const onChange = (
      ev: React.FormEvent<HTMLElement | HTMLInputElement>,
      item: IChoiceGroupOption | undefined,
    ): void => undefined;

    const { getAllByRole } = render(<ChoiceGroup options={TEST_OPTIONS} onChange={onChange} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    const extraAttributeGetter: (index: number) => string | null = (index: number): string | null => {
      const input: HTMLInputElement = choiceOptions[index];
      return input.getAttribute('data-automation-id');
    };

    expect(extraAttributeGetter(0)).toEqual('auto1');
    expect(extraAttributeGetter(1)).toBeNull();
  });

  it('can set role attribute to empty string', () => {
    const { container } = render(<ChoiceGroup options={TEST_OPTIONS} role="" />);
    const role = container.firstElementChild!.getAttribute('role');
    expect(role).toEqual('');
  });

  it('can set role attribute on the containing element', () => {
    const { container } = render(<ChoiceGroup options={TEST_OPTIONS} role="radiogroup" />);
    const role = container.firstElementChild!.getAttribute('role');
    expect(role).toEqual('radiogroup');
  });

  it('can assign a custom aria label', () => {
    const option4: IChoiceGroupOption[] = [{ key: '4', text: '4', ariaLabel: 'Custom aria label' }];
    const { getAllByRole } = render(
      <ChoiceGroup label="testgroup" options={TEST_OPTIONS.concat(option4)} required={true} />,
    );

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceOptions.length).toBe(4);

    expect(choiceOptions[0].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[1].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[2].getAttribute('aria-label')).toBeNull();
    expect(choiceOptions[3].getAttribute('aria-label')).toEqual('Custom aria label');
  });

  it('returns the current checked option with user interaction', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    const { getAllByRole } = render(<ChoiceGroup options={TEST_OPTIONS} componentRef={choiceGroupRef} />);

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceGroupRef.current!.checkedOption).toBeUndefined();
    userEvent.click(choiceOptions[0]);
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
  });

  it('returns the current checked option with defaultSelectedKey', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    const { getAllByRole } = render(
      <ChoiceGroup options={TEST_OPTIONS} defaultSelectedKey="1" componentRef={choiceGroupRef} />,
    );

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
    userEvent.click(choiceOptions[1]);
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[1]);
  });

  it('returns the current checked option with selectedKey', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    const { getAllByRole } = render(
      <ChoiceGroup options={TEST_OPTIONS} selectedKey="1" componentRef={choiceGroupRef} />,
    );

    const choiceOptions = getAllByRole('radio') as HTMLInputElement[];

    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
    userEvent.click(choiceOptions[1]);
    // selectedKey is still used even though it didn't get updated for latest user click
    expect(choiceGroupRef.current!.checkedOption).toEqual(TEST_OPTIONS[0]);
  });

  it('can render element id', () => {
    const { container } = render(<ChoiceGroup defaultSelectedKey="1" id="foo" options={TEST_OPTIONS} />);
    const root = container.firstElementChild;
    expect(root!.getAttribute('id')).toBe('foo');
  });

  it('can focus the checked option', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    const { getAllByRole } = render(
      <ChoiceGroup options={TEST_OPTIONS} defaultSelectedKey="1" componentRef={choiceGroupRef} />,
    );

    const option = getAllByRole('radio')[0] as HTMLInputElement;
    const focusSpy = jest.spyOn(option, 'focus');

    choiceGroupRef.current!.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('can focus the first enabled option', () => {
    const choiceGroupRef = React.createRef<IChoiceGroup>();
    const { getAllByRole } = render(
      <ChoiceGroup
        options={[{ key: '0', text: 'disabled', disabled: true }, ...TEST_OPTIONS]}
        componentRef={choiceGroupRef}
      />,
    );

    const option = getAllByRole('radio')[1] as HTMLInputElement;
    const focusSpy = jest.spyOn(option, 'focus');

    choiceGroupRef.current!.focus();
    expect(focusSpy).toHaveBeenCalled();
  });
});
