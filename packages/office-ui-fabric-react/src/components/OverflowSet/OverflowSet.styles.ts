import { IOverflowSetProps, IOverflowSetStyleProps } from "./OverflowSet.types";

export const getStyles = (props: IOverflowSetProps): IOverflowSetStyleProps => {
  const { className, vertical } = props;
  return {
    root: [
      "ms-OverflowSet",
      {
        position: "relative",
        display: "flex",
        flexWrap: "nowrap"
      },
      vertical && { flexDirection: "column" },
      className
    ],
    item: {
      flexShrink: 0,
      display: "inherit"
    }
  };
};
