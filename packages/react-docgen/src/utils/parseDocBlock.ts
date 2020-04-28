import * as doctrine from 'doctrine';
import { DocBlock } from '../types';

export function parseDocBlock(docblock: string): DocBlock {
  const { description = '', tags = [], ...rest } = doctrine.parse(docblock || '', { unwrap: true });

  return {
    ...rest,
    description,
    tags,
  };
}
