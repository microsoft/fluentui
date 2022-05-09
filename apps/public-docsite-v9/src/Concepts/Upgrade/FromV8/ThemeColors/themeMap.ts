import { ColorCompareInfo } from './types';

export const monochromeMap: ColorCompareInfo[] = [
  { name: 'black', match: 'black', kind: 'v8-palette' },
  {
    name: 'blackTranslucent40',
    match: 'blackAlpha[40]',
    kind: 'v8-palette',
  },
  { name: 'neutralDark', match: 'grey[8]', kind: 'v8-palette' },
  { name: 'neutralPrimary', match: 'grey[14]', kind: 'v8-palette' },
  { name: 'neutralPrimaryAlt', match: 'grey[22]', kind: 'v8-palette' },
  { name: 'neutralSecondary', match: 'grey[36]', kind: 'v8-palette' },
  { name: 'neutralSecondaryAlt', match: 'grey[52]', kind: 'v8-palette' },
  { name: 'neutralTertiary', match: 'grey[62]', kind: 'v8-palette' },
  { name: 'neutralTertiaryAlt', match: 'grey[78]', kind: 'v8-palette' },
  { name: 'neutralQuaternary', match: 'grey[82]', kind: 'v8-palette' },
  { name: 'neutralQuaternaryAlt', match: 'grey[88]', kind: 'v8-palette' },
  { name: 'neutralLight', match: 'grey[92]', kind: 'v8-palette' },
  { name: 'neutralLighter', match: 'grey[96]', kind: 'v8-palette' },
  { name: 'neutralLighterAlt', match: 'grey[98]', kind: 'v8-palette' },
  { name: 'accent', match: 'brand[80]', kind: 'v8-palette' },
  { name: 'white', match: 'white', kind: 'v8-palette' },
  {
    name: 'whiteTranslucent40',
    match: 'whiteAlpha[40]',
    kind: 'v8-palette',
  },
];

