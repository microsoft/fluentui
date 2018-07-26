import * as React from 'react';
import { Customizer, ITheme, createTheme, DefaultPalette } from 'office-ui-fabric-react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
// TODO: fix imports
// import { CollapsibleSection, ICollapsibleSectionStyleProps } from '@uifabric/experiments';
import {
  CollapsibleSection,
  CollapsibleSectionControlled,
  ICollapsibleSectionStyleProps,
  ICollapsibleSectionStyles,
  ICollapsibleSectionTitleStyleProps,
  ICollapsibleSectionTitleStyles
} from '../../CollapsibleSection/index';

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
              text: `Autocontrolled No Styling`
            }}
          >
            Body
          </CollapsibleSection>
          <br />
          <CollapsibleSection
            key={1}
            defaultCollapsed={false}
            titleProps={{
              text: `Autocontrolled JS Styling`,
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
                text: `Autocontrolled JS Styling + Customizer`,
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
              text: `Autocontrolled JS Styling + Theme Prop`,
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
                text: `Autocontrolled JS Styling + Customizer + Theme Prop`,
                styles: getTitleStyles
              }}
              styles={getStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSection>
          </Customizer>
          <br />
          <CollapsibleSectionControlled
            collapsed={false}
            titleProps={{
              text: `Uncontrolled No Styling`
            }}
          >
            Body
          </CollapsibleSectionControlled>
          <br />
          <CollapsibleSectionControlled
            collapsed={false}
            titleProps={{
              text: `Uncontrolled JS Styling`,
              styles: getTitleStyles
            }}
            styles={getStyles}
          >
            Body
          </CollapsibleSectionControlled>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSectionControlled
              collapsed={false}
              titleProps={{
                text: `Uncontrolled JS Styling + Customizer`,
                styles: getTitleStyles
              }}
              styles={getStyles}
            >
              TODO: Fix me. Customizer theme is not applying to me.
            </CollapsibleSectionControlled>
          </Customizer>
          <br />
          <CollapsibleSectionControlled
            collapsed={false}
            titleProps={{
              text: `Uncontrolled  JS Styling + Theme Prop`,
              styles: getTitleStyles
            }}
            styles={getStyles}
            theme={csPropTheme}
          >
            Body
          </CollapsibleSectionControlled>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSectionControlled
              collapsed={false}
              titleProps={{
                text: `Uncontrolled  JS Styling + Customizer + Theme Prop`,
                styles: getTitleStyles
              }}
              styles={getStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSectionControlled>
          </Customizer>
        </FocusZone>
      </div>
    );
  }
}
