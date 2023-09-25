import * as React from 'react';
import { mount } from 'enzyme';
import { useKeytipData } from './useKeytipData';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import type { KeytipDataOptions } from './KeytipData.types';

describe('usePrevious', () => {
  let keytipManagerRegisterSpy: jest.SpyInstance;
  let keytipManagerUpdateSpy: jest.SpyInstance;
  beforeEach(() => {
    keytipManagerRegisterSpy = jest.spyOn(KeytipManager.getInstance(), 'register');
    keytipManagerUpdateSpy = jest.spyOn(KeytipManager.getInstance(), 'update');
  });

  afterEach(() => {
    keytipManagerRegisterSpy.mockRestore();
    keytipManagerUpdateSpy.mockRestore();
  });

  it('no keytipProps', () => {
    let keytipData;
    const TestComponent: React.FunctionComponent = () => {
      keytipData = useKeytipData({});
      return null;
    };

    mount(<TestComponent />);
    expect(keytipData).toEqual({
      ariaDescribedBy: undefined,
      keytipId: undefined,
    });

    expect(keytipManagerRegisterSpy).toBeCalledTimes(0);
    expect(keytipManagerUpdateSpy).toBeCalledTimes(0);
  });

  it('return data when keytipProps is passed', () => {
    let keytipData;
    const TestComponent: React.FunctionComponent = () => {
      keytipData = useKeytipData({
        keytipProps: {
          content: '1',
          keySequences: ['a', '1'],
        },
      });
      return null;
    };

    mount(<TestComponent />);
    expect(keytipData).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-a-1',
      keytipId: 'ktp-a-1',
    });

    expect(keytipManagerRegisterSpy).toBeCalledTimes(1);
    expect(keytipManagerUpdateSpy).toBeCalledTimes(0);
  });

  it('update when keytipProps has changed', () => {
    let keytipData;
    const TestComponent: React.FunctionComponent<KeytipDataOptions> = props => {
      keytipData = useKeytipData(props);
      return null;
    };

    const initialProps = {
      keytipProps: {
        content: '1',
        keySequences: ['a', '1'],
      },
    };
    const wrapper = mount(<TestComponent {...initialProps} />);

    expect(keytipData).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-a-1',
      keytipId: 'ktp-a-1',
    });

    expect(keytipManagerRegisterSpy).toBeCalledTimes(1);
    expect(keytipManagerUpdateSpy).toBeCalledTimes(0);

    wrapper.setProps({
      keytipProps: {
        content: '1',
        keySequences: ['b', '1'],
      },
    });
    wrapper.update();

    expect(keytipData).toEqual({
      ariaDescribedBy: 'ktp-layer-id ktp-b-1',
      keytipId: 'ktp-b-1',
    });

    expect(keytipManagerRegisterSpy).toBeCalledTimes(1);
    expect(keytipManagerUpdateSpy).toBeCalledTimes(1);
  });
});
