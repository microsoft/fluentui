import { css } from "@microsoft/fast-element";
import { ButtonOptions, ElementDefinitionContext } from "@microsoft/fast-foundation";
import {
  buttonStyles
} from "../button";
import { typeRampMinus1FontSize, typeRampMinus1LineHeight } from "../design-tokens";

export const compoundButtonStyles = (context: ElementDefinitionContext, definition: ButtonOptions) => css`
  ${buttonStyles(context, definition)}

  :host .control {
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
  }

  :host .content {
    font-weight: 600;
  }

  :host .end {
    margin: 0;
    font-size: ${typeRampMinus1FontSize};
    line-height: ${typeRampMinus1LineHeight};
  }
`;
