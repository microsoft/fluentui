import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type ts = require('typescript');

export interface ReactClassCompatMatch {
  constructorType: ts.Type;
  props: Array<{ signature: ts.Signature; overload: number; propsType: ts.Type }>;
}

export interface ReactClassCompatPlugin {
  match(symbol: ts.Symbol): ReactClassCompatMatch | undefined;
}

export function createReactClassCompatPlugin(typescript: typeof ts, checker: ts.TypeChecker): ReactClassCompatPlugin {
  const matches = new Map<ts.Symbol, ReactClassCompatMatch | undefined>();
  const reactSources = new Map<string, boolean>();

  const isReactDeclaration = (declaration: ts.Declaration): boolean => {
    const source = declaration.getSourceFile().fileName;
    const cached = reactSources.get(source);
    if (cached !== undefined) {
      return cached;
    }
    let directory = dirname(source);
    let result = false;
    while (dirname(directory) !== directory) {
      const manifest = join(directory, 'package.json');
      if (existsSync(manifest)) {
        const parsed: { name?: string } = JSON.parse(readFileSync(manifest, 'utf8'));
        result = parsed.name === 'react' || parsed.name === '@types/react';
        break;
      }
      directory = dirname(directory);
    }
    reactSources.set(source, result);
    return result;
  };

  const inheritsReactComponent = (type: ts.Type, visited = new Set<ts.Type>()): boolean => {
    if (visited.has(type)) {
      return false;
    }
    visited.add(type);
    if (type.isIntersection()) {
      return type.types.some(part => inheritsReactComponent(part, visited));
    }
    const symbol = type.getSymbol();
    const declarations = symbol?.declarations ?? [];
    if (
      (symbol?.getName() === 'Component' || symbol?.getName() === 'PureComponent') &&
      declarations.some(isReactDeclaration)
    ) {
      return true;
    }
    return (
      declarations.some(
        declaration => typescript.isClassDeclaration(declaration) || typescript.isInterfaceDeclaration(declaration),
      ) && (checker.getBaseTypes(type as ts.InterfaceType) ?? []).some(base => inheritsReactComponent(base, visited))
    );
  };

  return {
    match(symbol) {
      if (matches.has(symbol)) {
        return matches.get(symbol);
      }
      const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
      if (!declaration) {
        matches.set(symbol, undefined);
        return undefined;
      }
      const constructorType = checker.getTypeOfSymbolAtLocation(symbol, declaration);
      const props = constructorType.getConstructSignatures().flatMap((signature, overload) => {
        const instance = checker.getReturnTypeOfSignature(signature);
        if (!inheritsReactComponent(instance)) {
          return [];
        }
        const property = checker.getPropertyOfType(instance, 'props');
        return property
          ? [{ signature, overload, propsType: checker.getTypeOfSymbolAtLocation(property, declaration) }]
          : [];
      });
      const result = props.length > 0 ? { constructorType, props } : undefined;
      matches.set(symbol, result);
      return result;
    },
  };
}
