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

  it('prevents XSS by replacing angle brackets that could inject HTML', () => {
    const theme = {
      colorBrandBackground: '</style><script>alert("xss")</script>',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toMatchInlineSnapshot(
      `".selector { --colorBrandBackground: \\\\3C /style\\\\3E \\\\3C script\\\\3E alert(\\"xss\\")\\\\3C /script\\\\3E ;  }"`,
    );
  });

  it('prevents XSS by replacing angle brackets in the selector', () => {
    const result = createCSSRuleFromTheme('.selector</style><script>alert("xss")</script>', undefined);

    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toContain('\\3C /style\\3E \\3C script\\3E alert("xss")\\3C /script\\3E ');
  });

  it('escapes curly braces in theme values so the generated rule stays a single, well-formed rule', () => {
    const theme = {
      colorBrandBackground: 'red; } .other { color: red',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toMatchInlineSnapshot(
      `".selector { --colorBrandBackground: red; \\\\7D  .other \\\\7B  color: red;  }"`,
    );
    // Only the rule's own wrapping braces should remain unescaped.
    expect(result.match(/{/g)).toHaveLength(1);
    expect(result.match(/}/g)).toHaveLength(1);
  });

  it('escapes curly braces in the selector so the generated rule stays a single, well-formed rule', () => {
    const result = createCSSRuleFromTheme('.selector} .other {', undefined);

    expect(result).toContain('.selector\\7D  .other \\7B ');
    // Only the rule's own wrapping braces should remain unescaped.
    expect(result.match(/{/g)).toHaveLength(1);
    expect(result.match(/}/g)).toHaveLength(1);
  });

  it('escapes backslashes so theme values cannot smuggle an escape sequence past the other replacements', () => {
    const theme = {
      colorBrandBackground: '\\7D ',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toMatchInlineSnapshot(`".selector { --colorBrandBackground: \\\\5C 7D ;  }"`);
  });
});
