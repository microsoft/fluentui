import { ICSSInJSStyle } from '@fluentui/styles';
import { felaInvokeKeyframesPlugin } from '../src/felaInvokeKeyframesPlugin';

describe('felaRenderKeyframesPlugin', () => {
  test('does not transform the animationName prop if it is already string', () => {
    const style: ICSSInJSStyle = {
      animationName: 'k1',
      animationDuration: '2s',
    };

    expect(felaInvokeKeyframesPlugin(style)).toMatchObject(style);
  });

  test('does not transform the animationName prop if it is already object', () => {
    const style: ICSSInJSStyle = {
      animationName: { from: { rotate: '0deg' }, to: { rotate: '360deg' } },
      animationDuration: '2s',
    };

    expect(felaInvokeKeyframesPlugin(style)).toMatchObject(style);
  });

  test('transforms the animationName prop if it contains keyframe in the definition', () => {
    const style: ICSSInJSStyle = {
      animationName: {
        keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
      },
      animationDuration: '2s',
    };

    expect(felaInvokeKeyframesPlugin(style)).toMatchObject({
      animationName: expect.objectContaining({
        from: expect.any(Object),
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    });
  });

  test('transforms the animationName prop with params', () => {
    const style: ICSSInJSStyle = {
      animationName: {
        keyframe: ({ from }) => ({ from: { rotate: from }, to: { rotate: '360deg' } }),
        params: { from: '100deg' },
      },
      animationDuration: '2s',
    };

    expect(felaInvokeKeyframesPlugin(style)).toMatchObject({
      animationName: expect.objectContaining({
        from: { rotate: '100deg' },
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    });
  });

  test('does not transform a list of strings', () => {
    const style: ICSSInJSStyle = {
      display: 'inline-grid',
    };

    expect(felaInvokeKeyframesPlugin(style)).toMatchObject(style);
  });
});
