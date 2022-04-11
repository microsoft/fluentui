import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { tabPaddingM } from '../tab/tab.styles';

/**
 * Styles for Tab Panel
 * @public
 */
export const tabPanelStyles = css`
    ${display("block")} :host {
        box-sizing: border-box;
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase300};
        font-weight: ${tokens.fontWeightRegular};
        line-height: ${tokens.lineHeightBase300};
        padding: 0 ${tabPaddingM};
    }
`;