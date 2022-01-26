// See CSS 3 CSS-wide keywords https://www.w3.org/TR/css3-values/#common-keywords
// See CSS 3 Explicit Defaulting https://www.w3.org/TR/css-cascade-3/#defaulting-keywords
// "all CSS properties can accept these values"
export type ICSSRule = 'initial' | 'inherit' | 'unset';

// See CSS 3 <percentage> type https://drafts.csswg.org/css-values-3/#percentages
export type ICSSPercentageRule = string;

// See CSS 3 <length> type https://drafts.csswg.org/css-values-3/#lengths
export type ICSSPixelUnitRule = string | number;

// See CSS <baseline-position> type https://www.w3.org/TR/css-align-3/#typedef-baseline-position
export type ICSSBaselinePositionRule = 'baseline' | 'last baseline' | 'first baseline';

// See CSS <overflow-position> type https://www.w3.org/TR/css-align-3/#typedef-overflow-position
// See CSS <self-position> type https://www.w3.org/TR/css-align-3/#typedef-self-position
export type ICSSOverflowAndSelfPositionRule =
  // <self-position>
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  // <self-position> prefixed with <overflow-position> value 'safe'
  | 'safe center'
  | 'safe start'
  | 'safe end'
  | 'safe self-start'
  | 'safe self-end'
  | 'safe flex-start'
  | 'safe flex-end'
  // <self-position> prefixed with <overflow-position> value 'unsafe'
  | 'unsafe center'
  | 'unsafe start'
  | 'unsafe end'
  | 'unsafe self-start'
  | 'unsafe self-end'
  | 'unsafe flex-start'
  | 'unsafe flex-end';

// See CSS Box Layout Modes: the 'display' property https://www.w3.org/TR/css-display-3/#the-display-properties
export type ICSSDisplayRule =
  // <display-outside> values
  | 'block'
  | 'inline'
  | 'run-in'
  // <display-inside> values
  | 'flow'
  | 'flow-root'
  | 'table'
  | 'flex'
  | 'grid'
  | 'ruby'
  // <display-outside> plus <display-inside> values
  | 'block flow'
  | 'inline table'
  | 'flex run-in'
  // <display-listitem> values
  | 'list-item'
  | 'list-item block'
  | 'list-item inline'
  | 'list-item flow'
  | 'list-item flow-root'
  | 'list-item block flow'
  | 'list-item block flow-root'
  | 'flow list-item block'
  // <display-internal> values
  | 'table-row-group'
  | 'table-header-group'
  | 'table-footer-group'
  | 'table-row'
  | 'table-cell'
  | 'table-column-group'
  | 'table-column'
  | 'table-caption'
  | 'ruby-base'
  | 'ruby-text'
  | 'ruby-base-container'
  | 'ruby-text-container'
  // <display-box> values
  | 'contents'
  | 'none'
  // <display-legacy> values
  | 'inline-block'
  | 'inline-table'
  | 'inline-flex'
  | 'inline-grid';

export type IFontWeight =
  | ICSSRule
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | 100
  | '200'
  | 200
  | '300'
  | 300
  | '400'
  | 400
  | '500'
  | 500
  | '600'
  | 600
  | '700'
  | 700
  | '800'
  | 800
  | '900'
  | 900;

export type IMixBlendModes =
  | ICSSRule
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * The base font style.
 * {@docCategory IRawFontStyle}
 */
export interface IRawFontStyle {
  /**
   * The font property is shorthand that allows you to do one of two things: you can
   * either set up six of the most mature font properties in one line, or you can set
   *  one of a choice of keywords to adopt a system font setting.
   */
  font?: ICSSRule | string;

  /**
   * The font-family property allows one or more font family names and/or generic family
   * names to be specified for usage on the selected element(s)' text. The browser then
   * goes through the list; for each character in the selection it applies the first
   * font family that has an available glyph for that character.
   */
  fontFamily?: ICSSRule | string;

  /**
   * The font-kerning property allows contextual adjustment of inter-glyph spacing, i.e.
   * the spaces between the characters in text. This property controls <bold>metric
   * kerning</bold> - that utilizes adjustment data contained in the font. Optical
   * Kerning is not supported as yet.
   */
  fontKerning?: ICSSRule | string;

  /**
   * Specifies the size of the font. Used to compute em and ex units.
   * See CSS 3 font-size property https://www.w3.org/TR/css-fonts-3/#propdef-font-size
   */
  fontSize?:
    | ICSSRule
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
    | 'larger'
    | 'smaller'
    | ICSSPixelUnitRule
    | ICSSPercentageRule;

  /**
   * The font-size-adjust property adjusts the font-size of the fallback fonts defined
   * with font-family, so that the x-height is the same no matter what font is used.
   * This preserves the readability of the text when fallback happens.
   * See CSS 3 font-size-adjust property
   * https://www.w3.org/TR/css-fonts-3/#propdef-font-size-adjust
   */
  fontSizeAdjust?: ICSSRule | 'none' | number | string;

  /**
   * Allows you to expand or condense the widths for a normal, condensed, or expanded
   * font face.
   * See CSS 3 font-stretch property
   * https://drafts.csswg.org/css-fonts-3/#propdef-font-stretch
   */
  fontStretch?:
    | ICSSRule
    | 'normal'
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded'
    | string;

  /**
   * The font-style property allows normal, italic, or oblique faces to be selected.
   * Italic forms are generally cursive in nature while oblique faces are typically
   * sloped versions of the regular face. Oblique faces can be simulated by artificially
   * sloping the glyphs of the regular face.
   * See CSS 3 font-style property https://www.w3.org/TR/css-fonts-3/#propdef-font-style
   */
  fontStyle?: ICSSRule | 'normal' | 'italic' | 'oblique' | string;

  /**
   * This value specifies whether the user agent is allowed to synthesize bold or
   *  oblique font faces when a font family lacks bold or italic faces.
   */
  fontSynthesis?: ICSSRule | string;

  /**
   * The font-variant property enables you to select the small-caps font within a font
   * family.
   */
  fontVariant?: ICSSRule | string;

  /**
   * Fonts can provide alternate glyphs in addition to default glyph for a character.
   * This property provides control over the selection of these alternate glyphs.
   */
  fontVariantAlternates?: ICSSRule | string;

  /**
   * Specifies the weight or boldness of the font.
   * See CSS 3 'font-weight' property https://www.w3.org/TR/css-fonts-3/#propdef-font-weight
   */
  fontWeight?: IFontWeight | string;
}

/**
 * Font face definition.
 *
 * @public
 * {@docCategory IFontFace}
 */
export interface IFontFace extends IRawFontStyle {
  /**
   * Specifies the src of the font.
   */
  src?: string;

  /**
   * unicode-range allows you to set a specific range of characters to be downloaded
   * from a font (embedded using \@font-face) and made available for use on the current
   * page.
   */
  unicodeRange?: ICSSRule | string;

  /**
   * Determines how a font face is displayed based on whether and when it is downloaded
   * and ready to use.
   */
  fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

  /**
   * Feature settings for the font.
   */
  fontFeatureSettings?: string;
}

/**
 * All raw style properties.
 *
 * @public
 * {@docCategory IRawStyleBase}
 */
export interface IRawStyleBase extends IRawFontStyle {
  /**
   * (Ms specific) constrast adjust rule.
   */
  MsHighContrastAdjust?: ICSSRule | string;

  /**
   * (Ms specific) scrollbar behavior adjust rule.
   */
  MsOverflowStyle?: 'auto' | 'none' | 'scrollbar' | '-ms-autohiding-scrollbar' | string;

  /**
   * (Moz specific) font smoothing directive.
   */
  MozOsxFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | string;

  /**
   * (Webkit specific) font smoothing directive.
   */
  WebkitFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased' | string;

  /**
   * (Webkit specific) momentum scrolling on iOS devices
   */
  WebkitOverflowScrolling?: 'auto' | 'touch' | string;

  /**
   * (Webkit specific) color of the highlight that appears overa  link while it's being tapped
   */
  WebkitTapHighlightColor?: string;

  /**
   * (Webkit specific) controls the text inflation algorithm used on some smartphones and tablets.
   * Other browsers will ignore this property.
   */
  WebkitTextSizeAdjust?: 'none' | 'auto' | ICSSPercentageRule | ICSSRule | string;

  /**
   * Aligns a flex container's lines within the flex container when there is extra space
   * in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
   */
  alignContent?:
    | ICSSRule
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | string;

