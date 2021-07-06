import { SourceFile, ImportDeclaration, ImportSpecifierStructure } from 'ts-morph';
import { ModFunctionResult, ModResult, NoOp } from '../types';
import { Ok, Err, Result } from '../../helpers/result';

export function renameImport(file: SourceFile, originalImport: string, renamedImport: string): Result<ModResult, NoOp> {
  const imps = file.getImportDeclarations().filter(cond => {
    return cond.getNamedImports().some(val => {
      return val.getText() === originalImport;
    });
  });
  if (imps.length === 0) {
    return Err<ModResult, NoOp>({ logs: ['No matching imports could be found.'] });
  }
  imps[0].getNamedImports().forEach(name => {
    if (name.getText() === originalImport) {
      name.renameAlias(renamedImport);
      name.remove();
    }
  });
  imps[0].addNamedImport(renamedImport);
  return Ok({ logs: [`Renamed import ${originalImport} successfully.`] });
}

/**
 *
 * @param file File to search through
 * @param pathOrRegex If a string is given, it will do an exact match, otherwise it will use regex
 */
export function getImportsByPath(
  file: SourceFile,
  pathOrRegex: string | RegExp,
): ModFunctionResult<ImportDeclaration[]> {
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

  return Ok(imps);
}

export function appendOrCreateNamedImport(
  file: SourceFile,
  moduleSpecifier: string,
  namedImports: (string | ImportSpecifierStructure)[],
): ModFunctionResult<ImportDeclaration> {
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
    return Ok(
      file.addImportDeclaration({
        moduleSpecifier,
        namedImports,
      }),
    );
  }

  return Err<ImportDeclaration, NoOp>({ logs: ['Named import is not present in module'] });
}

export function repathImport(
  imp: ImportDeclaration,
  replacementString: string,
  regex?: RegExp,
): ModFunctionResult<ImportDeclaration> {
  if (regex) {
    const current = imp.getModuleSpecifierValue();
    return Ok(imp.setModuleSpecifier(current.replace(regex, replacementString)));
  } else {
    return Ok(imp.setModuleSpecifier(replacementString));
  }
}
