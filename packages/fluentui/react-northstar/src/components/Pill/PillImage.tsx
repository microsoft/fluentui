import { Accessibility, pillImageBehavior } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as React from 'react';

import { UIComponentProps, commonPropTypes, SizeValue } from '../../utils';
import { FluentComponentStaticProps } from '../../types';

export interface PillImageProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /**
   * A PillImage can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /** PillImage source URL. */
  src?: string;
}

export type PillImageStylesProps = Required<Pick<PillImageProps, 'size'>>;

export const pillImageClassName = 'ui-pill__image';

/**
 * An PillImage is a graphic representation used by Pill.
 */
export const PillImage = React.forwardRef<HTMLImageElement, PillImageProps>((props, ref) => {
  const context = useFluentContext();

  const { accessibility = pillImageBehavior, className, design, styles, variables, size } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: PillImage.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillImageStylesProps>(PillImage.displayName, {
    className: pillImageClassName,
    mapPropsToStyles: () => ({
      size,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props, 'img');
  const unhandledProps = useUnhandledProps(PillImage.handledProps, props);

  const result = <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })} />;

  return result;
}) as unknown as ForwardRefWithAs<'img', HTMLImageElement, PillImageProps> & FluentComponentStaticProps<PillImageProps>;

PillImage.displayName = 'PillImage';

PillImage.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
};

PillImage.handledProps = Object.keys(PillImage.propTypes) as any;

PillImage.shorthandConfig = {
  mappedProp: 'src',
  allowsJSX: false,
};
