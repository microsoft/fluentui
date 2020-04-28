import * as doctrine from 'doctrine';
import { DocBlock } from '@fluentui/react-docgen-types';

export function parseDocBlock(docblock: string): DocBlock {
  const { description = '', tags = [], ...rest } = doctrine.parse(docblock || '', { unwrap: true });

  return {
    ...rest,
    description,
    tags,
  };
}
