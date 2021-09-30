import { Project } from 'ts-morph';
import v9ThemeFlattening from '../../mods/v9ThemeFlattening/v9ThemeFlattening.mod';

describe('v9: Theme flattening', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/v9/**/*.ts`);
  });

  it('handles theme changes', () => {
    const file = project.getSourceFileOrThrow('mMakeStylesDeep.ts');
    v9ThemeFlattening.run(file);

    expect(file.getText()).toMatchInlineSnapshot(`
      "import { makeStyles } from '@fluentui/react-make-styles';

      export const useStylesA = makeStyles({
        neutral: theme => ({
          border: \`5px solid \${theme.colorNeutralStroke1}\`,
          color: theme.colorNeutralForeground1,
        }),
        colors: theme => ({
          border: \`5px solid \${theme.colorPaletteBlueBorder2}\`,
          color: theme.colorPaletteMarigoldForeground2,
        }),
        shadow: theme => ({
          boxShadow: theme.shadowLevelShadow8,
        }),
        border: theme => ({
          borderRadius: theme.borderRadiusCircular,
        }),
        stroke: theme => ({
          borderBottomWidth: theme.strokeWidthThin,
        }),
        type: theme => ({
          fontFamily: theme.fontFamilyBase,
          fontSize: theme.fontSizeBase300,
          lineHeight: theme.lineHeightBase300,
          fontWeight: theme.fontWeightRegular,
        }),
      });
      "
    `);
  });
});
