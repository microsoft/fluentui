/* eslint-disable no-bitwise */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import ts = require('typescript');

import { toCanonicalJsonValue } from './serialize';
import type {
  ApiDeclaration,
  ApiParameter,
  ApiRecord,
  ApiSignature,
  ApiSymbol,
  DependencyExportTarget,
  DependencyInput,
  EffectiveMember,
  EffectiveTypeView,
  ExportRoute,
  Fingerprint,
  MetadataDiagnostic,
  MetadataNamespace,
  PackageIdentity,
  ProductFacet,
  SourceLocation,
  SlotPresentation,
  SlotTarget,
  SymbolClassification,
  SymbolReference,
  TypeExpression,
  TypeParameter,
  TypeReferenceSpan,
  TypeRelationship,
  TypeRelationshipKind,
} from './types';
import type { DeclarationEntry, PackageManifest } from './package-exports';

const MAX_EFFECTIVE_MEMBERS = 512;
const MAX_REACHABLE_SYMBOLS = 2_000;
const MAX_REFERENCE_SPANS = 512;
const MAX_TYPE_TEXT = 100_000;
const TYPE_FORMAT_FLAGS =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
  ts.TypeFormatFlags.WriteTypeArgumentsOfSignature;

export interface ExtractionResult {
  records: ApiRecord[];
  routes: ExportRoute[];
  dependencyRouteInputs: Map<string, DependencyInput>;
  diagnostics: MetadataDiagnostic[];
}

export interface ExportSelection {
  entrypoint: string;
  export: string;
  namespace: MetadataNamespace;
}

interface RecordContext {
  checker: ts.TypeChecker;
  program: ts.Program;
  manifest: PackageManifest;
  entry: DeclarationEntry;
  sourceFile: ts.SourceFile;
  recordId: string;
  diagnostics: MetadataDiagnostic[];
  importBindings: Map<string, ImportBinding>;
  exportBindings: Map<string, ImportBinding>;
  symbolIds: Map<ts.Symbol, string>;
  dependencyInputs: Map<string, DependencyInput>;
  declarationInputs: Map<string, ApiRecord['declarationInputs'][number]>;
  localDeclarationFiles: Set<string>;
  declarationPackages: Map<string, string | undefined>;
}

interface ImportBinding {
  requested: string;
  importedName: string;
  typeOnly: boolean;
}

interface ResolvedDependency {
  target: DependencyExportTarget;
  input: DependencyInput;
}

export function extractDeclarations(
  manifest: PackageManifest,
  entries: readonly DeclarationEntry[],
  packageIdentity: PackageIdentity,
  declarationInputs: Map<string, ApiRecord['declarationInputs'][number]>,
  generator: ApiRecord['generator'],
  schema: ApiRecord['schema'],
  selectedExports?: readonly ExportSelection[],
): ExtractionResult {
  const diagnostics: MetadataDiagnostic[] = [];
  if (entries.length === 0) {
    return { records: [], routes: [], dependencyRouteInputs: new Map(), diagnostics };
  }

  const compilerOptions: ts.CompilerOptions = {
    allowJs: false,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
    target: ts.ScriptTarget.ESNext,
  };
  const program = ts.createProgram({
    rootNames: entries.map(entry => entry.declarationPath),
    options: compilerOptions,
  });
  const checker = program.getTypeChecker();
  diagnostics.push(...collectProgramDiagnostics(program, manifest.root));
  diagnostics.push(...collectUnresolvedDeclarationImports(program, manifest.root, compilerOptions));

  const records: ApiRecord[] = [];
  const routes: ExportRoute[] = [];
  const dependencyRouteInputs = new Map<string, DependencyInput>();
  const declarationPackages = new Map<string, string | undefined>();

  for (const entry of entries) {
    const sourceFile = program.getSourceFile(entry.declarationPath);
    if (!sourceFile) {
      diagnostics.push({
        code: 'generator.sourceUnavailable',
        severity: 'error',
        message: `TypeScript did not load declaration input for ${entry.entrypoint}`,
        path: entry.declarationRelativePath,
      });
      continue;
    }

    const sourceDiagnostics = diagnostics.filter(diagnostic => diagnostic.path === entry.declarationRelativePath);
    const recordDiagnostics: MetadataDiagnostic[] = [...sourceDiagnostics];
    const recordId = createRecordId(entry);
    if (!declarationInputs.has(declarationInputKey(entry))) {
      throw new Error(`Missing declaration input for ${entry.declarationRelativePath}`);
    }

    const importBindings = collectImportBindings(sourceFile);
    const context: RecordContext = {
      checker,
      program,
      manifest,
      entry,
      sourceFile,
      recordId,
      diagnostics: recordDiagnostics,
      importBindings,
      exportBindings: collectExportBindings(sourceFile, importBindings),
      symbolIds: new Map(),
      dependencyInputs: new Map(),
      declarationInputs,
      localDeclarationFiles: new Set([entry.declarationRelativePath]),
      declarationPackages,
    };
    trackLocalModuleGraph(context);
    const extracted = extractEntry(
      context,
      selectedExports?.filter(selection => selection.entrypoint === entry.entrypoint),
    );
    routes.push(...extracted.routes);
    for (const [routeId, input] of extracted.dependencyRouteInputs) {
      dependencyRouteInputs.set(routeId, input);
    }

    if (extracted.symbols.length > 0) {
      const hasErrors = recordDiagnostics.some(diagnostic => diagnostic.severity === 'error');
      records.push({
        kind: 'api-record',
        schema,
        generator,
        package: packageIdentity,
        recordId,
        declarationInputs: collectRecordDeclarationInputs(context),
        dependencyInputs: [...context.dependencyInputs.values()].sort(compareDependencyInputs),
        completeness: hasErrors
          ? { status: 'partial', reasons: ['semantic extraction reported errors'] }
          : { status: 'complete' },
        symbols: extracted.symbols,
        diagnostics: recordDiagnostics.sort(compareDiagnostics),
      });
    }

    diagnostics.push(...recordDiagnostics.slice(sourceDiagnostics.length));
  }

  return {
    records: records.sort((left, right) => left.recordId.localeCompare(right.recordId)),
    routes: routes.sort(compareRoutes),
    dependencyRouteInputs,
    diagnostics: diagnostics.sort(compareDiagnostics),
  };
}

export function declarationInputKey(entry: DeclarationEntry): string {
  return `${entry.declarationRelativePath}\0${entry.conditions.join(',')}`;
}

function collectRecordDeclarationInputs(context: RecordContext): ApiRecord['declarationInputs'] {
  return [...context.localDeclarationFiles]
    .sort((left, right) => left.localeCompare(right))
    .map(path => {
      const key = `${path}\0${context.entry.conditions.join(',')}`;
      const existing = context.declarationInputs.get(key);
      if (existing) {
        return existing;
      }
      const input: ApiRecord['declarationInputs'][number] = {
        path,
        conditions: context.entry.conditions,
        fingerprint: fingerprintText(readFileSync(join(context.manifest.root, path))),
      };
      context.declarationInputs.set(key, input);
      return input;
    });
}

