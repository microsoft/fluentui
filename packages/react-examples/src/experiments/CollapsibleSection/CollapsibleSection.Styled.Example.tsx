import * as React from 'react';
import { Theme, PartialTheme, ThemeProvider, createTheme, DefaultPalette } from '@fluentui/react/lib/Styling';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import {
  CollapsibleSection,
  CollapsibleSectionStateless,
  ICollapsibleSectionComponent,
  ICollapsibleSectionStylesReturnType,
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleStylesReturnType,
} from '@uifabric/experiments/lib/CollapsibleSection';

const getPropStyles: ICollapsibleSectionComponent['styles'] = (props, theme): ICollapsibleSectionStylesReturnType => ({
  root: [
    {
      background: theme.semanticColors.inputBackground,
    },
  ],
  body: [
    theme.fonts.small,
    {
      background: theme.semanticColors.disabledBackground,
    },
  ],
});

const getCollapsibleSectionStyles: ICollapsibleSectionComponent['styles'] = (
  props,
  theme,
): ICollapsibleSectionStylesReturnType => ({
  body: [
    {
      color: theme.semanticColors.link,
    },
  ],
});

const getPropTitleStyles: ICollapsibleSectionTitleComponent['styles'] = (
  props,
  theme,
): ICollapsibleSectionTitleStylesReturnType => ({
  text: [theme.fonts.large],
});

const getCollapsibleSectionTitleStyles: ICollapsibleSectionTitleComponent['styles'] = (
  props,
  theme,
): ICollapsibleSectionTitleStylesReturnType => ({
  chevron: { color: theme.semanticColors.link },
  text: { color: theme.semanticColors.link },
});

const csTheme: Theme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeLight,
    inputBackground: DefaultPalette.themeLighter,
  },
});

const csPropTheme: Theme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeDarker,
    inputBackground: DefaultPalette.themeDark,
  },
});

const csComponentStyles: PartialTheme = {
  components: {
    CollapsibleSection: { styles: getCollapsibleSectionStyles },
    CollapsibleSectionTitle: { styles: getCollapsibleSectionTitleStyles },
  },
};

export class CollapsibleSectionStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <p>
          This is a demonstration of the various levels of theming and styling that have effect on created components,
          with and without state. Themes and styles should have priority based on how locally they are defined:
          individual props as highest priority followed by contextual (ThemeProvider) and finally global.
        </p>
        <p>
          If everything is working correctly color gradients should gradually get darker within each type of component
          with any variant having Theme prop looking identical.
        </p>
        <p>
          <b>Stateful Components</b>
        </p>
        <FocusZone>
          <CollapsibleSection key={1} defaultCollapsed={false} title="No Styling">
            Body
          </CollapsibleSection>
          <br />
          <CollapsibleSection
            key={2}
            defaultCollapsed={false}
            title={{
              text: 'Prop Styles',
              styles: getPropTitleStyles,
            }}
            styles={getPropStyles}
          >
            Body
          </CollapsibleSection>
          <br />
          <ThemeProvider theme={csComponentStyles}>
            <CollapsibleSection
              key={3}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Components Styles',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSection>
          </ThemeProvider>
          <br />
          <ThemeProvider theme={csTheme}>
            <CollapsibleSection
              key={4}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSection>
          </ThemeProvider>
          <br />
          <CollapsibleSection
            key={5}
            defaultCollapsed={false}
            title={{
              text: 'Prop Styles + Prop Theme',
              styles: getPropTitleStyles,
            }}
            styles={getPropStyles}
            theme={csPropTheme}
          >
            Body
          </CollapsibleSection>
          <br />
          <ThemeProvider theme={csTheme}>
            <CollapsibleSection
              key={6}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Theme + Prop Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSection>
          </ThemeProvider>
          <p>
            <b>Stateless Components</b>
          </p>
          <CollapsibleSectionStateless key={7} collapsed={false} title="No Styling">
            Body
          </CollapsibleSectionStateless>
          <br />
          <CollapsibleSectionStateless
            key={8}
            collapsed={false}
            title={{
              text: 'Prop Styles',
              styles: getPropTitleStyles,
            }}
            styles={getPropStyles}
          >
            Body
          </CollapsibleSectionStateless>
          <br />
          <ThemeProvider theme={csComponentStyles}>
            <CollapsibleSectionStateless
              key={9}
              collapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Components Styles',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSectionStateless>
          </ThemeProvider>
          <br />
          <ThemeProvider theme={csTheme}>
            <CollapsibleSectionStateless
              key={10}
              collapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSectionStateless>
          </ThemeProvider>
          <br />
          <CollapsibleSectionStateless
            key={11}
            collapsed={false}
            title={{
              text: 'Prop Styles + Prop Theme',
              styles: getPropTitleStyles,
            }}
            styles={getPropStyles}
            theme={csPropTheme}
          >
            Body
          </CollapsibleSectionStateless>
          <br />
          <ThemeProvider theme={csTheme}>
            <CollapsibleSectionStateless
              key={12}
              collapsed={false}
              title={{
                text: 'Prop Styles + ThemeProvider Theme + Prop Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSectionStateless>
          </ThemeProvider>
        </FocusZone>
      </div>
    );
  }
}
