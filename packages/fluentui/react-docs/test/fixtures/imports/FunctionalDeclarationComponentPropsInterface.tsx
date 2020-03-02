import * as React from 'react';

export interface IPropsInterface {
  children?: React.ElementType[] | React.ElementType;
}

function FunctionalDeclarationComponentPropsInterface(props: IPropsInterface) {
  return <div>{props.children}</div>;
}

export default FunctionalDeclarationComponentPropsInterface;
