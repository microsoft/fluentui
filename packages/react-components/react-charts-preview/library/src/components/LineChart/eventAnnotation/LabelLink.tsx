import * as React from 'react';
import { EventAnnotation } from '../../../types/EventAnnotation';
import { Textbox } from './Textbox';
import { getColorFromToken } from '../../../utilities/colors';
import { tokens } from '@fluentui/react-theme';
import { PopoverComponent } from '../../CommonComponents/Popover';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { MenuList, MenuItem } from '@fluentui/react-menu';

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
  const [clickPosition, setClickPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const focusAttributes = useFocusableGroup();

  function updatePosition(newX: number, newY: number) {
    const threshold = 1; // Set a threshold for movement
    const { x, y } = clickPosition;
    // Calculate the distance moved
    const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
    // Update the position only if the distance moved is greater than the threshold
    if (distance > threshold) {
      setClickPosition({ x: newX, y: newY });
      setShowCard(true);
    }
  }

  const onClick = (e: React.MouseEvent<SVGGElement>) => updatePosition(e.clientX, e.clientY);
  const onDismiss = () => setShowCard(false);
  let callout: React.ReactNode = null;
  if (showCard) {
    const cards = props.labelDef.aggregatedIdx.map(i => props.lineDefs[i].onRenderCard!).filter(c => !!c);
    //convert the cards into a list of menuItem
    const cardsList = cards.map((card, index) => {
      return <MenuItem key={index}>{card}</MenuItem>;
    });
    if (cards.length > 0) {
      callout = null;
      callout = (
        <PopoverComponent
          clickPosition={clickPosition}
          isPopoverOpen={showCard}
          customCallout={{
            customizedCallout: (
              <div {...focusAttributes}>
                <MenuList>{cardsList}</MenuList>
              </div>
            ),
          }}
          inline={false}
          withArrow={true}
        />
      );
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
      <g ref={gRef} onClick={onClick} onMouseOut={onDismiss} data-is-focusable={false} style={{ cursor: 'pointer' }}>
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
