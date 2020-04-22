import {
  Accessibility,
  toolbarMenuRadioGroupBehavior,
  toolbarMenuItemRadioBehavior,
  ToolbarMenuRadioGroupBehaviorProps,
} from '@fluentui/accessibility';
import { mergeComponentVariables } from '@fluentui/styles';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
} from '../../utils';
import {
  ComponentEventHandler,
  FluentComponentStaticProps,
  ProviderContextPrepared,
  ShorthandCollection,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types';
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem';
import Box, { BoxProps } from '../Box/Box';
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
  wrapper?: ShorthandValue<BoxProps>;
}

export type ToolbarMenuRadioGroupStylesProps = never;

export interface ToolbarMenuRadioGroupSlotClassNames {
  wrapper: string;
}

export const toolbarMenuRadioGroupClassName = 'ui-toolbars'; // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars
export const toolbarMenuRadioGroupSlotClassNames: ToolbarMenuRadioGroupSlotClassNames = {
  wrapper: `${toolbarMenuRadioGroupClassName}__wrapper`,
};

const ToolbarMenuRadioGroup: React.FC<WithAsProp<ToolbarMenuRadioGroupProps>> &
  FluentComponentStaticProps<ToolbarMenuRadioGroupProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarMenuRadioGroup.displayName, context.telemetry);
  setStart();

  const { accessibility, activeIndex, className, design, items, styles, variables, wrapper } = props;

  const parentVariables = React.useContext(ToolbarVariablesContext);
  const mergedVariables = mergeComponentVariables(parentVariables, variables);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarMenuRadioGroup.displayName,
    rtl: context.rtl,
  });
  const { classes, styles: resolvedStyles } = useStyles<ToolbarMenuRadioGroupStylesProps>(
    ToolbarMenuRadioGroup.displayName,
    {
      className: toolbarMenuRadioGroupClassName,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergedVariables,
      }),
      rtl: context.rtl,
    },
  );

  const handleItemOverrides = (predefinedProps: ToolbarMenuItemProps): ToolbarMenuItemProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps);
      _.invoke(props, 'onItemClick', e, itemProps);
    },
    wrapper: null,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ToolbarMenuRadioGroup.handledProps, props);

  const content = (
    <ElementType {...getA11yProps('root', { ...unhandledProps, className: classes.root })}>
      <ToolbarVariablesProvider value={mergedVariables}>
        {_.map(items, (item, index) =>
          ToolbarMenuItem.create(item, {
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
  const element = Box.create(wrapper, {
    defaultProps: () =>
      getA11yProps('wrapper', {
        as: 'li',
        className: toolbarMenuRadioGroupSlotClassNames.wrapper,
        styles: resolvedStyles.wrapper,
      }),
    overrideProps: {
      children: content,
    },
  });
  setEnd();

  return element;
};

ToolbarMenuRadioGroup.displayName = 'ToolbarMenuRadioGroup';
ToolbarMenuRadioGroup.defaultProps = {
  as: 'ul',
  accessibility: toolbarMenuRadioGroupBehavior,
  wrapper: {},
};
ToolbarMenuRadioGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  activeIndex: PropTypes.number,
  items: customPropTypes.collectionShorthand,
  onItemClick: PropTypes.func,
  wrapper: customPropTypes.itemShorthand,
};
ToolbarMenuRadioGroup.handledProps = Object.keys(ToolbarMenuRadioGroup.propTypes) as any;

ToolbarMenuRadioGroup.create = createShorthandFactory({
  Component: ToolbarMenuRadioGroup,
});

/**
 * A ToolbarMenuRadioGroup renders ToolbarMenuItem as a group of mutually exclusive options.
 */
export default withSafeTypeForAs<typeof ToolbarMenuRadioGroup, ToolbarMenuRadioGroupProps, 'ul'>(ToolbarMenuRadioGroup);
