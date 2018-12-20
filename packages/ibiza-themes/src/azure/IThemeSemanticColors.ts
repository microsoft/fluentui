export interface IThemeSemanticColors {
  background: string;
  text: {
    heading: string;
    body: string;
    value: string;
    icon: string;
    label: string;
    disabledText: string;
    hyperlink: string;
    success: string;
    error: string;
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
    };
    hover: {
      background: string;
      border: string;
    };
    pressed: {
      background: string;
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
}
