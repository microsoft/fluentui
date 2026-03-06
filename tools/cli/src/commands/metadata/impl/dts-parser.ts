import {
  Project,
  Node,
  SyntaxKind,
  type SourceFile,
  type ExportedDeclarations,
  type TypeAliasDeclaration,
  type InterfaceDeclaration,
  type FunctionDeclaration,
  type VariableDeclaration,
  type EnumDeclaration,
  type ClassDeclaration,
  type Symbol as TsMorphSymbol,
} from 'ts-morph';

import type {
  SymbolClassification,
  ComponentDoc,
  HookDoc,
  TypeDoc,
  OtherDoc,
  ParameterDoc,
  MemberDoc,
  RefOrInline,
} from './types';

/** Type patterns that indicate a React component. */
const COMPONENT_TYPE_PATTERNS = [
  'ForwardRefComponent',
  'React.FC',
  'React.FunctionComponent',
  'React.ForwardRefExoticComponent',
  'FC<',
  'FunctionComponent<',
  'ForwardRefExoticComponent<',
];

/** JSX return type names. */
const JSX_TYPE_NAMES = new Set([
  'Element',
  'ReactElement',
  'ReactNode',
  'JSX.Element',
  'React.ReactElement',
  'React.ReactNode',
  'JSXElement',
]);

/**
 * Result of parsing a .d.ts entry file.
 */
export interface ParseResult {
  components: Record<string, ComponentDoc>;
  hooks: Record<string, HookDoc>;
  types: Record<string, TypeDoc>;
  others: Record<string, OtherDoc>;
  /** Package specifiers imported by this .d.ts (for cross-package resolution). */
  importedPackages: Set<string>;
}

/**
 * Parse a .d.ts entry file and extract all exported API symbols.
 */
export function parseDtsEntry(entryPath: string): ParseResult {
  const project = new Project({
    compilerOptions: {
      declaration: true,
      // Allow following imports into node_modules .d.ts
      moduleResolution: 2 /* NodeJs */,
    },
    skipAddingFilesFromTsConfig: true,
  });

  const sourceFile = project.addSourceFileAtPath(entryPath);
  project.resolveSourceFileDependencies();

  const result: ParseResult = {
    components: {},
    hooks: {},
    types: {},
    others: {},
    importedPackages: new Set(),
  };

  // Collect imported package specifiers
  for (const imp of sourceFile.getImportDeclarations()) {
    const specifier = imp.getModuleSpecifierValue();
    if (!specifier.startsWith('.') && !specifier.startsWith('/')) {
      result.importedPackages.add(specifier);
    }
  }

  // Process all exports
  const exportedDecls = sourceFile.getExportedDeclarations();

  for (const [name, declarations] of exportedDecls) {
    // Skip the empty re-export `export { }`
    if (name === '') {
      continue;
    }

    const decl = declarations[0];
    if (!decl) {
      continue;
    }

    const classification = classifyDeclaration(name, decl);
    const description = extractJsDoc(decl);
    const tags = extractJsDocTags(decl);

    switch (classification) {
      case 'component':
        result.components[name] = buildComponentDoc(name, decl, description, tags);
        break;
      case 'hook':
        result.hooks[name] = buildHookDoc(name, decl, description, tags);
        break;
      case 'type':
        result.types[name] = buildTypeDoc(name, decl, description, tags);
        break;
      case 'other':
        result.others[name] = buildOtherDoc(name, decl, description, tags);
        break;
    }
  }

  return result;
}

// ============================================================================
// Classification
// ============================================================================

function classifyDeclaration(name: string, decl: ExportedDeclarations): SymbolClassification {
  // Hook: use* naming convention
  if (/^use[A-Z]/.test(name)) {
    return 'hook';
  }

  // Type: interface, type alias, or enum
  if (Node.isInterfaceDeclaration(decl) || Node.isTypeAliasDeclaration(decl) || Node.isEnumDeclaration(decl)) {
    return 'type';
  }

  // Component detection
  if (Node.isVariableDeclaration(decl)) {
    const typeText = getTypeText(decl);
    if (isReactComponentType(typeText)) {
      return 'component';
    }
  }

  if (Node.isFunctionDeclaration(decl)) {
    const returnType = safeGetReturnTypeText(decl);
    if (returnsJsx(returnType)) {
      return 'component';
    }
  }

  // PascalCase + returns JSX → component
  if (/^[A-Z]/.test(name) && Node.isVariableDeclaration(decl)) {
    const typeText = getTypeText(decl);
    if (returnsJsx(typeText)) {
      return 'component';
    }
  }

  return 'other';
}

