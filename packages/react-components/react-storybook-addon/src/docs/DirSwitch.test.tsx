import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { addons } from 'storybook/preview-api';
import { Channel } from 'storybook/internal/channels';
import { DirSwitch } from './DirSwitch';
import { DIR_ID } from '../constants';

jest.mock('storybook/preview-api', () => ({
  addons: { getChannel: jest.fn() },
}));

describe('DirSwitch', () => {
  const channel = new Channel({});
  const emit = jest.spyOn(channel, 'emit');

  beforeEach(() => {
    jest.mocked(addons.getChannel).mockReturnValue(channel);
    emit.mockClear();
  });

  it.each([undefined, 'ltr', 'rtl'] as const)('has a stable name and associated labels with dir=%s', dir => {
    render(<DirSwitch dir={dir} />);

    const input = screen.getByRole('switch', { name: 'Right-to-left layout (LTR / RTL)' }) as HTMLInputElement;
    expect(input.checked).toBe(dir === 'rtl');
    expect(Array.from(input.labels ?? []).map(label => label.textContent)).toEqual(['LTR', 'RTL']);
  });

  it('toggles direction through both associated labels without losing its name', () => {
    render(<DirSwitch dir="ltr" />);
    const input = screen.getByRole('switch', { name: 'Right-to-left layout (LTR / RTL)' }) as HTMLInputElement;

    fireEvent.click(screen.getByText('RTL'));
    expect(input.checked).toBe(true);
    expect(emit).toHaveBeenLastCalledWith('updateGlobals', { globals: { [DIR_ID]: 'rtl' } });
    expect(screen.getByRole('switch', { name: 'Right-to-left layout (LTR / RTL)' })).toBe(input);

    fireEvent.click(screen.getByText('LTR'));
    expect(input.checked).toBe(false);
    expect(emit).toHaveBeenLastCalledWith('updateGlobals', { globals: { [DIR_ID]: 'ltr' } });
    expect(screen.getByRole('switch', { name: 'Right-to-left layout (LTR / RTL)' })).toBe(input);
  });
});
