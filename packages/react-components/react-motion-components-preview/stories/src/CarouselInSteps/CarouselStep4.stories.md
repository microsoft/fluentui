The final touch on the carousel is to add a stagger to the photo motions.

- We wrap the `<Stagger>` component around the photos and set a delay for the stagger.

<div style="font-weight: bold;">

```tsx
<div>
  // offset each photo's motion by 100 ms
  <Stagger delay={100}>
    <PhotoMotion>
      <Image ... />
    </PhotoMotion>

    <PhotoMotion>
      <Image ... />
    </PhotoMotion>

    <PhotoMotion>
      <Image ... />
    </PhotoMotion>
  </Stagger>
</div>
```

</div>
