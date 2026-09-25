import { markdownCode, markdownCodeBlock, markdownTable } from './markdown';

describe('Markdown output', () => {
  it('escapes union separators without corrupting generic or template literal types', () => {
    const table = markdownTable(['Prop', 'Type'], [[markdownCode('value'), markdownCode('`id-${string}` | Array<T>')]]);
    expect(table).toEqual(['| Prop | Type |', '| --- | --- |', '| `value` | `` `id-${string}` \\| Array<T> `` |']);
  });

  it('keeps multiline documentation in one table row and preserves inline Markdown', () => {
    expect(markdownTable(['Description'], [['**Required**. First | second.\r\nUse `value`.']])[2]).toBe(
      '| **Required**. First \\| second. Use `value`. |',
    );
  });

  it('uses code delimiters longer than embedded backticks', () => {
    expect(markdownCode('`value`')).toBe('`` `value` ``');
    expect(markdownCode('one\n two')).toBe('`one  two`');
    expect(markdownCodeBlock('type T = "```";')).toBe('````ts\ntype T = "```";\n````');
    expect(markdownCode('`x'.repeat(150_000))).toHaveLength(300_006);
  });

  it('preserves literal backslashes and already-escaped Markdown pipes', () => {
    expect(markdownCode('one\\|two')).toBe('<code>one&#92;&#124;two</code>');
    expect(markdownTable(['Type'], [[markdownCode('one\\\\|two')]])[2]).toBe('| `one\\\\\\|two` |');
    expect(markdownTable(['Description'], [['one\\|two']])[2]).toBe('| one\\|two |');
  });
});
