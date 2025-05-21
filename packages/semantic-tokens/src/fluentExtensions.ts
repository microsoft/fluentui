export type FluentExtensionValue =
  | {
      extendToken: string;
      f2Token: string;
      rawValue?: never;
    }
  | {
      extendToken: string;
      f2Token?: never;
      rawValue: string;
    };

export type FluentExtensions = Record<string, FluentExtensionValue | null>;

export const fluentExtensions: FluentExtensions = {
  ctrlAccordionGapInsideDefault: { extendToken: 'gapInsideCtrlDefault', f2Token: 'spacingHorizontalS' },
};
