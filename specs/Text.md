# Text FluentUI spec

The Text component consistently styles and formats occurrences of text.

## Prior Art/Examples <a href="#prior-art" id="prior-art"></a>

- [Ant Design](https://ant.design/components/typography/)
- [BaseWeb](https://baseweb.design/blog/base-web-v9#typography)
- [Blueprint](https://blueprintjs.com/docs/#core/components/text)
- [Chakra UI](https://chakra-ui.com/text)
- [Elastic UI](https://elastic.github.io/eui/#/display/text)
- [Evergreen](https://evergreen.segment.com/components/typography#heading_text_component)
- [Grommet](https://v2.grommet.io/text)
- [Fabric UI](https://developer.microsoft.com/en-us/fluentui#/controls/web/text)
- [Fluent UI Northstar](https://fluentsite.z22.web.core.windows.net/components/text/definition)
- [Fomantic UI](https://fomantic-ui.com/elements/text.html)
- [Lightning Design System](https://www.lightningdesignsystem.com/utilities/text/#site-main-content)
- [Primer](https://primer.style/components/Text)
- [Ring UI](https://jetbrains.github.io/ring-ui/master/index.html?path=/story/components-text--basic)
- [Vuetify](https://vuetifyjs.com/en/styles/text-and-typography/)
- [Welcome UI](https://www.welcome-ui.com/components/text)

## API

### Props

| Attribute Name | Type   | Default Value | Description                                      |
| -------------- | ------ | ------------- | ------------------------------------------------ |
| `variant`      | `enum` |               | A text can define its look via defined variants. |

## Slots

| Name | Considerations     |
| ---- | ------------------ |
| root | container for text |

### Proposed React structure

```jsx
<span dir="auto">Foo bar baz</span>
```

#### Public usage

```tsx
<Text>Foo bar baz<Text>
```
