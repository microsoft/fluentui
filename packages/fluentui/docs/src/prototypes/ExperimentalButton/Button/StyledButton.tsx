// import * as React from "react";
// import styled from "styled-components";
// import { ButtonGroup } from "@fluentui/react-northstar";
//
// import useButtonAria from "./hooks/useButtonAria";
// import useButtonTemplate from "./hooks/useButtonTemplate";
//
// export const buttonClassName = "ui-button";
//
// const ButtonRoot = styled.button`
//   display: inline-flex;
//   outline: none;
//   height: 32px;
//   cursor: pointer;
//   background-color: white;
//   justify-content: center;
//   align-items: center;
//   vertical-align: middle;
//   border-width: 2px;
//   border-radius: 3px;
//   border-color: grey;
//   padding: 0 20px;
// `;
//
// const ButtonIcon = styled.span`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: ${props => (props.loading ? 0 : "16px")};
//   height: 16px;
//
//   margin: ${props =>
//     props.loading
//       ? 0
//       : props.hasContent
//       ? props.iconPosition === "after"
//         ? "0 0 0 10px"
//         : "0 10px 0 0"
//       : 0};
//   opacity: ${props => (props.loading ? 0 : 1)};
// `;
//
// const ButtonContent = styled.span`
//   text-decoration: italic;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   font-weight: 600;
//
//   font-size: ${props => (props.size === "small" ? "12px" : "14px")};
//   line-height: ${props => (props.size === "small" ? 1.3333 : 1.4286)};
// `;
//
// /**
//  * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
//  *
//  * @accessibility
//  * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
//  */
// const Button = React.forwardRef((props, ref) => {
//   // other styling hook
//   // popper hook
//
//   const getA11yProps = useButtonAria({ props });
//
//   const element = useButtonTemplate({
//     props,
//     getA11yProps,
//     ref,
//     slots: {
//       root: ButtonRoot,
//       icon: ButtonIcon,
//       content: ButtonContent
//     },
//     slotProps: {
//       icon: {
//         defaultProps: () => ({
//           loading: props.loading,
//           iconPosition: props.iconPosition,
//           hasContent: !!props.content
//         })
//       },
//       content: {},
//       loader: {}
//     }
//   });
//
//   // can be wrapped with Provider
//   return element;
// });
//
// Button.displayName = "Button";
// Button.Group = ButtonGroup;
// Button.Content = ButtonContent;
//
// Button.shorthandConfig = {
//   mappedProp: "content"
// };
//
// export default Button;

export default () => null;
