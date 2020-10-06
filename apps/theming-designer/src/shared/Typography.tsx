import { ITextProps, Text } from '@fluentui/react';
import * as React from 'react';

const titleTextStyles: ITextProps['styles'] = (p, theme) => ({
  root: {
    display: 'block',
    fontWeight: 600,
    color: theme.palette.neutralPrimary,
    fontSize: 20,
    marginBottom: 20,
  },
});

export const TitleText = (p: ITextProps) => <Text styles={titleTextStyles} {...p} />;
