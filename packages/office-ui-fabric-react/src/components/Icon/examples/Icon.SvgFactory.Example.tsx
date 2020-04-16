import * as React from 'react';
import * as ReactIcons from '@fluentui/react-icons';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classes = mergeStyleSets({
  root: {
    selectors: {
      '> *': {
        height: 50,
        width: 50,
        marginRight: 25,
      },
    },
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px',
    float: 'left',
  },
  code: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '4px',
  },
  navigationText: {
    width: 100,
    margin: '0 5px',
  },
});

const icons = Object.keys(ReactIcons).reduce((acc: React.FC[], exportName) => {
  if (!!(ReactIcons as any)[exportName].displayName) {
    acc.push((ReactIcons as any)[exportName] as React.FunctionComponent);
  }

  return acc;
}, []);

const numOfIcons = icons.length;
const numOfPages = parseInt((numOfIcons / 100).toString(), 10) + (numOfIcons % 100 > 0 ? 1 : 0);

export const IconSvgFactoryExample: React.FunctionComponent = () => {
  const [page, setPage] = React.useState(1);
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div>
      <div>
        <PrimaryButton onClick={prevPage} disabled={page === 1}>
          Prev
        </PrimaryButton>
        <span className={classes.navigationText}>
          Page {page} of {numOfPages}
        </span>
        <PrimaryButton onClick={nextPage} disabled={page === numOfPages}>
          Next
        </PrimaryButton>
      </div>
      <div className={classes.root}>
        {icons.slice((page - 1) * 100, (page - 1) * 100 + 100).map(Icon => (
          <div key={Icon.displayName} className={classes.cell}>
            <Icon />
            <br />
            <code className={classes.code}>{Icon.displayName}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
