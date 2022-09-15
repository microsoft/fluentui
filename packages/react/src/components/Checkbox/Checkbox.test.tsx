import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '@fluentui/utilities';
import type { IRefObject } from '@fluentui/utilities';
import type { ICheckbox } from './Checkbox.types';

let checkbox: ICheckbox | undefined;
/** Use this as the componentRef when rendering a Checkbox. */
const checkboxRef: IRefObject<ICheckbox> = (ref: ICheckbox | null) => {
  checkbox = ref!;
};

const IndeterminateControlledCheckbox: React.FunctionComponent = () => {
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, newChecked?: boolean): void => {
    // On first change, clear the indeterminate state and don't modify the checked state
    indeterminate ? setIndeterminate(false) : setChecked(!!newChecked);
  };

  return <Checkbox indeterminate={indeterminate} checked={checked} onChange={onChange} componentRef={checkboxRef} />;
};

describe('Checkbox', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    checkbox = undefined;
  });

  it('renders unchecked correctly', () => {
    const { container } = render(<Checkbox label="Standard checkbox" />);
    expect(container).toMatchSnapshot();
  });

  it('renders checked correctly', () => {
    const { container } = render(<Checkbox label="Standard checkbox" checked />);
    expect(container).toMatchSnapshot();
  });

  it('renders indeterminate correctly', () => {
    const { container } = render(<Checkbox label="Standard checkbox" indeterminate />);
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
  });

  it('respects id prop', () => {
    const { getByRole } = render(
      <Checkbox label="Standard checkbox" ariaDescribedBy="descriptionID" id="my-checkbox" />,
    );
    expect(getByRole('checkbox').id).toEqual('my-checkbox');
  });

  it('defaults to unchecked non-indeterminate', () => {
    const { getByRole } = render(<Checkbox componentRef={checkboxRef} />);

    expect(getByRole('checkbox').getAttribute('checked')).toBeNull();
    expect(checkbox!.checked).toBe(false);
    expect(checkbox!.indeterminate).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    const { getByRole } = render(<Checkbox defaultChecked componentRef={checkboxRef} />);

    expect(getByRole('checkbox').getAttribute('checked')).not.toBeNull();
    expect(checkbox!.checked).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    const firstCheckbox = render(<Checkbox defaultChecked componentRef={checkboxRef} />);
    firstCheckbox.rerender(<Checkbox defaultChecked={false} componentRef={checkboxRef} />);
    expect(firstCheckbox.container.querySelector('.is-checked')).toBeTruthy();
    expect(checkbox!.checked).toBe(true);

    const secondCheckbox = render(<Checkbox componentRef={checkboxRef} />);
    secondCheckbox.rerender(<Checkbox defaultChecked={true} componentRef={checkboxRef} />);
    expect(secondCheckbox.container.querySelector('.is-checked')).toBeFalsy();
    expect(checkbox!.checked).toBe(false);
  });

  it('respects checked prop', () => {
    const { getByRole } = render(<Checkbox checked componentRef={checkboxRef} />);

    expect(getByRole('checkbox').getAttribute('checked')).not.toBeNull();
    expect(checkbox!.checked).toBe(true);
  });

  it('respects checked updates', () => {
    const { container, rerender } = render(<Checkbox checked componentRef={checkboxRef} />);
    rerender(<Checkbox checked={false} componentRef={checkboxRef} />);

    expect(container.querySelector('.is-checked')).toBeFalsy();
    expect(checkbox!.checked).toBe(false);
  });

  it('automatically updates on change when uncontrolled', () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(<Checkbox onChange={onChange} componentRef={checkboxRef} />);

    userEvent.click(getByRole('checkbox'));

    expect(container.querySelector('.is-checked')).toBeTruthy();
    expect(checkbox!.checked).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not automatically update on change when controlled', () => {
    const onChange = jest.fn();
    const { container, getByRole, rerender } = render(
      <Checkbox checked={false} onChange={onChange} componentRef={checkboxRef} />,
    );

    userEvent.click(getByRole('checkbox'));

    // doesn't update automatically (but calls onChange)
    expect(container.querySelector('.is-checked')).toBeFalsy();
    expect(checkbox!.checked).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);

    // updates when props update
    rerender(<Checkbox checked={true} onChange={onChange} componentRef={checkboxRef} />);
    expect(container.querySelector('.is-checked')).toBeTruthy();
    expect(checkbox!.checked).toBe(true);
    // doesn't call onChange for props update
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('respects defaultIndeterminate prop', () => {
    render(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);

    expect(checkbox!.indeterminate).toEqual(true);
  });

  it('respects defaultIndeterminate prop when defaultChecked is true', () => {
    render(<Checkbox defaultIndeterminate defaultChecked componentRef={checkboxRef} />);

    expect(checkbox!.indeterminate).toEqual(true);
  });

  it('ignores defaultIndeterminate updates', () => {
    const firstCheckbox = render(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);
    firstCheckbox.rerender(<Checkbox defaultIndeterminate={false} componentRef={checkboxRef} />);
    expect(checkbox!.indeterminate).toEqual(true);

    const secondCheckbox = render(<Checkbox componentRef={checkboxRef} />);
    secondCheckbox.rerender(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);
    expect(checkbox!.checked).toBe(false);
    expect(checkbox!.indeterminate).toEqual(false);
  });

  it('removes uncontrolled indeterminate state', () => {
    const { container, getByRole } = render(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);

    expect(container.querySelector('.is-checked')).toBeFalsy();
    expect(checkbox!.indeterminate).toEqual(true);

    userEvent.click(getByRole('checkbox'));

    expect(container.querySelector('.is-checked')).toBeFalsy();
    expect(checkbox!.indeterminate).toEqual(false);
  });

  it('renders with indeterminate when controlled', () => {
    const { getByRole } = render(<IndeterminateControlledCheckbox />);

    expect(checkbox!.indeterminate).toEqual(true);

    userEvent.click(getByRole('checkbox'));

    expect(checkbox!.indeterminate).toEqual(false);
  });

  it('removes controlled indeterminate', () => {
    const { getByRole } = render(<IndeterminateControlledCheckbox />);

    expect(checkbox!.indeterminate).toEqual(true);
    expect(checkbox!.checked).toEqual(false);

    userEvent.click(getByRole('checkbox'));

    expect(checkbox!.indeterminate).toEqual(false);
    expect(checkbox!.checked).toEqual(false);
  });

  it("doesn't remove controlled indeterminate when no onChange provided", () => {
    const { getByRole } = render(<Checkbox indeterminate={true} checked={false} componentRef={checkboxRef} />);

    expect(checkbox!.indeterminate).toEqual(true);

    userEvent.click(getByRole('checkbox'));

    expect(checkbox!.indeterminate).toEqual(true);
  });

  it('set indeterminate value to native checkbox', () => {
    const checkboxComponent = render(
      <Checkbox title="indeterminate-title" indeterminate={true} checked={false} componentRef={checkboxRef} />,
    );
    const { getAllByTitle } = checkboxComponent;
    const [, checkboxInput] = getAllByTitle('indeterminate-title') as HTMLInputElement[];

    expect(checkbox!.indeterminate).toEqual(true);
    expect(checkboxInput.indeterminate).toEqual(true);

    checkboxComponent.rerender(
      <Checkbox title="indeterminate-title" indeterminate={false} checked={false} componentRef={checkboxRef} />,
    );

    expect(checkbox!.indeterminate).toEqual(false);
    expect(checkboxInput.indeterminate).toEqual(false);

    checkboxComponent.rerender(<Checkbox title="indeterminate-title" checked={true} componentRef={checkboxRef} />);

    expect(checkbox!.indeterminate).toEqual(false);
    expect(checkboxInput.indeterminate).toEqual(false);

    checkboxComponent.rerender(
      <Checkbox title="indeterminate-title" indeterminate={true} checked={false} componentRef={checkboxRef} />,
    );

    expect(checkbox!.indeterminate).toEqual(true);
    expect(checkboxInput.indeterminate).toEqual(true);
  });
});
