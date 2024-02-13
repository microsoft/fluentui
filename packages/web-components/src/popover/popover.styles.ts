import { colorNeutralBackground1, fontFamilyBase } from '@fluentui/web-components';
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
    position: absolute;
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
