import { createEmotionRenderer } from '@fluentui/react-northstar-emotion-renderer';
import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
import { ICSSInJSStyle } from '@fluentui/styles';
import * as prettier from 'prettier';

expect.addSnapshotSerializer({
  test(value) {
    return value?.nodeName === '#document';
  },
  print(value: Document) {
    function reduceRules(sheet: CSSStyleSheet | undefined) {
      return Array.from(sheet?.cssRules || []).reduce<string>((acc, rule) => {
        return `${acc}${rule.cssText}`;
      }, '');
    }

    const insertedCSS = Array.from(value.head.childNodes)
      .map((node: HTMLStyleElement) => reduceRules(node?.sheet as unknown as CSSStyleSheet))
      .join(';');

    return prettier.format(insertedCSS, { parser: 'css' }).trim();
  },
});

const defaultRendererParam: RendererParam = {
  direction: 'ltr',
  disableAnimations: false,
  displayName: 'Test',
  sanitizeCss: false,
};
const emotionRendererFactory = createEmotionRenderer();

describe('emotionRenderer', () => {
  beforeEach(() => {
    document.head.innerHTML = 'u';
  });

  test('basic styles are rendered', () => {
    emotionRendererFactory().renderRule({ color: 'red' }, defaultRendererParam);
    expect(document).toMatchSnapshot();
  });

  test('empty styles will not create classes', () => {
    emotionRendererFactory().renderRule({}, defaultRendererParam);
    expect(document).toMatchInlineSnapshot('');
  });

  // TODO: find out an issue with snapshots
  //
  // test('CSS fallback values are rendered', () => {
  //   createEmotionRenderer().renderRule({ display: ['grid', 'ms-grid'] as any }, defaultRendererParam);
  //   expect(document).toMatchSnapshot();
  // });

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

    emotionRendererFactory().renderRule(styles, defaultRendererParam);
    expect(document).toMatchSnapshot();
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

    emotionRendererFactory().renderRule(styles, defaultRendererParam);
    expect(document).toMatchSnapshot();
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

    emotionRendererFactory().renderRule(styles, { ...defaultRendererParam, disableAnimations: true });
    expect(document).toMatchSnapshot();
  });

  test('animations object value is wrapped in keyframe attribute', () => {
    const styles: ICSSInJSStyle = {
      animationName: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    };

    emotionRendererFactory().renderRule(styles, defaultRendererParam);
    expect(document).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginRight due to RTL', () => {
    emotionRendererFactory().renderRule({ marginLeft: '10px' }, { ...defaultRendererParam, direction: 'rtl' });
    expect(document).toMatchSnapshot();
  });

  test('marginLeft is rendered into marginLeft due to RTL with `noFlip`', () => {
    emotionRendererFactory().renderRule(
      { marginLeft: '10px /* @noflip */' },
      { ...defaultRendererParam, direction: 'rtl' },
    );
    expect(document).toMatchInlineSnapshot(`
      .rfui-df9qb4 {
        margin-left: 10px;
      }
    `);
  });

  test('prefixes required styles', () => {
    emotionRendererFactory().renderRule(
      {
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
      },
      defaultRendererParam,
    );
    expect(document).toMatchSnapshot();
  });
});
