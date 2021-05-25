import { css } from '@microsoft/fast-element';

export const styles = css`
  :host {
    align-items: center;
    box-sizing: border-box;
    cursor: default;
    display: inline-flex;
    flex-direction: row;
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-line-height);
    min-height: 12px;
    min-width: 12px;
    position: relative;
    transition: opacity 0.5s linear;
    --presence-size: 16px;
    --presence-mask-width: 3px;
    --presence-mask-color: #ddd;
    --presence-color-available: #92c353;
    --presence-color-away: #eaa300;
    --presence-color-busy: #d13438;
    --presence-color-do-not-disturb: #d13438;
    --presence-color-offline: #929292;
    --presence-color-out-of-office: #b4009e;
    --presence-color-unknown: #adc0cf;
    --presence-color-blocked: #d13438;
  }

  .fluent-presence {
    background: #fff;
    box-sizing: border-box;
    border-radius: 9999px;
    display: inline-block;
    height: var(--presence-size);
    width: var(--presence-size);
    background-repeat: no-repeat;
    z-index: 1;
    color: var(--presence-color-unknown);
  }

  .fluent-presence svg,
  ::slotted(svg) {
    fill: currentColor;
    height: var(--presence-size);
    width: var(--presence-size);
  }

  .presence-mask {
    cursor: default;
    display: inline-block;
    position: absolute;
    height: calc(var(--presence-size) + (var(--presence-mask-width) * 2));
    width: calc(var(--presence-size) + (var(--presence-mask-width) * 2));
    top: calc(var(--presence-mask-width) * -1);
    left: calc(var(--presence-mask-width) * -1);
    background-color: var(--presence-mask-color);
    border-radius: 9999px;
  }

  .away.out-of-office,
  .offline.out-of-office {
    color: var(--presence-color-out-of-office);
  }

  .busy {
    color: var(--presence-color-busy);
  }

  .do-not-disturb {
    color: var(--presence-color-do-not-disturb);
  }

  .on-the-phone {
    color: var(--presence-color-do-not-disturb);
  }

  .away {
    color: var(--presence-color-away);
  }

  .available {
    color: var(--presence-color-available);
  }
  .available.out-of-office {
    color: var(--presence-color-available);
  }

  .offline {
    color: var(--presence-color-offline);
  }

  .unknown {
    color: var(--presence-color-unknown);
  }

  .blocked {
    color: var(--presence-color-blocked);
  }

  fluent-presence-badge {
    position: absolute;
    min-height: 12px;
    min-width: 12px;
  }
`;
