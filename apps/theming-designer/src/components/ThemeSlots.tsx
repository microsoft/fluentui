import * as React from 'react';
import { ITheme, FabricSlots, IThemeRules } from '@fluentui/react';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { TitleText } from '../shared/Typography';
import { Pivot, PivotItem } from '@fluentui/react';
import { FabricPalette } from './FabricPalette';
import { SemanticSlots } from './SemanticSlots';
import { IColor } from '@fluentui/react/lib/Color';

export interface IThemeSlotsProps {
  theme?: ITheme;
  themeRules: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
}

export const ThemeSlots: React.FunctionComponent<IThemeSlotsProps> = (props: IThemeSlotsProps) => {
  return (
    <div className={MainPanelInnerContent}>
      <TitleText>Theme slots</TitleText>
      <Pivot>
        <PivotItem headerText="Fabric palette slots">
          <FabricPalette themeRules={props.themeRules} onFabricPaletteColorChange={props.onFabricPaletteColorChange} />
        </PivotItem>
        <PivotItem headerText="Semantic slots">
          <SemanticSlots theme={props.theme} />
        </PivotItem>
      </Pivot>
    </div>
  );
};
