import type { SourceFile } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { DEPRECATED_COMPONENT_NAMES } from './no-equivalent';

/** v8 components that live in separate compat packages, not @fluentui/react-components. */
const COMPAT_PACKAGES: Record<string, string> = {
  Calendar: '@fluentui/react-calendar-compat',
  DatePicker: '@fluentui/react-datepicker-compat',
  TimePicker: '@fluentui/react-timepicker-compat',
};

export function detectImportPaths(sourceFile: SourceFile, _fluentNames: Set<string>): AnnotationResult[] {
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

    const noEquivSpecifiers = namedImports.filter(s => DEPRECATED_COMPONENT_NAMES.has(s.getName()));
    for (const specifier of noEquivSpecifiers) {
      results.push({
        action: 'no-equivalent',
        codemod: 'no-equivalent',
        payload: specifier.getName(),
        note: 'no v9 equivalent — remove this import specifier',
        line,
      });
    }

    // Compat-package components need a separate import — annotate each one as manual.
    const compatSpecifiers = namedImports.filter(
      s => !DEPRECATED_COMPONENT_NAMES.has(s.getName()) && COMPAT_PACKAGES[s.getName()],
    );
    for (const specifier of compatSpecifiers) {
      const pkg = COMPAT_PACKAGES[specifier.getName()];
      results.push({
        action: 'manual',
        codemod: 'import-paths',
        payload: `${specifier.getName()} → ${pkg}`,
        note: `split import; move specifier to a separate "import { ... } from '${pkg}'"`,
        line,
      });
    }

    const hasEquivSpecifiers = namedImports.some(
      s => !DEPRECATED_COMPONENT_NAMES.has(s.getName()) && !COMPAT_PACKAGES[s.getName()],
    );
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