function extractEntry(
  context: RecordContext,
  selectedExports?: readonly ExportSelection[],
): {
  symbols: ApiSymbol[];
  routes: ExportRoute[];
  dependencyRouteInputs: Map<string, DependencyInput>;
} {
  const moduleSymbol = context.checker.getSymbolAtLocation(context.sourceFile);
  if (!moduleSymbol) {
    return { symbols: [], routes: [], dependencyRouteInputs: new Map() };
  }

  const exports = context.checker
    .getExportsOfModule(moduleSymbol)
    .sort((left, right) => left.getName().localeCompare(right.getName()));
  const localTargets = new Map<ts.Symbol, { exportName: string; exportSymbol: ts.Symbol }>();
  const routePlans: Array<{
    exportName: string;
    exportSymbol: ts.Symbol;
    targetSymbol: ts.Symbol;
    namespaces: MetadataNamespace[];
    exportKind: ExportRoute['exportKind'];
    typeOnly: boolean;
    importedName?: string;
    dependency?: ResolvedDependency;
  }> = [];

  for (const exportSymbol of exports) {
    const exportName = normalizeExportName(exportSymbol.getName());
    const selectedNamespaces = selectedExports
      ?.filter(selection => selection.export === exportName)
      .map(selection => selection.namespace);
    if (selectedExports && selectedNamespaces?.length === 0) {
      continue;
    }
    const exportKind = getExportKind(exportName, exportSymbol);
    const namespaceExport = exportKind === 'namespace';
    const targetSymbol = namespaceExport ? exportSymbol : resolveAliasedSymbol(exportSymbol, context.checker);
    const namespaces = (namespaceExport ? ['value' as const] : getSymbolNamespaces(targetSymbol)).filter(
      namespace => !selectedNamespaces || selectedNamespaces.includes(namespace),
    );
    if (namespaces.length === 0) {
      context.diagnostics.push({
        code: 'generator.exportNamespaceUnknown',
        severity: 'warning',
        message: `Could not determine a type/value namespace for ${exportName}`,
        path: context.entry.declarationRelativePath,
        symbol: safeId(exportName),
      });
      continue;
    }

    const binding = context.exportBindings.get(exportName) ?? context.importBindings.get(exportName);
    const targetIsLocal = namespaceExport || isLocalSymbol(targetSymbol, context.manifest.root);
    const dependency = targetIsLocal
      ? undefined
      : createDependencyTarget(context, targetSymbol, binding, namespaces[0], exportName);
    const importedName =
      binding?.importedName ?? (exportName !== targetSymbol.getName() ? targetSymbol.getName() : undefined);

    routePlans.push({
      exportName,
      exportSymbol,
      targetSymbol,
      namespaces,
      exportKind,
      typeOnly: binding?.typeOnly ?? (namespaces.length === 1 && namespaces[0] === 'type'),
      importedName,
      dependency,
    });

    if (!dependency) {
      localTargets.set(targetSymbol, { exportName, exportSymbol });
    }
  }

  for (const statement of context.sourceFile.statements) {
    if (!ts.isExportAssignment(statement) || !statement.isExportEquals) {
      continue;
    }
    if (
      selectedExports &&
      !selectedExports.some(selection => selection.export === 'default' && selection.namespace === 'value')
    ) {
      continue;
    }
    if (routePlans.some(plan => plan.exportName === 'default')) {
      continue;
    }
    const assignedSymbol = context.checker.getSymbolAtLocation(statement.expression);
    if (!assignedSymbol) {
      context.diagnostics.push({
        code: 'generator.exportAssignmentUnresolved',
        severity: 'error',
        message: 'Could not resolve the CommonJS export assignment',
        path: context.entry.declarationRelativePath,
      });
      continue;
    }
    const targetSymbol = resolveAliasedSymbol(assignedSymbol, context.checker);
    const binding = findBindingForNode(statement.expression, context);
    const dependency = isLocalSymbol(targetSymbol, context.manifest.root)
      ? undefined
      : createDependencyTarget(context, targetSymbol, binding, 'value', 'default');
    routePlans.push({
      exportName: 'default',
      exportSymbol: assignedSymbol,
      targetSymbol,
      namespaces: ['value'],
      exportKind: 'default',
      typeOnly: false,
      importedName: targetSymbol.getName(),
      dependency,
    });
    if (!dependency) {
      localTargets.set(targetSymbol, { exportName: 'default', exportSymbol: assignedSymbol });
    }
  }

  const reachable = collectReachableSymbols([...localTargets.keys()], context);
  assignSymbolIds(reachable, context);
  const symbols = [...reachable]
    .map(symbol => createApiSymbol(symbol, context))
    .sort((left, right) => left.id.localeCompare(right.id));
  const routes = routePlans.flatMap(plan =>
    plan.namespaces.map(namespace => {
      const target = plan.dependency
        ? { ...plan.dependency.target, namespace }
        : {
            kind: 'local' as const,
            record: context.recordId,
            symbol: expectSymbolId(context, plan.targetSymbol),
          };
      return {
        id: createRouteId(context.entry, plan.exportName, namespace),
        entrypoint: context.entry.entrypoint,
        export: plan.exportName,
        namespace,
        conditions: context.entry.conditions,
        exportKind: plan.exportKind,
        ...(plan.importedName ? { importedName: plan.importedName } : {}),
        typeOnly: plan.typeOnly,
        declarationInputs: collectRouteDeclarationPaths(plan.exportSymbol, plan.targetSymbol, context),
        target,
        classifications: classifySymbol(plan.exportName, plan.targetSymbol, context.checker),
      } satisfies ExportRoute;
    }),
  );

  const dependencyRouteInputs = new Map<string, DependencyInput>();
  for (const route of routes) {
    const plan = routePlans.find(
      candidate =>
        candidate.exportName === route.export && candidate.namespaces.includes(route.namespace) && candidate.dependency,
    );
    if (plan?.dependency) {
      dependencyRouteInputs.set(route.id, plan.dependency.input);
    }
  }

  return { symbols, routes, dependencyRouteInputs };
}

function collectRouteDeclarationPaths(
  exportSymbol: ts.Symbol,
  targetSymbol: ts.Symbol,
  context: RecordContext,
): string[] {
  const targets = new Set(
    [...(exportSymbol.declarations ?? []), ...(targetSymbol.declarations ?? [])]
      .filter(declaration => isLocalNode(declaration, context.manifest.root))
      .map(declaration => declaration.getSourceFile()),
  );
  const pending: Array<{ source: ts.SourceFile; path: ts.SourceFile[] }> = [
    { source: context.sourceFile, path: [context.sourceFile] },
  ];
  const visited = new Set<ts.SourceFile>();

  while (pending.length > 0) {
    const current = pending.shift()!;
    if (visited.has(current.source)) {
      continue;
    }
    visited.add(current.source);
    if (targets.has(current.source)) {
      return current.path.map(source => toPosix(relative(context.manifest.root, source.fileName)));
    }
    for (const dependency of collectLocalModuleDependencies(current.source, context)) {
      pending.push({ source: dependency, path: [...current.path, dependency] });
    }
  }

  return [context.entry.declarationRelativePath];
}

function collectLocalModuleDependencies(source: ts.SourceFile, context: RecordContext): ts.SourceFile[] {
  const dependencies = new Set<ts.SourceFile>();
  const visit = (node: ts.Node): void => {
    const specifier =
      ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
        ? node.moduleSpecifier
        : ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
        ? node.moduleReference.expression
        : ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)
        ? node.argument.literal
        : undefined;
    if (specifier) {
      const module = context.checker.getSymbolAtLocation(specifier);
      for (const declaration of module?.declarations ?? []) {
        const dependency = declaration.getSourceFile();
        if (dependency.isDeclarationFile && isLocalNode(dependency, context.manifest.root)) {
          dependencies.add(dependency);
        }
      }
    }
    node.forEachChild(visit);
  };
  source.forEachChild(visit);
  return [...dependencies].sort((left, right) => left.fileName.localeCompare(right.fileName));
}

function collectReachableSymbols(initial: ts.Symbol[], context: RecordContext): Set<ts.Symbol> {
  const reachable = new Set<ts.Symbol>();
  const queue = [...initial];

  while (queue.length > 0) {
    const symbol = queue.shift()!;
    if (reachable.has(symbol)) {
      continue;
    }
    if (reachable.size >= MAX_REACHABLE_SYMBOLS) {
      context.diagnostics.push({
        code: 'generator.symbolLimit',
        severity: 'error',
        message: `Record exceeds the ${MAX_REACHABLE_SYMBOLS} reachable-symbol limit`,
        path: context.entry.declarationRelativePath,
      });
      break;
    }

    reachable.add(symbol);
    for (const declaration of getSemanticDeclarations(symbol, context.manifest.root)) {
      trackLocalDeclaration(declaration, context);
      visitReferenceNodes(declaration, node => {
        const referenced = getReferencedSymbol(node, context.checker);
        if (!referenced) {
          return;
        }
        const target = resolveAliasedSymbol(referenced, context.checker);
        if (!reachable.has(target) && isLocalSymbol(target, context.manifest.root) && !isTypeParameterSymbol(target)) {
          queue.push(target);
        }
      });
    }
  }

  return reachable;
}

function assignSymbolIds(symbols: Set<ts.Symbol>, context: RecordContext): void {
  const used = new Set<string>();
  const ordered = [...symbols].sort((left, right) =>
    symbolSortKey(left, context).localeCompare(symbolSortKey(right, context)),
  );

  for (const symbol of ordered) {
    const base = `symbol:${safeId(normalizeExportName(symbol.getName()))}`;
    let id = base;
    if (used.has(id)) {
      id = `${base}:${shortHash(symbolSortKey(symbol, context))}`;
    }
    used.add(id);
    context.symbolIds.set(symbol, id);
  }
}

