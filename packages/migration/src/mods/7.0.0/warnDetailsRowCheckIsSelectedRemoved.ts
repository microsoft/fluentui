import { migration } from '../../migration';
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
export default migration('Deprecated DetailsRowCheck.isSelected has been removed. Use DetailsRowCheck.selected instead.', () => {
  mod('**/*.ts?(x)').asTypescript((node, modder) => {
    return renameJsxProp('DetailsRowCheck', 'isSelected', 'selected')(node, modder);
  });
});
