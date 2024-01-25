import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStrokeInteractive,
  fontFamilyBase,
  shadow8,
} from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';

export const popoverStyles = css`
  :host {
    font-family: ${fontFamilyBase};
  }

  :host([size='small']) {
    padding: 12px;
    max-width: 214px;
  }
  :host([size='small']):before {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  :host([size='large']) {
    padding: 20px;
    max-width: 317px;
  }

  .popover-content-container {
    position: absolute;

    width: max-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
    max-width: 260px;
    padding: 12px;
  }

  .popover-content-container[hidden] {
    visibility: hidden;
  }

  .popover-content-container[visible] {
    transition: visibility 150ms ease, opacity 150ms ease, transform 150ms ease;
    transform: translateY(2px);
    opacity: 1;
    visibility: visible;
  }

  .popover-content-container:not([visible])) {
    transition-delay: 600ms;
    opacity: 0;
    visibility: hidden;
  }

  /* :host([beak][visible]) {
    transform: translateY(6px);
  } */

  /* :host([beak])::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 5px solid ${colorNeutralBackground1};
    z-index: 1;
  } */

  /************
----------------------------------
styles for edge and chrome browsers
-----------------------------------
*************/

  [popover]:popover-open {
    opacity: 1;
    transform: scaleY(1);
  }

  [popover] {
    transition: opacity 0.3s, transform 0.3s, overlay 0.3s allow-discrete, display 0.3s allow-discrete;

    opacity: 0;
    transform: scaleY(0);
  }

  @starting-style {
    [popover]:popover-open {
      opacity: 0;
      transform: scaleY(0);
    }
  }

  /************ end chrome edge styling *************/
`;
