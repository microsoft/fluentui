import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { KeyCodes } from '@fluentui/utilities';
import { FocusZone } from './FocusZone';

describe('FocusZone keydown event handler', () => {
  let originalOnKeyDownCapture: (ev: KeyboardEvent) => void;
  const mockOnKeyDownCapture = jest.fn();

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originalOnKeyDownCapture = (FocusZone as any)._onKeyDownCapture;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (FocusZone as any)._onKeyDownCapture = mockOnKeyDownCapture;
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (FocusZone as any)._onKeyDownCapture = originalOnKeyDownCapture;
  });

  beforeEach(() => {
    mockOnKeyDownCapture.mockReset();
  });

  it('is added on mount/removed on unmount', () => {
    const { getAllByRole, rerender } = render(
      <div>
        <FocusZone>
          <button />
        </FocusZone>
        <button />
      </div>,
    );

    let buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(1);

    rerender(
      <div>
        <button />
      </div>,
    );

    buttons = getAllByRole('button');
    expect(buttons.length).toBe(1);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(1);
  });

  it('is not triggered when the keydown event happens outside of the focus zone', () => {
    const { getAllByRole } = render(
      <div>
        <FocusZone>
          <button />
        </FocusZone>
        <button />
      </div>,
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);

    fireEvent.keyDown(buttons[1], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(0);
  });

  it('is added only once for nested focus zones', () => {
    const { getAllByRole, rerender } = render(
      <div>
        <FocusZone>
          <FocusZone>
            <button />
          </FocusZone>
        </FocusZone>
        <button />
      </div>,
    );

    let buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(1);

    rerender(
      <div>
        <button />
      </div>,
    );

    buttons = getAllByRole('button');
    expect(buttons.length).toBe(1);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(1);
  });

  it('is added once for each outer focus zone and called once for each one', () => {
    const { getAllByRole, rerender } = render(
      <div>
        <FocusZone>
          <FocusZone>
            <button />
          </FocusZone>
        </FocusZone>
        <FocusZone>
          <button />
        </FocusZone>
        <button />
      </div>,
    );

    let buttons = getAllByRole('button');
    expect(buttons.length).toBe(3);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    fireEvent.keyDown(buttons[1], { which: KeyCodes.tab });
    fireEvent.keyDown(buttons[2], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(2);

    rerender(
      <div>
        <FocusZone>
          <button />
        </FocusZone>
        <button />
      </div>,
    );

    buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);

    fireEvent.keyDown(buttons[0], { which: KeyCodes.tab });
    fireEvent.keyDown(buttons[1], { which: KeyCodes.tab });
    expect(mockOnKeyDownCapture).toHaveBeenCalledTimes(3);
  });
});
