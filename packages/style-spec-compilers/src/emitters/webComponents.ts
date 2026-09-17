import type { ComponentStyleSpec, IrRule, StyleSpecIR } from '@fluentui/style-spec';
import {
  assertAdapterMatchesSpec,
  defaultWebComponentsConfig,
  type WebComponentsAdapterConfig,
} from '../adapters/types';
import { GENERATED_BANNER, GENERATED_BANNER_TS, prepareIr, resolveCssValue, toKebabCase } from '../ir/utils';

export interface CompileWebComponentsOptions {
  config?: Partial<WebComponentsAdapterConfig>;
}

export interface CompileWebComponentsResult {
  cssFileName: string;
  cssContents: string;
  tsFileName: string;
  tsContents: string;
}

/**
 * Compiles a style spec to web-components CSS (+ FAST css wrapper).
 */
export function compileWebComponents(
  spec: ComponentStyleSpec,
  options: CompileWebComponentsOptions = {},
): CompileWebComponentsResult {
  const ir = prepareIr(spec);
  const config: WebComponentsAdapterConfig = { ...defaultWebComponentsConfig(spec), ...options.config };
  assertAdapterMatchesSpec(spec, 'web-components', config);
  const cssContents = emitCss(ir, config);
  const tokenNames = collectTokenNames(ir);
  const tsContents = emitTsWrapper(spec.name, tokenNames, config);
  const base = spec.name.charAt(0).toLowerCase() + spec.name.slice(1);
  return {
    cssFileName: `${base}.styles.css`,
    cssContents,
    tsFileName: `${base}.styles.ts`,
    tsContents,
  };
}

function emitCss(ir: StyleSpecIR, config: WebComponentsAdapterConfig): string {
  const blocks: string[] = [GENERATED_BANNER, ''];

  for (const rule of ir.rules) {
    const selector = buildSelector(rule, ir, config);
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

function buildSelector(rule: IrRule, ir: StyleSpecIR, config: WebComponentsAdapterConfig): string {
  const slotSelector = config.slotSelectors[rule.slot];
  const isRoot = rule.slot === 'root';

  const attrParts: string[] = [];
  for (const variant of rule.variants) {
    const attr = config.variantAttributes?.[variant.axis] ?? variant.axis;
    const axis = ir.variants.find(v => v.name === variant.axis);
    const omit = config.omitAttributeForDefault?.includes(variant.axis) && axis?.default === variant.value;
    if (!omit) {
      attrParts.push(`[${attr}='${variant.value}']`);
    }
  }
  for (const state of rule.states) {
    if (!state.value) {
      continue;
    }
    const mapping = config.states?.[state.name] ?? { kind: 'attribute' as const, name: state.name };
    if (mapping.kind === 'custom-state') {
      attrParts.push(`:state(${mapping.name})`);
    } else {
      attrParts.push(`[${mapping.name}]`);
    }
  }

  let host = ':host';
  if (attrParts.length > 0) {
    host = `:host(${attrParts.join('')})`;
  }

  if (isRoot) {
    return `${host}${rule.pseudo ?? ''}`;
  }

  // Non-root slot
  const rootPseudo = rule.rootPseudo ?? '';
  if (rootPseudo) {
    return `${host}${rootPseudo} ${slotSelector}${rule.pseudo ?? ''}`;
  }
  if (host === ':host') {
    return `${slotSelector}${rule.pseudo ?? ''}`;
  }
  return `${host} ${slotSelector}${rule.pseudo ?? ''}`;
}

function emitTsWrapper(name: string, tokenNames: string[], config: WebComponentsAdapterConfig): string {
  const importPath = config.tokenImportPath ?? '../theme/design-tokens.js';
  const lines = [GENERATED_BANNER_TS, '', `import { css } from '@microsoft/fast-element';`];
  if (tokenNames.length > 0) {
    lines.push(`import {`);
    for (const token of tokenNames) {
      lines.push(`  ${token},`);
    }
    lines.push(`} from '${importPath}';`);
  }
  lines.push('', `export const styles = css\``);
  lines.push(`  /* See companion .styles.css generated from the component style spec. */`);
  lines.push(
    `  /* Token imports kept for FAST template interpolation parity: ${tokenNames.join(', ') || '(none)'}. */`,
  );
  lines.push('`;', '');
  return lines.join('\n');
}

function collectTokenNames(ir: StyleSpecIR): string[] {
  const names = new Set<string>();
  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object') {
      return;
    }
    if ('token' in (value as object) && typeof (value as { token: unknown }).token === 'string') {
      names.add((value as { token: string }).token);
      return;
    }
    if ('concat' in (value as object) && Array.isArray((value as { concat: unknown[] }).concat)) {
      for (const part of (value as { concat: unknown[] }).concat) {
        visit(part);
      }
    }
    if ('fallback' in (value as object)) {
      visit((value as { fallback: unknown }).fallback);
    }
  };
  for (const rule of ir.rules) {
    for (const decl of rule.declarations) {
      visit(decl.value);
    }
  }
  return [...names].sort();
}

function indent(text: string): string {
  return text
    .split('\n')
    .map(line => (line ? `  ${line}` : line))
    .join('\n');
}
