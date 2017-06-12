/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css } from '../../Utilities';
import { Check } from '../../Check';
import * as styles from './DetailsRowCheck.scss';

export interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
  selected?: boolean;
  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
  anySelected: boolean;
  canSelect: boolean;
}

export const DetailsRowCheck = (props: IDetailsRowCheckProps) => {
  const {
    canSelect,
    isSelected,
    anySelected,
    selected,
    ...buttonProps
  } = props;

  let isPressed = props.isSelected || props.selected;

  return (
    <button
      { ...buttonProps }
      role='checkbox'
      className={ css('ms-DetailsRow-check', styles.check, {
        [styles.isDisabled]: !props.canSelect,
        'ms-DetailsRow-check--isDisabled': !props.canSelect
      }) }
      aria-checked={ isPressed }
      data-selection-toggle={ true }
      data-automationid='DetailsRowCheck'
    >
      <Check checked={ isPressed } />
    </button>
  );
};
