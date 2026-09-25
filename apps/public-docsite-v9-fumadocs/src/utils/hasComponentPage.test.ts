import { hasComponentPage } from './hasComponentPage';

describe('page header ownership', () => {
  it('keeps the normal heading for guide demos', () => {
    expect(hasComponentPage([{ description: 'Guide', examples: [] }])).toBe(false);
  });
  it('lets component pages render their own heading', () => {
    expect(hasComponentPage([{ meta: {}, stories: {} }])).toBe(true);
  });
  it('handles absent metadata', () => {
    expect(hasComponentPage(undefined)).toBe(false);
  });
});
