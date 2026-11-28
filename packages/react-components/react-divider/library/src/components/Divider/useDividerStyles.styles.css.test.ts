import { renderHook } from '@testing-library/react-hooks';
import { useDivider_unstable } from './useDivider';
import { useDividerStyles_unstable as applyStyles } from './useDividerStyles.styles.css';

jest.mock('./Divider.module.css', () => ({
  brand: 'css-brand',
  center: 'css-center',
  default: 'css-default',
  end: 'css-end',
  horizontal: 'css-horizontal',
  inset: 'css-inset',
  root: 'css-root',
  start: 'css-start',
  strong: 'css-strong',
  subtle: 'css-subtle',
  vertical: 'css-vertical',
  withChildren: 'css-withChildren',
}));

describe('useDividerStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useDivider_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Divider css-root css-center css-default css-horizontal');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useDivider_unstable(
        { className: 'caller-root', wrapper: { className: 'caller-wrapper' }, children: 'Content' },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.wrapper?.className?.endsWith(' caller-wrapper')).toBe(true);
  });

  it.each(['default', 'brand', 'subtle', 'strong'] as const)(
    'maps appearance %s and independent orientation and alignment states',
    appearance => {
      for (const alignContent of ['start', 'center', 'end'] as const) {
        for (const vertical of [false, true]) {
          const { result } = renderHook(() =>
            useDivider_unstable({ appearance, alignContent, vertical, inset: true, children: 'Content' }, null),
          );
          const state = applyStyles(result.current);
          expect(state.root.className).toBe(
            `fui-Divider css-root css-${alignContent} css-${appearance} css-${
              vertical ? 'vertical' : 'horizontal'
            } css-inset css-withChildren`,
          );
          expect(state.wrapper?.className).toBe('fui-Divider__wrapper');
        }
      }
    },
  );

  it('distinguishes undefined children from null content like the render hook', () => {
    const { result } = renderHook(() => useDivider_unstable({ vertical: true, children: null }, null));
    expect(applyStyles(result.current).root.className).toContain('css-withChildren');
  });
});
