import * as React from 'react';
import * as stylesImport from './app.scss';
import { ThemingDesignerColorPicker } from './ThemingDesignerColorPicker';
import { Palette } from './Palette';
import { AccChecker } from './AccChecker';
import { SemanticSlots } from './SemanticSlots';

import { Stack } from '../../../../packages/office-ui-fabric-react/lib/Stack';

const styles: any = stylesImport;

export class ThemingDesigner extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.sidebar}>
          <ThemingDesignerColorPicker />
        </div>
        <div className={styles.main}>
          <Stack>
            <AccChecker />
            <Palette />
            <SemanticSlots />
          </Stack>
        </div>
      </div>
    );
  }
}
