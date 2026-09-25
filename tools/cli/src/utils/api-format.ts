import type { ApiSignature, ApiSymbol, EffectiveMember, EffectiveTypeView } from '@fluentui/api-metadata';

import type { ApiRouteSummary, ApiSymbolDetail } from './api-query';
import type { CliDiagnostic } from './diagnostics';
import { formatDiagnostics } from './output';
import { markdownCode, markdownCodeBlock, markdownTable } from './markdown';
import { formatPackageSpecifier } from './package-inventory';

const typeLinkLimitation = 'checker-rendered effective type expressions do not include semantic reference spans';
const platformDeclarationPackages = new Set(['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript']);

export function formatApiIndex(
  routes: readonly ApiRouteSummary[],
  diagnostics: readonly CliDiagnostic[],
  verbose = false,
): string {
  const exports = groupRoutes(routes);
  return [
    `# Fluent UI APIs (${exports.length})`,
    '',
    ...markdownTable(
      ['Export', 'Namespace', 'Import path', 'Version', 'Source', ...(verbose ? ['Conditions'] : [])],
      exports.map(group => {
        const route = group[0];
        return [
          markdownCode(route.export),
          route.namespace,
          markdownCode(importPath(route)),
          route.version,
          route.metadata ? 'metadata' : 'declarations',
          ...(verbose ? [group.map(item => markdownCode(item.conditions.join(', '))).join('; ')] : []),
        ];
      }),
    ),
    ...formatApiDiagnostics(diagnostics, verbose),
  ].join('\n');
}

export function formatApiDetail(
  detail: ApiSymbolDetail,
  diagnostics: readonly CliDiagnostic[],
  verbose = false,
  includeInherited = false,
  expandTypes = false,
): string {
  const symbol = detail.symbol;
  const declarations = symbol?.declarations ?? [];
  const isComponent = symbol?.classifications.some(classification => classification.facet === 'component');
  const lines = [`# ${markdownCode(detail.name)}`];
  const documentation = [...new Set(declarations.flatMap(item => (item.documentation ? [item.documentation] : [])))];
  lines.push(
    '',
    ...documentation,
    '',
    '## Import',
    '',
    ...(detail.recommendedImport
      ? [markdownCodeBlock(detail.recommendedImport.statement), '', importReasons[detail.recommendedImport.reason]]
      : [
          `No import recommended (${detail.importStatus}). See the diagnostics below.`,
          ...(detail.importCandidates.length
            ? [
                '',
                ...markdownTable(
                  ['Candidate import path', 'Selection'],
                  detail.importCandidates.map(candidate => [
                    markdownCode(candidate.moduleSpecifier),
                    markdownCode(`--from ${candidate.moduleSpecifier}`),
                  ]),
                ),
              ]
            : []),
        ]),
  );
  if (verbose) {
    lines.push(
      '',
      `**Defined in:** ${markdownCode(`${detail.package}@${detail.version}`)}`,
      '',
      '## All export routes',
      '',
      ...markdownTable(
        ['Import path', 'Namespace', 'Discovered via', 'Conditions'],
        groupRoutes(detail.routes).map(group => [
          markdownCode(importPath(group[0])),
          group[0].namespace,
          group[0].source,
          group.map(route => markdownCode(route.conditions.join(', '))).join('; '),
        ]),
      ),
    );
  }
  if (!symbol) {
    lines.push('', 'API detail is unavailable.');
  } else {
    if (symbol.type) {
      lines.push('', '## Type', '', markdownCodeBlock(symbol.type.text));
    }
    const signatures = apiSignatures(symbol);
    if (signatures.length) {
      lines.push('', '## Signatures', '', markdownCodeBlock(signatures.map(formatSignature).join('\n')));
    }
    for (const deprecated of new Set(declarations.map(item => item.deprecated).filter(Boolean))) {
      lines.push('', `**Deprecated:** ${deprecated}`);
    }
    if (isComponent) {
      if (!symbol.props) {
        lines.push(
          '',
          '## Props',
          '',
          'Props unavailable: regenerate this package catalog with the current metadata generator.',
        );
      } else if (symbol.props.length === 0) {
        lines.push('', '## Props', '', 'Props: none.');
      }
      for (const props of symbol.props ?? []) {
        const signature = signatures.find(item => item.id === props.signature);
        const suffix = (symbol.props?.length ?? 0) > 1 ? ` — overload ${(signature?.overload ?? 0) + 1}` : '';
        lines.push('', ...formatMembers(`Props${suffix}`, props.type, includeInherited, expandTypes));
      }
    } else if (symbol.effectiveType) {
      const title = symbol.classifications.some(classification => classification.facet === 'props')
        ? 'Props'
        : 'Members';
      lines.push('', ...formatMembers(title, symbol.effectiveType, includeInherited, expandTypes));
    }
  }
  if (verbose && detail.recordId) {
    lines.push('', `**Record:** ${markdownCode(detail.recordId)}`);
  }
  const views = [symbol?.effectiveType, ...(symbol?.props?.map(props => props.type) ?? [])];
  if (views.some(view => view?.members.some(member => member.presentation?.kind === 'slot'))) {
    lines.push(
      '',
      '**Slots:** These are slot input types; supported shorthand values and constraints depend on each declaration.',
      'See [customizing components with slots](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--docs).',
      ...(expandTypes ? [] : ['Use `--expand-types` for full effective types; `--json` includes both views.']),
    );
  }
  lines.push(...formatApiDiagnostics(diagnostics, verbose));
  return lines.join('\n');
}

