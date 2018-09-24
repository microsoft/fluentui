import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors, CommunicationColors } from './FluentColors';
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { FontSizes } from './FluentType';
import { Depths } from './FluentDepths';
import { IDropdownStyleProps } from 'office-ui-fabric-react/lib/Dropdown';
import { RectangleEdge } from 'office-ui-fabric-react/lib/utilities/positioning';

const fluentBorderRadius = '2px';

const BreadcrumbStyles = {
  itemLink: {
    fontSize: FontSizes.size18,
    fontWeight: 400,
    color: NeutralColors.gray130,
    selectors: {
      '&:last-child': {
        fontWeight: 600
      }
    }
  }
};

const CheckboxStyles = {
  checkbox: {
    borderRadius: fluentBorderRadius
  }
};

const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { checked, disabled, hasIcon, hasImage } = props;
  const radioButtonSpacing = 1;
  const radioButtonInnerSize = 6;
  return {
    field: {
      selectors: {
        ':before': [
          disabled && {
            backgroundColor: NeutralColors.white,
            borderColor: NeutralColors.gray60
          }
        ],
        ':after': [
          checked &&
            (hasIcon || hasImage) && {
              top: radioButtonSpacing + radioButtonInnerSize,
              right: radioButtonSpacing + radioButtonInnerSize,
              left: 'auto' // To reset the value of 'left' to its default value, so that 'right' works
            },
          checked &&
            disabled && {
              borderColor: NeutralColors.gray60
            }
        ]
      }
    }
  };
};

const ComboBoxStyles = {
  root: {
    borderRadius: fluentBorderRadius // the bound input box
  },
  callout: {
    borderRadius: `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`,
    overflow: 'hidden',
    boxShadow: Depths.depth8
  }
};

const CompoundButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius
  }
};

const DefaultButtonStyles = (props: IButtonProps) => {
  const { primary, theme } = props;
  const { palette, semanticColors } = theme!;

  return {
    root: {
      borderRadius: fluentBorderRadius,
      backgroundColor: primary ? semanticColors.primaryButtonBackground : palette.white,
      border: primary ? '' : `1px solid ${NeutralColors.gray110}`,
      color: primary ? semanticColors.buttonText : palette.white
    },
    rootHovered: {
      backgroundColor: primary ? palette.themeDarkAlt : NeutralColors.gray20,
      border: primary ? '' : `1px solid ${NeutralColors.gray110}`
    }
  };
};

const DialogStyles = {
  main: {
    selectors: {
      '.ms-Modal.ms-Dialog &': {
        boxShadow: Depths.depth64,
        borderRadius: fluentBorderRadius
      }
    }
  }
};

const DialogContentStyles = {
  title: {
    fontSize: FontSizes.size20,
    fontWeight: FontWeights.semibold,
    padding: '16px',
    lineHeight: 'normal'
  },
  topButton: {
    padding: '16px 10px 0 0'
  },
  inner: {
    padding: '0 16px 16px'
  },
  subText: {
    fontWeight: FontWeights.regular
  }
};

const DialogFooterStyles = {
  actions: {
    margin: '16px 0 0'
  }
};

const DropdownStyles = (props: IDropdownStyleProps) => {
  const { disabled, hasError, theme, isOpen, calloutRenderEdge } = props;
  const { semanticColors } = theme!;

  const titleOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `${fluentBorderRadius} ${fluentBorderRadius} 0 0`
      : `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`;
  const calloutOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`
      : `${fluentBorderRadius} ${fluentBorderRadius} 0 0`;

  return {
    dropdown: [
      disabled && {
        selectors: {
          // Title placeholder states when disabled.
          ['&:hover .ms-Dropdown-titleIsPlaceHolder']: { color: NeutralColors.gray70 },
          ['&:focus .ms-Dropdown-titleIsPlaceHolder']: { color: NeutralColors.gray70 },
          ['&:active .ms-Dropdown-titleIsPlaceHolder']: { color: NeutralColors.gray70 }
        }
      },
      !disabled && {
        selectors: {
          // Title and border states. For :hover and :focus even if the styles are the same we need to keep them separate for specificity
          // reasons in order :active borderColor to work.
          ['&:hover .ms-Dropdown-title']: { color: NeutralColors.gray190, borderColor: NeutralColors.gray160 },
          ['&:focus .ms-Dropdown-title']: { color: NeutralColors.gray190, borderColor: NeutralColors.gray160 },
          ['&:active .ms-Dropdown-title']: {
            color: NeutralColors.gray190,
            fontWeight: FontWeights.semibold,
            borderColor: CommunicationColors.primary
          },

          // CaretDown states are the same for focus, hover, active.
          ['&:hover .ms-Dropdown-caretDown, &:focus .ms-Dropdown-caretDown, &:active .ms-Dropdown-caretDown']: {
            color: NeutralColors.gray160
          },

          // Title placeholder states when not disabled.
          ['&:hover .ms-Dropdown-titleIsPlaceHolder, &:focus .ms-Dropdown-titleIsPlaceHolder, &:active .ms-Dropdown-titleIsPlaceHolder']: {
            color: NeutralColors.gray190
          }
        }
      }
    ],
    title: [
      {
        borderColor: !hasError ? NeutralColors.gray80 : semanticColors.errorText,
        borderRadius: isOpen ? titleOpenBorderRadius : fluentBorderRadius,
        padding: `0 28px 0 8px`
      },
      disabled && { color: NeutralColors.gray70 }
    ],
    caretDownWrapper: {
      right: 8
    },
    caretDown: [
      disabled && {
        color: NeutralColors.gray70
      }
    ],
    callout: {
      border: 'none',
      borderRadius: calloutOpenBorderRadius,
      boxShadow: Depths.depth8,
      selectors: {
        ['.ms-Callout-main']: { borderRadius: `0 0 ${fluentBorderRadius} ${fluentBorderRadius}` }
      }
    }
  };
};

const LabelStyles = {
  root: {
    fontWeight: FontWeights.semibold
  }
};

const PrimaryButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius
  }
};

const TextFieldStyles = {
  fieldGroup: {
    borderRadius: fluentBorderRadius
  }
};

const ToggleStyles = {
  pill: {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    padding: '0 4px'
  },
  thumb: {
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    borderColor: 'transparent'
  }
};

// Roll up all style overrides in a single "Fluent theme" object
export const FluentStyles = {
  Breadcrumb: {
    styles: BreadcrumbStyles
  },
  CompoundButton: {
    styles: CompoundButtonStyles
  },
  Checkbox: {
    styles: CheckboxStyles
  },
  ChoiceGroupOption: {
    styles: ChoiceGroupOptionStyles
  },
  ComboBox: {
    styles: ComboBoxStyles
  },
  DefaultButton: {
    styles: DefaultButtonStyles
  },
  Dialog: {
    styles: DialogStyles
  },
  DialogContent: {
    styles: DialogContentStyles
  },
  DialogFooter: {
    styles: DialogFooterStyles
  },
  Dropdown: {
    styles: DropdownStyles
  },
  Label: {
    styles: LabelStyles
  },
  PrimaryButton: {
    styles: PrimaryButtonStyles
  },
  TextField: {
    styles: TextFieldStyles
  },
  Toggle: {
    styles: ToggleStyles
  }
};