export const namedColorMap: ColorCompareInfo[] = [
  {
    name: 'yellowDark',
    match: 'sharedColors.marigold.shade10',
    comment: 'Closest color match. Marigold is darker yellow moving toward orange.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.gold.primary',
        comment: 'Gold is darker yellow moving toward brown.',
      },
    ],
  },
  {
    name: 'yellow',
    match: 'sharedColors.yellow.primary',
    comment: 'Name match',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.marigold.primary',
        comment: 'Closest color match given v8 yellow is tinted orange.',
      },
    ],
  },
  {
    name: 'yellowLight',
    match: 'sharedColors.yellow.tint40',
    comment: 'Name match tinted light.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.yellow.tint20',
        comment: 'Closest color match given v8 light yellow is saturated.',
      },
    ],
  },
  {
    name: 'orange',
    match: 'sharedColors.orange.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.darkOrange.primary',
        comment: 'Closest color match.',
      },
      {
        name: 'sharedColors.peach.primary',
        comment: 'Traditional orange',
      },
    ],
  },
  {
    name: 'orangeLight',
    match: 'sharedColors.orange.tint20',
    comment: 'Name match tinted light.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.darkOrange.tint10',
        comment: 'Closest color match.',
      },
      {
        name: 'sharedColors.peach.tint30',
        comment: 'Traditional light orange.',
      },
    ],
  },
  {
    name: 'orangeLighter',
    match: 'sharedColors.orange.tint40',
    comment: 'Name match tinted lighter.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.peach.primary',
        comment: 'Color match.',
      },
      {
        name: 'sharedColors.peach.tint40',
        comment: 'Traditional lighter orange.',
      },
    ],
  },
  {
    name: 'redDark',
    match: 'sharedColors.darkRed.primary',
    comment: 'Name match',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.burgundy.primary',
        comment: 'Color match.',
      },
      {
        name: 'sharedColors.red.shade30',
        comment: 'Red shaded. Equivalent to darkRed.primary',
      },
    ],
  },
  {
    name: 'red',
    match: 'sharedColors.red.primary',
    comment: 'Name match. v9 does not have a closer color match.',
    kind: 'v8-palette',
  },
  {
    name: 'magentaDark',
    match: 'sharedColors.magenta.shade30',
    comment: 'Magenta shaded dark.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.berry.shade30',
        comment: 'Closest color match.',
      },
      {
        name: 'sharedColors.plum.primary',
        comment: 'Plum is the darker version of magenta.',
      },
    ],
  },
  {
    name: 'magenta',
    match: 'sharedColors.magenta.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.berry.primary',
        comment: 'Closest color match.',
      },
      {
        name: 'sharedColors.lilac.primary',
        comment: 'Lilac is a more purple version of berry.',
      },
    ],
  },
  {
    name: 'magentaLight',
    match: 'sharedColors.magenta.tint30',
    comment: 'Magenta tinted light.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.hotPink.primary',
        comment: 'Color match.',
      },
      {
        name: 'sharedColors.pink.primary',
        comment: 'Pink is what some folks would think of as magenta light.',
      },
    ],
  },
  {
    name: 'purpleDark',
    match: 'sharedColors.darkPurple.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
  },
  {
    name: 'purple',
    match: 'sharedColors.purple.primary',
    comment: 'Name and color match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.orchid.primary',
        comment: 'Orchid is a lighter verison of purple.',
      },
    ],
  },
  {
    name: 'purpleLight',
    match: 'sharedColors.purple.tint40',
    comment: 'Name match tinted light.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.orchid.tint40',
        comment: 'Orchid tinted is what some would consider light purple. ',
      },
      {
        name: 'sharedColors.lavender.tint30',
        comment: 'Closest color match.',
      },
    ],
  },
  {
    name: 'blueDark',
    match: 'sharedColors.darkBlue.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.darkBlue.shade30',
        comment: 'Closest color match',
      },
    ],
  },
  {
    name: 'blueMid',
    match: 'sharedColors.royalBlue.primary',
    comment: 'Closest match between darkBlue and blue.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.navy.shade10',
        comment: 'Closest color match.',
      },
    ],
  },
  {
    name: 'blue',
    match: 'sharedColors.blue.primary',
    comment: 'Name and color match.',
    kind: 'v8-palette',
  },
  {
    name: 'blueLight',
    match: 'sharedColors.lightBlue.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.blue.tint40',
        comment: 'Closest name match that is visibly lighter.',
      },
    ],
  },
  {
    name: 'tealDark',
    match: 'sharedColors.darkTeal.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.darkTeal.shade20',
        comment: 'Closest color match.',
      },
    ],
  },
  {
    name: 'teal',
    match: 'sharedColors.teal.primary',
    comment: 'Name match',
    kind: 'v8-palette',
    considered: [{ name: 'sharedColors.darkTeal.tint10', comment: 'Closest color match.' }],
  },
  {
    name: 'tealLight',
    match: 'sharedColors.lightTeal.primary',
    comment: 'Name match',
    kind: 'v8-palette',
    considered: [{ name: 'sharedColors.seafoam.shade10', comment: 'Closest color match.' }],
  },
  {
    name: 'greenDark',
    match: 'sharedColors.darkGreen.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.darkGreen.shade20',
        comment: 'Closest color match',
      },
    ],
  },
  {
    name: 'green',
    match: 'sharedColors.green.primary',
    comment: 'Name and color match.',
    kind: 'v8-palette',
  },
  {
    name: 'greenLight',
    match: 'sharedColors.lightGreen.primary',
    comment: 'Name match.',
    kind: 'v8-palette',
    considered: [
      {
        name: 'sharedColors.lime.tint10',
        comment: 'Closest color match.',
      },
      { name: 'sharedColors.green.tint30', comment: 'Green tinted.' },
    ],
  },
];

export const brandMap: ColorCompareInfo[] = [
  { name: 'themeDarker', match: 'brand[40]', kind: 'v8-palette' },
  { name: 'themeDark', match: 'brand[60]', kind: 'v8-palette' },
  { name: 'themeDarkAlt', match: 'brand[70]', kind: 'v8-palette' },
  { name: 'themePrimary', match: 'brand[80]', kind: 'v8-palette' },
  { name: 'themeSecondary', match: 'brand[90]', kind: 'v8-palette' },
  { name: 'themeTertiary', match: 'brand[120]', kind: 'v8-palette' },
  { name: 'themeLight', match: 'brand[140]', kind: 'v8-palette' },
  { name: 'themeLighter', match: 'brand[150]', kind: 'v8-palette' },
  { name: 'themeLighterAlt', match: 'brand[160]', kind: 'v8-palette' },
];

