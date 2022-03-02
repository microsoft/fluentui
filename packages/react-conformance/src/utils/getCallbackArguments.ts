import * as ts from 'typescript';

// ---

export type ArgumentName = string;
type ArgumentPrimitiveValue = null | boolean | string | undefined;
export type ArgumentValue = ArgumentPrimitiveValue | Record<string, ArgumentPrimitiveValue>;

// ---

/**
 * Returns an identifier as a string.
 */
function identifierToString(node: ts.Identifier): string {
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
function keywordNodeToPrimitive(node: ts.Node): null | string | undefined {
  if (node.kind === ts.SyntaxKind.BooleanKeyword) {
    return 'boolean';
  }

  if (node.kind === ts.SyntaxKind.NumberKeyword) {
    return 'number';
  }

  if (node.kind === ts.SyntaxKind.StringKeyword) {
    return 'string';
  }

  if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
    return undefined;
  }

  throw new Error(
    [
      `Found unexpected ${node.kind} node: "${node.getText()}".`,
      'This could be a bug or an unhandled scenario, please report it if it happens',
    ].join(' '),
  );
}

/**
 * Converts AST node with "LiteralType" that has "*Keyword" kind to a primitive value.
 */
function literalNodeToPrimitive(node: ts.LiteralTypeNode['literal']): null | boolean | string {
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.StringLiteral) {
    return node.getText();
  }

  throw new Error(
    `Unexpected kind of node is passed (${node.kind}), this could be a bug or an unhandled scenario. ` +
      `Please report it if it happens.`,
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

  return identifierToString(name);
}

/**
 * TS does not export "IntrinsicType".
 * See https://github.com/microsoft/TypeScript/issues/22269
 */
function isIntrinsicType(type: ts.Type): type is ts.Type & { intrinsicName: string } {
  return Object.prototype.hasOwnProperty.call(type, 'intrinsicName');
}

function typeHasSubtypes(type: ts.Type): type is ts.Type & { types: ts.Type[] } {
  return Array.isArray((type as ts.Type & { types: ts.Type[] }).types);
}

function typeToString(typeChecker: ts.TypeChecker, type: ts.Type): ArgumentValue | ArgumentValue[] {
  if (isIntrinsicType(type)) {
    return type.intrinsicName;
  }

  if (type.symbol?.declarations?.length) {
    const firstDeclaration = type.symbol.declarations[0];
    const fileName = firstDeclaration.parent.getSourceFile().fileName;

    // If types are coming from "node_modules" we want don't want to expand them, otherwise "Event" becomes an object
    // with properties.
    // "React" types are handled separately to add "React." prefix otherwise it's impossible to distinguish
    // "React.MouseEvent" and "MouseEvent" types.

    if (/\/node_modules\/@types\/react\//.test(fileName)) {
      return 'React.' + type.symbol.escapedName;
    }

    if (/\/node_modules\//.test(fileName)) {
      const escapedName = type.symbol.escapedName as string;

      if (escapedName === '__type') {
        throw new Error(
          [
            `We received a type "${typeChecker.typeToString(type)}" that is too complex to resolve.`,
            'Please simply it, for example remove usage of "Pick".',
          ].join(' '),
        );
      }

      return escapedName;
    }

    return parseArgumentType(typeChecker, type.symbol.declarations[0]);
  }

  if (typeHasSubtypes(type)) {
    return type.types.map(t => typeToString(typeChecker, t) as ArgumentValue);
  }

  return typeChecker.typeToString(type);
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
function parseArgumentType(
  typeChecker: ts.TypeChecker,
  typeNode: ts.ParameterDeclaration['type'] | ts.Declaration,
): ArgumentValue | ArgumentValue[] {
  if (!typeNode) {
    throw new Error(`We received ${typeof typeNode} instead of a node from TS AST, please report this if it happens`);
  }

  // Handles a case when a node is an object
  // { onChange: (data: { value: string }) => void }
  //                    ^
  if (ts.isTypeLiteralNode(typeNode)) {
    return typeNode.members.reduce((acc, member) => {
      if (!ts.isPropertySignature(member)) {
        throw new Error('We met an unhandled case, please report it');
      }

      return {
        ...acc,
        [parseArgumentName(member.name)]: parseArgumentType(typeChecker, member.type),
      };
    }, {});
  }

  // Handles a case when a node is a reference to another type
  // { onChange: (data: MouseEvent) => void }
  //                    ^
  // { onChange: (data: React.MouseEvent) => void }
  //                    ^
  if (ts.isTypeReferenceNode(typeNode)) {
    return typeToString(typeChecker, typeChecker.getTypeAtLocation(typeNode));
  }

  // Handles a case when a node is an array
  // { onChange: (data: string[] }
  //                    ^
  if (ts.isArrayTypeNode(typeNode)) {
    return 'Array';
  }

  // Handles a case when a node is a union of types
  // { onChange: (data: MouseEvent | KeyboardEvent) => void }
  //                    ^
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.map(typeFromUnion => parseArgumentType(typeChecker, typeFromUnion)) as ArgumentValue[];
  }

  // Handles a case when a node is a literal
  // { onChange: (data: false) => void }
  //                    ^
  if (ts.isLiteralTypeNode(typeNode)) {
    return literalNodeToPrimitive(typeNode.literal);
  }

  // Handles a case when a node is a class declaration
  // class Item {}
  // ...
  // { onChange: (data: Item) => void }
  //
  if (ts.isClassDeclaration(typeNode)) {
    return typeNode.name?.escapedText as string;
  }

  // Handles a case when a node is an interface declaration
  // interface Item {}
  // ...
  // { onChange: (data: Item) => void }
  //
  if (ts.isInterfaceDeclaration(typeNode)) {
    return typeNode.members.reduce((acc, member) => {
      const propertyName = parseArgumentName(member.name!);
      const propertyType = (member as ts.PropertySignature).type;

      return {
        ...acc,
        [propertyName]: parseArgumentType(typeChecker, propertyType),
      };
    }, {});
  }

  // Handles a case when a node is a keyword
  // { onChange: (data: boolean) => void }
  //                    ^
  // { onChange: (data: string) => void }
  //                    ^
  // eslint-disable-next-line no-bitwise
  if (typeNode.kind & ts.SyntaxKind.IsKeyword) {
    return keywordNodeToPrimitive(typeNode);
  }

  throw new Error(`Failed to parse an unknown argument type (${typeNode}), please report if it happens`);
}

