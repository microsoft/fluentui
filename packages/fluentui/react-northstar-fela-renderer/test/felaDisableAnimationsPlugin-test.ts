import { ICSSInJSStyle } from '@fluentui/styles';
import { felaDisableAnimationsPlugin } from '../src/felaDisableAnimationsPlugin';

const stylesWithAnimationShorthand: ICSSInJSStyle = {
  animation: 'k1',
  margin: '0px 10px',
};

const stylesWithFallbackValues: ICSSInJSStyle = {
  display: ['grid', '-ms-grid'] as any,
};

const stylesWithAnimationProps: ICSSInJSStyle = {
  animationName: 'k1',
  animationDuration: '1s',
  margin: '0px 10px',
};

describe('felaDisableAnimationsPlugin', () => {
  test('does not disable animations if the props are not provided', () => {
    expect(felaDisableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE')).toMatchObject(
      stylesWithAnimationShorthand,
    );
  });

  test('does not disable animations if the disableAnimations flag is undefined', () => {
    expect(
      felaDisableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE', undefined, {
        disableAnimations: undefined,
      }),
    ).toMatchObject(stylesWithAnimationShorthand);
  });

  test('does not disable animations if the disableAnimations flag is false', () => {
    expect(
      felaDisableAnimationsPlugin(stylesWithAnimationProps, 'RULE', undefined, {
        disableAnimations: false,
      }),
    ).toMatchObject(stylesWithAnimationProps);
  });

  test('disables animations if the disableAnimations flag is true', () => {
    expect(
      felaDisableAnimationsPlugin(stylesWithAnimationProps, 'RULE', undefined, {
        disableAnimations: true,
      }),
    ).toMatchObject({ margin: '0px 10px' });
  });

  test('disables animations if the disableAnimations flag is true and the animation css shorthand is used', () => {
    expect(
      felaDisableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE', undefined, {
        disableAnimations: true,
      }),
    ).toMatchObject({ margin: '0px 10px' });
  });

  test('keeps unrelated fallback values', () => {
    expect(
      felaDisableAnimationsPlugin(stylesWithFallbackValues, 'RULE', undefined, {
        disableAnimations: true,
      }),
    ).toMatchObject({ display: ['grid', '-ms-grid'] });
  });
});
