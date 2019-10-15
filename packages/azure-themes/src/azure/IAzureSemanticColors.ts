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
    value: string;
    icon: string;
    label: string;
    disabled: string;
    hyperlink: string;
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
  item: {
    hover: string;
    select: string;
  };
  shimmer: {
    primary: string;
    secondary: string;
  };
}
