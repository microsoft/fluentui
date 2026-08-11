import { lockDocumentScroll, unlockDocumentScroll } from './documentScrollLock';

const createDocument = (): Document => document.implementation.createHTMLDocument();

describe('documentScrollLock', () => {
  it('restores the previous inline overflow value', () => {
    const targetDocument = createDocument();
    targetDocument.body.style.overflow = 'auto';

    lockDocumentScroll(targetDocument);
    expect(targetDocument.body.style.overflow).toBe('visible clip');

    unlockDocumentScroll(targetDocument);
    expect(targetDocument.body.style.overflow).toBe('auto');
  });

  it('keeps the document locked until all nested locks are released', () => {
    const targetDocument = createDocument();

    lockDocumentScroll(targetDocument);
    lockDocumentScroll(targetDocument);

    unlockDocumentScroll(targetDocument);
    expect(targetDocument.body.style.overflow).toBe('visible clip');

    unlockDocumentScroll(targetDocument);
    expect(targetDocument.body.style.overflow).toBe('');
  });

  it('tracks locks independently for each document', () => {
    const firstDocument = createDocument();
    const secondDocument = createDocument();
    firstDocument.body.style.overflow = 'scroll';
    secondDocument.body.style.overflow = 'auto';

    lockDocumentScroll(firstDocument);
    lockDocumentScroll(secondDocument);
    unlockDocumentScroll(firstDocument);

    expect(firstDocument.body.style.overflow).toBe('scroll');
    expect(secondDocument.body.style.overflow).toBe('visible clip');

    unlockDocumentScroll(secondDocument);
    expect(secondDocument.body.style.overflow).toBe('auto');
  });

  it('ignores an unmatched unlock', () => {
    const targetDocument = createDocument();
    targetDocument.body.style.overflow = 'scroll';

    unlockDocumentScroll(targetDocument);

    expect(targetDocument.body.style.overflow).toBe('scroll');
  });
});
