// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Field,
  renderField,
  useField,
  useFieldContext,
  useFieldContextValues,
  useFieldControlProps,
} from '@fluentui/react-headless-components-preview/field';

console.log(Field, renderField, useField, useFieldContext, useFieldContextValues, useFieldControlProps);

export default {
  name: '@fluentui/react-headless-components-preview/field',
};
