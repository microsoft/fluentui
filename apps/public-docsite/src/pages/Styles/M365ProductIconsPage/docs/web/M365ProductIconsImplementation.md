To use the Microsoft 365 multicolor product icons, select the format and size that best meets your needs. Fluent UI includes a media query that automatically selects the right image file for the pixel density of the screen you’re targeting.

The following code shows you how to specify a 96px product icon by brand using the [office-ui-fabric-core](https://github.com/OfficeDev/office-ui-fabric-core) CSS and a `<div>` element:

```jsx
// Sample code for using office-ui-fabric-core version 11.1.0 to display an Word 96x96px Icon
<link
  rel="stylesheet"
  href="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-core/11.1.0/css/fabric.css"
/>

<div class="ms-BrandIcon--icon96 ms-BrandIcon--word"></div>
```

This following code shows you how to specify a 48px product icon by brand using the [office-ui-fabric-core](https://github.com/OfficeDev/office-ui-fabric-core) SVG and an `<img>` element:

```jsx
<img
  src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/word_48x1.svg"
  width="48"
  height="48"
  alt="Word product icon"
/>
```
