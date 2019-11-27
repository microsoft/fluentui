[Fabric Core](https://github.com/OfficeDev/office-ui-fabric-core) is a collection of CSS classes and Sass mixins that give you access to Fabric's colors, animations, fonts, icons and grid.

### Who should use Fabric Core

Fabric Core is primarily meant for non-React applications or static pages.

If you're using Fabric React, you may not need Fabric Core. Most of the styles from Fabric Core are also available via CSS-in-JS styling, which is the recommended styling approach with Fabric React.

### Adding Fabric Core to your site

To add the latest Fluent version of Fabric Core to your site, link to this CSS file in the `<head>` of your webpage. (For the pre-Fluent styles, replace `11.0.0` with `9.6.1` in the `href`.)

```html
<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/11.0.0/css/fabric.min.css" />
```

Fabric Core is also available [via npm](https://www.npmjs.com/package/office-ui-fabric-core) as `office-ui-fabric-core`, or you can [download a copy](https://github.com/OfficeDev/office-ui-fabric-core/releases) to include in your project.

### Using Fabric Core class names

To use the styles, add the `ms-Fabric` class to a containing element, such as `<body>`, to set the `font-family` for all Fabric typography classes used within that element. Then apply the Fabric styles directly to your HTML elements.

```html
<body class="ms-Fabric" dir="ltr">
  <span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>
</body>
```
