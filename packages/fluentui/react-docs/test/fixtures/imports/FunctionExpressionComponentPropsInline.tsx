import * as React from 'react';

const FunctionExpressionComponentPropsInline = (props: { children?: React.Component | React.Component[] }) => {
  return <div>{props.children}</div>;
};

export default FunctionExpressionComponentPropsInline;
