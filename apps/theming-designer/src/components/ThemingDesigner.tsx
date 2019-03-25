import * as React from 'react';
import * as stylesImport from './app.scss';
import { ColorPanel } from './ColorPanel';
import { FabricPalette } from './FabricPalette';
import { AccChecker } from './AccChecker';
import { SemanticSlots } from './SemanticSlots';
import { Samples } from './Samples';
import { Stack } from '../../../../packages/office-ui-fabric-react/lib/Stack';
import { IPalette, ISemanticColors, loadTheme, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';

const styles: any = stylesImport;

export class ThemingDesigner extends React.Component<{}, { theme: ITheme }> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: getTheme(true)
    };
  }
  public makeTheme() {}
  public render() {
    return (
      <div className={styles.app}>
        <Stack horizontal gap={20}>
          <div className={styles.sidebar}>
            <ColorPanel />
          </div>
          <div>
            <Stack className={styles.main} gap={10}>
              <Samples />
              <AccChecker />
              <FabricPalette theme={this.state.theme} />
              <SemanticSlots />
            </Stack>
          </div>
        </Stack>
      </div>
    );
  }
}
