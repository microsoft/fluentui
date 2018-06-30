import * as React from 'react';
import { styled } from '../../Utilities';
import { IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { getStyles } from './DetailsRowCheck.styles';
import { css } from '../../Utilities';
import { Check } from '../../Check';
import { getClassNames as getCheckClassNames } from '../Check/Check.classNames';
import { getStyles as getCheckStyles } from '../Check/Check.styles';
import { getClassNames } from './DetailsRowCheck.classNames';

const DetailsRowCheckBase = (props: IDetailsRowCheckProps) => {
  const {
    canSelect = false,
    isSelected = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    styles,
    theme,
    ...buttonProps
  } = props;

  const isPressed = props.isSelected || props.selected;

  const classNames = getClassNames(styles, {
    className,
    isHeader,
    isSelected,
    anySelected,
    canSelect,
    theme: theme!
  });

  const checkStyles = getCheckStyles({ theme: theme! });

  const checkClassNames = getCheckClassNames(checkStyles, {
    theme: theme!
  });

  return (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(classNames.root, classNames.check, checkClassNames.checkHost)}
      aria-checked={isPressed}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      <Check checked={isPressed} />
    </div>
  );
};

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles
);
