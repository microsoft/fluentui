/**
 * Attribute name used on DOM elements to carry navigation configuration JSON.
 * Keeping the same name as tabster for DOM compatibility with useMergedTabsterAttributes_unstable.
 */
export const TABSTER_ATTRIBUTE_NAME = 'data-tabster' as const;

/**
 * DOM attribute object spread onto React elements.
 */
export type TabsterDOMAttribute = { [TABSTER_ATTRIBUTE_NAME]?: string };

// ---------------------------------------------------------------------------
// Mover (arrow key navigation)
// ---------------------------------------------------------------------------

export type MoverDirection = 'vertical' | 'horizontal' | 'grid' | 'gridLinear' | 'both';

export type MoverConfig = {
  direction?: MoverDirection;
  cyclic?: boolean;
  memorizeCurrent?: boolean;
  tabbable?: boolean;
  hasDefault?: boolean;
};

// ---------------------------------------------------------------------------
// Groupper (tab key grouping)
// ---------------------------------------------------------------------------

export type GroupperTabbability = 'unlimited' | 'limited' | 'limited-trap';

export type GroupperConfig = {
  tabbability?: GroupperTabbability;
};

// ---------------------------------------------------------------------------
// Modalizer (modal focus trap)
// ---------------------------------------------------------------------------

export type ModalizerConfig = {
  id: string;
  isOthersAccessible?: boolean;
  isAlwaysAccessible?: boolean;
  isTrapped?: boolean;
};

// ---------------------------------------------------------------------------
// Restorer (focus restoration)
// ---------------------------------------------------------------------------

export type RestorerType = 'source' | 'target';

export type RestorerConfig = {
  type: RestorerType;
};

// ---------------------------------------------------------------------------
// Observed element (focus-on-name)
// ---------------------------------------------------------------------------

export type ObservedConfig = {
  names: string[];
};

// ---------------------------------------------------------------------------
// Focusable options (ignoreKeydown)
// ---------------------------------------------------------------------------

export type FocusableConfig = {
  ignoreKeydown?: Record<string, boolean>;
};

// ---------------------------------------------------------------------------
// Uncontrolled (opt-out of navigation management)
// ---------------------------------------------------------------------------

export type UncontrolledConfig = Record<string, never>;

// ---------------------------------------------------------------------------
// Full navigation configuration stored in data-tabster JSON
// ---------------------------------------------------------------------------

export type NavConfig = {
  mover?: MoverConfig;
  groupper?: GroupperConfig;
  modalizer?: ModalizerConfig;
  restorer?: RestorerConfig;
  observed?: ObservedConfig;
  focusable?: FocusableConfig;
  uncontrolled?: UncontrolledConfig;
};

/**
 * Parse the data-tabster attribute of an element into a NavConfig.
 * Returns null if the attribute is absent or invalid JSON.
 */
export function getNavConfig(element: Element): NavConfig | null {
  const attr = element.getAttribute(TABSTER_ATTRIBUTE_NAME);
  if (!attr) {
    return null;
  }
  try {
    return JSON.parse(attr) as NavConfig;
  } catch {
    return null;
  }
}

/**
 * Serialize a NavConfig to a data-tabster attribute string.
 */
export function serializeNavConfig(config: NavConfig): string {
  return JSON.stringify(config);
}

/**
 * Walk up the DOM tree from startElement and return the first ancestor
 * (inclusive) that has a NavConfig containing the given key.
 * Stops at an uncontrolled boundary.
 */
export function findAncestorWithNavKey<K extends keyof NavConfig>(
  startElement: Element | null,
  key: K,
): Element | null {
  let el: Element | null = startElement;
  while (el) {
    const config = getNavConfig(el);
    if (config) {
      if (config[key] !== undefined) {
        return el;
      }
      if (config.uncontrolled !== undefined) {
        return null;
      }
    }
    el = el.parentElement;
  }
  return null;
}
