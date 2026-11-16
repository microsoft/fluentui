/**
 * A finite listbox exit: runs while the listbox is out of the top layer.
 */
export const listboxExitStyles = `
  @keyframes listboxExit {
    from { display: block; opacity: 1; }
    to { display: none; opacity: 0; }
  }
  [role="listbox"] {
    transition: overlay 10s allow-discrete;
  }
  [role="listbox"]:not(:popover-open) {
    animation: listboxExit 10s linear;
  }
`;

/**
 * Asserts the listbox is closed but still mounted, then finishes its exit.
 */
export const finishListboxExit = (selector: string): void => {
  cy.get<HTMLElement>(selector)
    .should('not.match', ':popover-open')
    .then(([element]) => {
      element.getAnimations({ subtree: true }).forEach(animation => animation.finish());
    });
};
