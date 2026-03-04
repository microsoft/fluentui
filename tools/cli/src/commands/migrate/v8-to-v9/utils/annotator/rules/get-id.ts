import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { isInFunctionComponent } from './use-boolean';

export function detectGetId(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  const hasGetIdImport = sourceFile
    .getImportDeclarations()
    .some(
      decl =>
        decl.getModuleSpecifierValue() === '@fluentui/react' &&
        decl.getNamedImports().some(s => s.getName() === 'getId'),
    );
  if (!hasGetIdImport) return results;

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.CallExpression) return;

    const expr = node.getFirstChild();
    if (expr?.getText() !== 'getId') return;

    const line = node.getStartLineNumber();
    const insideComponent = isInFunctionComponent(node);

    results.push({
      action: insideComponent ? 'auto' : 'manual',
      codemod: 'get-id',
      payload: 'getId → useId hook',
      note: insideComponent
        ? 'add useId import from @fluentui/react-components'
        : 'getId outside function component — cannot convert to hook | handle manually',
      line,
    });
  });

  return results;
}