function isReactComponentType(typeText: string): boolean {
  return COMPONENT_TYPE_PATTERNS.some(p => typeText.includes(p));
}

function returnsJsx(typeText: string): boolean {
  for (const jsxType of JSX_TYPE_NAMES) {
    if (typeText.includes(jsxType)) {
      return true;
    }
  }
  return false;
}

// ============================================================================
// Builders
// ============================================================================

function buildComponentDoc(
  name: string,
  decl: ExportedDeclarations,
  description: string,
  tags: Record<string, string>,
): ComponentDoc {
  const typeSignature = getTypeText(decl);
  const propsType = extractPropsTypeRef(typeSignature);

  return { name, description, typeSignature, tags, propsType };
}

function buildHookDoc(
  name: string,
  decl: ExportedDeclarations,
  description: string,
  tags: Record<string, string>,
): HookDoc {
  const typeSignature = getTypeText(decl);
  const parameters = extractParameters(decl, tags);
  const returnType = extractReturnType(decl);

  return { name, description, typeSignature, tags, parameters, returnType };
}

function buildTypeDoc(
  name: string,
  decl: ExportedDeclarations,
  description: string,
  tags: Record<string, string>,
): TypeDoc {
  let kind: TypeDoc['kind'] = 'type-alias';
  if (Node.isInterfaceDeclaration(decl)) {
    kind = 'interface';
  } else if (Node.isEnumDeclaration(decl)) {
    kind = 'enum';
  }

  const typeSignature = getTypeText(decl);
  const members = extractMembers(decl);

  return { name, description, typeSignature, tags, kind, members };
}

function buildOtherDoc(
  name: string,
  decl: ExportedDeclarations,
  description: string,
  tags: Record<string, string>,
): OtherDoc {
  let kind: OtherDoc['kind'] = 'unknown';
  if (Node.isVariableDeclaration(decl)) {
    kind = 'variable';
  } else if (Node.isFunctionDeclaration(decl)) {
    kind = 'function';
  } else if (Node.isClassDeclaration(decl)) {
    kind = 'class';
  }

  const typeSignature = getTypeText(decl);
  const doc: OtherDoc = { name, description, typeSignature, tags, kind };

  if (kind === 'function') {
    doc.parameters = extractParameters(decl, tags);
    doc.returnType = extractReturnType(decl);
  }

  return doc;
}

// ============================================================================
// JSDoc extraction
// ============================================================================

function extractJsDoc(decl: ExportedDeclarations): string {
  // For VariableDeclarations, JSDoc sits on the parent VariableStatement
  const target = getJsDocTarget(decl);

  if (!('getJsDocs' in target)) {
    return '';
  }

  try {
    const jsDocs = (target as unknown as { getJsDocs(): Array<{ getDescription(): string }> }).getJsDocs();
    if (jsDocs.length === 0) {
      return '';
    }
    return jsDocs
      .map(doc => doc.getDescription().trim())
      .filter(Boolean)
      .join('\n');
  } catch {
    return '';
  }
}

function extractJsDocTags(decl: ExportedDeclarations): Record<string, string> {
  const target = getJsDocTarget(decl);

  if (!('getJsDocs' in target)) {
    return {};
  }

  const tags: Record<string, string> = {};
  try {
    const jsDocs = (
      target as unknown as {
        getJsDocs(): Array<{ getTags(): Array<{ getTagName(): string; getCommentText(): string | undefined }> }>;
      }
    ).getJsDocs();
    for (const doc of jsDocs) {
      for (const tag of doc.getTags()) {
        const tagName = tag.getTagName();
        const tagValue = tag.getCommentText() ?? '';
        // Skip @param tags — they are handled separately
        if (tagName !== 'param') {
          tags[tagName] = tagValue.trim();
        }
      }
    }
  } catch {
    // Swallow — tags are best-effort
  }

  return tags;
}

/**
 * Extract @param descriptions from JSDoc tags.
 */
