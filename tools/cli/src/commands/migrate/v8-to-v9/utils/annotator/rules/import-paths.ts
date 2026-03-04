import type { SourceFile } from 'ts-morph';
import type { AnnotationResult } from '../types';

// Components with no v9 equivalent — annotated as no-equivalent instead of auto
const NO_EQUIVALENT = new Set([
  'ActivityItem',
  'MarqueeSelection',
  'HoverCard',
  'ResizeGroup',
  'ScrollablePane',
  'Announced',
]);

export function detectImportPaths(sourceFile: SourceFile): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  for (const decl of sourceFile.getImportDeclarations()) {
    if (decl.getModuleSpecifierValue() !== '@fluentui/react') {
      continue;
    }

    const namedImports = decl.getNamedImports();
    const line = decl.getStartLineNumber();

    // Side-effect import: import '@fluentui/react'
    if (namedImports.length === 0 && !decl.getDefaultImport() && !decl.getNamespaceImport()) {
      results.push({
        action: 'auto',
        codemod: 'import-paths',
        payload: '@fluentui/react → remove (side-effect import)',
        line,
      });
      continue;
    }

    const noEquivSpecifiers = namedImports.filter(s => NO_EQUIVALENT.has(s.getName()));
    for (const specifier of noEquivSpecifiers) {
      results.push({
        action: 'no-equivalent',
        codemod: 'import-paths',
        payload: `${specifier.getName()} — no v9 equivalent`,
        line,
      });
    }

    const hasEquivSpecifiers = namedImports.some(s => !NO_EQUIVALENT.has(s.getName()));
    if (hasEquivSpecifiers) {
      results.push({
        action: 'auto',
        codemod: 'import-paths',
        payload: '@fluentui/react → @fluentui/react-components',
        line,
      });
    }
  }

  return results;
}
