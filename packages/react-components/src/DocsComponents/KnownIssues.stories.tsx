import { makeStyles } from '../index';
import * as React from 'react';

type GitHubUser = {
  login: string;
};

/* eslint-disable @typescript-eslint/naming-convention */
type GitHubIssue = {
  html_url: string;
  title: string;
  number: number;
  created_at: Date;
  user: GitHubUser;
};
/* eslint-enable @typescript-eslint/naming-convention */

const useStyles = makeStyles({
  issue: {
    display: 'flex',
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
  },
  openIssueIconContainer: {
    paddingRight: '8px',
    fill: '#1a7f37',
    flexShrink: 0,
    flexGrow: 0,
  },
  openIssueIcon: {
    paddingTop: '8px',
    paddingLeft: '16px',
    fill: '#1a7f37',
  },
  issueTitle: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#24292f',
    textDecorationLine: 'none',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  },
  issueDetails: {
    flexBasis: '100%',
    fontSize: '12px',
    marginTop: '4px',
    color: '#57606a',
  },
  link: {
    color: '#0078d4',
    textDecorationLine: 'none',
  },
});

export const KnownIssues: React.FC<{ componentName: string }> = ({ componentName }) => {
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [issuesList, setIssuesList] = React.useState<GitHubIssue[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          'https://api.github.com/repos/microsoft/fluentui/issues?' +
            new URLSearchParams({
              labels: ['Type: Bug :bug:', 'Fluent UI vNext', 'Component: ' + componentName].join(','),
            }),
        );
        const issuesJson: GitHubIssue[] = await response.json();

        if ((response.status >= 400 && response.status < 600) || !Array.isArray(issuesList)) {
          throw new Error('Bad response returned from GitHub');
        }

        setIssuesList(issuesJson);
        setIsLoaded(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isLoaded && !isLoading) {
      fetchData();
    }
  }, [componentName, issuesList, isLoaded, isLoading]);

  const styles = useStyles();

  return (
    <>
      <div id="known-issues">
        <h2>Known issues</h2>
        <div>
          {issuesList.map((issue: GitHubIssue, index) => (
            <div className={styles.issue} key={index}>
              <div className={styles.openIssueIconContainer}>
                <svg
                  className={styles.openIssueIcon}
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path
                    fill-rule="evenodd"
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                  />
                </svg>
              </div>
              <div>
                <a href={issue.html_url} target="_blank" className={styles.issueTitle}>
                  {issue.title}
                </a>
                <div className={styles.issueDetails}>
                  #{issue.number} opened on {new Date(issue.created_at).toDateString()} by {issue.user.login}
                </div>
              </div>
            </div>
          ))}
        </div>
        {(isLoading && (
          <>
            Loading ...
            <br />
            <br />
          </>
        )) ||
          (isError && 'Unable to load known issues. ') ||
          (issuesList.length === 0 && 'No issues are known. ') ||
          (issuesList.length > 0 && <br />)}
        Is something not working well?{' '}
        <a className={styles.link} href="#" target="_blank">
          Report a bug
        </a>{' '}
        on GitHub.
      </div>
    </>
  );
};