  /**
   * Sets the default alignment in the cross axis for all of the flex container's items,
   * including anonymous flex items, similarly to how justify-content aligns items along the main axis.
   */
  alignItems?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | string;

  /**
   * Aligns the box (as the alignment subject) within its containing block (as the alignment container)
   * along the block/column/cross axis of the alignment container.
   *
   * See CSS align-self property
   * https://www.w3.org/TR/css-align-3/#propdef-align-self
   */
  alignSelf?:
    | ICSSRule
    | 'auto'
    | 'normal'
    | 'stretch'
    | ICSSBaselinePositionRule
    | ICSSOverflowAndSelfPositionRule
    | string;

  /**
   * This property allows precise alignment of elements, such as graphics, that do not
   * have a baseline-table or lack the desired baseline in their baseline-table. With the
   * alignment-adjust property, the position of the baseline identified by the
   * alignment-baseline can be explicitly determined. It also determines precisely
   * the alignment point for each glyph within a textual element.
   */
  alignmentAdjust?: ICSSRule | string;

  /**
   * Specifies how an object is aligned with respect to its parent. This property specifies
   * which baseline of this element is to be aligned with the corresponding baseline of the
   * parent. For example, this allows alphabetic baselines in Roman text to stay aligned
   * across font size changes. It defaults to the baseline with the same name as the computed
   * value of the alignment-baseline property.
   */
  alignmentBaseline?: ICSSRule | string;

  /**
   * The animation CSS property is a shorthand property for the various animation properties:
   * `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`,
   * `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and
   * `animation-play-state`.
   */
  animation?: ICSSRule | string;

  /**
   * Defines a length of time to elapse before an animation starts, allowing an animation to begin execution
   * some time after it is applied.
   */
  animationDelay?: ICSSRule | string;

  /**
   * Defines whether an animation should run in reverse on some or all cycles.
   */
  animationDirection?: ICSSRule | string;

  /**
   * Specifies the length an animation takes to finish. Default value is 0, meaning
   * there will be no animation.
   */
  animationDuration?: ICSSRule | string;

  /**
   * The animation-fill-mode CSS property specifies how a CSS animation should apply
   * styles to its target before and after its execution.
   */
  animationFillMode?: ICSSRule | 'none' | 'forwards' | 'backwards' | 'both' | string;

  /**
   * Specifies how many times an animation cycle should play.
   */
  animationIterationCount?: ICSSRule | string;

  /**
   * Defines the list of animations that apply to the element.
   */
  animationName?: ICSSRule | string;

  /**
   * Defines whether an animation is running or paused.
   */
  animationPlayState?: ICSSRule | string;

  /**
   * The animation-timing-function specifies the speed curve of an animation.
   */
  animationTimingFunction?: ICSSRule | string;

  /**
   * Allows changing the style of any element to platform-based interface elements or
   * vice versa.
   */
  appearance?: ICSSRule | string;

  /**
   * Lets you apply graphical effects such as blurring or color shifting to the area
   * behind an element. Because it applies to everything behind the element, to see
   * the effect you must make the element or its background at least partially transparent.
   */
  backdropFilter?: ICSSRule | string;

  /**
   * Edge requires the -webkit prefix backdrop-filter.
   */
  WebkitBackdropFilter?: ICSSRule | string;

  /**
   * Determines whether or not the “back” side of a transformed element is visible when
   * facing the viewer.
   */
  backfaceVisibility?: ICSSRule | string;

  /**
   * Shorthand property to set the values for one or more of:
   * background-clip, background-color, background-image,
   * background-origin, background-position, background-repeat,
   * background-size, and background-attachment.
   */
  background?: ICSSRule | string;

  /**
   * If a background-image is specified, this property determines
   * whether that image's position is fixed within the viewport,
   * or scrolls along with its containing block.
   * See CSS 3 background-attachment property https://drafts.csswg.org/css-backgrounds-3/#the-background-attachment
   */
  backgroundAttachment?: ICSSRule | 'scroll' | 'fixed' | 'local' | string;

  /**
   * This property describes how the element's background images should blend with each
   * other and the element's background color. The value is a list of blend modes that
   * corresponds to each background image. Each element in the list will apply to the
   * corresponding element of background-image. If a property doesn’t have enough
   * comma-separated values to match the number of layers, the UA must calculate its
   * used value by repeating the list of values until there are enough.
   */
  backgroundBlendMode?: ICSSRule | string;

  /**
   * The background-clip CSS property specifies if an element's background, whether a
   * `<color>` or an `<image>`, extends underneath its border.
   *
   * \* Does not work in IE
   *
   * \* The `text` value is experimental and should not be used in production code.
   */
  backgroundClip?: ICSSRule | 'border-box' | 'padding-box' | 'content-box' | 'text' | string;

  /**
   * Sets the background color of an element.
   */
  backgroundColor?: ICSSRule | string;

  /**
   * Sets a compositing style for background images and colors.
   */
  backgroundComposite?: ICSSRule | string;

  /**
   * Applies one or more background images to an element. These can be any valid CSS
   * image, including url() paths to image files or CSS gradients.
   */
  backgroundImage?: ICSSRule | string;

  /**
   * Specifies what the background-position property is relative to.
   */
  backgroundOrigin?: ICSSRule | string;

  /**
   * Sets the position of a background image.
   */
  backgroundPosition?: ICSSRule | string;

  /**
   * Background-repeat defines if and how background images will be repeated after they
   * have been sized and positioned
   */
  backgroundRepeat?: ICSSRule | string;

  /**
   * Sets the size of background images
   */
  backgroundSize?: ICSSRule | string;

  /**
   * Shorthand property that defines the different properties of all four sides of an
   * element's border in a single declaration. It can be used to set border-width,
   * border-style and border-color, or a subset of these.
   */
  border?: ICSSRule | 0 | string;

  /**
   * Shorthand that sets the values of border-bottom-color,
   * border-bottom-style, and border-bottom-width.
   */
  borderBottom?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the color of the bottom border of an element.
   */
  borderBottomColor?: ICSSRule | string;

  /**
   * Defines the shape of the border of the bottom-left corner.
   */
  borderBottomLeftRadius?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Defines the shape of the border of the bottom-right corner.
   */
  borderBottomRightRadius?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the line style of the bottom border of a box.
   */
  borderBottomStyle?: ICSSRule | string;

  /**
   * Sets the width of an element's bottom border. To set all four borders, use the
   * border-width shorthand property which sets the values simultaneously for
   * border-top-width, border-right-width, border-bottom-width, and border-left-width.
   */
  borderBottomWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Border-collapse can be used for collapsing the borders between table cells
   */
  borderCollapse?: ICSSRule | string;

  /**
   * The CSS border-color property sets the color of an element's four borders. This
   * property can have from one to four values, made up of the elementary properties:
   *      •       border-top-color
   *      •       border-right-color
   *      •       border-bottom-color
   *      •       border-left-color The default color is the currentColor of each of
   * these values.
   * If you provide one value, it sets the color for the element. Two values set the
   * horizontal and vertical values, respectively. Providing three values sets the top,
   * vertical, and bottom values, in that order. Four values set all for sides: top,
   * right, bottom, and left, in that order.
   */
  borderColor?: ICSSRule | string;

  /**
   * Specifies different corner clipping effects, such as scoop (inner curves), bevel
   * (straight cuts) or notch (cut-off rectangles). Works along with border-radius to
   * specify the size of each corner effect.
   */
  borderCornerShape?: ICSSRule | string;

  /**
   * The property border-image-source is used to set the image to be used instead of
   * the border style. If this is set to none the border-style is used instead.
   */
  borderImageSource?: ICSSRule | string;

  /**
   * The border-image-width CSS property defines the offset to use for dividing the
   * border image in nine parts, the top-left corner, central top edge, top-right-corner,
   * central right edge, bottom-right corner, central bottom edge, bottom-left corner,
   * and central right edge. They represent inward distance from the top, right, bottom,
   * and left edges.
   */
  borderImageWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Shorthand property that defines the border-width, border-style and border-color of
   * an element's left border in a single declaration. Note that you can use the
   * corresponding longhand properties to set specific individual properties of the left
   * border — border-left-width, border-left-style and border-left-color.
   */
  borderLeft?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The CSS border-left-color property sets the color of an element's left border. This
   *  page explains the border-left-color value, but often you will find it more
   * convenient to fix the border's left color as part of a shorthand set, either
   * border-left or border-color. Colors can be defined several ways. For more
   * information, see Usage.
   */
  borderLeftColor?: ICSSRule | string;

