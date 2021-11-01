import * as React from 'react';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

// TODO: add more tests here, and create visual regression tests in /apps/vr-tests

describe('Checkbox', () => {
  let renderedComponent: RenderResult | undefined;
  let checkboxRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  beforeEach(() => {
    resetIdsForTests();
  });

  afterEach(() => {
    checkboxRef = React.createRef<HTMLInputElement>();
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
  });

  function getInput(): HTMLInputElement {
    return screen.getByRole('checkbox') as HTMLInputElement;
  }

  it('renders a default state', () => {
    renderedComponent = render(<Checkbox>Default Checkbox</Checkbox>);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders unchecked correctly', () => {
    renderedComponent = render(<Checkbox input={{ ref: checkboxRef }}>Default Checkbox</Checkbox>);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders checked correctly', () => {
    renderedComponent = render(<Checkbox checked>Default Checkbox</Checkbox>);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders mixed correctly', () => {
    renderedComponent = render(<Checkbox checked="mixed">Default Checkbox</Checkbox>);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('respects id prop', () => {
    renderedComponent = render(
      <Checkbox aria-describedby="descriptionID" id="checkbox">
        Default Checkbox
      </Checkbox>,
    );
    expect(renderedComponent.getByRole('checkbox').id).toEqual('checkbox');
  });

  it('defaults to unchecked non-mixed', () => {
    render(<Checkbox input={{ ref: checkboxRef }}>Default Checkbox</Checkbox>);

    const input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    renderedComponent = render(<Checkbox defaultChecked input={{ ref: checkboxRef }} />);

    let input = getInput();
    expect(input.checked).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    renderedComponent.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    renderedComponent = render(<Checkbox defaultChecked="mixed" input={{ ref: checkboxRef }} />);

    input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('ignores defaulChecked updates', () => {
    renderedComponent = render(<Checkbox defaultChecked input={{ ref: checkboxRef }} />);
    renderedComponent.rerender(<Checkbox defaultChecked={false} input={{ ref: checkboxRef }} />);

    let input = getInput();
    expect(input.checked).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    renderedComponent.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    renderedComponent = render(<Checkbox input={{ ref: checkboxRef }} />);
    renderedComponent.rerender(<Checkbox defaultChecked input={{ ref: checkboxRef }} />);

    input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects checked prop', () => {
    renderedComponent = render(<Checkbox checked input={{ ref: checkboxRef }} />);

    let input = getInput();
    expect(input.checked).toBe(true);
    expect(checkboxRef.current?.checked).toBe(true);

    renderedComponent.unmount();
    checkboxRef = React.createRef<HTMLInputElement>();
    renderedComponent = render(<Checkbox checked="mixed" input={{ ref: checkboxRef }} />);

    input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('respects checked updates', () => {
    renderedComponent = render(<Checkbox checked input={{ ref: checkboxRef }} />);
    renderedComponent.rerender(<Checkbox checked={false} input={{ ref: checkboxRef }} />);

    let input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);

    renderedComponent.rerender(<Checkbox checked="mixed" input={{ ref: checkboxRef }} />);
    input = getInput();
    expect(input.checked).toBe(false);
    expect(checkboxRef.current?.checked).toBe(false);
  });

  it('calls onChange with the correct value', () => {
    const eventHandler = jest.fn();

    render(<Checkbox checked onChange={eventHandler} />);
    const input = getInput();

    expect(eventHandler).toBeCalledTimes(0);

    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);

    expect(eventHandler).toBeCalledTimes(3);
    expect(eventHandler.mock.calls[2][1]).toEqual({ checked: false });
  });

  it("doesn't remove controlled mixed when no onChange provided", () => {
    render(<Checkbox checked="mixed" input={{ ref: checkboxRef }} />);
    let input = getInput();
    expect(checkboxRef.current?.indeterminate).toEqual(true);

    fireEvent.change(input);

    input = getInput();
    expect(checkboxRef.current?.indeterminate).toEqual(true);
  });

  it('correctly sets indeterminate state through javascript', () => {
    render(<Checkbox defaultChecked="mixed" input={{ ref: checkboxRef }} />);
    const input = getInput();
    expect(input.checked).toBe(false);
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
