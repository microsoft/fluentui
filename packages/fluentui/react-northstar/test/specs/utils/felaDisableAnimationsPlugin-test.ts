import felaDisableAnimationsPlugin from 'src/utils/felaDisableAnimationsPlugin';

const disableAnimationsPlugin = felaDisableAnimationsPlugin();

const stylesWithAnimationShorthand = {
  animation: 'k1',
  margin: '0px 10px',
};

const stylesWithAnimationProps = {
  animationName: 'k1',
  animationDuration: '1s',
  margin: '0px 10px',
};

describe('felaDisableAnimationsPlugin', () => {
  test('does not disable animations if the props are not provided', () => {
    expect(disableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE')).toMatchObject(stylesWithAnimationShorthand);
  });

  test('does not disable animations if the disableAnimations flag is undefined', () => {
    expect(
      disableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE', undefined, {
        disableAnimations: undefined,
      }),
    ).toMatchObject(stylesWithAnimationShorthand);
  });

  test('does not disable animations if the disableAnimations flag is false', () => {
    expect(
      disableAnimationsPlugin(stylesWithAnimationProps, 'RULE', undefined, {
        disableAnimations: false,
      }),
    ).toMatchObject(stylesWithAnimationProps);
  });

  test('disables animations if the disableAnimations flag is true', () => {
    expect(
      disableAnimationsPlugin(stylesWithAnimationProps, 'RULE', undefined, {
        disableAnimations: true,
      }),
    ).toMatchObject({ margin: '0px 10px' });
  });

  test('disables animations if the disableAnimations flag is true and the animation css shorthand is used', () => {
    expect(
      disableAnimationsPlugin(stylesWithAnimationShorthand, 'RULE', undefined, {
        disableAnimations: true,
      }),
    ).toMatchObject({ margin: '0px 10px' });
  });
});