  /**
   * Sets the style of an element's left border. To set all four borders, use the
   * shorthand property, border-style. Otherwise, you can set the borders individually
   * with border-top-style, border-right-style, border-bottom-style, border-left-style.
   */
  borderLeftStyle?: ICSSRule | string;

  /**
   * Sets the width of an element's left border. To set all four borders, use the
   * border-width shorthand property which sets the values simultaneously for
   * border-top-width, border-right-width, border-bottom-width, and border-left-width.
   */
  borderLeftWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Defines how round the border's corners are.
   */
  borderRadius?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Shorthand property that defines the border-width, border-style and border-color of
   * an element's right border in a single declaration. Note that you can use the
   * corresponding longhand properties to set specific individual properties of the
   * right border — border-right-width, border-right-style and border-right-color.
   */
  borderRight?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the color of an element's right border. This page explains the
   * border-right-color value, but often you will find it more convenient to fix the
   * border's right color as part of a shorthand set, either border-right or border-color.
   * Colors can be defined several ways. For more information, see Usage.
   */
  borderRightColor?: ICSSRule | string;

  /**
   * Sets the style of an element's right border. To set all four borders, use the
   * shorthand property, border-style. Otherwise, you can set the borders individually
   * with border-top-style, border-right-style, border-bottom-style, border-left-style.
   */
  borderRightStyle?: ICSSRule | string;

  /**
   * Sets the width of an element's right border. To set all four borders, use the
   * border-width shorthand property which sets the values simultaneously for
   * border-top-width, border-right-width, border-bottom-width, and border-left-width.
   */
  borderRightWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Specifies the distance between the borders of adjacent cells.
   */
  borderSpacing?: ICSSRule | string;

  /**
   * Sets the style of an element's four borders. This property can have from one to
   * four values. With only one value, the value will be applied to all four borders;
   * otherwise, this works as a shorthand property for each of border-top-style,
   *  border-right-style, border-bottom-style, border-left-style, where each border
   *  style may be assigned a separate value.
   */
  borderStyle?: ICSSRule | string;

  /**
   * Shorthand property that defines the border-width, border-style and border-color of
   * an element's top border in a single declaration. Note that you can use the
   * corresponding longhand properties to set specific individual properties of the top
   * border — border-top-width, border-top-style and border-top-color.
   */
  borderTop?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the color of an element's top border. This page explains the border-top-color
   * value, but often you will find it more convenient to fix the border's top color as
   * part of a shorthand set, either border-top or border-color.
   * Colors can be defined several ways. For more information, see Usage.
   */
  borderTopColor?: ICSSRule | string;

  /**
   * Sets the rounding of the top-left corner of the element.
   */
  borderTopLeftRadius?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the rounding of the top-right corner of the element.
   */
  borderTopRightRadius?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the style of an element's top border. To set all four borders, use the
   * shorthand property, border-style. Otherwise, you can set the borders individually
   * with border-top-style, border-right-style, border-bottom-style, border-left-style.
   */
  borderTopStyle?: ICSSRule | string;

  /**
   * Sets the width of an element's top border. To set all four borders, use the
   * border-width shorthand property which sets the values simultaneously for
   * border-top-width, border-right-width, border-bottom-width, and border-left-width.
   */
  borderTopWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the width of an element's four borders. This property can have from one to
   * four values. This is a shorthand property for setting values simultaneously for
   * border-top-width, border-right-width, border-bottom-width, and border-left-width.
   */
  borderWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * This property specifies how far an absolutely positioned box's bottom margin edge
   * is offset above the bottom edge of the box's containing block. For relatively
   * positioned boxes, the offset is with respect to the bottom edges of the box itself
   * (i.e., the box is given a position in the normal flow, then offset from that
   * position according to these properties).
   */
  bottom?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Breaks a box into fragments creating new borders, padding and repeating backgrounds
   * or lets it stay as a continuous box on a page break, column break, or, for inline
   * elements, at a line break.
   */
  boxDecorationBreak?: ICSSRule | string;

  /**
   * Cast a drop shadow from the frame of almost any element.
   * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
   */
  boxShadow?: ICSSRule | string;

  /**
   * The CSS box-sizing property is used to alter the default CSS box model used to
   * calculate width and height of the elements.
   */
  boxSizing?: ICSSRule | 'border-box' | 'content-box' | string;

  /**
   * The CSS break-after property allows you to force a break on multi-column layouts.
   * More specifically, it allows you to force a break after an element. It allows you
   * to determine if a break should occur, and what type of break it should be. The
   * break-after CSS property describes how the page, column or region break behaves
   * after the generated box. If there is no generated box, the property is ignored.
   */
  breakAfter?: ICSSRule | string;

  /**
   * Control page/column/region breaks that fall above a block of content
   */
  breakBefore?: ICSSRule | string;

  /**
   * Control page/column/region breaks that fall within a block of content
   */
  breakInside?: ICSSRule | string;

  /**
   * The clear CSS property specifies if an element can be positioned next to or must be
   * positioned below the floating elements that precede it in the markup.
   */
  clear?: ICSSRule | string;

  /**
   * Clipping crops an graphic, so that only a portion of the graphic is rendered, or
   * filled. This clip-rule property, when used with the clip-path property, defines
   * which clip rule, or algorithm, to use when filling the different parts of a graphics.
   */
  clipRule?: ICSSRule | string;

  /**
   * The color property sets the color of an element's foreground content (usually text),
   * accepting any standard CSS color from keywords and hex values to RGB(a) and HSL(a).
   */
  color?: ICSSRule | string;

  /**
   * Describes the number of columns of the element.
   * See CSS 3 column-count property https://www.w3.org/TR/css3-multicol/#cc
   */
  columnCount?: ICSSRule | number | 'auto' | string;

  /**
   * Specifies how to fill columns (balanced or sequential).
   */
  columnFill?: ICSSRule | string;

  /**
   * The column-gap property controls the width of the gap between columns in multi-column
   * elements.
   */
  columnGap?: ICSSRule | string;

  /**
   * Sets the width, style, and color of the rule between columns.
   */
  columnRule?: ICSSRule | string;

  /**
   * Specifies the color of the rule between columns.
   */
  columnRuleColor?: ICSSRule | string;

  /**
   * Specifies the width of the rule between columns.
   */
  columnRuleWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The column-span CSS property makes it possible for an element to span across all
   * columns when its value is set to all. An element that spans more than one column
   * is called a spanning element.
   */
  columnSpan?: ICSSRule | string;

  /**
   * Specifies the width of columns in multi-column elements.
   */
  columnWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * This property is a shorthand property for setting column-width and/or column-count.
   */
  columns?: ICSSRule | string;

  /**
   * Content for pseudo selectors.
   */
  content?: string;

  /**
   * The counter-increment property accepts one or more names of counters (identifiers),
   * each one optionally followed by an integer which specifies the value by which the
   * counter should be incremented (e.g. if the value is 2, the counter increases by 2
   * each time it is invoked).
   */
  counterIncrement?: ICSSRule | string;

  /**
   * The counter-reset property contains a list of one or more names of counters, each
   * one optionally followed by an integer (otherwise, the integer defaults to 0.) Each
   * time the given element is invoked, the counters specified by the property are set to the given integer.
   */
  counterReset?: ICSSRule | string;

  /**
   * The cue property specifies sound files (known as an "auditory icon") to be played by
   * speech media agents before and after presenting an element's content; if only one
   * file is specified, it is played both before and after. The volume at which the
   * file(s) should be played, relative to the volume of the main element, may also be
   * specified. The icon files may also be set separately with the cue-before and
   * cue-after properties.
   */
  cue?: ICSSRule | string;

  /**
   * The cue-after property specifies a sound file (known as an "auditory icon") to be
   * played by speech media agents after presenting an element's content; the volume at
   * which the file should be played may also be specified. The shorthand property cue
   * sets cue sounds for both before and after the element is presented.
   */
  cueAfter?: ICSSRule | string;

  /**
   * Specifies the mouse cursor displayed when the mouse pointer is over an element.
   */
  cursor?: ICSSRule | string;

  /**
   * The direction CSS property specifies the text direction/writing direction. The rtl
   * is used for Hebrew or Arabic text, the ltr is for other languages.
   */
  direction?: ICSSRule | string;

  /**
   * This property specifies the type of rendering box used for an element. It is a
   * shorthand property for many other display properties.
   * W3: https://www.w3.org/TR/css-display-3/#the-display-properties
   * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
   */
  display?: ICSSRule | ICSSDisplayRule | string;