function extractParamDescriptions(decl: ExportedDeclarations): Map<string, string> {
  const target = getJsDocTarget(decl);
  const map = new Map<string, string>();
  if (!('getJsDocs' in target)) {
    return map;
  }

  try {
    const jsDocs = (
      target as unknown as {
        getJsDocs(): Array<{
          getTags(): Array<{ getTagName(): string; getCommentText(): string | undefined; getName?(): string }>;
        }>;
      }
    ).getJsDocs();
    for (const doc of jsDocs) {
      for (const tag of doc.getTags()) {
        if (tag.getTagName() === 'param' && tag.getName) {
          map.set(tag.getName!(), (tag.getCommentText() ?? '').trim());
        }
      }
    }
  } catch {
    // best-effort
  }

  return map;
}

/**
 * Get the node that carries JSDoc comments.
 * For VariableDeclarations, JSDoc is on the parent VariableStatement.
 */
function getJsDocTarget(decl: ExportedDeclarations): Node {
  if (Node.isVariableDeclaration(decl)) {
    const varDeclList = decl.getParent();
    if (varDeclList) {
      const varStatement = varDeclList.getParent();
      if (varStatement && 'getJsDocs' in varStatement) {
        return varStatement as Node;
      }
    }
  }
  return decl;
}

// ============================================================================
// Type extraction helpers
// ============================================================================

function getTypeText(decl: ExportedDeclarations): string {
  try {
    if (Node.isVariableDeclaration(decl)) {
      return decl.getType().getText(decl);
    }
    if (Node.isFunctionDeclaration(decl)) {
      return decl.getType().getText(decl);
    }
    if (Node.isTypeAliasDeclaration(decl)) {
      return decl.getTypeNode()?.getText() ?? decl.getType().getText(decl);
    }
    if (Node.isInterfaceDeclaration(decl)) {
      // For interfaces, show the heritage and structure
      const heritageText = decl
        .getExtends()
        .map(e => e.getText())
        .join(' & ');
      const membersPreview = decl.getMembers().length > 0 ? '{ ... }' : '{}';
      return heritageText ? `${heritageText} & ${membersPreview}` : membersPreview;
    }
    if (Node.isEnumDeclaration(decl)) {
      const members = decl.getMembers().map(m => m.getName());
      return `enum { ${members.join(', ')} }`;
    }
    return decl.getType().getText(decl);
  } catch {
    return '';
  }
}

function safeGetReturnTypeText(decl: FunctionDeclaration): string {
  try {
    return decl.getReturnType().getText(decl);
  } catch {
    return '';
  }
}

function extractReturnType(decl: ExportedDeclarations): string {
  try {
    if (Node.isFunctionDeclaration(decl)) {
      const rtNode = decl.getReturnTypeNode();
      return rtNode?.getText() ?? decl.getReturnType().getText(decl);
    }
    if (Node.isVariableDeclaration(decl)) {
      // For arrow function variables, try to get the call signatures
      const type = decl.getType();
      const callSigs = type.getCallSignatures();
      if (callSigs.length > 0) {
        return callSigs[0].getReturnType().getText(decl);
      }
    }
  } catch {
    // fall through
  }
  return '';
}

function extractParameters(decl: ExportedDeclarations, jsdocTags: Record<string, string>): ParameterDoc[] {
  const paramDescriptions = extractParamDescriptions(decl);
  const params: ParameterDoc[] = [];

  try {
    if (Node.isFunctionDeclaration(decl)) {
      for (const param of decl.getParameters()) {
        const name = param.getName();
        params.push({
          name,
          type: param.getTypeNode()?.getText() ?? param.getType().getText(decl),
          required: !param.isOptional(),
          description: paramDescriptions.get(name) ?? '',
        });
      }
    } else if (Node.isVariableDeclaration(decl)) {
      // Arrow function variable — parse call signatures
      const type = decl.getType();
      const callSigs = type.getCallSignatures();
      if (callSigs.length > 0) {
        for (const param of callSigs[0].getParameters()) {
          const paramDecl = param.getDeclarations()[0];
          const name = param.getName();
          params.push({
            name,
            type: paramDecl ? paramDecl.getType().getText(paramDecl) : param.getDeclaredType().getText(),
            required: paramDecl ? !Node.isParameterDeclaration(paramDecl) || !paramDecl.isOptional() : true,
            description: paramDescriptions.get(name) ?? '',
          });
        }
      }
    }
  } catch {
    // best-effort
  }

  return params;
}

// ============================================================================
// Member extraction (for interfaces and type aliases)
// ============================================================================

