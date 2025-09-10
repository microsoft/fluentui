import { renderHook, cleanup } from '@testing-library/react-hooks';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { useKeytipData } from './useKeytipData';
import type { KeytipDataOptions } from './KeytipData.types';

describe('useKeytipData', () => {
  let registerSpy: jest.SpyInstance;
  let updateSpy: jest.SpyInstance;
  const ktpMgr = KeytipManager.getInstance();

  beforeEach(() => {
    registerSpy = jest.spyOn(ktpMgr, 'register');
    updateSpy = jest.spyOn(ktpMgr, 'update');
  });

  afterEach(() => {
    registerSpy.mockRestore();
    updateSpy.mockRestore();
    cleanup();
  });

  it('returns empty data when no keytipProps are provided', () => {
    const { result } = renderHook(() => useKeytipData({}));

    expect(result.current).toEqual({
      ariaDescribedBy: undefined,
      keytipId: undefined,
    });
    expect(registerSpy).toHaveBeenCalledTimes(0);
    expect(updateSpy).toHaveBeenCalledTimes(0);
  });

  it('registers once and returns data when keytipProps is passed initially', () => {
    const options: KeytipDataOptions = {
      keytipProps: {
        content: '1',
        keySequences: ['a', '1'],
      },
    };
    const { result } = renderHook(() => useKeytipData(options));

    expect(result.current).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-a-1',
      keytipId: 'ktp-a-1',
    });
    expect(registerSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(0);
  });

  it('calls update when keytipProps change', () => {
    const initialProps: KeytipDataOptions = {
      keytipProps: {
        content: '1',
        keySequences: ['a', '1'],
      },
    };
    const { result, rerender } = renderHook((props: KeytipDataOptions) => useKeytipData(props), { initialProps });

    // initial registration
    expect(result.current).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-a-1',
      keytipId: 'ktp-a-1',
    });
    expect(registerSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(0);

    // change the keySequences
    const newProps: KeytipDataOptions = {
      keytipProps: {
        content: '1',
        keySequences: ['b', '1'],
      },
    };
    rerender(newProps);

    expect(result.current).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-b-1',
      keytipId: 'ktp-b-1',
    });
    expect(registerSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });
});
