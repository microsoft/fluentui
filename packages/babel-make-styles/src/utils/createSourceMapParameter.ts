import { BabelFile, NodePath, types as t } from '@babel/core';
import * as convert from 'convert-source-map';
import { SourceMapGenerator } from 'source-map';

export function createSourceMapParameter(
  id: string,
  file: BabelFile,
  nodes: NodePath<t.ObjectProperty['key']>[],
): t.ArrayExpression {
  const source = file.opts.sourceFileName || file.opts.filename;

  if (source === null || source === undefined) {
    throw new Error();
  }

  const generator = new SourceMapGenerator({
    file: file.opts.sourceFileName!,
    sourceRoot: file.opts.sourceRoot!,
  });
  generator.setSourceContent(file.opts.sourceFileName!, file.code);

  // Fake mapping
  generator.addMapping({
    generated: { line: 1, column: 0 },
    source,
    original: { line: 1, column: 0 },
  });

  const sourceMapComment = convert.fromObject(generator).toComment({ multiline: true });

  return t.arrayExpression([
    t.stringLiteral(id),
    t.stringLiteral(sourceMapComment),
    t.objectExpression(
      nodes.map(nodePath => {
        if (nodePath.node.loc === null) {
          throw new Error('');
        }

        return t.objectProperty(t.cloneNode(nodePath.node) as any, t.numericLiteral(nodePath.node.loc.start.line));
      }),
    ),
  ]);
}
