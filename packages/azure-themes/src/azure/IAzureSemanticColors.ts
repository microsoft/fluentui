export interface IAzureSemanticColors {
  background: string;
  statusBar: {
    link: {
      rest: string;
      hover: string;
    };
    background: {
      success: string;
      error: string;
      warning: string;
      information: string;
      upsell: string;
    };
    border: {
      default: string;
      okay: string;
      error: string;
      warning: string;
      information: string;
      upsell: string;
    };
    icon: {
      success: string;
      error: string;
      warning: string;
      information: string;
      upsell: string;
      disabled: string;
    };
  };
  text: {
    list: string;
    heading: string;
    body: string;
    bodyHovered: string;
    value: string;
    icon: string;
    label: string;
    disabled: string;
    hyperlink: string;
    hyperlinkHovered: string;
    success: string;
    error: string;
    placeholder: string;
  };
  primaryButton: {
    rest: {
      background: string;
      text: string;
      border: string;
    };
    hover: {
      background: string;
      text: string;
    };
    pressed: {
      background: string;
      text: string;
    };
    disabled: {
      background: string;
      border: string;
      text: string;
    };
    focus: {
      text: string;
    };
  };
  disabledButton: {
    background: string;
    text: string;
  };
  dangerButton: {
    rest: {
      text: string;
      background: string;
      border: string;
    };
    hover: {
      text: string;
      background: string;
      border: string;
    };
    pressed: {
      text: string;
      background: string;
      border: string;
    };
  };
  secondaryButton: {
    rest: {
      background: string;
      border: string;
      text: string;
    };
    hover: {
      background: string;
      color: string;
      border: string;
    };
    pressed: {
      text: string;
      background: string;
      border: string;
    };
    focus: {
      border: string;
    };
  };
  checkBox: {
    rest: {
      border: string;
      background: string;
      hover: string;
      hoverText: string;
      focus: string;
      check: string;
    };
    checked: {
      border: string;
      background: string;
      default: string;
      hoverBackground: string;
      hoverBorder: string;
    };
    disabled: {
      border: string;
      background: string;
    };
  };
  controlOutlines: {
    rest: string;
    background: string;
    disabled: string;
    hover: string;
    accent: string; // button in radio, check, et. al.
    focus: string;
    error: string;
    dirty: string;
  };
  choiceGroup: {
    circle: {
      hover: string;
    };
    focus: string;
  };
  dropDown: {
    background: {
      rest: string;
      hover: string;
    };
    text: {
      hovered: string;
    };
  };
  item: {
    hover: string;
    select: string;
    selectHovered: string;
  };
  shimmer: {
    primary: string;
    secondary: string;
  };
  tagButton: {
    rest: {
      text: string;
      background: string;
      border: string;
    };
    hover: {
      text: string;
      background: string;
      border: string;
    };
    pressed: {
      text: string;
      background: string;
      border: string;
    };
  };
  toggle: {
    disabled: {
      backrgound: string;
    };
  };
  commandBar: {
    border: string;
    button: {
      root: {
        color: string;
      };
      hover: {
        background: string;
        color: string;
        icon: string;
      };
      disabled: {
        color: string;
      };
      focus: {
        borderColor: string;
      };
      selected: {
        background: string;
        icon: string;
      };
      selectedHover: {
        background: string;
      };
    };
  };
  dataColor: {
    dataColor1: string;
    dataColor2: string;
    dataColor3: string;
    dataColor4: string;
    dataColor5: string;
    dataColor6: string;
    dataColor7: string;
    dataColor8: string;
    dataColor9: string;
    dataColor10: string;
    noData1: string;
    noData2: string;
  };
  datePicker: {
    rest: {
      selected: string;
      text: string;
    };
    disabled: {
      border: string;
    };
  };
  detailsRow: {
    border: string;
    focus: string;
    hoveredLink: string;
    hoveredRowLink: string;
    hoveredBackground: string;
    selectedLink: string;
    selectedHoveredLink: string;
  };
  radioButton: {
    circle: {
      uncheckedRest: string;
      checkedDisabled: string;
      borderDisabled: string;
    };
    pill: {
      disabled: string;
      uncheckedDisabled: string;
      checkedHover: string;
      uncheckedHover: string;
    };
  };
  tabs: {
    hover: string;
  };
  teachingBubble: {
    rest: {
      background: string;
      border: string;
      text: string;
      secondaryBackround: string;
    };
    hover: {
      primaryButtonBackground: string;
    };
  };
  slider: {
    activeBackground: string;
    activeBackgroundHovered: string;
    inactiveBackgroundHovered: string;
    activeDisabledBackground: string;
    inactiveDisabledBackground: string;
    activeBackgroundPressed: string;
  };
  calendar: {
    background: string;
    text: {
      rest: string;
      hover: string;
      disabled: string;
      outside: string;
    };
    button: {
      border: string;
      selected: string;
      hover: string;
    };
  };
}
