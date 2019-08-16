import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';
import { ModResult } from 'riceburn/lib/interfaces';

export default migration(
  'remove use of deprecated ComboBox props',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxProp('ComboBox', 'value', 'text')(node, modder);
    }).files;
  }
);
