import { Accessibility } from '@fluentui/accessibility';
import {
  AutoFocusZone,
  AutoFocusZoneProps,
  FocusTrapZone,
  FocusTrapZoneProps,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import type { BasePlacement as PopperJsBasePlacement, Placement as PopperJsPlacement } from '@popperjs/core';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import { getBasePlacement, PopperChildrenProps, AutoSize, AUTOSIZES } from '../../utils/positioner';

export interface PopupContentSlotClassNames {
  content: string;
}

export interface PopupContentProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /**
   * Called after user's mouse enter.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMouseEnter?: ComponentEventHandler<PopupContentProps>;

  /**
   * Called after user's mouse leave.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMouseLeave?: ComponentEventHandler<PopupContentProps>;

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement'];

  /** A popup can show a pointer to trigger. */
  pointing?: boolean;

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<HTMLDivElement>;

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: boolean | FocusTrapZoneProps;

  /** Controls whether or not auto focus should be applied, using boolean or AutoFocusZoneProps type value. */
  autoFocus?: boolean | AutoFocusZoneProps;

  /**
   * Applies max-height and max-width on popper to fit it within the available space in viewport.
   * true enables this for both width and height when overflow happens. 'always' applies `max-height`/`max-width` regardless of overflow.
   * 'height' applies `max-height` when overflow happens, and 'width' for `max-width`
   * `height-always` applies `max-height` regardless of overflow, and 'width-always' for always applying `max-width`
   */
  autoSize?: AutoSize;
}

export type PopupContentStylesProps = Required<Pick<PopupContentProps, 'pointing'>> & {
  basePlacement: PopperJsBasePlacement;
  autoSize?: AutoSize;
};

export const popupContentClassName = 'ui-popup__content';
export const popupContentSlotClassNames: PopupContentSlotClassNames = {
  content: `${popupContentClassName}__content`,
};

/**
 * A PopupContent displays the content of a Popup component.
 */
export const PopupContent = React.forwardRef<HTMLDivElement, PopupContentProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(PopupContent.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    autoFocus,
    children,
    className,
    content,
    design,
    placement,
    pointing,
    pointerRef,
    styles,
    trapFocus,
    variables,
    autoSize,
  } = props;

  const getA11yProps = useAccessibility(accessibility, {
    debugName: PopupContent.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<PopupContentStylesProps>(PopupContent.displayName, {
    className: popupContentClassName,
    mapPropsToStyles: () => ({
      basePlacement: getBasePlacement(placement, context.rtl),
      pointing,
      autoSize,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(PopupContent.handledProps, props);

  const handleMouseEnter = e => {
    _.invoke(props, 'onMouseEnter', e, props);
  };

  const handleMouseLeave = e => {
    _.invoke(props, 'onMouseLeave', e, props);
  };

  const popupContentProps: PopupContentProps = getA11yProps('root', {
    className: classes.root,
    ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
    ...unhandledProps,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });
  const popupContent = (
    <>
      {pointing && <div className={classes.pointer} ref={pointerRef} />}
      <div className={cx(popupContentSlotClassNames.content, classes.content)}>
        {childrenExist(children) ? children : content}
      </div>
    </>
  );

  let element: React.ReactElement;

  if (trapFocus) {
    const focusTrapZoneProps = {
      ...popupContentProps,
      ...((_.keys(trapFocus).length && trapFocus) as FocusTrapZoneProps),
      as: ElementType,
    };
    element = (
      <FocusTrapZone innerRef={ref} {...focusTrapZoneProps}>
        {popupContent}
      </FocusTrapZone>
    );
  } else if (autoFocus) {
    const autoFocusZoneProps = {
      ...popupContentProps,
      ...((_.keys(autoFocus).length && autoFocus) as AutoFocusZoneProps),
      as: ElementType,
    };
    element = (
      <AutoFocusZone innerRef={ref} {...autoFocusZoneProps}>
        {popupContent}
      </AutoFocusZone>
    );
  } else {
    element = (
      <ElementType ref={ref} {...popupContentProps}>
        {popupContent}
      </ElementType>
    );
  }

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, PopupContentProps> &
  FluentComponentStaticProps<PopupContentProps>;

PopupContent.displayName = 'PopupContent';

PopupContent.propTypes = {
  ...commonPropTypes.createCommon(),
  placement: PropTypes.oneOf<PopperJsPlacement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  pointing: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  pointerRef: customPropTypes.ref,
  trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  autoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  autoSize: PropTypes.oneOf<AutoSize>(AUTOSIZES),
};
PopupContent.handledProps = Object.keys(PopupContent.propTypes) as any;

PopupContent.create = createShorthandFactory({ Component: PopupContent, mappedProp: 'content' });
