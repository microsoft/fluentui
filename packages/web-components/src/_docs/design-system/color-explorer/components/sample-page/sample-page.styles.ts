import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { accentFillRest, controlCornerRadius, designUnit, neutralForegroundRest } from '../../../../../index-rollup';

export const samplePageStyles = css`
  ${display('flex')} :host {
    display: grid;
    grid-gap: calc(var(--gutter) * 2px);
    grid-template-columns: auto 300px;
    padding: calc(var(--gutter) * 2px);
    position: relative;
    border-radius: 0 calc(${controlCornerRadius} * 1px) calc(${controlCornerRadius} * 1px) 0;
  }

  .image-container {
    /** Temp background */
    background: #d6d6d6;
    width: 100%;
    height: 215px;
    display: flex;
  }

  .badge {
    align-self: flex-end;
    margin: calc(var(--gutter) * 1px);
  }

  .text-container {
    display: flex;
    flex-direction: column;
    padding: calc(var(--gutter) * 1px);
    text-align: start;
    color: ${neutralForegroundRest};
  }

  .sample-control {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .sample-control-actions {
    margin-inline-start: auto;
  }

  .sample-control-text {
    margin-inline-start: calc(${designUnit} * 2px + 2px);
  }

  .sample-control-icon {
    width: 21px;
    height: 21px;
    background-color: ${accentFillRest};
    border-radius: calc(${controlCornerRadius} * 1px);
  }

  .preview-controls {
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 20px;
  }

  .control-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .control-container-2 {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: 20px;
  }

  .control-container p {
    margin-inline-start: calc(${designUnit} * 2px + 2px);
  }

  .control-container-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    text-align: start;
    color: ${neutralForegroundRest};
  }

  .checkbox {
    grid-row: 2;
  }

  .checkbox-label {
    grid-row: 2;
    grid-column: 2;
  }

  fast-card {
    width: 280px;
  }

  fast-badge {
    --badge-fill-primary: #e4bc11;
    --badge-color-primary: #000000;
  }

  fast-slider {
    min-width: unset;
  }

  fast-tab-panel {
    height: 100%;
  }

  fast-tab[aria-selected='true'] {
    background: transparent;
  }

  fast-radio-group.example-radios {
    margin: 0;
  }

  fast-radio-group.example-radios::part(positioning-region) {
    display: grid;
    grid-template-columns: auto;
    height: 100%;
  }

  fast-radio-group.swatches::part(positioning-region) {
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: column;
  }
`;
