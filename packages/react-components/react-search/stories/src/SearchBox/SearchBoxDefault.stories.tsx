import * as React from 'react';
import type { ArgTypes } from '@storybook/react';
import { Field, mergeClasses, makeStyles, SearchBox, FluentProvider } from '@fluentui/react-components';
import type { SearchBoxProps, SearchBoxState, FluentProviderCustomStyleHooks } from '@fluentui/react-components';

const useSearchBoxStyle = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

const useSearchBoxStyles = (state: unknown) => {
  const styles = useSearchBoxStyle();
  const componentState = state as SearchBoxState;
  componentState.root.className = mergeClasses(componentState.root.className, styles.root);
};

const CUSTOM_STYLE_HOOK: FluentProviderCustomStyleHooks = {
  useSearchBoxStyles_unstable: useSearchBoxStyles,
};

export const Default = (props: SearchBoxProps) => {
  return (
    <FluentProvider customStyleHooks_unstable={CUSTOM_STYLE_HOOK}>
      <Field label="Sample SearchBox">
        <SearchBox {...props} />
      </Field>
    </FluentProvider>
  );
};

const argTypes: ArgTypes = {
  // Add these native props to the props table and controls pane
  placeholder: {
    description:
      'Placeholder text for the SearchBox. If using this instead of a label (which is ' +
      'not recommended), be sure to provide an `aria-label` for screen reader users.',
    type: { name: 'string', required: false }, // for inferring control type
    table: { type: { summary: 'string' } }, // for showing type in prop table
  },
  disabled: {
    description: 'Whether the SearchBox is disabled',
    type: { name: 'boolean', required: false },
    table: { type: { summary: 'boolean' } },
  },
  // Hide these from the props table and controls pane
  children: { table: { disable: true } },
  as: { table: { disable: true } },
};
Default.argTypes = argTypes;
