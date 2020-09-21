**The `ms-Grid` classes are only available via Fabric Core CSS.** If you're not using Fabric Core, Fluent UI React's [`Stack`](#/controls/web/stack) can cover some of the same use cases, or you can use [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

To start using the `ms-Grid` styles, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

#### Basics

A grid (`ms-Grid`) can contain multiple rows (`ms-Grid-row`), each of which has one or more columns (`ms-Grid-col`). Utility classes (`ms-sm6`) specify how large each column should be on small, medium, and large devices. The columns in a row should add up to 12 for each device size.

```html
<div class="ms-Grid" dir="ltr">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
    <div class="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
  </div>
</div>
```

```renderhtml
<div class="ms-Grid">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
      <div class="LayoutPage-demoBlock">A</div>
    </div>
    <div class="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
      <div class="LayoutPage-demoBlock">B</div>
    </div>
  </div>
</div>
```

#### Inheritance

Because Fabric Core is mobile-first, any layout defined for small screens is automatically inherited by medium and large screens. The small size utilities (`ms-sm6`) are required. If you want to change the layout on larger screens, you can apply the other utility classes.

Try this out! On a large screen, the example block will be smaller. Try shrinking your browser window to see how the example block will take up the entire width of the screen.

```html
<div class="ms-Grid-col ms-sm12 ms-lg4">Example</div>
```

```renderhtml
<div class="ms-Grid">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm12 ms-lg4">
      <div class="LayoutPage-demoBlock">Example</div>
    </div>
  </div>
</div>
```

#### Push and pull

You might want your column source order to differ from the display order, or to change the column display order based on the screen size. The push and pull utilities make this possible. Push moves a column to the right; pull moves it to the left.

```html
<div class="ms-Grid-col ms-sm4 ms-smPush8">First in code</div>
<div class="ms-Grid-col ms-sm8 ms-smPull4">Second in code</div>
```

```renderhtml
<div class="ms-Grid">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm4 ms-smPush8">
      <div class="LayoutPage-demoBlock">First in code</div>
    </div>
    <div class="ms-Grid-col ms-sm8 ms-smPull4">
      <div class="LayoutPage-demoBlock">Second in code</div>
    </div>
  </div>
</div>
```
