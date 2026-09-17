import { tokens } from '@fluentui/tokens';
import type {
  ComponentStyleSpec,
  StyleCondition,
  StyleRule,
  StyleValue,
  TokenReference,
  VarReference,
  ConcatValue,
} from './types';
import { ROOT_SLOT } from './types';

/**
 * @public
 */
export interface ValidationIssue {
  /**
   * JSON pointer-like path to the offending node, e.g. `rules[3].when.variants.size`.
   */
  path: string;
  message: string;
}

/**
 * @public
 */
export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

const KNOWN_TOKEN_NAMES: ReadonlySet<string> = new Set(Object.keys(tokens));

const SPEC_KEYS = new Set(['$schema', 'name', 'version', 'description', 'slots', 'variants', 'states', 'rules']);
const VARIANT_KEYS = new Set(['values', 'default', 'description']);
const STATE_KEYS = new Set(['type', 'description']);
const RULE_KEYS = new Set(['slot', 'when', 'declarations', 'description']);
const CONDITION_KEYS = new Set(['variants', 'states', 'pseudo', 'rootPseudo', 'media', 'supports']);

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;
const IDENTIFIER = /^[a-z][A-Za-z0-9-]*$/;
const CUSTOM_PROPERTY = /^--[A-Za-z0-9_-]+$/;
const CAMEL_CASE_PROPERTY = /^[a-z][A-Za-z0-9]*$/;
const HARDCODED_COLOR = /(^#[0-9a-f]{3,8}$)|(^(rgb|rgba|hsl|hsla)\()/i;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isTokenReference = (value: unknown): value is TokenReference =>
  isPlainObject(value) && typeof value.token === 'string';
const isVarReference = (value: unknown): value is VarReference => isPlainObject(value) && typeof value.var === 'string';
const isConcatValue = (value: unknown): value is ConcatValue => isPlainObject(value) && Array.isArray(value.concat);

/**
 * Checks whether the given name is a known `@fluentui/tokens` token.
 *
 * @public
 */
export function isKnownToken(name: string): boolean {
  return KNOWN_TOKEN_NAMES.has(name);
}

/**
 * Validates a spec structurally and semantically. Never throws; see `assertValidSpec` for the throwing variant.
 *
 * @public
 */
export function validateSpec(input: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];
  const push = (path: string, message: string) => issues.push({ path, message });

  if (!isPlainObject(input)) {
    push('', 'spec must be an object');
    return { valid: false, issues };
  }

  rejectUnknownKeys(input, SPEC_KEYS, '', push);

  if (typeof input.name !== 'string' || !PASCAL_CASE.test(input.name)) {
    push('name', 'name must be a PascalCase string');
  }
  if (input.version !== 1) {
    push('version', 'version must be 1');
  }
  if (input.$schema !== undefined && typeof input.$schema !== 'string') {
    push('$schema', '$schema must be a string');
  }
  if (input.description !== undefined && typeof input.description !== 'string') {
    push('description', 'description must be a string');
  }

  const slots = new Set<string>();
  if (!Array.isArray(input.slots) || input.slots.length === 0) {
    push('slots', 'slots must be a non-empty array of slot names');
  } else {
    input.slots.forEach((slot, index) => {
      if (typeof slot !== 'string' || !IDENTIFIER.test(slot)) {
        push(`slots[${index}]`, 'slot names must be lowerCamelCase identifiers');
        return;
      }
      if (slots.has(slot)) {
        push(`slots[${index}]`, `duplicate slot "${slot}"`);
      }
      slots.add(slot);
    });
    if (!slots.has(ROOT_SLOT)) {
      push('slots', `slots must include "${ROOT_SLOT}"`);
    }
  }

  const variants = new Map<string, Set<string>>();
  if (input.variants !== undefined) {
    if (!isPlainObject(input.variants)) {
      push('variants', 'variants must be an object');
    } else {
      for (const [axis, definition] of Object.entries(input.variants)) {
        const path = `variants.${axis}`;
        if (!IDENTIFIER.test(axis)) {
          push(path, 'variant axis names must be lowerCamelCase identifiers');
        }
        if (!isPlainObject(definition)) {
          push(path, 'variant axis must be an object');
          continue;
        }
        rejectUnknownKeys(definition, VARIANT_KEYS, path, push);
        const values = new Set<string>();
        if (!Array.isArray(definition.values) || definition.values.length === 0) {
          push(`${path}.values`, 'values must be a non-empty array of strings');
        } else {
          definition.values.forEach((value, index) => {
            if (typeof value !== 'string' || value.length === 0) {
              push(`${path}.values[${index}]`, 'variant values must be non-empty strings');
              return;
            }
            if (values.has(value)) {
              push(`${path}.values[${index}]`, `duplicate variant value "${value}"`);
            }
            values.add(value);
          });
        }
        if (typeof definition.default !== 'string' || !values.has(definition.default)) {
          push(`${path}.default`, 'default must be one of values');
        }
        variants.set(axis, values);
      }
    }
  }

  const states = new Set<string>();
  if (input.states !== undefined) {
    if (!isPlainObject(input.states)) {
      push('states', 'states must be an object');
    } else {
      for (const [name, definition] of Object.entries(input.states)) {
        const path = `states.${name}`;
        if (!IDENTIFIER.test(name)) {
          push(path, 'state names must be lowerCamelCase identifiers');
        }
        if (variants.has(name)) {
          push(path, `"${name}" is declared both as a variant axis and as a state`);
        }
        if (!isPlainObject(definition)) {
          push(path, 'state must be an object');
          continue;
        }
        rejectUnknownKeys(definition, STATE_KEYS, path, push);
        if (definition.type !== 'boolean') {
          push(`${path}.type`, 'type must be "boolean"');
        }
        states.add(name);
      }
    }
  }

  if (!Array.isArray(input.rules)) {
    push('rules', 'rules must be an array');
  } else {
    const seenConditions = new Map<string, number>();
    input.rules.forEach((rule, index) => {
      const path = `rules[${index}]`;
      if (!isPlainObject(rule)) {
        push(path, 'rule must be an object');
        return;
      }
      rejectUnknownKeys(rule, RULE_KEYS, path, push);
      if (typeof rule.slot !== 'string' || !slots.has(rule.slot)) {
        push(`${path}.slot`, `unknown slot "${String(rule.slot)}"`);
      }
      if (rule.description !== undefined && typeof rule.description !== 'string') {
        push(`${path}.description`, 'description must be a string');
      }
      if (rule.when !== undefined) {
        validateCondition(rule.when, `${path}.when`, rule.slot, variants, states, push);
      }
      if (!isPlainObject(rule.declarations)) {
        push(`${path}.declarations`, 'declarations must be an object');
      } else {
        if (Object.keys(rule.declarations).length === 0) {
          push(`${path}.declarations`, 'declarations must not be empty');
        }
        for (const [property, value] of Object.entries(rule.declarations)) {
          validateDeclaration(property, value, `${path}.declarations.${property}`, push);
        }
      }

      const key = conditionKey(rule as unknown as StyleRule);
      const previous = seenConditions.get(key);
      if (previous !== undefined) {
        push(path, `duplicate rule: same slot and conditions as rules[${previous}]`);
      } else {
        seenConditions.set(key, index);
      }
    });
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Validates a spec and throws an aggregated error when it is invalid.
 *
 * @public
 */
export function assertValidSpec(input: unknown): asserts input is ComponentStyleSpec {
  const result = validateSpec(input);
  if (!result.valid) {
    const name = isPlainObject(input) && typeof input.name === 'string' ? input.name : '<unknown>';
    const details = result.issues.map(issue => `  - ${issue.path || '<root>'}: ${issue.message}`).join('\n');
    throw new Error(`Invalid component style spec "${name}":\n${details}`);
  }
}

function rejectUnknownKeys(
  value: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  path: string,
  push: (path: string, message: string) => void,
) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      push(path ? `${path}.${key}` : key, `unknown key "${key}"`);
    }
  }
}

