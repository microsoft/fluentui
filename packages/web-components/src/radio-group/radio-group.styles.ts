import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { tokens } from '@fluentui/react-theme';

export const radioGroupStyles = css`
  ${display('flex')} :host {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    font-family: ${tokens.fontFamilyBase};
    font-size: ${tokens.fontSizeBase300};
    line-height: ${tokens.lineHeightBase300};
  }

  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }

  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }

  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
`;