function createApiSymbol(symbol: ts.Symbol, context: RecordContext): ApiSymbol {
  const id = expectSymbolId(context, symbol);
  const name = normalizeExportName(symbol.getName());
  const namespaces = getSymbolNamespaces(symbol);
  const semanticDeclarations = getSemanticDeclarations(symbol, context.manifest.root);
  const declarations = semanticDeclarations.map((declaration, index) =>
    createApiDeclaration(symbol, declaration, `${id}:declaration:${index}`, index, context),
  );
  if (declarations.length === 0) {
    declarations.push({
      id: `${id}:declaration:0`,
      kind: 'namespace',
      namespaces: namespaces.length > 0 ? namespaces : ['value'],
      source: sourceLocation(context.sourceFile, context.manifest.root),
      type: { text: `typeof import("${context.entry.entrypoint}")`, references: [] },
    });
  }

  const relationships = dedupeRelationships(declarations.flatMap(declaration => declaration.relationships ?? []));
  const type = declarations
    .map(declaration => declaration.type)
    .find((value): value is TypeExpression => value !== undefined);
  const classifications = classifySymbol(name, symbol, context.checker);
  const effectiveType = createEffectiveType(symbol, id, context);
  const props = classifications.some(classification => classification.facet === 'component')
    ? createComponentProps(symbol, id, context)
    : undefined;
  const normalizedNamespaces: MetadataNamespace[] = namespaces.length > 0 ? namespaces : ['value'];
  const valueWithoutFingerprint = {
    id,
    name,
    namespaces: normalizedNamespaces,
    declarations,
    ...(type ? { type } : {}),
    relationships,
    ...(effectiveType ? { effectiveType } : {}),
    ...(props ? { props } : {}),
    classifications,
  };

  return {
    ...valueWithoutFingerprint,
    fingerprint: fingerprintValue(valueWithoutFingerprint),
  };
}

function createApiDeclaration(
  symbol: ts.Symbol,
  declaration: ts.Declaration,
  id: string,
  overload: number,
  context: RecordContext,
): ApiDeclaration {
  const kind = declarationKind(declaration);
  const namespaces = declarationNamespaces(symbol, declaration);
  const source = sourceLocation(declaration, context.manifest.root);
  const type = declarationTypeExpression(symbol, declaration, context);
  const signatures = declarationSignatures(declaration, overload, context);
  const relationships = declarationRelationships(declaration, context);
  const documentation = documentationForSymbol(symbol, context.checker);
  const deprecated = deprecatedForSymbol(symbol);

  return {
    id,
    kind,
    namespaces: namespaces.length > 0 ? namespaces : getSymbolNamespaces(symbol),
    source,
    ...(type ? { type } : {}),
    ...(signatures.length > 0 ? { signatures } : {}),
    ...(relationships.length > 0 ? { relationships } : {}),
    ...(documentation ? { documentation } : {}),
    ...(deprecated ? { deprecated } : {}),
  };
}

function declarationTypeExpression(
  symbol: ts.Symbol,
  declaration: ts.Declaration,
  context: RecordContext,
): TypeExpression | undefined {
  if (ts.isTypeAliasDeclaration(declaration)) {
    const value = typeExpressionFromNode(declaration.type, context);
    const typeParameters = declaration.typeParameters
      ?.map(parameter => parameter.getText(context.sourceFile))
      .join(', ');
    const prefix = `${declaration.name.text}${typeParameters ? `<${typeParameters}>` : ''} = `;
    return {
      text: `${prefix}${value.text}`,
      references: value.references.map(reference => ({
        ...reference,
        start: reference.start + prefix.length,
        end: reference.end + prefix.length,
      })),
    };
  }
  if (ts.isVariableDeclaration(declaration) && declaration.type) {
    return typeExpressionFromNode(declaration.type, context);
  }
  if (ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration)) {
    return declaration.type ? typeExpressionFromNode(declaration.type, context) : undefined;
  }
  if (
    ts.isClassDeclaration(declaration) ||
    ts.isInterfaceDeclaration(declaration) ||
    ts.isEnumDeclaration(declaration)
  ) {
    return checkerTypeExpression(getDeclaredOrValueType(symbol, declaration, context.checker), declaration, context);
  }
  return undefined;
}

function declarationSignatures(declaration: ts.Declaration, overload: number, context: RecordContext): ApiSignature[] {
  if (isSignatureDeclaration(declaration)) {
    const signature = context.checker.getSignatureFromDeclaration(declaration);
    return signature ? [createSignature(signature, declaration, overload, context)] : [];
  }
  if (ts.isVariableDeclaration(declaration)) {
    const type = context.checker.getTypeAtLocation(declaration);
    return [
      ...type
        .getCallSignatures()
        .map((signature, index) =>
          createSignature(signature, signature.getDeclaration(), index, context, 'call', 'checker'),
        ),
      ...type
        .getConstructSignatures()
        .map((signature, index) =>
          createSignature(signature, signature.getDeclaration(), index, context, 'construct', 'checker'),
        ),
    ];
  }
  return [];
}

function createSignature(
  signature: ts.Signature,
  declaration: ts.SignatureDeclaration | undefined,
  overload: number,
  context: RecordContext,
  forcedKind?: ApiSignature['kind'],
  typeSource: 'declaration' | 'checker' = 'declaration',
): ApiSignature {
  if (declaration) {
    trackLocalDeclaration(declaration, context);
  }
  const typeParameters = createSignatureTypeParameters(signature, declaration, context, typeSource);
  const parameters: ApiParameter[] = signature.getParameters().map((parameter, index) => {
    const parameterDeclaration = declaration?.parameters[index] ?? parameter.valueDeclaration;
    if (parameterDeclaration) {
      trackLocalDeclaration(parameterDeclaration, context);
    }
    const parameterType = parameterDeclaration
      ? context.checker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration)
      : context.checker.getAnyType();
    return {
      name: parameter.getName(),
      type:
        typeSource === 'declaration' &&
        parameterDeclaration &&
        ts.isParameter(parameterDeclaration) &&
        parameterDeclaration.type
          ? typeExpressionFromNode(parameterDeclaration.type, context)
          : checkerTypeExpression(parameterType, context.sourceFile, context),
      optional:
        (parameter.flags & ts.SymbolFlags.Optional) !== 0 ||
        Boolean(
          parameterDeclaration &&
            ts.isParameter(parameterDeclaration) &&
            (parameterDeclaration.questionToken || parameterDeclaration.initializer),
        ),
      rest: Boolean(
        parameterDeclaration && 'dotDotDotToken' in parameterDeclaration && parameterDeclaration.dotDotDotToken,
      ),
    };
  });
  const returnType =
    typeSource === 'declaration' && declaration?.type
      ? typeExpressionFromNode(declaration.type, context)
      : checkerTypeExpression(context.checker.getReturnTypeOfSignature(signature), context.sourceFile, context);
  const source =
    declaration && isLocalNode(declaration, context.manifest.root)
      ? sourceLocation(declaration, context.manifest.root)
      : undefined;
  const documentation = ts.displayPartsToString(signature.getDocumentationComment(context.checker)).trim();
  const deprecated = deprecatedFromTags(signature.getJsDocTags());
  const kind =
    forcedKind ??
    (declaration && ts.isConstructSignatureDeclaration(declaration)
      ? 'construct'
      : declaration && (ts.isMethodDeclaration(declaration) || ts.isMethodSignature(declaration))
      ? 'method'
      : 'call');

  return {
    id: `signature:${kind}:${overload}`,
    kind,
    typeParameters,
    parameters,
    returnType,
    overload,
    ...(documentation ? { documentation } : {}),
    ...(deprecated ? { deprecated } : {}),
    ...(source ? { source } : {}),
  };
}

function createSignatureTypeParameters(
  signature: ts.Signature,
  declaration: ts.SignatureDeclaration | undefined,
  context: RecordContext,
  typeSource: 'declaration' | 'checker',
): TypeParameter[] {
  if (typeSource === 'declaration') {
    return (declaration?.typeParameters ?? []).map(parameter => ({
      name: parameter.name.text,
      ...(parameter.constraint ? { constraint: typeExpressionFromNode(parameter.constraint, context) } : {}),
      ...(parameter.default ? { default: typeExpressionFromNode(parameter.default, context) } : {}),
    }));
  }

  return (signature.typeParameters ?? []).map((parameter, index) => {
    const constraint = context.checker.getBaseConstraintOfType(parameter);
    const defaultType = context.checker.getDefaultFromTypeParameter(parameter);
    return {
      name: parameter.symbol?.getName() ?? declaration?.typeParameters?.[index]?.name.text ?? `T${index}`,
      ...(constraint ? { constraint: checkerTypeExpression(constraint, context.sourceFile, context) } : {}),
      ...(defaultType ? { default: checkerTypeExpression(defaultType, context.sourceFile, context) } : {}),
    };
  });
}

