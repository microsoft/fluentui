import { readFileSync } from 'fs';
import { join } from 'path';

const css = readFileSync(join(__dirname, 'PresenceBadge.module.css'), 'utf8');

describe('PresenceBadge CSS font icon parity', () => {
  it.each([
    ['tiny', '6px'],
    ['large', '20px'],
    ['extraLarge', '28px'],
  ])('resizes both font icon implementations for %s', (size, fontSize) => {
    const selector = `.${size} :is(:global(.fui-Icon-font), [data-fui-icon='font'])`;
    const rule = css.slice(css.indexOf(selector)).split('}')[0];

    expect(css).toContain(selector);
    expect(rule).toContain(`font-size: ${fontSize} !important;`);
  });
});
