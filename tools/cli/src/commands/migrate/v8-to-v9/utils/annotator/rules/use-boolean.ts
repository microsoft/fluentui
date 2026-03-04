import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';

export function detectUseBoolean(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  // Check if useBoolean is imported from @fluentui/react
  const hasUseBooleanImport = sourceFile.getImportDeclarations().some(
    decl =>
      decl.getModuleSpecifierValue() === '@fluentui/react' &&
      decl.getNamedImports().some(s => s.getName() === 'useBoolean'),
  );
  if (!hasUseBooleanImport) return results;

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.CallExpression) return;

    const expr = node.getFirstChild();
    if (expr?.getText() !== 'useBoolean') return;

    const line = node.getStartLineNumber();

    // Check if we're inside a function component (parent chain has a function/arrow function)
    const isInsideFunctionComponent = isInFunctionComponent(node);

    results.push({
      action: isInsideFunctionComponent ? 'auto' : 'manual',
      codemod: 'use-boolean',
      payload: 'useBoolean → useState + named helpers',
      note: isInsideFunctionComponent
        ? undefined
        : 'useBoolean outside function component — cannot convert to hook | handle manually',
      line,
    });
  });

  return results;
}

export function isInFunctionComponent(node: Node): boolean {
  let current: Node | undefined = node.getParent();
  while (current) {
    const kind = current.getKind();
    if (kind === SyntaxKind.ArrowFunction || kind === SyntaxKind.FunctionDeclaration || kind === SyntaxKind.FunctionExpression) {
      return true;
    }
    if (kind === SyntaxKind.ClassDeclaration || kind === SyntaxKind.ClassExpression) {
      return false;
    }
    current = current.getParent();
  }
  return false;
}
