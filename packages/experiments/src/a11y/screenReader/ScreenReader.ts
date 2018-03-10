/**
 * Utility methods that help working with screen reader actions
 *
 * @public
 */
export default class ScreenReader {
  // tslint:disable-next-line:no-inferrable-types
  private static _cssHidden: string = `position:absolute;text-indent:-9999px;
    width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;border:0;`;

  /**
   * Make screen reader read a message to the user. This is done by adding a new element to the document that has
   * 'role' attribute set to 'true'. It gets an id for the message to avoid cluttering the document with new elements.
   * If a message element with the given id has been already added, it will be cleaned up before adding a new element.
   * Therefore, an application usually needs just one unique id to pass to all invocations of this method.
   * The element is hidden by default, but this can be configured via isVisible parameter. Additionally, the caller can
   * pass a className to be added to the element.
   *
   * @param id - A string identifier passed by the caller. It should be unique per application.
   * @param message - The message to be read by the screen reader
   * @param isVisible - Whether the element added to the document should be visible. Defaults to false.
   * @param className - Optional className added to the
   */
  public static alert(id: string, message: string, isVisible: boolean = false, className?: string): void {
    const divId: string = 'sp_a11y_alert_' + id;
    const oldAlert: HTMLElement = document.querySelector('#' + divId) as HTMLElement;
    if (oldAlert) {
      document.body.removeChild(oldAlert);
    }

    const alertNode: HTMLElement = document.createElement('p');
    if (!isVisible) {
      alertNode.setAttribute('style', ScreenReader._cssHidden);
    }
    if (className) {
      alertNode.classList.add(className);
    }

    alertNode.setAttribute('role', 'alert');
    alertNode.setAttribute('aria-live', 'assertive');
    alertNode.setAttribute('id', divId);
    const alertText: Node = document.createTextNode(message);
    document.body.appendChild(alertNode);
    alertNode.appendChild(alertText);
  }
}
