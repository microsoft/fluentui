function drawRectangle(rect: { x: number; y: number; width: number; height: number }): string {
  if (rect.width <= 0 || rect.height <= 0) {
    return '';
  }

  let pathData = '';

  // Creates a subpath moving in counterclockwise direction to create a hole

  pathData += `M ${rect.x},${rect.y} `;
  pathData += `V ${rect.y + rect.height} `; // Down to bottom-left
  pathData += `H ${rect.x + rect.width} `; // Right to bottom-right
  pathData += `V ${rect.y} `; // Up to top-right
  pathData += `H ${rect.x} `; // Left to top-left (closing)
  pathData += `Z `; // Close path

  return pathData;
}

/**
 * Computes a clip path that covers the area outside multiple rectangles.
 *
 * @internal
 */
export function computeOutsideClipPath(
  svgWidth: number,
  svgHeight: number,
  targetRect: { x: number; y: number; width: number; height: number },
  containerRect: { x: number; y: number; width: number; height: number },
): string {
  let pathData = `M 0,0 H ${svgWidth} V ${svgHeight} H 0 Z `;

  // For each rectangle, add a subpath that "cuts out" the rectangle
  // The trick is to draw each rectangle in the counterclockwise direction
  // which creates a "hole" in the main path

  pathData += drawRectangle(targetRect);
  pathData += drawRectangle(containerRect);

  return pathData;
}
