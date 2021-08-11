import * as ts from 'typescript';

// ---

type ArgumentName = string;
type ArgumentPrimitiveValue = null | boolean | string | undefined;
type ArgumentValue = ArgumentPrimitiveValue | Record<string, ArgumentPrimitiveValue>;

// ---

/**
 * Returns an identifier as a string.
 */
function escapeIdentifier(node: ts.Identifier): string {
  if (typeof node.escapedText !== 'string') {
    throw new Error(
      'An identifier is not a string, this could be a bug or an unhandled scenario. Please report it if it happens',
    );
  }

  return node.escapedText;
}

/**
 * Converts AST node that has "*Keyword" kind to a primitive value.
 */
function fromKeywordNodeToValue(node: ts.Node): null | string | undefined {
  if (node.kind === ts.SyntaxKind.BooleanKeyword) {
    return 'Boolean';
  }

  if (node.kind === ts.SyntaxKind.NumberKeyword) {
    return 'Number';
  }

  if (node.kind === ts.SyntaxKind.StringKeyword) {
    return 'String';
  }

  if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
    return undefined;
  }

  throw new Error(
    'Unexpected kind of node is passed, this could be a bug or an unhandled scenario. Please report it if it happens',
  );
}

/**
 * Converts AST node with "LiteralType" that has "*Keyword" kind to a primitive value.
 */
function fromLiteralNodeToValue(node: ts.LiteralTypeNode['literal']): null | boolean {
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  throw new Error(
    'Unexpected kind of node is passed, this could be a bug or an unhandled scenario. Please report it if it happens',
  );
}

// ---

/**
 * Parses an argument in a callback.
 *
 * @example
 * {
 *   onToggle: (event: Event, data: Data) => void
 *              ^             ^
 *              parses these nodes
 * }
 */
function parseArgumentName(name: ts.PropertyName | ts.ParameterDeclaration['name']): ArgumentName {
  if (!name) {
    throw new Error(`We received ${typeof name} instead of a node from TS AST, please report this if it happens`);
  }

  if (!ts.isIdentifier(name)) {
    throw new Error(
      [
        'An argument in a callback should be an identifier',
        'This could be a bug or an unhandled scenario. Please report it if it happens',
      ].join(' '),
    );
  }

  return escapeIdentifier(name);
}

/**
 * Parses a value in a callback.
 *
 * @example
 * {
 *   onToggle: (event: Event, data: Data) => void
 *                     ^            ^
 *              parses these nodes
 * }
 */
function parseArgumentType(type: ts.ParameterDeclaration['type']): ArgumentValue | ArgumentValue[] {
  if (!type) {
    throw new Error(`We received ${typeof type} instead of a node from TS AST, please report this if it happens`);
  }

  // Handles a case when a node is an object
  // { onChange: (data: { value: string }) => void }
  //                    ^
  if (ts.isTypeLiteralNode(type)) {
    return type.members.reduce((acc, member) => {
      if (!ts.isPropertySignature(member)) {
        throw new Error('We met an unhandled case, please report it');
      }

      return {
        ...acc,
        [parseArgumentName(member.name)]: parseArgumentType(member.type),
      };
    }, {});
  }

  // Handles a case when a node is a reference to another type
  // { onChange: (data: MouseEvent) => void }
  //                    ^
  // { onChange: (data: React.MouseEvent) => void }
  //                    ^
  if (ts.isTypeReferenceNode(type)) {
    if (ts.isIdentifier(type.typeName)) {
      return escapeIdentifier(type.typeName);
    }

    if (ts.isQualifiedName(type.typeName)) {
      if (!ts.isIdentifier(type.typeName.left)) {
        throw new Error('We met an unhandled case, please report it');
      }

      return `${escapeIdentifier(type.typeName.left)}.${escapeIdentifier(type.typeName.right)}`;
    }
  }

  // Handles a case when a node is an array
  // { onChange: (data: string[] }
  //                    ^
  if (ts.isArrayTypeNode(type)) {
    return 'Array';
  }

  // Handles a case when a node is a union of types
  // { onChange: (data: MouseEvent | KeyboardEvent) => void }
  //                    ^
  if (ts.isUnionTypeNode(type)) {
    return type.types.map(typeFromUnion => parseArgumentType(typeFromUnion)) as ArgumentValue[];
  }

  // Handles a case when a node is a literal
  // { onChange: (data: false) => void }
  //                    ^
  if (ts.isLiteralTypeNode(type)) {
    return fromLiteralNodeToValue(type.literal);
  }

  // Handles a case when a node is a keyword
  // { onChange: (data: boolean) => void }
  //                    ^
  // { onChange: (data: string) => void }
  //                    ^
  // eslint-disable-next-line no-bitwise
  if (type.kind & ts.SyntaxKind.IsKeyword) {
    return fromKeywordNodeToValue(type);
  }

  throw new Error('We met an unhandled case, please report if it happens');
}

