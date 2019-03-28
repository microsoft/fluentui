export class DocumentUtils {
  private dom?: Document;

  constructor(dom?: Document) {
    this.dom = dom;
  }

  public title(): string {
    return '';
  }
}