const importReasons = {
  'explicit-from': 'Uses the import path explicitly selected with `--from`.',
  'explicit-package': 'Uses a verified public export of the explicitly selected package.',
  'configured-catalog': 'Selected from your configured public catalogs.',
  'system-preset': "Selected from the system preset's public catalogs.",
  'discovered-package': "Selected from the discovered package's verified public exports.",
};

function formatMembers(
  title: string,
  view: EffectiveTypeView,
  includeInherited: boolean,
  expandTypes: boolean,
): string[] {
  const lines = [`## ${title}`, '', ...(view.type ? [`**Type:** ${markdownCode(view.type.text)}`, ''] : [])];
  if (view.status.status === 'unsupported') {
    return [...lines, `Unavailable: ${view.status.reasons?.join('; ') ?? 'No verified expanded type is available'}`];
  }
  lines.push(`${view.members.length} members. **(required)** marks required members; — means no documented default.`);
  const { control, inherited, unclassified } = groupMembers(view.members);
  if (control.length) {
    lines.push('', `### Control-defined (${control.length})`, '', ...formatMemberTable(control, title, expandTypes));
  }
  if (unclassified.length) {
    lines.push(
      '',
      `### Unclassified (${unclassified.length}; declaration provenance unavailable)`,
      '',
      ...formatMemberTable(unclassified, title, expandTypes),
    );
  }
  if (inherited.length) {
    lines.push('', `### Inherited React/DOM (${inherited.length})`, '');
    if (includeInherited) {
      lines.push(...formatMemberTable(inherited, title, expandTypes));
    } else {
      lines.push('Use `--include-inherited` to expand these members, or `--json` for all metadata.');
      for (const member of inherited.filter(item => item.status.status !== 'complete')) {
        lines.push(
          `- ${markdownCode(member.name)}: ${member.status.status} - ${
            member.status.reasons?.join('; ') ?? 'Member detail is incomplete'
          }`,
        );
      }
    }
  }
  const reasons = view.status.reasons?.filter(reason => reason !== typeLinkLimitation) ?? [];
  if (reasons.length) {
    lines.push('', `**Note:** ${reasons.join('; ')}`);
  }
  if (view.unionBranches?.length) {
    lines.push('', `**Union variants:** ${view.unionBranches.length} (members above are shared between variants).`);
    lines.push(
      ...(inherited.length && !includeInherited
        ? ['Use `--include-inherited` or `--json` for full variant expressions.']
        : ['', ...view.unionBranches.map(branch => markdownCodeBlock(branch.text))]),
    );
  }
  return lines;
}