function declarationRelationships(declaration: ts.Declaration, context: RecordContext): TypeRelationship[] {
  const relationships: TypeRelationship[] = [];
  if (ts.isTypeAliasDeclaration(declaration)) {
    relationships.push({ kind: 'alias', type: typeExpressionFromNode(declaration.type, context) });
    collectStructuralRelationships(declaration.type, context, relationships);
  }
  if (ts.isInterfaceDeclaration(declaration) || ts.isClassDeclaration(declaration)) {
    for (const clause of declaration.heritageClauses ?? []) {
      for (const type of clause.types) {
        relationships.push({ kind: 'extends', type: typeExpressionFromNode(type, context) });
        collectStructuralRelationships(type, context, relationships);
      }
    }
  }
  if (ts.isVariableDeclaration(declaration) && declaration.type) {
    collectStructuralRelationships(declaration.type, context, relationships);
  }
  return dedupeRelationships(relationships);
}

function collectStructuralRelationships(
  node: ts.TypeNode | ts.ExpressionWithTypeArguments,
  context: RecordContext,
  relationships: TypeRelationship[],
): void {
  const visit = (current: ts.Node): void => {
    if (ts.isTypeNode(current) || ts.isExpressionWithTypeArguments(current)) {
      const kind = relationshipKind(current);
      if (kind) {
        relationships.push({ kind, type: typeExpressionFromNode(current, context) });
      }
    }
    current.forEachChild(visit);
  };
  visit(node);
}

function relationshipKind(node: ts.Node): TypeRelationshipKind | undefined {
  if (ts.isIntersectionTypeNode(node)) {
    return 'intersection';
  }
  if (ts.isUnionTypeNode(node)) {
    return 'union';
  }
  if (ts.isConditionalTypeNode(node)) {
    return 'conditional';
  }
  if (ts.isMappedTypeNode(node)) {
    return 'mapped';
  }
  if (ts.isIndexedAccessTypeNode(node)) {
    return 'indexed-access';
  }
  return undefined;
}

function createEffectiveType(
  symbol: ts.Symbol,
  symbolId: string,
  context: RecordContext,
): EffectiveTypeView | undefined {
  const declaration = getSemanticDeclarations(symbol, context.manifest.root)[0];
  if (!declaration) {
    return undefined;
  }
  const type = getDeclaredOrValueType(symbol, declaration, context.checker);
  return expandEffectiveType(type, symbolId, declaration, context);
}

function createComponentProps(symbol: ts.Symbol, symbolId: string, context: RecordContext): ApiSymbol['props'] {
  const declaration = getSemanticDeclarations(symbol, context.manifest.root)[0];
  if (!declaration) {
    return undefined;
  }
  const type = getDeclaredOrValueType(symbol, declaration, context.checker);
  return type.getCallSignatures().flatMap((signature, index) => {
    const parameter = signature.getParameters()[0];
    if (!parameter) {
      return [];
    }
    const parameterType = context.checker.getTypeOfSymbolAtLocation(parameter, declaration);
    const expanded = expandEffectiveType(parameterType, symbolId, declaration, context);
    return [
      {
        signature: `signature:call:${index}`,
        type: expanded ?? {
          status:
            parameterType.flags & ts.TypeFlags.Object
              ? { status: 'complete' as const }
              : { status: 'unsupported' as const, reasons: ['Props cannot be expanded into members'] },
          type: checkerTypeExpression(parameterType, context.sourceFile, context),
          members: [],
          signatures: [],
        },
      },
    ];
  });
}

function expandEffectiveType(
  type: ts.Type,
  symbolId: string,
  declaration: ts.Declaration,
  context: RecordContext,
): EffectiveTypeView | undefined {
  const properties = context.checker.getPropertiesOfType(type);
  const callSignatures = type.getCallSignatures();
  const constructSignatures = type.getConstructSignatures();
  const indexInfos = context.checker.getIndexInfosOfType(type);
  if (
    properties.length === 0 &&
    callSignatures.length === 0 &&
    constructSignatures.length === 0 &&
    indexInfos.length === 0
  ) {
    return undefined;
  }

  const reasons = ['checker-rendered effective type expressions do not include semantic reference spans'];
  const boundedProperties = properties.slice(0, MAX_EFFECTIVE_MEMBERS);
  if (properties.length > MAX_EFFECTIVE_MEMBERS) {
    reasons.push(`member count exceeds ${MAX_EFFECTIVE_MEMBERS}`);
  }
  const members: EffectiveMember[] = boundedProperties.map(property =>
    createEffectiveMember(property, symbolId, declaration, context),
  );
  for (const info of indexInfos) {
    if (members.length >= MAX_EFFECTIVE_MEMBERS) {
      reasons.push(`member count exceeds ${MAX_EFFECTIVE_MEMBERS}`);
      break;
    }
    const declarationPackages = getDeclarationPackages(info.declaration ? [info.declaration] : [], context);
    members.push({
      name: `[${context.checker.typeToString(info.keyType)}]`,
      kind: 'index',
      optional: false,
      readonly: info.isReadonly,
      type: checkerTypeExpression(info.type, context.sourceFile, context),
      sources: [{ kind: 'local', symbol: symbolId }],
      ...(declarationPackages ? { declarationPackages } : {}),
      status: { status: 'complete' },
    });
  }

  const signatures = [
    ...callSignatures.map((signature, index) =>
      createSignature(signature, signature.getDeclaration(), index, context, 'call', 'checker'),
    ),
    ...constructSignatures.map((signature, index) =>
      createSignature(signature, signature.getDeclaration(), index, context, 'construct', 'checker'),
    ),
  ];
  const typeExpression = checkerTypeExpression(type, context.sourceFile, context);
  if (typeExpression.text.length >= MAX_TYPE_TEXT) {
    reasons.push(`type text reached ${MAX_TYPE_TEXT} characters`);
  }

  return {
    status: { status: 'partial', reasons: [...new Set(reasons)] },
    type: typeExpression,
    members: members.sort((left, right) => left.name.localeCompare(right.name)),
    signatures,
    ...(type.isUnion()
      ? { unionBranches: type.types.map(branch => checkerTypeExpression(branch, context.sourceFile, context)) }
      : {}),
  };
}

function createEffectiveMember(
  property: ts.Symbol,
  ownerSymbolId: string,
  location: ts.Node,
  context: RecordContext,
): EffectiveMember {
  const declaration = property.valueDeclaration ?? property.declarations?.[0] ?? location;
  trackLocalDeclaration(declaration, context);
  const type = context.checker.getTypeOfSymbolAtLocation(property, declaration);
  const signatures = type.getCallSignatures();
  const method = property.declarations?.some(
    candidate => ts.isMethodDeclaration(candidate) || ts.isMethodSignature(candidate),
  );
  const documentation = documentationForSymbol(property, context.checker);
  const deprecated = deprecatedForSymbol(property);
  const documentedDefaults = [
    ...new Set(
      property
        .getJsDocTags(context.checker)
        .filter(tag => tag.name === 'default' || tag.name === 'defaultValue')
        .map(tag => ts.displayPartsToString(tag.text).trim())
        .filter(Boolean),
    ),
  ];
  const rootDeclarations = context.checker
    .getRootSymbols(property)
    .map(root =>
      root.declarations?.length ? root.declarations : root.valueDeclaration ? [root.valueDeclaration] : [],
    );
  const declarationPackages = rootDeclarations.every(declarations => declarations.length > 0)
    ? getDeclarationPackages(rootDeclarations.flat(), context)
    : undefined;
  const closedLiteralUnion =
    type.aliasSymbol &&
    type.isUnion() &&
    type.types.every(branch =>
      Boolean(branch.flags & (ts.TypeFlags.Literal | ts.TypeFlags.Null | ts.TypeFlags.Undefined)),
    );
  const memberType = closedLiteralUnion
    ? {
        text: boundedTypeText(
          type.types
            .map(branch => context.checker.typeToString(branch, context.sourceFile, TYPE_FORMAT_FLAGS))
            .join(' | '),
          context,
          declaration,
        ),
        references: [],
      }
    : checkerTypeExpression(type, context.sourceFile, context);
  const presentation = createSlotPresentation(property, type, context);

  return {
    name: property.getName(),
    kind: method ? 'method' : 'property',
    optional: (property.flags & ts.SymbolFlags.Optional) !== 0,
    readonly: Boolean(property.declarations?.some(candidate => hasModifier(candidate, ts.SyntaxKind.ReadonlyKeyword))),
    type: memberType,
    ...(presentation ? { presentation } : {}),
    ...(signatures.length > 0
      ? {
          signatures: signatures.map((signature, index) =>
            createSignature(
              signature,
              signature.getDeclaration(),
              index,
              context,
              method ? 'method' : 'call',
              'checker',
            ),
          ),
        }
      : {}),
    sources: [{ kind: 'local', symbol: ownerSymbolId }],
    ...(declarationPackages ? { declarationPackages } : {}),
    ...(documentedDefaults.length === 1 ? { defaultValue: documentedDefaults[0] } : {}),
    status:
      documentedDefaults.length > 1
        ? { status: 'partial', reasons: [`Conflicting documented defaults: ${documentedDefaults.join('; ')}`] }
        : { status: 'complete' },
    ...(documentation ? { documentation } : {}),
    ...(deprecated ? { deprecated } : {}),
  };
}

