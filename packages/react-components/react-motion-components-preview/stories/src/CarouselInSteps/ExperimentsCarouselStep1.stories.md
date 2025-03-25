- First we create the core carousel structure for the 2 photo albums.
- We create a `Scene` for each album: a simple wrapper with a duration.
- We create a `Series` of the 2 scenes to show them one-by-one.

<div style="font-weight: bold;">

```tsx
// The 1st album has a title and 3 photos
const SceneA = (
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
// const SceneB = <Scene...

// We wrap the scenes in a Series to loop through them
<Series autoloop>
  {SceneA}
  {SceneB}
</Series>
```

</div>
