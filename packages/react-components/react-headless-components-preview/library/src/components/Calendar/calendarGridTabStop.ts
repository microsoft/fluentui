export const setCalendarGridTabStop = (activeCell: HTMLElement): void => {
  const grid = activeCell.closest('[role="grid"]');
  if (!grid) {
    return;
  }

  grid.querySelectorAll<HTMLElement>('[role="gridcell"]').forEach(cell => {
    if (cell.closest('[role="grid"]') === grid) {
      cell.tabIndex = cell === activeCell ? 0 : -1;
    }
  });
};
