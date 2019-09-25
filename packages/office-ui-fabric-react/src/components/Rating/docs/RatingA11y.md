Rating is accessible if these considerations are followed:

The rating widget could be implemented either using radio buttons or using sliders to achieve the following keyboard operations:

- `Tab` key moves focus to the rating widget.
- `Left/Right` arrow keys adjust rating.
- Screen readers provide the feedback for the current rating when value is changed using arrow keys i.e. "2 out of 5 stars selected…".
- Rating icons have a 3:1 contrast with respect to the background.
- Rating icons are visible in High contrast mode.

#### For an already set rating:

- Rating should not be tab focusable if it is non-interactive.
- Every star in the rating need not to be made accessible for screen reader, rather all the rating icons could be confined under a single container with aria-label having value of currently selected rating icons.
