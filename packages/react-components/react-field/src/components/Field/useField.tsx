import * as React from 'react';
import type { FieldProps, FieldState } from './Field.types';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId, useMergedRefs } from '@fluentui/react-utilities';

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - props from this instance of Field
 * @param ref - reference to root HTMLElement of Field
 */
export const useField_unstable = (props: FieldProps, ref: React.Ref<HTMLElement>): FieldState => {
  const child = React.Children.only(props.children);
  const childProps = React.isValidElement(child) ? child.props : undefined;

  const baseId = useId('field-');

  const {
    labelFor = childProps?.id ?? baseId + '__input',
    labelId = baseId + '__label',
    labelPosition = 'above',
    required = childProps?.required,
    size = 'medium',
    status,
  } = props;

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: labelId,
      htmlFor: labelFor,
      required,
      size,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref = useMergedRefs(ref, useLabelDebugCheck(label));
  }

  let defaultStatusIcon;
  if (status === 'error') {
    defaultStatusIcon = <ErrorCircle12Filled />;
  } else if (status === 'warning') {
    defaultStatusIcon = <Warning12Filled />;
  } else if (status === 'success') {
    defaultStatusIcon = <CheckmarkCircle12Filled />;
  }

  return {
    labelFor: label?.htmlFor,
    labelId: label?.id,
    labelPosition,
    required,
    size,
    status,
    components: {
      root: 'div',
      label: Label,
      statusText: 'span',
      statusIcon: 'span',
      helperText: 'span',
    },
    root: getNativeElementProps('div', {
      ...props,
      ref,
    }),
    label,
    statusIcon: resolveShorthand(props.statusIcon, {
      required: !!defaultStatusIcon,
      defaultProps: {
        children: defaultStatusIcon,
      },
    }),
    statusText: resolveShorthand(props.statusText),
    helperText: resolveShorthand(props.helperText),
  };
};

const useLabelDebugCheck = (label: FieldState['label']) => {
  const labelFor = label?.htmlFor;
  const labelId = label?.id;
  const labelText = label?.children;
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!rootRef.current || !labelFor || !labelId) {
      return;
    }

    if (!rootRef.current.querySelector(`[id='${labelFor}'], [aria-labelledby='${labelId}']`)) {
      // eslint-disable-next-line no-console
      console.error(
        `Field with label "${labelText}" requires the label be associated with its input. Try one of these fixes:\n` +
          '1. Use a component that gets its ID from FieldContext.labelFor (e.g. the form controls in this library).\n' +
          "2. Or, set the Field's `labelFor` prop to the input's `id` prop.\n" +
          "3. Or, set the Field's `labelId` to the input's `aria-labelledby` prop.\n",
      );
    }
  }, [labelFor, labelId, labelText]);

  return rootRef;
};
