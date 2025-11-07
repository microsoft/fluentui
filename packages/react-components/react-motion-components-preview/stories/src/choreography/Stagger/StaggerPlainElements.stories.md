By default, `Stagger` will hide regular elements using a `visibility: hidden` style, to preserve their layout.

```tsx
<Stagger visible={isVisible}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Stagger>
```
