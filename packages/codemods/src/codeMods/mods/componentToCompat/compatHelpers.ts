import { SourceFile } from 'ts-morph';
import { getImportsByPath, appendOrCreateNamedImport, repathImport } from '../../utilities/index';
// import { Ok } from '../../../helpers/result';

export interface ComponentToCompat {
  // Old exact path
  oldPath: string;

  // The complete path that should either just replace the old one,
  // Or be where all the compats are imported from.
  newComponentPath: string;

  // All the components, names, and other things that are exported
  // from that root folder and that should get repathed
  namedExports: string[];
}

export interface RawCompat {
  componentName: string;
  namedExports: string[];
}

export interface CompatMap {
  namedExportsMatch: { [key: string]: string };
  exactPathMatch: { [key: string]: string };
}

export function repathNamedImports(file: SourceFile, namedImportMap: { [key: string]: string }, indexPath: string) {
  const imports = getImportsByPath(file, indexPath);
  return imports.then(ports => {
    return ports.map(imp => {
      imp.getNamedImports().forEach(namedImp => {
        if (namedImportMap[namedImp.getName()]) {
          appendOrCreateNamedImport(file, namedImportMap[namedImp.getName()], [namedImp.getStructure()]);
          namedImp.remove();
        }
      });

      // Remove the index import if it no longer has any named imports.
      if (imp.getNamedImports().length === 0) {
        imp.remove();
      }
      return imp;
    });
  });
}

export function getNamedExports(names: string[]) {
  return names.filter(key => key !== 'default');
}

export function buildCompatHash(
  renameCompats: RawCompat[],
  getComponentToCompat: (comp: RawCompat) => ComponentToCompat,
): CompatMap {
  return renameCompats.reduce(
    (acc: CompatMap, val) => {
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

export function repathPathedImports(file: SourceFile, pathMapping: { [key: string]: string }) {
  file.getImportDeclarations().forEach(dec => {
    const str = dec.getModuleSpecifierValue();
    if (pathMapping[str]) {
      repathImport(dec, pathMapping[str]);
    }
  });
}

export function runComponentToCompat(file: SourceFile, compatMap: CompatMap, indexPath: string) {
  repathPathedImports(file, compatMap.exactPathMatch);
  repathNamedImports(file, compatMap.namedExportsMatch, indexPath);
}
