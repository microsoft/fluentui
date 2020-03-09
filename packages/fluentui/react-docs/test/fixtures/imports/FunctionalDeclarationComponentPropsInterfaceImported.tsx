import * as React from 'react';

import { IPropsChildren } from '../external-component-types';

function FunctionalDeclarationComponentPropsInterfaceImported(props: IPropsChildren) {
  return <div>{props.children}</div>;
}

export default FunctionalDeclarationComponentPropsInterfaceImported;
