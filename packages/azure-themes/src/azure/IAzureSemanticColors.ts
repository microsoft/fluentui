export interface IAzureSemanticColors {
  background: string;
  statusBar: {
    okay: string;
    error: string;
    warning: string;
    information: string;
    upsell: string;
  };
  text: {
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
    };
    hover: {
      background: string;
      text: string;
    };
    pressed: {
      background: string;
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
      hover: string;
      focus: string;
    };
    checked: {
      border: string;
      background: string;
      default: string;
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
}
