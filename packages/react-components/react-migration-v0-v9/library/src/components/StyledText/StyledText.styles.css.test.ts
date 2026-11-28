import { useSizeStyles, useStyles, useWeightStyles } from './StyledText.styles.css';

jest.mock('./StyledText.module.css', () => ({ base100: 'base100', bold: 'bold', mention: 'mention' }));

describe('StyledText styles (CSS Modules)', () => {
  it('returns the CSS Module class names from each hook', () => {
    expect(useSizeStyles().base100).toBe('base100');
    expect(useWeightStyles().bold).toBe('bold');
    expect(useStyles().mention).toBe('mention');
  });
});
