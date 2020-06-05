import * as React from 'react';
import { mount } from 'enzyme';
import { FeaturesProvider, setInitialFeatures, useFeatures, getInitialFeatures } from './index';

type TestFeatures = {
  test1?: boolean;
  test2?: boolean;
};

describe('setInitialFeatures', () => {
  // Test component which uses the hook.
  const Foo = () => {
    const features = useFeaturesWrapper();

    return <div>{String(features.test1)}</div>;
  };

  // Create wrappers to cast using test features interface.
  const getInitialFeaturesWrapper = (): TestFeatures => getInitialFeatures() as TestFeatures;
  const useFeaturesWrapper = (): TestFeatures => useFeatures() as TestFeatures;
  const setInitialFeaturesWrapper = (features: TestFeatures): void => setInitialFeatures(features as any);
  const FeaturesProviderWrapper = (props: React.PropsWithChildren<TestFeatures>) => <FeaturesProvider {...props} />;

  it('can set flags', () => {
    expect(getInitialFeaturesWrapper()).toBeTruthy();
    expect(getInitialFeaturesWrapper().test1).toBeFalsy();

    setInitialFeaturesWrapper({ test1: true });
    expect(getInitialFeaturesWrapper().test1).toEqual(true);
  });

  it('resets flags', () => {
    setInitialFeaturesWrapper({ test1: true });
    setInitialFeaturesWrapper({ test2: true });
    expect(getInitialFeaturesWrapper().test1).toBeFalsy();
    expect(getInitialFeaturesWrapper().test2).toEqual(true);
  });

  it('can access the flags via hook', () => {
    setInitialFeaturesWrapper({ test1: true });

    const wrapper = mount(<Foo />);

    expect(wrapper.html()).toEqual('<div>true</div>');
  });

  it('can set new flags via the provider', () => {
    setInitialFeaturesWrapper({ test1: true });

    const wrapper = mount(
      <FeaturesProviderWrapper test1={false}>
        <Foo />
      </FeaturesProviderWrapper>,
    );

    expect(wrapper.html()).toEqual('<div>false</div>');
  });
});
