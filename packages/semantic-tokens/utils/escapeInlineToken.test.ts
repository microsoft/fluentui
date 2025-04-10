import { escapeInlineToken } from './escapeInlineToken';
describe('escapeInlineToken', () => {
  it('Handles a variable replacement string as pure text', () => {
    expect(escapeInlineToken('textGlobalDisplay1FontsizeRaw')).toMatch('${textGlobalDisplay1FontsizeRaw}');
  });
});
