First we create the core carousel structure for the 2 photo albums.

- We create a `Scene` for each album: a simple wrapper with a duration.
- We create a `Sequence` of the 2 scenes to show them one-by-one.

<div style="font-weight: bold;">

```tsx
// The 1st album has a title and 3 photos
const sceneA = (
  <Scene duration={3000}>
    <div>Album A</div>

    <div>
      <Image ... />
      <Image ... />
      <Image ... />
    </div>
  </Scene>
);
// The 2nd album is similar but with 4 images
// const sceneB = <Scene...

// We wrap the scenes in a Sequence to loop through them
<Sequence autoloop>
  {sceneA}
  {sceneB}
</Sequence>
```

</div>
