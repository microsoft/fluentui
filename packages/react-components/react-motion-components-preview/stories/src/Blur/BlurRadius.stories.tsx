import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Card,
  CardFooter,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurRadiusDescription from './BlurRadius.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingVerticalXXXL,
    padding: tokens.spacingVerticalMNudge,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalXL,
    gap: tokens.spacingVerticalM,
  },
  cellNormal: {
    fontWeight: tokens.fontWeightRegular,
  },
  cellBold: {
    fontWeight: tokens.fontWeightBold,
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalXL,
  },
});

const blurRadiusCombinations = [
  // Top row: outRadius 5px, inRadius 0px (default)
  { outRadius: '5px', inRadius: '0px' },
  { outRadius: '10px', inRadius: '0px' },
  // Bottom row: outRadius 20px, with inRadius values
  { outRadius: '10px', inRadius: '1px' },
  { outRadius: '10px', inRadius: '2px' },
];

export const Radius = (): JSXElement => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<boolean[]>(() => blurRadiusCombinations.map(() => true));

  const toggleAll = () => {
    setVisibleStates(prev => prev.map(state => !state));
  };

  const toggleSingle = (index: number) => {
    setVisibleStates(prev => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
      <div className={classes.container}>
        {blurRadiusCombinations.map((option, index) => {
          const isVisible = visibleStates[index];
          return (
            <Card key={index} className={classes.card}>
              <Table size="small" noNativeElements aria-label="Blur radius values">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>outRadius</TableHeaderCell>
                    <TableHeaderCell>inRadius</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className={isVisible ? classes.cellNormal : classes.cellBold}>
                      {option.outRadius}
                    </TableCell>
                    <TableCell className={isVisible ? classes.cellBold : classes.cellNormal}>
                      {option.inRadius}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Blur visible={isVisible} outRadius={option.outRadius} inRadius={option.inRadius} animateOpacity={false}>
                <div>Lorem ipsum dolor sit amet</div>
              </Blur>
              <CardFooter>
                <Button appearance="primary" onClick={() => toggleSingle(index)}>
                  {isVisible ? 'Hide' : 'Show'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className={classes.controls}>
        <Button appearance="secondary" onClick={toggleAll}>
          Toggle All
        </Button>
      </div>
    </>
  );
};

Radius.parameters = {
  docs: {
    description: {
      story: BlurRadiusDescription,
    },
  },
};
