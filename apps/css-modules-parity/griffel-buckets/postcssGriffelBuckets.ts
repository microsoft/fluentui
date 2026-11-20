import postcss from 'postcss';
import type { AtRule, ChildNode, Comment, Declaration, PluginCreator, Root } from 'postcss';
import * as selectorParserModule from 'postcss-selector-parser';
import type { Root as SelectorRoot } from 'postcss-selector-parser';
import { styleBucketOrdering } from '@griffel/core';
import type { StyleBucketName } from '@griffel/core';

// The CommonJS export is the parser function itself; bundlers may expose it as the namespace or as `default`.
const selectorParser = ((selectorParserModule as unknown as { default?: unknown }).default ??
  selectorParserModule) as typeof selectorParserModule;

export type PostcssGriffelBucketsOptions = {
  /** Limits the transform to component stylesheets; app stylesheets keep their plain cascade position. */
  filter?: (file: string) => boolean;
};

export type GriffelSourceInfo = {
  /** Classes replacing `makeResetStyles()` styles, and default variant classes holding styles they contained. */
  resetClassNames: Set<string>;
  /** Logical properties (kebab-case) declared by the Griffel styles. */
  logicalProperties: Set<string>;
};

const DIRECTIVE = '@griffel-buckets';

/**
 * Reads the `@griffel-buckets` directive Fluent stylesheets carry for what can't be derived from the CSS itself, for
 * example `/* @griffel-buckets reset: .root, .icon; logical: padding-inline-start *\/`. Its format and its sync with the
 * Griffel sources are enforced by the `fluentui/griffel-buckets` stylelint rule (`tools/stylelint-rules`).
 */
export function getGriffelSourceInfo(root: Root): GriffelSourceInfo {
  const info: GriffelSourceInfo = { resetClassNames: new Set(), logicalProperties: new Set() };
  const directive = root.nodes.find(
    (node): node is Comment => node.type === 'comment' && node.text.trim().startsWith(DIRECTIVE),
  );
  for (const field of directive?.text.trim().slice(DIRECTIVE.length).split(';') ?? []) {
    const [key, values = ''] = field.split(':').map(part => part.trim());
    const list = values
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);
    // Default classes hold styles the Griffel reset class contained (for example a Button's `secondary` styles).
    if (key === 'reset' || key === 'defaults') {
      list.forEach(value => info.resetClassNames.add(value.replace(/^\./, '')));
    } else if (key === 'logical') {
      list.forEach(value => info.logicalProperties.add(value));
    }
  }
  return info;
}

/**
 * Component rules are placed before every Griffel priority (shorthands use `-1`/`-2`), so app-level Griffel rules of
 * the same bucket always win ties, like in `mergeClasses()`: the app's classes come last, and a later shorthand class
 * even removes the component's longhand classes. Rules of earlier buckets or lower specificity still lose, exactly like
 * against Griffel component styles. Component rules keep their source order among themselves.
 */
export const MODULES_PRIORITY = -2.5;

const logicalShorthands = new Set([
  'padding-inline',
  'padding-block',
  'margin-inline',
  'margin-block',
  'inset-inline',
  'inset-block',
  'scroll-margin-inline',
  'scroll-margin-block',
  'scroll-padding-inline',
  'scroll-padding-block',
]);

const LOGICAL_PROPERTY = /-(inline|block)(-|$)|^border-(start|end)-(start|end)-radius$/;

/**
 * Priority of a component declaration among Griffel's priorities (`-2`, `-1`, `0`).
 *
 * Griffel's physical shorthands (`padding`, `margin`, `inset`, `border-radius`) don't remove logical longhands, which
 * have a higher priority (`0`), so a component's `paddingInlineStart` beats an app's `padding`; logical shorthands
 * (`-1`) tie with them and lose to the later app class. Ports often turn physical Griffel properties (which a later
 * shorthand removes) into logical ones, so this only applies to logical properties the Griffel source declares. Every
 * other declaration stays below all app rules.
 */
export function getPropertyPriority(property: string, logicalProperties: Set<string> = new Set()): number {
  if (!LOGICAL_PROPERTY.test(property) || !logicalProperties.has(property)) {
    return MODULES_PRIORITY;
  }
  return logicalShorthands.has(property) ? -1.5 : -0.5;
}

/** Griffel's pseudo-class buckets (see `getStyleBucketName()` in `@griffel/core`). */
const pseudoBuckets: Record<string, StyleBucketName> = {
  ':focus-within': 'w',
  ':focus-visible': 'i',
  ':link': 'l',
  ':visited': 'v',
  ':focus': 'f',
  ':hover': 'h',
  ':active': 'a',
};

/** At-rules that only add a condition to the rules they contain, so they are kept around flattened rules. */
const conditionalAtRules = new Set(['media', 'supports', 'container', 'layer', 'scope', 'starting-style']);

