/**
 * Validates that grid cells are present in a grid list item. This is necessary for proper screen reader support.
 * If grid cells are not present and we're not running in production mode, a warning will be logged to the console.
 * @param listRole - The role of the list
 * @param listItemEl - The list item element
 * @returns
 */
export const validateGridCellsArePresent = (listRole: string, listItemEl: HTMLElement) => {
  if (listRole !== 'grid') {
    return;
  }

  const gridCells = listItemEl.querySelectorAll(':scope > [role="gridcell"]');
  if (gridCells.length === 0) {
    //eslint-disable-next-line no-console
    console.warn(
      `@fluentui/react-list-preview [useList]:\nList items in List with "grid" role (which is automatically assigned when navigationMode is set to "composite") must contain at least one "gridcell" as direct child of <ListItem /> for proper screen reader support.`,
      `Ideally, each focus target should be in it's own "gridcell", which is a direct child of <ListItem />.\n`,
    );
  }
};
