export { Async } from './Async';
export type { ICancelable } from './Async';
export { AutoScroll } from './AutoScroll';
export {
  // eslint-disable-next-line deprecation/deprecation
  BaseComponent,
  nullRender,
} from './BaseComponent';
export type { IBaseProps } from './BaseComponent.types';
export { DelayedRender } from './DelayedRender';
export type { IReactProps } from './React.types';
export type { IDelayedRenderProps, IDelayedRenderState } from './DelayedRender';
export { EventGroup } from './EventGroup';
export type { IDeclaredEventsByName, IEventRecord, IEventRecordList, IEventRecordsByName } from './EventGroup';
export { FabricPerformance } from './FabricPerformance';
export type { IPerfData, IPerfMeasurement, IPerfSummary } from './FabricPerformance';
export { GlobalSettings } from './GlobalSettings';
export type { IChangeDescription, IChangeEventCallback } from './GlobalSettings';
export type {
  // eslint-disable-next-line deprecation/deprecation
  IClassNames,
} from './IClassNames';
export type { IComponentAs, IComponentAsProps } from './IComponentAs';
export type { IDisposable } from './IDisposable';
export type {
  // eslint-disable-next-line deprecation/deprecation
  IPoint,
  Point,
} from './Point';
export type { IRectangle } from './IRectangle';
export type { IRenderComponent } from './IRenderComponent';
export type { IRenderFunction } from './IRenderFunction';
export type { ISize } from './ISize';
export type { IStyleFunction } from './IStyleFunction';
export { KeyCodes } from './KeyCodes';
export { Rectangle } from './Rectangle';
export { appendFunction } from './appendFunction';
export { mergeAriaAttributeValues } from './aria';
export {
  addElementAtIndex,
  arraysEqual,
  createArray,
  find,
  findIndex,
  flatten,
  removeIndex,
  replaceElement,
  toMatrix,
} from './array';
export { asAsync } from './asAsync';
export type { IAsAsyncOptions } from './asAsync';
export { assertNever } from './assertNever';
export { classNamesFunction } from './classNamesFunction';
export type { IClassNamesFunctionOptions } from './classNamesFunction';
export { composeComponentAs } from './componentAs/composeComponentAs';
export { isControlled } from './controlled';
export type { IRefObject, RefObject } from './createRef';
export { css } from './css';
export type { ICssInput, IDictionary, ISerializableObject } from './css';
export { Customizations } from './customizations/Customizations';
export type {
  ICustomizations,
  ISettings,
  ISettingsFunction,
  // eslint-disable-next-line deprecation/deprecation
  Settings,
  // eslint-disable-next-line deprecation/deprecation
  SettingsFunction,
} from './customizations/Customizations';
export {
  // eslint-disable-next-line deprecation/deprecation
  Customizer,
} from './customizations/Customizer';
export type { ICustomizerProps } from './customizations/Customizer.types';
export { CustomizerContext } from './customizations/CustomizerContext';
export type { ICustomizerContext } from './customizations/CustomizerContext';
export { customizable } from './customizations/customizable';
export { useCustomizationSettings } from './customizations/useCustomizationSettings';
export { mergeCustomizations } from './customizations/mergeCustomizations';
export { mergeScopedSettings, mergeSettings } from './customizations/mergeSettings';
export {
  DATA_PORTAL_ATTRIBUTE,
  elementContains,
  elementContainsAttribute,
  findElementRecursive,
  getChildren,
  getDocument,
  getFirstVisibleElementFromSelector,
  getParent,
  getRect,
  getVirtualParent,
  getWindow,
  isVirtualElement,
  on,
  portalContainsElement,
  // eslint-disable-next-line deprecation/deprecation
  raiseClick,
  setPortalAttribute,
  setVirtualParent,
} from './dom';
export type { IVirtualElement } from './dom';
export { extendComponent } from './extendComponent';
export {
  doesElementContainFocus,
  focusAsync,
  focusFirstChild,
  getElementIndexPath,
  getFirstFocusable,
  getFirstTabbable,
  getFocusableByIndexPath,
  getLastFocusable,
  getLastTabbable,
  getNextElement,
  getPreviousElement,
  isElementFocusSubZone,
  isElementFocusZone,
  isElementTabbable,
  isElementVisible,
  isElementVisibleAndNotHidden,
  shouldWrapFocus,
} from './focus';
export { getId, resetIds } from './getId';
export { getNativeElementProps } from './getNativeElementProps';
export { hoistMethods, unhoistMethods } from './hoist';
export { hoistStatics } from './hoistStatics';
export { initializeComponentRef } from './initializeComponentRef';
export {
  // eslint-disable-next-line deprecation/deprecation
  initializeFocusRects,
} from './initializeFocusRects';
export { FocusRectsProvider } from './FocusRectsProvider';
export type { FocusRectsProviderProps } from './FocusRectsProvider';
export { FocusRects, FocusRectsContext, useFocusRects } from './useFocusRects';
export type { IFocusRectsContext } from './useFocusRects';
export { getInitials } from './initials';
export { addDirectionalKeyCode, isDirectionalKeyCode, removeDirectionalKeyCode } from './keyboard';
export {
  getLanguage,
  // eslint-disable-next-line deprecation/deprecation
  setLanguage,
} from './language';
export { calculatePrecision, fitContentToBounds, getDistanceBetweenPoints, precisionRound } from './math';
export type { FitMode, IFitContentToBoundsOptions } from './math';
export { createMemoizer, memoize, memoizeFunction, resetMemoizations, setMemoizeWeakMap } from './memoize';
export { merge } from './merge';
export { isIOS } from './mobileDetector';
export { modalize } from './modalize';
export { assign, filteredAssign, mapEnumByName, shallowCompare, values, omit } from './object';
export { isMac } from './osDetector';
export { hasHorizontalOverflow, hasOverflow, hasVerticalOverflow } from './overflow';
export {
  anchorProperties,
  audioProperties,
  baseElementEvents,
  baseElementProperties,
  buttonProperties,
  colGroupProperties,
  colProperties,
  divProperties,
  formProperties,
  getNativeProps,
  htmlElementProperties,
  iframeProperties,
  // eslint-disable-next-line deprecation/deprecation
  imageProperties,
  imgProperties,
  inputProperties,
  labelProperties,
  liProperties,
  olProperties,
  optionProperties,
  selectProperties,
  tableProperties,
  tdProperties,
  textAreaProperties,
  thProperties,
  trProperties,
  videoProperties,
} from './properties';
export { composeRenderFunction } from './renderFunction/composeRenderFunction';
export {
  // eslint-disable-next-line deprecation/deprecation
  getResourceUrl,
  // eslint-disable-next-line deprecation/deprecation
  setBaseUrl,
} from './resources';
export { getRTL, getRTLSafeKeyCode, setRTL } from './rtl';
export { safeRequestAnimationFrame } from './safeRequestAnimationFrame';
export { safeSetTimeout } from './safeSetTimeout';
export {
  DATA_IS_SCROLLABLE_ATTRIBUTE,
  allowOverscrollOnElement,
  allowScrollOnElement,
  disableBodyScroll,
  enableBodyScroll,
  findScrollableParent,
  getScrollbarWidth,
} from './scroll';
export {
  SELECTION_CHANGE,
  SELECTION_ITEMS_CHANGE,
  Selection,
  SelectionDirection,
  SelectionMode,
} from './selection/index';
export type {
  IObjectWithKey,
  ISelection,
  ISelectionOptions,
  ISelectionOptionsWithRequiredGetKey,
} from './selection/index';
export { format } from './string';
export { styled } from './styled';
export type { ICustomizableProps, IPropsWithStyles, StyleFunction } from './styled';
export {
  resetControlledWarnings,
  setWarningCallback,
  warn,
  warnConditionallyRequiredProps,
  warnControlledUsage,
  warnDeprecations,
  warnMutuallyExclusive,
} from './warn';
export type { ISettingsMap, IWarnControlledUsageParams } from './warn';
export { isIE11 } from './ie11Detector';
export { getPropsWithDefaults } from './getPropsWithDefaults';
export { setFocusVisibility, IsFocusVisibleClassName } from './setFocusVisibility';
export { canUseDOM } from './dom/canUseDOM';
// eslint-disable-next-line deprecation/deprecation
export { setSSR } from './dom/setSSR';
export { createMergedRef } from './createMergedRef';
export { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

import './version';

// eslint-disable-next-line deprecation/deprecation
export type { IStyleFunctionOrObject, Omit } from '@fluentui/merge-styles';

export {
  MergeStylesShadowRootProvider_unstable,
  useAdoptedStylesheet_unstable,
} from './shadowDom/MergeStylesShadowRootContext';

export { MergeStylesRootProvider_unstable } from './shadowDom/MergeStylesRootContext';
