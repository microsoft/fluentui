import type { ComponentStyleSpec, StyleRule, StyleValue } from './types';
import { assertValidSpec, normalizeSelectorText } from './validate';

/**
 * @public
 */
export interface IrVariantAxis {
  name: string;
  values: string[];
  default: string;
}

/**
 * @public
 */
export interface IrVariantCondition {
  axis: string;
  value: string;
}

/**
 * @public
 */
export interface IrStateCondition {
  name: string;
  value: boolean;
}

/**
 * @public
 */
export interface IrDeclaration {
  property: string;
  value: StyleValue;
}

/**
 * Canonical rule: conditions are sorted by declaration order and selector text is whitespace-normalized.
 *
 * @public
 */
export interface IrRule {
  slot: string;
  variants: IrVariantCondition[];
  states: IrStateCondition[];
  pseudo?: string;
  rootPseudo?: string;
  media?: string;
  supports?: string;
  declarations: IrDeclaration[];
  /**
   * Key shared by all rules with the same slot, variants and states (pseudo/media/supports excluded).
   * Compilers that produce one class per condition set (Griffel) group by this key.
   */
  groupKey: string;
  /**
   * Unique key for the rule including pseudo/media/supports.
   */
  key: string;
}

/**
 * Canonical intermediate representation of a spec: deterministic, target-agnostic, ready for compilers.
 *
 * @public
 */
export interface StyleSpecIR {
  name: string;
  slots: string[];
  variants: IrVariantAxis[];
  states: string[];
  rules: IrRule[];
}

/**
 * Validates and normalizes a spec to its canonical IR.
 *
 * Rule order is fully determined by the spec content (never by authoring order), so any two specs describing the
 * same styles produce byte-identical compiler output:
 *
 * 1. slot declaration order
 * 2. condition rank: unconditional, variant-only, state-only, variant+state
 * 3. number of variant conditions, then axis/value declaration order
 * 4. number of state conditions, then state declaration order (`true` before `false`)
 * 5. plain rules before `supports`, before `media`, before `media`+`supports`
 * 6. `rootPseudo` then `pseudo` text
 *
 * @public
 */
export function normalizeSpec(spec: ComponentStyleSpec): StyleSpecIR {
  assertValidSpec(spec);

  const variantAxes: IrVariantAxis[] = Object.entries(spec.variants ?? {}).map(([name, axis]) => ({
    name,
    values: [...axis.values],
    default: axis.default,
  }));
  const stateNames = Object.keys(spec.states ?? {});

  const axisIndex = new Map(variantAxes.map((axis, index) => [axis.name, index] as const));
  const valueIndex = new Map(variantAxes.map(axis => [axis.name, new Map(axis.values.map((v, i) => [v, i]))] as const));
  const stateIndex = new Map(stateNames.map((name, index) => [name, index] as const));
  const slotIndex = new Map(spec.slots.map((slot, index) => [slot, index] as const));

  const rules = spec.rules.map(rule => toIrRule(rule, axisIndex, stateIndex));

  const compare = (a: IrRule, b: IrRule): number => {
    const bySlot = slotIndex.get(a.slot)! - slotIndex.get(b.slot)!;
    if (bySlot !== 0) {
      return bySlot;
    }
    const byRank = rank(a) - rank(b);
    if (byRank !== 0) {
      return byRank;
    }
    const byVariantCount = a.variants.length - b.variants.length;
    if (byVariantCount !== 0) {
      return byVariantCount;
    }
    for (let i = 0; i < a.variants.length; i++) {
      const byAxis = axisIndex.get(a.variants[i].axis)! - axisIndex.get(b.variants[i].axis)!;
      if (byAxis !== 0) {
        return byAxis;
      }
      const byValue =
        valueIndex.get(a.variants[i].axis)!.get(a.variants[i].value)! -
        valueIndex.get(b.variants[i].axis)!.get(b.variants[i].value)!;
      if (byValue !== 0) {
        return byValue;
      }
    }
    const byStateCount = a.states.length - b.states.length;
    if (byStateCount !== 0) {
      return byStateCount;
    }
    for (let i = 0; i < a.states.length; i++) {
      const byState = stateIndex.get(a.states[i].name)! - stateIndex.get(b.states[i].name)!;
      if (byState !== 0) {
        return byState;
      }
      const byValue = Number(!a.states[i].value) - Number(!b.states[i].value);
      if (byValue !== 0) {
        return byValue;
      }
    }
    const byAtRule = atRuleRank(a) - atRuleRank(b);
    if (byAtRule !== 0) {
      return byAtRule;
    }
    const bySupports = compareText(a.supports, b.supports);
    if (bySupports !== 0) {
      return bySupports;
    }
    const byMedia = compareText(a.media, b.media);
    if (byMedia !== 0) {
      return byMedia;
    }
    const byRootPseudo = compareText(a.rootPseudo, b.rootPseudo);
    if (byRootPseudo !== 0) {
      return byRootPseudo;
    }
    return compareText(a.pseudo, b.pseudo);
  };

  rules.sort(compare);

  return {
    name: spec.name,
    slots: [...spec.slots],
    variants: variantAxes,
    states: stateNames,
    rules,
  };
}

