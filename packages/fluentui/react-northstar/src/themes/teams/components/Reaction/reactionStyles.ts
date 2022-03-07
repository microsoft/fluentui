import { Property } from 'csstype';
import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ReactionStylesProps, reactionSlotClassNames } from '../../../../components/Reaction/Reaction';
import { pxToRem } from '../../../../utils';
import { ReactionVariables } from './reactionVariables';

const contentClassNameSelector = `& .${reactionSlotClassNames.content}`;

export const reactionStyles: ComponentSlotStylesPrepared<ReactionStylesProps, ReactionVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    cursor: 'pointer',
    background: 'transparent',
    border: pxToRem(0),
    padding: pxToRem(0),
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: v.meReacting ? v.meReactingColor : v.otherReactingColor,
    ':hover': {
      color: v.meReacting ? v.meReactingColorHover : v.otherReactingColorHover,
      [contentClassNameSelector]: {
        fontWeight: v.fontWeightHover as Property.FontWeight,
      },
    },
    position: 'relative',
    ':focus': {
      outline: 'none',
    },
    ':focus-visible': {
      ':after': {
        content: '""',
        position: 'absolute',
        top: `-${pxToRem(2)}`,
        right: `-${pxToRem(2)}`,
        bottom: `-${pxToRem(2)}`,
        left: `-${pxToRem(2)}`,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: v.borderColorFocus,
        borderRadius: siteVariables.borderRadiusMedium,
        boxShadow: `0px 0px 0px 1px ${v.boxShadowColor} inset`,
      },
    },
  }),
  icon: ({ props: p }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: p.hasContent ? pxToRem(4) : pxToRem(0),
  }),
  content: ({ variables: v }) => ({
    fontSize: v.contentFontSize,
  }),
};
