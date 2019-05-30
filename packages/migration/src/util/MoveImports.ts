import os from 'os';
import ts from 'typescript';
import { Modder, TypescriptMod } from 'riceburn/lib/interfaces';

export function generateImport(packageName: string, namedImports: string[]): string | undefined {
  if (namedImports.length === 0) {
    return undefined;
  }
  return `import { ${namedImports.join(', ')} } from '${packageName}';`;
}

export function moveImports(node: ts.Node, modder: Modder, fromPackage: string, toPackage: string, constantNames: string[]): TypescriptMod {
  if (
    ts.isImportDeclaration(node) &&
    (node.moduleSpecifier.getText() === `'${fromPackage}'` || node.moduleSpecifier.getText() === `"${fromPackage}"`) &&
    node.importClause &&
    node.importClause.namedBindings &&
    ts.isNamedImports(node.importClause.namedBindings)
  ) {
    const namedBindings = node.importClause.namedBindings;
    const untouchedImports: string[] = [];
    const migratedImports: string[] = [];
    namedBindings.forEachChild(c => {
      const importName = c.getText();
      if (constantNames.indexOf(importName) >= 0) {
        migratedImports.push(importName);
      } else {
        untouchedImports.push(importName);
      }
    });
    if (migratedImports.length > 0) {
      const importStatements = [generateImport(fromPackage, untouchedImports), generateImport(toPackage, migratedImports)]
        .filter(s => s !== undefined)
        .join(os.EOL);
      return modder.replace(node, importStatements);
    }
  }

  // tslint:disable-next-line: no-any
  return undefined as any;
}
