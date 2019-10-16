import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { Checkbox } from './Checkbox';
import { IRefObject } from 'office-ui-fabric-react/lib/Utilities';
import { ICheckbox } from './Checkbox.types';

let checkbox: ICheckbox | undefined;
/** Use this as the componentRef when rendering a Checkbox. */
const checkboxRef: IRefObject<ICheckbox> = (ref: ICheckbox | null) => {
  checkbox = ref!;
};

const IndeterminateControlledCheckbox: React.FunctionComponent = () => {
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const onChange = (ev: React.FormEvent<HTMLElement>, newChecked: boolean): void => {
    // On first change, clear the indeterminate state and don't modify the checked state
    indeterminate ? setIndeterminate(false) : setChecked(!!newChecked);
  };

  return <Checkbox indeterminate={indeterminate} checked={checked} onChange={onChange} componentRef={checkboxRef} />;
};

describe('Checkbox', () => {
  let renderedComponent: renderer.ReactTestRenderer | undefined;
  let component: ReactWrapper | undefined;

  afterEach(() => {
    checkbox = undefined;
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders unchecked correctly', () => {
    renderedComponent = renderer.create(<Checkbox label="Standard checkbox" />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders checked correctly', () => {
    renderedComponent = renderer.create(<Checkbox label="Standard checkbox" checked />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders indeterminate correctly', () => {
    renderedComponent = renderer.create(<Checkbox label="Standard checkbox" indeterminate />);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('respects id prop', () => {
    component = mount(<Checkbox label="Standard checkbox" ariaDescribedBy="descriptionID" id="my-checkbox" />);
    expect(component.find('input').prop('id')).toEqual('my-checkbox');
  });

  it('defaults to unchecked non-indeterminate', () => {
    component = mount(<Checkbox componentRef={checkboxRef} />);

    const input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    // Mainly testing aria-checked because later in the indeterminate cases, it's the only way to
    // tell from a rendered prop that the checkbox is indeterminate
    expect(input.prop('aria-checked')).toBe('false');
    expect(checkbox!.checked).toBe(false);
    expect(checkbox!.indeterminate).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    component = mount(<Checkbox defaultChecked componentRef={checkboxRef} />);

    const input = component.find('input');
    expect(input.prop('checked')).toBe(true);
    expect(input.prop('aria-checked')).toBe('true');
    expect(checkbox!.checked).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    component = mount(<Checkbox defaultChecked componentRef={checkboxRef} />);
    component.setProps({ defaultChecked: false });
    expect(component.find('input').prop('checked')).toBe(true);
    expect(checkbox!.checked).toBe(true);
    component.unmount();

    component = mount(<Checkbox componentRef={checkboxRef} />);
    component.setProps({ defaultChecked: true });
    expect(component.find('input').prop('checked')).toBe(false);
    expect(checkbox!.checked).toBe(false);
  });

  it('respects checked prop', () => {
    component = mount(<Checkbox checked componentRef={checkboxRef} />);

    const input = component.find('input');
    expect(input.prop('checked')).toBe(true);
    expect(input.prop('aria-checked')).toBe('true');
    expect(checkbox!.checked).toBe(true);
  });

  it('respects checked updates', () => {
    component = mount(<Checkbox checked componentRef={checkboxRef} />);

    component.setProps({ checked: false });
    expect(component.find('input').prop('checked')).toBe(false);
    expect(checkbox!.checked).toBe(false);
  });

  it('automatically updates on change when uncontrolled', () => {
    const onChange = jest.fn();
    component = mount(<Checkbox onChange={onChange} componentRef={checkboxRef} />);

    component.find('input').simulate('change');

    expect(component.find('input').prop('checked')).toBe(true);
    expect(checkbox!.checked).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not automatically update on change when controlled', () => {
    const onChange = jest.fn();
    component = mount(<Checkbox checked={false} onChange={onChange} componentRef={checkboxRef} />);

    component.find('input').simulate('change');

    // doesn't update automatically (but calls onChange)
    expect(component.find('input').prop('checked')).toBe(false);
    expect(checkbox!.checked).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);

    // updates when props update
    component.setProps({ checked: true });
    expect(component.find('input').prop('checked')).toBe(true);
    expect(checkbox!.checked).toBe(true);
    // doesn't call onChange for props update
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('respects defaultIndeterminate prop', () => {
    component = mount(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);

    expect(component.find('input').prop('aria-checked')).toBe('mixed');
    expect(checkbox!.indeterminate).toEqual(true);
  });

  it('respects defaultIndeterminate prop when defaultChecked is true', () => {
    component = mount(<Checkbox defaultIndeterminate defaultChecked componentRef={checkboxRef} />);

    expect(component.find('input').prop('aria-checked')).toBe('mixed');
    expect(checkbox!.indeterminate).toEqual(true);
  });

  it('ignores defaultIndeterminate updates', () => {
    component = mount(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);
    component.setProps({ defaultIndeterminate: false });
    expect(component.find('input').prop('aria-checked')).toBe('mixed');
    expect(checkbox!.indeterminate).toEqual(true);
    component.unmount();

    component = mount(<Checkbox componentRef={checkboxRef} />);
    component.setProps({ defaultIndeterminate: true });
    expect(component.find('input').prop('aria-checked')).toBe('false');
    expect(checkbox!.indeterminate).toEqual(false);
  });

  it('removes uncontrolled indeterminate state', () => {
    component = mount(<Checkbox defaultIndeterminate componentRef={checkboxRef} />);

    let input = component.find('input');
    expect(input.prop('aria-checked')).toBe('mixed');
    expect(input.prop('checked')).toBe(false);
    expect(checkbox!.indeterminate).toEqual(true);

    input.simulate('change');

    // get an updated ReactWrapper for the input (otherwise it would be out of sync)
    input = component.find('input');
    expect(input.prop('aria-checked')).toBe('false');
    expect(input.prop('checked')).toBe(false);
    expect(checkbox!.indeterminate).toEqual(false);
  });

  it('renders with indeterminate when controlled', () => {
    component = mount(<IndeterminateControlledCheckbox />);

    let input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(true);
    expect(input.prop('aria-checked')).toBe('mixed');

    input.simulate('change', { target: { checked: true } });

    input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(false);
    expect(input.prop('aria-checked')).toBe('false');
  });

  it('removes controlled indeterminate', () => {
    component = mount(<IndeterminateControlledCheckbox />);

    let input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(true);
    expect(checkbox!.checked).toEqual(false);
    expect(input.prop('aria-checked')).toBe('mixed');

    input.simulate('change');

    input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(false);
    expect(checkbox!.checked).toEqual(false);
    expect(input.prop('aria-checked')).toBe('false');
  });

  it("doesn't remove controlled indeterminate when no onChange provided", () => {
    component = mount(<Checkbox indeterminate={true} checked={false} componentRef={checkboxRef} />);

    let input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(true);
    expect(input.prop('aria-checked')).toBe('mixed');

    input.simulate('change');

    input = component.find('input');
    expect(checkbox!.indeterminate).toEqual(true);
    expect(input.prop('aria-checked')).toBe('mixed');
  });
});
