import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

/**
 * A code mod that transforms the following usage of
 * the deprecated prop {@link DetailsRowCheck.isSelected}:
 *
 * `<DetailsRowCheck canSelect={true} isSelected={true} />`
 *
 * to {@link DetailsRowCheck.selected}:
 *
 * `<DetailsRowCheck canSelect={true} selected={true} />;`
 *
 * to assist with Fabric 7.0 migration.
 */
export default migration(
  'Deprecated DetailsRowCheck.isSelected has been removed. Use DetailsRowCheck.selected instead.',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.ts?(x)', opts).asTypescript((node, modder) => {
      return renameJsxProp('DetailsRowCheck', 'isSelected', 'selected')(node, modder);
    }).files;
  }
);
