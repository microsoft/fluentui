import { createComponent } from "./utilities/createComponent";
import { AccordionTitleView as view } from "./AccordionTitle.view";
import { getStyles as styles } from "./AccordionTitle.styles";
import {
  IAccordionTitleProps,
  IAccordionTitleStyles
} from "./AccordionTitle.types";

export const AccordionTitle = createComponent<
  IAccordionTitleProps,
  IAccordionTitleStyles
  >({
    scope: "AccordionTitle",
    view,
    styles
  });
