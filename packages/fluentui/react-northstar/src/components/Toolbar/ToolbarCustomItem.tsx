import { Accessibility, IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility';
import {
  compose,
  getElementType,
  mergeVariablesOverrides,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ComponentEventHandler } from '../../types';
import {
  ChildrenComponentProps,
  ContentComponentProps,
  UIComponentProps,
  childrenExist,
  commonPropTypes,
} from '../../utils';
import { ToolbarVariablesContext } from './toolbarVariablesContext';

export interface ToolbarCustomItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A custom item can remove element padding, vertically or horizontally. */
  fitted?: boolean | 'horizontally' | 'vertically';

  /** A custom item can be focused. */
  focusable?: boolean;

  /** A custom item can't be actionable. */
  onClick?: never;

  /**
   * Called after user's focus. Will be called only if the item is focusable.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarCustomItemProps>;

  /**
   * Called after item blur. Will be called only if the item is focusable.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarCustomItemProps>;
}

export type ToolbarCustomItemStylesProps = Required<Pick<ToolbarCustomItemProps, 'fitted'>>;
export const toolbarCustomItemClassName = 'ui-toolbar__customitem';

/**
 * A ToolbarCustomItem renders Toolbar item as a non-actionable `div` with custom content inside.
 */
export const ToolbarCustomItem = compose<'div', ToolbarCustomItemProps, ToolbarCustomItemStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, children, className, content, design, fitted, focusable, styles, variables } = props;
    const parentVariables = React.useContext(ToolbarVariablesContext);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarCustomItemStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({ fitted }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergeVariablesOverrides(parentVariables, variables),
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const handleBlur = (e: React.SyntheticEvent) => {
      if (focusable) {
        _.invoke(props, 'onBlur', e, props);
      }
    };

    const handleFocus = (e: React.SyntheticEvent) => {
      if (focusable) {
        _.invoke(props, 'onFocus', e, props);
      }
    };

    const element = (
      <ElementType
        {...getA11yProps('root', {
          [IS_FOCUSABLE_ATTRIBUTE]: focusable,
          ...unhandledProps,
          className: classes.root,
          onBlur: handleBlur,
          onFocus: handleFocus,
          ref,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
    setEnd();

    return element;
  },
  {
    className: toolbarCustomItemClassName,
    displayName: 'ToolbarCustomItem',

    shorthandConfig: { mappedProp: 'content' },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'fitted',
      'focusable',
      'onBlur',
      'onFocus',
      'styles',
      'variables',
    ],
  },
);

ToolbarCustomItem.propTypes = {
  ...commonPropTypes.createCommon(),
  fitted: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'horizontally' | 'vertically'>(['horizontally', 'vertically']),
  ]),
  focusable: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
