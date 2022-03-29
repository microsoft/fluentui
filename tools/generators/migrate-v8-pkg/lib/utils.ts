// use this module to define any kind of generic utilities that are used in more than 1 place within the generator implementation

import * as ts  from "typescript";

export function dummyHelper() {
  return;
}



/**
 * Should be used to get the jest config object.
 *
 * @param host
 * @param path
 */
export function eslintConfigObjectAst(
  fileContent: string
): ts.ObjectLiteralExpression {

  const sourceFile = ts.createSourceFile(
    '.eslintrc.js',
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const moduleExportsStatement = sourceFile.statements.find(
    (statement) =>
      ts.isExpressionStatement(statement) &&
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.left.getText() === 'module.exports' &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken
  );

  const moduleExports = (moduleExportsStatement as ts.ExpressionStatement)
    .expression as ts.BinaryExpression;

  if (!moduleExports) {
    throw new Error(
      `
       The provided jest config file does not have the expected 'module.exports' expression.
       See https://jestjs.io/docs/en/configuration for more details.`
    );
  }

  if (!ts.isObjectLiteralExpression(moduleExports.right)) {
    throw new Error(
      `The 'module.exports' expression is not an object literal.`
    );
  }

  return moduleExports.right as ts.ObjectLiteralExpression;
}


export function getExtendsProp(object: ts.ObjectLiteralExpression){
  // const extendsProperty = object.properties.find(value=>{
  //   //  if(ts.isIdentifier(value) && value.text === 'extends'){

  //   //    return tsNode.
  //   //  }
  //   if(ts.isPropertyName(value.name) === 'extends'){
  //     return value
  //   }
  // })
    // return ts.isIdentifier()

    return ts.factory.createObjectLiteralExpression(object.properties)
}
