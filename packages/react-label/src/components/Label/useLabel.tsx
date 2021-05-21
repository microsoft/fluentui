import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { LabelProps, LabelShorthandProps, LabelState } from './Label.types';
import { makeStyles } from '@fluentui/react-make-styles';

/**
 * Array of all shorthand properties listed in LabelShorthandProps
 */
export const labelShorthandProps: LabelShorthandProps[] = ['info'];

const mergeProps = makeMergeProps<LabelState>({ deepMerge: labelShorthandProps });

const useStyles = makeStyles({
  asterisk: theme => ({
    color: theme.alias.color.red.foreground3,
    fontSize: theme.global.type.fontSizes.base[300],
    paddingLeft: '4px',
  }),
  optional: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    fontSize: theme.global.type.fontSizes.base[300],
    paddingLeft: '4px',
  }),
});

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
  const [showInfo] = React.useState(false);
  const styles = useStyles();

  const state = mergeProps(
    {
      ref,
      info: {
        as: React.Fragment,
      },
      showInfo: showInfo,
    },
    defaultProps && resolveShorthandProps(defaultProps, labelShorthandProps),
    resolveShorthandProps(props, labelShorthandProps),
  );

  const asterisk = <span className={styles.asterisk}>*</span>;
  const optional = <span className={styles.optional}>(Optional)</span>;

  state.children = (
    <>
      {state.children}
      {state.required && !state.optional && asterisk}
      {state.optional && !state.required && optional}
    </>
  );

  return state;
};
