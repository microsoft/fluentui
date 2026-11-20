import type { TooltipState } from './Tooltip.types';
import { tooltipClassNames, useTooltipStyles_unstable } from './useTooltipStyles.styles.css';

jest.mock('./Tooltip.module.css', () => ({
  arrow: 'css-arrow',
  content: 'css-content',
  hidden: 'css-hidden',
  inverted: 'css-inverted',
  visible: 'css-visible',
}));
jest.mock('@fluentui/react-positioning/arrow.module.css', () => ({ arrow: 'shared-arrow' }), { virtual: true });

const createState = () =>
  ({
    components: { content: 'div' },
    appearance: 'normal',
    visible: false,
    hidden: false,
    content: { className: 'caller-content' },
  } as TooltipState);

describe('useTooltipStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useTooltipStyles_unstable(state)).toBe(state);
    expect(state.content?.className?.split(' ').slice(-1)[0]).toBe('caller-content');
    expect(state.content?.className).toContain(tooltipClassNames.content);
  });
  it('places visible state on its owner', () => {
    const state = createState();
    state.visible = true;
    useTooltipStyles_unstable(state);
    expect(state.content.className).toContain('css-visible');
  });
  it('composes the shared positioning arrow without changing default Griffel imports', () => {
    const state = createState();
    useTooltipStyles_unstable(state);
    expect(state.arrowClassName).toBe('shared-arrow css-arrow');
  });
});
