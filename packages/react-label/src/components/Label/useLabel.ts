import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { LabelProps, labelShorthandProps, LabelState } from './Label.types';

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
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLElement>, defaultProps?: LabelProps): LabelState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps && resolveShorthandProps(defaultProps, labelShorthandProps),
    resolveShorthandProps(props, labelShorthandProps),
  );

  return state;
};
