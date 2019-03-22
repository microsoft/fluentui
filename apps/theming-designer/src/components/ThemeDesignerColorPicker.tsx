import * as React from 'react';
import { TextField } from '../../../../packages/office-ui-fabric-react/lib/TextField';
import * as stylesImport from './app.scss';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';

const styles: any = stylesImport;

export const ThemeDesignerColorPicker = (props: any) => {
  const handleChange = (event: any, newVal: string | undefined) => {
    props.onChange(newVal);
  };
  return (
    <Stack horizontal gap={10}>
      <Text>{props.label}</Text>
      <Stack horizontal className={styles.colorpanel} gap={20}>
        <div id="colorbox" className={styles.colorbox} style={{ backgroundColor: props.value }} />
        <TextField value={props.value} onChange={handleChange} />
      </Stack>
    </Stack>
  );
};
