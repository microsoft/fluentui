import type { ComponentStyleSpec, IrRule, StyleSpecIR } from '@fluentui/style-spec';
import { groupRules } from '@fluentui/style-spec';
import { assertAdapterMatchesSpec, defaultGriffelConfig, type GriffelAdapterConfig } from '../adapters/types';
import { GENERATED_BANNER_TS, conditionClassKey, prepareIr, resolveGriffelValue } from '../ir/utils';

export interface CompileGriffelOptions {
  config?: Partial<GriffelAdapterConfig>;
}

export interface CompileGriffelResult {
  fileName: string;
  contents: string;
}

/**
 * Compiles a style spec to a Griffel styles module.
 */
export function compileGriffel(spec: ComponentStyleSpec, options: CompileGriffelOptions = {}): CompileGriffelResult {
  const ir = prepareIr(spec);
  const config: GriffelAdapterConfig = { ...defaultGriffelConfig(spec), ...options.config };
  assertAdapterMatchesSpec(spec, 'griffel', config);
  return {
    fileName: `use${spec.name}Styles.styles.ts`,
    contents: emitGriffel(ir, config),
  };
}

function emitGriffel(ir: StyleSpecIR, config: GriffelAdapterConfig): string {
  const groups = groupRules(ir.rules);
  const lines: string[] = [
    GENERATED_BANNER_TS,
    '// @ts-nocheck — generated output; slot/variant state is intentionally loosely typed for PoC.',
    '',
    `'use client';`,
    '',
    `import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';`,
    `import { tokens } from '${config.tokensImport ?? '@fluentui/react-theme'}';`,
    `import type { SlotClassNames } from '@fluentui/react-utilities';`,
    '',
    `export const ${lower(ir.name)}ClassNames: SlotClassNames<Record<string, unknown>> = {`,
  ];

  for (const slot of ir.slots) {
    const className = config.slotClassNames?.[slot] ?? `${config.classNamePrefix}${slot === 'root' ? '' : `__${slot}`}`;
    lines.push(`  ${slot}: '${className}',`);
  }
  lines.push(`};`, '');

  for (const slot of ir.slots) {
    const slotGroups = [...groups.entries()].filter(([key]) => key.startsWith(`${slot}|`));
    const baseRules = slotGroups.find(([key]) => key === `${slot}||`)?.[1] ?? [];
    const otherGroups = slotGroups.filter(([key]) => key !== `${slot}||`);

    lines.push(`const use${pascal(slot)}BaseClassName = makeResetStyles({`);
    lines.push(...emitStyleObject(baseRules, 1));
    lines.push(`});`, '');

    lines.push(`const use${pascal(slot)}Styles = makeStyles({`);
    for (const [, rules] of otherGroups) {
      const key = conditionClassKey(rules[0].variants, rules[0].states);
      lines.push(`  '${key}': {`);
      lines.push(...emitStyleObject(rules, 2));
      lines.push(`  },`);
    }
    lines.push(`});`, '');
  }

  // Loose state typing: variants/states are top-level fields alongside slot objects.
  lines.push(`export const use${ir.name}Styles_unstable = (state: Record<string, any>): typeof state => {`);
  for (const slot of ir.slots) {
    lines.push(`  const ${slot}BaseClassName = use${pascal(slot)}BaseClassName();`);
    lines.push(`  const ${slot}Styles = use${pascal(slot)}Styles();`);
  }
  lines.push('');

  for (const slot of ir.slots) {
    const otherGroups = [...groups.entries()].filter(([key]) => key.startsWith(`${slot}|`) && key !== `${slot}||`);
    lines.push(`  if (state.${slot}) {`);
    lines.push(`    state.${slot}.className = mergeClasses(`);
    lines.push(`      ${lower(ir.name)}ClassNames.${slot},`);
    lines.push(`      ${slot}BaseClassName,`);
    for (const [, rules] of otherGroups) {
      const key = conditionClassKey(rules[0].variants, rules[0].states);
      lines.push(`      (${buildConditionExpr(rules[0], config)}) && ${slot}Styles['${key}'],`);
    }
    lines.push(`      state.${slot}.className,`);
    lines.push(`    );`);
    lines.push(`  }`, '');
  }

  lines.push(`  return state;`, `};`, '');
  return lines.join('\n');
}

function emitStyleObject(rules: IrRule[], indent: number): string[] {
  const tree: Nested = { declarations: [], children: new Map() };
  for (const rule of rules) {
    insertRule(tree, rule);
  }
  return renderNested(tree, indent);
}

interface Nested {
  declarations: Array<{ property: string; value: string }>;
  children: Map<string, Nested>;
}

function insertRule(tree: Nested, rule: IrRule) {
  let node = tree;
  const wrappers: string[] = [];
  if (rule.supports) {
    wrappers.push(`@supports ${rule.supports}`);
  }
  if (rule.media) {
    wrappers.push(`@media ${rule.media}`);
  }
  if (rule.rootPseudo) {
    // Child slot styled when the root matches this pseudo — relative selector from the slot
    wrappers.push(`:global(.${'root'}${rule.rootPseudo}) &`.replace(':global(.root', '&').replace(') &', ''));
    // Prefer a clear relative form: emit as a comment-backed nested key the hook can still apply via state.
    wrappers[wrappers.length - 1] = rule.rootPseudo;
  }
  if (rule.pseudo) {
    wrappers.push(rule.pseudo);
  }

  for (const wrapper of wrappers) {
    if (!node.children.has(wrapper)) {
      node.children.set(wrapper, { declarations: [], children: new Map() });
    }
    node = node.children.get(wrapper)!;
  }

  for (const decl of rule.declarations) {
    node.declarations.push({ property: decl.property, value: resolveGriffelValue(decl.value) });
  }
}

function renderNested(node: Nested, indent: number): string[] {
  const pad = '  '.repeat(indent);
  const lines: string[] = [];
  for (const decl of node.declarations) {
    const prop = decl.property.startsWith('--') ? JSON.stringify(decl.property) : decl.property;
    lines.push(`${pad}${prop}: ${decl.value},`);
  }
  for (const [key, child] of node.children) {
    lines.push(`${pad}${JSON.stringify(key)}: {`);
    lines.push(...renderNested(child, indent + 1));
    lines.push(`${pad}},`);
  }
  return lines;
}

function buildConditionExpr(rule: IrRule, config: GriffelAdapterConfig): string {
  const parts: string[] = [];
  for (const variant of rule.variants) {
    const prop = config.variantProps?.[variant.axis] ?? variant.axis;
    parts.push(`state.${prop} === '${variant.value}'`);
  }
  for (const state of rule.states) {
    const prop = config.stateProps?.[state.name] ?? state.name;
    parts.push(state.value ? `Boolean(state.${prop})` : `!state.${prop}`);
  }
  return parts.length === 0 ? 'true' : parts.join(' && ');
}

function lower(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function pascal(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
