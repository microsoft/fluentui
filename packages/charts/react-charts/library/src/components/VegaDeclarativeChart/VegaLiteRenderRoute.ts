import type { VegaLiteSemanticMode, VegaLiteSpec } from './VegaLiteTypes';
import { readVegaOwnData } from './VegaLiteField';
import { canRenderVegaRangedSpec } from './VegaLiteRangedGeometry';
import { canRenderVegaCenteredAreaSpec } from './VegaLiteCenteredAreaCapabilities';

export type VegaRenderRoute = 'native' | 'ranged' | 'centered-area';

/** Preserve the old native grouped route, not newly supported range/independent-offset geometry. */
function isLegacyGroupedBar(spec: VegaLiteSpec): boolean {
  if (spec.layer) {
    return (
      spec.layer.length === 1 &&
      isLegacyGroupedBar({
        ...spec.layer[0],
        encoding: { ...spec.encoding, ...spec.layer[0].encoding },
      })
    );
  }
  const mark = typeof spec.mark === 'object' ? spec.mark : { type: spec.mark };
  const encoding = spec.encoding;
  if (!encoding?.x || !encoding.y) {
    return false;
  }
  return (
    mark.type === 'bar' &&
    readVegaOwnData(mark, 'orient') !== 'horizontal' &&
    readVegaOwnData(mark, 'cornerRadiusEnd') === undefined &&
    (encoding.x.type === 'nominal' ||
      encoding.x.type === 'ordinal' ||
      (encoding.x.type === undefined && !!encoding.x.field)) &&
    (encoding.y.type === 'quantitative' || (encoding.y.type === undefined && encoding.y.aggregate !== undefined)) &&
    !!encoding.color?.field &&
    encoding.xOffset?.field === encoding.color.field &&
    !encoding.x2 &&
    !encoding.y2 &&
    !encoding.yOffset &&
    encoding.y.stack !== 'center'
  );
}

/**
 * Structural routing only: prepared geometry and native-source metadata have different provenance.
 * Preflight may pass its safe inherited snapshot for both. Never classify, infer types, or execute
 * transforms here, and never attach a static geometry route to a native kind.
 */
export function getVegaRenderRoute(
  preparedSpec: VegaLiteSpec,
  nativeSourceSpec: VegaLiteSpec,
  mode: VegaLiteSemanticMode = 'legacy',
): VegaRenderRoute {
  if (canRenderVegaCenteredAreaSpec(preparedSpec)) {
    return 'centered-area';
  }
  if (canRenderVegaRangedSpec(preparedSpec) && !(mode === 'legacy' && isLegacyGroupedBar(nativeSourceSpec))) {
    return 'ranged';
  }
  return 'native';
}
