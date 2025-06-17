import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Customizations } from './Customizations';
import { CustomizerContext } from './CustomizerContext';
import { useCustomizationSettings } from './useCustomizationSettings';
import type { ISettings } from './Customizations';

const { act } = renderer;

describe('useCustomizatioSettings', () => {
  let component: renderer.ReactTestRenderer | undefined;

  afterEach(() => {
    act(() => {
      component?.unmount();
      component = undefined;
    });
    Customizations.reset();
  });

  it('get settings from Customizations', () => {
    Customizations.applySettings({ a: 'a' });
    const settingsStates: ISettings[] = [];

    const TestComponent: React.FunctionComponent = () => {
      const settings = useCustomizationSettings(['a']);

      settingsStates.push(settings);
      return null;
    };

    act(() => {
      component = renderer.create(<TestComponent />);
    });
    expect(settingsStates.length).toBe(1);
    expect(settingsStates[0]).toEqual({ a: 'a' });
  });

  it('get settings from Customizations when settings have changed', () => {
    Customizations.applySettings({ a: 'a' });
    const settingsStates: ISettings[] = [];

    const TestComponent: React.FunctionComponent = () => {
      const settings = useCustomizationSettings(['a']);

      settingsStates.push(settings);
      return null;
    };

    act(() => {
      component = renderer.create(<TestComponent />);
    });

    act(() => {
      Customizations.applySettings({ a: 'aa' });
    });

    expect(settingsStates.length).toBe(2);
    expect(settingsStates[0]).toEqual({ a: 'a' });
    expect(settingsStates[1]).toEqual({ a: 'aa' });
  });

  it('get settings from Customizations that are not applied', () => {
    const settingsStates: ISettings[] = [];

    const TestComponent: React.FunctionComponent = () => {
      const settings = useCustomizationSettings(['a']);

      settingsStates.push(settings);
      return null;
    };

    act(() => {
      component = renderer.create(<TestComponent />);
    });
    expect(settingsStates.length).toBe(1);
    expect(settingsStates[0]).toEqual({ a: undefined });
  });

  it('get settings from CustomizerContext', () => {
    const settingsStates: ISettings[] = [];

    const TestComponent: React.FunctionComponent = () => {
      const settings = useCustomizationSettings(['theme']);

      settingsStates.push(settings);
      return null;
    };

    const newContext = { customizations: { settings: { theme: { color: 'red' } }, scopedSettings: {} } };
    act(() => {
      component = renderer.create(
        <CustomizerContext.Provider value={newContext}>
          <TestComponent />
        </CustomizerContext.Provider>,
      );
    });
    expect(settingsStates.length).toBe(1);
    expect(settingsStates[0]).toEqual({ theme: { color: 'red' } });

    const updatedContext = { customizations: { settings: { theme: { color: 'green' } }, scopedSettings: {} } };
    act(() => {
      component!.update(
        <CustomizerContext.Provider value={updatedContext}>
          <TestComponent />
        </CustomizerContext.Provider>,
      );
    });

    expect(settingsStates.length).toBe(2);
    expect(settingsStates[1]).toEqual({ theme: { color: 'green' } });
  });

  it('does not re-render if global settings update but within context', () => {
    Customizations.applySettings({ a: 'a' });
    const settingsStates: ISettings[] = [];

    const TestComponent: React.FunctionComponent = () => {
      const settings = useCustomizationSettings(['a']);

      settingsStates.push(settings);
      return null;
    };

    const newContext = { customizations: { settings: { a: 'aa' }, scopedSettings: {}, inCustomizerContext: true } };
    act(() => {
      component = renderer.create(
        <CustomizerContext.Provider value={newContext}>
          <TestComponent />
        </CustomizerContext.Provider>,
      );
    });

    act(() => {
      Customizations.applySettings({ a: 'aaa' });
    });

    expect(settingsStates.length).toBe(1);
    expect(settingsStates[0]).toEqual({ a: 'aa' });
  });
});
