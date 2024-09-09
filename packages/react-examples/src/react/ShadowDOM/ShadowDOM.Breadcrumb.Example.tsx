import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { BreadcrumbBasicExample } from '../Breadcrumb/Breadcrumb.Basic.Example';

export const ShadowDOMBreadcrumbExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <BreadcrumbBasicExample />
    </Shadow>
  );
};
