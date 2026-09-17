import type { ComponentStyleSpec, IrRule, StyleSpecIR } from '@fluentui/style-spec';
import { assertAdapterMatchesSpec, defaultCssModulesConfig, type CssModulesAdapterConfig } from '../adapters/types';
import { GENERATED_BANNER, GENERATED_BANNER_TS, prepareIr, resolveCssValue, toKebabCase } from '../ir/utils';

export interface CompileCssModulesOptions {
  config?: Partial<CssModulesAdapterConfig>;
}

export interface CompileCssModulesResult {
  cssFileName: string;
  cssContents: string;
  helperFileName: string;
  helperContents: string;
}

/**
 * Compiles a style spec to a CSS Module (+ classNames helper for styled headless wrappers).
 */
export function compileCssModules(
  spec: ComponentStyleSpec,
  options: CompileCssModulesOptions = {},
): CompileCssModulesResult {
  const ir = prepareIr(spec);
  const config: CssModulesAdapterConfig = { ...defaultCssModulesConfig(spec), ...options.config };
  assertAdapterMatchesSpec(spec, 'css-modules', config);
  const base = config.rootClassName ?? lower(spec.name);
  return {
    cssFileName: `${base}.module.css`,
    cssContents: emitCss(ir, config),
    helperFileName: `${base}.classes.ts`,
    helperContents: emitHelper(ir, config),
  };
}

function emitCss(ir: StyleSpecIR, config: CssModulesAdapterConfig): string {
  const blocks: string[] = [GENERATED_BANNER, ''];
  const root = config.rootClassName ?? lower(ir.name);

  for (const rule of ir.rules) {
    const selector = buildSelector(rule, root, config);
    const decls = rule.declarations
      .map(decl => `  ${toKebabCase(decl.property)}: ${resolveCssValue(decl.value)};`)
      .join('\n');
    let body = `${selector} {\n${decls}\n}`;
    if (rule.supports) {
      body = `@supports ${rule.supports} {\n${indent(body)}\n}`;
    }
    if (rule.media) {
      body = `@media ${rule.media} {\n${indent(body)}\n}`;
    }
    blocks.push(body, '');
  }

  return blocks.join('\n');
}

function buildSelector(rule: IrRule, root: string, config: CssModulesAdapterConfig): string {
  const format = config.variantClassFormat ?? 'axis-value';
  const slotClass = rule.slot === 'root' ? root : `${root}__${rule.slot}`;

  const classParts = [`.${slotClass}`];
  for (const variant of rule.variants) {
    if (format === 'value') {
      classParts.push(`.${variant.value}`);
    } else {
      classParts.push(`.${variant.axis}-${variant.value}`);
    }
  }

  let selector = classParts.join('');

  for (const state of rule.states) {
    if (!state.value) {
      continue;
    }
    const attr = config.stateAttributes?.[state.name] ?? `data-${kebab(state.name)}`;
    selector += `[${attr}]`;
  }

  if (rule.rootPseudo && rule.slot !== 'root') {
    selector = `.${root}${rule.rootPseudo} ${selector}`;
  }

  if (rule.pseudo) {
    selector += rule.pseudo;
  }

  return selector;
}

function emitHelper(ir: StyleSpecIR, config: CssModulesAdapterConfig): string {
  const root = config.rootClassName ?? lower(ir.name);
  const variantAxes = ir.variants.map(v => v.name);
  const stateNames = ir.states;

  return [
    GENERATED_BANNER_TS,
    '',
    `export type ${ir.name}Variants = {`,
    ...variantAxes.map(axis => `  ${axis}?: string;`),
    ...stateNames.map(name => `  ${name}?: boolean;`),
    `};`,
    '',
    `export function get${ir.name}ClassNames(`,
    `  styles: Record<string, string>,`,
    `  variants: ${ir.name}Variants = {},`,
    `  slot: string = 'root',`,
    `): string {`,
    `  const classes = [styles[slot === 'root' ? '${root}' : \`${root}__\${slot}\`]].filter(Boolean);`,
    ...variantAxes.map(
      axis =>
        `  if (variants.${axis}) { classes.push(styles[\`${axis}-\${variants.${axis}}\`] ?? styles[variants.${axis}!]); }`,
    ),
    `  return classes.filter(Boolean).join(' ');`,
    `}`,
    '',
  ].join('\n');
}

function lower(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

function indent(text: string): string {
  return text
    .split('\n')
    .map(line => (line ? `  ${line}` : line))
    .join('\n');
}

// silence unused import warning for conditionClassKey in case of future use
