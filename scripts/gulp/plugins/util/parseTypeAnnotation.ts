import * as t from '@babel/types';
import _ from 'lodash';

import { ComponentPropType } from './docs-types';

const keywords: Record<string, Function> = {
  any: t.isTSAnyKeyword,
  boolean: t.isTSBooleanKeyword,
  never: t.isTSNeverKeyword,
  number: t.isTSNumberKeyword,
  null: t.isTSNullKeyword,
  object: t.isTSObjectKeyword,
  string: t.isTSStringKeyword,
};

const parseTypeAnnotation = (propName: string, propType: string, tsType: t.TSType): ComponentPropType[] => {
  if (t.isTSParenthesizedType(tsType)) {
    return parseTypeAnnotation(propName, propType, tsType.typeAnnotation);
  }

  if (t.isTSUnionType(tsType)) {
    return _.flatMap(tsType.types, type => parseTypeAnnotation(propName, propType, type));
  }

  const keyword = _.findKey(keywords, matcher => matcher(tsType));

  if (keyword) {
    return [{ name: keyword, keyword: true }];
  }

  if (t.isTSArrayType(tsType)) {
    return [
      {
        name: 'array',
        parameters: parseTypeAnnotation(propName, propType, tsType.elementType),
      },
    ];
  }

  // TODO: improve parser to support function params and return values
  if (t.isTSFunctionType(tsType)) {
    return [{ name: 'function', value: propType }];
  }

  // TODO: improve parser for <A & B>
  if (t.isTSIntersectionType(tsType)) {
    return parseTypeAnnotation(propName, propType, tsType.types[0]);
  }

  if (t.isTSLiteralType(tsType)) {
    return [{ name: 'literal', value: tsType.literal.value.toString() }];
  }

  // Naming is weird, but it's a different type than LiteralType
  // TSLiteralType: type __ = false
  // TSTypeLiteral: type __ = { a: string }
  if (t.isTSTypeLiteral(tsType)) {
    return [{ name: 'object', value: propType }];
  }

  if (t.isTSTypeReference(tsType)) {
    if (t.isIdentifier(tsType.typeName)) {
      const definition: ComponentPropType = {
        name: tsType.typeName.name,
      };

      if (t.isTSTypeParameterInstantiation(tsType.typeParameters)) {
        definition.parameters = _.flatMap(tsType.typeParameters.params, param =>
          parseTypeAnnotation(propName, propType, param),
        );
      }

      return [definition];
    }
  }

  throw new Error(`A prop "${propName}" has unsupported type definition: ${propType}`);
};

export default parseTypeAnnotation;
