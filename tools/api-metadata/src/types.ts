export type MetadataNamespace = 'type' | 'value';

export type MetadataStatus = 'complete' | 'partial' | 'unavailable';

export type CapabilityStatus = 'supported' | 'partial' | 'unsupported';

export type DiagnosticSeverity = 'info' | 'warning' | 'error';

export type DeclarationKind =
  | 'class'
  | 'const'
  | 'constructor'
  | 'enum'
  | 'function'
  | 'interface'
  | 'method'
  | 'namespace'
  | 'property'
  | 'type-alias'
  | 'variable';

export type TypeRelationshipKind =
  | 'alias'
  | 'conditional'
  | 'extends'
  | 'indexed-access'
  | 'intersection'
  | 'mapped'
  | 'union';

export type ProductFacet = 'component' | 'context' | 'hook' | 'props' | 'render' | 'slots' | 'state' | 'utility';

export interface MetadataSchemaVersion {
  major: 1;
  revision: number;
}

export interface Fingerprint {
  algorithm: 'sha256';
  value: string;
}

export interface GeneratorIdentity {
  name: string;
  version: string;
}

export interface PackageIdentity {
  name: string;
  version: string;
  integrity?: Fingerprint;
}

export interface MetadataDiagnostic {
  code: string;
  severity: DiagnosticSeverity;
  message: string;
  path?: string;
  symbol?: string;
}

export interface StatusDetail<TStatus extends string> {
  status: TStatus;
  reasons?: string[];
}

export interface MetadataCapabilities {
  api: StatusDetail<CapabilityStatus>;
  effectiveTypes: StatusDetail<CapabilityStatus>;
  guidance: StatusDetail<CapabilityStatus>;
  search: StatusDetail<CapabilityStatus>;
}

export interface MetadataCompleteness {
  api: StatusDetail<MetadataStatus>;
  guidance: StatusDetail<MetadataStatus>;
  search: StatusDetail<MetadataStatus>;
}

export interface DeclarationInput {
  path: string;
  conditions: string[];
  fingerprint: Fingerprint;
}

export interface DependencyInput {
  requested: string;
  package: PackageIdentity;
  entrypoint: string;
  conditions: string[];
  declarationPath?: string;
  declarationFingerprint: Fingerprint;
}

export interface SourceLocation {
  file: string;
  start?: number;
  end?: number;
}

export interface LocalSymbolReference {
  kind: 'local';
  symbol: string;
  record?: string;
}

export interface DependencySymbolReference {
  kind: 'dependency';
  package: string;
  entrypoint: string;
  export: string;
  namespace: MetadataNamespace;
}

export type SymbolReference = LocalSymbolReference | DependencySymbolReference;

export interface TypeReferenceSpan {
  start: number;
  end: number;
  status: 'resolved' | 'unresolved' | 'unsupported';
  target?: SymbolReference;
  reason?: string;
}

export interface TypeExpression {
  text: string;
  references: TypeReferenceSpan[];
}

export interface TypeParameter {
  name: string;
  constraint?: TypeExpression;
  default?: TypeExpression;
}

export interface ApiParameter {
  name: string;
  type: TypeExpression;
  optional: boolean;
  rest: boolean;
}

export interface ApiSignature {
  id: string;
  kind: 'call' | 'construct' | 'method';
  typeParameters: TypeParameter[];
  parameters: ApiParameter[];
  returnType: TypeExpression;
  overload: number;
  documentation?: string;
  deprecated?: string;
  source?: SourceLocation;
}

export type SlotTarget =
  | { kind: 'intrinsic'; name: string; role: 'default' | 'alternate' }
  | { kind: 'component'; name: string; reference: SymbolReference; role: 'default' };

export interface SlotPresentation {
  kind: 'slot';
  summary: string;
  basis: 'declaration' | 'semantic';
  slotType: SymbolReference;
  targets: SlotTarget[];
  nullable?: boolean;
}

export interface EffectiveMember {
  name: string;
  kind: 'property' | 'method' | 'index';
  optional: boolean;
  readonly: boolean;
  type?: TypeExpression;
  signatures?: ApiSignature[];
  sources: SymbolReference[];
  /** Owners of the original member declarations, not packages referenced by the member's type. */
  declarationPackages?: string[];
  /** Authored @default or @defaultValue text; not an inferred runtime initializer. */
  defaultValue?: string;
  /** Documentation-only view; the full effective type remains in type. */
  presentation?: SlotPresentation;
  status: StatusDetail<'complete' | 'partial' | 'unsupported'>;
  documentation?: string;
  deprecated?: string;
}

