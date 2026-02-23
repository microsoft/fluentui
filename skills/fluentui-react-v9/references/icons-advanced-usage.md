# Advanced Usage

### Fluent icons as fonts

Fluent icons can also be consumed as a font. The API is the same as the React element icons, and there are tools to allow you to more seamlessly integrate the font icons into your application. You will also be able to only bundle the font icons you need in your application using the `@fluentui/react-icons-font-subsetting-webpack-plugin` package.

If `optimization.usedExports` is enabled (as it is by default), this plugin will subset the font files to only include the glyphs actually used by your build. Here is how you set up your webpack configuration to use font files in your application:

#### Pros & cons

Pros:

- Improved rendering performance in applications due to font files being downloaded upon application load and rendered as images.
- The font subsetting webpack plugin identifies the icons utilized in your application, downloading only those necessary.

Cons:

- Font files are loaded in advance and include all glyphs used in your application, potentially increasing initial loading times.
- Slight reduction in visual fidelity of font icons, though generally imperceptible at most sizes.
- Requires additional setup compared to SVG-based icons, such as configuring the Webpack plugin.
