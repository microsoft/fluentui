/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css } from '../../Utilities';
import { Check } from '../../Check';
import * as DetailsRowCheckStyles from './DetailsRowCheck.scss';
import * as CheckStylesModule from '../Check/Check.scss';

// tslint:disable:no-any
const CheckStyles: any = CheckStylesModule;
// tslint:enable:no-any

export interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
  isHeader?: boolean;
  selected?: boolean;
  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
  anySelected?: boolean;
  canSelect: boolean;
}

export const DetailsRowCheck = (props: IDetailsRowCheckProps) => {
  const {
    canSelect = false,
    isSelected = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    ...buttonProps
  } = props;

  let isPressed = props.isSelected || props.selected;

  return (
    <div
      { ...buttonProps }
      role='checkbox'
      className={
        css(className, 'ms-DetailsRow-check', DetailsRowCheckStyles.check, CheckStyles.checkHost, {
          [`ms-DetailsRow-check--isDisabled ${DetailsRowCheckStyles.isDisabled}`]: !props.canSelect,
          [`ms-DetailsRow-check--isHeader ${DetailsRowCheckStyles.isHeader}`]: props.isHeader
        })
      }
      aria-checked={ isPressed }
      data-selection-toggle={ true }
      data-automationid='DetailsRowCheck'
    >
      <Check
        checked={ isPressed }
      />
    </div>
  );
};
