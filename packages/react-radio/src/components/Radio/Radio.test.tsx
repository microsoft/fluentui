import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Radio } from './Radio';

describe('Radio', () => {
  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeTruthy();
  });

  it('renders a label', () => {
    render(<Radio label="Test Label" />);
    expect(screen.getByRole('radio')).toBe(screen.getByLabelText('Test Label'));
  });

  it('forwards ID to input element', () => {
    render(<Radio id="test-id" />);
    expect(screen.getByRole('radio').id).toEqual('test-id');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} />);
    expect(screen.getByRole('radio')).toEqual(ref.current);
  });

  it('handles disabled', () => {
    render(<Radio disabled />);
    expect(screen.getByRole<HTMLInputElement>('radio').disabled).toBeTruthy();
  });

  it('defaults to unchecked', () => {
    render(<Radio />);
    expect(screen.getByRole<HTMLInputElement>('radio').checked).toBe(false);
  });

  it('respects defaultChecked', () => {
    render(<Radio defaultChecked />);
    expect(screen.getByRole<HTMLInputElement>('radio').checked).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    const { rerender } = render(<Radio defaultChecked />);
    rerender(<Radio defaultChecked={false} />);
    expect(screen.getByRole<HTMLInputElement>('radio').checked).toBe(true);
  });

  it('respects checked', () => {
    render(<Radio checked />);
    expect(screen.getByRole<HTMLInputElement>('radio').checked).toBe(true);
  });

  it('respects checked updates', () => {
    const { rerender } = render(<Radio checked />);
    rerender(<Radio checked={false} />);
    expect(screen.getByRole<HTMLInputElement>('radio').checked).toBe(false);
  });
});