/**
 * Parses callbacks arguments and values.
 */
function parseFunctionArguments(node: ts.Node): Record<ArgumentName, ArgumentValue> {
  if (!ts.isFunctionTypeNode(node)) {
    throw new Error(`We received an AST node with wrong kind (${node.kind}), please report this as a bug`);
  }

  return node.parameters.reduce((acc, parameter) => {
    return {
      ...acc,
      [parseArgumentName(parameter.name)]: parseArgumentType(parameter.type),
    };
  }, {});
}

/**
 * Unfortunately `react-typescript-docgen` returns stringified types for callbacks which is not useful as we can't
 * build additional validations around it. This function lookups for specified callbacks and returns its resolved
 * arguments.
 *
 * @param program An instance of TS Program
 * @param filename A filename where we will lookup for callback definition
 * @param typeName A name of type ("*Props") that contains callback definition
 * @param propertyName A name of property that contains callback definition
 *
 * @example
 * interface ComponentProps {
 *   onChange: (event: Event) => void
 * }
 *
 * Will be parsed to: { event: 'Event' }
 */
export function getCallbackArguments(
  program: ts.Program,
  filename: string,
  typeName: string,
  propertyName: string,
): Record<ArgumentName, ArgumentValue> {
  const sourceFile = program.getSourceFiles().find(file => file.fileName.includes(filename));

  if (!sourceFile) {
    throw new Error(
      `A file (${filename}) was not found in TS program, this looks like an invocation problem, check your params`,
    );
  }

  const propertiesDeclaration = sourceFile.statements.find(statement => {
    if (ts.isInterfaceDeclaration(statement)) {
      return statement.name.escapedText === typeName;
    }

    return false;
  }) as ts.InterfaceDeclaration | undefined;

  if (!propertiesDeclaration) {
    throw new Error(`A file (${filename}) does not contain definition for type "${typeName}"`);
  }

  const propertySignature = propertiesDeclaration.members.find(member => {
    if (ts.isPropertySignature(member)) {
      if (ts.isIdentifier(member.name)) {
        return member.name.escapedText === propertyName;
      }
    }

    return false;
  }) as ts.PropertySignature | undefined;

  if (!propertySignature) {
    throw new Error(`A file (${filename}) does not contain definition for type "${typeName}.${propertyName}"`);
  }

  if (!propertySignature.type) {
    throw new Error(
      [
        `A definition for "${typeName}.${propertyName}" does not have a type, this is not expected.`,
        'Please report it if it happens',
      ].join(' '),
    );
  }

  // Handles a case when a type is defined by reference
  //
  // export type Callback = () => {}
  // export type ComponentProps = { onClick: Callback }
  if (ts.isTypeReferenceNode(propertySignature.type)) {
    const typeChecker = program.getTypeChecker();

    const typeAtLocation = typeChecker.getTypeAtLocation(propertySignature.type);
    const typeDeclarations = typeAtLocation.symbol.declarations;

    if (typeDeclarations.length !== 1) {
      throw new Error(
        [
          `A definition for "${typeName}.${propertyName}" has multiple declarations, it's not expected.`,
          'Please report it if it happens',
        ].join(' '),
      );
    }

    return parseFunctionArguments(typeDeclarations[0]);
  }

  return parseFunctionArguments(propertySignature.type);
}
