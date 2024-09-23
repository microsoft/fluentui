`CarouselNav` provides an index based pagination of the Carousel containing it.

The render function of CarouselNav will be called based on the total number of slide breakpoints in the carousel (i.e. if groupSize is 2, there will be one CarouselNavButton for each group of slides). By passing in the index function, we connect the pagination buttons to the carousel without a need for specific values or IDs, and will be a consistent page index selected after changes such as resizing.

Each CarouselNavButton or CarouselImageNavButton will be wrapped in a context provider, enabling the index to be passed in without manual intervention. You can also override this render with a custom component and access the index via this same context.
