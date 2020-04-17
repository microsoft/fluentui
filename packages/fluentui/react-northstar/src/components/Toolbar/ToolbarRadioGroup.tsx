import {
  Accessibility,
  toolbarRadioGroupBehavior,
  toolbarRadioGroupItemBehavior,
  ToolbarRadioGroupBehaviorProps,
} from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import { mergeComponentVariables } from '@fluentui/styles';
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
  childrenExist,
  commonPropTypes,
} from '../../utils';
import {
  FluentComponentStaticProps,
  ProviderContextPrepared,
  ShorthandCollection,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types';
import ToolbarDivider from './ToolbarDivider';
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem';
import { ToolbarVariablesContext, ToolbarVariablesProvider } from './toolbarVariablesContext';

export type ToolbarRadioGroupItemShorthandKinds = 'divider' | 'item';

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

const ToolbarRadioGroup: React.FC<WithAsProp<ToolbarRadioGroupProps>> &
  FluentComponentStaticProps<ToolbarRadioGroupProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarRadioGroup.displayName, context.telemetry);
  setStart();

  const { accessibility, activeIndex, children, className, design, items, variables, styles } = props;
  const itemRefs: React.RefObject<HTMLElement>[] = [];

  const parentVariables = React.useContext(ToolbarVariablesContext);
  const mergedVariables = mergeComponentVariables(parentVariables, variables);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarRadioGroup.displayName,
    actionHandlers: {
      nextItem: event => setFocusedItem(event, 1),
      prevItem: event => setFocusedItem(event, -1),
    },
    rtl: context.rtl,
  });
  const { classes } = useStyles<ToolbarRadioGroupStylesProps>(ToolbarRadioGroup.displayName, {
    className: toolbarRadioGroupClassName,
    mapPropsToInlineStyles: () => ({ className, design, styles, variables: mergedVariables }),
    rtl: context.rtl,
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
        return ToolbarDivider.create(item);
      }

      const toolbarItem = ToolbarItem.create(item, {
        defaultProps: () => ({
          accessibility: toolbarRadioGroupItemBehavior,
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
  const unhandledProps = useUnhandledProps(ToolbarRadioGroup.handledProps, props);

  const element = (
    <ElementType
      {...getA11yProps('root', {
        ...unhandledProps,
        className: classes.root,
      })}
    >
      <ToolbarVariablesProvider value={mergedVariables}>
        {childrenExist(children) ? children : renderItems()}
      </ToolbarVariablesProvider>
    </ElementType>
  );
  setEnd();

  return element;
};

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';

ToolbarRadioGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  activeIndex: PropTypes.number,
  items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
};
ToolbarRadioGroup.handledProps = Object.keys(ToolbarRadioGroup.propTypes) as any;

ToolbarRadioGroup.defaultProps = {
  accessibility: toolbarRadioGroupBehavior,
};

ToolbarRadioGroup.create = createShorthandFactory({
  Component: ToolbarRadioGroup,
  mappedProp: 'content',
});

/**
 * A ToolbarRadioGroup renders Toolbar item as a group of mutually exclusive options.
 * Component doesn't implement mutual exclusiveness, it just serves accessibility purposes.
 *
 * @accessibility
 * Implements [ARIA RadioGroup](https://www.w3.org/TR/wai-aria-practices/#radiobutton) design pattern.
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(ToolbarRadioGroup);
