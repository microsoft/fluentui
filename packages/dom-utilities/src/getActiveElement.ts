export const getActiveElement = (doc: Document): Element | null => {
  let ae = doc.activeElement;

  while (ae?.shadowRoot) {
    ae = ae.shadowRoot.activeElement;
  }

  return ae;
};
