import * as React from 'react';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { mount, ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

// TODO: add more tests here, and create visual regression tests in /apps/vr-tests

describe('Checkbox', () => {
  let component: ReactWrapper | undefined;
  let renderedComponent: RenderResult | undefined;
  let checkboxRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  beforeEach(() => {
    resetIdsForTests();
  });

  afterEach(() => {
    checkboxRef = React.createRef<HTMLInputElement>();
    if (component) {
      component.unmount();
      component = undefined;
    }
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
  });

  it('renders a default state', () => {
    renderedComponent = render(<Checkbox>Default Checkbox</Checkbox>);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders unchecked correctly', () => {
    renderedComponent = render(<Checkbox input={{ ref: checkboxRef }}>Default Checkbox</Checkbox>);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('renders checked correctly', () => {
    renderedComponent = render(<Checkbox checked>Default Checkbox</Checkbox>);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('renders mixed correctly', () => {
    renderedComponent = render(<Checkbox checked="mixed">Default Checkbox</Checkbox>);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('respects id prop', () => {
    component = mount(
      <Checkbox aria-describedby="descriptionID" id="checkbox">
        Default Checkbox
      </Checkbox>,
    );
    expect(component.find('input').prop('id')).toEqual('checkbox');
  });

  it('defaults to unchecked non-mixed', () => {
    component = mount(<Checkbox input={{ ref: checkboxRef }}>Default Checkbox</Checkbox>);

    const input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    component = mount(<Checkbox defaultChecked input={{ ref: checkboxRef }} />);

    let input = component.find('input');
    expect(input.prop('checked')).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    component.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    component = mount(<Checkbox defaultChecked="mixed" input={{ ref: checkboxRef }} />);

    input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('ignores defaulChecked updates', () => {
    component = mount(<Checkbox defaultChecked input={{ ref: checkboxRef }} />);
    component.setProps({ defaultChecked: false });
    expect(component.find('input').prop('checked')).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    component.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    component = mount(<Checkbox input={{ ref: checkboxRef }} />);
    component.setProps({ defaultChecked: true });
    expect(component.find('input').prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects checked prop', () => {
    component = mount(<Checkbox checked input={{ ref: checkboxRef }} />);

    let input = component.find('input');
    expect(input.prop('checked')).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    component.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    component = mount(<Checkbox checked="mixed" input={{ ref: checkboxRef }} />);

    input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects checked updates', () => {
    component = mount(<Checkbox checked input={{ ref: checkboxRef }} />);
    component.setProps({ checked: false });

    let input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);

    component.setProps({ checked: 'mixed' });
    input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('calls onChange with the correct value', () => {
    const eventHandler = jest.fn();

    render(<Checkbox checked onChange={eventHandler} />);
    const input = screen.getByRole('checkbox');

    expect(eventHandler).toBeCalledTimes(0);

    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);

    expect(eventHandler).toBeCalledTimes(3);
    expect(eventHandler.mock.calls[2][1]).toEqual({ checked: false });
  });

  it("doesn't remove controlled mixed when no onChange provided", () => {
    component = mount(<Checkbox checked="mixed" input={{ ref: checkboxRef }} />);
    let input = component.find('input');
    expect(checkboxRef.current?.indeterminate).toEqual(true);

    input.simulate('change');

    input = component.find('input');
    expect(checkboxRef.current?.indeterminate).toEqual(true);
  });

  it('correctly sets indeterminate state through javascript', () => {
    component = mount(<Checkbox defaultChecked="mixed" input={{ ref: checkboxRef }} />);
    const input = component.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(checkboxRef.current?.indeterminate).toEqual(true);
  });

  describe('Accessibility Tests', () => {
    it('renders the input slot (as input)', () => {
      const { container } = render(<Checkbox input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.tagName).toEqual('INPUT');
    });

    it('provides the input slot with a type of (checkbox)', () => {
      const { container } = render(<Checkbox input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.getAttribute('type')).toEqual('checkbox');
    });
  });
});
