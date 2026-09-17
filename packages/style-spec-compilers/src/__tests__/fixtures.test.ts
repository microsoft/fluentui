import * as fs from 'node:fs';
import * as path from 'node:path';
import { BadgeSpec, ButtonSpec, DividerSpec } from '@fluentui/component-style-specs';
import { compileStyleSpec, type CompileTarget } from '../index';

const FIXTURES = path.join(__dirname, '../__fixtures__');
const UPDATE = process.env.UPDATE_STYLE_SPEC_FIXTURES === '1';

const cases: Array<[string, typeof BadgeSpec]> = [
  ['Badge', BadgeSpec],
  ['Divider', DividerSpec],
  ['Button', ButtonSpec],
];
const targets: CompileTarget[] = ['griffel', 'web-components', 'css-modules'];

describe('generated fixtures', () => {
  for (const [name, spec] of cases) {
    for (const target of targets) {
      it(`${name} / ${target}`, () => {
        const files = compileStyleSpec(spec, { target });
        const dir = path.join(FIXTURES, name, target);
        if (UPDATE) {
          fs.mkdirSync(dir, { recursive: true });
          for (const file of files) {
            fs.writeFileSync(path.join(dir, file.fileName), file.contents, 'utf8');
          }
        }
        expect(fs.existsSync(dir)).toBe(true);
        for (const file of files) {
          const expected = fs.readFileSync(path.join(dir, file.fileName), 'utf8');
          expect(file.contents).toEqual(expected);
        }
      });
    }
  }
});
