import * as React from 'react';
import { useElementContext } from './ElementContext';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetLength = alphabet.length;

export type ElementProps = {
  as?: React.ReactNode;
  depth?: number;
  start?: number;
  classPrefix?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Element: React.FC<ElementProps> = props => {
  const { depth: contextDepth } = useElementContext();
  const { as = 'div', children, depth = contextDepth, start = 0, classPrefix = '', className, ...rest } = props;

  const El = as as React.ElementType;
  let depthClassName = alphabet[start % alphabetLength];
  depthClassName = classPrefix ? `${classPrefix}-${depthClassName}` : depthClassName;

  const cn = className ? `${className} ${depthClassName}` : depthClassName;

  return depth > 1 ? (
    <El {...rest} className={cn}>
      <Element as={as} depth={depth - 1} start={start + 1} classPrefix={classPrefix} children={children} />
    </El>
  ) : (
    <El {...rest} className={cn}>
      {children}
    </El>
  );
};
