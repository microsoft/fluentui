import { CodeSnippet, CodeSnippetProps, renderElementToJSX } from '@fluentui/docs-components';
import * as React from 'react';

type ComponentPlaygroundSnippetProps = {
  element?: React.ReactElement;
  component?: React.FunctionComponent;
} & Partial<CodeSnippetProps>;

/**
 * This component uses `react-element-to-jsx-string` to get a generated markup with props.
 */
const ComponentPlaygroundSnippet: React.FunctionComponent<ComponentPlaygroundSnippetProps> = props => {
  const { element, component, ...rest } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof component === 'function' && !!component.prototype?.isReactComponent) {
      throw new Error('We can handle only functional components as root component.');
    }

    if (!element && !component) {
      throw new Error('"element" or "component" should be specified');
    }
  }

  const jsxElement = element || component(null);
  const jsxMarkup = renderElementToJSX(jsxElement);

  return <CodeSnippet fitted mode="jsx" value={jsxMarkup} {...rest} />;
};

export default ComponentPlaygroundSnippet;
