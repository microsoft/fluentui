import * as ts from 'typescript';

export function validateCallbackType(node: ts.Node): void {
  if (
    !ts.isTypeReferenceNode(node) ||
    !ts.isIdentifier(node.typeName) ||
    node.typeName.escapedText !== 'EventHandler'
  ) {
    throw new Error(`A callback should use EventHandler type`);
  }

  const typeParam = node.typeArguments?.[0];
  if (!typeParam || !ts.isTypeReferenceNode(typeParam)) {
    throw new Error(`A callback should have a type parameter that extends EventData`);
  }
}
