import { css } from "@microsoft/fast-element";
import { display, PropertyStyleSheetBehavior } from "@microsoft/fast-foundation";
import { tokens } from '@fluentui/react-theme';
import { sizeBehavior } from '../utilities/size-behavior';
import { shapeBehavior } from '../utilities/shape-behavior';
import { ConditionalPropertyBehavior } from '../utilities/conditional-property-behavior';

//
// TODO: All animation constants should go to theme or globals?
// https://github.com/microsoft/fluentui/issues/16372#issuecomment-778240665

const animationDuration = {
    duration50: '50ms',
    duration100: '100ms',
    duration150: '150ms',
    duration200: '200ms',
    duration300: '300ms',
    duration400: '400ms',
    duration500: '500ms',
  };
  
  const animationTiming = {
    ultraFast: animationDuration.duration50,
    faster: animationDuration.duration100,
    fast: animationDuration.duration150,
    normal: animationDuration.duration200,
    slow: animationDuration.duration300,
    slower: animationDuration.duration400,
    ultraSlow: animationDuration.duration500,
  };
  
  const animationLines = {
    decelerateMax: 'cubic-bezier(0.00,0.00,0.00,1.00)',
    decelerateMid: 'cubic-bezier(0.10,0.90,0.20,1.00)',
    decelerateMin: 'cubic-bezier(0.33,0.00,0.10,1.00)',
    accelerateMax: 'cubic-bezier(1.00,0.00,1.00,1.00)',
    accelerateMid: 'cubic-bezier(0.90,0.10,1.00,0.20)',
    accelerateMin: 'cubic-bezier(0.80,0.00,0.78,1.00)',
    maxEasyEase: 'cubic-bezier(0.80,0.00,0.20,1.00)',
    easyEase: 'cubic-bezier(0.33,0.00,0.67,1.00)',
    linear: 'linear',
  };
  
  const animations = {
    fastOutSlowInMax: animationLines.decelerateMax,
    fastOutSlowInMid: animationLines.decelerateMid,
    fastOutSlowInMin: animationLines.decelerateMin,
    slowOutFastInMax: animationLines.accelerateMax,
    slowOutFastInMid: animationLines.accelerateMid,
    slowOutFastInMin: animationLines.accelerateMin,
    fastEase: animationLines.maxEasyEase,
    normalEase: animationLines.easyEase,
    nullEasing: animationLines.linear,
  };

/** Avatar styles
 * @public
 */
