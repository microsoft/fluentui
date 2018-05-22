import * as React from "react";
import {
  IAccordionTitleProps,
  IAccordionTitleStyles
} from "./AccordionTitle.types";
import { Icon } from "office-ui-fabric-react";

export const AccordionTitleView = (
  props: IAccordionTitleProps & { styles: { [key in keyof IAccordionTitleStyles]: string } }
) => {
  return (
    <button
      ref={ props.focusElementRef }
      className={ props.styles.root }
      onClick={ props.onToggleCollapse }
      onKeyDown={ props.onKeyDown }
    >
      { !props.noChevron && (
        <Icon className={ props.styles.icon } iconName="ChevronDown" />
      ) }
      <span className={ props.styles.text }>{ props.text }</span>
    </button>
  );
};
