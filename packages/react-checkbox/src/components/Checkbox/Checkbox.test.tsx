import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { CheckboxOnChangeData } from './Checkbox.types';

// TODO: add more tests here, and create visual regression tests in /apps/vr-tests

describe('Checkbox', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: { label: 'Test Label' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const renderedComponent = render(<Checkbox />);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders with a label', () => {
    const renderedComponent = render(<Checkbox label="Unchecked Checkbox" />);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders checked', () => {
    const renderedComponent = render(<Checkbox checked label="Checked Checkbox" />);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders mixed', () => {
    const renderedComponent = render(<Checkbox checked="mixed" label="Mixed Checkbox" />);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('renders a custom indicator', () => {
    const renderedComponent = render(<Checkbox indicator={<span id="indicator" />} label="Custom indicator" />);
    expect(renderedComponent.container).toMatchSnapshot();
  });

  it('respects id prop', () => {
    const renderedComponent = render(<Checkbox id="checkbox" label="Checkbox" />);
    expect(renderedComponent.getByRole('checkbox').id).toEqual('checkbox');
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    const renderedComponent = render(<Checkbox ref={ref} />);
    expect(ref.current).toBe(renderedComponent.getByRole('checkbox'));
  });

  it('defaults to unchecked non-mixed', () => {
    const renderedComponent = render(<Checkbox />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    const renderedComponent = render(<Checkbox defaultChecked />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(true);
    expect(input.indeterminate).toBe(false);
  });

  it('respects defaultChecked="mixed"', () => {
    const renderedComponent = render(<Checkbox defaultChecked="mixed" />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    const renderedComponent = render(<Checkbox defaultChecked />);
    renderedComponent.rerender(<Checkbox defaultChecked={false} />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(true);
    expect(input.indeterminate).toBe(false);
  });

  it('respects checked prop', () => {
    const renderedComponent = render(<Checkbox checked />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(true);
    expect(input.indeterminate).toBe(false);
  });

  it('respects checked="mixed"', () => {
    const renderedComponent = render(<Checkbox checked="mixed" />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(true);
  });

  it('respects checked updates', () => {
    const renderedComponent = render(<Checkbox checked />);
    renderedComponent.rerender(<Checkbox checked={false} />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(false);

    renderedComponent.rerender(<Checkbox checked="mixed" />);

    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(true);
  });

  // Make sure that setting ref on the input slot doesn't break the
  // Checkbox's internal inputRef that's used to set indeterminate
  it('handles checked="mixed" when a ref is set on the input slot', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    const renderedComponent = render(<Checkbox checked="mixed" input={{ ref: inputRef }} />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(inputRef.current).toBe(input);
    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(true);
  });

  it('calls onChange with the correct value', () => {
    const onChange = jest.fn<void, [React.FormEvent<HTMLInputElement>, CheckboxOnChangeData]>();

    const renderedComponent = render(<Checkbox onChange={onChange} />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;

    expect(onChange).toBeCalledTimes(0);

    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);

    expect(onChange).toBeCalledTimes(3);
    expect(onChange.mock.calls[0][1]).toEqual({ checked: true });
    expect(onChange.mock.calls[1][1]).toEqual({ checked: false });
    expect(onChange.mock.calls[2][1]).toEqual({ checked: true });
  });

  it("doesn't remove controlled mixed when no onChange provided", () => {
    const renderedComponent = render(<Checkbox checked="mixed" />);
    const input = renderedComponent.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toEqual(true);

    fireEvent.change(input);

    expect(input.indeterminate).toEqual(true);
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
