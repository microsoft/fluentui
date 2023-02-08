import * as React from 'react';
import { Field } from '@fluentui/react-field';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => (
  <Field label="Example Field" validationMessage="Example error message." hint="Example hint.">
    <input />
  </Field>
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
