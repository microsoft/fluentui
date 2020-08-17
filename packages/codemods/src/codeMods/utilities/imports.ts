import { SourceFile, ImportDeclaration, ImportSpecifierStructure } from 'ts-morph';

export function renameImport(file: SourceFile, originalImport: string, renamedImport: string) {
  const imps = file.getImportDeclarations().filter(cond => {
    return cond.getNamedImports().some(val => {
      return val.getText() === originalImport;
    });
  });
  imps[0].getNamedImports().forEach(name => {
    if (name.getText() === originalImport) {
      name.renameAlias(renamedImport);
      name.remove();
    }
  });
  imps[0].addNamedImport(renamedImport);
}

/**
 *
 * @param file File to search through
 * @param pathOrRegex If a string is given, it will do an exact match, otherwise it will use regex
 */
export function getImportsByPath(file: SourceFile, pathOrRegex: string | RegExp): ImportDeclaration[] {
  let imps: ImportDeclaration[] = [];
  if (typeof pathOrRegex === 'string') {
    imps = file.getImportDeclarations().filter(cond => {
      return cond.getModuleSpecifierValue() === pathOrRegex;
    });
  } else {
    imps = file.getImportDeclarations().filter(cond => {
      return pathOrRegex.test(cond.getModuleSpecifierValue());
    });
  }
  return imps;
}

export function appendOrCreateNamedImport(
  file: SourceFile,
  moduleSpecifier: string,
  namedImports: (string | ImportSpecifierStructure)[],
) {
  const found = file.getImportDeclaration(val => {
    if (val.getModuleSpecifierValue() === moduleSpecifier) {
      const currentNamedImports = val.getNamedImports();
      namedImports.forEach(str => {
        if (!currentNamedImports.some(cname => cname.getText() === str)) {
          val.addNamedImport(str);
        }
      });
      return true;
    }
    return false;
  });
  if (!found) {
    file.addImportDeclaration({
      moduleSpecifier,
      namedImports,
    });
  }
}

export function repathImport(imp: ImportDeclaration, replacementString: string, regex?: RegExp) {
  if (regex) {
    const current = imp.getModuleSpecifierValue();
    imp.setModuleSpecifier(current.replace(regex, replacementString));
  } else {
    imp.setModuleSpecifier(replacementString);
  }
}
