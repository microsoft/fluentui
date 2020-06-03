import { atBootSetFeatureFlags, getFeatureFlags } from './FeatureFlags';

describe('FeatureFlags', () => {
  it('getFeatureFlags works', () => {
    expect(getFeatureFlags().ModalAriaHidden).toBeFalsy();
    expect(getFeatureFlags().TestFeature).toBeFalsy();

    atBootSetFeatureFlags({ ModalAriaHidden: false });

    expect(getFeatureFlags().ModalAriaHidden).toEqual(false);
    expect(getFeatureFlags().TestFeature).toBeFalsy();

    atBootSetFeatureFlags({ ModalAriaHidden: true });

    expect(getFeatureFlags().ModalAriaHidden).toEqual(true);
    expect(getFeatureFlags().TestFeature).toBeFalsy();

    atBootSetFeatureFlags({ TestFeature: true });

    expect(getFeatureFlags().ModalAriaHidden).toEqual(true);
    expect(getFeatureFlags().TestFeature).toEqual(true);
  });
});
