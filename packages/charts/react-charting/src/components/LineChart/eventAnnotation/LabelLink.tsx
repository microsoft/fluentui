import * as React from 'react';
import { Callout, FocusZone, FocusZoneDirection, List } from '@fluentui/react';
import { IEventAnnotation } from '../../../types/IEventAnnotation';
import { Textbox } from './Textbox';
import { ITheme } from '@fluentui/react/lib/Styling';
import { getColorFromToken } from '../../../utilities/colors';

export interface ILineDef extends IEventAnnotation {
  x: number;
}

export interface ILabelDef {
  x: number;
  aggregatedIdx: number[];
  anchor: 'start' | 'end';
}

interface ILabelLinkProps {
  lineDefs: ILineDef[];
  labelDef: ILabelDef;
  textY: number;
  textWidth: number;
  textLineHeight: number;
  textFontSize: string;
  textColor: string | undefined;
  theme: ITheme | undefined;
  mergedLabel: (count: number) => string;
}

export const LabelLink: React.FunctionComponent<ILabelLinkProps> = props => {
  const gRef = React.useRef<SVGGElement>(null);
  const [showCard, setShowCard] = React.useState(false);
  const onDismiss = () => setShowCard(false);
  const onClick = () => setShowCard(true);
  const onRenderCell = (i: (() => React.ReactNode) | undefined) => <div data-is-focusable={true}>{i && i()}</div>;

  let callout: React.ReactNode = null;
  if (showCard) {
    const cards = props.labelDef.aggregatedIdx.map(i => props.lineDefs[i].onRenderCard!).filter(c => !!c);
    if (cards.length > 0) {
      callout = (
        <Callout
          target={gRef.current}
          // eslint-disable-next-line react/jsx-no-bind
          onDismiss={onDismiss}
          setInitialFocus={true}
          role="dialog"
        >
          <FocusZone isCircularNavigation={true} direction={FocusZoneDirection.vertical}>
            <List<() => React.ReactNode>
              items={cards}
              role="alert"
              aria-roledescription=" "
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCell={onRenderCell}
            />
          </FocusZone>
        </Callout>
      );
    }
  }

  let text: string;
  const fill: string | undefined = props.textColor
    ? getColorFromToken(props.textColor, props.theme?.isInverted)
    : props.theme?.semanticColors.messageText;

  if (props.labelDef.aggregatedIdx.length === 1) {
    text = props.lineDefs[props.labelDef.aggregatedIdx[0]].event;
  } else {
    text = props.mergedLabel(props.labelDef.aggregatedIdx.length);
  }

  return (
    <>
      <g ref={gRef} onClick={onClick} data-is-focusable={true} style={{ cursor: 'pointer' }}>
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
