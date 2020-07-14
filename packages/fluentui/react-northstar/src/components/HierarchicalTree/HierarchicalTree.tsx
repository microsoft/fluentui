import {
  Accessibility,
  hierarchicalTreeBehavior,
  HierarchicalTreeBehaviorBehaviorProps,
} from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { HierarchicalTreeItem, HierarchicalTreeItemProps } from './HierarchicalTreeItem';
import { HierarchicalTreeTitleProps } from './HierarchicalTreeTitle';
import {
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../utils';
import {
  ShorthandValue,
  ShorthandRenderFunction,
  ShorthandCollection,
  ComponentEventHandler,
  FluentComponentStaticProps,
} from '../../types';
import {
  ComponentWithAs,
  useTelemetry,
  useFluentContext,
  useAutoControlled,
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';

export interface HierarchicalTreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active subtree. */
  activeIndex?: number[] | number;

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<HierarchicalTreeBehaviorBehaviorProps>;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number;

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean;

  /** Shorthand array of props for Tree. */
  items?: ShorthandCollection<HierarchicalTreeItemProps>;

  /**
   * A custom render function for the title slot.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<HierarchicalTreeTitleProps>;

  /** Called when activeIndex changes.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onActiveIndexChange?: ComponentEventHandler<HierarchicalTreeProps>;
}

export interface HierarchicalTreeState {
  activeIndex: number[] | number;
}

export const hierarchicalTreeClassName = 'ui-hierarchicaltree';

export type HierarchicalTreeStylesProps = never;

/**
 * (DEPRECATED) A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export const HierarchicalTree: ComponentWithAs<'ul', HierarchicalTreeProps> &
  FluentComponentStaticProps<HierarchicalTreeProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(HierarchicalTree.displayName, context.telemetry);
  setStart();

  const { children, className, design, styles, variables, items, renderItemTitle, exclusive } = props;

  const [activeIndex, setActiveIndex] = useAutoControlled({
    defaultValue: props.defaultActiveIndex,
    value: props.activeIndex,
    initialValue: exclusive ? -1 : [],
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(HierarchicalTree.handledProps, props);

  const getA11yProps = useAccessibility<HierarchicalTreeBehaviorBehaviorProps>(props.accessibility, {
    debugName: HierarchicalTree.displayName,
    actionHandlers: {
      expandSiblings: e => {
        e.preventDefault();
        e.stopPropagation();

        if (exclusive) {
          return;
        }

        const activeIndex = items
          ? items.reduce((acc: HierarchicalTreeItemProps[], item, index) => {
              if (item['items']) {
                return [...acc, index];
              }
              return acc;
            }, [])
          : [];
        trySetActiveIndexAndTriggerEvent(e, activeIndex);
      },
    },
    mapPropsToBehavior: () => ({
      'aria-labelledby': props['aria-labelledby'],
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<HierarchicalTreeStylesProps>(HierarchicalTree.displayName, {
    className: hierarchicalTreeClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const trySetActiveIndexAndTriggerEvent = (e, activeIndex) => {
    setActiveIndex(activeIndex);
    _.invoke(props, 'onActiveIndexChange', e, { ...props, activeIndex });
  };

  const getActiveIndexes = (): number[] => {
    return _.isArray(activeIndex) ? activeIndex : [activeIndex];
  };

  const computeNewIndex = (treeItemProps: HierarchicalTreeItemProps) => {
    const { index, items } = treeItemProps;
    const activeIndexes = getActiveIndexes();
    const { exclusive } = props;
    if (!items) {
      return activeIndexes;
    }

    if (exclusive) return index;

    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndexes, index) ? _.without(activeIndexes, index) : [...activeIndexes, index];
  };

  const handleTreeItemOverrides = (predefinedProps: HierarchicalTreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: HierarchicalTreeItemProps) => {
      trySetActiveIndexAndTriggerEvent(e, computeNewIndex(treeItemProps));
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps);
    },
  });

  const renderContent = () => {
    const activeIndexes = getActiveIndexes();

    return _.map(items, (item: ShorthandValue<HierarchicalTreeItemProps>, index: number) =>
      HierarchicalTreeItem.create(item, {
        defaultProps: () => ({
          index,
          exclusive,
          renderItemTitle,
          open: exclusive ? index === activeIndex : _.includes(activeIndexes, index),
        }),
        overrideProps: handleTreeItemOverrides,
      }),
    );
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : renderContent()}
    </ElementType>
  );

  setEnd();
  return element;
};

HierarchicalTree.displayName = 'HierarchicalTree';

HierarchicalTree.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeIndex: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),
  defaultActiveIndex: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),
  exclusive: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  renderItemTitle: PropTypes.func,
  onActiveIndexChange: PropTypes.func,
};

HierarchicalTree.defaultProps = {
  as: 'ul',
  accessibility: hierarchicalTreeBehavior,
};

HierarchicalTree.handledProps = Object.keys(HierarchicalTree.propTypes) as any;

HierarchicalTree.create = createShorthandFactory({
  Component: HierarchicalTree,
  mappedArrayProp: 'items',
});
