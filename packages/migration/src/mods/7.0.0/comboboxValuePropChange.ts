import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';
import { ModResult } from 'riceburn/lib/interfaces';
import { getModificationNote } from '../../util/getMessages';

export default migration(
  getModificationNote('ComboBox deprecated prop value renamed to text'),
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxProp('ComboBox', 'value', 'text')(node, modder);
    }).files;
  }
);
