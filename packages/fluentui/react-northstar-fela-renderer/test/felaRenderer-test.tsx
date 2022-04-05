import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { ICSSInJSStyle } from '@fluentui/styles';
// @ts-ignore
import { createSnapshot } from 'jest-react-fela';
import * as React from 'react';
import { FelaComponent } from 'react-fela';

const felaRenderer = (createFelaRenderer() as any).getOriginalRenderer();

describe('felaRenderer', () => {
  test('basic styles are rendered', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ color: 'red' }} />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('CSS fallback values are rendered', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ color: ['red', 'blue'] as any }} />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('keyframe colors are rendered', () => {
    const styles: ICSSInJSStyle = {
      animationName: {
        keyframe: ({ fromColor, toColor }) => ({
          from: {
            color: fromColor,
          },
          to: {
            color: toColor,
          },
        }),
        params: {
          fromColor: 'red',
          toColor: 'blue',
        },
      },
      animationDuration: '5s',
    };

    const snapshot = createSnapshot(<FelaComponent style={styles as any} />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('array returned by keyframe results in CSS fallback values', () => {
    const styles: ICSSInJSStyle = {
      animationName: {
        keyframe: ({ steps }) => {
          const obj = {};
          steps.forEach((step: string) => {
            (obj as any)[step] = { color: ['blue', 'red', 'yellow'] };
          });
          return obj;
        },
        params: { steps: ['0%', '100%'] },
      },
    };

    const snapshot = createSnapshot(<FelaComponent style={styles as any} />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('animations are not applied if animations are disabled', () => {
    const styles: ICSSInJSStyle = {
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
    };

    const snapshot = createSnapshot(<FelaComponent style={styles as any} disableAnimations />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginRight due to RTL', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ marginLeft: '10px' }} />, { rtl: true }, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginLeft due to RTL with `noFlip`', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ marginLeft: '10px /* @noflip */' }} />, {}, felaRenderer);
    expect(snapshot).toMatchSnapshot();
  });

  test('styles are expanded to longhand values', () => {
    const snapshot = createSnapshot(
      <FelaComponent
        style={{
          borderStyle: 'solid',
          // spaces in color value are important
          borderColor: 'rgba(51,204, 51, 1) rgba(51,0,204, 1)',
        }}
      />,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('prefixes required styles', () => {
    const snapshot = createSnapshot(
      <FelaComponent
        style={{
          cursor: 'zoom-in',
          display: 'flex',
          filter: 'blur(5px)',
          height: 'min-content',
          position: 'sticky',
          transition: 'width 2s, height 2s, background-color 2s, transform 2s',

          ':hover': {
            backgroundImage: 'image-set("cat.png" 1x, "cat-2x.png" 2x)',
            display: 'inline-flex',
            height: 'fit-content',
          },
        }}
      />,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });
});
