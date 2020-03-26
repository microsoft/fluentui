import * as React from 'react';
import { useStyles, useTelemetry, getElementType, useUnhandledProps } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { childrenExist, commonPropTypes, createShorthandFactory, rtlTextContainer } from '../../utils';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { BoxProps } from '../Box/Box';
import { ButtonProps } from './Button';

export interface ButtonContentProps extends BoxProps {
  size?: ButtonProps['size'];
}

export type ButtonContentStylesProps = Pick<ButtonContentProps, 'size'>;

const ButtonContent: React.FC<WithAsProp<ButtonContentProps>> &
  FluentComponentStaticProps<ButtonContentProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ButtonContent.displayName, context.telemetry);
  setStart();

  const { size, content, children, className, styles, variables, design } = props;

  const { classes } = useStyles<ButtonContentStylesProps>(ButtonContent.displayName, {
    className: ButtonContent.className,
    mapPropsToStyles: () => ({ size }),
    mapPropsToInlineStyles: () => ({
      className,
      styles,
      variables,
      design,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ButtonContent.handledProps, props);

  const result = (
    <ElementType
      {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
      className={classes.root}
      {...unhandledProps}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return result;
};

ButtonContent.displayName = 'ButtonContent';
ButtonContent.className = 'ui-button__content';

ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};

ButtonContent.handledProps = Object.keys(ButtonContent.propTypes) as any;

ButtonContent.create = createShorthandFactory({
  Component: ButtonContent,
  mappedProp: 'content',
});

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export default withSafeTypeForAs<typeof ButtonContent, ButtonContentProps>(ButtonContent);
