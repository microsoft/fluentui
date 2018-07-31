import * as React from 'react';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, createTheme, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  CollapsibleSection,
  ICollapsibleSectionStyleProps,
  ICollapsibleSectionStyles,
  ICollapsibleSectionTitleStyleProps,
  ICollapsibleSectionTitleStyles
} from '@uifabric/experiments/lib/CollapsibleSection';

function getStyles(props: ICollapsibleSectionStyleProps): Partial<ICollapsibleSectionStyles> {
  const { theme } = props;
  return {
    root: [
      {
        background: theme.semanticColors.inputBackground
      }
    ],
    body: [
      theme.fonts.small,
      {
        background: theme.semanticColors.disabledBackground
      }
    ]
  };
}

function getTitleStyles(props: ICollapsibleSectionTitleStyleProps): Partial<ICollapsibleSectionTitleStyles> {
  const { theme } = props;
  return {
    text: [theme.fonts.large]
  };
}

const csCustomizerTheme: ITheme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeLight,
    inputBackground: DefaultPalette.themeLighter
  }
});

const csPropTheme: ITheme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeDarker,
    inputBackground: DefaultPalette.themeDark
  }
});

export class CollapsibleSectionStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <p>
          This is a demonstration of the various levels of theming and styling that have effect on created components,
          with and without state. Themes and styles should have priority based on how locally they are defined:
          individual props as highest priority followed by contextual (Customizer) and finally global.
        </p>
        <p>
          If everything is working correctly color gradients should gradually get darker within each type of component
          with any variant having Theme prop looking identical.
        </p>
        <FocusZone>
          <CollapsibleSection
            key={1}
            defaultCollapsed={false}
            titleProps={{
              text: `No Styling`
            }}
          >
            Body
          </CollapsibleSection>
          <br />
          <CollapsibleSection
            key={1}
            defaultCollapsed={false}
            titleProps={{
              text: `JS Styling`,
              styles: getTitleStyles
            }}
            styles={getStyles}
          >
            Body
          </CollapsibleSection>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSection
              key={1}
              defaultCollapsed={false}
              titleProps={{
                text: `JS Styling + Customizer`,
                styles: getTitleStyles
              }}
              styles={getStyles}
            >
              TODO: Fix me. Customizer theme is not applying to me.
            </CollapsibleSection>
          </Customizer>
          <br />
          <CollapsibleSection
            key={1}
            defaultCollapsed={false}
            titleProps={{
              text: `JS Styling + Theme Prop`,
              styles: getTitleStyles
            }}
            styles={getStyles}
            theme={csPropTheme}
          >
            Body
          </CollapsibleSection>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSection
              key={1}
              defaultCollapsed={false}
              titleProps={{
                text: `JS Styling + Customizer + Theme Prop`,
                styles: getTitleStyles
              }}
              styles={getStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSection>
          </Customizer>
        </FocusZone>
      </div>
    );
  }
}
