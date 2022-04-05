import { parse } from '@babel/parser';

const parseBuffer = buffer =>
  parse(buffer.toString(), {
    plugins: ['classProperties', 'jsx'],
    sourceType: 'module',
  });

export default parseBuffer;
