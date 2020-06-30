import { SourceFile, ImportSpecifierStructure } from 'ts-morph';
import { utilities } from '../../utilities/utilities';

export const getNamedExports = (obj: { [key: string]: any }) => {
  return Object.keys(obj);
};

export interface IComponentToCompat {
  // Old exact path
  oldPath: string;

  // The complete path that should either just replace the old one,
  // Or be where all the compats are imported from.
  newComponentPath: string;

  // All the components, names, and other things that are exported
  // from that root folder and that should get repathed
  namedExports: string[];
}

export interface rawCompat {
  componentName: string;
  namedExports: { [key: string]: any };
}

export interface CompatHash {
  namedExportsMatch: { [key: string]: string };
  exactPathMatch: { [key: string]: string };
}

const AppendNamedImportIfNoExist = (
  file: SourceFile,
  moduleSpecifier: string,
  namedImports: (string | ImportSpecifierStructure)[],
) => {
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
};

const repathNamedImports = (file: SourceFile, hash: CompatHash, indexPath: string) => {
  let imports = utilities.getImportsByPath(file, indexPath);
  imports.forEach(imp => {
    imp.getNamedImports().forEach(imp => {
      if (hash.namedExportsMatch[imp.getName()]) {
        AppendNamedImportIfNoExist(file, hash.namedExportsMatch[imp.getName()], [imp.getStructure()]);
        imp.remove();
      }
    });

    // Remove the index import if it no longer has any named imports.
    if (imp.getNamedImports().length === 0) {
      imp.remove();
    }
  });
};

export const buildCompatHash = (
  renameCompats: rawCompat[],
  getComponentToCompat: (comp: rawCompat) => IComponentToCompat,
): CompatHash => {
  return renameCompats.reduce(
    (acc: CompatHash, val) => {
      const paths = getComponentToCompat(val);
      acc.exactPathMatch[paths.oldPath] = paths.newComponentPath;
      paths.namedExports.forEach(val => {
        acc.namedExportsMatch[val] = paths.newComponentPath;
      });
      return acc;
    },
    { namedExportsMatch: {}, exactPathMatch: {} },
  );
};

export const repathPathedImports = (file: SourceFile, hash: CompatHash) => {
  file.getImportDeclarations().forEach(dec => {
    let str = dec.getModuleSpecifierValue();
    if (hash.exactPathMatch[str]) {
      utilities.repathImport(dec, hash.exactPathMatch[str]);
    }
  });
};

export const runComponentToCompat = (file: SourceFile, hash: CompatHash, indexPath: string) => {
  repathPathedImports(file, hash);
  repathNamedImports(file, hash, indexPath);
};

export const __forTest = {
  getNamedExports,
  repathPathedImports,
  runComponentToCompat,
  buildHash: buildCompatHash,
  repathNamedImports,
};
