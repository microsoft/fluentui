import { scrollIntoView } from './scrollIntoView';

describe('scrollIntoView', () => {
  const mockListboxScrollTo = jest.fn();
  const mockAncestorScrollTo = jest.fn();
  let listboxGrandParent: Partial<HTMLElement> = {};
  let listboxParent: Partial<HTMLElement> = {};
  let listbox: Partial<HTMLElement> = {};

  beforeEach(() => {
    listboxGrandParent = {
      offsetTop: 0,
      offsetHeight: 50,
      scrollHeight: 170,
      scrollTop: 0,
      offsetParent: null,
      scrollTo: mockAncestorScrollTo,
      contains: jest.fn().mockReturnValue(false),
    };
    listboxParent = {
      offsetTop: 20,
      offsetHeight: 150,
      scrollHeight: 150,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxGrandParent as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
    };
    listbox = {
      offsetTop: 40,
      scrollHeight: 100,
      scrollTop: 0,
      offsetHeight: 50,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxParent as HTMLElement,
      scrollTo: mockListboxScrollTo,
      contains: jest.fn().mockReturnValue(false),
    };
    mockListboxScrollTo.mockClear();
    mockAncestorScrollTo.mockClear();
    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ scrollMarginTop: '0', scrollMarginBottom: '0' } as CSSStyleDeclaration);
  });

  it('should scroll element above view into view - no scroll margin - scrollable listbox', () => {
    listbox = {
      ...listbox,
      scrollHeight: 100,
      scrollTop: 100,
    };

    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 0,
      offsetParent: listbox as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
    };

    scrollIntoView(option as HTMLElement);

    expect(mockListboxScrollTo).toHaveBeenCalledWith(0, -2);
  });

  it('should scroll element above view into view - with scroll margin - scrollable listbox', () => {
    listbox = {
      ...listbox,
      scrollHeight: 100,
      scrollTop: 100,
    };

    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 0,
      offsetParent: listbox as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
      ownerDocument: {
        defaultView: window,
      } as Document,
    };

    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ scrollMarginTop: '10', scrollMarginBottom: '0' } as CSSStyleDeclaration);
    scrollIntoView(option as HTMLElement);

    expect(mockListboxScrollTo).toHaveBeenCalledWith(0, -12);
  });

  it('should scroll element below view into view - no scroll margin - scrollable listbox', () => {
    listbox = {
      ...listbox,
      scrollHeight: 100,
      scrollTop: 0,
    };

    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 90,
      offsetParent: listbox as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
    };

    scrollIntoView(option as HTMLElement);

    expect(mockListboxScrollTo).toHaveBeenCalledWith(0, 52);
  });

  it('should scroll element below view into view - with scroll margin - scrollable listbox', () => {
    listbox = {
      ...listbox,
      scrollHeight: 100,
      scrollTop: 0,
    };

    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 90,
      offsetParent: listbox as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
      ownerDocument: {
        defaultView: window,
      } as Document,
    };

    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ scrollMarginTop: '0', scrollMarginBottom: '10' } as CSSStyleDeclaration);
    scrollIntoView(option as HTMLElement);

    expect(mockListboxScrollTo).toHaveBeenCalledWith(0, 62);
  });

  it('should scroll element above view into view - scrollable ancestor', () => {
    listboxGrandParent = {
      ...listboxGrandParent,
      scrollTop: 170,
    };
    listboxParent = {
      ...listboxParent,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxGrandParent as HTMLElement,
    };
    listbox = {
      ...listbox,
      scrollHeight: 100,
      offsetHeight: 100,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxParent as HTMLElement,
    };
    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 0,
      offsetParent: listboxGrandParent as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
    };

    scrollIntoView(option as HTMLElement);

    expect(mockAncestorScrollTo).toHaveBeenCalledWith(0, -2);
  });

  it('should scroll element below view into view - scrollable ancestor', () => {
    listboxGrandParent = {
      ...listboxGrandParent,
      scrollTop: 0,
    };
    listboxParent = {
      ...listboxParent,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxGrandParent as HTMLElement,
    };
    listbox = {
      ...listbox,
      scrollHeight: 100,
      offsetHeight: 100,
      offsetParent: listboxGrandParent as Element,
      parentElement: listboxParent as HTMLElement,
    };
    const option: Partial<HTMLElement> = {
      offsetHeight: 10,
      offsetTop: 160,
      offsetParent: listboxGrandParent as HTMLElement,
      parentElement: listbox as HTMLElement,
      contains: jest.fn().mockReturnValue(false),
    };

    scrollIntoView(option as HTMLElement);

    expect(mockAncestorScrollTo).toHaveBeenCalledWith(0, 122);
  });
});
