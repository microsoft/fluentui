import type { ArgTypesExtractor } from 'storybook/internal/docs-tools';
import type { StrictArgTypes } from 'storybook/internal/types';

type NamedComponentLike = { displayName?: string; name?: string };

export function createStateDataAttributesExtractor(
  nativeExtractArgTypes: ArgTypesExtractor,
  metadata: Record<string, StrictArgTypes>,
): ArgTypesExtractor {
  return component => {
    const nativeRows = nativeExtractArgTypes(component);
    const namedComponent = component as NamedComponentLike | undefined;
    const generatedRows = metadata[namedComponent?.displayName || namedComponent?.name || ''];

    return generatedRows ? { ...generatedRows, ...nativeRows } : nativeRows;
  };
}
