import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { EmbedStylesProps } from '../../../../components/Embed/Embed';
import { EmbedVariables } from '../../../teams/components/Embed/embedVariables';
import { playIndicatorUrl } from '../../../teams/components/Embed/playIndicatorUrl';
import { pauseIndicatorUrl } from '../../../teams/components/Embed/pauseIndicatorUrl';

export const embedStyles: ComponentSlotStylesPrepared<EmbedStylesProps, EmbedVariables> = {
  control: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundImage: playIndicatorUrl('ButtonText'),

    ...(p.active && {
      backgroundImage: pauseIndicatorUrl('ButtonText'),
    }),
  }),
} as ComponentSlotStylesPrepared<EmbedStylesProps, EmbedVariables>;