export const semanticToAliasMap: ColorCompareInfo[] = [
  {
    name: 'accentButtonBackground',
    match: 'colorBrandBackground',
    comment: 'Used by Button when appearance=primary.',
    kind: 'v8-semantic',
  },
  {
    name: 'accentButtonText',
    match: 'colorNeutralForegroundOnBrand',
    comment: 'Used by Button when appearance=primary.',
    kind: 'v8-semantic',
  },
  {
    name: 'actionLink',
    match: 'colorNeutralForeground1',
    kind: 'v8-semantic',
  },
  {
    name: 'actionLinkHovered',
    match: 'colorNeutralForeground1Hover',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyBackground',
    match: 'colorNeutralBackground1',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyBackgroundChecked',
    match: 'colorNeutralBackground1Selected',
    comment: 'Used by ToggleButton when checked.',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyBackgroundHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Used by ToggleButton when hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyDivider',
    match: 'colorNeutralStroke2',
    comment: 'Used by Divider for the line',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralBackground5',
        comment: 'Closest color match',
      },
    ],
  },
  {
    name: 'bodyFrameBackground',
    match: 'colorNeutralBackground1',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyFrameDivider',
    match: 'colorNeutralStroke2',
    comment: 'Used by Divider for the line',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralBackground5',
        comment: 'Closest color match',
      },
    ],
  },
  {
    name: 'bodyStandoutBackground',
    match: 'colorNeutralBackground2',
    comment: 'Closest color match',
    kind: 'v8-semantic',
  },
  {
    name: 'bodySubtext',
    match: 'colorNeutralForeground2',
    comment: 'Used by CompoundButton for secondary content.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralForeground3',
        comment: 'Closest color match',
      },
    ],
  },
  {
    name: 'bodyText',
    match: 'colorNeutralForeground1',
    kind: 'v8-semantic',
  },
  {
    name: 'bodyTextChecked',
    match: 'colorNeutralForeground1Selected',
    comment: 'Not used in v9 yet, but seems like best name match.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralForeground1',
        comment: 'Used by ToggleButton when checked',
      },
    ],
  },
  {
    name: 'buttonBackground',
    match: 'colorNeutralBackground1',
    comment: 'Used by Button',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBackgroundChecked',
    match: 'colorNeutralBackground1Selected',
    comment: 'Used by ToggleButton when checked',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBackgroundCheckedHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Used by ToggleButton when hovered. No hover+selected color in v9.',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBackgroundDisabled',
    match: 'colorNeutralBackgroundDisabled',
    comment: 'Used by Button when disabled',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBackgroundHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Used by Button when hovered',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBackgroundPressed',
    match: 'colorNeutralBackground1Pressed',
    comment: 'Used by Button when active',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBorder',
    match: 'colorNeutralStroke1',
    comment: 'Used by Button',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonBorderDisabled',
    match: 'colorNeutralStrokeDisabled',
    comment: 'Used by Button when disabled',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonText',
    match: 'colorNeutralForeground1',
    comment: 'Used by Button',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonTextChecked',
    match: 'colorNeutralForeground1',
    comment: 'Used by ToggleButton when checked',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonTextCheckedHovered',
    match: 'colorNeutralForeground1',
    comment: 'Used by ToggleButton when hovered. No hover+selected color in v9.',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonTextDisabled',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by Button when disabled',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonTextHovered',
    match: 'colorNeutralForeground1',
    comment: 'Used by Button when hovered',
    kind: 'v8-semantic',
  },
  {
    name: 'buttonTextPressed',
    match: 'colorNeutralForeground1',
    comment: 'Used by Button when active',
    kind: 'v8-semantic',
  },
  {
    name: 'cardStandoutBackground',
    match: 'colorNeutralBackground1',
    comment: 'Used by Card.',
    kind: 'v8-semantic',
  },
  {
    name: 'defaultStateBackground',
    match: 'colorNeutralBackground2',
    comment: 'Closest color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledBackground',
    match: 'colorNeutralBackgroundDisabled',
    comment: 'Used by multiple components when disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledBodySubtext',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by multiple components when disabled. No secondary disabled color in v9.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledBodyText',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by multiple components when disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledBorder',
    match: 'colorNeutralStrokeDisabled',
    comment: 'Used by multiple components when disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledSubtext',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by multiple components when disabled. No secondary disabled color in v9.',
    kind: 'v8-semantic',
  },
  {
    name: 'disabledText',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by multiple components when disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'focusBorder',
    match: 'colorStrokeFocus2',
    comment: 'Used by multiple components for outline.',
    kind: 'v8-semantic',
    considered: [
      { name: 'colorNeutralStrokeAccessible', comment: 'Closest color match.' },
      { name: 'colorNeutralForeground3', comment: 'Closest color match.' },
    ],
  },
  {
    name: 'inputBackground',
    match: 'colorNeutralBackground1',
    comment: 'Used by Input.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputBackgroundChecked',
    match: 'colorCompoundBrandBackground',
    comment: 'Used by Checkbox when checked.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputBackgroundCheckedHovered',
    match: 'colorCompoundBrandBackgroundHover',
    comment: 'Used by Checkbox when checked and hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputBorder',
    match: 'colorNeutralStrokeAccessible',
    comment: 'Used by Input.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputBorderHovered',
    match: 'colorNeutralStrokeAccessibleHover',
    comment: 'Used by Input when hovered.',
    kind: 'v8-semantic',
    considered: [{ name: 'colorNeutralForeground1', comment: 'Closest color match.' }],
  },
  {
    name: 'inputFocusBorderAlt',
    match: 'colorCompoundBrandStroke',
    comment: 'Used by input when interactive.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputForegroundChecked',
    match: 'colorNeutralForegroundOnBrand',
    comment: 'Used by Checkbox when checked.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputIcon',
    match: 'colorNeutralForeground3',
    comment: 'Used by Input for content (includes icon).',
    kind: 'v8-semantic',
    considered: [{ name: 'colorCompoundBrandForeground1', comment: 'Color match.' }],
  },
  {
    name: 'inputIconDisabled',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by Input for content (includes icon).',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralForegroundDisabled',
        comment: 'Closest color and name match.',
      },
    ],
  },
  {
    name: 'inputIconHovered',
    match: 'colorNeutralForeground3',
    comment: 'Used by Input for content (includes icon). v9 does not apply a specific style for content when hovered.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorCompoundBrandForeground1Hover',
        comment: 'Closest name and color match.',
      },
      { name: 'colorBrandForegroundLinkHover', comment: 'Color match.' },
    ],
  },
  {
    name: 'inputPlaceholderBackgroundChecked',
    match: 'colorBrandBackgroundInvertedSelected',
    comment: 'Color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputPlaceholderText',
    match: 'colorNeutralForeground4',
    comment: 'Used by Input.',
    kind: 'v8-semantic',
    considered: [{ name: 'colorNeutralStrokeAccessible', comment: 'Closest color match.' }],
  },
  {
    name: 'inputText',
    match: 'colorNeutralForeground1',
    comment: 'Used by Input.',
    kind: 'v8-semantic',
  },
  {
    name: 'inputTextHovered',
    match: 'colorNeutralForeground1Hover',
    comment: 'Closest name match. v9 Input does not apply a specific style to text when hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'link',
    match: 'colorBrandForegroundLink',
    comment: 'Used by Link.',
    kind: 'v8-semantic',
  },
  {
    name: 'linkHovered',
    match: 'colorBrandForegroundLinkHover',
    comment: 'Used by Link when hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'listBackground',
    match: 'colorNeutralBackground1',
    comment: 'Closest color match',
    kind: 'v8-semantic',
  },
  {
    name: 'listHeaderBackgroundHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Closest name and color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'listHeaderBackgroundPressed',
    match: 'colorNeutralBackground1Pressed',
    comment: 'Closest name and color match.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralBackground1Selected',
        comment: 'Closest color match.',
      },
    ],
  },
  {
    name: 'listItemBackgroundChecked',
    match: 'colorNeutralBackground1Selected',
    comment: 'Closest name and color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'listItemBackgroundCheckedHovered',
    match: 'colorNeutralBackground1Selected',
    comment: 'Closest name match.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralBackground1Pressed',
        comment: 'Closest color match.',
      },
    ],
  },
  {
    name: 'listItemBackgroundHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Closest name and color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'listText',
    match: 'colorNeutralForeground1',
    comment: 'Closest color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'listTextColor',
    match: 'colorNeutralForeground1',
    comment: 'Closest color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuBackground',
    match: 'colorNeutralBackground1',
    comment: 'Used by MenuItem. v9 does not apply a background for Menu or MenuList.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuDivider',
    match: 'colorNeutralStroke2',
    comment: 'Used by MenuItem.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuHeader',
    match: 'colorNeutralForeground3',
    comment: 'Used by MenuItem. v9 does not apply brand color to menu group headers.',
    kind: 'v8-semantic',
    considered: [{ name: 'colorBrandForeground1', comment: 'Color match.' }],
  },
  {
    name: 'menuIcon',
    match: 'colorNeutralForeground1',
    comment: 'Used by MenuItem. v9 does not apply brand color to icons.',
    kind: 'v8-semantic',
    considered: [{ name: 'colorBrandForeground1', comment: 'Color match.' }],
  },
  {
    name: 'menuItemBackgroundChecked',
    match: 'colorNeutralBackground1',
    comment: 'Used by MenuItemCheckbox when check. v9 does not change the background when checked.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuItemBackgroundHovered',
    match: 'colorNeutralBackground1Hover',
    comment: 'Used by MenuItem.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuItemBackgroundPressed',
    match: 'colorNeutralBackground1Hover',
    comment: 'Used by MenuItem when active. v9 does not change the background when active and uses the hover color.',
    kind: 'v8-semantic',
    considered: [
      {
        name: 'colorNeutralBackground1',
        comment: 'Menu item has this color when keyboard pressed but not hovered.',
      },
    ],
  },
  {
    name: 'menuItemText',
    match: 'colorNeutralForeground1',
    comment: 'Used by MenuItem.',
    kind: 'v8-semantic',
  },
  {
    name: 'menuItemTextHovered',
    match: 'colorNeutralForeground2Hover',
    comment: 'Used by MenuItem when hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'messageLink',
    match: 'colorBrandForegroundLink',
    comment: 'Used by Link.',
    kind: 'v8-semantic',
  },
  {
    name: 'messageLinkHovered',
    match: 'colorBrandForegroundLinkHover',
    comment: 'Used by Link.',
    kind: 'v8-semantic',
  },
  {
    name: 'messageText',
    match: 'colorNeutralForeground1',
    comment: 'Closest color match.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonBackground',
    match: 'colorBrandBackground',
    comment: 'Used by Button when appearance=primary.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonBackgroundDisabled',
    match: 'colorNeutralBackgroundDisabled',
    comment: 'Used by Button when disabled. v9 does not specifically style appearance=primary and disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonBackgroundHovered',
    comment: 'Used by Button when appearance=primary and hovered.',
    match: 'colorBrandBackgroundHover',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonBackgroundPressed',
    match: 'colorBrandBackgroundPressed',
    comment: 'Used by Button when appearance=primary and active.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonBorder',
    match: 'colorTransparentStroke',
    comment: 'Used by Button when appearance=primary.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonText',
    match: 'colorNeutralForegroundOnBrand',
    comment: 'Used by Button when appearance=primary.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonTextDisabled',
    match: 'colorNeutralForegroundDisabled',
    comment: 'Used by Button when disabled. v9 does not specifically style appearance=primary and disabled.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonTextHovered',
    match: 'colorNeutralForegroundOnBrand',
    comment: 'Used by Button when appearance=primary and hovered.',
    kind: 'v8-semantic',
  },
  {
    name: 'primaryButtonTextPressed',
    match: 'colorNeutralForegroundOnBrand',
    comment: 'Used by Button when appearance=primary and active.',
    kind: 'v8-semantic',
  },
];
