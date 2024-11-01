## Best practices

### Do

- Limit cards to a max width of 100% of screen size.
- Use 'gap' css on CarouselSlider to provide easy spacing between cards, use margin if circular is enabled.
- Keep cards a uniform size where possible.
- Set CarouselCards to focusMode='tab-exit' when there is multiple cards in view
- Avoid focus on CarouselCards if they are a full size banner, out of view cards will be set to 'inert'.
- Set an event listener on CarouselCards with EMBLA_VISIBILITY_EVENT to update state based on visibility (or use an intersectionObserver).

### Don't

- Use percentage based widths unless also using resize breakpoints to define number of cards, i.e. a 400px window should have max 1-2 cards while a 1000px window could fit 2-4+
- Set groupSize unless it is a constant set value, i.e. groupSize 2 if the size of cards is set to 50%.
- Set autoplay to true unless user interacts or an action is taken (i.e. clicking autoplay button).