function createSlotPresentation(
  property: ts.Symbol,
  effectiveType: ts.Type,
  context: RecordContext,
): SlotPresentation | undefined {
  if (effectiveType.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown | ts.TypeFlags.Never | ts.TypeFlags.StringLike)) {
    return undefined;
  }
  const candidates: SlotPresentation[] = [];
  for (const root of context.checker.getRootSymbols(property)) {
    if (!root.declarations?.length) {
      return undefined;
    }
    for (const declaration of root.declarations) {
      if (!(ts.isPropertySignature(declaration) || ts.isPropertyDeclaration(declaration)) || !declaration.type) {
        return undefined;
      }
      const declaredType = context.checker.getTypeFromTypeNode(declaration.type);
      const nonNullable =
        effectiveType.aliasSymbol?.getName() === 'NonNullable' &&
        isStandardLibrarySymbol(effectiveType.aliasSymbol) &&
        effectiveType.aliasTypeArguments?.[0] === declaredType;
      // Original slot declarations also back resolved state members; those are not slot inputs.
      if (effectiveType !== declaredType && !nonNullable) {
        return undefined;
      }
      const presentation = slotPresentationFromNode(declaration.type, new Map(), new Set(), context);
      if (!presentation) {
        return undefined;
      }
      trackLocalDeclaration(declaration, context);
      candidates.push(
        nonNullable && effectiveType !== declaredType
          ? { ...presentation, basis: 'semantic', summary: `NonNullable<${presentation.summary}>`, nullable: false }
          : presentation,
      );
    }
  }
  const first = candidates[0];
  return first && candidates.every(candidate => JSON.stringify(candidate) === JSON.stringify(first))
    ? first
    : undefined;
}

function slotPresentationFromNode(
  input: ts.TypeNode,
  bindings: Map<ts.Symbol, ts.TypeNode>,
  visited: Set<ts.Symbol>,
  context: RecordContext,
): SlotPresentation | undefined {
  if (visited.size > 16) {
    return undefined;
  }
  const node = boundTypeNode(input, bindings, context.checker);
  if (ts.isParenthesizedTypeNode(node)) {
    return slotPresentationFromNode(node.type, bindings, visited, context);
  }
  if (ts.isIntersectionTypeNode(node)) {
    const slots = node.types.flatMap(type => {
      const slot = slotPresentationFromNode(type, bindings, visited, context);
      return slot ? [slot] : [];
    });
    if (slots.length !== 1) {
      return undefined;
    }
    const { nullable, ...slot } = slots[0];
    return { ...slot, summary: printBoundType(node, bindings, context.checker) };
  }
  if (!ts.isTypeReferenceNode(node)) {
    return undefined;
  }
  const referenced = getReferencedSymbol(node.typeName, context.checker);
  const symbol = referenced && resolveAliasedSymbol(referenced, context.checker);
  if (!symbol || visited.has(symbol)) {
    return undefined;
  }
  const declaration = symbol.declarations?.find(ts.isTypeAliasDeclaration);
  if (!declaration) {
    return undefined;
  }
  trackLocalDeclaration(declaration, context);
  const typeArguments = node.typeArguments ?? [];
  if (symbol.getName() === 'Slot' && packageNameFromDeclaration(declaration) === '@fluentui/react-utilities') {
    const module = context.checker.getSymbolAtLocation(declaration.getSourceFile());
    const exported =
      module && context.checker.getExportsOfModule(module).find(candidate => candidate.getName() === 'Slot');
    if (!exported || resolveAliasedSymbol(exported, context.checker) !== symbol) {
      return undefined;
    }
    if (!typeArguments[0]) {
      return undefined;
    }
    const slotType = resolveSymbolReference(symbol, declaration.name, context);
    if (!slotType) {
      return undefined;
    }
    const first = boundTypeNode(typeArguments[0], bindings, context.checker);
    const firstType = context.checker.getTypeFromTypeNode(first);
    const targets: SlotTarget[] = [];
    if (firstType.isStringLiteral()) {
      targets.push({ kind: 'intrinsic', name: firstType.value, role: 'default' });
    } else if (ts.isTypeQueryNode(first)) {
      const component = getReferencedSymbol(first.exprName, context.checker);
      let reference = component && resolveSymbolReference(component, first.exprName, context);
      if (reference?.kind === 'dependency' && reference.export === '*') {
        reference =
          ts.isQualifiedName(first.exprName) && ts.isIdentifier(first.exprName.left)
            ? { ...reference, export: first.exprName.right.text }
            : undefined;
      }
      if (reference) {
        targets.push({ kind: 'component', name: first.exprName.getText(), reference, role: 'default' });
      }
    }
    if (typeArguments[1]) {
      const alternate = context.checker.getTypeFromTypeNode(boundTypeNode(typeArguments[1], bindings, context.checker));
      for (const type of alternate.isUnion() ? alternate.types : [alternate]) {
        if (type.isStringLiteral()) {
          targets.push({ kind: 'intrinsic', name: type.value, role: 'alternate' });
        }
      }
    }
    return {
      kind: 'slot',
      summary: `Slot<${typeArguments.map(argument => printBoundType(argument, bindings, context.checker)).join(', ')}>`,
      basis: 'declaration',
      slotType,
      targets,
      ...(!(firstType.flags & ts.TypeFlags.TypeParameter) ? { nullable: true } : {}),
    };
  }
  const next = new Set(visited).add(symbol);
  if (isStandardLibrarySymbol(symbol)) {
    if (
      !['NonNullable', 'Readonly', 'Required', 'Partial', 'Exclude', 'Extract', 'Omit', 'Pick'].includes(
        symbol.getName(),
      ) ||
      !typeArguments[0]
    ) {
      return undefined;
    }
    const slot = slotPresentationFromNode(typeArguments[0], bindings, next, context);
    if (!slot) {
      return undefined;
    }
    const { nullable, ...rest } = slot;
    return {
      ...rest,
      summary: `${symbol.getName()}<${[
        slot.summary,
        ...typeArguments.slice(1).map(argument => printBoundType(argument, bindings, context.checker)),
      ].join(', ')}>`,
      ...(symbol.getName() === 'NonNullable' ? { nullable: false } : {}),
    };
  }
  const aliases = new Map(bindings);
  for (const [index, parameter] of (declaration.typeParameters ?? []).entries()) {
    const parameterSymbol = context.checker.getSymbolAtLocation(parameter.name);
    const argument = typeArguments[index] ?? parameter.default;
    if (parameterSymbol && argument) {
      aliases.set(parameterSymbol, boundTypeNode(argument, bindings, context.checker));
    }
  }
  const slot = slotPresentationFromNode(declaration.type, aliases, next, context);
  if (slot && !isLocalSymbol(symbol, context.manifest.root)) {
    resolveSymbolReference(symbol, declaration, context);
  }
  return slot ? { ...slot, summary: printBoundType(node, bindings, context.checker) } : undefined;
}

function boundTypeNode(node: ts.TypeNode, bindings: Map<ts.Symbol, ts.TypeNode>, checker: ts.TypeChecker): ts.TypeNode {
  const seen = new Set<ts.TypeNode>();
  while (ts.isTypeReferenceNode(node) && !seen.has(node)) {
    seen.add(node);
    const symbol = getReferencedSymbol(node.typeName, checker);
    const bound = symbol && bindings.get(symbol);
    if (!bound) {
      break;
    }
    node = bound;
  }
  return node;
}

function printBoundType(node: ts.TypeNode, bindings: Map<ts.Symbol, ts.TypeNode>, checker: ts.TypeChecker): string {
  const transformed = ts.transform(node, [
    transformation => root => {
      const visitor: ts.Visitor = child => {
        if (ts.isTypeNode(child)) {
          const bound = boundTypeNode(child, bindings, checker);
          if (bound !== child) {
            return ts.visitEachChild(bound, visitor, transformation);
          }
        }
        return ts.visitEachChild(child, visitor, transformation);
      };
      return ts.visitNode(root, visitor, ts.isTypeNode)!;
    },
  ]);
  const text = ts
    .createPrinter({ removeComments: true })
    .printNode(ts.EmitHint.Unspecified, transformed.transformed[0], node.getSourceFile());
  transformed.dispose();
  return text;
}

