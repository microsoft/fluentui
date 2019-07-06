import * as React from 'react';
import { IDetailsRowCheckProps, IDetailsCheckboxProps } from './DetailsRowCheck.types';
import { css, styled } from '../../Utilities';
import { Check } from '../../Check';
import { ICheckStyleProps, ICheckStyles } from '../Check/Check.types';
import { getStyles as getCheckStyles } from '../Check/Check.styles';
import { getStyles } from './DetailsRowCheck.styles';
import { IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { classNamesFunction } from '../../Utilities';

const getCheckClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>({
  disableCaching: true
});
const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>({
  disableCaching: true
});

const DetailsRowCheckBase = (props: IDetailsRowCheckProps) => {
  const {
    isVisible = false,
    canSelect = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    checkClassName,
    styles,
    theme,
    compact,
    onRenderDetailsCheckbox,
    ...buttonProps
  } = props;

  const checkStyles = getCheckStyles({ theme: theme! });

  const checkClassNames = getCheckClassNames(checkStyles, {
    theme: theme!
  });

  const classNames = getClassNames(styles, {
    theme: theme!,
    canSelect,
    selected,
    anySelected,
    className,
    isHeader,
    isVisible,
    compact
  });

  const defaultCheckboxRender = (checkboxProps: IDetailsCheckboxProps) => {
    return <Check checked={checkboxProps.checked} />;
  };

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: selected
  };

  return canSelect ? (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(classNames.root, classNames.check, checkClassNames.checkHost)}
      aria-checked={selected}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      {onRenderDetailsCheckbox
        ? onRenderDetailsCheckbox(detailsCheckboxProps, defaultCheckboxRender)
        : defaultCheckboxRender(detailsCheckboxProps)}
    </div>
  ) : (
    <div {...buttonProps} className={css(classNames.root, classNames.check)} />
  );
};

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' }
);
