import * as doctrine from 'doctrine';

const parseDocblock = (docblock: string) => {
  const { description = '', tags = [], ...rest } = doctrine.parse(docblock || '', { unwrap: true });

  return {
    ...rest,
    description,
    tags,
  };
};

export default parseDocblock;
