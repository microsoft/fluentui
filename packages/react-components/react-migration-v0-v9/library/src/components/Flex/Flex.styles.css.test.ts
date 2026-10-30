import { useFlexStyles } from './Flex.styles.css';

jest.mock('./Flex.module.css', () => ({ flex: 'flex', inline: 'inline', gapForRowFlexLarge: 'gap-row-large' }));

describe('useFlexStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useFlexStyles()).toMatchObject({ flex: 'flex', inline: 'inline', gapForRowFlexLarge: 'gap-row-large' });
  });
});
