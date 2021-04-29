import * as React from 'react';
import { Flex, FlexAlignment } from '@fluentui/react-flex';
import { select, text, boolean, number } from '@storybook/addon-knobs';
import { FlexDirectionProperty } from 'csstype';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Segoe UI',
    fontWeight: 'bold',
    color: '#F20000',
    border: '1px solid black',
    height: '260px',
    width: '260px',
    '> *': {
      height: '100px',
      width: '100px',
      backgroundColor: 'white',
      padding: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '> :nth-child(1)': {
      backgroundColor: '#F25022',
    },
    '> :nth-child(2)': {
      backgroundColor: '#7FBA00',
    },
    '> :nth-child(3)': {
      backgroundColor: '#00A4EF',
    },
    '> :nth-child(4)': {
      backgroundColor: '#FFB900',
    },
  },
});

const directionOptions: FlexDirectionProperty[] = ['row', 'row-reverse', 'column', 'column-reverse'];
const alignmentOptions: FlexAlignment[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'baseline',
];
export const Default = () => {
  const styles = useStyles();

  return (
    <Flex
      direction={select('Direction', directionOptions, 'row')}
      horizontalAlign={select('Horizontal Alignment', alignmentOptions, 'normal')}
      verticalAlign={select('Vertical Alignment', alignmentOptions, 'normal')}
      gap={text('Gap', '10px')}
      wrap={boolean('Wrap', false)}
      grow={number('Grow', 0)}
      shrink={number('Shrink', 1)}
      inline={boolean('Inline', false)}
      className={styles.root}
    >
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Flex>
  );
};
