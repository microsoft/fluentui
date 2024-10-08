A `Carousel` component is a sliding window of elements controlled by previous, next, and direct pagination buttons.

`Carousel` allows banners or a series of cards to be displayed in a way that takes up minimal screen space. It offers an accessible method of viewing content that is out of bounds via keyboard interactions.

'CarouselNavContainer' offers multiple layouts of the underlying controls which can be suitable for full screen banners, multiple cards within a view, or large image box previews and displays, or use the underlying controls directly for precision placement.

A `CarouselCard` can be full screen, responsive, or partial sizes, it is recommended to enable the `cardFocus` prop on the `CarouselSlider` if the cards are not full width banners (this provided keyboard navigation and accessibility tool access). If cards are intended to be full-screen banners, we recommend relying on the tab index of the internal elements only, while the out-of-view cards will be set to aria-hidden by default to prevent unnecessary tabbing and quick control access.

> ⚠️ For `aria-live` announcements to work correctly you should configure you application with a
> <a href="https://react.fluentui.dev/?path=/docs/utilities-aria-live-arialiveannouncer--docs">AriaLiveAnnouncer</a> towards the top of the React tree.
