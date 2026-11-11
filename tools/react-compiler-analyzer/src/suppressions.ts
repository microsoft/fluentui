import type { ParsedSource } from './ast/parse';
import type { SourceSpan } from './types';

/** Pinned to the Babel compiler's default ESLint suppression policy. */
export const COMPILER_RELEVANT_ESLINT_RULES = ['react-hooks/exhaustive-deps', 'react-hooks/rules-of-hooks'] as const;

export type SuppressionKind = 'disable' | 'enable' | 'disable-next-line' | 'disable-line';

export interface SuppressionScope {
  ruleId: string;
  span: SourceSpan;
}

export interface SuppressionDirective {
  kind: SuppressionKind;
  /** null means all rules, not an unknown rule. */
  rules: string[] | null;
  relevantRules: string[];
  reason: string | null;
  commentSpan: SourceSpan;
  scopes: SuppressionScope[];
}

/**
 * Source evidence only: scope overlap never establishes compiler candidate identity.
 * Parse comments rather than source text so strings/templates cannot create suppressions.
 */
export function collectSuppressions(parsed: ParsedSource): SuppressionDirective[] {
  const { source, locations } = parsed;
  const directives: SuppressionDirective[] = [];
  for (const comment of parsed.comments) {
    const reasonMatch = /\s-{2,}\s/.exec(comment.value);
    const directiveText = reasonMatch ? comment.value.slice(0, reasonMatch.index) : comment.value;
    const match = /^\s*eslint-(disable-next-line|disable-line|disable|enable)(?:\s+([\s\S]*?))?\s*$/.exec(
      directiveText,
    );
    if (!match) {
      continue;
    }
    const kind = match[1] as SuppressionKind;
    if (comment.type === 'Line' && (kind === 'disable' || kind === 'enable')) {
      continue;
    }
    const start = locations.positionAt(comment.start);
    const end = locations.positionAt(comment.end);
    if (kind === 'disable-line' && start.line !== end.line) {
      continue;
    }
    const list = (match[2] ?? '').trim();
    const reason = reasonMatch ? comment.value.slice(reasonMatch.index + reasonMatch[0].length).trim() : null;
    const rules = list
      ? list
          .split(',')
          .map(rule => rule.trim().replace(/^(['"])(.*)\1$/, '$2'))
          .filter(Boolean)
      : null;
    // ESLint permits quoted names and empty comma-separated entries. Never turn
    // a nonempty, malformed list into an all-rules disable.
    if (rules?.length === 0) {
      continue;
    }
    if (rules?.some(rule => !/^(?:@[\w-]+\/)?[\w-]+(?:\/[\w-]+)*$/.test(rule))) {
      continue;
    }
    directives.push({
      kind,
      rules,
      relevantRules: COMPILER_RELEVANT_ESLINT_RULES.filter(rule => rules === null || rules.includes(rule)),
      reason,
      commentSpan: { start, end },
      scopes: [],
    });
  }

  const active = new Map<string, SuppressionScope[]>();
  const span = (start: number, end: number): SourceSpan => ({
    start: locations.positionAt(start),
    end: locations.positionAt(end),
  });
  for (const directive of directives) {
    const { kind, commentSpan, relevantRules } = directive;
    if (kind === 'enable') {
      for (const rule of relevantRules) {
        for (const scope of active.get(rule) ?? []) {
          scope.span.end = commentSpan.start;
        }
        active.delete(rule);
      }
    } else if (kind === 'disable') {
      for (const ruleId of relevantRules) {
        const scope = { ruleId, span: span(commentSpan.end.offset, source.length) };
        directive.scopes.push(scope);
        const scopes = active.get(ruleId) ?? [];
        scopes.push(scope);
        active.set(ruleId, scopes);
      }
    } else {
      const line = kind === 'disable-line' ? commentSpan.start.line : commentSpan.end.line + 1;
      const start = locations.offsetAt(line, 0);
      const end = locations.offsetAt(line + 1, 0);
      for (const ruleId of relevantRules) {
        directive.scopes.push({ ruleId, span: span(start, end) });
      }
    }
  }
  return directives;
}

export function compilerSuppressions(parsed: ParsedSource): SuppressionDirective[] {
  return collectSuppressions(parsed).filter(
    directive => directive.kind !== 'enable' && directive.relevantRules.length > 0,
  );
}
