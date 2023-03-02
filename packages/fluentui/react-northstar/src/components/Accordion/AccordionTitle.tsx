import { accordionTitleBehavior, Accessibility, AccordionTitleBehaviorProps } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import {
  getElementType,
  useTelemetry,
  useFluentContext,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface AccordionTitleSlotClassNames {
  contentWrapper: string;
}

export interface AccordionTitleProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>>,
    ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<AccordionTitleBehaviorProps>;

  /** Id of the content it owns. */
  accordionContentId?: string;

  /** Whether or not the title is in the open state. */
  active?: boolean;

  /** If at least one panel needs to stay active and this title does not correspond to the last active one. */
  canBeCollapsed?: boolean;

  /** Shorthand for the content wrapper element. */
  contentWrapper?: ShorthandValue<BoxProps>;

  /** An accordion title can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** AccordionTitle index inside Accordion. */
  index?: number;

  /** Ref to the clickable element that contains the title. */
  contentRef?: React.Ref<HTMLElement>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<AccordionTitleProps>;

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<AccordionTitleProps>;

  /** Shorthand for the active indicator. */
  indicator?: ShorthandValue<BoxProps>;
}

export const accordionTitleClassName = 'ui-accordion__title';
export const accordionTitleSlotClassNames: AccordionTitleSlotClassNames = {
  contentWrapper: `${accordionTitleClassName}__content-wrapper`,
};

export type AccordionTitleStylesProps = Required<Pick<AccordionTitleProps, 'disabled' | 'active'>> & {
  content: boolean;
};

/**
 * An AccordionTitle represents the title of Accordion's item that can be interacted with to expand or collapse the item's content.
 */
export const AccordionTitle = React.forwardRef<HTMLDListElement, AccordionTitleProps & { as: React.ReactNode }>(
  (props, ref) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(AccordionTitle.displayName, context.telemetry);
    setStart();
    const {
      contentRef,
      children,
      content,
      indicator,
      contentWrapper,
      disabled,
      accessibility,
      canBeCollapsed,
      as,
      active,
      accordionContentId,
      className,
      design,
      styles,
      variables,
    } = props;
    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(AccordionTitle.handledProps, props);

    const getA11yProps = useAccessibility<AccordionTitleBehaviorProps>(accessibility, {
      debugName: AccordionTitle.displayName,
      actionHandlers: {
        performClick: e => {
          e.preventDefault();
          e.stopPropagation();
          handleClick(e);
        },
      },
      mapPropsToBehavior: () => ({
        hasContent: !!content,
        canBeCollapsed,
        as: String(as),
        active,
        disabled,
        accordionContentId,
      }),
      rtl: context.rtl,
    });

    const { classes, styles: resolvedStyles } = useStyles<AccordionTitleStylesProps>(AccordionTitle.displayName, {
      className: accordionTitleClassName,
      mapPropsToStyles: () => ({
        disabled,
        content: !!content,
        active,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const handleClick = (e: React.SyntheticEvent) => {
      if (!disabled) {
        _.invoke(props, 'onClick', e, props);
      }
    };

    const handleFocus = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      _.invoke(props, 'onFocus', e, props);
    };

    const handleWrapperOverrides = predefinedProps => ({
      onFocus: (e: React.FocusEvent) => {
        handleFocus(e);
        _.invoke(predefinedProps, 'onFocus', e, props);
      },
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        _.invoke(predefinedProps, 'onClick', e, props);
      },
    });

    const contentWrapperElement = (
      <Ref innerRef={contentRef}>
        {Box.create(contentWrapper, {
          defaultProps: () =>
            getA11yProps('content', {
              className: accordionTitleSlotClassNames.contentWrapper,
              styles: resolvedStyles.contentWrapper,
            }),
          overrideProps: predefinedProps => ({
            children: (
              <>
                {Box.create(indicator, {
                  defaultProps: () =>
                    getA11yProps('indicator', {
                      styles: resolvedStyles.indicator,
                    }),
                })}
                {Box.create(content, {
                  defaultProps: () => ({
                    styles: resolvedStyles.content,
                  }),
                })}
              </>
            ),
            ...handleWrapperOverrides(predefinedProps),
          }),
        })}
      </Ref>
    );

    const element = (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : contentWrapperElement}
      </ElementType>
    );
    setEnd();
    return element;
  },
) as unknown as ForwardRefWithAs<'div', HTMLDListElement, AccordionTitleProps> &
  FluentComponentStaticProps<AccordionTitleProps>;

AccordionTitle.displayName = 'AccordionTitle';

AccordionTitle.shorthandConfig = {
  mappedProp: 'content',
};

AccordionTitle.propTypes = {
  ...commonPropTypes.createCommon({ content: 'shorthand' }),
  accordionContentId: PropTypes.string,
  active: PropTypes.bool,
  contentRef: customPropTypes.ref,
  contentWrapper: customPropTypes.wrapperShorthand,
  canBeCollapsed: PropTypes.bool,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  indicator: customPropTypes.shorthandAllowingChildren,
};

AccordionTitle.handledProps = Object.keys(AccordionTitle.propTypes) as any;

AccordionTitle.defaultProps = {
  accessibility: accordionTitleBehavior,
  as: 'div',
  contentRef: _.noop,
  indicator: {},
  contentWrapper: {},
};

AccordionTitle.create = createShorthandFactory({ Component: AccordionTitle, mappedProp: 'content' });
