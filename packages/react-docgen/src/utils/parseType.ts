import * as Babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import * as _ from 'lodash';

import { ComponentPropType } from '@fluentui/react-docgen-types';
import { PropItem } from './docgen';
import parseTypeAnnotation from './parseTypeAnnotation';

/** Performs transform: `ShorthandValue<T & { kind?: N }>` to `ShorthandCollection<T, N>[]`. */
function normalizeShorthandCollection(propType: string): string {
  const regex = /ShorthandValue<(.+) & { kind\?: (.+); }>\[]$/;
  const result = regex.exec(propType);

  if (result) {
    return `ShorthandCollection<${result[1]}, ${result[2]}>`;
  }

  return propType;
}

function normalizeType(propType: string): string {
  _.reduce(
    [normalizeShorthandCollection],
    (pt, normalizer): string => {
      return normalizer(pt);
    },
    propType,
  );

  return normalizeShorthandCollection(propType);
}

function getTypeFromBabelTree(componentFile: t.File, componentName: string, propName: string): t.TSType | undefined {
  let typeAnnotation: t.TSType | undefined;

  const propertyVisitor: Babel.Visitor = {
    TSPropertySignature: path => {
      if (path.get('key').isIdentifier({ name: propName })) {
        const annotationPath = path.get('typeAnnotation') as NodePath<t.TSTypeAnnotation>;

        typeAnnotation = annotationPath.get('typeAnnotation').node;
      }
    },
  };

  Babel.traverse(componentFile, {
    TSInterfaceDeclaration: path => {
      if (path.get('id').isIdentifier({ name: `${componentName}Props` })) {
        path.traverse(propertyVisitor);
      }
    },
  });

  return typeAnnotation;
}

export function parseType(
  componentFile: t.File,
  componentName: string,
  propName: string,
  propInfo: PropItem,
): ComponentPropType[] {
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
}
