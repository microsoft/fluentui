interface ISelectionLayout {
  getItemIndexAbove(focusIndex: number, items: any[]): number;
  getItemIndexBelow(focusIndex: number, items: any[]): number;
  getItemIndexLeft(focusIndex: number, items: any[]): number;
  getItemIndexRight(focusIndex: number, items: any[]): number;
}

export default ISelectionLayout;