function extractMembers(decl: ExportedDeclarations): Record<string, MemberDoc> {
  const members: Record<string, MemberDoc> = {};

  try {
    if (Node.isInterfaceDeclaration(decl)) {
      extractInterfaceMembers(decl, members);
    } else if (Node.isTypeAliasDeclaration(decl)) {
      extractTypeAliasMembers(decl, members);
    } else if (Node.isEnumDeclaration(decl)) {
      extractEnumMembers(decl, members);
    }
  } catch {
    // best-effort
  }

  return members;
}

function extractInterfaceMembers(decl: InterfaceDeclaration, members: Record<string, MemberDoc>): void {
  for (const prop of decl.getProperties()) {
    const name = prop.getName();
    const jsDocDescription = extractPropertyJsDoc(prop);
    const defaultValue = extractDefaultTag(prop);

    members[name] = {
      name,
      type: prop.getTypeNode()?.getText() ?? prop.getType().getText(prop),
      required: !prop.hasQuestionToken(),
      description: jsDocDescription,
      ...(defaultValue !== undefined ? { defaultValue } : {}),
    };
  }
}

function extractTypeAliasMembers(decl: TypeAliasDeclaration, members: Record<string, MemberDoc>): void {
  // Try to resolve the type to its properties
  const type = decl.getType();
  for (const prop of type.getProperties()) {
    const propDecl = prop.getDeclarations()[0];
    if (!propDecl) {
      continue;
    }

    const name = prop.getName();
    const jsDocDescription = extractPropertyJsDoc(propDecl);
    const defaultValue = extractDefaultTag(propDecl);

    members[name] = {
      name,
      type: propDecl.getType().getText(propDecl),
      required: !('hasQuestionToken' in propDecl && (propDecl as any).hasQuestionToken()),
      description: jsDocDescription,
      ...(defaultValue !== undefined ? { defaultValue } : {}),
    };
  }
}

function extractEnumMembers(decl: EnumDeclaration, members: Record<string, MemberDoc>): void {
  for (const member of decl.getMembers()) {
    const name = member.getName();
    const value = member.getValue();
    members[name] = {
      name,
      type: typeof value === 'string' ? 'string' : 'number',
      required: true,
      description: extractPropertyJsDoc(member),
      ...(value !== undefined ? { defaultValue: String(value) } : {}),
    };
  }
}

// ============================================================================
// Property-level JSDoc helpers
// ============================================================================

function extractPropertyJsDoc(node: Node): string {
  try {
    if ('getJsDocs' in node) {
      const jsDocs = (node as unknown as { getJsDocs(): Array<{ getDescription(): string }> }).getJsDocs();
      return jsDocs
        .map(doc => doc.getDescription().trim())
        .filter(Boolean)
        .join('\n');
    }
  } catch {
    // fall through
  }
  return '';
}

function extractDefaultTag(node: Node): string | undefined {
  try {
    if ('getJsDocs' in node) {
      const jsDocs = (
        node as unknown as {
          getJsDocs(): Array<{ getTags(): Array<{ getTagName(): string; getCommentText(): string | undefined }> }>;
        }
      ).getJsDocs();
      for (const doc of jsDocs) {
        for (const tag of doc.getTags()) {
          if (tag.getTagName() === 'default') {
            return (tag.getCommentText() ?? '').trim();
          }
        }
      }
    }
  } catch {
    // fall through
  }
  return undefined;
}

// ============================================================================
// Props type reference extraction
// ============================================================================

/**
 * Extract a `$ref` to the props type from a component's type signature.
 * e.g. `ForwardRefExoticComponent<ButtonProps & RefAttributes<...>>` → `{ "$ref": "#/categories/types/ButtonProps" }`
 */
function extractPropsTypeRef(typeSignature: string): RefOrInline | undefined {
  // Match patterns like ForwardRefComponent<XxxProps>, React.FC<XxxProps>, etc.
  // The props type is the first type argument before any `&` or `>`
  const match = typeSignature.match(
    /(?:ForwardRefComponent|ForwardRefExoticComponent|React\.FC|React\.FunctionComponent|FC|FunctionComponent)<\s*([A-Z][A-Za-z0-9_]*)/,
  );

  if (match) {
    const propsTypeName = match[1];
    return { $ref: `#/categories/types/${propsTypeName}` };
  }

  return undefined;
}
