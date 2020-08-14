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
  if (typeof pathOrRegex === 'string' && !stringIsRegex(pathOrRegex)) {
    imps = file.getImportDeclarations().filter(cond => {
      return cond.getModuleSpecifierValue() === pathOrRegex;
    });
  } else {
    if (typeof pathOrRegex === 'string' && stringIsRegex(pathOrRegex)) {
      const newRegex = pathOrRegex.substring(1).substring(0, pathOrRegex.length - 2);
      pathOrRegex = new RegExp(newRegex);
    }
    imps = file.getImportDeclarations().filter(cond => {
      return (pathOrRegex as RegExp).test(cond.getModuleSpecifierValue());
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

/* Helper function used to determine whether a string is actually
   a regular expression, needed to support upgrades.json because
   regexes are stored as strings. */
function stringIsRegex(exp: string): boolean {
  if (exp.length < 2) {
    return false;
  } else {
    return exp.charAt(0) === '/' && exp.charAt(exp.length - 1) === '/';
  }
}
