import * as path from 'node:path';

import { type Tree } from '@nx/devkit';
import ts from 'typescript';

export interface PublicExports {
  /** Exported value (non type-only) binding names */
  values: Set<string>;
  /** `export * from` specifiers that could not be resolved within the workspace */
  unresolved: string[];
}

const SOURCE_EXTENSIONS = ['.ts', '.tsx'];

/**
 * Collects the value exports reachable from a barrel entry point.
 *
 * Walks the module graph off the Tree with the TS parser only - no `ts.createProgram` and no type
 * checker, since the Tree has no real file system and only binding names are needed.
 */
export function collectPublicExports(tree: Tree, entryFilePath: string): PublicExports {
  const result: PublicExports = { values: new Set(), unresolved: [] };
  const visited = new Set<string>();

  visit(entryFilePath);

  return result;

  function visit(filePath: string) {
    if (visited.has(filePath)) {
      return;
    }
    visited.add(filePath);

    const contents = tree.read(filePath, 'utf-8');
    if (contents === null) {
      return;
    }

    const sourceFile = ts.createSourceFile(filePath, contents, ts.ScriptTarget.ESNext, true);

    for (const statement of sourceFile.statements) {
      if (ts.isExportDeclaration(statement)) {
        visitExportDeclaration(statement, filePath);
        continue;
      }

      if (hasExportModifier(statement)) {
        collectLocalDeclaration(statement);
      }
    }
  }

  function visitExportDeclaration(node: ts.ExportDeclaration, containingFile: string) {
    // `export type { ... }` never produces a value binding
    if (node.isTypeOnly) {
      return;
    }

    if (node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const specifier of node.exportClause.elements) {
        if (!specifier.isTypeOnly) {
          result.values.add(specifier.name.text);
        }
      }
      return;
    }

    if (node.exportClause && ts.isNamespaceExport(node.exportClause)) {
      result.values.add(node.exportClause.name.text);
      return;
    }

    // bare `export * from '...'` - the re-exported names are only knowable by following the module
    const specifier = node.moduleSpecifier;
    if (!specifier || !ts.isStringLiteral(specifier)) {
      return;
    }

    const resolved = resolveModule(containingFile, specifier.text);
    if (resolved === null) {
      result.unresolved.push(`${containingFile} -> ${specifier.text}`);
      return;
    }

    visit(resolved);
  }

  function collectLocalDeclaration(node: ts.Statement) {
    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          result.values.add(declaration.name.text);
        }
      }
      return;
    }

    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) {
      if (node.name) {
        result.values.add(node.name.text);
      }
    }
  }

  function resolveModule(containingFile: string, specifier: string): string | null {
    if (!specifier.startsWith('.')) {
      return null;
    }

    const base = path.posix.join(path.posix.dirname(containingFile), specifier);
    const candidates = [
      ...SOURCE_EXTENSIONS.map(extension => `${base}${extension}`),
      ...SOURCE_EXTENSIONS.map(extension => `${base}/index${extension}`),
    ];

    return candidates.find(candidate => tree.exists(candidate)) ?? null;
  }
}

function hasExportModifier(node: ts.Statement): boolean {
  return Boolean(ts.canHaveModifiers(node) && ts.getModifiers(node)?.some(m => m.kind === ts.SyntaxKind.ExportKeyword));
}
