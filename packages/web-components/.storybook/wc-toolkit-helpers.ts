/**
 * Storybook helpers for web components — derived from @wc-toolkit/storybook-helpers.
 *
 * This is a Lit-free fork that provides argTypes/args generation from the Custom Elements Manifest
 * without any dependency on Lit or template rendering. Template rendering is handled separately
 * by the FAST-based `renderComponent()` helper in `helpers.stories.ts`.
 *
 * @see https://github.com/wc-toolkit/storybook-helpers
 * @license MIT
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ArgTypes } from '@storybook/html';
import { action } from 'storybook/actions';

// Minimal types from the Custom Elements Manifest spec (custom-elements-manifest/schema.d.ts).
// Inlined to avoid NodeNext resolution issues with the package's main: schema.json.
type CEMPackage = {
  modules?: Array<{
    path: string;
    declarations?: any[];
    exports?: Array<{ kind: string; declaration: { name: string }; name?: string }>;
    typeDefinitionPath?: string;
  }>;
};

type CssCustomProperty = {
  name: string;
  description?: string;
  default?: string;
  type?: { text: string };
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ControlOptions =
  | 'text'
  | 'radio'
  | 'select'
  | 'boolean'
  | 'number'
  | 'color'
  | 'date'
  | 'object'
  | 'file'
  | 'inline-radio'
  | 'check'
  | 'inline-check'
  | 'multi-select';

export type Categories =
  | 'attributes'
  | 'cssParts'
  | 'cssProps'
  | 'cssStates'
  | 'events'
  | 'methods'
  | 'properties'
  | 'slots';

export type StorybookHelpersOptions = {
  /** hides the `arg ref` label on each control */
  hideArgRef?: boolean;
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef?: string;
  /** renders default values for attributes and CSS properties */
  renderDefaultValues?: boolean;
  /** Category order */
  categoryOrder?: Array<Categories>;
};

export type StoryOptions = {
  /** Categories to exclude from these stories */
  excludeCategories?: Array<Categories>;
};

export type StoryHelpers<T> = {
  /** Default args for the component stories */
  args: Partial<T> & { [key: string]: any };
  /** ArgTypes configuration for Storybook controls */
  argTypes: ArgTypes;
  /** Function to log events emitted by the component in the "Actions" panel */
  logEvent: (eventName: string, event: Event) => void;
  /** List of custom events emitted by the component */
  events: string[];
};

// ---------------------------------------------------------------------------
// CEM Utilities (inlined from @wc-toolkit/cem-utilities to avoid extra dep)
// ---------------------------------------------------------------------------

/**
 * Extended component type from the Custom Elements Manifest.
 */
type Component = Record<string, any> & {
  name: string;
  tagName?: string;
  customElement?: boolean;
  modulePath?: string;
  definitionPath?: string;
  typeDefinitionPath?: string;
  attributes?: any[];
  members?: any[];
  events?: any[];
  slots?: any[];
  cssProperties?: CssCustomProperty[];
  cssParts?: any[];
  cssStates?: any[];
};

const DOM_EVENTS = new Set([
  'AnimationEvent',
  'BeforeUnloadEvent',
  'ClipboardEvent',
  'CommandEvent',
  'DragEvent',
  'ErrorEvent',
  'Event',
  'FocusEvent',
  'FormDataEvent',
  'HashChangeEvent',
  'InputEvent',
  'KeyboardEvent',
  'MessageEvent',
  'MouseEvent',
  'MutationObserver',
  'NavigateEvent',
  'NavigationCurrentEntryChangeEvent',
  'PageRevealEvent',
  'PageSwapEvent',
  'PageTransitionEvent',
  'PointerEvent',
  'PopStateEvent',
  'ProgressEvent',
  'PromiseRejectionEvent',
  'StorageEvent',
  'SubmitEvent',
  'ToggleEvent',
  'TouchEvent',
  'TrackEvent',
  'TransitionEvent',
  'UIEvent',
  'WebGLContextEvent',
  'WheelEvent',
]);

let cachedComponents: Component[] = [];
let cachedManifest: unknown;
const definitionExports = new Map<string, string>();

function areObjectsEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => areObjectsEqual(item, obj2[index]));
  }
  const keys1 = Object.keys(obj1 as object);
  const keys2 = Object.keys(obj2 as object);
  if (keys1.length !== keys2.length) return false;
  if (!keys2.every(key => key in (obj1 as object))) return false;
  return keys1.every(key => {
    const val1 = (obj1 as Record<string, unknown>)[key];
    const val2 = (obj2 as Record<string, unknown>)[key];
    if (val1 === null && val2 === null) return true;
    if (val1 === null || val2 === null) return false;
    if (typeof val1 === 'object' && typeof val2 === 'object') return areObjectsEqual(val1, val2);
    return val1 === val2;
  });
}

function setAllDefinitionExports(customElementsManifest?: any) {
  if (!customElementsManifest?.modules?.length) return;
  (customElementsManifest as CEMPackage).modules?.forEach((mod: any) => {
    const defExports = mod?.exports?.filter((e: any) => e.kind === 'custom-element-definition');
    defExports?.forEach((e: any) => {
      if (e.declaration.name) {
        definitionExports.set(e.declaration.name, mod.path);
      }
    });
  });
}

function getAllComponents(customElementsManifest?: unknown): Component[] {
  if (!customElementsManifest) return [];
  if (areObjectsEqual(customElementsManifest as object, cachedManifest as object)) {
    return cachedComponents;
  }
  cachedComponents = [];
  cachedManifest = customElementsManifest;
  definitionExports.clear();
  setAllDefinitionExports(customElementsManifest);

  (customElementsManifest as CEMPackage).modules?.forEach((module: any) => {
    const declarations =
      module.declarations?.filter((d: any) => {
        const ce = d as unknown as Component;
        if (!ce.tagName || !ce.customElement) return false;
        ce.modulePath = module.path;
        ce.definitionPath = definitionExports.get(ce.name);
        if ('typeDefinitionPath' in module && module.typeDefinitionPath) {
          ce.typeDefinitionPath = (module as any).typeDefinitionPath as string;
        }
        return true;
      }) ?? [];
    cachedComponents.push(...(declarations as unknown as Component[]));
  });

  return cachedComponents;
}

function getComponentByTagName(customElementsManifest?: unknown, tagName?: string): Component | undefined {
  return getAllComponents(customElementsManifest).find(c => c?.tagName === tagName);
}

function getComponentPublicMethods(component?: Component): any[] {
  if (!component || !component.members) return [];
  const getParameter = (p: any) => p.name + getParamType(p) + getParamDefaultValue(p);
  const getParamType = (p: any) => (p.type?.text ? `${p.optional ? '?' : ''}: ${p.type?.text}` : '');
  const getParamDefaultValue = (p: any) => (p.default ? ` = ${p.default}` : '');

  return (
    (
      component?.members?.filter(
        member =>
          member.kind === 'method' &&
          member.privacy !== 'private' &&
          member.privacy !== 'protected' &&
          !member.name.startsWith('#'),
      ) as any[]
    )?.map(m => {
      m.type = {
        text: `${m.name}(${m.parameters?.map((p: any) => getParameter(p)).join(', ') || ''}) => ${
          m.return?.type?.text || 'void'
        }`,
      };
      return m;
    }) || []
  );
}

function getComponentEventsWithType(component?: any): any[] {
  if (!component || !component.events) return [];
  return (
    component.events.map((e: any) => {
      const type: string = e.type?.text;
      const eventType = DOM_EVENTS.has(type)
        ? type
        : type && type !== 'CustomEvent'
        ? `CustomEvent<${type}>`
        : 'CustomEvent';
      return { ...e, type: { text: eventType } };
    }) || []
  );
}

function removeQuotes(value: string) {
  return value.trim().replace(/^["'](.+(?=["']$))["']$/, '$1');
}

function getMemberDescription(description?: string, deprecated?: boolean | string) {
  if (!deprecated) return description || '';
  const desc = description ? `- ${description}` : '';
  return typeof deprecated === 'string' ? `@deprecated ${deprecated} ${desc}` : `@deprecated ${desc}`;
}

