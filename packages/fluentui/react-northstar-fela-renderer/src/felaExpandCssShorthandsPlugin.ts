import { ICSSInJSStyle } from '@fluentui/styles';
// @ts-ignore
import { expandProperty } from 'inline-style-expand-shorthand';

// https://jsperf.com/array-indexof-vs-object-key-lookup2/12
const handledCssProps: Partial<Record<keyof ICSSInJSStyle, true>> = {
  // 'font', Oops, is not supported by inline-style-expand-shorthand
  padding: true,
  margin: true,
  border: true,
  borderWidth: true,
  borderStyle: true,
  borderColor: true,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
  borderRadius: true,
  background: true,
  outline: true,
};

export const felaExpandCssShorthandsPlugin = (styles: ICSSInJSStyle): ICSSInJSStyle => {
  return Object.keys(styles).reduce(
    (
      // Without casting to any TSC gives "Expression produces a union type that is too complex to represent" error
      acc: any,
      cssPropertyName: keyof ICSSInJSStyle,
    ) => {
      const cssPropertyValue = styles[cssPropertyName];

      if (cssPropertyValue === null || typeof cssPropertyValue === 'undefined') {
        acc[cssPropertyName] = cssPropertyValue;
      } else if (handledCssProps[cssPropertyName]) {
        const expandedProps = expandProperty(cssPropertyName, cssPropertyValue);

        if (expandedProps) {
          Object.assign(acc, expandedProps);
          return acc;
        }

        acc[cssPropertyName] = cssPropertyValue;
      } else if (Array.isArray(cssPropertyValue)) {
        acc[cssPropertyName] = cssPropertyValue;
      } else if (typeof cssPropertyValue === 'object') {
        acc[cssPropertyName] = felaExpandCssShorthandsPlugin(cssPropertyValue as ICSSInJSStyle);
      } else {
        acc[cssPropertyName] = cssPropertyValue;
      }

      return acc;
    },
    {},
  );
};
