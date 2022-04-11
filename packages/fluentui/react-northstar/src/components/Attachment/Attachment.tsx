import { Accessibility, attachmentBehavior, AttachmentBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  compose,
  getElementType,
  mergeVariablesOverrides,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ComponentEventHandler, ShorthandValue } from '../../types';
import {
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  createShorthand,
  ShorthandFactory,
} from '../../utils';
import { AttachmentAction, AttachmentActionProps } from './AttachmentAction';
import { AttachmentBody, AttachmentBodyProps } from './AttachmentBody';
import { AttachmentDescription, AttachmentDescriptionProps } from './AttachmentDescription';
import { AttachmentHeader, AttachmentHeaderProps } from './AttachmentHeader';
import { AttachmentIcon, AttachmentIconProps } from './AttachmentIcon';

export interface AttachmentProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<AttachmentBehaviorProps>;

  /** Button shorthand for the action slot. */
  action?: ShorthandValue<AttachmentActionProps>;

  /** An Attachment can be styled to indicate possible user interaction. */
  actionable?: boolean;

  /** Contains a header and a description for an Attachment. */
  body?: ShorthandValue<AttachmentBodyProps>;

  /** A string describing the attachment. */
  description?: ShorthandValue<AttachmentDescriptionProps>;

  /** An attachment can show that it cannot be interacted with. */
  disabled?: boolean;

  /** The name of the attachment. */
  header?: ShorthandValue<AttachmentHeaderProps>;

  /** Shorthand for the icon. */
  icon?: ShorthandValue<AttachmentIconProps>;

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
export const attachmentClassName = 'ui-attachment';
export const attachmentProgressContainerClassName = `${attachmentClassName}__progress-container`;
export const attachmentProgressBarClassName = `${attachmentClassName}__progress`;

/**
 * An Attachment represents a file or media attachment, which may contain some metadata or actions.
 */
export const Attachment = compose<'div', AttachmentProps, AttachmentStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const {
      accessibility,
      action,
      actionable,
      body,
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
      debugName: composeOptions.displayName,
      actionHandlers: {
        performClick: e => {
          if (e.currentTarget === e.target) {
            e.stopPropagation();
            handleClick(e);
          }
        },
      },
      mapPropsToBehavior: () => ({ actionable }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<AttachmentStylesProps>(composeOptions.displayName, {
      className: attachmentClassName,
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
      composeOptions,
      unstable_props: props,
    });

    const slotProps = composeOptions.resolveSlotProps<AttachmentProps>(props);

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const handleClick = (e: React.KeyboardEvent | React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const element = getA11Props.unstable_wrapWithFocusZone(
      <ElementType {...getA11Props('root', { className: classes.root, onClick: handleClick, ref, ...unhandledProps })}>
        {createShorthand(composeOptions.slots.icon, icon, {
          defaultProps: () => slotProps.icon,
          overrideProps: predefinedProps => ({
            variables: mergeVariablesOverrides(variables, predefinedProps.variables),
          }),
        })}

        {(header || description) &&
          createShorthand(composeOptions.slots.body, body, {
            defaultProps: () => slotProps.body,
            overrideProps: predefinedProps => ({
              content: (
                <>
                  {createShorthand(composeOptions.slots.header, header, {
                    defaultProps: () => slotProps.header,
                    overrideProps: predefinedProps => ({
                      variables: mergeVariablesOverrides(variables, predefinedProps.variables),
                    }),
                  })}
                  {createShorthand(composeOptions.slots.description, description, {
                    defaultProps: () => slotProps.description,
                    overrideProps: predefinedProps => ({
                      variables: mergeVariablesOverrides(variables, predefinedProps.variables),
                    }),
                  })}
                </>
              ),
              variables: mergeVariablesOverrides(variables, predefinedProps.variables),
            }),
          })}

        {createShorthand(composeOptions.slots.action, action, {
          defaultProps: () => slotProps.action,
          overrideProps: predefinedProps => ({
            variables: mergeVariablesOverrides(variables, predefinedProps.variables),
          }),
        })}
        {!_.isNil(progress) && (
          <div className={attachmentProgressContainerClassName}>
            <div className={attachmentProgressBarClassName} style={{ width: `${progress}%` }} />
          </div>
        )}
      </ElementType>,
    );
    setEnd();

    return element;
  },
  {
    className: attachmentClassName,
    displayName: 'Attachment',
    slots: {
      action: AttachmentAction,
      body: AttachmentBody,
      description: AttachmentDescription,
      header: AttachmentHeader,
      icon: AttachmentIcon,
    },
    handledProps: [
      'accessibility',
      'action',
      'actionable',
      'as',
      'body',
      'children',
      'className',
      'description',
      'design',
      'header',
      'icon',
      'onClick',
      'progress',
      'styles',
      'variables',
    ],
  },
) as ComponentWithAs<'div', AttachmentProps> & {
  create: ShorthandFactory<AttachmentProps>;
  Action: typeof AttachmentAction;
  Body: typeof AttachmentBody;
  Description: typeof AttachmentDescription;
  Header: typeof AttachmentHeader;
  Icon: typeof AttachmentIcon;
};

Attachment.create = createShorthandFactory({ Component: Attachment, mappedProp: 'header' });

Attachment.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  action: customPropTypes.itemShorthand,
  actionable: PropTypes.bool,
  body: customPropTypes.itemShorthand,
  description: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  icon: customPropTypes.shorthandAllowingChildren,
  onClick: PropTypes.func,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Attachment.defaultProps = {
  accessibility: attachmentBehavior,
  body: {},
};

Attachment.Action = AttachmentAction;
Attachment.Body = AttachmentBody;
Attachment.Description = AttachmentDescription;
Attachment.Header = AttachmentHeader;
Attachment.Icon = AttachmentIcon;
