import { Accessibility, accordionBehavior, AccordionBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthand,
  createShorthandFactory,
} from '../../utils';
import { AccordionTitle, AccordionTitleProps } from './AccordionTitle';
import { AccordionContent, AccordionContentProps } from './AccordionContent';

import {
  ComponentEventHandler,
  ShorthandValue,
  ShorthandRenderFunction,
  FluentComponentStaticProps,
} from '../../types';
import { ContainerFocusHandler } from '../../utils/accessibility/FocusHandling/FocusContainer';
import {
  useAutoControlled,
  useAccessibility,
  useTelemetry,
  useFluentContext,
  useUnhandledProps,
  getElementType,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface AccordionSlotClassNames {
  content: string;
  title: string;
}

export interface AccordionProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active panel. */
  activeIndex?: number[] | number;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number;

  /** Only allow one panel to be expanded at a time. */
  exclusive?: boolean;

  /** At least one panel should be expanded at any time. */
  expanded?: boolean;

  /**
   * Called when the active index of the Accordion changes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `activeIndex` reflecting the new state.
   */
  onActiveIndexChange?: ComponentEventHandler<AccordionProps>;

  /**
   * Called when a panel title is clicked.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onTitleClick?: ComponentEventHandler<AccordionProps>;

  /** Shorthand array of props for Accordion. */
  panels?: {
    content: ShorthandValue<AccordionContentProps>;
    title: ShorthandValue<AccordionTitleProps>;
  }[];

  /**
   * A custom renderer for each Accordion's panel title.
   *
   * @param Component - The panel's component type.
   * @param props - The panel's computed props.
   */
  renderPanelTitle?: ShorthandRenderFunction<AccordionTitleProps>;

  /**
   * A custom renderer for each Accordion's panel content.
   *
   * @param Component - The panel's component type.
   * @param props - The panel's computed props.
   */
  renderPanelContent?: ShorthandRenderFunction<AccordionContentProps>;

  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<AccordionBehaviorProps>;

  /** Manage if panels should be rendered always or based on their state. */
  alwaysRenderPanels?: boolean;
}

export type AccordionStylesProps = never;
export const accordionClassName = 'ui-accordion';
export const accordionSlotClassNames: AccordionSlotClassNames = {
  content: `${accordionClassName}__content`,
  title: `${accordionClassName}__title`,
};

/**
 * An Accordion represents stacked set of content sections, with action elements to toggle the display of these sections.
 *
 * @accessibility
 * Implements [ARIA Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) design pattern (keyboard navigation not yet supported).
 */
