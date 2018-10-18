import { IThemeCore, ILayer } from '../interfaces/index';
import { resolveLayerToStyle } from './resolvers';
import { getResolvedLayer } from './layers';

/**
 * properties that will be cascaded down as part of the style generation process.  This is primarily
 * for background color to ensure that code to automatically ensure text is visible can work
 * correctly across parts and expanders
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface ICollectibleStyles {
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Effectively a subset of IRawStyle or another platform specific style interface.  The only
 * requirement is that the collectible styles are standardized here
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IPartialStyle extends ICollectibleStyles {
  selectors?: { [key: string]: ICollectibleStyles };
}

/**
 * A partial structural generalization of fabric's component styles.  A button might have
 * root, stack, icon and so on and this allows mapping of that structure.
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IPartialComponentStyle {
  root: IPartialStyle;
  [key: string]: IPartialStyle;
}

function _collectTCProps(obj?: IPartialStyle): IPartialStyle {
  return {
    ...(obj && obj.backgroundColor && { backgroundColor: obj.backgroundColor }),
    ...(obj && obj.textColor && { textColor: obj.textColor })
  };
}

function _collectSelectorProps(obj: IPartialStyle, key?: string): IPartialStyle {
  return _collectTCProps(key ? (obj.selectors && obj.selectors[key]) : obj);
}

function _getEffectiveColors(thisStyle: IPartialStyle, baseStyle: IPartialStyle, key?: string, baseKey?: string): IPartialStyle {
  const parent = Object.assign({}, _collectTCProps(baseStyle), _collectTCProps(thisStyle));
  const merged = key && Object.assign({}, _collectSelectorProps(baseStyle, baseKey), _collectSelectorProps(thisStyle, key));
  return key ? Object.assign(parent, merged) : parent;
}

/**
 * Add selectors for any selectors defined in this layer's selector collection
 * @param theme - theme to use for lookups
 * @param result - selector collection to be added to (will be mutated!)
 * @param layer - layer which is providing selectors
 * @param baseStyle - baseline style to use to lookup values
 * @param className - optionally append a class name to this layer's selectors
 */
function _addSelectors(
  theme: IThemeCore,
  result: IPartialStyle['selectors'],
  layer: ILayer,
  baseStyle: IPartialStyle,
  className?: string
): void {
  const selectors = layer.selectors;
  if (selectors && result) {
    for (const key in selectors) {
      if (selectors.hasOwnProperty(key)) {
        const keyName = className ? key + ' .' + className : key;
        const effectiveColors = _getEffectiveColors(layer, baseStyle, key, keyName);
        result[keyName] = resolveLayerToStyle(theme, selectors[key], effectiveColors);
      }
    }
  }
}

/**
 * This ensures that if text color is set, selectors will include both old and new sets so that
 * text color resolution logic will happen on selectors
 * @param layer - layer being processed
 * @param baseSelectors - selectors from the base style
 * @param textColor - textColor for the root, if set
 */
function _propagateTextColor(layer: ILayer, baseSelectors: IPartialStyle['selectors'], textColor?: string): void {
  if (textColor && baseSelectors) {
    layer.selectors = layer.selectors || {};
    for (const selector in baseSelectors) {
      // add textColor to non-slot based selectors
      if (baseSelectors.hasOwnProperty(selector) && !layer.selectors[selector] && selector.split(' ').length === 1) {
        layer.selectors[selector] = { textColor };
      }
    }
  }
}

/**
 * This will take a layer, which optionally may have parts, and return a set of styles grouped in parts
 * @param theme - current theme, used to resolve values in the layer
 * @param layer - finalized layer, should have all parent resolution and state promotion already done
 * @param addSelectors - should selectors be added for this style
 * @param baseStyle - are there any inherited style values that need to be taken into account
 * @param slots - list of slots to add to the component style.  Existence in the list, even as an undefined string,
 * will cause the slot to be emitted
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function resolveLayerToComponentStyle(
  theme: IThemeCore,
  layer: ILayer,
  addSelectors: boolean,
  baseStyle: IPartialComponentStyle = { root: {} },
  slotClasses?: IGetComponentStyleProps['slots'],
): object {
  // resolve the root layer and update the collected props to be current after resolution
  const baseRootStyle = baseStyle.root;
  const rootStyle = resolveLayerToStyle(theme, layer, baseRootStyle);
  const rootTextColor = rootStyle.textColor || baseRootStyle.textColor;
  const result = { root: rootStyle };

  // add root selectors if so desired
  const selectors = addSelectors && {};
  if (addSelectors) {
    rootStyle.selectors = selectors;
    _propagateTextColor(layer, baseRootStyle.selectors, rootTextColor);
    _addSelectors(theme, selectors, layer, baseRootStyle);
  }

  // if slots are requested and are existing resolve those
  if (layer.slots) {
    for (const slot in layer.slots) {
      if (layer.slots.hasOwnProperty(slot)) {
        const slotLayer = layer.slots[slot];
        const slotBaseStyle = { ...(baseStyle[slot] || {}), selectors: baseRootStyle.selectors };
        result[slot] = resolveLayerToStyle(theme, slotLayer, slotBaseStyle);

        // add slot selectors to root if requested
        if (addSelectors && slotLayer.selectors) {
          _addSelectors(theme, selectors, slotLayer, slotBaseStyle, slotClasses && slotClasses[slot]);
        }
      }
    }
  }
  return result;
}

/**
 * properties for the get component style helper function.
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IGetComponentStyleProps {
  /**
   * Name of the layer to query from the theme
   */
  layer?: string | ILayer;

  /**
   * A constant layer to use as a baseline
   */
  constLayer?: ILayer;

  /**
   * A set of states or overrides to apply to the layer.  Typically these are things like disabled or primary
   * though any layer name is valid.  Stored in a space delimited string
   */
  states?: string;

  /**
   * Should selectors be applied to the resulting style, ignored if disabled is set
   */
  selectors?: boolean;

  /**
   * A mapping of slot to class names
   */
  slots?: {
    [slot: string]: string | undefined;
  };

  /**
   * A baseline component style to use for extracting background color for custom coloring.  This is expected
   * to have styles grouped under root and part names
   */
  style?: IPartialComponentStyle;
}

/**
 * This does the full process of resolving a layer to an actual style.  There are options for adding
 * selectors, providing additional states/overrides to the layer, and merging with a base layer.  The result
 * will be a style suitable for use in fabric's merge-styles code
 *
 * @param theme - current theme to extract information from
 * @param props - parameters that drive behavior for the worker function
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function getComponentStyles(theme: IThemeCore, props: IGetComponentStyleProps): object {
  const { layer, constLayer, states, selectors, slots } = props;
  const mixins = states ? states.split(' ') : undefined;

  // step one is to get the resolved layer that has all mixins and cascading applied
  const final = getResolvedLayer(theme, layer, constLayer, mixins);

  // now that needs to be turned into a component style
  const style = resolveLayerToComponentStyle(theme, final, !!selectors, props.style, slots);

  return style;
}
