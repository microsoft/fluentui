import { renderHook } from '@testing-library/react-hooks';
import { useToastAnnounce } from './useToastAnnounce';

describe('useToastAnnounce', () => {
  const toaster = document.createElement('div');
  const button = document.createElement('button');
  const outside = document.createElement('button');
  toaster.append(button);
  document.body.append(outside);
  document.body.append(toaster);

  it('should not announce when focus is in the toaster', () => {
    const announce = jest.fn();
    const { result } = renderHook(() => useToastAnnounce(announce));
    result.current.toasterRef(toaster);
    button.focus();

    result.current.announceToast('foo', { politeness: 'assertive' });
    expect(announce).toHaveBeenCalledTimes(0);
  });

  it('should announce when focus is not in the toaster', () => {
    const announce = jest.fn();
    const { result } = renderHook(() => useToastAnnounce(announce));
    result.current.toasterRef(toaster);
    outside.focus();

    result.current.announceToast('foo', { politeness: 'assertive' });
    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('foo', { politeness: 'assertive' });
  });

  it('should announce when focus leaves the toaster', () => {
    const announce = jest.fn();
    const { result } = renderHook(() => useToastAnnounce(announce));
    result.current.toasterRef(toaster);
    button.focus();
    outside.focus();

    result.current.announceToast('foo', { politeness: 'assertive' });
    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('foo', { politeness: 'assertive' });
  });
});
