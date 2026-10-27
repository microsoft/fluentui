import { useStackStyles, useFlexAlignItemsStyles, useFlexJustifyContentStyles } from './StackShim.styles.css';

jest.mock('./StackShim.module.css', () => ({ root: 'root', alignItemsStart: 'ai-start', justifyContentEnd: 'jc-end' }));

describe('StackShim styles (CSS Modules)', () => {
  it('returns class names', () => {
    expect(useStackStyles().root).toBe('root');
    expect(useFlexAlignItemsStyles().start).toBe('ai-start');
    expect(useFlexJustifyContentStyles().end).toBe('jc-end');
  });
});
