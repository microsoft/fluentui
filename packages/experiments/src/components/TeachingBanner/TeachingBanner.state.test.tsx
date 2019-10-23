import * as React from 'react';
import { renderHook } from 'react-hooks-testing-library';
import { useTeachingBannerState } from './TeachingBanner.state';
import { TeachingBanner } from './TeachingBanner';
import { mount } from 'enzyme';

describe('TeachingBannerState', () => {
  test('should fall back to default values', () => {
    const { result } = renderHook(() => useTeachingBannerState({}));
    expect(result.current.iconPremium).toBe('Diamond');
  });

  test('should use default prop value', () => {
    const { result } = renderHook(() => useTeachingBannerState({ defaultPremiumIcon: 'Emoji2' }));
    expect(result.current.iconPremium).toBe('Emoji2');
  });

  test('should give prop value highest priority', () => {
    const { result } = renderHook(() => useTeachingBannerState({ iconPremium: 'Emoji', defaultPremiumIcon: 'Emoji2' }));
    expect(result.current.iconPremium).toBe('Emoji');
  });

  test('can call the callback on dismiss', () => {
    const callback = (ev: React.MouseEvent<HTMLElement>) => null;
    const component = mount(<TeachingBanner onDismiss={callback} />);

    expect(
      component
        .find('.ms-TeachingBanner')
        .first()
        .exists()
    ).toEqual(true);

    component
      .find('.ms-TeachingBanner-dismiss')
      .first()
      .simulate('click');

    expect(
      component
        .find('.ms-TeachingBanner')
        .first()
        .exists()
    ).toEqual(false);
  });
});
