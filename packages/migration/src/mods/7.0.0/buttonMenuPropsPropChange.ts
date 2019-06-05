import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

export default migration(
  'rename deprecated Button props from menuProps to menu',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxProp('Button', 'menuProps', 'menu')(node, modder);
    }).files;
  }
);