  /**
   * The ‘fill’ property paints the interior of the given graphical element. The area to
   * be painted consists of any areas inside the outline of the shape. To determine the
   * inside of the shape, all subpaths are considered, and the interior is determined
   * according to the rules associated with the current value of the ‘fill-rule’
   * property. The zero-width geometric outline of a shape is included in the area to be
   * painted.
   */
  fill?: ICSSRule | string;

  /**
   * SVG: Specifies the opacity of the color or the content the current object is filled
   * with.
   * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#FillOpacityProperty
   */
  fillOpacity?: ICSSRule | number;

  /**
   * The ‘fill-rule’ property indicates the algorithm which is to be used to determine
   * what parts of the canvas are included inside the shape. For a simple,
   * non-intersecting path, it is intuitively clear what region lies "inside"; however,
   * for a more complex path, such as a path that intersects itself or where one subpath
   * encloses another, the interpretation of "inside" is not so obvious.
   * The ‘fill-rule’ property provides two options for how the inside of a shape is
   * determined:
   */
  fillRule?: ICSSRule | string;

  /**
   * Applies various image processing effects. This property is largely unsupported. See
   * Compatibility section for more information.
   */
  filter?: ICSSRule | string;

  /**
   * Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
   */
  flex?: ICSSRule | string | number;

  /**
   * The flex-basis CSS property describes the initial main size of the flex item before
   * any free space is distributed according to the flex factors described in the flex
   * property (flex-grow and flex-shrink).
   */
  flexBasis?: ICSSRule | string | number;

  /**
   * The flex-direction CSS property describes how flex items are placed in the flex
   * container, by setting the direction of the flex container's main axis.
   */
  flexDirection?: ICSSRule | 'row' | 'row-reverse' | 'column' | 'column-reverse' | string;

  /**
   * The flex-flow CSS property defines the flex container's main and cross axis. It is
   * a shorthand property for the flex-direction and flex-wrap properties.
   */
  flexFlow?: ICSSRule | string;

  /**
   * Specifies the flex grow factor of a flex item.
   * See CSS flex-grow property https://drafts.csswg.org/css-flexbox-1/#flex-grow-property
   */
  flexGrow?: ICSSRule | number | string;

  /**
   * Specifies the flex shrink factor of a flex item.
   * See CSS flex-shrink property https://drafts.csswg.org/css-flexbox-1/#flex-shrink-property
   */
  flexShrink?: ICSSRule | number | string;

  /**
   * Specifies whether flex items are forced into a single line or can be wrapped onto
   * multiple lines. If wrapping is allowed, this property also enables you to control
   * the direction in which lines are stacked.
   * See CSS flex-wrap property https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property
   */
  flexWrap?: ICSSRule | 'nowrap' | 'wrap' | 'wrap-reverse' | string;

  /**
   * Elements which have the style float are floated horizontally. These elements can
   * move as far to the left or right of the containing element. All elements after
   * the floating element will flow around it, but elements before the floating element
   * are not impacted. If several floating elements are placed after each other, they
   * will float next to each other as long as there is room.
   */
  float?: ICSSRule | string;

  /**
   * Flows content from a named flow (specified by a corresponding flow-into) through
   * selected elements to form a dynamic chain of layout regions.
   */
  flowFrom?: ICSSRule | string;

  /**
   * The property which allows authors to opt particular elements out of forced colors mode,
   * restoring full control over the colors to CSS. Currently it's only supported in Edge Chromium.
   */
  forcedColorAdjust?: 'auto' | 'none' | string;

  /**
   * Lays out one or more grid items bound by 4 grid lines. Shorthand for setting
   * grid-column-start, grid-column-end, grid-row-start, and grid-row-end in a single
   * declaration.
   */
  gridArea?: ICSSRule | string;

  /**
   * Specifies the size of an implicitly-created grid column track
   */
  gridAutoColumns?: ICSSRule | string;

  /**
   * Controls how the auto-placement algorithm works,
   * specifying exactly how auto-placed items get flowed into the grid.
   */
  gridAutoFlow?: ICSSRule | string;

  /**
   * Specifies the size of an implicitly-created grid column track
   */
  gridAutoRows?: ICSSRule | string;

  /**
   * Controls a grid item's placement in a grid area, particularly grid position and a
   * grid span. Shorthand for setting grid-column-start and grid-column-end in a single
   * declaration.
   */
  gridColumn?: ICSSRule | string;

  /**
   * Controls a grid item's placement in a grid area as well as grid position and a
   * grid span. The grid-column-end property (with grid-row-start, grid-row-end, and
   * grid-column-start) determines a grid item's placement by specifying the grid lines
   * of a grid item's grid area.
   */
  gridColumnEnd?: ICSSRule | string;

  /**
   * Sets the size of the gap (gutter) between an element's columns
   */
  gridColumnGap?: ICSSRule | string;

  /**
   * Determines a grid item's placement by specifying the starting grid lines of a grid
   * item's grid area . A grid item's placement in a grid area consists of a grid
   * position and a grid span. See also ( grid-row-start, grid-row-end, and
   * grid-column-end)
   */
  gridColumnStart?: ICSSRule | string;

  /**
   * Specifies the gaps (gutters) between grid rows and columns. It is a shorthand
   * for grid-row-gap and grid-column-gap.
   */
  gridGap?: ICSSRule | string;

  /**
   * Gets or sets a value that indicates which row an element within a Grid should
   * appear in. Shorthand for setting grid-row-start and grid-row-end in a single
   * declaration.
   */
  gridRow?: ICSSRule | string;

  /**
   * Determines a grid item’s placement by specifying the block-end. A grid item's
   * placement in a grid area consists of a grid position and a grid span. The
   * grid-row-end property (with grid-row-start, grid-column-start, and grid-column-end)
   * determines a grid item's placement by specifying the grid lines of a grid item's
   * grid area.
   */
  gridRowEnd?: ICSSRule | string;

  /**
   * Sets the size of the gap (gutter) between an element's grid rows
   */
  gridRowGap?: ICSSRule | string;

  /**
   * Specifies a grid item’s start position within the grid row by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the
   * inline-start edge of its grid area
   */
  gridRowStart?: ICSSRule | string;

  /**
   * Specifies a row position based upon an integer location, string value, or desired
   * row size.
   * css/properties/grid-row is used as short-hand for grid-row-position and
   * grid-row-position
   */
  gridRowPosition?: ICSSRule | string;

  /**
   * Specifies named grid areas which are not associated with any particular grid item,
   * but can be referenced from the grid-placement properties. The syntax of the
   * grid-template-areas property also provides a visualization of the structure of the
   * grid, making the overall layout of the grid container easier to understand.
   */
  gridTemplate?: ICSSRule | string;

  /**
   * Specifies named grid areas
   */
  gridTemplateAreas?: ICSSRule | string;

  /**
   * Specifies (with grid-template-rows) the line names and track sizing functions of
   * the grid. Each sizing function can be specified as a length, a percentage of the
   * grid container’s size, a measurement of the contents occupying the column or row,
   * or a fraction of the free space in the grid.
   */
  gridTemplateColumns?: ICSSRule | string;

  /**
   * Specifies (with grid-template-columns) the line names and track sizing functions of
   * the grid. Each sizing function can be specified as a length, a percentage of the
   * grid container’s size, a measurement of the contents occupying the column or row,
   * or a fraction of the free space in the grid.
   */
  gridTemplateRows?: ICSSRule | string;

  /**
   * Sets the height of an element. The content area of the element height does not
   * include the padding, border, and margin of the element.
   */
  height?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Specifies the minimum number of characters in a hyphenated word
   */
  hyphenateLimitChars?: ICSSRule | string;

  /**
   * Indicates the maximum number of successive hyphenated lines in an element. The
   * ‘no-limit’ value means that there is no limit.
   */
  hyphenateLimitLines?: ICSSRule | string;

  /**
   * Specifies the maximum amount of trailing whitespace (before justification) that may
   * be left in a line before hyphenation is triggered to pull part of a word from the
   * next line back up into the current one.
   */
  hyphenateLimitZone?: ICSSRule | string;

  /**
   * Specifies whether or not words in a sentence can be split by the use of a manual or
   * automatic hyphenation mechanism.
   */
  hyphens?: ICSSRule | string;

  /**
   * Defines how the browser distributes space between and around flex items
   * along the main-axis of their container.
   *
   * See CSS justify-content property
   * https://www.w3.org/TR/css-flexbox-1/#justify-content-property
   */
  justifyContent?:
    | ICSSRule
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | string;

