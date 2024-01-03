import * as ts from 'typescript';

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

export function getCallbackTypeNode(
  program: ts.Program,
  filename: string,
  typeName: string,
  propertyName: string,
): ts.Node {
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

  return propertySignature.type;
}
