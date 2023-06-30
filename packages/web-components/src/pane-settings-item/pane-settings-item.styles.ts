import { spacingHorizontalS, spacingHorizontalXXS } from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

/** Pane Settings Item styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    padding: 0 ${spacingHorizontalS};
  }
  .root {
    display: flex;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .icon {
    width: 28px;
    flex-shrink: 0;
  }
`;
