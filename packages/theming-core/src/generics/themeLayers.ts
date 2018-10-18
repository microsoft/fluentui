/**
 * Configuration for the layer functionality
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IThemeLayersConfig {
  /**
   * A list of children of a given layer to be treated as subcollections.  While the contents of a layer
   * are normally assigned, the sub-collections will be recursively merged.  While each entry can be any
   * type, it will be treated as a collection if the value is truthy
   */
  collections?: string[];

  /**
   * Optional configuration object for using override behavior.  This is a subcollection within a layer
   * that will conditionally override values.
   */
  overrides?: {
    /**
     * what is the key of the collection to use.  So for layer.overrides pass 'overrides'
     */
    collection: string;

    /**
     * sub-collections which can have override behaviors as well
     */
    applicableChildren?: string[];
  };
}

/**
 * Base layer type.  Adds parent to caller defined contents
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IThemeLayerBase<IContents> = IContents & {
  parent?: string | string[];
  mixins?: string[];
};

/**
 * Base layer collection type.
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IThemeLayersBase<IContents> {
  [layer: string]: IThemeLayerBase<IContents>;
}

// shortened values to make the internal code easier to read
type ILYR<C> = IThemeLayerBase<C>;
type ILYRC<C> = IThemeLayersBase<C>;

/**
 * How child layers should be communicated to the configuration
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type ILayerCollections = IThemeLayersConfig['collections'];

/**
 * Merge two layers together, ensuring to recursively merge sub collections
 * @param collections - an array of sub-collections for a given layer
 * @param l1 - the first layer to merge together, this will provide the base
 * @param l2 - second layer to merge on top of the first layer
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function mergeLayerBase<IContent>(
  collections: ILayerCollections,
  l1: IThemeLayerBase<IContent>,
  l2: IThemeLayerBase<IContent>
): IThemeLayerBase<IContent> {
  if (l1 && l2) {
    const result = Object.assign({}, l1, l2);
    if (collections) {
      for (const key of collections) {
        if (l1[key] && l2[key]) {
          result[key] = mergeLayerCollectionBase<IContent>(collections, l1[key], l2[key]);
        }
      }
    }
    return result;
  }
  return l1 || l2 || ({} as IThemeLayerBase<IContent>);
}

/**
 * This will take two layer collections and merge them together.  It is designed to be used in theme
 * resolvers with the theme registry.
 * @param collections - a set of keys that should be treated as subcollections in a given layer
 * @param c1 - base layer collection to be merged, this will be applied first
 * @param c2 - next layer collection to be merged, this is applied on top of l1
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function mergeLayerCollectionBase<IContent>(
  collections: ILayerCollections,
  c1: IThemeLayersBase<IContent> | undefined,
  c2: IThemeLayersBase<IContent> | undefined
): IThemeLayersBase<IContent> {
  // start with an assign which will generate a superset
  const result = Object.assign({}, c1, c2);

  // now merge results for ones where both exist in the original
  if (c1 && c2) {
    for (const key in result) {
      if (result.hasOwnProperty(key) && c1.hasOwnProperty(key) && c2.hasOwnProperty(key)) {
        result[key] = mergeLayerBase<IContent>(collections, c1[key], c2[key]);
      }
    }
  }
  return result;
}

function _addMixins(mixins: string[], ...additional: string[]): void {
  for (const add of additional) {
    if (mixins.indexOf(add) < 0) {
      mixins.push(add);
    }
  }
}

function _updateLayerFromParts<C>(
  collections: ILayerCollections,
  source: IThemeLayersBase<C> | string | undefined,
  layer: IThemeLayerBase<C>,
  parentMode: boolean,
  lookups?: string[],
): IThemeLayerBase<C> {
  if (parentMode && layer.parent) {
    lookups = typeof layer.parent === 'string' ? [layer.parent] : layer.parent;
    layer.parent = undefined;
  }
  if (typeof source === 'string') {
    source = layer[source];
  }
  if (lookups && source) {
    const mixins = (layer.mixins && [...layer.mixins]) || [];
    let result: ILYR<C> = parentMode ? ({} as ILYR<C>) : layer;
    for (const name of lookups) {
      const lookup = parentMode
        ? _getLayerWithResolvedParent(collections, source as ILYRC<C>, name) : source[name];
      if (lookup) {
        if (parentMode && lookup.mixins) {
          _addMixins(mixins, ...lookup.mixins);
        }
        result = mergeLayerBase<C>(collections, result, lookup);
      }
      _addMixins(mixins, name);
    }
    if (parentMode) {
      result = mergeLayerBase<C>(collections, result, layer);
    }
    result.mixins = mixins;
    return result;
  }
  return layer;
}

function _updateLayerChildrenFromParts<C>(
  collections: ILayerCollections,
  children: ILayerCollections,
  source: ILYRC<C> | string,
  layer: ILYR<C>,
  parentMode: boolean,
  lookups?: string[]
): void {
  if (children && layer) {
    for (const child in children) {
      if (layer[child]) {
        const subCollection = layer[child] && { ...(layer[child] as ILYRC<C>) };
        layer[child] = subCollection;
        for (const childKey in subCollection) {
          if (subCollection.hasOwnProperty(childKey)) {
            subCollection[childKey] = _updateLayerFromParts(
              collections,
              source,
              subCollection[childKey],
              parentMode,
              lookups
            );
          }

        }
      }
    }
  }
}

/**
 *
 * @param collections - child keys to treat as sub-collections
 * @param source
 * @param layer
 */
