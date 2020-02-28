import * as React from 'react';

function FunctionalDeclarationComponentPropsInline(props: { children: React.Component | React.Component[] }) {
  return <div>{props.children}</div>;
}

export default FunctionalDeclarationComponentPropsInline;
