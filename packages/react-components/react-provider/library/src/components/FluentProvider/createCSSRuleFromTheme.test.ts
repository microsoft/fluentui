import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-theme';
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

  it('escapes markup so a value cannot close the style tag', () => {
    const theme: PartialTheme = {
      colorBrandBackground: '</style><script>alert("xss")</script>',
      colorNeutralBackground1: 'blue',
    };

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toBe(
      '.selector { --colorBrandBackground: \\3C /style\\3E \\3C script\\3E alert("xss")\\3C /script\\3E ; ' +
        '--colorNeutralBackground1: blue;  }',
    );
  });

  it('escapes rule and declaration delimiters so a value cannot leave its declaration', () => {
    const theme: PartialTheme = {
      colorBrandBackground: 'red; } .other { color: red',
      colorNeutralBackground1: 'blue',
    };

    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      '.selector { --colorBrandBackground: red\\3B  \\7D  .other \\7B  color: red; --colorNeutralBackground1: blue;  }',
    );
  });

  it('escapes backslashes so a value cannot escape the following declaration separator', () => {
    expect(
      createCSSRuleFromTheme('.selector', { colorBrandBackground: 'red\\', colorNeutralBackground1: 'blue' }),
    ).toBe('.selector { --colorBrandBackground: red\\5C ; --colorNeutralBackground1: blue;  }');
    expect(createCSSRuleFromTheme('.selector', { colorBrandBackground: '\\7D ' })).toBe(
      '.selector { --colorBrandBackground: \\5C 7D ;  }',
    );
  });

  it('escapes delimiters in token names', () => {
    const theme: PartialTheme & Record<string, string> = { 'token;} .other {': 'red' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --token\\3B \\7D  .other \\7B : red;  }');
  });

  it.each([
    '"Segoe UI", system-ui, sans-serif',
    "'Segoe UI Web (West European)', sans-serif",
    'var(--custom-color, rgb(0 0 0))',
    'var(--custom-color, var(--fallback-color))',
    'var(--custom-font, "Segoe UI")',
    'calc(var(--custom-size) * 2)',
    'clamp(1rem, calc(var(--scale, 1) * 2vw), 3rem)',
    'color-mix(in srgb, var(--custom-color) 50%, transparent)',
    'oklch(from var(--custom-color) l c h / 0.5)',
    'oklch(from var(--custom-color) var(--interaction-hover))',
    'calc(l - 0.03 * clamp(1,(.5 - l)/.1,3)) c h / calc(alpha + 0.04)',
    'url("image.png")',
    'url(image.png)',
    '0 1px 2px rgb(0 0 0 / 20%), 0 4px 8px rgba(0, 0, 0, 0.1)',
    'cubic-bezier(0.9, 0.1, 1, 0.2)',
  ])('preserves %j unchanged', value => {
    const theme: PartialTheme & { customToken: string } = { customToken: value };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(`.selector { --customToken: ${value};  }`);
  });

  it('preserves finite numeric custom values', () => {
    const theme: PartialTheme & { customToken: number } = { customToken: 0 };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --customToken: 0;  }');
  });

  it.each([undefined, null, NaN, Infinity, true, {}])('omits %p token values', value => {
    const theme = { colorBrandBackground: value, colorNeutralBackground1: 'blue' } as unknown as PartialTheme;
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorNeutralBackground1: blue;  }');
  });

  it('preserves all exported theme values', () => {
    for (const theme of [webLightTheme, webDarkTheme, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme]) {
      const result = createCSSRuleFromTheme('.selector', theme);
      for (const [tokenName, tokenValue] of Object.entries(theme)) {
        expect(result).toContain(`--${tokenName}: ${tokenValue};`);
      }
    }
  });

  it('prevents XSS by replacing angle brackets in the selector', () => {
    const result = createCSSRuleFromTheme('.selector</style><script>alert("xss")</script>', undefined);

    expect(result).not.toContain('<');
    expect(result).toContain('\\3C /style>\\3C script>alert("xss")\\3C /script>');
  });

  it('preserves selector combinators while escaping rule delimiters', () => {
    expect(createCSSRuleFromTheme('body > .child[data-value="{}"]', undefined)).toBe(
      'body > .child[data-value="\\7B \\7D "] {}',
    );
    expect(createCSSRuleFromTheme('.selector} .other {', undefined)).toBe('.selector\\7D  .other \\7B  {}');
  });

  it.each([
    { value: String.raw`<`, expected: String.raw`\3C ` },
    { value: String.raw`\<`, expected: String.raw`\3C ` },
    { value: String.raw`\\<`, expected: String.raw`\\\3C ` },
    { value: String.raw`\\\<`, expected: String.raw`\\\3C ` },
  ])('preserves backslash parity for $value', ({ value, expected }) => {
    expect(createCSSRuleFromTheme(value, undefined)).toBe(`${expected} {}`);
  });

  it('handles long selector backslash runs', () => {
    const backslashes = '\\'.repeat(100_000);
    expect(createCSSRuleFromTheme(`.selector${backslashes}<`, undefined)).toBe(`.selector${backslashes}\\3C  {}`);
  });

  it('escapes curly braces in the selector so the generated rule stays a single, well-formed rule', () => {
    const result = createCSSRuleFromTheme('.selector} .other {', undefined);

    expect(result).toContain('.selector\\7D  .other \\7B ');
    // Only the rule's own wrapping braces should remain unescaped.
    expect(result.match(/{/g)).toHaveLength(1);
    expect(result.match(/}/g)).toHaveLength(1);
  });
});
