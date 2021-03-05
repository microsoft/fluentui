import * as React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

const getDisplayName = (element: React.ReactElement<any>): string =>
  // @ts-ignore
  element.type.displayName ||
  // @ts-ignore // function name
  element.type.name ||
  // function without a name, you should provide one
  (typeof element.type === 'function' ? 'NoDisplayName' : element.type);

export const renderElementToJSX = (element: React.ReactNode, triggerErrorOnRenderFn: boolean = false) => {
  let renderHasFunction;

  const jsxMarkup = reactElementToJSXString(element, {
    displayName: (element: React.ReactElement<any>): string => {
      const displayName = getDisplayName(element);

      // Components created by MDX have following signature:
      // <MDXCreateElement gap="gap.small" mdxType="Flex" originalType>
      return displayName === 'MDXCreateElement' ? element.props.mdxType : displayName;
    },
    showDefaultProps: false,
    showFunctions: true,
    filterProps: [
      // MDX props
      'mdxType',
      'originalType',
      // Fluent UI props
      'accessibility',
      'onClick',
      'onChange',
    ],
    functionValue: () => (renderHasFunction = true),
  });

  if (process.env.NODE_ENV !== 'production') {
    if (renderHasFunction && triggerErrorOnRenderFn) {
      throw new Error(
        [
          "This ExampleSnippet's render prop output includes function.",
          ' A helpful JSX string cannot be generated for functions.',
          ' Please define a `value` string prop that displays readable code to the user.',
          '\n\n',
          'RENDERED:',
          '\n\n',
          jsxMarkup,
        ].join(''),
      );
    }
  }

  return jsxMarkup;
};
