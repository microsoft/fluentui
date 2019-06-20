import * as React from 'react';
import { ITheme, IThemeRules } from 'office-ui-fabric-react';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { TitleText } from '../shared/Typography';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import { FabricPalette } from './FabricPalette';
import { SemanticSlots } from './SemanticSlots';

export interface IThemeSlotsProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
}

export const ThemeSlots: React.StatelessComponent<IThemeSlotsProps> = (props: IThemeSlotsProps) => {
  return (
    <div className={MainPanelInnerContent}>
      <TitleText>Theme Slots</TitleText>
      <Pivot>
        <PivotItem headerText="Fabric palette slots">
          <FabricPalette themeRules={props.themeRules} />
        </PivotItem>
        <PivotItem headerText="Semantic slots">
          <SemanticSlots theme={props.theme} />
        </PivotItem>
      </Pivot>
    </div>
  );
};
