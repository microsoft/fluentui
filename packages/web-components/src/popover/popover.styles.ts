import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStrokeInteractive,
  fontFamilyBase,
  shadow8,
} from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';

export const popoverStyles = css`
  [popover] {
    /* font-family: ${fontFamilyBase}; */
    /* position: absolute; */
    /* height: fit-content;
    width: fit-content; */
    /* visibility: hidden; */
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
    /* max-width: 260px;
    padding: 12px; */
    /* transform: translateY(-10px); */
  }

  :host([size='small']) ::slotted([slot='popover-content']) {
    padding: 12px;
    max-width: 214px;
  }
  :host([size='small']):before ::slotted([slot='popover-content']) {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  :host([size='large']) ::slotted([slot='popover-content']) {
    padding: 20px;
    max-width: 317px;
  }

  [popover]:popover-open {
    /* opacity: 1; */
    /* transform: scaleY(1); */
    transform: translateY(2px);
    opacity: 1;
  }

  [popover] {
    transition: visibility 150ms ease, opacity 150ms ease, transform 150ms ease;
    position: absolute;
    transform: translateY(0);
    /* transition-delay: 600ms; */
    opacity: 0;

    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
  }

  @starting-style {
    [popover]:popover-open {
      opacity: 0;
      transform: translateY(0);
    }
  }
`;
