export interface IAzureSemanticColors {
  background: string;
  statusBar: {
    link: string;
    background: {
      default: string;
      okay: string;
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
      default: string;
      okay: string;
      error: string;
      warning: string;
      information: string;
      upsell: string;
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
    hyperlinkBackgroundHovered: string;
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
  };
  checkBox: {
    rest: {
      border: string;
      background: string;
      hover: string;
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
    };
  };
  controlOutlines: {
    rest: string;
    disabled: string;
    hover: string;
    accent: string; // button in radio, check, et. al.
    error: string;
    dirty: string;
  };
  choiceGroup: {
    circle: {
      hover: string;
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
  toggle: {
    disabled: {
      backrgound: string;
    };
  };
  commandBar: {
    border: string;
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
      text: string;
      secondaryBackround: string;
    };
    hover: {
      primaryButtonBackground: string;
    };
  };
}
