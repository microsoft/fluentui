import * as React from 'react';
import { styled } from '../../Utilities';
import { IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { getStyles } from './DetailsRowCheck.styles';
import { classNamesFunction } from '../../Utilities';
import { css } from '../../Utilities';
import { Check } from '../../Check';
import { getClassNames as getCheckClassNames } from '../Check/Check.classNames';

const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>();

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

  const checkClassNames = getCheckClassNames(styles);

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
