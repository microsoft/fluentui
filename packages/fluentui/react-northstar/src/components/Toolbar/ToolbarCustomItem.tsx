import { Accessibility, IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { mergeComponentVariables } from '@fluentui/styles';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  ComponentEventHandler,
  FluentComponentStaticProps,
  ProviderContextPrepared,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types';
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
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

const ToolbarCustomItem: React.FC<WithAsProp<ToolbarCustomItemProps>> & FluentComponentStaticProps = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarCustomItem.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, fitted, focusable, styles, variables } = props;
  const parentVariables = React.useContext(ToolbarVariablesContext);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarCustomItem.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<ToolbarCustomItemStylesProps>(ToolbarCustomItem.displayName, {
    className: toolbarCustomItemClassName,
    mapPropsToStyles: () => ({ fitted }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables: mergeComponentVariables(parentVariables, variables),
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ToolbarCustomItem.handledProps, props);

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
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
};

ToolbarCustomItem.displayName = 'ToolbarCustomItem';

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
ToolbarCustomItem.handledProps = Object.keys(ToolbarCustomItem.propTypes) as any;

ToolbarCustomItem.create = createShorthandFactory({
  Component: ToolbarCustomItem,
  mappedProp: 'content',
});

/**
 * A ToolbarCustomItem renders Toolbar item as a non-actionable `div` with custom content inside.
 */
export default withSafeTypeForAs<typeof ToolbarCustomItem, ToolbarCustomItemProps>(ToolbarCustomItem);
