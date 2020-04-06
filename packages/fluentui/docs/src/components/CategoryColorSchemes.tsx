import * as React from 'react';
import * as _ from 'lodash';
import {
  createComponent,
  ComponentSlotStylesInput,
  ThemePrepared,
  Grid,
  Header,
  HeaderProps,
  ShorthandCollection,
} from '@fluentui/react-northstar';

import ColorBox from './ColorBox';

type ColorVariantsProps = {
  name?: string;
  themes?: ThemePrepared[];
  headers?: ShorthandCollection<HeaderProps>;
};

export const colorVariantsStyles: ComponentSlotStylesInput<ColorVariantsProps> = {
  root: {
    border: '1px solid transparent',
    borderRadius: '.25rem',
    overflow: 'hidden',
  },
};

const CategoryColorSchemes = createComponent<ColorVariantsProps>({
  displayName: 'ColorVariants',
  render: ({ name, themes, headers, config: { classes } }) => {
    if (themes.length === 0) return <></>;

    const colorSchemes = _.map(themes, theme => theme.siteVariables.categoryColorScheme[name]);

    const elements = _.flatMap(_.head(colorSchemes), (i, token) => [
      <ColorBox
        copyToClipboardIcon={false}
        showColorValue={false}
        name={token}
        key={`${token}schema`}
        size="small"
        value={undefined}
        styles={{ backgroundColor: '#f2f2f2' }}
      />,
      ..._.map(colorSchemes, (colorScheme, i) => (
        <ColorBox key={`${token}${i}`} size="small" value={colorScheme[token]} copyToClipboardIcon={false} />
      )),
    ]);

    const columns = `auto ${_.times(themes.length, () => '180px').join(' ')}`;
    return (
      <div className={classes.root}>
        <Grid columns={columns}>
          {headers && headers.map(header => Header.create(header))}
          {elements}
        </Grid>
      </div>
    );
  },
});

export default CategoryColorSchemes;
