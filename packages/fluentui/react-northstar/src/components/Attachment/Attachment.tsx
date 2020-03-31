import { Accessibility, attachmentBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import { WithAsProp, ShorthandValue, ComponentEventHandler, withSafeTypeForAs } from '../../types';
import {
  UIComponent,
  createShorthandFactory,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils';
import Box, { BoxProps } from '../Box/Box';
import Button, { ButtonProps } from '../Button/Button';
import Text, { TextProps } from '../Text/Text';
import { UIComponentProps, ChildrenComponentProps } from '../../utils/commonPropInterfaces';

export interface AttachmentProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

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

export interface AttachmentSlotClassNames {
  action: string;
}

class Attachment extends UIComponent<WithAsProp<AttachmentProps>> {
  static create: ShorthandFactory<AttachmentProps>;

  static className = 'ui-attachment';

  static displayName = 'Attachment';

  static slotClassNames: AttachmentSlotClassNames;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    action: customPropTypes.itemShorthand,
    actionable: PropTypes.bool,
    description: customPropTypes.itemShorthand,
    header: customPropTypes.itemShorthand,
    icon: customPropTypes.itemShorthandWithoutJSX,
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    accessibility: attachmentBehavior as Accessibility,
  };

  renderComponent({ ElementType, classes, unhandledProps, styles, variables, accessibility }) {
    const { header, description, icon, action, progress } = this.props;

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {icon &&
          Box.create(icon, {
            defaultProps: () => ({ styles: styles.icon }),
          })}
        {(header || description) && (
          <div className={classes.content}>
            {Text.create(header, {
              defaultProps: () => ({ styles: styles.header }),
            })}

            {Text.create(description, {
              defaultProps: () => ({ styles: styles.description }),
            })}
          </div>
        )}
        {action &&
          Button.create(action, {
            defaultProps: () => ({
              iconOnly: true,
              text: true,
              styles: styles.action,
              className: Attachment.slotClassNames.action,
            }),
          })}
        {!_.isNil(progress) && <div className={classes.progress} />}
      </ElementType>
    );
  }

  actionHandlers = {
    performClick: event => this.performClick(event),
  };

  performClick = e => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
      this.handleClick(e);
    }
  };

  handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(this.props, 'onClick', e, this.props);
  };
}

Attachment.create = createShorthandFactory({ Component: Attachment, mappedProp: 'header' });
Attachment.slotClassNames = {
  action: `${Attachment.className}__action`,
};

/**
 * An Attachment represents a file or media attachment, which may contain some metadata or actions.
 */
export default withSafeTypeForAs<typeof Attachment, AttachmentProps>(Attachment);
