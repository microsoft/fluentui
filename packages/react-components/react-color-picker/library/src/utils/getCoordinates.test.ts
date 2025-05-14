import { getCoordinates, roundTwoDecimal } from './getCoordinates';

describe('getCoordinates', () => {
  const mockElement = {
    getBoundingClientRect: jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    })),
  } as unknown as HTMLElement;

  it('should calculate normalized coordinates within bounds', () => {
    const event = { clientX: 50, clientY: 50 } as PointerEvent;
    const result = getCoordinates(mockElement, event);
    expect(result).toEqual({ x: 0.5, y: 0.5 });
  });

  it('should clamp coordinates to 0 if they are negative', () => {
    const event = { clientX: -10, clientY: -10 } as PointerEvent;
    const result = getCoordinates(mockElement, event);
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should clamp coordinates to 1 if they exceed the element bounds', () => {
    const event = { clientX: 110, clientY: 110 } as PointerEvent;
    const result = getCoordinates(mockElement, event);
    expect(result).toEqual({ x: 1, y: 0 });
  });
});

describe('roundTwoDecimal', () => {
  it('should round numbers to two decimal places', () => {
    expect(roundTwoDecimal(1.234)).toBe(1.23);
    expect(roundTwoDecimal(1.235)).toBe(1.24);
    expect(roundTwoDecimal(1.2)).toBe(1.2);
    expect(roundTwoDecimal(1)).toBe(1);
  });
});
