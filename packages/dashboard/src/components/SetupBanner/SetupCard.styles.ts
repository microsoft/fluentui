import { DefaultFontStyles, FontWeights, DefaultPalette, keyframes } from 'office-ui-fabric-react/lib/Styling';

import { ISetupCardStyles, ISetupCardStylesProps } from './SetupCard.types';

const freTransformIntro = keyframes({
  from: {
    animationTimingFunction: 'cubic-bezier(.29,1.35,.71,1.01)',
    transform: 'translateY(496px)'
  }
});

const freOpacityIntro = keyframes({
  from: {
    animationTimingFunction: 'cubic-bezier(0.28, 0, 0, 1)'
  },
  to: {
    opacity: '1'
  }
});

export const getStyles = (props: ISetupCardStylesProps): ISetupCardStyles => {
  return {
    root: {
      fill: 'none',
      opacity: '0',
      animation: `${freTransformIntro} .583s 1, ${freOpacityIntro} .583s 1`,
      animationFillMode: 'forwards',
      position: 'absolute'
    },
    title: {
      fill: DefaultPalette.black,
      ...DefaultFontStyles.tiny,
      fontWeight: FontWeights.semibold
    },
    cardBackground: {
      fill: DefaultPalette.white
    },
    cardContentBackground: {
      stroke: props.selected ? (props.checked ? '#6BB700' : '#0078D4') : '#FFF',
      strokeWidth: props.selected || (props.selected && props.checked) ? 200 : 0,
      strokeLinecap: 'round',
      transition: props.selected
        ? props.checked
          ? 'stroke .333s cubic-bezier(0,0,.74,.5) .133s'
          : 'stroke .333s cubic-bezier(0.28, 0, 0.67, 1)'
        : 'all .333s cubic-bezier(.38,.52,.68,.81)'
    },
    cardRightEdge: {
      fill: DefaultPalette.white
    },
    cardRightEdgeSeparator: {
      fill: DefaultPalette.black,
      opacity: '0.1'
    },
    cardRightEdgeShadow: {
      fill: '#00000034'
    },
    cardTopEdge: {
      fill: '#EFEFEB'
    },
    cardTopEdgeSeparator: {
      fill: DefaultPalette.black,
      opacity: '0.1'
    },
    checkmark: {
      fill: props.checked ? (props.selected ? '#FFF' : '#6BB700') : '#FFFFFF00',
      transition: props.checked && props.selected ? 'fill .333s cubic-bezier(.38,.52,.68,.81)' : 'fill .333s cubic-bezier(0.28, 0, 0.67, 1)'
    }
  };
};