function toStorySlotName(slotName?: string): string {
  const normalized = (slotName || 'default').trim().toLowerCase();

  if (!normalized || normalized === 'default') {
    return 'slottedContent';
  }

  const words = normalized.split(/[-_\s]+/).filter(Boolean);
  const [first, ...rest] = words;

  return `${first}${rest.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}SlottedContent`;
}

// ---------------------------------------------------------------------------
// CEM Parser (inlined from @wc-toolkit/storybook-helpers/cem-parser)
// ---------------------------------------------------------------------------

type ArgSet = {
  resets?: ArgTypes;
  args: ArgTypes;
};

function getOptions(): StorybookHelpersOptions {
  return (globalThis as any)?.__WC_STORYBOOK_HELPERS_CONFIG__ || {};
}

export function getAttributesAndProperties(
  component?: Component,
  enabled = true,
): {
  resets?: ArgTypes;
  propArgs: ArgTypes;
  attrArgs: ArgTypes;
} {
  const resets: ArgTypes = {};
  const attrArgs: ArgTypes = {};
  const propArgs: ArgTypes = {};

  component?.members?.forEach(member => {
    if (member.kind !== 'field') return;

    const attribute = component.attributes?.find((x: any) => member.name === x.fieldName);
    const propName = member.name;
    const args = attribute ? attrArgs : propArgs;

    resets[propName] = { name: propName, table: { disable: true } };

    if (member.privacy === 'private' || member.privacy === 'protected' || member.static) return;

    const name = attribute?.name || member.name;
    const opts = getOptions();
    const type = opts.typeRef ? (member as any)[`${opts.typeRef}`]?.text || member?.type?.text : member?.type?.text;
    const propType = cleanUpType(type);
    const defaultValue = member.readonly ? undefined : removeQuotes(member.default || '');
    const control = getControl(propType, attribute !== undefined);

    args[name] = {
      name,
      description: getDescription(member.description, propName, member.deprecated as string),
      defaultValue: defaultValue
        ? defaultValue === "''"
          ? ''
          : control === 'object'
          ? JSON.parse(formatToValidJson(defaultValue))
          : defaultValue
        : undefined,
      control: enabled && !member.readonly && control ? { type: control } : false,
      table: {
        category: attribute ? 'attributes' : 'properties',
        defaultValue: { summary: defaultValue },
        type: { summary: type },
      },
    };

    const values = propType?.split('|');
    if (values && values.length > 1) {
      args[name].options = values.map(x => removeQuotes(x)!);
    }
  });

  return { resets, propArgs, attrArgs };
}

export function getCssProperties(component?: Component): ArgSet {
  const resets: ArgTypes = {};
  const args: ArgTypes = {};

  component?.cssProperties?.forEach(part => {
    resets[part.name] = { name: part.name, table: { disable: true } };
  });

  component?.cssProperties?.forEach(property => {
    args[property.name] = {
      name: property.name,
      description: property.description,
      defaultValue: property.default,
      control: false,
      table: { category: 'css custom properties' },
    };
  });

  return { resets, args };
}

export function getCssParts(component?: Component): ArgSet {
  const resets: ArgTypes = {};
  const args: ArgTypes = {};

  component?.cssParts?.forEach(part => {
    resets[part.name] = { name: part.name, table: { disable: true } };

    args[`${part.name}-part`] = {
      name: part.name,
      description: part.description,
      control: false,
      table: { category: 'css parts', type: {} },
    };
  });

  return { resets, args };
}

export function getCssStates(component?: Component): ArgSet {
  const resets: ArgTypes = {};
  const args: ArgTypes = {};

  component?.cssStates?.forEach(state => {
    resets[state.name] = { name: state.name, table: { disable: true } };

    args[`${state.name}-state`] = {
      name: state.name,
      description: state.description,
      control: false,
      table: { category: 'css states' },
    };
  });

  return { resets, args };
}