  /**
   * This property specifies the default justify-self for all of the child boxes (including anonymous boxes)
   * participating in this box’s formatting context.
   *
   * See CSS jusitfy-items property
   * https://www.w3.org/TR/css-align-3/#justify-items-property
   */
  justifyItems?:
    | ICSSRule
    | 'normal'
    | 'stretch'
    | ICSSBaselinePositionRule
    | ICSSOverflowAndSelfPositionRule
    | 'left'
    | 'right'
    // prefixed with <overflow-position> value 'safe'
    | 'safe left'
    | 'safe right'
    // prefixed with <overflow-position> value 'unsafe'
    | 'unsafe left'
    | 'unsafe right'
    // legacy values
    | 'legacy'
    | 'legacy left'
    | 'legacy right'
    | 'legacy center'
    | string;

  /**
   * Justifies the box (as the alignment subject) within its containing block (as the alignment container)
   * along the inline/row/main axis of the alignment container.
   *
   * See CSS jusitfy-self property
   * https://www.w3.org/TR/css-align-3/#propdef-justify-self
   */
  justifySelf?:
    | ICSSRule
    | 'auto'
    | 'normal'
    | 'stretch'
    | ICSSBaselinePositionRule
    | ICSSOverflowAndSelfPositionRule
    | 'left'
    | 'right'
    // prefixed with <overflow-position> value 'safe'
    | 'safe left'
    | 'safe right'
    // prefixed with <overflow-position> value 'unsafe'
    | 'unsafe left'
    | 'unsafe right'
    | string;

  /**
   * Sets the left position of an element relative to the nearest ancestor that is set
   * to position absolute, relative, or fixed.
   */
  left?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The letter-spacing CSS property specifies the spacing behavior between text
   * characters.
   */
  letterSpacing?: ICSSRule | string;

  /**
   * Specifies the height of an inline block level element.
   * See CSS 2.1 line-height property https://www.w3.org/TR/CSS21/visudet.html#propdef-line-height
   */
  lineHeight?: ICSSRule | 'normal' | ICSSPixelUnitRule | ICSSPercentageRule;

  /**
   * Shorthand property that sets the list-style-type, list-style-position and
   * list-style-image properties in one declaration.
   */
  listStyle?: ICSSRule | string;

  /**
   * This property sets the image that will be used as the list item marker. When the
   * image is available, it will replace the marker set with the 'list-style-type'
   * marker. That also means that if the image is not available, it will show the style
   * specified by list-style-property
   */
  listStyleImage?: ICSSRule | string;

  /**
   * Specifies if the list-item markers should appear inside or outside the content flow.
   */
  listStylePosition?: ICSSRule | string;

  /**
   * Specifies the type of list-item marker in a list.
   */
  listStyleType?: ICSSRule | string;

  /**
   * The margin property is shorthand to allow you to set all four margins of an element
   * at once. Its equivalent longhand properties are margin-top, margin-right,
   * margin-bottom and margin-left. Negative values are also allowed.
   */
  margin?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The margin-block-end CSS property defines the logical block end margin of an element, which maps to a physical
   * margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the
   * margin-top, margin-right, margin-bottom or margin-left property depending on the values defined for writing-mode,
   * direction, and text-orientation.
   */
  marginBlockEnd?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The margin-block-start CSS property defines the logical block start margin of an element, which maps to a physical
   * margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the
   * margin-top, margin-right, margin-bottom or margin-left property depending on the values defined for writing-mode,
   * direction, and text-orientation.
   */
  marginBlockStart?: ICSSRule | ICSSPixelUnitRule;

  /**
   * margin-bottom sets the bottom margin of an element.
   */
  marginBottom?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The margin-inline-end CSS property defines the logical inline end margin of an element, which maps to a physical
   * margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the
   * margin-top, margin-right, margin-bottom or margin-left property depending on the values defined for writing-mode,
   * direction, and text-orientation.
   */
  marginInlineEnd?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The margin-inline-start CSS property defines the logical inline start margin of an element, which maps to a
   * physical margin depending on the element's writing mode, directionality, and text orientation. It corresponds to
   * the margin-top, margin-right, margin-bottom, or margin-left property depending on the values defined for
   * writing-mode, direction, and text-orientation.
   */
  marginInlineStart?: ICSSRule | ICSSPixelUnitRule;

  /**
   * margin-left sets the left margin of an element.
   */
  marginLeft?: ICSSRule | ICSSPixelUnitRule;

  /**
   * margin-right sets the right margin of an element.
   */
  marginRight?: ICSSRule | ICSSPixelUnitRule;

  /**
   * margin-top sets the top margin of an element.
   */
  marginTop?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The marquee-direction determines the initial direction in which the marquee content moves.
   */
  marqueeDirection?: ICSSRule | string;

  /**
   * The 'marquee-style' property determines a marquee's scrolling behavior.
   */
  marqueeStyle?: ICSSRule | string;

  /**
   * This property is shorthand for setting mask-image, mask-mode, mask-repeat,
   * mask-position, mask-clip, mask-origin, mask-composite and mask-size. Omitted
   * values are set to their original properties' initial values.
   */
  mask?: ICSSRule | string;

  /**
   * This property is shorthand for setting mask-border-source, mask-border-slice,
   * mask-border-width, mask-border-outset, and mask-border-repeat. Omitted values
   * are set to their original properties' initial values.
   */
  maskBorder?: ICSSRule | string;

  /**
   * This property specifies how the images for the sides and the middle part of the
   * mask image are scaled and tiled. The first keyword applies to the horizontal
   * sides, the second one applies to the vertical ones. If the second keyword is
   * absent, it is assumed to be the same as the first, similar to the CSS
   * border-image-repeat property.
   */
  maskBorderRepeat?: ICSSRule | string;

  /**
   * This property specifies inward offsets from the top, right, bottom, and left
   * edges of the mask image, dividing it into nine regions: four corners, four
   * edges, and a middle. The middle image part is discarded and treated as fully
   * transparent black unless the fill keyword is present. The four values set the
   * top, right, bottom and left offsets in that order, similar to the CSS
   * border-image-slice property.
   */
  maskBorderSlice?: ICSSRule | string;

  /**
   * Specifies an image to be used as a mask. An image that is empty, fails to
   * download, is non-existent, or cannot be displayed is ignored and does not mask
   * the element.
   */
  maskBorderSource?: ICSSRule | string;

  /**
   * This property sets the width of the mask box image, similar to the CSS
   * border-image-width property.
   */
  maskBorderWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Determines the mask painting area, which defines the area that is affected by
   * the mask. The painted content of an element may be restricted to this area.
   */
  maskClip?: ICSSRule | string;

  /**
   * For elements rendered as a single box, specifies the mask positioning area. For
   * elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes
   * on several pages) specifies which boxes box-decoration-break operates on to
   * determine the mask positioning area(s).
   */
  maskOrigin?: ICSSRule | string;

  /**
   * This property must not be used. It is no longer included in any standard or
   * standard track specification, nor is it implemented in any browser. It is only
   * used when the text-align-last property is set to size. It controls allowed
   * adjustments of font-size to fit line content.
   */
  maxFontSize?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the maximum height for an element. It prevents the height of the element to
   *  exceed the specified value. If min-height is specified and is greater than
   * max-height, max-height is overridden.
   */
  maxHeight?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the maximum width for an element. It limits the width property to be larger
   * than the value specified in max-width.
   */
  maxWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the minimum height for an element. It prevents the height of the element to
   * be smaller than the specified value. The value of min-height overrides both
   * max-height and height.
   */
  minHeight?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the minimum width of an element. It limits the width property to be not
   * smaller than the value specified in min-width.
   */
  minWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The mix-blend-mode CSS property describes how an element's content should blend
   * with the content of the element's direct parent and the element's background.
   */
  mixBlendMode?: ICSSRule | IMixBlendModes | string;

  /**
   * The ‘object-fit’ property specifies how the contents of a replaced element should
   * be fitted to the box established by its used height and width.
   * See CSS 3 object-fit property https://www.w3.org/TR/css3-images/#the-object-fit
   */
  objectFit?: ICSSRule | 'cover' | 'contain' | 'fill' | 'none' | string;

  /**
   * Specifies the transparency of an element.
   * See CSS 3 opacity property https://drafts.csswg.org/css-color-3/#opacity
   */
  opacity?: ICSSRule | number | string;

  /**
   * Specifies the order used to lay out flex items in their flex container.
   * Elements are laid out in the ascending order of the order value.
   * See CSS order property https://drafts.csswg.org/css-flexbox-1/#order-property
   */
  order?: ICSSRule | number | string;

