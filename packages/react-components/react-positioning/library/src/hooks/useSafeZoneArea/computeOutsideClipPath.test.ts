import { computeOutsideClipPath } from './computeOutsideClipPath';

describe('computeOutsideClipPath', () => {
  it('should create a basic clip path for standard rectangles', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 100, y: 100, width: 200, height: 150 };
    const containerRect = { x: 400, y: 400, width: 300, height: 200 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(
      [
        'M 0,0 H 1000 V 800 H 0 Z ',
        'M 100,100 V 250 H 300 V 100 H 100 Z ',
        'M 400,400 V 600 H 700 V 400 H 400 Z ',
      ].join(''),
    );
  });

  it('should handle zero-sized SVG dimensions', () => {
    const svgWidth = 0;
    const svgHeight = 0;
    const targetRect = { x: 10, y: 10, width: 50, height: 50 };
    const containerRect = { x: 100, y: 100, width: 50, height: 50 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(
      ['M 0,0 H 0 V 0 H 0 Z ', 'M 10,10 V 60 H 60 V 10 H 10 Z ', 'M 100,100 V 150 H 150 V 100 H 100 Z '].join(''),
    );
  });

  it('should skip rectangles with zero width', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 100, y: 100, width: 0, height: 150 };
    const containerRect = { x: 400, y: 400, width: 300, height: 200 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(['M 0,0 H 1000 V 800 H 0 Z ', 'M 400,400 V 600 H 700 V 400 H 400 Z '].join(''));
  });

  it('should skip rectangles with zero height', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 100, y: 100, width: 200, height: 0 };
    const containerRect = { x: 400, y: 400, width: 300, height: 200 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(['M 0,0 H 1000 V 800 H 0 Z ', 'M 400,400 V 600 H 700 V 400 H 400 Z '].join(''));
  });

  it('should skip rectangles with negative dimensions', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 100, y: 100, width: 200, height: 150 };
    const containerRect = { x: 400, y: 400, width: -10, height: -20 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(['M 0,0 H 1000 V 800 H 0 Z ', 'M 100,100 V 250 H 300 V 100 H 100 Z '].join(''));
  });

  it('should handle fractional values correctly', () => {
    const svgWidth = 1000.5;
    const svgHeight = 800.25;
    const targetRect = { x: 100.75, y: 100.5, width: 200.25, height: 150.5 };
    const containerRect = { x: 400.25, y: 400.75, width: 300.5, height: 200.25 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(
      [
        'M 0,0 H 1000.5 V 800.25 H 0 Z ',
        'M 100.75,100.5 V 251 H 301 V 100.5 H 100.75 Z ',
        'M 400.25,400.75 V 601 H 700.75 V 400.75 H 400.25 Z ',
      ].join(''),
    );
  });

  it('should handle overlapping rectangles correctly', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 100, y: 100, width: 400, height: 400 };
    const containerRect = { x: 200, y: 200, width: 400, height: 400 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(
      [
        'M 0,0 H 1000 V 800 H 0 Z ',
        'M 100,100 V 500 H 500 V 100 H 100 Z ',
        'M 200,200 V 600 H 600 V 200 H 200 Z ',
      ].join(''),
    );
  });

  it('should handle rectangles at the boundary of the SVG', () => {
    const svgWidth = 1000;
    const svgHeight = 800;
    const targetRect = { x: 0, y: 0, width: 200, height: 150 };
    const containerRect = { x: 800, y: 650, width: 200, height: 150 };

    const pathData = computeOutsideClipPath(svgWidth, svgHeight, targetRect, containerRect);

    expect(pathData).toBe(
      ['M 0,0 H 1000 V 800 H 0 Z ', 'M 0,0 V 150 H 200 V 0 H 0 Z ', 'M 800,650 V 800 H 1000 V 650 H 800 Z '].join(''),
    );
  });
});