export function getSlots(component?: Component): ArgSet {
  const resets: ArgTypes = {};
  const args: ArgTypes = {};

  component?.slots?.forEach(slot => {
    resets[slot.name] = { name: slot.name, table: { disable: true } };

    const slotName = slot.name || 'default';
    const storySlotName = toStorySlotName(slotName);

    args[storySlotName] = {
      name: slotName === 'default' ? '' : slotName,
      description: slot.description || (slotName === 'default' ? 'The default slot' : `The ${slotName} slot`),
      control: false,
      table: { category: 'slots', type: {} },
    };
  });

  return { resets, args };
}

export function getEvents(component?: Component): ArgSet {
  const args: ArgTypes = {};
  const resets: ArgTypes = {};

  component?.events?.forEach(event => {
    resets[event.name] = { name: event.name, table: { disable: true } };
  });

  const events = getComponentEventsWithType(component);
  events?.forEach(event => {
    args[`${event.name}-event`] = {
      name: event.name,
      description: event.description,
      control: false,
      table: {
        category: 'events',
        type: { summary: event.type.text },
      },
    };
  });

  return { resets, args };
}

export function getMethods(component?: Component): ArgSet {
  const args: ArgTypes = {};
  const methods = getComponentPublicMethods(component);

  methods?.forEach(method => {
    // Skip `Changed` observer methods for FAST components.
    if (method.name.endsWith('Changed')) {
      return;
    }

    args[`${method.name}-method`] = {
      name: method.name,
      description: method.description,
      control: false,
      table: {
        category: 'methods',
        type: { summary: method.type.text },
      },
    };
  });

  return { args };
}

// ---------------------------------------------------------------------------
// Control type inference
// ---------------------------------------------------------------------------

function getControl(type: string, isAttribute = false): ControlOptions {
  if (!type) return 'text';
  const lowerType = type.toLowerCase();
  const options = lowerType
    .split('|')
    .map(x => x.trim())
    .filter(x => x !== '' && x !== 'null' && x !== 'undefined');

  if (isObject(lowerType) && !isAttribute) return 'object';
  if (hasType(options, 'boolean')) return 'boolean';
  if (hasType(options, 'number') && !hasType(options, 'string')) return 'number';
  if (hasType(options, 'date')) return 'date';
  return options.length > 1 ? 'select' : 'text';
}

function isObject(type: string) {
  return (
    type.includes('array') || type.includes('object') || type.includes('{') || type.includes('[') || type.includes('<')
  );
}

function hasType(values: string[] = [], type: string) {
  return values?.find(value => value === type) !== undefined;
}

function cleanUpType(type?: string): string {
  return !type
    ? ''
    : type
        .replace(' | undefined', '')
        .replace(' | null', '')
        .replace(' | void', '')
        .replace(' | any', '')
        .replace(' | unknown', '')
        .replace(' | string & {}', '|')
        .replace(' | (string & {})', '|')
        .replace(' | string', '|')
        .replace(' | number', '|')
        .replace(' | boolean', '|')
        .replace(' | object', '|')
        .replace(' | Function', '|')
        .replace(' | {}', '|')
        .replace(' | []', '|');
}

function getDescription(description?: string, argRef?: string, deprecated?: string) {
  let desc = getMemberDescription(description, deprecated);
  const opts = getOptions();
  return opts.hideArgRef || !argRef ? desc : (desc += `\n\n\narg ref - \`${argRef}\``);
}

function formatToValidJson(input: string): string {
  return input
    .replace(/'([^']+)'/g, '"$1"')
    .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
    .replace(/,\s*(}|])/g, '$1');
}

// ---------------------------------------------------------------------------
// Event logging (no Lit dependency)
// ---------------------------------------------------------------------------

/**
 * Logs an event to the Storybook Actions panel.
 */
export function logEvent(name: string, event: Event) {
  const eventData: Record<string, unknown> = {};
  for (const key in event) {
    try {
      const value = event[key as keyof Event];
      eventData[key] = value;
    } catch {
      // Skip properties that throw errors when accessed
    }
  }
  action(name)(eventData);
}

// ---------------------------------------------------------------------------
// Main API
// ---------------------------------------------------------------------------

let userOptions: StorybookHelpersOptions = (globalThis as any)?.__WC_STORYBOOK_HELPERS_CONFIG__ || {};

