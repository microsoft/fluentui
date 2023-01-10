import * as Babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import _ from 'lodash';

import { ComponentPropType } from './docs-types';
import { PropItem } from './docgen';
import parseTypeAnnotation from './parseTypeAnnotation';

/** Performs transform: `ShorthandValue<T & { kind?: N }>` to `ShorthandCollection<T, N>[]`. */
const normalizeShorthandCollection = (propType: string): string => {
  const regex = /ShorthandValue<(.+) & { kind\?: (.+); }>\[]$/;
  const result = regex.exec(propType);

  if (result) {
    return `ShorthandCollection<${result[1]}, ${result[2]}>`;
  }

  return propType;
};

const normalizeType = (propType: string): string => {
  _.reduce(
    [normalizeShorthandCollection],
    (propType, normalizer): string => {
      return normalizer(propType);
    },
    propType,
  );

  return normalizeShorthandCollection(propType);
};

const getTypeFromBabelTree = (componentFile: t.File, componentName: string, propName: string) => {
  let typeAnnotation: t.TSType | undefined;

  const propertyVisitor: Babel.Visitor = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TSPropertySignature: path => {
      if (path.get('key').isIdentifier({ name: propName })) {
        const annotationPath = path.get('typeAnnotation') as NodePath<t.TSTypeAnnotation>;

        typeAnnotation = annotationPath.get('typeAnnotation').node;
      }
    },
  };

  Babel.traverse(componentFile, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TSInterfaceDeclaration: path => {
      if (path.get('id').isIdentifier({ name: `${componentName}Props` })) {
        path.traverse(propertyVisitor);
      }
    },
  });

  return typeAnnotation;
};

const parseType = (
  componentFile: t.File,
  componentName: string,
  propName: string,
  propInfo: PropItem,
): ComponentPropType[] => {
  const propType = normalizeType(propInfo.type.name);

  let typeAnnotation: t.TSType | undefined;

  try {
    const result = Babel.parse(`type __ = ${propType}`, {
      configFile: false,
      presets: [['@babel/preset-typescript', { allExtensions: true }]],
    }) as t.File;

    const body = result.program.body;
    const declaration = body[0];

    if (body.length !== 1 || !t.isTSTypeAliasDeclaration(declaration)) {
      throw new Error(`A prop "${propName}" has unsupported type definition: ${propType}`);
    }

    typeAnnotation = declaration.typeAnnotation;
  } catch (e) {
    typeAnnotation = getTypeFromBabelTree(componentFile, componentName, propName);
  }

  return typeAnnotation ? parseTypeAnnotation(propName, propType, typeAnnotation) : [];
};

export default parseType;
