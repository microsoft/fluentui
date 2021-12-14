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
      "import { tokens } from '@fluentui/react-theme';

      const makeStyles = () => null;

      export const useStylesA = makeStyles({
        neutral:  ({
          border: \`5px solid \${tokens.colorNeutralStroke1}\`,
          color: tokens.colorNeutralForeground1,
        }),
        colors:  ({
          border: \`5px solid \${tokens.colorPaletteBlueBorder2}\`,
          color: tokens.colorPaletteMarigoldForeground2,
        }),
        shadow:  ({
          boxShadow: tokens.shadow8,
        }),
        border:  ({
          borderRadius: tokens.borderRadiusCircular,
        }),
        stroke:  ({
          borderBottomWidth: tokens.strokeWidthThin,
        }),
        type:  ({
          fontFamily: tokens.fontFamilyBase,
          fontSize: tokens.fontSizeBase300,
          lineHeight: tokens.lineHeightBase300,
          fontWeight: tokens.fontWeightRegular,
        }),
      });
      "
    `);
  });
});
