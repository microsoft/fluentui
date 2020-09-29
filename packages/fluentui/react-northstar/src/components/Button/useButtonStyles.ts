import { useStyles } from '@fluentui/react-bindings';
import { ButtonProps } from './Button';

interface UseComponentStyles<P> {
  props: P;
  displayName?: string;
  rtl: boolean;
  overrides?: {
    stylingTokens?: object;
    className?: string;
  };
  // TODO: fix typings
  options?: {
    overrideStyles?: boolean;
    displayNames?: string[];
  };
}

export const useButtonStyles = ({
  props,
  displayName = 'Button',
  rtl,
  overrides = {},
  options = {},
}: UseComponentStyles<ButtonProps>) => {
  const {
    // inline overrides
    className,
    design,
    styles,
    variables,
  } = props;

  const { stylingTokens = {}, className: buttonClassName = 'ui-button' } = overrides;

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

  const result = useStyles(displayName, {
    className: buttonClassName,
    mapPropsToStyles: () => resolvedStylingTokens,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl,
    // @ts-ignore TODO: fix me
    composeOptions: {
      overrideStyles: options.overrideStyles,
      ...(!options.overrideStyles && {
        ...(options.displayNames && {
          displayNames: options.displayNames,
        }),
        ...(!options.displayNames &&
          displayName !== 'Button' && {
            displayNames: ['Button', displayName],
          }),
      }),
    },
  });

  return result;
};
