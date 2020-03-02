import * as React from 'react';

type Tprops = {
  children?: React.Component | React.Component[];
};

function FunctionalDeclarationComponentPropsType(props: Tprops) {
  return <div>{props.children}</div>;
}

export default FunctionalDeclarationComponentPropsType;