  /**
   * In paged media, this property defines the minimum number of lines in
   * a block container that must be left at the bottom of the page.
   * See CSS 3 orphans, widows properties https://drafts.csswg.org/css-break-3/#widows-orphans
   */
  orphans?: ICSSRule | number | string;

  /**
   * The CSS outline property is a shorthand property for setting one or more of the
   * individual outline properties outline-style, outline-width and outline-color in a
   * single rule. In most cases the use of this shortcut is preferable and more
   * convenient.
   * Outlines differ from borders in the following ways:
   *      •       Outlines do not take up space, they are drawn above the content.
   *      •       Outlines may be non-rectangular. They are rectangular in
   * Gecko/Firefox. Internet Explorer attempts to place the smallest contiguous outline
   * around all elements or shapes that are indicated to have an outline. Opera draws a
   * non-rectangular shape around a construct.
   */
  outline?: ICSSRule | 0 | string;

  /**
   * The outline-color property sets the color of the outline of an element. An
   * outline is a line that is drawn around elements, outside the border edge, to make
   * the element stand out.
   */
  outlineColor?: ICSSRule | string;

  /**
   * The outline-offset property offsets the outline and draw it beyond the border edge.
   */
  outlineOffset?: ICSSRule | string;

  /**
   * The overflow property controls how extra content exceeding the bounding box of an
   * element is rendered. It can be used in conjunction with an element that has a
   * fixed width and height, to eliminate text-induced page distortion.
   */
  overflow?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';

  /**
   * Specifies the preferred scrolling methods for elements that overflow.
   */
  overflowStyle?: ICSSRule | string;

  /**
   * Specifies whether or not the browser should insert line breaks within words to
   * prevent text from overflowing its content box. In contrast to word-break,
   * overflow-wrap will only create a break if an entire word cannot be placed on its
   * own line without overflowing.
   */
  overflowWrap?: ICSSRule | 'normal' | 'break-word' | string;

  /**
   * Controls how extra content exceeding the x-axis of the bounding box of an element
   * is rendered.
   */
  overflowX?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible' | string;

  /**
   * Controls how extra content exceeding the y-axis of the bounding box of an element
   * is rendered.
   */
  overflowY?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible' | string;

  /**
   * The padding optional CSS property sets the required padding space on one to four
   * sides of an element. The padding area is the space between an element and its
   * border. Negative values are not allowed but decimal values are permitted. The
   *  element size is treated as fixed, and the content of the element shifts toward the
   * center as padding is increased. The padding property is a shorthand to avoid
   * setting each side separately (padding-top, padding-right, padding-bottom,
   * padding-left).
   */
  padding?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-block-end CSS property defines the logical block end padding
   * of an element, which maps to a physical padding depending on the element's
   * writing mode, directionality, and text orientation. It corresponds to the
   * padding-top, padding-right, padding-bottom, or padding-left property
   * depending on the values defined for writing-mode, direction, and text-orientation.
   */
  paddingBlockEnd?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-block-start CSS property defines the logical block start padding
   * of an element, which maps to a physical padding depending on the element's
   * writing mode, directionality, and text orientation. It corresponds to the
   * padding-top, padding-right, padding-bottom, or padding-left property depending
   * on the values defined for writing-mode, direction, and text-orientation.
   */
  paddingBlockStart?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-left CSS property of an element sets the padding space required on the
   * left side of an element. The padding area is the space between the content of the
   * element and its border. Contrary to margin-left values, negative values of
   * padding-left are invalid.
   */
  paddingLeft?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-bottom CSS property of an element sets the padding space required on
   * the bottom of an element. The padding area is the space between the content of the
   * element and its border. Contrary to margin-bottom values, negative values of
   * padding-bottom are invalid.
   */
  paddingBottom?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-inline-end CSS property defines the logical inline end padding of an element,
   * which maps to a physical padding depending on the element's writing mode, directionality,
   * and text orientation. It corresponds to the padding-top, padding-right, padding-bottom,
   * or padding-left property depending on the values defined for writing-mode, direction,
   * and text-orientation.
   */
  paddingInlineEnd?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-inline-start CSS property defines the logical inline start padding of
   * an element, which maps to a physical padding depending on the element's writing mode,
   * directionality, and text orientation. It corresponds to the padding-top, padding-right,
   * padding-bottom, or padding-left property depending on the values defined for writing-mode,
   * direction, and text-orientation.
   */
  paddingInlineStart?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-right CSS property of an element sets the padding space required on the
   * right side of an element. The padding area is the space between the content of the
   * element and its border. Contrary to margin-right values, negative values of
   * padding-right are invalid.
   */
  paddingRight?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The padding-top CSS property of an element sets the padding space required on the
   * top of an element. The padding area is the space between the content of the element
   * and its border. Contrary to margin-top values, negative values of padding-top are
   * invalid.
   */
  paddingTop?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The page-break-after property is supported in all major browsers. With CSS3,
   *  page-break-* properties are only aliases of the break-* properties. The CSS3
   * Fragmentation spec defines breaks for all CSS box fragmentation.
   */
  pageBreakAfter?: ICSSRule | string;

  /**
   * The page-break-before property sets the page-breaking behavior before an element.
   * With CSS3, page-break-* properties are only aliases of the break-* properties. The
   * CSS3 Fragmentation spec defines breaks for all CSS box fragmentation.
   */
  pageBreakBefore?: ICSSRule | string;

  /**
   * Sets the page-breaking behavior inside an element. With CSS3, page-break-*
   * properties are only aliases of the break-* properties. The CSS3 Fragmentation spec
   * defines breaks for all CSS box fragmentation.
   */
  pageBreakInside?: ICSSRule | string;

  /**
   * The pause property determines how long a speech media agent should pause before and
   * after presenting an element. It is a shorthand for the pause-before and pause-after
   *  properties.
   */
  pause?: ICSSRule | string;

  /**
   * The pause-after property determines how long a speech media agent should pause after
   * presenting an element. It may be replaced by the shorthand property pause, which
   * sets pause time before and after.
   */
  pauseAfter?: ICSSRule | string;

  /**
   * The pause-before property determines how long a speech media agent should pause
   * before presenting an element. It may be replaced by the shorthand property pause,
   * which sets pause time before and after.
   */
  pauseBefore?: ICSSRule | string;

  /**
   * The perspective property defines how far an element is placed from the view on the
   * z-axis, from the screen to the viewer. Perspective defines how an object is viewed.
   * In graphic arts, perspective is the representation on a flat surface of what the
   * viewer's eye would see in a 3D space. (See Wikipedia for more information about
   * graphical perspective and for related illustrations.)
   * The illusion of perspective on a flat surface, such as a computer screen, is created
   * by projecting points on the flat surface as they would appear if the flat surface
   * were a window through which the viewer was looking at the object. In discussion of
   * virtual environments, this flat surface is called a projection plane.
   */
  perspective?: ICSSRule | string;

  /**
   * The perspective-origin property establishes the origin for the perspective property.
   * It effectively sets the X and Y position at which the viewer appears to be looking
   * at the children of the element.
   * When used with perspective, perspective-origin changes the appearance of an object,
   * as if a viewer were looking at it from a different origin. An object appears
   * differently if a viewer is looking directly at it versus looking at it from below,
   * above, or from the side. Thus, the perspective-origin is like a vanishing point.
   * The default value of perspective-origin is 50% 50%. This displays an object as if
   * the viewer's eye were positioned directly at the center of the screen, both
   * top-to-bottom and left-to-right. A value of 0% 0% changes the object as if the
   * viewer was looking toward the top left angle. A value of 100% 100% changes the
   * appearance as if viewed toward the bottom right angle.
   */
  perspectiveOrigin?: ICSSRule | string;

  /**
   * This shorthand property sets both the align-content and justify-content properties in one declaration.
   * The first value is assigned to align-content. The second value is assigned to justify-content; if omitted, it is
   * copied from the first value, unless that value is a <baseline-position> in which case it is defaulted to start.
   *
   * See CSS place-content property
   * https://www.w3.org/TR/css-align-3/#place-content
   */
  placeContent?:
    | ICSSRule
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | ICSSOverflowAndSelfPositionRule
    | string;

  /**
   * This shorthand property sets both the align-items and justify-items properties in a single declaration.
   * The first value is assigned to align-items. The second value is assigned to justify-items; if omitted, it is
   * copied from the first value.
   *
   * See CSS place-items property
   * https://www.w3.org/TR/css-align-3/#place-items-property
   */
  placeItems?: ICSSRule | 'normal' | 'stretch' | ICSSBaselinePositionRule | ICSSOverflowAndSelfPositionRule | string;

