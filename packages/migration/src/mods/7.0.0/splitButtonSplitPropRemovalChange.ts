import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { removeProp } from '../../util/CustomMods';

export default migration(
  'remove deprecated split prop from SplitButton',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return removeProp('SplitButton', 'split')(node, modder);
    }).files;
  }
);
