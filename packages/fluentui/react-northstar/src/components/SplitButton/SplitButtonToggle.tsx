import { Accessibility, buttonBehavior, ButtonBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ContentComponentProps,
  SizeValue,
} from '../../utils';

import { ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useFluentContext,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';

export interface SplitButtonToggleProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ButtonBehaviorProps>;

  /** A split button toggle can show that it cannot be interacted with. */
  disabled?: boolean;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<SplitButtonToggleProps>;

  /** A split button toggle can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A split button toggle can emphasize that it represents an alternative action. */
  secondary?: boolean;

  /** A split button toggle can be sized */
  size?: SizeValue;

  /** A split button toggle can be elevated or flat. */
  flat?: boolean;
}

export type SplitButtonToggleStylesProps = Pick<SplitButtonToggleProps, 'primary' | 'disabled' | 'size' | 'flat'>;
export const splitButtonToggleClassName = 'ui-splitbutton__toggle';

/**
 * A SplitToggleButton allows users to customize the toggle button inside the SplitButton.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */

export const SplitButtonToggle = React.forwardRef<HTMLButtonElement, SplitButtonToggleProps & { as: React.ReactNode }>(
  (props, ref) => {
    const context = useFluentContext();

    const {
      accessibility = buttonBehavior,
      children,
      content,
      disabled,
      primary,
      className,
      size,
      flat,
      styles,
      variables,
      design,
    } = props;

    const hasChildren = childrenExist(children);

    const ElementType = getElementType(props, 'button');
    const a11yBehavior = useAccessibilityBehavior(accessibility, {
      behaviorProps: {
        as: String(ElementType),
        disabled,
      },
      actionHandlers: {
        performClick: event => {
          event.preventDefault();
          handleClick(event);
        },
      },
      rtl: context.rtl,
    });
    const { classes } = useStyles<SplitButtonToggleStylesProps>(SplitButtonToggle.displayName, {
      className: splitButtonToggleClassName,
      mapPropsToStyles: () => ({
        primary,
        disabled,
        size,
        flat,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const unhandledProps = useUnhandledProps(SplitButtonToggle.handledProps, props);

    const handleClick = (e: React.SyntheticEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const result = (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...useAccessibilitySlotProps(a11yBehavior, 'root', {
          onClick: handleClick,
          disabled,
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {hasChildren ? children : content}
      </ElementType>
    );

    return result;
  },
) as unknown as ForwardRefWithAs<'button', HTMLButtonElement, SplitButtonToggleProps> &
  FluentComponentStaticProps<SplitButtonToggleProps>;

SplitButtonToggle.displayName = 'SplitButtonToggle';

SplitButtonToggle.propTypes = {
  ...commonPropTypes.createCommon({}),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  size: customPropTypes.size,
  flat: PropTypes.bool,
};

SplitButtonToggle.handledProps = Object.keys(SplitButtonToggle.propTypes) as any;

SplitButtonToggle.create = createShorthandFactory({ Component: SplitButtonToggle, mappedProp: 'content' });