  /**
   * This shorthand property sets both the align-self and justify-self properties in a single declaration.
   * The first value is assigned to align-self. The second value is assigned to justify-self; if omitted, it is copied
   * from the first value.
   *
   * See CSS place-self property
   * https://www.w3.org/TR/css-align-3/#place-self-property
   */
  placeSelf?:
    | ICSSRule
    | 'auto'
    | 'normal'
    | 'stretch'
    | ICSSBaselinePositionRule
    | ICSSOverflowAndSelfPositionRule
    | string;

  /**
   * The pointer-events property allows you to control whether an element can be the
   * target for the pointing device (e.g, mouse, pen) events.
   */
  pointerEvents?: ICSSRule | string;

  /**
   * The position property controls the type of positioning used by an element within
   * its parent elements. The effect of the position property depends on a lot of
   * factors, for example the position property of parent elements.
   */
  position?: ICSSRule | 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

  /**
   * Sets the type of quotation marks for embedded quotations.
   */
  quotes?: ICSSRule | string;

  /**
   * Controls whether the last region in a chain displays additional 'overset' content
   * according its default overflow property, or if it displays a fragment of content
   * as if it were flowing into a subsequent region.
   */
  regionFragment?: ICSSRule | string;

  /**
   * The resize CSS sets whether an element is resizable, and if so, in which direction(s).
   */

  resize?: ICSSRule | 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | string;

  /**
   * The rest-after property determines how long a speech media agent should pause after
   * presenting an element's main content, before presenting that element's exit cue
   * sound. It may be replaced by the shorthand property rest, which sets rest time
   * before and after.
   */
  restAfter?: ICSSRule | string;

  /**
   * The rest-before property determines how long a speech media agent should pause after
   * presenting an intro cue sound for an element, before presenting that element's main
   * content. It may be replaced by the shorthand property rest, which sets rest time
   * before and after.
   */
  restBefore?: ICSSRule | string;

  /**
   * Specifies the position an element in relation to the right side of the containing
   * element.
   */
  right?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Defines the alpha channel threshold used to extract a shape from an image. Can be
   * thought of as a "minimum opacity" threshold; that is, a value of 0.5 means that the
   * shape will enclose all the pixels that are more than 50% opaque.
   */
  shapeImageThreshold?: ICSSRule | string;

  /**
   * A future level of CSS Shapes will define a shape-inside property, which will define
   * a shape to wrap content within the element. See Editor's Draft
   * http://dev.w3.org/csswg/css-shapes and CSSWG wiki page on next-level plans
   * http://wiki.csswg.org/spec/css-shapes
   */
  shapeInside?: ICSSRule | string;

  /**
   * Adds a margin to a shape-outside. In effect, defines a new shape that is the
   * smallest contour around all the points that are the shape-margin distance outward
   * perpendicular to each point on the underlying shape. For points where a
   * perpendicular direction is not defined (e.g., a triangle corner), takes all
   * points on a circle centered at the point and with a radius of the shape-margin
   * distance. This property accepts only non-negative values.
   */
  shapeMargin?: ICSSRule | string;

  /**
   * Declares a shape around which text should be wrapped, with possible modifications
   * from the shape-margin property. The shape defined by shape-outside and shape-margin
   * changes the geometry of a float element's float area.
   */
  shapeOutside?: ICSSRule | string;

  /**
   * The speak property determines whether or not a speech synthesizer will read aloud
   * the contents of an element.
   */
  speak?: ICSSRule | string;

  /**
   * The speak-as property determines how the speech synthesizer interprets the content:
   * words as whole words or as a sequence of letters, numbers as a numerical value or a
   * sequence of digits, punctuation as pauses in speech or named punctuation characters.
   */
  speakAs?: ICSSRule | string;

  /**
   * The stroke property in CSS is for adding a border to SVG shapes.
   * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#Stroke
   */
  stroke?: ICSSRule | string;

  /**
   * SVG: The stroke-linecap attribute defines the shape to be used at the end of open subpaths when they are stroked.
   * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#LineCaps
   */
  strokeLinecap?: ICSSRule | 'butt' | 'round' | 'square' | string;

  /**
   * SVG: Specifies the opacity of the outline on the current object.
   * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#StrokeOpacityProperty
   */
  strokeOpacity?: ICSSRule | number | string;

  /**
   * SVG: Specifies the width of the outline on the current object.
   * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#StrokeWidthProperty
   */
  strokeWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The tab-size CSS property is used to customise the width of a tab (U+0009) character.
   */
  tabSize?: ICSSRule | string;

  /**
   * The 'table-layout' property controls the algorithm used to lay out the table cells, rows, and columns.
   */
  tableLayout?: ICSSRule | string;

  /**
   * The text-align CSS property describes how inline content like text is aligned in its
   * parent block element. text-align does not control the alignment of block elements
   * itself, only their inline content.
   */
  textAlign?: ICSSRule | string;

  /**
   * The text-align-last CSS property describes how the last line of a block element or
   * a line before line break is aligned in its parent block element.
   */
  textAlignLast?: ICSSRule | string;

  /**
   * The text-decoration CSS property is used to set the text formatting to underline,
   * overline, line-through or blink. underline and overline decorations are positioned
   * under the text, line-through over it.
   */
  textDecoration?: ICSSRule | string;

  /**
   * Sets the color of any text decoration, such as underlines, overlines, and strike
   * throughs.
   */
  textDecorationColor?: ICSSRule | string;

  /**
   * Sets what kind of line decorations are added to an element, such as underlines,
   * overlines, etc.
   */
  textDecorationLine?: ICSSRule | string;

  /**
   * Specifies what parts of an element’s content are skipped over when applying any
   * text decoration.
   */
  textDecorationSkip?: ICSSRule | string;

  /**
   * This property specifies the style of the text decoration line drawn on the
   * specified element. The intended meaning for the values are the same as those of
   * the border-style-properties.
   */
  textDecorationStyle?: ICSSRule | string;

  /**
   * The text-emphasis property will apply special emphasis marks to the elements text.
   * Slightly similar to the text-decoration property only that this property can have
   * affect on the line-height. It also is noted that this is shorthand for
   * text-emphasis-style and for text-emphasis-color.
   */
  textEmphasis?: ICSSRule | string;

  /**
   * The text-emphasis-color property specifies the foreground color of the emphasis
   * marks.
   */
  textEmphasisColor?: ICSSRule | string;

  /**
   * The text-emphasis-style property applies special emphasis marks to an element's
   * text.
   */
  textEmphasisStyle?: ICSSRule | string;

  /**
   * This property helps determine an inline box's block-progression dimension, derived
   * from the text-height and font-size properties for non-replaced elements, the height
   * or the width for replaced elements, and the stacked block-progression dimension for
   * inline-block elements. The block-progression dimension determines the position of
   * the padding, border and margin for the element.
   */
  textHeight?: ICSSRule | string;

  /**
   * Specifies the amount of space horizontally that should be left on the first line of
   * the text of an element. This horizontal spacing is at the beginning of the first
   * line and is in respect to the left edge of the containing block box.
   */
  textIndent?: ICSSRule | string;

  /**
   * The text-overflow shorthand CSS property determines how overflowed content that is
   * not displayed is signaled to the users. It can be clipped, display an ellipsis
   * ('…', U+2026 HORIZONTAL ELLIPSIS) or a Web author-defined string. It covers the
   * two long-hand properties text-overflow-mode and text-overflow-ellipsis
   */
  textOverflow?: ICSSRule | string;

  /**
   * The text-overline property is the shorthand for the text-overline-style,
   * text-overline-width, text-overline-color, and text-overline-mode properties.
   */
  textOverline?: ICSSRule | string;

  /**
   * Specifies the line color for the overline text decoration.
   */
  textOverlineColor?: ICSSRule | string;

  /**
   * Sets the mode for the overline text decoration, determining whether the text
   * decoration affects the space characters or not.
   */
  textOverlineMode?: ICSSRule | string;

  /**
   * Specifies the line style for overline text decoration.
   */
  textOverlineStyle?: ICSSRule | string;

  /**
   * Specifies the line width for the overline text decoration.
   */
  textOverlineWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The text-rendering CSS property provides information to the browser about how to
   * optimize when rendering text. Options are: legibility, speed or geometric precision.
   */
  textRendering?: ICSSRule | string;

