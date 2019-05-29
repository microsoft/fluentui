import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { moveImports } from '../../util/MoveImports';

const legacyExports = [
  'INav',
  'INavLink',
  'INavLinkGroup',
  'INavProps',
  'INavState',
  'INavStyleProps',
  'INavStyles',
  'isRelativeUrl',
  'Nav',
  'NavBase'
];

const fromPackage = 'office-ui-fabric-react';
const toPackage = '@uifabric/legacy';

export default migration(
  'Nav should come from @uifabric/legacy, not from office-ui-fabric-react',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.ts?(x)', opts).asTypescript((node, modder) => {
      return moveImports(node, modder, fromPackage, toPackage, legacyExports);
    }).files;
  }
);
