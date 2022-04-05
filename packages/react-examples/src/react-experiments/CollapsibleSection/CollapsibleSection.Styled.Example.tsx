import * as React from 'react';
import { Customizer as DeprecatedCustomizer } from '@fluentui/react/lib/Utilities';
import { ITheme, createTheme, DefaultPalette } from '@fluentui/react/lib/Styling';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import {
  CollapsibleSection,
  CollapsibleSectionStateless,
  ICollapsibleSectionComponent,
  ICollapsibleSectionStylesReturnType,
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleStylesReturnType,
} from '@fluentui/react-experiments/lib/CollapsibleSection';

// Workaround to prevent errors on usage of Customizer in this file, without disabling all deprecation checks
// eslint-disable-next-line deprecation/deprecation
const Customizer = DeprecatedCustomizer;

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

const getCustomizerStyles: ICollapsibleSectionComponent['styles'] = (
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

const getCustomizerTitleStyles: ICollapsibleSectionTitleComponent['styles'] = (
  props,
  theme,
): ICollapsibleSectionTitleStylesReturnType => ({
  chevron: { color: theme.semanticColors.link },
  text: { color: theme.semanticColors.link },
});

const csCustomizerTheme: ITheme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeLight,
    inputBackground: DefaultPalette.themeLighter,
  },
});

const csPropTheme: ITheme = createTheme({
  semanticColors: {
    disabledBackground: DefaultPalette.themeDarker,
    inputBackground: DefaultPalette.themeDark,
  },
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
          <Customizer
            scopedSettings={{
              CollapsibleSection: { styles: getCustomizerStyles },
              CollapsibleSectionTitle: { styles: getCustomizerTitleStyles },
            }}
          >
            <CollapsibleSection
              key={3}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + Customizer Styles',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSection>
          </Customizer>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSection
              key={4}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + Customizer Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSection>
          </Customizer>
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
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSection
              key={6}
              defaultCollapsed={false}
              title={{
                text: 'Prop Styles + Customizer Theme + Prop Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSection>
          </Customizer>
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
          <Customizer
            scopedSettings={{
              CollapsibleSection: { styles: getCustomizerStyles },
              CollapsibleSectionTitle: { styles: getCustomizerTitleStyles },
            }}
          >
            <CollapsibleSectionStateless
              key={9}
              collapsed={false}
              title={{
                text: 'Prop Styles + Customizer Styles',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSectionStateless>
          </Customizer>
          <br />
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSectionStateless
              key={10}
              collapsed={false}
              title={{
                text: 'Prop Styles + Customizer Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
            >
              Body
            </CollapsibleSectionStateless>
          </Customizer>
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
          <Customizer settings={{ theme: csCustomizerTheme }}>
            <CollapsibleSectionStateless
              key={12}
              collapsed={false}
              title={{
                text: 'Prop Styles + Customizer Theme + Prop Theme',
                styles: getPropTitleStyles,
              }}
              styles={getPropStyles}
              theme={csPropTheme}
            >
              Body
            </CollapsibleSectionStateless>
          </Customizer>
        </FocusZone>
      </div>
    );
  }
}