function getDeclarationPackages(declarations: readonly ts.Declaration[], context: RecordContext): string[] | undefined {
  const packages = new Set<string>();
  for (const declaration of declarations) {
    const source = declaration.getSourceFile();
    if (!source) {
      return undefined;
    }
    trackLocalDeclaration(declaration, context);
    if (!context.declarationPackages.has(source.fileName)) {
      context.declarationPackages.set(source.fileName, packageNameFromDeclaration(declaration));
    }
    const packageName = context.declarationPackages.get(source.fileName);
    if (!packageName) {
      return undefined;
    }
    packages.add(packageName);
  }
  return packages.size ? [...packages].sort() : undefined;
}

function typeExpressionFromNode(
  node: ts.TypeNode | ts.ExpressionWithTypeArguments,
  context: RecordContext,
): TypeExpression {
  const text = boundedTypeText(node.getText(node.getSourceFile()), context, node);
  const base = node.getStart(node.getSourceFile());
  const references: TypeReferenceSpan[] = [];

  visitReferenceNodes(node, referenceNode => {
    if (references.length >= MAX_REFERENCE_SPANS) {
      return;
    }
    const symbol = getReferencedSymbol(referenceNode, context.checker);
    if (!symbol || isTypeParameterSymbol(symbol)) {
      return;
    }
    const target = resolveSymbolReference(symbol, referenceNode, context);
    if (!target) {
      return;
    }
    const start = referenceNode.getStart(referenceNode.getSourceFile()) - base;
    const end = referenceNode.getEnd() - base;
    if (
      start < 0 ||
      end > text.length ||
      references.some(reference => start < reference.end && end > reference.start)
    ) {
      return;
    }
    references.push({ start, end, status: 'resolved', target });
  });

  references.sort((left, right) => left.start - right.start || left.end - right.end);
  if (references.length >= MAX_REFERENCE_SPANS) {
    context.diagnostics.push({
      code: 'generator.referenceLimit',
      severity: 'warning',
      message: `Type expression reached the ${MAX_REFERENCE_SPANS} reference-span limit`,
      path: sourceLocation(node, context.manifest.root).file,
    });
  }
  return { text, references };
}

function checkerTypeExpression(type: ts.Type, location: ts.Node, context: RecordContext): TypeExpression {
  const renderingLocation = getOwnerRelativeTypeLocation(type, location, context);
  return {
    text: boundedTypeText(
      context.checker.typeToString(type, renderingLocation, TYPE_FORMAT_FLAGS),
      context,
      renderingLocation,
    ),
    references: [],
  };
}

function getOwnerRelativeTypeLocation(type: ts.Type, fallback: ts.Node, context: RecordContext): ts.Node {
  const symbols = [type.aliasSymbol, type.getSymbol()].filter((symbol): symbol is ts.Symbol => symbol !== undefined);
  for (const symbol of symbols) {
    for (const declaration of symbol.declarations ?? []) {
      if (isLocalNode(declaration, context.manifest.root)) {
        return declaration;
      }
    }
  }
  return fallback;
}

function boundedTypeText(text: string, context: RecordContext, location: ts.Node): string {
  if (text.length <= MAX_TYPE_TEXT) {
    return text;
  }
  context.diagnostics.push({
    code: 'generator.typeTextLimit',
    severity: 'warning',
    message: `Type expression exceeded ${MAX_TYPE_TEXT} characters and was truncated`,
    path: sourceLocation(location, context.manifest.root).file,
  });
  return text.slice(0, MAX_TYPE_TEXT);
}

function resolveSymbolReference(symbol: ts.Symbol, node: ts.Node, context: RecordContext): SymbolReference | undefined {
  const target = resolveAliasedSymbol(symbol, context.checker);
  if (isLocalSymbol(target, context.manifest.root)) {
    const symbolId = context.symbolIds.get(target);
    return symbolId ? { kind: 'local', symbol: symbolId } : undefined;
  }

  if (isStandardLibrarySymbol(target)) {
    return undefined;
  }
  const binding = findBindingForNode(node, context);
  const dependency = resolveDependency(context, target, binding, target.getName());
  const namespace: MetadataNamespace = node.parent && ts.isTypeQueryNode(node.parent) ? 'value' : 'type';
  return dependency
    ? {
        kind: 'dependency',
        package: dependency.target.package,
        entrypoint: dependency.target.entrypoint,
        export: dependency.target.export,
        namespace,
      }
    : undefined;
}

function createDependencyTarget(
  context: RecordContext,
  symbol: ts.Symbol,
  binding: ImportBinding | undefined,
  namespace: MetadataNamespace,
  exportName: string,
): ResolvedDependency | undefined {
  const dependency = resolveDependency(context, symbol, binding, exportName);
  return dependency ? { target: { ...dependency.target, namespace }, input: dependency.input } : undefined;
}

function resolveDependency(
  context: RecordContext,
  symbol: ts.Symbol,
  binding: ImportBinding | undefined,
  fallbackExportName: string,
): ResolvedDependency | undefined {
  const declaration = symbol.declarations?.[0];
  const requested = binding?.requested ?? packageNameFromDeclaration(declaration);
  if (!requested || requested.startsWith('.')) {
    return undefined;
  }
  const { packageName, entrypoint } = splitPackageSpecifier(requested);
  const resolvedManifest = declaration ? findPackageManifest(declaration.getSourceFile().fileName) : undefined;
  const packageIdentity: PackageIdentity = resolvedManifest
    ? { name: resolvedManifest.name, version: resolvedManifest.version }
    : { name: packageName, version: 'unknown' };
  const declarationContent = declaration ? readFileSync(declaration.getSourceFile().fileName) : Buffer.from('');
  const declarationFingerprint = fingerprintText(declarationContent);
  const role = findDependencyRole(context.manifest, packageName);
  const range = role ? context.manifest.dependencies[role]?.[packageName] : undefined;
  const importedName = binding?.importedName ?? normalizeExportName(symbol.getName()) ?? fallbackExportName;
  const input: DependencyInput = {
    requested,
    package: packageIdentity,
    entrypoint,
    conditions: context.entry.conditions,
    ...(declaration && resolvedManifest
      ? { declarationPath: toPosix(relative(resolvedManifest.root, declaration.getSourceFile().fileName)) }
      : {}),
    declarationFingerprint,
  };
  const key = `${requested}\0${packageIdentity.name}\0${packageIdentity.version}\0${entrypoint}\0${
    input.declarationPath ?? ''
  }\0${declarationFingerprint.value}`;
  context.dependencyInputs.set(key, input);

  return {
    input,
    target: {
      kind: 'dependency',
      package: packageName,
      entrypoint,
      export: importedName,
      namespace: 'type',
      requested,
      ...(range ? { range } : {}),
      ...(role ? { dependencyRole: role } : {}),
      ...(resolvedManifest ? { buildPackage: packageIdentity } : {}),
    },
  };
}

function collectImportBindings(sourceFile: ts.SourceFile): Map<string, ImportBinding> {
  const bindings = new Map<string, ImportBinding>();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    const requested = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (!clause) {
      continue;
    }
    if (clause.name) {
      bindings.set(clause.name.text, {
        requested,
        importedName: 'default',
        typeOnly: clause.isTypeOnly,
      });
    }
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      bindings.set(clause.namedBindings.name.text, {
        requested,
        importedName: '*',
        typeOnly: clause.isTypeOnly,
      });
    }
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const element of clause.namedBindings.elements) {
        bindings.set(element.name.text, {
          requested,
          importedName: element.propertyName?.text ?? element.name.text,
          typeOnly: clause.isTypeOnly || element.isTypeOnly,
        });
      }
    }
  }
  return bindings;
}

function collectExportBindings(
  sourceFile: ts.SourceFile,
  importBindings: ReadonlyMap<string, ImportBinding>,
): Map<string, ImportBinding> {
  const bindings = new Map<string, ImportBinding>();
  for (const statement of sourceFile.statements) {
    if (!ts.isExportDeclaration(statement)) {
      continue;
    }
    if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) {
        const localName = element.propertyName?.text ?? element.name.text;
        const imported = importBindings.get(localName);
        const requested =
          statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
            ? statement.moduleSpecifier.text
            : imported?.requested;
        if (!requested) {
          continue;
        }
        bindings.set(element.name.text, {
          requested,
          importedName: imported?.importedName ?? localName,
          typeOnly: statement.isTypeOnly || element.isTypeOnly || imported?.typeOnly === true,
        });
      }
    } else if (
      statement.exportClause &&
      ts.isNamespaceExport(statement.exportClause) &&
      statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      bindings.set(statement.exportClause.name.text, {
        requested: statement.moduleSpecifier.text,
        importedName: '*',
        typeOnly: statement.isTypeOnly,
      });
    }
  }
  return bindings;
}

