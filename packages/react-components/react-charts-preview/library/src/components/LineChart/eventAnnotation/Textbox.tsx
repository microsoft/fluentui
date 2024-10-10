import * as React from 'react';
import { select } from 'd3-selection';

interface ITextboxProps {
  text: string;
  width: number;
  x: number;
  y: number;
  lineHeight: number;
  textAnchor?: 'start' | 'middle' | 'end';
  fontSize?: string;
  fill?: string;
}

export const Textbox: React.FunctionComponent<ITextboxProps> = props => {
  const textElementRef: React.RefObject<SVGTextElement> = React.useRef(null);

  const wrapWords = () => {
    if (!textElementRef.current) {
      return;
    }
    const text = select(textElementRef.current);
    const words = props.text.split(/\s+/);
    let line: string[] = [];
    let tspan = text.append<SVGTSpanElement>('tspan');
    let numLines = 0;

    words.forEach(word => {
      line.push(word);
      tspan.text(line.join(' '));
      const node = tspan.node();
      if (node && node.getComputedTextLength() > props.width && line.length > 1) {
        numLines++;
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text.append<SVGTSpanElement>('tspan').text(word).attr('dy', props.lineHeight).attr('x', props.x);
      }
    });
    // bottom aligns text
    text.attr('dy', -numLines * props.lineHeight);

    return () => {
      text.selectAll('tspan').remove();
    };
  };
  React.useEffect(wrapWords);

  const { lineHeight, ...rest } = props;

  return <text ref={textElementRef} {...rest} />;
};
