import { useText_unstable } from './useText';
import { textClassNames, useTextStyles_unstable } from './useTextStyles.styles.css';

jest.mock('./Text.module.css', () => ({
  root: 'css-root',
  nowrap: 'css-nowrap',
  truncate: 'css-truncate',
  block: 'css-block',
  italic: 'css-italic',
  underline: 'css-underline',
  strikethrough: 'css-strikethrough',
  size100: 'css-size100',
  size200: 'css-size200',
  size400: 'css-size400',
  size500: 'css-size500',
  size600: 'css-size600',
  size700: 'css-size700',
  size800: 'css-size800',
  size900: 'css-size900',
  size1000: 'css-size1000',
  monospace: 'css-monospace',
  numeric: 'css-numeric',
  medium: 'css-medium',
  semibold: 'css-semibold',
  bold: 'css-bold',
  center: 'css-center',
  end: 'css-end',
  justify: 'css-justify',
}));

describe('useTextStyles_unstable (CSS Modules)', () => {
  it('uses the default typography and preserves caller classes last', () => {
    const state = useText_unstable({ className: 'caller-root' }, null);
    expect(useTextStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${textClassNames.root} css-root caller-root`);
  });

  it.each([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const)('supports size %s', size => {
    const state = useText_unstable({ size }, null);
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(`${textClassNames.root} css-root${size === 300 ? '' : ` css-size${size}`}`);
  });

  it.each(['base', 'monospace', 'numeric'] as const)('supports font %s', font => {
    const state = useText_unstable({ font }, null);
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(`${textClassNames.root} css-root${font === 'base' ? '' : ` css-${font}`}`);
  });

  it.each(['regular', 'medium', 'semibold', 'bold'] as const)('supports weight %s', weight => {
    const state = useText_unstable({ weight }, null);
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(`${textClassNames.root} css-root${weight === 'regular' ? '' : ` css-${weight}`}`);
  });

  it.each(['start', 'center', 'end', 'justify'] as const)('supports alignment %s', align => {
    const state = useText_unstable({ align }, null);
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(`${textClassNames.root} css-root${align === 'start' ? '' : ` css-${align}`}`);
  });

  it('combines independent formatting states without a combined-state class', () => {
    const state = useText_unstable(
      {
        wrap: false,
        truncate: true,
        block: true,
        italic: true,
        underline: true,
        strikethrough: true,
        className: 'caller-root',
      },
      null,
    );
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(
      `${textClassNames.root} css-root css-nowrap css-truncate css-block css-italic css-underline css-strikethrough caller-root`,
    );
  });

  it.each([true, false])('keeps underline independent from strikethrough (%s)', underline => {
    const state = useText_unstable({ underline, strikethrough: !underline }, null);
    useTextStyles_unstable(state);
    expect(state.root.className).toBe(
      `${textClassNames.root} css-root css-${underline ? 'underline' : 'strikethrough'}`,
    );
  });
});
