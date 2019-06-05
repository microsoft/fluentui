import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxNodeIfHasProp } from '../../util/CustomMods';

export default migration(
  'rename Button to SplitButton if split prop exists',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxNodeIfHasProp('Button', 'SplitButton', 'split')(node, modder);
    }).files;
  }
);
