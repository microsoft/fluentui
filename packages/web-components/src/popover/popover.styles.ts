import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStrokeInteractive,
  fontFamilyBase,
  shadow8,
} from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';

export const popoverStyles = css`
  .popover-container {
    padding: 12px;
    min-width: 200px;
    min-height: 68px;
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

  [popover] {
    transition: visibility 150ms ease, opacity 150ms ease, transform 150ms ease;
    transform: translateY(0);
    opacity: 0;
    font-family: ${fontFamilyBase};
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
    max-width: 260px;
  }

  [popover]:popover-open {
    transform: translateY(2px);
    opacity: 1;

    position: absolute;
    inset: 0;
    top: 0;
    left: 0;
    margin: 0;
  }

  @starting-style {
    [popover]:popover-open {
      opacity: 0;
      transform: translateY(0);
    }
  }
`;
