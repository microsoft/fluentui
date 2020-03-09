import * as React from 'react';

import { TPropsChildren } from '../external-component-types';

function FunctionalDeclarationComponentPropsTypeImported(props: TPropsChildren) {
  return <div>{props.children}</div>;
}

export default FunctionalDeclarationComponentPropsTypeImported;