function _getLayerWithResolvedParent<C>(
  collections: ILayerCollections,
  source: ILYRC<C>,
  layer?: string | ILYR<C>
): ILYR<C> | undefined {
  if (layer) {
    const nameLookup = typeof layer === 'string';
    let result: ILYR<C> = nameLookup ? source[layer as string] : layer as ILYR<C>;
    if (result) {
      if (result.parent) {
        result = _updateLayerFromParts<C>(collections, source, result, true);
        _updateLayerChildrenFromParts<C>(collections, collections, source, result, true);
        if (nameLookup) {
          source[layer as string] = result;
        }
      }
      return result;
    }
  }
}

/**
 * props for the getLayerWorker
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IGetLayerWorkerProps<IContent> {
  /**
   * Layer to use for baseline values.  Parents in this layer will not be resolved, it will be taken as is.
   */
  base?: IThemeLayerBase<IContent>;

  /**
   * Layer to perform most work on, if this is a name that will be used as a lookup in the passed in layers.  Parent
   * relationships will be resolved for layer, the results will be merged with base, and any additional operations
   * requested will be performed upon the resulting layer.
   */
  layer?: IThemeLayerBase<IContent> | string;

  /**
   * Additional parents to apply to the resulting layer
   */
  mixins?: string[];

  /**
   * Whether or not to apply overrides to the current layer.  This will happen after all parent resolution
   * and state mixins are applied.  At this point the full list of parents will be looked up against any information in
   * the overrides collection.  On a match those values will be promoted and overwrite the base layer.
   */
  applyOverrides?: boolean;

  /**
   * The list of overrides to apply to the applicable sub collections
   */
  childOverrides?: string[];
}

/**
 * Primary helper function to get a layer and do any of the requested resolution logic required
 *
 * @param config - configuration object for the layer code
 * @param layers - layer collection to use to look up named layers
 * @param props - IGetLayerWorkerProps object to configure behavior for the API
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function getLayerWorker<IContent>(
  config: IThemeLayersConfig,
  layers: IThemeLayersBase<IContent>,
  props: IGetLayerWorkerProps<IContent>
): IThemeLayerBase<IContent> | undefined {
  const { collections, overrides } = config;
  const { base, mixins, applyOverrides, childOverrides } = props;

  // get a resolved layer, utilizing the cache if present
  let layer = _getLayerWithResolvedParent<IContent>(collections, layers, props.layer);

  if (base && layer) {
    layer = mergeLayerBase<IContent>(collections, base, layer);
  } else if (base) {
    layer = Object.assign({}, base);
  }

  // at this point there is only work to do if there is a layer.  It should be a copy and safe to modify.
  if (layer) {
    // add mixins
    layer = _updateLayerFromParts(collections, layers, layer, false, mixins);

    // if the configuration uses an override layer then additional processing may be required
    if (overrides) {
      const { collection, applicableChildren } = overrides;

      // if we are applying overrides add all the accumulated mixins to the base layer
      if (applyOverrides) {
        layer = _updateLayerFromParts(collections, layer[collection], layer, false, layer.mixins);
      }

      // if child overrides are specified merge in their override behaviors
      _updateLayerChildrenFromParts(collections, applicableChildren, collection, layer,
        false, childOverrides);
    }
  }
  return layer;
}
