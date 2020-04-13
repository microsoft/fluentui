import { Accessibility, attachmentBehavior, AttachmentBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  WithAsProp,
  ShorthandValue,
  ComponentEventHandler,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { createShorthandFactory, commonPropTypes, UIComponentProps, ChildrenComponentProps } from '../../utils';
import Box, { BoxProps } from '../Box/Box';
import Button, { ButtonProps } from '../Button/Button';
import Text, { TextProps } from '../Text/Text';

export interface AttachmentProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<AttachmentBehaviorProps>;

  /** Button shorthand for the action slot. */
  action?: ShorthandValue<ButtonProps>;

  /** An Attachment can be styled to indicate possible user interaction. */
  actionable?: boolean;

  /** A string describing the attachment. */
  description?: ShorthandValue<TextProps>;

  /** An attachment can show that it cannot be interacted with. */
  disabled?: boolean;

  /** The name of the attachment. */
  header?: ShorthandValue<TextProps>;

  /** Shorthand for the icon. */
  icon?: ShorthandValue<BoxProps>;

  /** Value indicating percent complete. */
  progress?: string | number;

  /**
   * Called after user's click.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<AttachmentProps>;
}

export type AttachmentStylesProps = Required<Pick<AttachmentProps, 'actionable' | 'disabled'>>;

export interface AttachmentSlotClassNames {
  action: string;
}

const Attachment: React.FC<WithAsProp<AttachmentProps>> &
  FluentComponentStaticProps<AttachmentProps> & { slotClassNames: AttachmentSlotClassNames } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Attachment.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    action,
    actionable,
    className,
    description,
    design,
    disabled,
    header,
    icon,
    onClick,
    progress,
    styles,
    variables,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Attachment.displayName,
    actionHandlers: {
      performClick: e => {
        if (e.currentTarget === e.target) {
          e.stopPropagation();
          handleClick(e);
        }
      },
    },
    rtl: context.rtl,
  });
  const { classes, styles: resolvedStyles } = useStyles<AttachmentStylesProps>(Attachment.displayName, {
    className: Attachment.className,
    mapPropsToStyles: () => ({
      actionable: actionable || !!onClick,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Attachment.handledProps, props);

  const handleClick = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, onClick: handleClick, ...unhandledProps })}>
      {Box.create(icon, {
        defaultProps: () => ({ styles: resolvedStyles.icon }),
      })}
      {(header || description) && (
        <div className={classes.content}>
          {Text.create(header, {
            defaultProps: () => ({ styles: resolvedStyles.header }),
          })}

          {Text.create(description, {
            defaultProps: () => ({ styles: resolvedStyles.description }),
          })}
        </div>
      )}
      {Button.create(action, {
        defaultProps: () => ({
          iconOnly: true,
          text: true,
          styles: resolvedStyles.action,
          className: Attachment.slotClassNames.action,
        }),
      })}
      {!_.isNil(progress) && <div className={classes.progress} style={{ width: `${progress}%` }} />}
    </ElementType>
  );
  setEnd();

  return element;
};

Attachment.create = createShorthandFactory({ Component: Attachment, mappedProp: 'header' });
Attachment.slotClassNames = {
  action: `${Attachment.className}__action`,
};

Attachment.className = 'ui-attachment';
Attachment.displayName = 'Attachment';

Attachment.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  action: customPropTypes.itemShorthand,
  actionable: PropTypes.bool,
  description: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  icon: customPropTypes.shorthandAllowingChildren,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Attachment.defaultProps = {
  accessibility: attachmentBehavior,
};

Attachment.handledProps = Object.keys(Attachment.propTypes) as any;

/**
 * An Attachment represents a file or media attachment, which may contain some metadata or actions.
 */
export default withSafeTypeForAs<typeof Attachment, AttachmentProps>(Attachment);
