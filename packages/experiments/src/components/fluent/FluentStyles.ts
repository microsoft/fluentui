import { IBreadcrumbStyleProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IDropdownStyleProps } from 'office-ui-fabric-react/lib/Dropdown';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { RectangleEdge } from 'office-ui-fabric-react/lib/utilities/positioning';

import { IToggleProps } from '../../../../office-ui-fabric-react/lib';
import { CommunicationColors, NeutralColors, SharedColors } from './FluentColors';
import { Depths } from './FluentDepths';
import { FontSizes } from './FluentType';

const fluentBorderRadius = '2px';

const BreadcrumbStyles = (props: IBreadcrumbStyleProps) => {
  const stateSelectors = {
    ':hover': {
      color: NeutralColors.gray160
    },
    ':active': {
      backgroundColor: NeutralColors.gray30
    },
    // Needs to be revised with designers when moving to default OUFR styles.
    // Now used only to override the default ones to follow fluent specs.
    '&:active:hover': {
      color: NeutralColors.gray160,
      backgroundColor: NeutralColors.gray30
    }
  };

  return {
    itemLink: {
      outline: 'none',
      fontSize: FontSizes.size18,
      fontWeight: 400,
      color: NeutralColors.gray130,
      selectors: {
        '&:last-child': {
          fontWeight: 600,
          color: NeutralColors.gray160
        },
        '.ms-Fabric--isFocusVisible &:focus': {
          // Necessary due to changes of Link component not using getFocusStyle
          outline: 'none'
        },
        ...stateSelectors
      }
    },
    overflowButton: {
      color: NeutralColors.gray130,
      selectors: {
        ...stateSelectors
      }
    }
  };
};

const CheckboxStyles = (props: ICheckboxStyleProps): ICheckboxStyles => {
  const { disabled, checked } = props;

  return {
    checkbox: [
      {
        borderRadius: fluentBorderRadius,
        borderColor: NeutralColors.gray160
      },
      !disabled &&
        checked && {
          borderColor: CommunicationColors.primary
        },
      disabled && {
        borderColor: NeutralColors.gray60
      },
      checked &&
        disabled && {
          background: NeutralColors.gray60,
          borderColor: NeutralColors.gray60
        }
    ],
    checkmark: {
      color: NeutralColors.white
    },
    text: {
      color: disabled ? NeutralColors.gray60 : NeutralColors.gray160
    },
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-text': { color: NeutralColors.gray190 }
          }
        },
        checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              background: CommunicationColors.shade20,
              borderColor: CommunicationColors.shade20
            },
            ':focus .ms-Checkbox-checkbox': {
              background: CommunicationColors.shade20,
              borderColor: CommunicationColors.shade20
            }
          }
        }
      ]
    ]
  };
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
  const { disabled, hasError, isOpen, calloutRenderEdge } = props;
  const ITEM_HEIGHT = '36px';

  const titleOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `${fluentBorderRadius} ${fluentBorderRadius} 0 0`
      : `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`;

  const calloutOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`
      : `${fluentBorderRadius} ${fluentBorderRadius} 0 0`;

  const commonItemStyles = {
    minHeight: ITEM_HEIGHT,
    lineHeight: '19px',
    padding: '0 8px'
  };

  const itemSelectors = (isSelected: boolean = false) => {
    return {
      // TODO
      // After moving fluent to become the default design of Fabric we should revisit this selectors to match the fluent redlines.
      // Currently whenever you hover over an item it forces focus on it so we style the background change through focus selector.
      selectors: {
        '&:hover:focus': {
          color: NeutralColors.gray190,
          backgroundColor: !isSelected ? NeutralColors.gray20 : NeutralColors.gray30
        },
        '&:focus': {
          backgroundColor: !isSelected ? 'transparent' : NeutralColors.gray30
        },
        '&:active': {
          color: NeutralColors.gray190,
          backgroundColor: !isSelected ? NeutralColors.gray20 : NeutralColors.gray30
        }
      }
    };
  };

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
          },

          // Title has error states
          ['&:hover .ms-Dropdown-title--hasError, &:focus .ms-Dropdown-title--hasError, &:active .ms-Dropdown-title--hasError']: {
            borderColor: SharedColors.red20
          }
        }
      }
    ],
    title: [
      {
        borderColor: !hasError ? NeutralColors.gray80 : SharedColors.red10,
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
    errorMessage: { color: SharedColors.red20 },
    callout: {
      border: 'none',
      borderRadius: calloutOpenBorderRadius,
      boxShadow: Depths.depth8,
      selectors: {
        ['.ms-Callout-main']: { borderRadius: calloutOpenBorderRadius }
      }
    },
    dropdownItemHeader: {
      padding: '0 8px',
      height: ITEM_HEIGHT,
      lineHeight: ITEM_HEIGHT
    },
    dropdownItem: [commonItemStyles, itemSelectors()],
    dropdownItemSelected: [
      {
        backgroundColor: NeutralColors.gray30,
        color: NeutralColors.gray190
      },
      commonItemStyles,
      itemSelectors(true)
    ],
    dropdownItemDisabled: {
      ...commonItemStyles,
      color: NeutralColors.gray60
    },
    dropdownItemSelectedAndDisabled: {
      ...commonItemStyles,
      color: NeutralColors.gray60
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

const ToggleStyles = (props: IToggleProps) => {
  const { disabled, checked } = props;
  return {
    pill: [
      {
        width: '40px',
        height: '20px',
        borderRadius: '10px',
        padding: '0 4px'
      },
      !disabled && [
        checked && {
          selectors: {
            ':hover': [
              {
                backgroundColor: CommunicationColors.shade20
              }
            ]
          }
        },
        !checked && {
          selectors: {
            ':hover .ms-Toggle-thumb': {
              backgroundColor: NeutralColors.gray160
            }
          }
        }
      ]
    ],
    thumb: [
      {
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        borderColor: 'transparent'
      },
      !disabled &&
        !checked && {
          backgroundColor: NeutralColors.gray130
        }
    ]
  };
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
