import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Radio } from './Radio';

describe('Radio', () => {
  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Radio />);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('renders a label', () => {
    const { getByRole, getByLabelText } = render(<Radio label="Test Label" />);
    expect(getByRole('radio')).toBe(getByLabelText('Test Label'));
  });

  it('forwards ID to input element', () => {
    const { getByRole } = render(<Radio id="test-id" />);
    expect(getByRole('radio').id).toEqual('test-id');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<Radio ref={ref} />);
    expect(getByRole('radio')).toEqual(ref.current);
  });

  it('handles disabled', () => {
    const { getByRole } = render(<Radio disabled />);
    expect((getByRole('radio') as HTMLInputElement).disabled).toBeTruthy();
  });

  it('defaults to unchecked', () => {
    const { getByRole } = render(<Radio />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(false);
  });

  it('respects defaultChecked', () => {
    const { getByRole } = render(<Radio defaultChecked />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    const { rerender, getByRole } = render(<Radio defaultChecked />);
    rerender(<Radio defaultChecked={false} />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('respects checked', () => {
    const { getByRole } = render(<Radio checked />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('respects checked updates', () => {
    const { rerender, getByRole } = render(<Radio checked />);
    rerender(<Radio checked={false} />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(false);
  });
});
