import type { PartialTheme } from '@fluentui/react-theme';
import { createCSSRuleFromTheme } from './createCSSRuleFromTheme';

describe('createCSSRuleFromTheme', () => {
  it('handles undefined theme', () => {
    expect(createCSSRuleFromTheme('.selector', undefined)).toMatchInlineSnapshot(`".selector {}"`);
  });

  it('handles a theme', () => {
    const theme: PartialTheme = {
      borderRadiusLarge: '10px',
      colorBackgroundOverlay: 'rgba(0, 0, 0, 0.4)',
    };

    expect(createCSSRuleFromTheme('.selector', theme)).toMatchInlineSnapshot(
      `".selector { --borderRadiusLarge: 10px; --colorBackgroundOverlay: rgba(0, 0, 0, 0.4);  }"`,
    );
  });

  it('prevents XSS by removing angle brackets that could inject HTML', () => {
    const theme = {
      colorBrandBackground: '</style><script>alert("xss")</script>',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).not.toContain('"');
    expect(result).toMatchInlineSnapshot(`".selector { --colorBrandBackground: /stylescriptalert(xss)/script;  }"`);
  });
});
