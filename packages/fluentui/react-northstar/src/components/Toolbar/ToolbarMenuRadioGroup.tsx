import {
  Accessibility,
  toolbarMenuRadioGroupBehavior,
  toolbarMenuItemRadioBehavior,
  ToolbarMenuRadioGroupBehaviorProps,
} from '@fluentui/accessibility';
import {
  compose,
  mergeVariablesOverrides,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  createShorthand,
  ChildrenComponentProps,
  ContentComponentProps,
  UIComponentProps,
  commonPropTypes,
} from '../../utils';
import { ComponentEventHandler, ShorthandCollection, ShorthandValue } from '../../types';
import { ToolbarMenuItem, ToolbarMenuItemProps } from './ToolbarMenuItem';
import { ToolbarMenuRadioGroupWrapper, ToolbarMenuRadioGroupWrapperProps } from './ToolbarMenuRadioGroupWrapper';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';

export interface ToolbarMenuRadioGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<ToolbarMenuRadioGroupBehaviorProps>;

  /** Index of the currently active item. */
  activeIndex?: number;

  /** Shorthand array of props for ToolbarMenuRadioGroup. */
  items?: ShorthandCollection<ToolbarMenuItemProps>;

  /**
   * Called on item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>;

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<ToolbarMenuRadioGroupWrapperProps>;
}

export type ToolbarMenuRadioGroupStylesProps = never;

export const toolbarMenuRadioGroupClassName = 'ui-toolbars'; // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

/**
 * A ToolbarMenuRadioGroup renders ToolbarMenuItem as a group of mutually exclusive options.
 */
export const ToolbarMenuRadioGroup = compose<
  'ul',
  ToolbarMenuRadioGroupProps,
  ToolbarMenuRadioGroupStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, activeIndex, className, design, items, styles, variables, wrapper } = props;

    const slotProps = composeOptions.resolveSlotProps<ToolbarMenuRadioGroupProps>(props);
    const parentVariables = React.useContext(ToolbarVariablesContext);
    const mergedVariables = mergeVariablesOverrides(parentVariables, variables);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarMenuRadioGroupStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergedVariables,
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const handleItemOverrides = (predefinedProps: ToolbarMenuItemProps): ToolbarMenuItemProps => ({
      onClick: (e, itemProps) => {
        _.invoke(predefinedProps, 'onClick', e, itemProps);
        _.invoke(props, 'onItemClick', e, itemProps);
      },
      wrapper: null,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const content = (
      <ElementType {...getA11yProps('root', { ...unhandledProps, className: classes.root, ref })}>
        <ToolbarVariablesProvider value={mergedVariables}>
          {_.map(items, (item, index) =>
            createShorthand(ToolbarMenuItem, item, {
              defaultProps: () => ({
                accessibility: toolbarMenuItemRadioBehavior,
                as: 'li',
                active: activeIndex === index,
                index,
              }),
              overrideProps: handleItemOverrides,
            }),
          )}
        </ToolbarVariablesProvider>
      </ElementType>
    );
    const element = createShorthand(composeOptions.slots.wrapper, wrapper, {
      defaultProps: () => getA11yProps('wrapper', slotProps.wrapper || {}),
      overrideProps: {
        children: content,
      },
    });
    setEnd();

    return element;
  },
  {
    className: toolbarMenuRadioGroupClassName,
    displayName: 'ToolbarMenuRadioGroup',

    slots: {
      wrapper: ToolbarMenuRadioGroupWrapper,
    },

    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'variables',

      'activeIndex',
      'items',
      'onItemClick',
      'wrapper',
    ],
  },
);

ToolbarMenuRadioGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  activeIndex: PropTypes.number,
  items: customPropTypes.collectionShorthand,
  onItemClick: PropTypes.func,
  wrapper: customPropTypes.itemShorthand,
};
ToolbarMenuRadioGroup.defaultProps = {
  as: 'ul',
  accessibility: toolbarMenuRadioGroupBehavior,
  wrapper: {},
};