type Condition = { name: string; params: string };
type Metadata = { m?: string; x?: string; p: number };
type SelectorInfo = { bucket: StyleBucketName; reset: boolean };
type Unit =
  | { type: 'rule'; selectors: string[]; conditions: Condition[]; declarations: Declaration[] }
  | { type: 'node'; node: AtRule; conditions: Condition[] };

/** Pseudo-classes that only express CSS Modules class combinations, which Griffel expresses with separate classes. */
const transparentPseudos = new Set([':where', ':is', ':global', ':local']);

/**
 * Buckets a selector like Griffel buckets the selector key of a style: by its first pseudo-class, for example
 * `.root:hover .icon` → `h`, `.root:hover:active` → `h`, `.root:not(:focus-within)` → `d`. Pseudo-classes that only
 * combine CSS Modules classes (`.root:where(.small)`) are skipped.
 *
 * A selector belongs to reset styles when its first compound selector is a reset class without other classes (for
 * example `.root:hover`, `.root[data-fui-focus-visible]`, but not `.root:where(.small)`).
 */
export function getSelectorInfo(selector: string, resetClassNames: Set<string> = new Set()): SelectorInfo {
  let bucket: StyleBucketName | undefined;
  let classNames = 0;
  let reset = false;
  selectorParser((root: SelectorRoot) => {
    for (const node of root.first?.nodes ?? []) {
      if (node.type === 'combinator') {
        break;
      }
      if (node.type === 'class') {
        reset = classNames === 0 && resetClassNames.has(node.value);
        classNames++;
      } else if (node.type === 'pseudo' && transparentPseudos.has(node.value)) {
        node.walkClasses(() => {
          classNames++;
        });
      }
    }
    for (const node of root.first?.nodes ?? []) {
      if (node.type === 'pseudo' && !node.value.startsWith('::') && !transparentPseudos.has(node.value)) {
        bucket = pseudoBuckets[node.value] ?? 'd';
        return;
      }
    }
  }).processSync(selector);
  return { bucket: bucket ?? 'd', reset: reset && classNames === 1 };
}

/**
 * CSS Modules wrap normal-mode overrides in `@media (forced-colors: none)` so they don't override forced colors values;
 * Griffel expresses the same styles without a media query, so this condition doesn't change their bucket.
 */
const isBucketNeutralCondition = ({ name, params }: Condition) =>
  name === 'media' && params.replace(/\s+/g, '') === '(forced-colors:none)';

/** Buckets at-rule conditions like Griffel: `@media` → `m`, `@supports`/`@layer` → `t`, `@container` → `x`. */
function getConditionsMetadata(allConditions: Condition[]): { bucket?: StyleBucketName; m?: string; x?: string } {
  const conditions = allConditions.filter(condition => !isBucketNeutralCondition(condition));
  const media = [
    ...new Set(conditions.filter(condition => condition.name === 'media').map(condition => condition.params)),
  ];
  if (media.length > 0) {
    return { bucket: 'm', m: media.join(' and ') };
  }
  if (conditions.some(condition => condition.name === 'supports' || condition.name === 'layer')) {
    return { bucket: 't' };
  }
  const container = conditions.find(condition => condition.name === 'container');
  if (container) {
    return { bucket: 'x', x: container.params };
  }
  return {};
}

function resolveSelectors(selectors: string[], parentSelectors: string[] | null): string[] {
  if (!parentSelectors) {
    return selectors;
  }
  return parentSelectors.flatMap(parent =>
    selectors.map(selector => (selector.includes('&') ? selector.replace(/&/g, parent) : `${parent} ${selector}`)),
  );
}

/** Flattens native CSS nesting and conditional at-rules into units of declarations, keeping source order. */
function collect(nodes: ChildNode[], selectors: string[] | null, conditions: Condition[], units: Unit[]): void {
  let declarations: Declaration[] = [];
  const flush = () => {
    if (declarations.length > 0 && selectors) {
      units.push({ type: 'rule', selectors, conditions, declarations });
    }
    declarations = [];
  };

  for (const node of nodes) {
    if (node.type === 'decl') {
      declarations.push(node);
    } else if (node.type === 'rule') {
      flush();
      collect(node.nodes, resolveSelectors(node.selectors, selectors), conditions, units);
    } else if (node.type === 'atrule' && node.nodes && conditionalAtRules.has(node.name)) {
      flush();
      collect(node.nodes, selectors, [...conditions, { name: node.name, params: node.params }], units);
    } else if (node.type === 'atrule') {
      flush();
      units.push({ type: 'node', node, conditions });
    }
  }
  flush();
}

function wrapInConditions(node: ChildNode, conditions: Condition[]): ChildNode {
  return conditions.reduceRight<ChildNode>(
    (child, { name, params }) => postcss.atRule({ name, params }).append(child),
    node,
  );
}

