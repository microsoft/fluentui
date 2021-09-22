import {
  normalize,
  getGlobalClassNames,
  FontSizes,
  HighContrastSelector,
  AnimationClassNames,
  getInputFocusStyle,
} from '@fluentui/style-utilities';
import type { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import type { IStyle } from '@fluentui/style-utilities';

const GlobalClassNames = {
  root: 'ms-DatePicker',
  callout: 'ms-DatePicker-callout',
  withLabel: 'ms-DatePicker-event--with-label',
  withoutLabel: 'ms-DatePicker-event--without-label',
  disabled: 'msDatePickerDisabled ',

  readOnlyIcon: 'ms-DatePicker-readOnlyIcon',
  readOnlyTextfield: 'ms-DatePicker-readOnlyTextfield',
  readOnlyTextfieldDescription: 'ms-DatePicker-readOnlyTextfieldDescription',
  readOnlyTextfieldErrorMessage: 'ms-DatePicker-readOnlyTextfieldErrorMessage',
  readOnlyTextfieldGroup: 'ms-DatePicker-readOnlytextfieldGroup',
  readOnlyTextfieldWrapper: 'ms-DatePicker-readOnlyTextfieldWrapper',
};

const TEXTFIELD_HEIGHT = 32;

export const styles = (props: IDatePickerStyleProps): IDatePickerStyles => {
  const {
    className,
    theme,
    disabled,
    label,
    isDatePickerShown,
    hasErrorMessage,
    underlined,
    required,
    borderless,
    onlyPlaceHolder,
  } = props;
  const { palette, semanticColors, effects, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const DatePickerIcon: IStyle = {
    color: palette.neutralSecondary,
    fontSize: FontSizes.icon,
    lineHeight: '18px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '4px',
    padding: '5px',
  };

  return {
    root: [classNames.root, theme.fonts.large, isDatePickerShown && 'is-open', normalize, className],
    textField: [
      {
        position: 'relative',
        selectors: {
          '& input[readonly]': {
            cursor: 'pointer',
          },
          input: {
            selectors: {
              '::-ms-clear': {
                display: 'none',
              },
            },
          },
        },
      },
      disabled && {
        selectors: {
          '& input[readonly]': {
            cursor: 'default',
          },
        },
      },
    ],
    callout: [classNames.callout],
    icon: [
      DatePickerIcon,
      label ? classNames.withLabel : classNames.withoutLabel,
      { paddingTop: '7px' },
      !disabled && [
        classNames.disabled,
        {
          pointerEvents: 'initial',
          cursor: 'pointer',
        },
      ],
      disabled && {
        color: semanticColors.disabledText,
        cursor: 'default',
      },
    ],
    statusMessage: [
      fonts.small,
      {
        color: semanticColors.errorText,
        marginTop: 5,
      },
    ],
    readOnlyIcon: [
      GlobalClassNames.readOnlyIcon,
      { position: 'absolute', height: TEXTFIELD_HEIGHT, lineHeight: TEXTFIELD_HEIGHT - 2, top: '1px', right: '1px' },
    ],
    readOnlyTextfield: [
      fonts.medium,
      classNames.readOnlyTextfield,
      normalize,
      {
        border: `1px solid ${!hasErrorMessage ? semanticColors.inputBorder : semanticColors.errorText}`,
        borderRadius: effects.roundedCorner2,
        background: 'none',
        backgroundColor: 'transparent',
        color: semanticColors.inputText,
        padding: `0 28px 0 8px`,
        position: 'relative',
        width: '100%',
        minWidth: 0,
        outline: 0,
        cursor: 'pointer',
        display: 'block',
        height: TEXTFIELD_HEIGHT,
        lineHeight: TEXTFIELD_HEIGHT - 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'WindowText',
          },
        },
      },
      onlyPlaceHolder && {
        color: semanticColors.inputPlaceholderText,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
          },
        },
      },
      borderless && {
        border: 'none',
      },
      underlined && {
        border: 'none',
        borderBottom: `1px solid ${!hasErrorMessage ? semanticColors.inputBorder : semanticColors.errorText}`,
        borderRadius: 0,
      },
    ],
    readOnlyTextfieldDescription: [
      GlobalClassNames.readOnlyTextfieldDescription,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.xSmall.fontSize,
      },
    ],
    readOnlyTextfieldErrorMessage: [
      classNames.readOnlyTextfieldErrorMessage,
      AnimationClassNames.slideDownIn20,
      fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center',
      },
    ],
    readOnlyTextfieldGroup: [
      classNames.readOnlyTextfieldGroup,
      normalize,
      {
        borderColor: semanticColors.inputBorder,
        background: semanticColors.inputBackground,
        width: '100%',
        cursor: 'text',
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
        selectors: {
          '&:active, &:focus, &:hover': { outline: 0 },
          '::-ms-clear': {
            display: 'none',
          },
          ['&:focus .' + GlobalClassNames.readOnlyTextfield]: [
            getInputFocusStyle(!hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText, 3),
          ],
          ['&:hover .' + GlobalClassNames.readOnlyTextfield]: [
            {
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'Highlight',
                },
              },
            },
          ],
        },
      },
      borderless && {
        selectors: {
          ['&:focus .' + GlobalClassNames.readOnlyTextfield]: {
            selectors: {
              ':after': {
                border: 'none',
              },
            },
          },
        },
      },
      underlined && {
        selectors: {
          ['&:focus .' + GlobalClassNames.readOnlyTextfield]: {
            selectors: {
              ':after': {
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderRadius: 0,
              },
            },
          },
          ['&:hover .' + GlobalClassNames.readOnlyTextfield]: {
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'Highlight',
              },
            },
          },
        },
      },
      hasErrorMessage &&
        !underlined && {
          borderColor: semanticColors.errorText,
          selectors: {
            '&:hover': {
              borderColor: semanticColors.errorText,
            },
          },
        },
      !label &&
        required && {
          selectors: {
            ':before': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10,
            },
            [HighContrastSelector]: {
              selectors: {
                ':before': {
                  color: 'WindowText',
                  right: -14, // moving the * 4 pixel to right to alleviate border clipping in HC mode.
                },
              },
            },
          },
        },
    ],
    readOnlyTextfieldWrapper: [
      classNames.readOnlyTextfieldWrapper,
      fonts.medium,
      { position: 'relative', marginBottom: '3px' },
      underlined && {
        display: 'flex',
      },
    ],
  };
};
