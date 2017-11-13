// OneDrive:IgnoreCodeCoverage

export interface IElementProximityParams {
  isMouseInProximity: boolean;
  offset?: number;
}

/**
 * Utility that
 */
export default class ElementProximity {

  public isMouseInProximity: boolean;
  public offset: number;

  constructor(params: IElementProximityParams) {

    let elementRect = this.element.getBoundingClientRect();
    let timeoutIds = [];
    this.isMouseInProximity = value.isMouseInProximity;
    this.offset = value.offset || 100; // The default is 100 pixels from the element

    // When the window resizes we want to capture a new
    // Element.getBoundingClientRect but we dont want to
    // do it on every resize to prevent reflow issues general
    // performance issues.
    this.events.on(window, 'resize', () => {
      timeoutIds.map((currentValue: number) => {
        clearInterval(currentValue);
      });

      timeoutIds.push(this.async.setTimeout(() => {
        elementRect = this.element.getBoundingClientRect();
      }, 100));
    });

    this.events.on(document, 'mousemove', (e: MouseEvent) => {
      let mouseY = e.pageY;
      let mouseX = e.pageX;
      this.isMouseInProximity(this._insideElement(elementRect, mouseX, mouseY));
    });
  }

  public

  // Checks wether the mouse is the proximity of an element
  private _insideElement(elementRect: ClientRect, mouseX: number, mouseY: number) {
    return mouseX > (elementRect.left - this.offset) && mouseX < ((elementRect.left + elementRect.width) + this.offset) &&
      mouseY > (elementRect.top - this.offset) && mouseY < ((elementRect.top + elementRect.height) + this.offset);
  }
}
