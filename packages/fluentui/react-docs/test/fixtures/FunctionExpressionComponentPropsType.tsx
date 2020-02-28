import * as React from 'react';

type Tprops = {
  children?: React.Component | React.Component[];
};

const FunctionExpressionComponentPropsType = (props: Tprops) => {
  return <div>{props.children}</div>;
};

export default FunctionExpressionComponentPropsType;
