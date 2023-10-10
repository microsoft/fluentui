import { canUseDOM } from '@fluentui/react-utilities';

/**
 * CSS Typed Object Model
 * @see https://drafts.css-houdini.org/css-typed-om-1/
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSUnitValue
 */
export interface CSSUnitValue {
  value: number;
  readonly unit: string;
}

/**
 * Style property map read only.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly
 */
export interface StylePropertyMapReadOnly {
  [Symbol.iterator](): IterableIterator<[string, CSSUnitValue[]]>;

  get(property: string): CSSUnitValue | undefined;
  getAll(property: string): CSSUnitValue[];
  has(property: string): boolean;
  readonly size: number;
}

/**
 * HTMLElement with styled map.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 */
export type HTMLElementWithStyledMap<T extends HTMLElement = HTMLElement> = T & {
  computedStyleMap(): StylePropertyMapReadOnly;
};

/**
 * CSS with number parsing.
 * @see https://drafts.css-houdini.org/css-typed-om-1/#css
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/number
 */
export type CSSWithNumber = typeof CSS & {
  number(value: number): {
    value: number;
    readonly unit: string;
  };
};

/**
 *
 * Gets the computed style of a given element.
 * If the browser supports CSSOM, it will return a ComputedStyleMap object.
 * Otherwise, it will return a CSSStyleDeclaration object.
 */
export const getCSSStyle = (node: HTMLElementWithStyledMap): CSSStyleDeclaration | StylePropertyMapReadOnly => {
  if (hasCSSOMSupport(node)) {
    return node.computedStyleMap() as unknown as StylePropertyMapReadOnly;
  }

  return getElementComputedStyle(node);
};

/**
 * Checks if the browser supports CSSOM.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 *
 * @param node - DOM node
 * @returns Whether the browser supports CSSOM
 */
export const hasCSSOMSupport = (node: HTMLElementWithStyledMap) => {
  /**
   * As we are using the experimental CSSOM API, we need to check if the browser supports it.
   * The typecast here is to allow the use of the `number` function that is not yet part of the CSSOM typings.
   * @see https://www.npmjs.com/package/@types/w3c-css-typed-object-model-level-1
   */
  return Boolean(typeof CSS !== 'undefined' && (CSS as CSSWithNumber).number && node.computedStyleMap);
};

/**
 * @internal
 *
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
export const getElementComputedStyle = (node: HTMLElement): CSSStyleDeclaration => {
  const win =
    canUseDOM() &&
    (node.ownerDocument?.defaultView ??
      // eslint-disable-next-line no-restricted-globals
      window);

  if (!win) {
    return {
      getPropertyValue: (_: string) => '',
    } as CSSStyleDeclaration;
  }

  return win.getComputedStyle(node, null);
};

/**
 * Converts a CSS duration string to milliseconds.
 *
 * @param duration - CSS duration string
 * @returns Duration in milliseconds
 */
export function toMs(duration: string): number {
  const trimmed = duration.trim();

  if (trimmed.includes('auto')) {
    return 0;
  }

  if (trimmed.endsWith('ms')) {
    const parsed = Number(trimmed.replace('ms', ''));

    return isNaN(parsed) ? 0 : parsed;
  }

  return Number(trimmed.slice(0, -1).replace(',', '.')) * 1000;
}

/**
 * Gets the computed map property for a given element using the CSSOM API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 *
 * @param computedStyle - Computed style of the element
 * @param prop - CSS property
 * @returns Computed map property
 */
export const getComputedMapProp = (computedStyle: StylePropertyMapReadOnly, prop: string): string[] => {
  const props = computedStyle.getAll(prop);

  if (props.length > 0) {
    return props.map(({ value, unit }) => `${value}${unit}`);
  }

  return ['0'];
};

/**
 * Gets the computed style property for a given element using the getComputedStyle API.
 *
 * @param computedStyle - Computed style of the element
 * @param prop - CSS property
 * @returns Computed style property
 */
export const getComputedStyleProp = (computedStyle: CSSStyleDeclaration, prop: string): string[] => {
  const propValue = computedStyle.getPropertyValue(prop);

  return propValue ? propValue.split(',') : ['0'];
};

/**
 * Gets the maximum duration from a list of CSS durations.
 *
 * @param durations - List of CSS durations
 * @param delays - List of CSS delays
 * @returns Maximum duration
 */
export const getMaxCSSDuration = (durations: string[], delays: string[]): number => {
  const totalProps = Math.max(durations.length, delays.length);
  const totalDurations = [];

  if (totalProps === 0) {
    return 0;
  }

  for (let i = 0; i < totalProps; i++) {
    const duration = toMs(durations[i] || '0');
    const delay = toMs(delays[i] || '0');

    totalDurations.push(duration + delay);
  }

  return Math.max(...totalDurations);
};

/**
 * Gets the motion information for a given element.
 *
 * @param computedStyle - Computed style of the element
 * @returns motion information
 */
export const getMotionDuration = (node: HTMLElementWithStyledMap) => {
  const hasModernCSSSupport = hasCSSOMSupport(node);
  const computedStyle = getCSSStyle(node);

  const getProp = (prop: string): string[] => {
    return hasModernCSSSupport
      ? getComputedMapProp(computedStyle as StylePropertyMapReadOnly, prop)
      : getComputedStyleProp(computedStyle as CSSStyleDeclaration, prop);
  };

  const transitionDuration = getMaxCSSDuration(getProp('transition-duration'), getProp('transition-delay'));
  const animationDuration = getMaxCSSDuration(getProp('animation-duration'), getProp('animation-delay'));

  return Math.max(transitionDuration, animationDuration);
};
