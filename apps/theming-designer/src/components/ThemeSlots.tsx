import * as React from 'react';
import { ITheme, FabricSlots, IThemeRules } from 'office-ui-fabric-react';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { TitleText } from '../shared/Typography';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import { FabricPalette } from './FabricPalette';
import { SemanticSlots } from './SemanticSlots';
import { IColor } from 'office-ui-fabric-react/lib/Color';

export interface IThemeSlotsProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
}

export const ThemeSlots: React.StatelessComponent<IThemeSlotsProps> = (props: IThemeSlotsProps) => {
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
