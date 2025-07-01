import { css } from "lit";

export const buttonStyles = css`
  .npds-button {
    width: 100%;
  }

  /* Small */

  :host([size="sm"]) .npds-button {
    padding: 0 var(--npds-semantic-space-md);
  }

  /* Medium */

  :host([size="md"]) .npds-button {
    padding: 0 var(--npds-semantic-space-xl);
  }

  /* Large */

  :host([size="lg"]) .npds-button {
    padding: 0 var(--npds-semantic-space-xxl);
  }

  /* Fluid */

  :host([fluid]) {
    display: block;
  }

  /* Icon */

  :host([icon][size="sm"]) .npds-button {
    padding-left: var(--npds-primitive-size-4);
  }

  :host([icon][size="md"]) .npds-button {
    padding-left: var(--npds-primitive-size-12);
  }

  :host([icon][size="lg"]) .npds-button {
    padding-left: var(--npds-primitive-size-20);
  }

  /* Menu */

  :host([menu][size="sm"]) .npds-button {
    padding-right: var(--npds-primitive-size-4);
  }

  :host([menu][size="md"]) .npds-button {
    padding-right: var(--npds-primitive-size-12);
  }

  :host([menu][size="lg"]) .npds-button {
    padding-right: var(--npds-primitive-size-20);
  }

  /* Loading */

  :host([loading]) .npds-button {
    cursor: wait;
    position: relative;
  }

  :host([loading]) .npds-button-label,
  :host([loading]) .npds-button-icon,
  :host([loading]) .npds-button-menu-icon  {
    visibility: hidden;
  }

  :host([loading]) .npds-button-loading-icon {
    animation: spin 2s linear infinite;
    position: absolute;

    /**
     * Currently we can't use this css transform to center the spinner because it gets overridden by the animation.
     *
     * left: 50%;
     * transform: translateX(-50%);
     *
     * Once we have a spinner component that animates from within, we can use the transform above and remove the margin changes below.
     */
  }

  :host([loading][icon]) .npds-button-loading-icon {
    margin-left: var(--npds-semantic-space-xs);
  }

  :host([loading][menu]) .npds-button-loading-icon {
    margin-right: var(--npds-semantic-space-xs);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
