# Typography

Typography style is represented by a set of tokens instead of an individual token. The tokens are used to create and share a consistent look and feel.

> **ℹ️  This page guides you on how to fully leverage the tokens to create a consistent typography system.  
> To take full advantage of the typography system, you should also read the [Text component documentation](./?path=/docs/components-text--docs).**

NameTokensDefault ValuesExamplecaption2

fontFamilyBase

fontSizeBase100

fontWeightRegular

lineHeightBase100

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 10px

fontWeight: 400

lineHeight: 14px

Caption 2caption2Strong

fontFamilyBase

fontSizeBase100

fontWeightSemibold

lineHeightBase100

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 10px

fontWeight: 600

lineHeight: 14px

Caption 2 Strongcaption1

fontFamilyBase

fontSizeBase200

fontWeightRegular

lineHeightBase200

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 12px

fontWeight: 400

lineHeight: 16px

Caption 1caption1Strong

fontFamilyBase

fontSizeBase200

fontWeightSemibold

lineHeightBase200

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 12px

fontWeight: 600

lineHeight: 16px

Caption 1 Strongcaption1Stronger

fontFamilyBase

fontSizeBase200

fontWeightBold

lineHeightBase200

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 12px

fontWeight: 700

lineHeight: 16px

Caption 1 Strongerbody1

fontFamilyBase

fontSizeBase300

fontWeightRegular

lineHeightBase300

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 14px

fontWeight: 400

lineHeight: 20px

Body 1body1Strong

fontFamilyBase

fontSizeBase300

fontWeightSemibold

lineHeightBase300

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 14px

fontWeight: 600

lineHeight: 20px

Body 1 Strongbody1Stronger

fontFamilyBase

fontSizeBase300

fontWeightBold

lineHeightBase300

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 14px

fontWeight: 700

lineHeight: 20px

Body 1 Strongerbody2

fontFamilyBase

fontSizeBase400

fontWeightRegular

lineHeightBase400

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 16px

fontWeight: 400

lineHeight: 22px

Body 2subtitle2

fontFamilyBase

fontSizeBase400

fontWeightSemibold

lineHeightBase400

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 16px

fontWeight: 600

lineHeight: 22px

Subtitle 2subtitle2Stronger

fontFamilyBase

fontSizeBase400

fontWeightBold

lineHeightBase400

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 16px

fontWeight: 700

lineHeight: 22px

Subtitle 2 Strongersubtitle1

fontFamilyBase

fontSizeBase500

fontWeightSemibold

lineHeightBase500

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 20px

fontWeight: 600

lineHeight: 28px

Subtitle 1title3

fontFamilyBase

fontSizeBase600

fontWeightSemibold

lineHeightBase600

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 24px

fontWeight: 600

lineHeight: 32px

Title 3title2

fontFamilyBase

fontSizeHero700

fontWeightSemibold

lineHeightHero700

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 28px

fontWeight: 600

lineHeight: 36px

Title 2title1

fontFamilyBase

fontSizeHero800

fontWeightSemibold

lineHeightHero800

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 32px

fontWeight: 600

lineHeight: 40px

Title 1largeTitle

fontFamilyBase

fontSizeHero900

fontWeightSemibold

lineHeightHero900

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 40px

fontWeight: 600

lineHeight: 52px

Large Titledisplay

fontFamilyBase

fontSizeHero1000

fontWeightSemibold

lineHeightHero1000

fontFamily: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif

fontSize: 68px

fontWeight: 600

lineHeight: 92px

Display

## How to use

Using typography styles is as simple as creating a custom style with any component. Simply import `typographyStyles` from the main `@fluentui/react-components` package and use it in your custom style:

Text using tokens

## Composing Tokens

Besides using typography styles, you can still use individual typography tokens:

Custom text using only tokens

## Mixing tokens and custom styles

To mix tokens and custom styles, spread typography styles into the style object and combine them with another CSS properties:

# Using Title 2 tokens

I'm a paragraph using Body 1 tokens and customized styles
