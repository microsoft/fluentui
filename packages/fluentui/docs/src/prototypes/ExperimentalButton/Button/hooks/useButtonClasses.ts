import { ComposePreparedOptions, useStyles, UseStylesResult } from '@fluentui/react-bindings';
import { useRtl } from '../../rtlContext';
import { ButtonProps, ButtonStylesProps } from '@fluentui/react-northstar';

export type UseButtonClassesInput<
  P extends ButtonProps = ButtonProps,
  SP extends ButtonStylesProps = ButtonStylesProps
> = {
  props: P;
  displayName?: string;
  overrides?: {
    stylingTokens: SP;
    className?: string;
  };
  options?: Pick<ComposePreparedOptions, 'overrideStyles' | 'displayNames'>;
};

const useButtonClasses = <P extends ButtonProps = ButtonProps, SP extends ButtonStylesProps = ButtonStylesProps>({
  props,
  displayName = 'Button',
  overrides,
  options,
}: UseButtonClassesInput<P, SP>): UseStylesResult['classes'] => {
  const rtl = useRtl();

  const {
    //inline overrides
    className,
    design,
    styles,
    variables,
  } = props;

  const { stylingTokens = {}, className: buttonClassName = 'ui-button' } = overrides || {};

  const { overrideStyles, displayNames } = options || {};

  const resolvedStylingTokens = {
    text: props.text,
    primary: props.primary,
    disabled: props.disabled,
    circular: props.circular,
    size: props.size,
    loading: props.loading,
    inverted: props.inverted,
    iconOnly: props.iconOnly,
    iconPosition: props.iconPosition,
    fluid: props.fluid,
    hasContent: !!props.content,
    ...stylingTokens,
  };

  const { classes } = useStyles(displayName, {
    className: buttonClassName,
    mapPropsToStyles: () => resolvedStylingTokens,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl,
    composeOptions: {
      overrideStyles: overrideStyles,
      ...(!overrideStyles && {
        ...(displayNames && {
          displayNames,
        }),
        ...(!displayNames &&
          displayName !== 'Button' && {
            displayNames: ['Button', displayName],
          }),
      }),
      // TODO: remove these once the useStyles signature is updated
      displayName,
      render: () => null,
      handledProps: [],
      className: '',
      classes: [],
      mapPropsToStylesPropsChain: [],
      slots: { __self: null },
      slotProps: [],
      resolveSlotProps: () => ({}),
      shorthandConfig: {},
    },
  });

  return classes;
};

export default useButtonClasses;
