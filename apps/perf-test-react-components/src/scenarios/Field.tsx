import * as React from 'react';
import { Field } from '@fluentui/react-field';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

const Scenario = () => (
  <Field label="Example Field" validationMessage="Example error message." hint="Example hint.">
    <input />
  </Field>
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider themeClassName={webLightThemeClassName}>{props.children}</FluentProvider>
);

export default Scenario;
