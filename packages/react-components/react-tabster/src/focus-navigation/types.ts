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
  excludeFromMover?: boolean;
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

// Numeric values matching the old tabster enums.
// Keeping numeric values avoids churn in test snapshots when tabster is replaced.
const DIRECTION_TO_NUMBER: Record<MoverDirection, number> = {
  both: 0,
  vertical: 1,
  horizontal: 2,
  grid: 3,
  gridLinear: 4,
};

const NUMBER_TO_DIRECTION: Record<number, MoverDirection> = {
  0: 'both',
  1: 'vertical',
  2: 'horizontal',
  3: 'grid',
  4: 'gridLinear',
};

const RESTORER_TYPE_TO_NUMBER: Record<RestorerType, number> = {
  source: 0,
  target: 1,
};

const NUMBER_TO_RESTORER_TYPE: Record<number, RestorerType> = {
  0: 'source',
  1: 'target',
};

/**
 * Parse the data-tabster attribute of an element into a NavConfig.
 * Returns null if the attribute is absent or invalid JSON.
 * Handles both numeric direction values (legacy tabster format) and strings.
 */
export function getNavConfig(element: Element): NavConfig | null {
  const attr = element.getAttribute(TABSTER_ATTRIBUTE_NAME);
  if (!attr) {
    return null;
  }
  try {
    const parsed = JSON.parse(attr) as NavConfig & {
      mover?: { direction?: number | MoverDirection };
      restorer?: { type?: number | RestorerType };
    };
    if (parsed.mover && typeof parsed.mover.direction === 'number') {
      parsed.mover = {
        ...parsed.mover,
        direction: NUMBER_TO_DIRECTION[parsed.mover.direction as number] ?? 'vertical',
      };
    }
    if (parsed.restorer && typeof parsed.restorer.type === 'number') {
      parsed.restorer = {
        ...parsed.restorer,
        type: NUMBER_TO_RESTORER_TYPE[parsed.restorer.type as number] ?? 'target',
      };
    }
    return parsed as NavConfig;
  } catch {
    return null;
  }
}

/**
 * Serialize a NavConfig to a data-tabster attribute string.
 * Mover direction is stored as a number (matching the legacy tabster format) to avoid snapshot churn.
 */
export function serializeNavConfig(config: NavConfig): string {
  const out: Record<string, unknown> = { ...config };
  if (config.mover?.direction) {
    const { direction, ...restMover } = config.mover;
    out.mover = { ...restMover, direction: DIRECTION_TO_NUMBER[direction] };
  }
  if (config.restorer?.type) {
    out.restorer = { ...config.restorer, type: RESTORER_TYPE_TO_NUMBER[config.restorer.type] };
  }
  return JSON.stringify(out);
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
