import type { EffectiveMember, EffectiveTypeView, ProductFacet } from '@fluentui/api-metadata';
import { apiSignatures, formatSignature, groupMembers, groupRoutes, importPath, memberType } from './api-format';
import type { ApiRouteSummary, ApiSymbolDetail } from './api-query';
import type { RecommendedImport } from './api-import';

export interface DenseApiOptions {
  verbose?: boolean;
  includeInherited?: boolean;
  expandTypes?: boolean;
}

export interface DenseApiMember {
  name: string;
  type: string | null;
  required: boolean;
  origin: 'control' | 'unclassified' | 'inherited';
  readonly?: true;
  default?: string;
  description?: string;
  deprecated?: string;
  /** A display summary, not an exact TypeScript expression. */
  typeSummary?: 'slot';
  status?: EffectiveMember['status'];
}

export interface DenseApiMemberView {
  type?: string;
  status: EffectiveTypeView['status'];
  total: number;
  members: DenseApiMember[];
  omittedInherited: number;
  omittedIssues?: Array<{ name: string; status: EffectiveMember['status'] }>;
  unionVariants?: { count: number; expressions?: string[] };
}

export interface DenseApiRoute {
  name: string;
  namespace: ApiRouteSummary['namespace'];
  importPath: string;
  version: string;
  exportKind: ApiRouteSummary['exportKind'];
  typeOnly: boolean;
  authority: 'metadata' | 'declarations';
  conditions?: string[][];
}

export interface DenseApiDetail {
  name: string;
  detailStatus: 'available' | 'unavailable';
  recommendedImport: RecommendedImport | null;
  importStatus: ApiSymbolDetail['importStatus'];
  importCandidates?: RecommendedImport[];
  description?: string;
  deprecated?: string[];
  facets?: ProductFacet[];
  type?: string;
  signatures?: string[];
  effectiveTypeStatus?: EffectiveTypeView['status'];
  /** null means unavailable metadata; [] means the component has no props. */
  props?: Array<DenseApiMemberView & { signature?: string }> | null;
  members?: DenseApiMemberView;
  notes?: string[];
  provenance?: {
    package: string;
    version: string;
    recordId?: string;
    routes: DenseApiRoute[];
  };
}

export function createDenseApiIndex(
  routes: readonly ApiRouteSummary[],
  options: DenseApiOptions = {},
): DenseApiRoute[] {
  return groupRoutes(routes).map(group => {
    const route = group[0];
    return {
      name: route.export,
      namespace: route.namespace,
      importPath: importPath(route),
      version: route.version,
      exportKind: route.exportKind,
      typeOnly: route.typeOnly,
      authority: route.metadata ? 'metadata' : 'declarations',
      ...(options.verbose ? { conditions: group.map(item => item.conditions) } : {}),
    };
  });
}

export function createDenseApiDetail(detail: ApiSymbolDetail, options: DenseApiOptions = {}): DenseApiDetail {
  const symbol = detail.symbol;
  const result: DenseApiDetail = {
    name: detail.name,
    detailStatus: symbol ? 'available' : 'unavailable',
    recommendedImport: detail.recommendedImport,
    importStatus: detail.importStatus,
    ...(!detail.recommendedImport ? { importCandidates: detail.importCandidates } : {}),
    ...(options.verbose
      ? {
          provenance: {
            package: detail.package,
            version: detail.version,
            ...(detail.recordId ? { recordId: detail.recordId } : {}),
            routes: createDenseApiIndex(detail.routes, options),
          },
        }
      : {}),
  };
  if (!symbol) {
    return result;
  }
  const descriptions = [
    ...new Set(
      symbol.declarations.flatMap(declaration => (declaration.documentation ? [declaration.documentation] : [])),
    ),
  ];
  const deprecated = [
    ...new Set(symbol.declarations.flatMap(declaration => (declaration.deprecated ? [declaration.deprecated] : []))),
  ];
  const signatures = apiSignatures(symbol);
  const isComponent = symbol.classifications.some(classification => classification.facet === 'component');
  if (descriptions.length) {
    result.description = descriptions.join('\n\n');
  }
  if (deprecated.length) {
    result.deprecated = deprecated;
  }
  result.facets = [...new Set(symbol.classifications.map(classification => classification.facet))];
  if (symbol.type) {
    result.type = symbol.type.text;
  }
  if (symbol.effectiveType) {
    result.effectiveTypeStatus = symbol.effectiveType.status;
  }
  if (signatures.length) {
    result.signatures = signatures.map(formatSignature);
  }
  const notes: string[] = [];
  if (isComponent) {
    result.props =
      symbol.props?.map(props => {
        const signature = signatures.find(candidate => candidate.id === props.signature);
        return {
          ...createMemberView(props.type, options),
          ...((symbol.props?.length ?? 0) > 1 && signature ? { signature: formatSignature(signature) } : {}),
        };
      }) ?? null;
    if (!symbol.props) {
      notes.push('Props unavailable: regenerate this package catalog with the current metadata generator.');
    }
  } else if (symbol.effectiveType) {
    result.members = createMemberView(symbol.effectiveType, options);
  }
  const views = [...(result.props ?? []), ...(result.members ? [result.members] : [])];
  if (views.some(view => view.members.some(member => member.typeSummary === 'slot'))) {
    notes.push('Slot summaries describe input slots, not exact TypeScript aliases. Use --expand-types for full types.');
  }
  if (views.some(view => view.omittedInherited > 0)) {
    notes.push('Use --include-inherited to expand inherited React/DOM members.');
  }
  if (notes.length) {
    result.notes = notes;
  }
  return result;
}

function createMemberView(view: EffectiveTypeView, options: DenseApiOptions): DenseApiMemberView {
  const { control, unclassified, inherited } = groupMembers(view.members);
  const selected = [
    ...control.map(member => denseMember(member, 'control', options)),
    ...unclassified.map(member => denseMember(member, 'unclassified', options)),
    ...(options.includeInherited ? inherited.map(member => denseMember(member, 'inherited', options)) : []),
  ];
  const issues = options.includeInherited ? [] : inherited.filter(member => member.status.status !== 'complete');
  return {
    ...(view.type ? { type: view.type.text } : {}),
    status: view.status,
    total: view.members.length,
    members: view.status.status === 'unsupported' ? [] : selected,
    omittedInherited: options.includeInherited ? 0 : inherited.length,
    ...(issues.length ? { omittedIssues: issues.map(member => ({ name: member.name, status: member.status })) } : {}),
    ...(view.unionBranches?.length
      ? {
          unionVariants: {
            count: view.unionBranches.length,
            ...(!inherited.length || options.includeInherited
              ? { expressions: view.unionBranches.map(branch => branch.text) }
              : {}),
          },
        }
      : {}),
  };
}

function denseMember(
  member: EffectiveMember,
  origin: DenseApiMember['origin'],
  options: DenseApiOptions,
): DenseApiMember {
  return {
    name: member.name,
    type: memberType(member, options.expandTypes) ?? null,
    required: !member.optional,
    origin,
    ...(member.readonly ? { readonly: true as const } : {}),
    ...(member.defaultValue === undefined ? {} : { default: member.defaultValue }),
    ...(member.documentation ? { description: member.documentation.replace(/\s+/g, ' ').trim() } : {}),
    ...(member.deprecated ? { deprecated: member.deprecated } : {}),
    ...(!options.expandTypes && member.presentation ? { typeSummary: member.presentation.kind } : {}),
    ...(member.status.status !== 'complete' ? { status: member.status } : {}),
  };
}
