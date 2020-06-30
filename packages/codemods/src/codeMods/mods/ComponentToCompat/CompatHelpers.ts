import { SourceFile, ImportSpecifierStructure } from 'ts-morph';
import { getImportsByPath, appendOrCreateNamedImport, repathImport } from '../../utilities';

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

const repathNamedImports = (file: SourceFile, hash: CompatHash, indexPath: string) => {
  let imports = getImportsByPath(file, indexPath);
  imports.forEach(imp => {
    imp.getNamedImports().forEach(imp => {
      if (hash.namedExportsMatch[imp.getName()]) {
        appendOrCreateNamedImport(file, hash.namedExportsMatch[imp.getName()], [imp.getStructure()]);
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
      repathImport(dec, hash.exactPathMatch[str]);
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
