import {
  Accessibility,
  datepickerCalendarCellBehavior,
  DatepickerCalendarCellBehaviorProps,
} from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
// import * as CustomPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface DatepickerCalendarCellProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarCellBehaviorProps>;

  /** A primary content. */
  label?: string;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<DatepickerCalendarCellProps>;

  /**
   * Called on focus.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<DatepickerCalendarCellProps>;

  /** A cell can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A cell can show that it is currently selected or not. */
  selected?: boolean;
}

export type DatepickerCalendarCellStylesProps = Pick<DatepickerCalendarCellProps, 'disabled' | 'selected'> & {
  actionable: boolean;
};

export const datepickerCalendarCellClassName = 'ui-datepicker__calendarcell';
/**
 * A Datepicker cell is used to display calendar grid cells.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarCell: ComponentWithAs<'button', DatepickerCalendarCellProps> &
  FluentComponentStaticProps<DatepickerCalendarCellProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(DatepickerCalendarCell.displayName, context.telemetry);
  setStart();
  const cellRef = React.useRef<HTMLElement>();

  const { className, design, styles, variables, onClick, disabled, selected, label } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendarCell.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendarCell.displayName,
    actionHandlers: {
      performClick: e => {
        // prevent Spacebar from scrolling
        e.preventDefault();
        handleClick(e);
      },
      focus: e => {
        cellRef.current.focus();
      },
    },
    mapPropsToBehavior: () => ({
      disabled,
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerCalendarCellStylesProps>(DatepickerCalendarCell.displayName, {
    className: datepickerCalendarCellClassName,
    mapPropsToStyles: () => ({
      actionable: !!onClick,
      disabled,
      selected,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <Ref innerRef={cellRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            onClick: handleClick,
            onFocus: handleFocus,
            ...unhandledProps,
          })}
        >
          {label}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

DatepickerCalendarCell.displayName = 'DatepickerCalendarCell';

DatepickerCalendarCell.propTypes = {
  ...commonPropTypes.createCommon(),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

DatepickerCalendarCell.defaultProps = {
  accessibility: datepickerCalendarCellBehavior,
  as: 'button',
};

DatepickerCalendarCell.handledProps = Object.keys(DatepickerCalendarCell.propTypes) as any;

DatepickerCalendarCell.create = createShorthandFactory({ Component: DatepickerCalendarCell });
