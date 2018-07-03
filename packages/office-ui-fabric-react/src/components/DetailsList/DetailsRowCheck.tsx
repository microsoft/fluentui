import * as React from 'react';
import { IDetailsRowCheckProps } from './DetailsRowCheck.types';
import { css } from '../../Utilities';
import { Check } from '../../Check';
import { getClassNames as getCheckClassNames } from '../Check/Check.classNames';
import { getStyles as getCheckStyles } from '../Check/Check.styles';
import { getClassNames } from './DetailsRowCheck.classNames';

export const DetailsRowCheck = (props: IDetailsRowCheckProps) => {
  const {
    canSelect = false,
    isSelected = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    rowCheckClassNames,
    styles,
    theme,
    compact,
    ...buttonProps
  } = props;

  const isPressed = props.isSelected || props.selected;

  const checkStyles = getCheckStyles({ theme: theme! });

  const checkClassNames = getCheckClassNames(checkStyles, {
    theme: theme!
  });

  return (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(rowCheckClassNames.root, rowCheckClassNames.check, checkClassNames.checkHost)}
      aria-checked={isPressed}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      <Check checked={isPressed} />
    </div>
  );
};