function findBindingForNode(node: ts.Node, context: RecordContext): ImportBinding | undefined {
  const source = node.getSourceFile();
  const rootIdentifier = leftmostIdentifier(node);
  if (!rootIdentifier) {
    return undefined;
  }
  if (source === context.sourceFile) {
    return context.importBindings.get(rootIdentifier.text);
  }
  return collectImportBindings(source).get(rootIdentifier.text);
}

function visitReferenceNodes(node: ts.Node, visitor: (node: ts.Node) => void): void {
  const visit = (current: ts.Node): void => {
    if (ts.isTypeReferenceNode(current)) {
      visitor(current.typeName);
      current.typeArguments?.forEach(visit);
      return;
    }
    if (ts.isExpressionWithTypeArguments(current)) {
      visitor(current.expression);
      current.typeArguments?.forEach(visit);
      return;
    }
    if (ts.isTypeQueryNode(current)) {
      visitor(current.exprName);
      return;
    }
    if (ts.isImportTypeNode(current)) {
      if (current.qualifier) {
        visitor(current.qualifier);
      }
      current.typeArguments?.forEach(visit);
      return;
    }
    current.forEachChild(visit);
  };
  visit(node);
}

function getReferencedSymbol(node: ts.Node, checker: ts.TypeChecker): ts.Symbol | undefined {
  return (
    checker.getSymbolAtLocation(node) ??
    (ts.isQualifiedName(node) ? checker.getSymbolAtLocation(node.right) : undefined)
  );
}

function leftmostIdentifier(node: ts.Node): ts.Identifier | undefined {
  if (ts.isIdentifier(node)) {
    return node;
  }
  if (ts.isQualifiedName(node)) {
    return leftmostIdentifier(node.left);
  }
  if (ts.isPropertyAccessExpression(node)) {
    return leftmostIdentifier(node.expression);
  }
  return undefined;
}

function getSemanticDeclarations(symbol: ts.Symbol, packageRoot: string): ts.Declaration[] {
  return (symbol.declarations ?? [])
    .filter(declaration => isLocalNode(declaration, packageRoot))
    .filter(
      declaration =>
        !ts.isImportSpecifier(declaration) &&
        !ts.isImportClause(declaration) &&
        !ts.isNamespaceImport(declaration) &&
        !ts.isExportSpecifier(declaration),
    )
    .sort((left, right) => {
      const file = relative(packageRoot, left.getSourceFile().fileName).localeCompare(
        relative(packageRoot, right.getSourceFile().fileName),
      );
      return file || left.pos - right.pos;
    });
}

function getDeclaredOrValueType(symbol: ts.Symbol, declaration: ts.Declaration, checker: ts.TypeChecker): ts.Type {
  return (symbol.flags & ts.SymbolFlags.Type) !== 0
    ? checker.getDeclaredTypeOfSymbol(symbol)
    : checker.getTypeOfSymbolAtLocation(symbol, declaration);
}

function getSymbolNamespaces(symbol: ts.Symbol): MetadataNamespace[] {
  const namespaces: MetadataNamespace[] = [];
  const hasValue = (symbol.flags & ts.SymbolFlags.Value) !== 0;
  if (
    (symbol.flags & ts.SymbolFlags.Type) !== 0 ||
    ((symbol.flags & ts.SymbolFlags.NamespaceModule) !== 0 && !hasValue)
  ) {
    namespaces.push('type');
  }
  if (hasValue) {
    namespaces.push('value');
  }
  return namespaces;
}

function declarationNamespaces(symbol: ts.Symbol, declaration: ts.Declaration): MetadataNamespace[] {
  if (ts.isClassDeclaration(declaration) || ts.isEnumDeclaration(declaration)) {
    return ['type', 'value'];
  }
  if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration)) {
    return ['type'];
  }
  if (ts.isModuleDeclaration(declaration)) {
    return getSymbolNamespaces(symbol);
  }
  return ['value'];
}

function declarationKind(declaration: ts.Declaration): ApiDeclaration['kind'] {
  if (ts.isClassDeclaration(declaration)) {
    return 'class';
  }
  if (ts.isEnumDeclaration(declaration)) {
    return 'enum';
  }
  if (ts.isFunctionDeclaration(declaration)) {
    return 'function';
  }
  if (ts.isInterfaceDeclaration(declaration)) {
    return 'interface';
  }
  if (ts.isTypeAliasDeclaration(declaration)) {
    return 'type-alias';
  }
  if (ts.isModuleDeclaration(declaration) || ts.isNamespaceExport(declaration)) {
    return 'namespace';
  }
  if (ts.isMethodDeclaration(declaration) || ts.isMethodSignature(declaration)) {
    return 'method';
  }
  if (ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration)) {
    return 'property';
  }
  if (ts.isConstructorDeclaration(declaration) || ts.isConstructSignatureDeclaration(declaration)) {
    return 'constructor';
  }
  if (ts.isVariableDeclaration(declaration)) {
    return declaration.parent.parent.flags & ts.NodeFlags.Const ? 'const' : 'variable';
  }
  return 'variable';
}

function classifySymbol(name: string, symbol: ts.Symbol, checker: ts.TypeChecker): SymbolClassification[] {
  const facets: Array<{ facet: ProductFacet; evidence: string }> = [];
  if (name.endsWith('Props')) {
    facets.push({ facet: 'props', evidence: 'export name ends with Props' });
  } else if (name.endsWith('State')) {
    facets.push({ facet: 'state', evidence: 'export name ends with State' });
  } else if (name.endsWith('Slots')) {
    facets.push({ facet: 'slots', evidence: 'export name ends with Slots' });
  } else if (name.includes('Context')) {
    facets.push({ facet: 'context', evidence: 'export name contains Context' });
  } else if (/^use[A-Z]/.test(name)) {
    facets.push({ facet: 'hook', evidence: 'export name follows the useX hook convention' });
  } else if (/^render[A-Z]/.test(name)) {
    facets.push({ facet: 'render', evidence: 'export name follows the renderX convention' });
  } else if (/^[A-Z]/.test(name) && isComponentType(symbol, checker)) {
    facets.push({ facet: 'component', evidence: 'PascalCase callable API returns JSX or uses ForwardRefComponent' });
  } else {
    facets.push({ facet: 'utility', evidence: 'no stronger product facet matched' });
  }

  return facets.map(({ facet, evidence }) => ({
    facet,
    confidence: 'heuristic',
    evidence: [evidence],
  }));
}

function isComponentType(symbol: ts.Symbol, checker: ts.TypeChecker): boolean {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!declaration) {
    return false;
  }
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const text = checker.typeToString(type, declaration, TYPE_FORMAT_FLAGS);
  if (text.includes('ForwardRefComponent') || text.includes('FunctionComponent')) {
    return true;
  }
  return type.getCallSignatures().some(signature => {
    const returnType = checker.typeToString(checker.getReturnTypeOfSignature(signature));
    return /(?:JSXElement|ReactElement|JSX\.Element)/.test(returnType);
  });
}

function getExportKind(exportName: string, symbol: ts.Symbol): ExportRoute['exportKind'] {
  if (exportName === 'default') {
    return 'default';
  }
  return symbol.declarations?.some(declaration => ts.isNamespaceExport(declaration)) ? 'namespace' : 'named';
}

function isSignatureDeclaration(node: ts.Declaration): node is ts.SignatureDeclaration {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isMethodSignature(node) ||
    ts.isCallSignatureDeclaration(node) ||
    ts.isConstructSignatureDeclaration(node)
  );
}

function isLocalSymbol(symbol: ts.Symbol, packageRoot: string): boolean {
  return Boolean(symbol.declarations?.some(declaration => isLocalNode(declaration, packageRoot)));
}

function isLocalNode(node: ts.Node, packageRoot: string): boolean {
  const fileName = resolve(node.getSourceFile().fileName);
  const path = relative(packageRoot, fileName);
  return (
    path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path) && !path.split(sep).includes('node_modules')
  );
}

function trackLocalDeclaration(node: ts.Node, context: RecordContext): void {
  const sourceFile = node.getSourceFile();
  if (!sourceFile.isDeclarationFile || !isLocalNode(node, context.manifest.root)) {
    return;
  }
  context.localDeclarationFiles.add(toPosix(relative(context.manifest.root, sourceFile.fileName)));
}

