import * as Babel from '@babel/core';
import * as convert from 'convert-source-map';
import { SourceMapGenerator } from 'source-map';

export function createSourceMapGenerator(file: Babel.BabelFile) {
  const generator = new SourceMapGenerator({
    file: file.opts.sourceFileName!,
    sourceRoot: file.opts.sourceRoot!,
  });

  generator.setSourceContent(file.opts.sourceFileName!, file.code);

  return generator;
}

export function createSourceMap(node: Babel.types.Node, file: Babel.BabelFile): string {
  if (node.loc === null) {
    throw new Error('');
  }

  if (file.opts.sourceFileName === null || file.opts.sourceFileName === undefined) {
    throw new Error();
  }

  const generator = createSourceMapGenerator(file);

  generator.addMapping({
    generated: {
      line: 1,
      column: 0,
    },
    source: file.opts.sourceFileName,
    original: node.loc.start,
  });

  return convert.fromObject(generator).toComment();
}