function validateCondition(
  when: unknown,
  path: string,
  slot: unknown,
  variants: Map<string, Set<string>>,
  states: Set<string>,
  push: (path: string, message: string) => void,
) {
  if (!isPlainObject(when)) {
    push(path, 'when must be an object');
    return;
  }
  rejectUnknownKeys(when, CONDITION_KEYS, path, push);

  if (when.variants !== undefined) {
    if (!isPlainObject(when.variants)) {
      push(`${path}.variants`, 'variants must be an object');
    } else {
      for (const [axis, value] of Object.entries(when.variants)) {
        const values = variants.get(axis);
        if (!values) {
          push(`${path}.variants.${axis}`, `unknown variant axis "${axis}"`);
        } else if (typeof value !== 'string' || !values.has(value)) {
          push(`${path}.variants.${axis}`, `unknown value "${String(value)}" for variant axis "${axis}"`);
        }
      }
    }
  }
  if (when.states !== undefined) {
    if (!isPlainObject(when.states)) {
      push(`${path}.states`, 'states must be an object');
    } else {
      for (const [name, value] of Object.entries(when.states)) {
        if (!states.has(name)) {
          push(`${path}.states.${name}`, `unknown state "${name}"`);
        } else if (typeof value !== 'boolean') {
          push(`${path}.states.${name}`, 'state condition must be a boolean');
        }
      }
    }
  }
  for (const key of ['pseudo', 'rootPseudo', 'media', 'supports'] as const) {
    if (when[key] !== undefined && (typeof when[key] !== 'string' || (when[key] as string).trim().length === 0)) {
      push(`${path}.${key}`, `${key} must be a non-empty string`);
    }
  }
  if (typeof when.pseudo === 'string' && !when.pseudo.trimStart().startsWith(':')) {
    push(`${path}.pseudo`, 'pseudo must start with ":"');
  }
  if (typeof when.rootPseudo === 'string' && !when.rootPseudo.trimStart().startsWith(':')) {
    push(`${path}.rootPseudo`, 'rootPseudo must start with ":"');
  }
  if (when.rootPseudo !== undefined && slot === ROOT_SLOT) {
    push(`${path}.rootPseudo`, 'rootPseudo is only allowed for non-root slots; use pseudo instead');
  }
}

