```Swift
// There are 3 styles to choose from, the default being primary filled
let primaryFilledButton = Button(title: "FluentUI Button", style: .primaryFilled),
let primaryOutlineButton = Button(title: "FluentUI Button", style: .primaryOutline),
let borderlessButton = Button(title: "FluentUI Button", style: .borderless)
```

```Swift
// You can display an image instead of a title
let buttonWithImageAndStyle = Button(image: NSImage(named: NSImage.addTemplateName)!, style: .primaryFilled)
```

### Not recommended

- Overriding the underlying NSButtonCell will result in undefined behavior. While this may fit your use case, take caution while doing so.
- Displaying both a title and an image currently does not render properly, and is not recommended.
