import * as React from 'react';
import * as ReactIcons from '@fluentui/react-icons';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const rootClass = mergeStyles({
  selectors: {
    '> *': {
      height: 50,
      width: 50,
      marginRight: 25,
    },
  },
});

const cellClass = mergeStyles({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '80px',
  float: 'left',
});

const codeClass = mergeStyles({
  background: '#f2f2f2',
  borderRadius: '4px',
  padding: '4px',
});

const navigationTextClasses = mergeStyles({
  width: 100,
  margin: '0 5px',
});

const icons = Object.keys(ReactIcons).reduce((acc: React.FC[], exportName) => {
  if (!!(ReactIcons as any)[exportName].displayName) {
    acc.push((ReactIcons as any)[exportName] as React.FC);
  }

  return acc;
}, []);

const numOfIcons = icons.length;
const numOfPages = parseInt((numOfIcons / 100).toString(), 10) + 1;

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
        <span className={navigationTextClasses}>
          Page {page} of {numOfPages}
        </span>
        <PrimaryButton onClick={nextPage} disabled={page === numOfPages}>
          Next
        </PrimaryButton>
      </div>
      <div className={rootClass}>
        {icons.slice((page - 1) * 100, (page - 1) * 100 + 100).map(Icon => (
          <div key={Icon.displayName} className={cellClass}>
            <Icon />
            <br />
            <code className={codeClass}>{Icon.displayName}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