function validateDeclaration(
  property: string,
  value: unknown,
  path: string,
  push: (path: string, message: string) => void,
) {
  if (!CUSTOM_PROPERTY.test(property) && !CAMEL_CASE_PROPERTY.test(property)) {
    push(path, 'property must be camelCase or a --custom-property');
  }
  validateValue(value, path, push, true);
}

function validateValue(
  value: unknown,
  path: string,
  push: (path: string, message: string) => void,
  allowConcat: boolean,
) {
  if (typeof value === 'number') {
    return;
  }
  if (typeof value === 'string') {
    if (HARDCODED_COLOR.test(value.trim())) {
      push(path, `hardcoded color "${value}"; use a token reference instead`);
    }
    return;
  }
  if (isTokenReference(value)) {
    rejectUnknownKeys(value as unknown as Record<string, unknown>, new Set(['token']), path, push);
    if (!isKnownToken(value.token)) {
      push(`${path}.token`, `unknown token "${value.token}"`);
    }
    return;
  }
  if (isVarReference(value)) {
    rejectUnknownKeys(value as unknown as Record<string, unknown>, new Set(['var', 'fallback']), path, push);
    if (!CUSTOM_PROPERTY.test(value.var)) {
      push(`${path}.var`, 'var must be a --custom-property name');
    }
    if (value.fallback !== undefined) {
      validateValue(value.fallback, `${path}.fallback`, push, false);
    }
    return;
  }
  if (isConcatValue(value)) {
    if (!allowConcat) {
      push(path, 'nested concat values are not allowed');
      return;
    }
    if (value.concat.length < 2) {
      push(`${path}.concat`, 'concat must have at least two parts');
    }
    value.concat.forEach((part, index) => {
      if (isConcatValue(part)) {
        push(`${path}.concat[${index}]`, 'nested concat values are not allowed');
        return;
      }
      validateValue(part, `${path}.concat[${index}]`, push, false);
    });
    return;
  }
  push(path, 'value must be a string, number, { token }, { var } or { concat }');
}

/**
 * Stable key describing a rule's slot and conditions (used for duplicate detection and grouping).
 *
 * @internal
 */
export function conditionKey(rule: Pick<StyleRule, 'slot' | 'when'>): string {
  const when: StyleCondition = rule.when ?? {};
  const variants = Object.entries(when.variants ?? {})
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([axis, value]) => `${axis}=${value}`)
    .join(',');
  const states = Object.entries(when.states ?? {})
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, value]) => `${name}=${value}`)
    .join(',');
  return [
    rule.slot,
    `v:${variants}`,
    `s:${states}`,
    `p:${normalizeSelectorText(when.pseudo)}`,
    `rp:${normalizeSelectorText(when.rootPseudo)}`,
    `m:${normalizeSelectorText(when.media)}`,
    `sup:${normalizeSelectorText(when.supports)}`,
  ].join('|');
}

/**
 * @internal
 */
export function normalizeSelectorText(text: string | undefined): string {
  return (text ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ',')
    .trim();
}

/**
 * Type guard for `StyleValue` token references.
 *
 * @public
 */
export function isTokenValue(value: StyleValue): value is TokenReference {
  return isTokenReference(value);
}

/**
 * Type guard for `StyleValue` custom property references.
 *
 * @public
 */
export function isVarValue(value: StyleValue): value is VarReference {
  return isVarReference(value);
}

/**
 * Type guard for `StyleValue` concat values.
 *
 * @public
 */
export function isConcatStyleValue(value: StyleValue): value is ConcatValue {
  return isConcatValue(value);
}
