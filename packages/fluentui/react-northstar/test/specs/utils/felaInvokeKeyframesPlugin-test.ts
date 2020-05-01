import felaInvokeKeyframesPlugin from 'src/utils/felaInvokeKeyframesPlugin';

const renderInvokeKeyframes = felaInvokeKeyframesPlugin();

describe('felaRenderKeyframesPlugin', () => {
  test('does not transform the animationName prop if it is already string', () => {
    const style = {
      animationName: 'k1',
      animationDuration: '2s',
    };

    expect(renderInvokeKeyframes(style)).toMatchObject(style);
  });

  test('does not transform the animationName prop if it is already object', () => {
    const style = {
      animationName: { from: { rotate: '0deg' }, to: { rotate: '360deg' } },
      animationDuration: '2s',
    };

    expect(renderInvokeKeyframes(style)).toMatchObject(style);
  });

  test('transforms the animationName prop if it contains keyframe in the definition', () => {
    const style = {
      animationName: {
        keyframe: () => ({ from: { rotate: '0deg' }, to: { rotate: '360deg' } }),
      },
      animationDuration: '2s',
    };

    expect(renderInvokeKeyframes(style)).toMatchObject({
      animationName: expect.objectContaining({
        from: expect.any(Object),
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    });
  });

  test('transforms the animationName prop with params', () => {
    const style = {
      animationName: {
        keyframe: ({ from }) => ({ from: { rotate: from }, to: { rotate: '360deg' } }),
        params: { from: '100deg' },
      },
      animationDuration: '2s',
    };

    expect(renderInvokeKeyframes(style)).toMatchObject({
      animationName: expect.objectContaining({
        from: { rotate: '100deg' },
        to: expect.any(Object),
      }),
      animationDuration: '2s',
    });
  });

  test('does not transform a list of strings', () => {
    const style = {
      display: ['inline-grid', '-ms-inline-grid'],
    };

    expect(renderInvokeKeyframes(style)).toMatchObject(style);
  });
});
