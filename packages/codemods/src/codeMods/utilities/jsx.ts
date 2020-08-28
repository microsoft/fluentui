import { SourceFile, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';

export function findJsxTag(file: SourceFile, tag: string) {
  const instances: (JsxOpeningElement | JsxSelfClosingElement)[] = [];
  file.forEachDescendant(val => {
    switch (val.getKind()) {
      case SyntaxKind.JsxOpeningElement:
      case SyntaxKind.JsxSelfClosingElement: {
        if ((val as JsxOpeningElement | JsxSelfClosingElement).getTagNameNode().getText() === tag) {
          instances.push(val as JsxSelfClosingElement | JsxOpeningElement);
        }
      }
    }
  });
  return instances;
}
