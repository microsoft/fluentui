import * as React from 'react';
import { ToImport } from './mockImport';

export const JSXFunctionalNormalTag = (props: any) => {
  // eslint-disable-next-line react/self-closing-comp
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