const defaultOptions: StorybookHelpersOptions = {
  typeRef: 'parsedType',
  categoryOrder: ['attributes', 'properties', 'slots', 'cssProps', 'cssParts', 'cssStates', 'methods', 'events'],
};

/**
 * Sets the global config for the Storybook helpers.
 */
export function setStorybookHelpersConfig(options: StorybookHelpersOptions) {
  options = { ...defaultOptions, ...options };
  (globalThis as any).__WC_STORYBOOK_HELPERS_CONFIG__ = options;
  userOptions = options;
}

/**
 * Gets Storybook helpers for a given component.
 *
 * Returns `args`, `argTypes`, `events`, and `logEvent` — everything needed for Storybook
 * controls. Template rendering is intentionally excluded; use your own FAST-based
 * `renderComponent()` instead.
 *
 * @param tagName - the tag name referenced in the Custom Elements Manifest
 * @param options - optional configuration
 */
export function getStorybookHelpers<T>(tagName: string, options?: StoryOptions): StoryHelpers<T> {
  userOptions = (globalThis as any)?.__WC_STORYBOOK_HELPERS_CONFIG__ || {};
  const cem = getManifest();
  const component = getComponent(cem, tagName);
  const eventNames = component?.events?.map((event: any) => event.name) || [];
  const argTypes = getArgTypes(component, options?.excludeCategories || []);

  return {
    args: getArgs<T>(argTypes),
    argTypes,
    events: eventNames,
    logEvent,
  };
}

function getManifest(): CEMPackage {
  const cem: CEMPackage = (window as any).__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
  if (!cem) {
    throw new Error(
      `Custom Elements Manifest not found. Ensure setCustomElementsManifest() is called in the Storybook preview file.\nhttps://www.npmjs.com/package/wc-storybook-helpers#before-you-install`,
    );
  }
  return cem;
}

function getComponent(cem: CEMPackage, tagName: string): Component | undefined {
  const component = getComponentByTagName(cem, tagName);
  if (!component) {
    throw new Error(
      `A component with the tag name "${tagName}" was not found in the Custom Elements Manifest. ` +
        `If it's missing in the CEM, it's often the result of a missing "@tag" or "@tagName" tag in the component's JSDoc.\n` +
        `https://custom-elements-manifest.open-wc.org/analyzer/getting-started/#supported-jsdoc`,
    );
  }
  return component;
}

function getArgTypes(component?: Component, excludeCategories?: Array<Categories>): ArgTypes {
  const cssProps = getCssProperties(component);
  const cssParts = getCssParts(component);
  const slots = getSlots(component);

  const attrsAndProps = getAttributesAndProperties(component);
  const events = getEvents(component);
  const cssStates = getCssStates(component);
  const methods = getMethods(component);

  const args: Record<Categories, ArgTypes> = {
    attributes: attrsAndProps.attrArgs,
    cssParts: cssParts.args,
    cssProps: cssProps.args,
    cssStates: cssStates.args,
    events: events.args,
    methods: methods.args,
    properties: attrsAndProps.propArgs,
    slots: slots.args,
  };

  const argTypes: ArgTypes = {};

  // Combine all resets
  Object.assign(
    argTypes,
    cssProps.resets,
    cssParts.resets,
    slots.resets,
    attrsAndProps.resets,
    events.resets,
    cssStates.resets,
    methods.resets,
  );

  userOptions.categoryOrder?.forEach(category => {
    if (excludeCategories?.includes(category)) return;
    Object.assign(argTypes, args[category]);
  });

  return argTypes;
}

function getArgs<T>(argTypes: ArgTypes): Partial<T> & { [key: string]: any } {
  const args: Partial<T> & { [key: string]: any } = {};
  for (const [key, value] of Object.entries(argTypes)) {
    if (value?.control) {
      const defaultVal = getDefaultValue(value.defaultValue);
      if (defaultVal !== undefined && defaultVal !== '') {
        args[key as keyof T] = defaultVal;
      }
    }
  }
  return args;
}

function getDefaultValue(value?: string | number | boolean | object) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}