export interface EffectiveTypeView {
  status: StatusDetail<'complete' | 'partial' | 'unsupported'>;
  type?: TypeExpression;
  members: EffectiveMember[];
  signatures: ApiSignature[];
  unionBranches?: TypeExpression[];
}

export interface TypeRelationship {
  kind: TypeRelationshipKind;
  type: TypeExpression;
}

export interface ApiDeclaration {
  id: string;
  kind: DeclarationKind;
  namespaces: MetadataNamespace[];
  source: SourceLocation;
  type?: TypeExpression;
  signatures?: ApiSignature[];
  relationships?: TypeRelationship[];
  documentation?: string;
  deprecated?: string;
}

export interface SymbolClassification {
  facet: ProductFacet;
  confidence: 'authored' | 'heuristic';
  evidence: string[];
}

export interface ApiSymbol {
  id: string;
  name: string;
  namespaces: MetadataNamespace[];
  declarations: ApiDeclaration[];
  type?: TypeExpression;
  relationships: TypeRelationship[];
  effectiveType?: EffectiveTypeView;
  props?: Array<{ signature: string; type: EffectiveTypeView }>;
  classifications: SymbolClassification[];
  fingerprint: Fingerprint;
}

export interface LocalExportTarget {
  kind: 'local';
  record: string;
  symbol: string;
}

export interface BundledExportTarget {
  kind: 'bundled';
  record: string;
  symbol: string;
}

export interface DependencyExportTarget {
  kind: 'dependency';
  package: string;
  entrypoint: string;
  export: string;
  namespace: MetadataNamespace;
  requested?: string;
  range?: string;
  dependencyRole?: 'dependency' | 'devDependency' | 'optionalDependency' | 'peerDependency';
  buildPackage?: PackageIdentity;
}

export type ExportTarget = LocalExportTarget | BundledExportTarget | DependencyExportTarget;

export interface ExportRoute {
  id: string;
  entrypoint: string;
  export: string;
  namespace: MetadataNamespace;
  conditions: string[];
  exportKind: 'default' | 'named' | 'namespace';
  importedName?: string;
  typeOnly: boolean;
  /** Package-local declaration files establishing this public binding. */
  declarationInputs?: string[];
  target: ExportTarget;
  classifications: SymbolClassification[];
}

export interface MetadataRecordDescriptor {
  id: string;
  kind: 'api' | 'guidance' | 'search';
  path: string;
  fingerprint: Fingerprint;
  symbols?: string[];
  source?: BundledRecordSource;
}

export interface BundledPackageSource {
  requested: string;
  package: PackageIdentity;
  declarationInputs: DeclarationInput[];
}

export interface BundledRecordSource {
  kind: 'dependency';
  packages: BundledPackageSource[];
}

export interface PackageIndex {
  kind: 'package-index';
  schema: MetadataSchemaVersion;
  generator: GeneratorIdentity;
  package: PackageIdentity;
  system?: string;
  capabilities: MetadataCapabilities;
  completeness: MetadataCompleteness;
  declarationInputs: DeclarationInput[];
  records: MetadataRecordDescriptor[];
  exports: ExportRoute[];
  diagnostics: MetadataDiagnostic[];
}

export interface ApiRecord {
  kind: 'api-record';
  schema: MetadataSchemaVersion;
  generator: GeneratorIdentity;
  package: PackageIdentity;
  recordId: string;
  declarationInputs: DeclarationInput[];
  dependencyInputs: DependencyInput[];
  completeness: StatusDetail<MetadataStatus>;
  symbols: ApiSymbol[];
  diagnostics: MetadataDiagnostic[];
}

export type MetadataDocument = PackageIndex | ApiRecord;

export interface GeneratorOptions {
  packageRoot: string;
  packageName?: string;
  system?: string;
  entrypoints?: string[];
  declarationConditions?: string[];
}

export interface GeneratorResult {
  index: PackageIndex;
  records: ApiRecord[];
  diagnostics: MetadataDiagnostic[];
}

export interface MetadataGenerator {
  generate(options: GeneratorOptions): Promise<GeneratorResult>;
}