  /**
   * The CSS text-shadow property applies one or more drop shadows to the text and
   * `<text-decorations>` of an element. Each shadow is specified as an offset from the
   * text, along with optional color and blur radius values.
   */
  textShadow?: ICSSRule | string;

  /**
   * The text-size-adjust CSS property controls the text inflation algorithm used
   * on some smartphones and tablets. Other browsers will ignore this property.
   */
  textSizeAdjust?: 'none' | 'auto' | ICSSPercentageRule | ICSSRule;

  /**
   * This property transforms text for styling purposes. (It has no effect on the
   * underlying content.)
   */
  textTransform?: ICSSRule | string;

  /**
   * Unsupported.
   * This property will add a underline position value to the element that has an
   * underline defined.
   */
  textUnderlinePosition?: ICSSRule | string;

  /**
   * After review this should be replaced by text-decoration should it not?
   * This property will set the underline style for text with a line value for
   * underline, overline, and line-through.
   */
  textUnderlineStyle?: ICSSRule | string;

  /**
   * This property specifies how far an absolutely positioned box's top margin edge is
   * offset below the top edge of the box's containing block. For relatively positioned
   * boxes, the offset is with respect to the top edges of the box itself (i.e., the box
   * is given a position in the normal flow, then offset from that position according to
   * these properties).
   */
  top?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Determines whether touch input may trigger default behavior supplied by the user
   * agent, such as panning or zooming.
   */
  touchAction?: ICSSRule | string;

  /**
   * CSS transforms allow elements styled with CSS to be transformed in two-dimensional
   * or three-dimensional space. Using this property, elements can be translated,
   * rotated, scaled, and skewed. The value list may consist of 2D and/or 3D transform
   * values.
   */
  transform?: ICSSRule | string;

  /**
   * This property defines the origin of the transformation axes relative to the element
   * to which the transformation is applied.
   */
  transformOrigin?: ICSSRule | string;

  /**
   * This property allows you to define the relative position of the origin of the
   * transformation grid along the z-axis.
   */
  transformOriginZ?: ICSSRule | string;

  /**
   * This property specifies how nested elements are rendered in 3D space relative to their parent.
   */
  transformStyle?: ICSSRule | string;

  /**
   * The transition CSS property is a shorthand property for transition-property,
   * transition-duration, transition-timing-function, and transition-delay. It allows to
   * define the transition between two states of an element.
   */
  transition?: ICSSRule | string;

  /**
   * Defines when the transition will start. A value of ‘0s’ means the transition will
   * execute as soon as the property is changed. Otherwise, the value specifies an
   * offset from the moment the property is changed, and the transition will delay
   * execution by that offset.
   */
  transitionDelay?: ICSSRule | string;

  /**
   * The 'transition-duration' property specifies the length of time a transition
   * animation takes to complete.
   */
  transitionDuration?: ICSSRule | string;

  /**
   * The 'transition-property' property specifies the name of the CSS property to which
   * the transition is applied.
   */
  transitionProperty?: ICSSRule | string;

  /**
   * Sets the pace of action within a transition
   */
  transitionTimingFunction?: ICSSRule | string;

  /**
   * The unicode-bidi CSS property specifies the level of embedding with respect to the bidirectional algorithm.
   */
  unicodeBidi?: ICSSRule | string;

  /**
   * This is for all the high level UX stuff.
   */
  userFocus?: ICSSRule | string;

  /**
   * For inputting user content
   */
  userInput?: ICSSRule | string;

  /**
   * Defines the text selection behavior.
   */
  userSelect?: ICSSRule | 'none' | 'auto' | 'text' | 'all' | 'contain' | string;

  /**
   * The vertical-align property controls how inline elements or text are vertically
   * aligned compared to the baseline. If this property is used on table-cells it
   * controls the vertical alignment of content of the table cell.
   */
  verticalAlign?: ICSSRule | string;

  /**
   * The visibility property specifies whether the boxes generated by an element are rendered.
   */
  visibility?: ICSSRule | string;

  /**
   * The voice-balance property sets the apparent position (in stereo sound) of the synthesized voice for spoken media.
   */
  voiceBalance?: ICSSRule | string;

  /**
   * The voice-duration property allows the author to explicitly set the amount of time
   * it should take a speech synthesizer to read an element's content, for example to
   * allow the speech to be synchronized with other media. With a value of auto (the
   * default) the length of time it takes to read the content is determined by the
   * content itself and the voice-rate property.
   */
  voiceDuration?: ICSSRule | string;

  /**
   * The voice-family property sets the speaker's voice used by a speech media agent to
   * read an element. The speaker may be specified as a named character (to match a
   * voice option in the speech reading software) or as a generic description of the
   * age and gender of the voice. Similar to the font-family property for visual media,
   * a comma-separated list of fallback options may be given in case the speech reader
   * does not recognize the character name or cannot synthesize the requested combination
   * of generic properties.
   */
  voiceFamily?: ICSSRule | string;

  /**
   * The voice-pitch property sets pitch or tone (high or low) for the synthesized speech
   * when reading an element; the pitch may be specified absolutely or relative to the
   * normal pitch for the voice-family used to read the text.
   */
  voicePitch?: ICSSRule | string;

  /**
   * The voice-range property determines how much variation in pitch or tone will be
   * created by the speech synthesize when reading an element. Emphasized text,
   * grammatical structures and punctuation may all be rendered as changes in pitch,
   * this property determines how strong or obvious those changes are; large ranges are
   * associated with enthusiastic or emotional speech, while small ranges are associated
   * with flat or mechanical speech.
   */
  voiceRange?: ICSSRule | string;

  /**
   * The voice-rate property sets the speed at which the voice synthesized by a speech
   * media agent will read content.
   */
  voiceRate?: ICSSRule | string;

  /**
   * The voice-stress property sets the level of vocal emphasis to be used for
   * synthesized speech reading the element.
   */
  voiceStress?: ICSSRule | string;

  /**
   * The voice-volume property sets the volume for spoken content in speech media. It
   * replaces the deprecated volume property.
   */
  voiceVolume?: ICSSRule | string;

  /**
   * The white-space property controls whether and how white space inside the element is
   * collapsed, and whether lines may wrap at unforced "soft wrap" opportunities.
   */
  whiteSpace?: ICSSRule | string;

  /**
   * In paged media, this property defines the mimimum number of lines that must be left
   * at the top of the second page.
   * See CSS 3 orphans, widows properties
   * https://drafts.csswg.org/css-break-3/#widows-orphans
   */
  widows?: ICSSRule | number | string;

  /**
   * Specifies the width of the content area of an element. The content area of the element
   * width does not include the padding, border, and margin of the element.
   */
  width?: ICSSRule | ICSSPixelUnitRule;

  /**
   * The word-break property is often used when there is long generated content that is
   * strung together without and spaces or hyphens to beak apart. A common case of this
   * is when there is a long URL that does not have any hyphens. This case could
   * potentially cause the breaking of the layout as it could extend past the parent
   * element.
   */
  wordBreak?: ICSSRule | string;

  /**
   * The word-spacing CSS property specifies the spacing behavior between "words".
   */
  wordSpacing?: ICSSRule | string;

  /**
   * An alias of css/properties/overflow-wrap, word-wrap defines whether to break
   * words when the content exceeds the boundaries of its container.
   */
  wordWrap?: ICSSRule | string;

  /**
   * Specifies how exclusions affect inline content within block-level elements. Elements
   * lay out their inline content in their content area but wrap around exclusion areas.
   */
  wrapFlow?: ICSSRule | string;

  /**
   * Set the value that is used to offset the inner wrap shape from other shapes. Inline
   * content that intersects a shape with this property will be pushed by this shape's
   * margin.
   */
  wrapMargin?: ICSSRule | string;

  /**
   * writing-mode specifies if lines of text are laid out horizontally or vertically,
   * and the direction which lines of text and blocks progress.
   */
  writingMode?: ICSSRule | string;

  /**
   * The z-index property specifies the z-order of an element and its descendants.
   * When elements overlap, z-order determines which one covers the other.
   * See CSS 2 z-index property https://www.w3.org/TR/CSS2/visuren.html#z-index
   */
  zIndex?: ICSSRule | 'auto' | number | string;

  /**
   * Sets the initial zoom factor of a document defined by `@viewport`.
   * See CSS zoom descriptor https://drafts.csswg.org/css-device-adapt/#zoom-desc
   */
  zoom?: ICSSRule | 'auto' | number | ICSSPercentageRule;
}