/**
 * Annotates every rule of a Fluent CSS Modules stylesheet with the Griffel style bucket and property priority it
 * would have had as a Griffel component style, using Griffel's own extraction markers. Griffel then orders the rules
 * with its own: the webpack extraction plugin sorts them into its stylesheet, and `registerCSSModule()` inserts them
 * through a Griffel renderer at runtime.
 *
 * Rules that Griffel does not bucket (for example `@font-face`) are kept unannotated.
 */
export const postcssGriffelBuckets: PluginCreator<PostcssGriffelBucketsOptions> = (options = {}) => ({
  postcssPlugin: 'fluentui-griffel-buckets',
  // eslint-disable-next-line @typescript-eslint/naming-convention -- PostCSS plugin API
  Once(root: Root) {
    const file = root.source?.input.file ?? '';
    if (options.filter && !options.filter(file)) {
      return;
    }
    const { resetClassNames, logicalProperties } = getGriffelSourceInfo(root);

    const kept: ChildNode[] = [];
    const units: Unit[] = [];
    for (const node of root.nodes) {
      if (node.type === 'comment') {
        continue;
      }
      if (node.type === 'atrule' && !conditionalAtRules.has(node.name) && !/keyframes$/.test(node.name)) {
        kept.push(node);
      } else {
        collect([node], null, [], units);
      }
    }

    const groups: Array<{ bucket: StyleBucketName; metadata: Metadata; nodes: ChildNode[] }> = [];
    const append = (bucket: StyleBucketName, metadata: Metadata, node: ChildNode) => {
      const last = groups[groups.length - 1];
      if (last && last.bucket === bucket && JSON.stringify(last.metadata) === JSON.stringify(metadata)) {
        last.nodes.push(node);
      } else {
        groups.push({ bucket, metadata, nodes: [node] });
      }
    };

    for (const unit of units) {
      const { bucket: conditionsBucket, ...conditionsMetadata } = getConditionsMetadata(unit.conditions);
      if (unit.type === 'node') {
        const bucket = /keyframes$/.test(unit.node.name) ? 'k' : conditionsBucket ?? 'd';
        append(
          bucket,
          { ...conditionsMetadata, p: MODULES_PRIORITY },
          wrapInConditions(unit.node.clone(), unit.conditions),
        );
        continue;
      }

      const rule = postcss.rule({ selector: unit.selectors.join(',\n') });
      unit.declarations.forEach(declaration => rule.append(declaration.clone()));
      const selectorInfos = unit.selectors.map(selector => getSelectorInfo(selector, resetClassNames));
      if (selectorInfos[0].reset) {
        // `makeResetStyles()` puts a whole class, pseudo-classes included, in the reset bucket and its at-rules in `s`,
        // without property priorities.
        const atRule = unit.conditions.some(condition => !isBucketNeutralCondition(condition));
        append(atRule ? 's' : 'r', { p: MODULES_PRIORITY }, wrapInConditions(rule, unit.conditions));
        continue;
      }

      // Griffel buckets a selector key (`':active,:focus-within'`) by its first pseudo-class, while a CSS Modules
      // selector list may also merge separate keys (`.disabled, .disabled:hover`): every selector takes the latest
      // bucket of the selectors up to it.
      const selectorsByBucket = new Map<StyleBucketName, string[]>();
      let latest = 0;
      unit.selectors.forEach((selector, index) => {
        latest = Math.max(latest, styleBucketOrdering.indexOf(selectorInfos[index].bucket));
        const bucket = conditionsBucket ?? styleBucketOrdering[latest];
        selectorsByBucket.set(bucket, [...(selectorsByBucket.get(bucket) ?? []), selector]);
      });
      const declarationsByPriority = new Map<number, Declaration[]>();
      for (const declaration of unit.declarations) {
        const priority = getPropertyPriority(declaration.prop.toLowerCase(), logicalProperties);
        declarationsByPriority.set(priority, [...(declarationsByPriority.get(priority) ?? []), declaration]);
      }
      for (const [bucket, selectors] of selectorsByBucket) {
        for (const [priority, declarations] of declarationsByPriority) {
          const bucketRule = postcss.rule({ selector: selectors.join(',\n') });
          declarations.forEach(declaration => bucketRule.append(declaration.clone()));
          append(bucket, { ...conditionsMetadata, p: priority }, wrapInConditions(bucketRule, unit.conditions));
        }
      }
    }

    root.removeAll();
    root.append(kept);
    const marker = (text: string) => postcss.comment({ text, raws: { left: '', right: '' } });
    for (const { bucket, metadata, nodes } of groups) {
      // Exactly the markers of Griffel's extraction loader (`generateCSSRules()` in `@griffel/css-extraction-utils`).
      root.append(marker(`* @griffel:css-start [${bucket}] ${JSON.stringify(metadata)} *`));
      root.append(nodes);
      root.append(marker('* @griffel:css-end *'));
    }
  },
});
postcssGriffelBuckets.postcss = true;
