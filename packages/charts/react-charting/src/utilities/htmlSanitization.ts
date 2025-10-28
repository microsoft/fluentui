export const createDomParser = (documentRef?: Document): DOMParser | undefined => {
  const parserConstructor =
    documentRef?.defaultView?.DOMParser ?? (typeof DOMParser !== 'undefined' ? DOMParser : undefined);

  return parserConstructor ? new parserConstructor() : undefined;
};

export const parseHtmlDocument = (html: string, documentRef?: Document): Document | undefined => {
  if (!html) {
    return undefined;
  }

  const parser = createDomParser(documentRef);

  if (!parser) {
    return undefined;
  }

  const parsedDocument = parser.parseFromString(html, 'text/html');
  const hasParserError =
    parsedDocument.documentElement?.nodeName === 'parsererror' ||
    parsedDocument.getElementsByTagName('parsererror').length > 0;

  return hasParserError ? undefined : parsedDocument;
};

export const decodeHtmlEntities = (html: string, documentRef: Document): string => {
  if (!html || html.indexOf('&') === -1) {
    return html;
  }

  const parsedDocument = parseHtmlDocument(html, documentRef);

  if (!parsedDocument?.documentElement) {
    return html;
  }

  return parsedDocument.documentElement.textContent ?? '';
};

export const sanitizeHtml = (html: string): string => {
  if (!html) {
    return '';
  }

  if (typeof window === 'undefined' || !window.document) {
    return html;
  }

  const decodedHtml = decodeHtmlEntities(html, window.document);
  const workingDocument = parseHtmlDocument(decodedHtml, window.document);

  if (!workingDocument?.body) {
    return decodedHtml;
  }

  workingDocument.body.querySelectorAll('script, iframe, object, embed, link').forEach(node => node.remove());

  workingDocument.body.querySelectorAll('*').forEach(node => {
    Array.from(node.attributes).forEach(attr => {
      if (/^on/i.test(attr.name)) {
        node.removeAttribute(attr.name);
      }
    });
  });

  const serializerConstructor =
    (typeof XMLSerializer !== 'undefined' ? XMLSerializer : undefined) ?? workingDocument.defaultView?.XMLSerializer;

  if (serializerConstructor) {
    const serializer = new serializerConstructor();
    return Array.from(workingDocument.body.childNodes)
      .map(node => serializer.serializeToString(node))
      .join('');
  }

  return workingDocument.body.innerHTML;
};
