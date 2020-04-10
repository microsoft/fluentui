export interface BoxProps {
  classes?: {
    root?: string;
  };
}
export interface BoxExtendedProps {
  slots: {
    root: React.ElementType;
  };
  slotProps: {
    root: BoxProps;
  };
}

export type BoxInternalProps = BoxProps & BoxExtendedProps;
