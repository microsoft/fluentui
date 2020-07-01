import { SourceFile } from 'ts-morph';
import { getImportsByPath, appendOrCreateNamedImport, repathImport } from '../../utilities';

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

export interface IRawCompat {
  componentName: string;
  // tslint:disable-next-line: no-any
  namedExports: { [key: string]: any };
}

export interface ICompatHash {
  namedExportsMatch: { [key: string]: string };
  exactPathMatch: { [key: string]: string };
}

export function repathNamedImports(file: SourceFile, hash: ICompatHash, indexPath: string) {
  const imports = getImportsByPath(file, indexPath);
  imports.forEach(imp => {
    imp.getNamedImports().forEach(namedImp => {
      if (hash.namedExportsMatch[namedImp.getName()]) {
        appendOrCreateNamedImport(file, hash.namedExportsMatch[namedImp.getName()], [namedImp.getStructure()]);
        namedImp.remove();
      }
    });

    // Remove the index import if it no longer has any named imports.
    if (imp.getNamedImports().length === 0) {
      imp.remove();
    }
  });
}

// tslint:disable-next-line: no-any
export function getNamedExports(obj: { [key: string]: any }) {
  return Object.keys(obj);
}

export function buildCompatHash(
  renameCompats: IRawCompat[],
  getComponentToCompat: (comp: IRawCompat) => IComponentToCompat,
): ICompatHash {
  return renameCompats.reduce(
    (acc: ICompatHash, val) => {
      const paths = getComponentToCompat(val);
      acc.exactPathMatch[paths.oldPath] = paths.newComponentPath;
      paths.namedExports.forEach(path => {
        acc.namedExportsMatch[path] = paths.newComponentPath;
      });
      return acc;
    },
    { namedExportsMatch: {}, exactPathMatch: {} },
  );
}

export function repathPathedImports(file: SourceFile, hash: ICompatHash) {
  file.getImportDeclarations().forEach(dec => {
    const str = dec.getModuleSpecifierValue();
    if (hash.exactPathMatch[str]) {
      repathImport(dec, hash.exactPathMatch[str]);
    }
  });
}

export function runComponentToCompat(file: SourceFile, hash: ICompatHash, indexPath: string) {
  repathPathedImports(file, hash);
  repathNamedImports(file, hash, indexPath);
}
