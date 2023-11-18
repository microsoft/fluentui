import { mergeStaticStyles } from '@fluentui/styles';

describe('mergeStaticStyles', () => {
  test('returns a compact array', () => {
    expect(mergeStaticStyles(undefined, [{ body: { color: 'red' } }, '*{box-sizing:border-box;}'])).toEqual([
      { body: { color: 'red' } },
      '*{box-sizing:border-box;}',
    ]);
  });
});
