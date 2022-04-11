import { css, ElementStyles } from "@microsoft/fast-element";
import { display, PropertyStyleSheetBehavior } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { appearanceBehavior } from '../utilities/appearance-behavior';

const contentSpacing = '12px';
const insetSpacing = '12px';
const maxStartEndLength = '8px';
const minStartEndLength = '8px;';

function verticalBehavior(value: boolean, styles: ElementStyles) {
    return new PropertyStyleSheetBehavior("vertical", value, styles);
}

/**
 * Styles for Divider
 * @public
 */
export const dividerStyles = css`
    ${display("flex")} :host {
        align-items: center;
        box-sizing: border-box;
        flex-direction: row;
        flex-grow: 1;
        position: relative;
        font-family: ${tokens.fontFamilyBase};
        font-size: ${tokens.fontSizeBase200};
        font-weight: ${tokens.fontWeightRegular};
        line-height: ${tokens.lineHeightBase200};
        text-align: center;
        color: ${tokens.colorNeutralForeground2};
    }

    :host::after,
    :host::before {
        box-sizing: border-box;
        display: flex;
        flex-grow: 1;
    }

    :host::after,
    :host::before {
        border-color: ${tokens.colorNeutralStroke2};
    }

    :host([align-content="start"])::after {
        content: "";
    }

    :host([align-content="center"])::after,
    :host([align-content="center"])::before {
        content: "";
    }

    :host([align-content="end"])::before {
        content: "";
    }

    :host([align-content].childless)::before {
        margin-bottom: 0;
        margin-right: 0;
    }

    :host([align-content].childless)::after {
        margin-left: 0;
        margin-top: 0;
    }
`.withBehaviors(
    appearanceBehavior("brand", css`
        :host([appearance="brand"]) {
            color: ${tokens.colorBrandForeground1};
        }

        :host([appearance="brand"])::after,
        :host([appearance="brand"])::before {
            border-color: ${tokens.colorBrandStroke1};
        }
    `),
    appearanceBehavior("subtle", css`
        :host([appearance="subtle"])::after,
        :host([appearance="subtle"])::before {
            border-color: ${tokens.colorNeutralStroke3};
        }
    `),
    appearanceBehavior("strong", css`
        :host([appearance="strong"])::after,
        :host([appearance="strong"])::before {
            border-color: ${tokens.colorNeutralStroke1};
        }
    `),
    verticalBehavior(false, css`
        :host {
            width: 100%;
        }

        :host::before,
        :host::after {
            border-top-style: solid;
            border-top-width: ${tokens.strokeWidthThin};
            min-width: ${minStartEndLength};
        }

        :host([inset]) {
            padding-inline: ${insetSpacing};
        }

        :host([align-content="start"])::before {
            content: "";
            margin-right: ${contentSpacing};
            max-width: ${maxStartEndLength};
        }

        :host([align-content="start"])::after {
            margin-left: ${contentSpacing};
        }

        :host([align-content="center"])::before {
            margin-right: ${contentSpacing};
        }
        :host([align-content="center"])::after {
            margin-left: ${contentSpacing};
        }

        :host([align-content="end"])::after {
            content: "";
            margin-left: ${contentSpacing};
            max-width: ${maxStartEndLength};
        }

        :host([align-content="end"])::before {
            margin-right: ${contentSpacing};
        }
    `),
    verticalBehavior(true, css`
        :host([vertical]) {
            flex-direction: column;
            min-height: 20px;
        }

        :host([vertical])::before,
        :host([vertical])::after {
            border-right-style: solid;
            border-right-width: ${tokens.strokeWidthThin};
            min-height: ${minStartEndLength};
        }

        :host([inset]) {
            margin-block: ${insetSpacing};
        }

        :host([vertical].children) {
            min-height: 84px;
        }

        :host([align-content="start"])::before {
            content: "";
            margin-bottom: ${contentSpacing};
            max-height: ${maxStartEndLength};
        }

        :host([align-content="start"])::after {
            margin-top: ${contentSpacing};
        }

        :host([align-content="center"])::before {
            margin-bottom: ${contentSpacing};
        }
        :host([align-content="center"])::after {
            margin-top: ${contentSpacing};
        }

        :host([align-content="end"])::after {
            content: "";
            margin-top: ${contentSpacing};
            max-height: ${maxStartEndLength};
        }

        :host([align-content="end"])::before {
            margin-bottom: ${contentSpacing};
        }
    `)
);