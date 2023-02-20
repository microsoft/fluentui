import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { ICSSInJSStyle } from '@fluentui/styles';
import { renderToString } from 'fela-tools';
import { format } from 'prettier';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FelaComponent, RendererProvider, ThemeProvider } from 'react-fela';

const felaRenderer = (createFelaRenderer()() as any).getOriginalRenderer();

function createSnapshot(component: JSX.Element, theme = {}) {
  const div = document.createElement('div');

  // reset renderer to have a clean setup
  felaRenderer.clear();

  ReactDOM.render(
    <RendererProvider renderer={felaRenderer}>
      <ThemeProvider theme={{ direction: 'ltr', ...theme }}>{component}</ThemeProvider>
    </RendererProvider>,
    div,
  );

  // jest-react-fela used htmltojsx to format the HTML, but that no longer works with React 17
  // due to importing a removed module. Various alternatives are available, but in this case,
  // all the things to be serialized are simple enough that we can just use innerHTML directly.
  const innerHTML = div.innerHTML;
  ReactDOM.unmountComponentAtNode(div);

  const css = renderToString(felaRenderer);
  const formattedCss = format(css, { parser: 'css', useTabs: false, tabWidth: 2 });
  return `${formattedCss}\n\n${innerHTML}`;
}

describe('felaRenderer', () => {
  test('basic styles are rendered', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ color: 'red' }} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('CSS fallback values are rendered', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ color: ['red', 'blue'] as any }} />);
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

    const snapshot = createSnapshot(<FelaComponent style={styles as any} />);
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

    const snapshot = createSnapshot(<FelaComponent style={styles as any} />);
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

    const snapshot = createSnapshot(<FelaComponent style={styles as any} disableAnimations />);
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginLeft due to LTR', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ marginLeft: '10px' }} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginRight due to RTL', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ marginLeft: '10px' }} />, { direction: 'rtl' });
    expect(snapshot).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginLeft due to RTL with `noFlip`', () => {
    const snapshot = createSnapshot(<FelaComponent style={{ marginLeft: '10px /* @noflip */' }} />, {
      direction: 'rtl',
    });
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
    );
    expect(snapshot).toMatchSnapshot();
  });
});
