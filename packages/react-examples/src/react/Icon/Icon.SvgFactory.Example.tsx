import * as React from 'react';
import * as ReactIcons from '@fluentui/react-icons-mdl2';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const classes = mergeStyleSets({
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px',
    float: 'left',
    height: '50px',
    width: '50px',
  },
  icon: {
    fontSize: '50px',
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
  if ((ReactIcons as any)[exportName]?.displayName) {
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
        <PrimaryButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={prevPage}
          disabled={page === 1}
        >
          Prev
        </PrimaryButton>
        <span className={classes.navigationText}>
          Page {page} of {numOfPages}
        </span>
        <PrimaryButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={nextPage}
          disabled={page === numOfPages}
        >
          Next
        </PrimaryButton>
      </div>
      <div>
        {icons
          .slice((page - 1) * 100, (page - 1) * 100 + 100)
          .map((Icon: React.FunctionComponent<ReactIcons.ISvgIconProps>) => (
            <div key={Icon.displayName} className={classes.cell}>
              {/*
                Provide an `aria-label` for screen reader users if the icon is not accompanied by
                text that conveys the same meaning.
              */}
              <Icon aria-label={Icon.displayName?.replace('Icon', '')} className={classes.icon} />
              <br />
              <code className={classes.code}>{Icon.displayName}</code>
            </div>
          ))}
      </div>
    </div>
  );
};
