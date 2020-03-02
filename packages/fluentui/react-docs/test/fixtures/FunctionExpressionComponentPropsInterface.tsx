import * as React from 'react';

interface Iprops {
  children?: React.Component | React.Component[];
}

const FunctionExpressionComponentPropsInterface = (props: Iprops) => {
  return <div>{props.children}</div>;
};

export default FunctionExpressionComponentPropsInterface;
