const mathSign =
  Math.sign ||
  function mathSign(x) {
    const val = +x;

    if (val === 0 || isNaN(val)) return val;
    return val > 0 ? 1 : -1;
  };

const scrollToAnchor = (lastOffsetY?, lastAcceleration = 0.1) => {
  const anchor = location.hash && document.querySelector(location.hash);
  const offsetY = window.scrollY || window.pageYOffset;

  // take the sticky ComponentDoc header into account when scrolling
  const stickyHeader = document.querySelector('#docs-sticky-header');
  const stickyHeaderOffset = stickyHeader ? Math.ceil(stickyHeader.getBoundingClientRect().bottom) : 0;

  // no scroll to target, stop
  if (!anchor) return;

  const elementTop = Math.round(anchor.getBoundingClientRect().top) - stickyHeaderOffset;
  const scrollStep = Math.ceil(Math.abs(elementTop / 8)) * mathSign(elementTop);
  const acceleration = Math.min(1, Math.pow(lastAcceleration * 100, 1.1) / 100);

  // if our last step was not applied, stop
  // we've either hit the top, bottom, or arrived at the element
  if (lastOffsetY === offsetY) return;

  // more scrolling to do!
  scrollBy(0, scrollStep * acceleration);
  requestAnimationFrame(() => scrollToAnchor(offsetY, acceleration));
};

export default scrollToAnchor;
