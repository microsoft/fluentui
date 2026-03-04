import * as glob from 'fast-glob';
import * as path from 'path';
import { Project } from 'ts-morph';
import type { FileAnalysis } from './types';
import { detectImportPaths } from './rules/import-paths';
import { detectComponentRenames } from './rules/component-rename';
import { detectButtonVariants } from './rules/button-variants';
import { detectPropRenames } from './rules/prop-rename';
import { detectRemoveThemeProp } from './rules/remove-theme-prop';
import { detectDialogProps } from './rules/dialog-props';
import { detectEnumToString } from './rules/enum-to-string';
import { detectToggleProps } from './rules/toggle-props';
import { detectProgressBarProps } from './rules/progress-bar-props';
import { detectUseBoolean } from './rules/use-boolean';
import { detectKeyCodes } from './rules/keycodes';
import { detectGetId } from './rules/get-id';
import { detectIconProps } from './rules/icon-props';
import { detectLabelExtraction } from './rules/label-extraction';
import { detectStylesProp } from './rules/styles-prop';
import { detectNoEquivalent } from './rules/no-equivalent';

const RULES = [
  detectImportPaths,
  detectComponentRenames,
  detectButtonVariants,
  detectPropRenames,
  detectRemoveThemeProp,
  detectDialogProps,
  detectEnumToString,
  detectToggleProps,
  detectProgressBarProps,
  detectUseBoolean,
  detectKeyCodes,
  detectGetId,
  detectIconProps,
  detectLabelExtraction,
  detectStylesProp,
  detectNoEquivalent,
];

const DEP_REQUIREMENTS: Array<{ name: string; reason: string; triggerCodemod: string }> = [
  {
    name: '@fluentui/react-components',
    reason: 'core v9 components',
    triggerCodemod: 'import-paths',
  },
  {
    name: '@fluentui/react-icons',
    reason: 'SVG icon components (needed: icon-props migrations found)',
    triggerCodemod: 'icon-props',
  },
];

/**
 * Pure detection engine — no file I/O.
 * Both migrate and dry-run call this.
 */
export async function analyzeFiles(sourcePath: string): Promise<FileAnalysis[]> {
  const absoluteSource = path.resolve(sourcePath);

  const filePaths = await glob.glob(['**/*.ts', '**/*.tsx'], {
    cwd: absoluteSource,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.d.ts'],
  });

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFilesAtPaths(filePaths);

  const results: FileAnalysis[] = [];

  for (const sourceFile of project.getSourceFiles()) {
    // Skip files with no @fluentui/react imports (already migrated or unrelated)
    const hasFluentImport = sourceFile
      .getImportDeclarations()
      .some(d => d.getModuleSpecifierValue() === '@fluentui/react');
    if (!hasFluentImport) continue;

    const annotations = RULES.flatMap(rule => rule(sourceFile));
    if (annotations.length === 0) continue;

    // Determine which deps are needed based on detected codemods
    const detectedCodemods = new Set(annotations.map(a => a.codemod));
    const missingDeps = DEP_REQUIREMENTS.filter(dep => detectedCodemods.has(dep.triggerCodemod)).map(
      ({ name, reason }) => ({ name, reason }),
    );

    results.push({
      filePath: sourceFile.getFilePath(),
      annotations,
      missingDeps,
    });
  }

  return results;
}