function toIrRule(rule: StyleRule, axisIndex: Map<string, number>, stateIndex: Map<string, number>): IrRule {
  const when = rule.when ?? {};
  const variants = Object.entries(when.variants ?? {})
    .map(([axis, value]) => ({ axis, value }))
    .sort((a, b) => axisIndex.get(a.axis)! - axisIndex.get(b.axis)!);
  const states = Object.entries(when.states ?? {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => stateIndex.get(a.name)! - stateIndex.get(b.name)!);

  const pseudo = optionalText(when.pseudo);
  const rootPseudo = optionalText(when.rootPseudo);
  const media = optionalText(when.media);
  const supports = optionalText(when.supports);

  const groupKey = [
    rule.slot,
    variants.map(v => `${v.axis}=${v.value}`).join(','),
    states.map(s => `${s.name}=${s.value}`).join(','),
  ].join('|');

  const key = [groupKey, rootPseudo ?? '', pseudo ?? '', media ?? '', supports ?? ''].join('|');

  return {
    slot: rule.slot,
    variants,
    states,
    ...(pseudo !== undefined ? { pseudo } : {}),
    ...(rootPseudo !== undefined ? { rootPseudo } : {}),
    ...(media !== undefined ? { media } : {}),
    ...(supports !== undefined ? { supports } : {}),
    declarations: Object.entries(rule.declarations).map(([property, value]) => ({ property, value })),
    groupKey,
    key,
  };
}

function optionalText(text: string | undefined): string | undefined {
  if (text === undefined) {
    return undefined;
  }
  const normalized = normalizeSelectorText(text);
  return normalized.length > 0 ? normalized : undefined;
}

function rank(rule: IrRule): number {
  if (rule.variants.length === 0 && rule.states.length === 0) {
    return 0;
  }
  if (rule.states.length === 0) {
    return 1;
  }
  if (rule.variants.length === 0) {
    return 2;
  }
  return 3;
}

function atRuleRank(rule: IrRule): number {
  return (rule.supports ? 1 : 0) + (rule.media ? 2 : 0);
}

function compareText(a: string | undefined, b: string | undefined): number {
  const left = a ?? '';
  const right = b ?? '';
  return left < right ? -1 : left > right ? 1 : 0;
}

/**
 * Groups IR rules by `groupKey`, preserving canonical order of first appearance.
 *
 * @public
 */
export function groupRules(rules: IrRule[]): Map<string, IrRule[]> {
  const groups = new Map<string, IrRule[]>();
  for (const rule of rules) {
    const bucket = groups.get(rule.groupKey);
    if (bucket) {
      bucket.push(rule);
    } else {
      groups.set(rule.groupKey, [rule]);
    }
  }
  return groups;
}
