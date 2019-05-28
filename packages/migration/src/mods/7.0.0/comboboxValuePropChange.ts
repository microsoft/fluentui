import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

export default migration(
  'remove use of deprecated ComboBox props',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxProp('ComboBox', 'value', 'text')(node, modder);
    }).files;
  }
);
