import * as React from 'react';

export const useAxis = () => {
  const xAxisElement = React.useRef<SVGSVGElement | null>(null);
  const yAxisElement = React.useRef<SVGSVGElement | null>(null);
  const yAxisElementSecondary = React.useRef<SVGSVGElement | null>(null);

  return {
    xAxisElement,
    yAxisElement,
    yAxisElementSecondary,
  };
};
