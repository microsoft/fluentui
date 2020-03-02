import * as React from 'react';

import { TPropsChildren } from './external-component-types';

const FunctionExpressionComponentPropsTypeImported = (props: TPropsChildren) => {
  return <div>{props.children}</div>;
};

export default FunctionExpressionComponentPropsTypeImported;