function trackLocalModuleGraph(context: RecordContext): void {
  const pending = [context.sourceFile];
  const visited = new Set<ts.SourceFile>();
  while (pending.length) {
    const source = pending.pop()!;
    if (visited.has(source) || !source.isDeclarationFile || !isLocalNode(source, context.manifest.root)) {
      continue;
    }
    visited.add(source);
    trackLocalDeclaration(source, context);
    const visit = (node: ts.Node): void => {
      const specifier =
        ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
          ? node.moduleSpecifier
          : ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
          ? node.moduleReference.expression
          : ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)
          ? node.argument.literal
          : undefined;
      if (specifier) {
        const module = context.checker.getSymbolAtLocation(specifier);
        for (const declaration of module?.declarations ?? []) {
          pending.push(declaration.getSourceFile());
        }
      }
      node.forEachChild(visit);
    };
    source.forEachChild(visit);
  }
}

function isTypeParameterSymbol(symbol: ts.Symbol): boolean {
  return (symbol.flags & ts.SymbolFlags.TypeParameter) !== 0;
}

function isStandardLibrarySymbol(symbol: ts.Symbol): boolean {
  return Boolean(
    symbol.declarations?.every(declaration =>
      /[/\\]typescript[/\\]lib[/\\]lib\..*\.d\.ts$/.test(declaration.getSourceFile().fileName),
    ),
  );
}

function resolveAliasedSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
  let current = symbol;
  const seen = new Set<ts.Symbol>();
  while ((current.flags & ts.SymbolFlags.Alias) !== 0 && !seen.has(current)) {
    seen.add(current);
    const next = checker.getAliasedSymbol(current);
    if (next === current) {
      break;
    }
    current = next;
  }
  return current;
}

function sourceLocation(node: ts.Node, packageRoot: string): SourceLocation {
  const sourceFile = node.getSourceFile();
  return {
    file: toPosix(relative(packageRoot, sourceFile.fileName)),
    start: node.getStart(sourceFile),
    end: node.getEnd(),
  };
}

function documentationForSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): string {
  return ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
}

function deprecatedForSymbol(symbol: ts.Symbol): string | undefined {
  return deprecatedFromTags(symbol.getJsDocTags());
}

function deprecatedFromTags(tags: readonly ts.JSDocTagInfo[]): string | undefined {
  const tag = tags.find(candidate => candidate.name === 'deprecated');
  if (!tag) {
    return undefined;
  }
  return (
    tag.text
      ?.map(part => part.text)
      .join('')
      .trim() || 'deprecated'
  );
}

function hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean {
  return Boolean(ts.canHaveModifiers(node) && ts.getModifiers(node)?.some(modifier => modifier.kind === kind));
}

function collectProgramDiagnostics(program: ts.Program, packageRoot: string): MetadataDiagnostic[] {
  return ts
    .getPreEmitDiagnostics(program)
    .filter(diagnostic => !diagnostic.file || isPathInside(packageRoot, diagnostic.file.fileName))
    .map(diagnostic => ({
      code: `typescript.${diagnostic.code}`,
      severity: diagnostic.category === ts.DiagnosticCategory.Error ? 'error' : 'warning',
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      ...(diagnostic.file ? { path: toPosix(relative(packageRoot, diagnostic.file.fileName)) } : {}),
    }));
}

function collectUnresolvedDeclarationImports(
  program: ts.Program,
  packageRoot: string,
  compilerOptions: ts.CompilerOptions,
): MetadataDiagnostic[] {
  const diagnostics = new Map<string, MetadataDiagnostic>();
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile || !isPathInside(packageRoot, sourceFile.fileName)) {
      continue;
    }
    const visit = (node: ts.Node): void => {
      const moduleSpecifier =
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteralLike(node.moduleSpecifier)
          ? node.moduleSpecifier
          : ts.isImportTypeNode(node) &&
            ts.isLiteralTypeNode(node.argument) &&
            ts.isStringLiteralLike(node.argument.literal)
          ? node.argument.literal
          : undefined;
      if (moduleSpecifier) {
        const requested = moduleSpecifier.text;
        const resolution = ts.resolveModuleName(requested, sourceFile.fileName, compilerOptions, ts.sys);
        if (!resolution.resolvedModule) {
          const path = toPosix(relative(packageRoot, sourceFile.fileName));
          diagnostics.set(`${path}\0${requested}`, {
            code: 'generator.unresolvedDeclarationImport',
            severity: 'error',
            message: `Could not resolve declaration import ${requested}`,
            path,
          });
        }
      }
      node.forEachChild(visit);
    };
    sourceFile.forEachChild(visit);
  }
  return [...diagnostics.values()];
}

function findDependencyRole(
  manifest: PackageManifest,
  packageName: string,
): keyof PackageManifest['dependencies'] | undefined {
  return (['dependency', 'optionalDependency', 'peerDependency', 'devDependency'] as const).find(
    role => manifest.dependencies[role]?.[packageName] !== undefined,
  );
}

function findPackageManifest(fileName: string): { name: string; version: string; root: string } | undefined {
  let directory = dirname(resolve(fileName));
  const root = resolve(directory, sep);
  while (directory !== root) {
    const candidate = join(directory, 'package.json');
    if (existsSync(candidate)) {
      const value = JSON.parse(readFileSync(candidate, 'utf8')) as { name?: unknown; version?: unknown };
      if (typeof value.name === 'string' && typeof value.version === 'string') {
        return { name: value.name, version: value.version, root: directory };
      }
    }
    directory = dirname(directory);
  }
  return undefined;
}

function packageNameFromDeclaration(declaration: ts.Declaration | undefined): string | undefined {
  if (!declaration) {
    return undefined;
  }
  return findPackageManifest(declaration.getSourceFile().fileName)?.name;
}

function splitPackageSpecifier(requested: string): { packageName: string; entrypoint: string } {
  const parts = requested.split('/');
  const packageName = requested.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  const subpath = parts.slice(requested.startsWith('@') ? 2 : 1).join('/');
  return { packageName, entrypoint: subpath ? `./${subpath}` : '.' };
}

function createRecordId(entry: DeclarationEntry): string {
  return `api:${safeId(entry.entrypoint === '.' ? 'root' : entry.entrypoint.slice(2))}:${safeId(
    entry.conditions.join('-'),
  )}`;
}

function createRouteId(entry: DeclarationEntry, exportName: string, namespace: MetadataNamespace): string {
  return `route:${safeId(entry.entrypoint === '.' ? 'root' : entry.entrypoint.slice(2))}:${safeId(
    exportName,
  )}:${namespace}:${safeId(entry.conditions.join('-'))}`;
}

function symbolSortKey(symbol: ts.Symbol, context: RecordContext): string {
  const declaration = getSemanticDeclarations(symbol, context.manifest.root)[0];
  return `${normalizeExportName(symbol.getName())}\0${
    declaration ? relative(context.manifest.root, declaration.getSourceFile().fileName) : ''
  }\0${declaration?.pos ?? 0}`;
}

function expectSymbolId(context: RecordContext, symbol: ts.Symbol): string {
  const id = context.symbolIds.get(symbol);
  if (!id) {
    throw new Error(`No local symbol ID assigned for ${symbol.getName()}`);
  }
  return id;
}

function normalizeExportName(value: string): string {
  return value === ts.InternalSymbolName.Default ? 'default' : value;
}

function safeId(value: string): string {
  const normalized = value.replace(/[^A-Za-z0-9._@/-]+/g, '-').replace(/^[-/]+|[-/]+$/g, '');
  return normalized || 'anonymous';
}

function fingerprintText(value: string | Buffer): Fingerprint {
  const hash = createHash('sha256');
  if (typeof value === 'string') {
    hash.update(value, 'utf8');
  } else {
    hash.update(value);
  }
  return { algorithm: 'sha256', value: hash.digest('hex') };
}

function fingerprintValue(value: unknown): Fingerprint {
  return fingerprintText(JSON.stringify(toCanonicalJsonValue(value)));
}

function shortHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 12);
}

function dedupeRelationships(relationships: TypeRelationship[]): TypeRelationship[] {
  const values = new Map<string, TypeRelationship>();
  for (const relationship of relationships) {
    values.set(`${relationship.kind}\0${relationship.type.text}`, relationship);
  }
  return [...values.values()];
}

function compareRoutes(left: ExportRoute, right: ExportRoute): number {
  return left.id.localeCompare(right.id);
}

function compareDependencyInputs(left: DependencyInput, right: DependencyInput): number {
  return (
    left.requested.localeCompare(right.requested) ||
    left.entrypoint.localeCompare(right.entrypoint) ||
    left.package.name.localeCompare(right.package.name)
  );
}

function compareDiagnostics(left: MetadataDiagnostic, right: MetadataDiagnostic): number {
  return (
    left.code.localeCompare(right.code) ||
    (left.path ?? '').localeCompare(right.path ?? '') ||
    left.message.localeCompare(right.message)
  );
}

function isPathInside(root: string, value: string): boolean {
  const path = relative(root, resolve(value));
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

function toPosix(value: string): string {
  return value.split(sep).join('/');
}
