import * as React from 'react';
import { css, styled, classNamesFunction, composeRenderFunction, getNativeElementProps } from '../../Utilities';
import { Check } from '../../Check';
import { getDetailsRowCheckStyles } from './DetailsRowCheck.styles';
import { SelectionMode } from '../../Selection';
import type {
  IDetailsRowCheckProps,
  IDetailsCheckboxProps,
  IDetailsRowCheckStyleProps,
  IDetailsRowCheckStyles,
} from './DetailsRowCheck.types';
import type { ITheme } from '../../Styling';

const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>();

const DetailsRowCheckBase: React.FunctionComponent<IDetailsRowCheckProps> = props => {
  const {
    isVisible = false,
    canSelect = false,
    anySelected = false,
    selected = false,
    selectionMode,
    isHeader = false,
    className,
    checkClassName,
    styles,
    theme,
    compact,
    onRenderDetailsCheckbox,
    useFastIcons = true, // must be removed from buttonProps
    ...buttonProps
  } = props;
  const defaultCheckboxRender = useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;

  const onRenderCheckbox = onRenderDetailsCheckbox
    ? composeRenderFunction(onRenderDetailsCheckbox, defaultCheckboxRender)
    : defaultCheckboxRender;

  const classNames = getClassNames(styles, {
    theme: theme!,
    canSelect,
    selected,
    anySelected,
    className,
    isHeader,
    isVisible,
    compact,
  });

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: selected,
    theme,
  };

  const divProps = getNativeElementProps('div', buttonProps, ['aria-label', 'aria-labelledby', 'aria-describedby']);

  const checkRole = selectionMode === SelectionMode.single ? 'radio' : 'checkbox';

  return canSelect ? (
    <div
      {...buttonProps}
      role={checkRole}
      // eslint-disable-next-line deprecation/deprecation
      className={css(classNames.root, classNames.check)}
      aria-checked={selected}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
      tabIndex={-1}
    >
      {onRenderCheckbox(detailsCheckboxProps)}
    </div>
  ) : (
    // eslint-disable-next-line deprecation/deprecation
    <div {...divProps} className={css(classNames.root, classNames.check)} />
  );
};

const FastCheck = React.memo((props: { theme?: ITheme; checked?: boolean; className?: string }) => {
  return <Check theme={props.theme} checked={props.checked} className={props.className} useFastIcons />;
});

function _defaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <Check checked={checkboxProps.checked} />;
}

function _fastDefaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <FastCheck theme={checkboxProps.theme} checked={checkboxProps.checked} />;
}

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getDetailsRowCheckStyles,
  undefined,
  { scope: 'DetailsRowCheck' },
  true,
);