export const avatarStyles = css`
    ${display("inline-block")} :host {
        position: relative;
        flex-shrink: 0;
        vertical-align: middle;
        font-family: ${tokens.fontFamilyBase};
        font-weight: ${tokens.fontWeightSemibold};
        border-radius: ${tokens.borderRadiusCircular};
        color: ${tokens.colorNeutralForeground3};
        background-color: ${tokens.colorNeutralBackground6};
    }

    slot,
    ::slotted(img),
    .initials {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }

    slot,
    .initials {
        lineHeight: 1;
        border: ${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke};
        display: flex;
        align-items: center;
        justify-content: center;
        vertical-align: center;
        text-align: center;
        user-select: none;
    }

    ::slotted(img) {
        object-fit: cover;
        vertical-align: top;
    }

    ::slotted(fluent-presence-badge),
    ::slotted(fluent-badge) {
        position: absolute;
        bottom: 0;
        right: 0;
        box-shadow: 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralBackground1};
    }

    :host([data-color="brand"]) {
        color: ${tokens.colorNeutralForegroundInverted};
        background-color: ${tokens.colorBrandBackgroundStatic};
    }
    :host([data-color="darkRed"]) {
        color: ${tokens.colorPaletteDarkRedForeground2};
        background-color: ${tokens.colorPaletteDarkRedBackground2};
    }
    :host([data-color="cranberry"]) {
        color: ${tokens.colorPaletteCranberryForeground2};
        background-color: ${tokens.colorPaletteCranberryBackground2};
    }
    :host([data-color="red"]) {
        color: ${tokens.colorPaletteRedForeground2};
        background-color: ${tokens.colorPaletteRedBackground2};
    }
    :host([data-color="pumpkin"]) {
        color: ${tokens.colorPalettePumpkinForeground2};
        background-color: ${tokens.colorPalettePumpkinBackground2};
    }
    :host([data-color="peach"]) {
        color: ${tokens.colorPalettePeachForeground2};
        background-color: ${tokens.colorPalettePeachBackground2};
    }
    :host([data-color="marigold"]) {
        color: ${tokens.colorPaletteMarigoldForeground2};
        background-color: ${tokens.colorPaletteMarigoldBackground2};
    }
    :host([data-color="gold"]) {
        color: ${tokens.colorPaletteGoldForeground2};
        background-color: ${tokens.colorPaletteGoldBackground2};
    }
    :host([data-color="brass"]) {
        color: ${tokens.colorPaletteBrassForeground2};
        background-color: ${tokens.colorPaletteBrassBackground2};
    }
    :host([data-color="brown"]) {
        color: ${tokens.colorPaletteBrownForeground2};
        background-color: ${tokens.colorPaletteBrownBackground2};
    }
    :host([data-color="forest"]) {
        color: ${tokens.colorPaletteForestForeground2};
        background-color: ${tokens.colorPaletteForestBackground2};
    }
    :host([data-color="seafoam"]) {
        color: ${tokens.colorPaletteSeafoamForeground2};
        background-color: ${tokens.colorPaletteSeafoamBackground2};
    }
    :host([data-color="darkGreen"]) {
        color: ${tokens.colorPaletteDarkGreenForeground2};
        background-color: ${tokens.colorPaletteDarkGreenBackground2};
    }
    :host([data-color="lightTeal"]) {
        color: ${tokens.colorPaletteLightTealForeground2};
        background-color: ${tokens.colorPaletteLightTealBackground2};
    }
    :host([data-color="teal"]) {
        color: ${tokens.colorPaletteTealForeground2};
        background-color: ${tokens.colorPaletteTealBackground2};
    }
    :host([data-color="steel"]) {
        color: ${tokens.colorPaletteSteelForeground2};
        background-color: ${tokens.colorPaletteSteelBackground2};
    }
    :host([data-color="blue"]) {
        color: ${tokens.colorPaletteBlueForeground2};
        background-color: ${tokens.colorPaletteBlueBackground2};
    }
    :host([data-color="royalBlue"]) {
        color: ${tokens.colorPaletteRoyalBlueForeground2};
        background-color: ${tokens.colorPaletteRoyalBlueBackground2};
    }
    :host([data-color="cornflower"]) {
        color: ${tokens.colorPaletteCornflowerForeground2};
        background-color: ${tokens.colorPaletteCornflowerBackground2};
    }
    :host([data-color="navy"]) {
        color: ${tokens.colorPaletteNavyForeground2};
        background-color: ${tokens.colorPaletteNavyBackground2};
    }
    :host([data-color="lavender"]) {
        color: ${tokens.colorPaletteLavenderForeground2};
        background-color: ${tokens.colorPaletteLavenderBackground2};
    }
    :host([data-color="purple"]) {
        color: ${tokens.colorPalettePurpleForeground2};
        background-color: ${tokens.colorPalettePurpleBackground2};
    }
    :host([data-color="grape"]) {
        color: ${tokens.colorPaletteGrapeForeground2};
        background-color: ${tokens.colorPaletteGrapeBackground2};
    }
    :host([data-color="lilac"]) {
        color: ${tokens.colorPaletteLilacForeground2};
        background-color: ${tokens.colorPaletteLilacBackground2};
    }
    :host([data-color="pink"]) {
        color: ${tokens.colorPalettePinkForeground2};
        background-color: ${tokens.colorPalettePinkBackground2};
    }
    :host([data-color="magenta"]) {
        color: ${tokens.colorPaletteMagentaForeground2};
        background-color: ${tokens.colorPaletteMagentaBackground2};
    }
    :host([data-color="plum"]) {
        color: ${tokens.colorPalettePlumForeground2};
        background-color: ${tokens.colorPalettePlumBackground2};
    }
    :host([data-color="beige"]) {
        color: ${tokens.colorPaletteBeigeForeground2};
        background-color: ${tokens.colorPaletteBeigeBackground2};
    }
    :host([data-color="mink"]) {
        color: ${tokens.colorPaletteMinkForeground2};
        background-color: ${tokens.colorPaletteMinkBackground2};
    }
    :host([data-color="platinum"]) {
        color: ${tokens.colorPalettePlatinumForeground2};
        background-color: ${tokens.colorPalettePlatinumBackground2};
    }
    :host([data-color="anchor"]) {
        color: ${tokens.colorPaletteAnchorForeground2};
        background-color: ${tokens.colorPaletteAnchorBackground2};
    }
`.withBehaviors(
    new ConditionalPropertyBehavior("active", css`
        :host([active]) {
             /* Work-around for text pixel snapping at the end of the animation */
            transform: perspective(1px);
            transition-property: transform, opacity;
            transition-duration: ${animationTiming.ultraSlow}, ${animationTiming.faster};
            transition-delay: ${animations.fastEase}, ${animations.nullEasing};
        }

        :host([active])::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: inherit;
            transition-property: margin, opacity;
            transition-duration: ${animationTiming.ultraSlow}, ${animationTiming.slower};
            transition-delay: ${animations.fastEase}, ${animations.nullEasing};
        }

        :host([appearance="ring"])::before,
        :host([appearance="ring-shadow"])::before {
            border-style: solid;
            border-color: ${tokens.colorBrandBackgroundStatic};
        }

        :host([active]:not([appearance="shadow"]))::before {
            margin: calc(-2 * ${tokens.strokeWidthThick});
            border-width: ${tokens.strokeWidthThick};
        }

        :host([size="56"][active]:not([appearance="shadow"]))::before,
        :host([size="64"][active]:not([appearance="shadow"]))::before {
            margin: calc(-2 * ${tokens.strokeWidthThicker});
            border-width: ${tokens.strokeWidthThicker};
        }
        
        :host([size="72"][active]:not([appearance="shadow"]))::before,
        :host([size="96"][active]:not([appearance="shadow"]))::before,
        :host([size="120"][active]:not([appearance="shadow"]))::before,
        :host([size="128"][active]:not([appearance="shadow"]))::before {
            margin: calc(-2 * ${tokens.strokeWidthThickest});
            border-width: ${tokens.strokeWidthThickest};
        }

        :host([active][appearance])::before {
            box-shadow: ${tokens.shadow4};
        }

        :host([size="32"][active][appearance])::before,
        :host([size="36"][active][appearance])::before,
        :host([size="40"][active][appearance])::before,
        :host([size="48"][active][appearance])::before {
            box-shadow: ${tokens.shadow8};
        }

        :host([size="56"][active][appearance])::before,
        :host([size="64"][active][appearance])::before {
            box-shadow: ${tokens.shadow16};
        }

        :host([size="72"][active][appearance])::before,
        :host([size="96"][active][appearance])::before,
        :host([size="120"][active][appearance])::before,
        :host([size="128"][active][appearance])::before {
            box-shadow: ${tokens.shadow28};
        }

        :host([active][appearance="ring"])::before {
            box-shadow: none;
        }

        :host([active="inactive"]) {
            opacity: 0.8;
            transform: scale(0.875);
            transition-property: transform, opacity;
            transition-duration: ${animationTiming.ultraSlow}, ${animationTiming.faster};
            transition-delay: ${animations.fastOutSlowInMin}, ${animations.nullEasing};
        }

        :host([active="inactive"])::before {
            margin: 0;
            opacity: 0;  
            transition-property: margin, opacity;
            transition-duration: ${animationTiming.ultraSlow}, ${animationTiming.slower};
            transition-delay: ${animations.fastOutSlowInMin}, ${animations.nullEasing};
        }
    `),
    sizeBehavior(20, css`
        :host([size="20"]) {
            width: 20px;
            height: 20px;
            font-size: ${tokens.fontSizeBase100};
            font-weight: ${tokens.fontWeightRegular};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 16px;
            height: 16px;
            font-size: 16px;
        }
    `),
    sizeBehavior(24, css`
        :host([size="24"]) {
            width: 24px;
            height: 24px;
            font-size: ${tokens.fontSizeBase100};
            font-weight: ${tokens.fontWeightRegular};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 16px;
            height: 16px;
            font-size: 16px;
        }
    `),
    sizeBehavior(28, css`
        :host([size="28"]) {
            width: 28px;
            height: 28px;
            font-size: ${tokens.fontSizeBase200};   
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    `),
    sizeBehavior(32, css`
        :host([size="32"]) {
            width: 32px;
            height: 32px;
            font-size: ${tokens.fontSizeBase300};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    `),
    sizeBehavior(36, css`
        :host([size="36"]) {
            width: 36px;
            height: 36px;
            font-size: ${tokens.fontSizeBase300}; 
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    `),
    sizeBehavior(40, css`
        :host([size="40"]) {
            width: 40px;
            height: 40px;
            font-size: ${tokens.fontSizeBase300}; 
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    `),
    sizeBehavior(48, css`
        :host([size="48"]) {
            width: 48px;
            height: 48px;
            font-size: ${tokens.fontSizeBase400};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 24px;
            height: 24px;
            font-size: 24px;
        }
    `),
    sizeBehavior(56, css`
        :host([size="56"]) {
            width: 56px;
            height: 56px;
            font-size: ${tokens.fontSizeBase400};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 28px;
            height: 28px;
            font-size: 28px;
        }
    `),
    sizeBehavior(64, css`
        :host([size="64"]) {
            width: 64px;
            height: 64px;
            font-size: ${tokens.fontSizeBase500};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 32px;
            height: 32px;
            font-size: 32px;
        }
    `),
    sizeBehavior(72, css`
        :host([size="72"]) {
            width: 72px;
            height: 72px;
            font-size: ${tokens.fontSizeBase500};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 32px;
            height: 32px;
            font-size: 32px;
        }
    `),
    sizeBehavior(96, css`
        :host([size="96"]) {
            width: 96px;
            height: 96px;
            font-size: ${tokens.fontSizeBase500};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 48px;
            height: 48px;
            font-size: 48px;
        }
    `),
    sizeBehavior(120, css`
        :host([size="120"]) {
            width: 120px;
            height: 120px;
            font-size: ${tokens.fontSizeBase600};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 48px;
            height: 48px;
            font-size: 48px;
        }
    `),
    sizeBehavior(128, css`
        :host([size="128"]) {
            width: 128px;
            height: 128px;
            font-size: ${tokens.fontSizeBase600};
        }

        slot[name="icon"] > svg,
        ::slotted(svg) {
            width: 48px;
            height: 48px;
            font-size: 48px;
        }
    `),
    shapeBehavior("square", css`
        :host([shape="square"]) {
            border-radius: ${tokens.borderRadiusMedium};
        }

        :host([shape="square"][size="20"]),
        :host([shape="square"][size="24"]) {
            border-radius: ${tokens.borderRadiusSmall};
        }

        :host([shape="square"][size="28"]),
        :host([shape="square"][size="32"]),
        :host([shape="square"][size="36"]),
        :host([shape="square"][size="40"]),
        :host([shape="square"][size="48"]) {
            border-radius: ${tokens.borderRadiusMedium};
        }

        :host([shape="square"][size="56"]),
        :host([shape="square"][size="64"]),
        :host([shape="square"][size="72"]) {
            border-radius: ${tokens.borderRadiusLarge};
        }

        :host([shape="square"][size="96"]),
        :host([shape="square"][size="120"]),
        :host([shape="square"][size="128"]) {
            border-radius: ${tokens.borderRadiusXLarge};
        }
    `)
);