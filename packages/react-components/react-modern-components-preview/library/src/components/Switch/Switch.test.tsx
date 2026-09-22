import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Switch, switchClassNames } from './';

describe('Switch', () => {
  it('renders visual defaults and stable class names', () => {
    const { getByRole, getByText } = render(<Switch label="Notifications" />);
    const input = getByRole('switch');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-label-position', 'after');
    expect(root).toHaveClass(switchClassNames.root);
    expect(input).toHaveClass(switchClassNames.input);
    expect(root?.querySelector(`.${switchClassNames.indicator}`)).toBeInTheDocument();
    expect(getByText('Notifications')).toHaveClass(switchClassNames.label);
  });

  it('maps size, label position, and disabled focusable state', () => {
    const { getByRole } = render(
      <Switch className="consumer-class" disabledFocusable label="Notifications" labelPosition="above" size="small" />,
    );
    const input = getByRole('switch');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-size', 'small');
    expect(root).toHaveAttribute('data-label-position', 'above');
    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('data-disabled-focusable');
    expect(root).toHaveClass('consumer-class');
    expect(input).toHaveAttribute('aria-disabled', 'true');
    expect(input).not.toBeDisabled();
  });

  it('composes headless checked behavior', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Switch defaultChecked onChange={onChange} />);
    const input = getByRole('switch');

    expect(input).toBeChecked();
    fireEvent.click(input);
    expect(input).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { checked: false });
  });

  it('preserves custom indicator content', () => {
    const { getByTestId } = render(<Switch indicator={{ children: <span data-testid="custom-thumb" /> }} />);

    expect(getByTestId('custom-thumb')).toBeInTheDocument();
  });
});
