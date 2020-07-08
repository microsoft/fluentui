import * as React from 'react';
import { ToImport } from './mockImport';

// tslint:disable-next-line: no-any
export const JSXFunctionalNormalTag = (props: any) => {
  // tslint:disable-next-line: jsx-self-close
  return <div></div>;
};

export const JSXFunctionalSelfClosingTag = () => {
  return <div />;
};

export const CustomReactElement = () => {
  return (
    <div>
      <JSXFunctionalSelfClosingTag />
      <JSXFunctionalNormalTag>some vallue</JSXFunctionalNormalTag>
      <ToImport>fasdef</ToImport>
      text
    </div>
  );
};
