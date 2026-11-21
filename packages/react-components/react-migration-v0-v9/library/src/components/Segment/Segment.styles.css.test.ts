import { useSegmentStyles } from './Segment.styles.css';

jest.mock('./Segment.module.css', () => ({ segment: 'segment' }));

describe('useSegmentStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useSegmentStyles().segment).toBe('segment');
  });
});