export const Accordion = React.forwardRef<HTMLDListElement, AccordionProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Accordion.displayName, context.telemetry);
  setStart();
  const {
    expanded,
    exclusive,
    accessibility,
    children,
    className,
    design,
    styles,
    variables,
    panels,
    renderPanelContent,
    renderPanelTitle,
    alwaysRenderPanels,
  } = props;
  const alwaysActiveIndex = expanded ? 0 : -1;

  const [activeIndex, setActiveIndex] = useAutoControlled({
    defaultValue: props.defaultActiveIndex,
    value: props.activeIndex,
    initialValue: exclusive ? alwaysActiveIndex : [alwaysActiveIndex],
  });

  const actionHandlers = {
    moveNext: e => {
      e.preventDefault();
      focusHandler.moveNext();
    },
    movePrevious: e => {
      e.preventDefault();
      focusHandler.movePrevious();
    },
    moveFirst: e => {
      e.preventDefault();
      focusHandler.moveFirst();
    },
    moveLast: e => {
      e.preventDefault();
      focusHandler.moveLast();
    },
  };

  const getA11yProps = useAccessibility<AccordionBehaviorProps>(accessibility, {
    debugName: Accordion.displayName,
    actionHandlers,
    rtl: context.rtl,
  });

  const { classes } = useStyles<AccordionStylesProps>(Accordion.displayName, {
    className: accordionClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const [focusedIndex, setfocusedIndex] = React.useState<number>();

  const handleNavigationFocus = (index: number) => {
    setfocusedIndex(index);
  };

  const getNavigationItemsSize = () => props.panels.length;
  const unhandledProps = useUnhandledProps(Accordion.handledProps, props);
  const ElementType = getElementType(props);

  const focusHandler: ContainerFocusHandler = new ContainerFocusHandler(
    getNavigationItemsSize,
    handleNavigationFocus,
    true,
  );

  const itemRefs = React.useMemo<React.RefObject<HTMLElement>[]>(
    () => Array.from({ length: panels?.length }, () => React.createRef()),
    // As we are using "panels.length" it's fine to have dependency on them
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [panels?.length],
  );

  React.useEffect(() => {
    const targetComponent = itemRefs[focusedIndex] && itemRefs[focusedIndex].current;
    targetComponent && targetComponent.focus();
  }, [itemRefs, focusedIndex]);

  const defaultAccordionTitleId = React.useMemo(() => _.uniqueId('accordion-title-'), []);
  const defaultAccordionContentId = React.useMemo(() => _.uniqueId('accordion-content-'), []);

  const computeNewIndex = (index: number): number | number[] => {
    if (!isIndexActionable(index)) {
      return activeIndex;
    }

    if (exclusive) return index === activeIndex ? -1 : index;
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex as number[], index)
      ? _.without(activeIndex as number[], index)
      : [...(activeIndex as number[]), index];
  };

  const handleTitleOverrides = (predefinedProps: AccordionTitleProps) => ({
    onClick: (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
      const { index } = titleProps;
      const activeIndex = computeNewIndex(index);
      setActiveIndex(activeIndex);
      setfocusedIndex(index);

      _.invoke(props, 'onActiveIndexChange', e, { ...props, activeIndex });
      _.invoke(predefinedProps, 'onClick', e, titleProps);
      _.invoke(props, 'onTitleClick', e, titleProps);
    },
    onFocus: (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
      _.invoke(predefinedProps, 'onFocus', e, titleProps);
      setfocusedIndex(predefinedProps.index);
    },
  });

  const isIndexActive = (index: number): boolean => {
    return exclusive ? activeIndex === index : _.includes(activeIndex as number[], index);
  };

  /**
   * Checks if panel at index can be actioned upon. Used in the case of expanded accordion,
   * when at least a panel needs to stay active. Will return false if expanded prop is true,
   * index is active and either it's an exclusive accordion or if there are no other active
   * panels open besides this one.
   *
   * @param index - The index of the panel.
   * @returns If the panel can be set active/inactive.
   */
  const isIndexActionable = (index: number): boolean => {
    if (!isIndexActive(index)) {
      return true;
    }

    return !expanded || (!exclusive && (activeIndex as number[]).length > 1);
  };

  const renderPanels = () => {
    const children: any[] = [];
    focusHandler.syncFocusedIndex(focusedIndex);
    _.each(panels, (panel, index) => {
      const { content, title } = panel;
      const active = isIndexActive(+index);
      const canBeCollapsed = isIndexActionable(+index);
      const titleId = title['id'] || `${defaultAccordionTitleId}${index}`;
      const contentId = content['id'] || `${defaultAccordionContentId}${index}`;
      const contentRef = itemRefs[index];

      children.push(
        createShorthand(AccordionTitle, title, {
          defaultProps: () => ({
            className: accordionSlotClassNames.title,
            active,
            index: +index,
            contentRef,
            canBeCollapsed,
            id: titleId,
            accordionContentId: contentId,
          }),
          overrideProps: handleTitleOverrides,
          render: renderPanelTitle,
        }),
      );
      if (alwaysRenderPanels || active) {
        children.push(
          createShorthand(AccordionContent, content, {
            defaultProps: () => ({
              className: accordionSlotClassNames.content,
              active,
              id: contentId,
              accordionTitleId: titleId,
            }),
            render: renderPanelContent,
          }),
        );
      }
    });
    return children;
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
        ref,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children] })}
    >
      {childrenExist(children) ? children : renderPanels()}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'dl', HTMLDListElement, AccordionProps> &
  FluentComponentStaticProps<AccordionProps> & {
    Title: typeof AccordionTitle;
    Content: typeof AccordionContent;
  };

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
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
  expanded: PropTypes.bool,
  onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  onActiveIndexChange: PropTypes.func,
  panels: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.arrayOf(
      PropTypes.shape({
        content: customPropTypes.itemShorthand,
        title: customPropTypes.itemShorthand,
      }),
    ),
  ]),

  renderPanelTitle: PropTypes.func,
  renderPanelContent: PropTypes.func,
};

Accordion.defaultProps = {
  accessibility: accordionBehavior,
  as: 'dl',
};

Accordion.handledProps = Object.keys(Accordion.propTypes) as any;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
Accordion.create = createShorthandFactory({
  Component: Accordion,
});
