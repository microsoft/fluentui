import { Accessibility, accordionBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  AutoControlledComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  createShorthand,
} from '../../utils';
import AccordionTitle, { AccordionTitleProps } from './AccordionTitle';
import AccordionContent, { AccordionContentProps } from './AccordionContent';

import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandValue,
  ShorthandRenderFunction,
  withSafeTypeForAs,
} from '../../types';
import { ContainerFocusHandler } from '../../utils/accessibility/FocusHandling/FocusContainer';

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
  accessibility?: Accessibility;
}

export interface AccordionState {
  activeIndex: number[] | number;
  focusedIndex: number;
}

export const accordionClassName = 'ui-accordion';
export const accordionSlotClassNames: AccordionSlotClassNames = {
  content: `${accordionClassName}__content`,
  title: `${accordionClassName}__title`,
};

class Accordion extends AutoControlledComponent<WithAsProp<AccordionProps>, AccordionState> {
  static displayName = 'Accordion';

  static deprecated_className = accordionClassName;

  static propTypes = {
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

  static defaultProps = {
    accessibility: accordionBehavior,
    as: 'dl',
  };

  static autoControlledProps = ['activeIndex'];

  static Title = AccordionTitle;
  static Content = AccordionContent;

  focusHandler: ContainerFocusHandler = null;
  itemRefs = [];
  defaultAccordionTitleId = _.uniqueId('accordion-title-');
  defaultAccordionContentId = _.uniqueId('accordion-content-');

  actionHandlers = {
    moveNext: e => {
      e.preventDefault();
      this.focusHandler.moveNext();
    },
    movePrevious: e => {
      e.preventDefault();
      this.focusHandler.movePrevious();
    },
    moveFirst: e => {
      e.preventDefault();
      this.focusHandler.moveFirst();
    },
    moveLast: e => {
      e.preventDefault();
      this.focusHandler.moveLast();
    },
  };

  constructor(props, context) {
    super(props, context);

    this.focusHandler = new ContainerFocusHandler(this.getNavigationItemsSize, this.handleNavigationFocus, true);
  }

  handleNavigationFocus = (index: number) => {
    this.setState({ focusedIndex: index }, () => {
      const targetComponent = this.itemRefs[index] && this.itemRefs[index].current;
      targetComponent && targetComponent.focus();
    });
  };

  getNavigationItemsSize = () => this.props.panels.length;

  getInitialAutoControlledState({ expanded, exclusive }: AccordionProps) {
    const alwaysActiveIndex = expanded ? 0 : -1;
    return { activeIndex: exclusive ? alwaysActiveIndex : [alwaysActiveIndex] };
  }

  computeNewIndex = (index: number): number | number[] => {
    const { activeIndex } = this.state;
    const { exclusive } = this.props;

    if (!this.isIndexActionable(index)) {
      return activeIndex;
    }

    if (exclusive) return index === activeIndex ? -1 : index;
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex as number[], index)
      ? _.without(activeIndex as number[], index)
      : [...(activeIndex as number[]), index];
  };

  handleTitleOverrides = (predefinedProps: AccordionTitleProps) => ({
    onClick: (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
      const { index } = titleProps;
      const activeIndex = this.computeNewIndex(index);

      this.setState({ activeIndex, focusedIndex: index });

      _.invoke(this.props, 'onActiveIndexChange', e, { ...this.props, activeIndex });
      _.invoke(predefinedProps, 'onClick', e, titleProps);
      _.invoke(this.props, 'onTitleClick', e, titleProps);
    },
    onFocus: (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
      _.invoke(predefinedProps, 'onFocus', e, titleProps);
      this.setState({ focusedIndex: predefinedProps.index });
    },
  });

  isIndexActive = (index: number): boolean => {
    const { exclusive } = this.props;
    const { activeIndex } = this.state;

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
  isIndexActionable = (index: number): boolean => {
    if (!this.isIndexActive(index)) {
      return true;
    }

    const { activeIndex } = this.state;
    const { expanded, exclusive } = this.props;

    return !expanded || (!exclusive && (activeIndex as number[]).length > 1);
  };

  renderPanels = () => {
    const children: any[] = [];
    const { panels, renderPanelContent, renderPanelTitle } = this.props;
    const { focusedIndex } = this.state;

    this.itemRefs = [];
    this.focusHandler.syncFocusedIndex(focusedIndex);

    _.each(panels, (panel, index) => {
      const { content, title } = panel;
      const active = this.isIndexActive(index);
      const canBeCollapsed = this.isIndexActionable(index);
      const contentRef = React.createRef<HTMLElement>();
      const titleId = title['id'] || `${this.defaultAccordionTitleId}${index}`;
      const contentId = content['id'] || `${this.defaultAccordionContentId}${index}`;
      this.itemRefs[index] = contentRef;

      children.push(
        createShorthand(AccordionTitle, title, {
          defaultProps: () => ({
            className: accordionSlotClassNames.title,
            active,
            index,
            contentRef,
            canBeCollapsed,
            id: titleId,
            accordionContentId: contentId,
          }),
          overrideProps: this.handleTitleOverrides,
          render: renderPanelTitle,
        }),
      );
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
    });

    return children;
  };

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children } = this.props;

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderPanels()}
      </ElementType>
    );
  }
}

/**
 * An Accordion represents stacked set of content sections, with action elements to toggle the display of these sections.
 *
 * @accessibility
 * Implements [ARIA Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) design pattern (keyboard navigation not yet supported).
 */
export default withSafeTypeForAs<typeof Accordion, AccordionProps>(Accordion);
