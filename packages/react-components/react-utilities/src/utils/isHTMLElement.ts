/**
 * @internal
 * Verifies if a given node is an HTMLElement,
 * this method works seamlessly with frames and elements from different documents
 *
 * This is required as simply using `instanceof`
 * might be problematic while operating with [multiple realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms)
 *
 */
export function isHTMLElement<ConstructorName extends HTMLElementConstructorName = 'HTMLElement'>(
  element?: unknown,
  options?: { constructorName?: ConstructorName },
): element is InstanceType<(typeof globalThis)[ConstructorName]> {
  const typedElement = element as Node | null | undefined;
  return Boolean(
    typedElement?.ownerDocument?.defaultView &&
      typedElement instanceof typedElement.ownerDocument.defaultView[options?.constructorName ?? 'HTMLElement'],
  );
}

type HTMLElementConstructorName =
  | 'HTMLElement'
  | 'HTMLAnchorElement'
  | 'HTMLAreaElement'
  | 'HTMLAudioElement'
  | 'HTMLBaseElement'
  | 'HTMLBodyElement'
  | 'HTMLBRElement'
  | 'HTMLButtonElement'
  | 'HTMLCanvasElement'
  | 'HTMLDataElement'
  | 'HTMLDataListElement'
  | 'HTMLDetailsElement'
  | 'HTMLDialogElement'
  | 'HTMLDivElement'
  | 'HTMLDListElement'
  | 'HTMLEmbedElement'
  | 'HTMLFieldSetElement'
  | 'HTMLFormElement'
  | 'HTMLHeadingElement'
  | 'HTMLHeadElement'
  | 'HTMLHRElement'
  | 'HTMLHtmlElement'
  | 'HTMLIFrameElement'
  | 'HTMLImageElement'
  | 'HTMLInputElement'
  | 'HTMLModElement'
  | 'HTMLLabelElement'
  | 'HTMLLegendElement'
  | 'HTMLLIElement'
  | 'HTMLLinkElement'
  | 'HTMLMapElement'
  | 'HTMLMetaElement'
  | 'HTMLMeterElement'
  | 'HTMLObjectElement'
  | 'HTMLOListElement'
  | 'HTMLOptGroupElement'
  | 'HTMLOptionElement'
  | 'HTMLOutputElement'
  | 'HTMLParagraphElement'
  | 'HTMLParamElement'
  | 'HTMLPreElement'
  | 'HTMLProgressElement'
  | 'HTMLQuoteElement'
  | 'HTMLSlotElement'
  | 'HTMLScriptElement'
  | 'HTMLSelectElement'
  | 'HTMLSourceElement'
  | 'HTMLSpanElement'
  | 'HTMLStyleElement'
  | 'HTMLTableElement'
  | 'HTMLTableColElement'
  | 'HTMLTableRowElement'
  | 'HTMLTableSectionElement'
  | 'HTMLTemplateElement'
  | 'HTMLTextAreaElement'
  | 'HTMLTimeElement'
  | 'HTMLTitleElement'
  | 'HTMLTrackElement'
  | 'HTMLUListElement'
  | 'HTMLVideoElement';
