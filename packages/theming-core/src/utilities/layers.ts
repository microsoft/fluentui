import { IThemeCore, ILayer, ILayers } from '../interfaces/index';
import { mergeLayerCollectionBase, IThemeLayersConfig, getLayerWorker } from '../generics/themeLayers';

/** parts of a layer to treat as sub-collections */
const _subCollections = ['selectors', 'overrides', 'slots'];

/**
 * layer configuration to use with internal theme layer code
 */
const _layerConfig: IThemeLayersConfig = {
  collections: _subCollections,
  overrides: {
    collection: 'overrides',
    applicableChildren: ['slots']
  }
};

/**
 * additional properties to strip from the layers
 */
const _nonStyleProps: string[] = ['parent', 'mixins', ..._subCollections];

/**
 * Resolve a layer, ensuring that parents are resolved and any appropriate rules are followed
 *
 * @param theme - theme to which this layer applies
 * @param input - string or an existing layer to resolve
 * @param base - a base layer to merge in below the theming layer.  Used for constant values
 * @param mixins - additional layers to apply as mixins to this layer
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function getResolvedLayer(theme: IThemeCore, input?: string | ILayer, base?: ILayer, mixins?: string[]): ILayer {
  return getLayerWorker(_layerConfig, theme.layerCache, {
    base,
    layer: input,
    mixins,
    childOverrides: mixins,
    applyOverrides: true
  }) || {};
}

/**
 * Strip unwanted properties from a style
 * @param target - object to remove the collection properties that shouldn't be returned as part of the style
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function stripNonStyleProps(target: object): void {
  for (const key of _nonStyleProps) {
    if (target[key]) {
      delete target[key];
    }
  }
}

/**
 * Merge two layer collections together
 * @param partial - a partial or potentially undefined collection of layers.  This will be added on top of the parent.
 * @param parent - a parent collection of layers, this will be used as the baseline
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function mergeLayerCollections(partial: ILayers | undefined, parent: ILayers): ILayers {
  return mergeLayerCollectionBase<ILayer>(_layerConfig.collections, parent, partial);
}
