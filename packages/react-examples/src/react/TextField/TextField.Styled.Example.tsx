import * as React from 'react';
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from '@fluentui/react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from '@fluentui/react/lib/Label';
import { Text, ITextStyles } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

const textStyles: Partial<ITextStyles> = { root: { maxWidth: 600 } };

export const TextFieldStyledExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Text styles={textStyles}>
        This example shows how components that used to be styled using CSS can be styled using JS styling. (Look at the
        bottom of the code to see the equivalent SCSS.) The preferred method is JS styling for several reasons: type
        safety for styling, more predictable behavior, and clear feedback via typing when component changes affect
        existing styling code.
      </Text>
      <TextField label="Custom styled TextField" required styles={getStyles} />
    </Stack>
  );
};

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [
      { width: 300 },
      required && {
        borderTopColor: props.theme.semanticColors.errorText,
      },
    ],
    subComponentStyles: {
      label: getLabelStyles,
    },
  };
}

function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  const { required } = props;
  return {
    root: required && {
      color: props.theme.palette.themePrimary,
    },
  };
}

/*
This is the SCSS used in the CSS styling example.
If exporting to CodePen, paste this into the CSS section.
-------------------------------------------------------------------------------------------
// In the real SCSS, these variables are defined elsewhere and adjusted based on the theme.
// The values provided below are from the default theme.
$errorTextColor: #a80000;
$ms-color-themePrimary: #0078d4;

.textField-cssStyled {
  .ms-TextField-fieldGroup {
    width: 300px;
    border-top-color: $errorTextColor;
  }
  .ms-Label {
    color: $ms-color-themePrimary;
  }
}
*/
