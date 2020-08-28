import { ICSSInJSStyle } from '@fluentui/styles';
import * as CSS from 'csstype';
// @ts-ignore
import { expandProperty } from 'inline-style-expand-shorthand';

// https://jsperf.com/array-indexof-vs-object-key-lookup2/12
const handledCssProps: Partial<Record<keyof CSS.Properties, true>> = {
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
  return Object.keys(styles).reduce((acc: ICSSInJSStyle, cssPropertyName: keyof CSS.Properties) => {
    const cssPropertyValue = styles[cssPropertyName];

    if (cssPropertyValue === null || typeof cssPropertyValue === 'undefined') {
      return { ...acc, [cssPropertyName]: cssPropertyValue };
    }

    if (handledCssProps[cssPropertyName]) {
      const expandedProps = expandProperty(cssPropertyName, cssPropertyValue);

      if (expandedProps) {
        return { ...acc, ...expandedProps };
      }
    }

    if (Array.isArray(cssPropertyValue)) {
      return { ...acc, [cssPropertyName]: cssPropertyValue };
    }

    if (typeof cssPropertyValue === 'object') {
      return { ...acc, [cssPropertyName]: felaExpandCssShorthandsPlugin(cssPropertyValue) };
    }

    return { ...acc, [cssPropertyName]: cssPropertyValue };
  }, {});
};
