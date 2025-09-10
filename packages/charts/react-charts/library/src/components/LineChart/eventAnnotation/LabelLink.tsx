import * as React from 'react';
import { EventAnnotation } from '../../../types/EventAnnotation';
import { Textbox } from './Textbox';
import { getColorFromToken } from '../../../utilities/colors';
import { tokens } from '@fluentui/react-theme';

export interface LineDef extends EventAnnotation {
  x: number;
}

export interface LabelDef {
  x: number;
  aggregatedIdx: number[];
  anchor: 'start' | 'end';
}

interface LabelLinkProps {
  lineDefs: LineDef[];
  labelDef: LabelDef;
  textY: number;
  textWidth: number;
  textLineHeight: number;
  textFontSize: string;
  textColor: string | undefined;
  mergedLabel: (count: number) => string;
}

export const LabelLink: React.FunctionComponent<LabelLinkProps> = props => {
  const gRef = React.useRef<SVGGElement>(null);
  const [showCard, setShowCard] = React.useState(false);
  const onClick = () => setShowCard(true);

  let callout: React.ReactNode = null;
  if (showCard) {
    const cards = props.labelDef.aggregatedIdx.map(i => props.lineDefs[i].onRenderCard!).filter(c => !!c);
    if (cards.length > 0) {
      callout = null;
      // TODO - need to replace callout with popover
      /*callout = {
        /* <Callout
          target={gRef.current}
          // eslint-disable-next-line react/jsx-no-bind
          onDismiss={onDismiss}
          setInitialFocus={true}
          role="dialog"
        >
          <FocusZone isCircularNavigation={true} direction={FocusZoneDirection.vertical}>
            <List<() => React.ReactNode>
              items={cards}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCell={onRenderCell}
            />
          </FocusZone>
        </Callout>
      };*/
    }
  }

  let text: string;
  const fill: string | undefined = props.textColor
    ? getColorFromToken(props.textColor, false)
    : tokens.colorNeutralForeground1;

  if (props.labelDef.aggregatedIdx.length === 1) {
    text = props.lineDefs[props.labelDef.aggregatedIdx[0]].event;
  } else {
    text = props.mergedLabel(props.labelDef.aggregatedIdx.length);
  }

  return (
    <>
      <g ref={gRef} onClick={onClick} data-is-focusable={false} style={{ cursor: 'pointer' }} role="button">
        <Textbox
          text={text}
          x={props.labelDef.x}
          y={props.textY}
          width={props.textWidth}
          lineHeight={props.textLineHeight}
          textAnchor={props.labelDef.anchor}
          fontSize={props.textFontSize}
          fill={fill}
        />
      </g>
      {callout}
    </>
  );
};