function formatMemberTable(members: readonly EffectiveMember[], title: string, expandTypes: boolean): string[] {
  return markdownTable(
    [title.startsWith('Props') ? 'Prop' : 'Member', 'Type', 'Default', 'Description'],
    members.map(member => [
      markdownCode(member.name),
      markdownCode(memberType(member, expandTypes) ?? '(type unavailable)'),
      member.defaultValue !== undefined ? markdownCode(member.defaultValue) : '—',
      [
        member.documentation?.replace(/\s+/g, ' ').trim(),
        ...(!member.optional ? ['**(required)**'] : []),
        ...(member.readonly ? ['**(readonly)**'] : []),
        ...(member.deprecated ? [`**Deprecated:** ${member.deprecated}`] : []),
        ...(member.status.status !== 'complete'
          ? [`**${member.status.status}:** ${member.status.reasons?.join('; ') ?? 'Member detail is incomplete'}`]
          : []),
      ]
        .filter(Boolean)
        .join(' '),
    ]),
  );
}

export function apiSignatures(symbol: ApiSymbol): ApiSignature[] {
  return symbol.effectiveType
    ? symbol.effectiveType.signatures
    : symbol.declarations.flatMap(declaration => declaration.signatures ?? []);
}

export function formatSignature(signature: ApiSignature): string {
  const generics = signature.typeParameters.map(
    parameter =>
      `${parameter.name}${parameter.constraint ? ` extends ${parameter.constraint.text}` : ''}${
        parameter.default ? ` = ${parameter.default.text}` : ''
      }`,
  );
  const parameters = signature.parameters.map(
    parameter =>
      `${parameter.rest ? '...' : ''}${parameter.name}${parameter.optional ? '?' : ''}: ${parameter.type.text}`,
  );
  return `${signature.kind === 'construct' ? 'new ' : ''}${
    generics.length ? `<${generics.join(', ')}>` : ''
  }(${parameters.join(', ')}) => ${signature.returnType.text}`;
}

export function groupRoutes(routes: readonly ApiRouteSummary[]): ApiRouteSummary[][] {
  const groups = new Map<string, ApiRouteSummary[]>();
  for (const route of routes) {
    const key = JSON.stringify([
      importPath(route),
      route.version,
      route.export,
      route.namespace,
      route.exportKind,
      route.typeOnly,
      route.metadata,
    ]);
    const group = groups.get(key);
    if (group) {
      if (!group.some(item => item.conditions.join('\0') === route.conditions.join('\0'))) {
        group.push(route);
      }
    } else {
      groups.set(key, [route]);
    }
  }
  return [...groups.values()];
}

export function importPath(route: ApiRouteSummary): string {
  return formatPackageSpecifier(route.requestedPackage, route.entrypoint);
}

export function groupMembers(
  members: readonly EffectiveMember[],
): Record<'control' | 'inherited' | 'unclassified', EffectiveMember[]> {
  const groups: ReturnType<typeof groupMembers> = { control: [], inherited: [], unclassified: [] };
  for (const member of members) {
    const group = !member.declarationPackages?.length
      ? 'unclassified'
      : member.declarationPackages.every(packageName => platformDeclarationPackages.has(packageName))
      ? 'inherited'
      : 'control';
    groups[group].push(member);
  }
  return groups;
}

export function memberType(member: EffectiveMember, expandTypes = false): string | undefined {
  return (
    (!expandTypes ? member.presentation?.summary : undefined) ??
    member.type?.text ??
    member.signatures?.map(formatSignature).join('; ')
  );
}

function formatApiDiagnostics(diagnostics: readonly CliDiagnostic[], verbose: boolean): string[] {
  if (verbose) {
    return diagnostics.length ? ['', '## Diagnostics', '', formatDiagnostics(diagnostics)] : [];
  }
  const actionable = diagnostics.filter(
    diagnostic =>
      diagnostic.severity === 'error' ||
      (diagnostic.code !== 'reader.indexPartial' &&
        !(diagnostic.code === 'reader.effectiveTypePartial' && diagnostic.message === typeLinkLimitation)),
  );
  return [
    ...(diagnostics.some(diagnostic => diagnostic.code === 'reader.indexPartial')
      ? ['', 'Catalog coverage is partial; use `fluentui-cli doctor` to inspect missing APIs.']
      : []),
    ...(actionable.length ? ['', '## Diagnostics', '', formatDiagnostics(actionable)] : []),
  ];
}