/**
 * Parses callbacks arguments and values.
 */
function parseFunctionArguments(
  typeChecker: ts.TypeChecker,
  typeNode: ts.Node,
): [ArgumentName, ArgumentValue | ArgumentValue[]][] {
  if (!ts.isFunctionTypeNode(typeNode)) {
    throw new Error(`We received an AST node with wrong kind (${typeNode.kind}), please report this as a bug`);
  }

  return typeNode.parameters.reduce<[ArgumentName, ArgumentValue | ArgumentValue[]][]>((acc, parameter) => {
    acc.push([parseArgumentName(parameter.name), parseArgumentType(typeChecker, parameter.type)]);

    return acc;
  }, []);
}

/**
 * Find a property signature for a type, class, or interface.
 */
const findPropertySignature = (
  typeChecker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  typeName: string,
  propertyName: string,
  seen: { typeName: string; fileName: string }[],
): ts.PropertySignature | undefined => {
  // avoid infinte recursion looking up types
  if (seen.some(x => x.fileName === sourceFile.fileName && x.typeName === typeName)) {
    return undefined;
  }
  seen.push({ typeName, fileName: sourceFile.fileName });

  for (let i = 0; i < sourceFile.statements.length; i++) {
    const statement = sourceFile.statements[i];

    if (ts.isInterfaceDeclaration(statement) && statement?.name?.escapedText === typeName) {
      return statement.members.find(member => {
        if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
          return member.name.escapedText === propertyName;
        }

        return false;
      }) as ts.PropertySignature | undefined;
    }

    if (ts.isClassDeclaration(statement) && statement?.name?.escapedText === typeName) {
      // Class members are of a different type than interfaces, so the find is repeated
      return statement.members.find(member => {
        if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
          return member.name.escapedText === propertyName;
        }

        return false;
      }) as ts.PropertySignature | undefined;
    }

    if (ts.isTypeAliasDeclaration(statement)) {
      if (statement.name.escapedText === typeName) {
        // The can be Union, Intersection, or regular types
        // This uses the type checker to inspect across the composite type.
        const statementType = typeChecker.getTypeFromTypeNode(statement.type);
        const property = typeChecker.getPropertyOfType(statementType, propertyName);

        if (property?.valueDeclaration && ts.isPropertySignature(property.valueDeclaration)) {
          return property.valueDeclaration;
        }
      } else {
        // If the type name does not match, it may be a type alias
        // so follow the statement.type to resolve the underlying type.
        const propertySignature = findPropertySignature(
          typeChecker,
          statement.type.getSourceFile(),
          statement.name.escapedText as string,
          propertyName,
          seen,
        );

        if (propertySignature) {
          return propertySignature;
        }
      }
    }
  }

  return undefined;
};

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
 * Will be parsed to: ['event', 'Event']
 */
export function getCallbackArguments(
  program: ts.Program,
  filename: string,
  typeName: string,
  propertyName: string,
): [ArgumentName, ArgumentValue | ArgumentValue[]][] {
  const typeChecker = program.getTypeChecker();
  const sourceFile = program.getSourceFiles().find(file => file.fileName.includes(filename));

  if (!sourceFile) {
    throw new Error(
      `A file (${filename}) was not found in TS program, this looks like an invocation problem, check your params`,
    );
  }

  const propertySignature = findPropertySignature(program.getTypeChecker(), sourceFile, typeName, propertyName, []);

  if (!propertySignature) {
    throw new Error(`A file (${filename}) does not contain definition for type "${typeName}.${propertyName}".`);
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
    const typeAtLocation = typeChecker.getTypeAtLocation(propertySignature.type);
    const typeDeclarations = typeAtLocation.symbol.declarations;

    if (typeDeclarations?.length !== 1) {
      throw new Error(
        [
          `A definition for "${typeName}.${propertyName}" has multiple declarations, it's not expected.`,
          'Please report it if it happens',
        ].join(' '),
      );
    }

    return parseFunctionArguments(typeChecker, typeDeclarations[0]);
  }

  return parseFunctionArguments(typeChecker, propertySignature.type);
}
