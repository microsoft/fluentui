import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

export const BreadcrumbStyles = css`
  ${display('inline-block')} :host {
    box-sizing: border-box;
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
  }

  .list {
    display: flex;
  }
`;
