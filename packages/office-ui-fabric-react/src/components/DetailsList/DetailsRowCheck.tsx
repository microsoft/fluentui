import * as React from 'react';
import { IDetailsRowCheckProps, IDetailsCheckboxProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { css, styled, classNamesFunction } from '../../Utilities';
import { Check, getCheck } from '../../Check';
import { getStyles } from './DetailsRowCheck.styles';

const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>();

const DetailsRowCheckBase = (props: IDetailsRowCheckProps) => {
  const defaultCheckboxRender = props.useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;
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
    onRenderDetailsCheckbox = defaultCheckboxRender,
    ...buttonProps
  } = props;

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

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: selected,
    theme
  };

  return canSelect ? (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(classNames.root, classNames.check)}
      aria-checked={selected}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      {onRenderDetailsCheckbox(detailsCheckboxProps, defaultCheckboxRender)}
    </div>
  ) : (
    <div {...buttonProps} className={css(classNames.root, classNames.check)} />
  );
};

function _defaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <Check checked={checkboxProps.checked} />;
}

function _fastDefaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return getCheck(checkboxProps.theme, checkboxProps.checked);
}

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' }
);
