import { unstable_createAnimationStyles as createAnimationStyles } from '@fluentui/react-bindings';

const theme = {
  siteVariables: { fontSizes: {} },
  componentVariables: {},
  componentStyles: {},
  icons: {},
  fontFaces: [],
  staticStyles: [],
  animations: {
    spinner: {
      keyframe: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      duration: '5s',
      iterationCount: 'infinite',
      fillMode: 'forwards',
      playState: 'running',
      timingFunction: 'ease',
      direction: 'reverse',
      delay: '2s',
    },
  },
};

describe('createAnimationStyles', () => {
  test('applies all animation props from the theme if the animation is string', () => {
    expect(createAnimationStyles('spinner', theme)).toMatchObject({
      animationName: {
        keyframe: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animationDuration: '5s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      animationPlayState: 'running',
      animationTimingFunction: 'ease',
      animationDirection: 'reverse',
      animationDelay: '2s',
    });
  });

  test('overrides theme props if the animation prop is object', () => {
    expect(createAnimationStyles({ name: 'spinner', duration: '1s', delay: '3s' }, theme)).toMatchObject({
      animationName: {
        keyframe: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      animationPlayState: 'running',
      animationTimingFunction: 'ease',
      animationDirection: 'reverse',
      animationDelay: '3s',
    });
  });
});
