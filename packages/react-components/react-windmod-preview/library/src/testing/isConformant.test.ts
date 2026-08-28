import * as fs from 'node:fs';
import * as path from 'node:path';

import { buildFamilyMap } from './isConformant';

/**
 * The component->family derivation `isConformant` runs on. Every conformance suite in the package
 * checks its subpath against this map, so an ambiguous or missing entry silently asserts the wrong
 * thing — these tests pin the two failure modes and the real tree's shape.
 */
describe('buildFamilyMap', () => {
  it('maps every component a barrel re-exports to that barrel', () => {
    const map = buildFamilyMap([
      ['card', "export { Card } from './components/Card';\nexport { CardHeader } from './components/CardHeader';"],
      ['button', "export { Button } from './components/Button';"],
    ]);

    expect(map.get('Card')).toBe('card');
    expect(map.get('CardHeader')).toBe('card');
    expect(map.get('Button')).toBe('button');
  });

  it('throws naming both barrels when a component is re-exported by two families', () => {
    expect(() =>
      buildFamilyMap([
        ['divider', "export { Divider } from './components/Divider';"],
        [
          'dropdown',
          "export { Dropdown } from './components/Dropdown';\nexport { Divider } from './components/Divider';",
        ],
      ]),
    ).toThrow(
      "isConformant: './components/Divider' is re-exported by two family barrels, src/divider.ts and src/dropdown.ts",
    );
  });

  it('tolerates a barrel re-exporting the same component twice — one family, no ambiguity', () => {
    const map = buildFamilyMap([
      [
        'drawer',
        "export { Drawer } from './components/Drawer';\nexport type { DrawerProps } from './components/Drawer';",
      ],
    ]);

    expect(map.get('Drawer')).toBe('drawer');
  });

  it('omits a component no barrel re-exports, so isConformant can fail by name', () => {
    const map = buildFamilyMap([['button', "export { Button } from './components/Button';"]]);

    expect(map.has('Orphan')).toBe(false);
  });

  it('resolves every component directory in the real tree to exactly one family', () => {
    const srcDir = path.resolve(__dirname, '..');
    const map = buildFamilyMap(
      fs
        .readdirSync(srcDir)
        .filter(file => file.endsWith('.ts') && file !== 'index.ts')
        .map(file => [file.replace(/\.ts$/, ''), fs.readFileSync(path.join(srcDir, file), 'utf8')] as const),
    );
    const componentDirs = fs
      .readdirSync(path.join(srcDir, 'components'), { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    expect(componentDirs.filter(dir => !map.has(dir))).toEqual([]);
    // Every mapped directory is a real one — no barrel names a component that does not exist.
    expect([...map.keys()].filter(dir => !componentDirs.includes(dir))).toEqual([]);
  });
});
