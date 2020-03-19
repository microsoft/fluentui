import * as React from 'react';
import { createSnapshot } from 'jest-react-fela';
import { EmptyThemeProvider } from 'test/utils';
import Box from 'src/components/Box/Box';
import Animation from 'src/components/Animation/Animation';
import Provider from 'src/components/Provider/Provider';
import Text from 'src/components/Text/Text';
import { felaRenderer } from 'src/utils';

describe('felaRenderer', () => {
  test('basic styles are rendered', () => {
    const snapshot = createSnapshot(
      <EmptyThemeProvider>
        <Box styles={{ color: 'red' }} />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('CSS fallback values are rendered', () => {
    const snapshot = createSnapshot(
      <EmptyThemeProvider>
        <Box styles={{ color: ['red', 'blue'] as any }} />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('keyframe colors are rendered', () => {
    const colorChanger = {
      keyframe: ({ fromColor, toColor }) => ({
        from: {
          color: fromColor,
        },
        to: {
          color: toColor,
        },
      }),
      keyframeParams: {
        fromColor: 'red',
        toColor: 'blue',
      },
      duration: '5s',
    };

    const snapshot = createSnapshot(
      <Provider
        theme={{
          animations: { colorChanger },
        }}
      >
        <Animation name="colorChanger">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('array returned by keyframe results in CSS fallback values', () => {
    const steps = ['0%', '100%'];

    const colorChanger = {
      keyframe: ({ steps }) => {
        const obj = {};
        steps.forEach((step: string, index) => {
          (obj as any)[step] = { color: ['blue', 'red', 'yellow'] };
        });
        return obj;
      },
      keyframeParams: { steps },
    };

    const snapshot = createSnapshot(
      <Provider
        theme={{
          animations: { colorChanger },
        }}
      >
        <Animation name="colorChanger">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('animations are not applied if animations are disabled', () => {
    const spinner = {
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
    };

    const snapshot = createSnapshot(
      <Provider
        disableAnimations
        theme={{
          animations: { spinner },
        }}
      >
        <Animation name="spinner">
          <Box />
        </Animation>
      </Provider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginRight due to RTL', () => {
    const snapshot = createSnapshot(
      <Provider rtl>
        <Text content="Hello" styles={{ marginLeft: '10px' }} />
      </Provider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginLeft due to RTL with `noFlip`', () => {
    const snapshot = createSnapshot(
      <Provider rtl>
        <Text content="Hello" styles={{ marginLeft: '10px /* @noflip */' }} />
      </Provider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('styles are expanded to longhand values', () => {
    const snapshot = createSnapshot(
      <EmptyThemeProvider>
        <Box
          styles={{
            borderStyle: 'solid',
            // spaces in color value are important
            borderColor: 'rgba(51,204, 51, 1) rgba(51,0,204, 1)',
          }}
        />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('prefixes required styles', () => {
    const snapshot = createSnapshot(
      <EmptyThemeProvider>
        <Box
          styles={{
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
        />
      </EmptyThemeProvider>,
      {},
      felaRenderer,
    );
    expect(snapshot).toMatchSnapshot();
  });
});
