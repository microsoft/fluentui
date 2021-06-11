import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { LabelProps, LabelShorthandProps, LabelState } from './Label.types';

/**
 * Array of all shorthand properties listed in LabelShorthandProps
 * {@docCatergory Label}
 */
export const labelShorthandProps: LabelShorthandProps[] = ['required'];

const mergeProps = makeMergeProps<LabelState>({ deepMerge: labelShorthandProps });

/**
 * Create the state required to render Label.
 *
 * The returned state can be modified with hooks such as useLabelStyles,
 * before being passed to renderLabel.
 *
 * @param props - props from this instance of Label
 * @param ref - reference to root HTMLElement of Label
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Label}
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLElement>, defaultProps?: LabelProps): LabelState => {
  const state = mergeProps(
    {
      ref,
      as: 'label',
      size: 'medium',
      required: {
        as: 'span',
      },
    },
    defaultProps && resolveLabelShorthandProps(defaultProps),
    resolveLabelShorthandProps(props),
  );

  return state;
};

/**
 * Label will first need to check if required is a boolean or shorthandprops,
 * this allows for the required prop to handle both the default asterisk for required
 * or a custom required text.
 */
const resolveLabelShorthandProps = (props: LabelProps) => {
  let propsNormalized;
  if (props.required === true) {
    propsNormalized = { ...props, required: { children: '*' } };
  } else if (props.required === false) {
    propsNormalized = { ...props, required: undefined };
  } else {
    // TypeScript needs a nudge to figure out that props.required won't be a boolean here
    propsNormalized = props as LabelProps & { required?: Exclude<LabelProps['required'], boolean> };
  }

  return resolveShorthandProps(propsNormalized, labelShorthandProps);
};
