import { stripIndents } from '@nx/devkit';
import ts from 'typescript';

/**
 * Should be used to get the tooling config object when JS configuration is used
 */
export function getCjsConfigObjectAst(fileContent: string): ts.ObjectLiteralExpression {
  const sourceFile = ts.createSourceFile('file-config.js', fileContent, ts.ScriptTarget.Latest, true);

  const moduleExportsStatement = sourceFile.statements.find(
    statement =>
      ts.isExpressionStatement(statement) &&
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.left.getText() === 'module.exports' &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken,
  );

  const moduleExports = (moduleExportsStatement as ts.ExpressionStatement).expression as ts.BinaryExpression;

  if (!moduleExports) {
    throw new Error(
      stripIndents`
       The provided config file does not have the expected 'module.exports' expression.
      `,
    );
  }

  if (!ts.isObjectLiteralExpression(moduleExports.right)) {
    throw new Error(`The 'module.exports' expression is not an object literal.`);
  }

  return moduleExports.right as ts.ObjectLiteralExpression;
}

export function getASTconfigObjectProp(object: ts.ObjectLiteralExpression, propName: string) {
  const extendsProperty = object.properties.find(value => {
    if (!ts.isPropertyAssignment(value)) {
      return;
    }
    if (!ts.isIdentifier(value.name)) {
      return;
    }
    if (value.name.escapedText === propName) {
      return true;
    }
    return;
  });

  return extendsProperty ? (extendsProperty as ts.PropertyAssignment).initializer.getText() : undefined;
}
