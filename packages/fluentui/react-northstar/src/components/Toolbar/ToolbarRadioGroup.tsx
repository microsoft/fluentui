import {
  Accessibility,
  toolbarRadioGroupBehavior,
  toolbarRadioGroupItemBehavior,
  ToolbarRadioGroupBehaviorProps,
} from '@fluentui/accessibility';
import {
  compose,
  getElementType,
  mergeVariablesOverrides,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthand,
  UIComponentProps,
  childrenExist,
  commonPropTypes,
} from '../../utils';
import { ShorthandCollection } from '../../types';
import { ToolbarDivider, ToolbarDividerProps } from './ToolbarDivider';
import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';

export type ToolbarRadioGroupItemShorthandKinds = {
  divider: ToolbarDividerProps;
  item: ToolbarItemProps;
};

export interface ToolbarRadioGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<ToolbarRadioGroupBehaviorProps>;

  /** Index of the currently active item. */
  activeIndex?: number;

  /** Shorthand array of props for ToolbarRadioGroup. */
  items?: ShorthandCollection<ToolbarItemProps, ToolbarRadioGroupItemShorthandKinds>;
}

export type ToolbarRadioGroupStylesProps = never;
export const toolbarRadioGroupClassName = 'ui-toolbars'; // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

/**
 * A ToolbarRadioGroup renders Toolbar item as a group of mutually exclusive options.
 * Component doesn't implement mutual exclusiveness, it just serves accessibility purposes.
 *
 * @accessibility
 * Implements [ARIA RadioGroup](https://www.w3.org/TR/wai-aria-practices/#radiobutton) design pattern.
 */
export const ToolbarRadioGroup = compose<'div', ToolbarRadioGroupProps, ToolbarRadioGroupStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, activeIndex, children, className, design, items, variables, styles } = props;
    const itemRefs: React.RefObject<HTMLElement>[] = [];

    const slotProps = composeOptions.resolveSlotProps(props);
    const parentVariables = React.useContext(ToolbarVariablesContext);
    const mergedVariables = mergeVariablesOverrides(parentVariables, variables);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        nextItem: event => setFocusedItem(event, 1),
        prevItem: event => setFocusedItem(event, -1),
      },
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarRadioGroupStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToInlineStyles: () => ({ className, design, styles, variables: mergedVariables }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const setFocusedItem = (event: React.KeyboardEvent, direction) => {
      // filter items which are not disabled
      const filteredRadioItems: React.RefObject<HTMLElement>[] = _.filter(itemRefs, (item, index) => {
        const currentItem = items[index] as ToolbarItemProps;
        return currentItem && !currentItem.disabled;
      });

      // get the index of currently focused element (w/ tabindex = 0) or the first one as default
      const currentFocusedIndex =
        _.findIndex(filteredRadioItems, (item: React.RefObject<HTMLElement>) => {
          return item.current.tabIndex === 0;
        }) || 0;

      const itemsLength = filteredRadioItems.length;
      let nextIndex = currentFocusedIndex + direction;

      if (nextIndex >= itemsLength) {
        nextIndex = 0;
      }

      if (nextIndex < 0) {
        nextIndex = itemsLength - 1;
      }

      const nextItemToFocus = filteredRadioItems[nextIndex].current;
      if (nextItemToFocus) {
        nextItemToFocus.focus();
      }

      if (context.target.activeElement === nextItemToFocus) {
        event.stopPropagation();
      }
      event.preventDefault();
    };

    const renderItems = () => {
      return _.map(items, (item, index) => {
        const kind = _.get(item, 'kind', 'item');

        const ref = React.createRef<HTMLElement>();
        itemRefs[index] = ref;

        if (kind === 'divider') {
          return createShorthand(composeOptions.slots.divider, item, {
            defaultProps: () => slotProps.divider,
          });
        }

        const toolbarItem = createShorthand(composeOptions.slots.item, item, {
          defaultProps: () => ({
            ...slotProps.item,
            active: activeIndex === index,
          }),
        });

        return (
          <Ref innerRef={ref} key={toolbarItem.key}>
            {toolbarItem}
          </Ref>
        );
      });
    };

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const element = (
      <ElementType
        {...getA11yProps('root', {
          ...unhandledProps,
          className: classes.root,
          ref,
        })}
      >
        <ToolbarVariablesProvider value={mergedVariables}>
          {childrenExist(children) ? children : renderItems()}
        </ToolbarVariablesProvider>
      </ElementType>
    );
    setEnd();

    return element;
  },
  {
    className: toolbarRadioGroupClassName,
    displayName: 'ToolbarRadioGroup',

    slots: {
      item: ToolbarItem,
      divider: ToolbarDivider,
    },
    slotProps: () => ({
      item: {
        accessibility: toolbarRadioGroupItemBehavior,
      },
    }),

    shorthandConfig: { mappedProp: 'content' },
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
    ],
  },
);

ToolbarRadioGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  activeIndex: PropTypes.number,
  items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
};
ToolbarRadioGroup.defaultProps = {
  accessibility: toolbarRadioGroupBehavior,
};
