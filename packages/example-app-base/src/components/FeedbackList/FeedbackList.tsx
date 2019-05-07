import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { styled, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

import { relativeDates } from './relativeDates';
import { IFeedbackListProps, IFeedbackListStyleProps, IFeedbackListStyles } from './FeedbackList.types';
import { getStyles } from './FeedbackList.styles';

export interface IFeedbackListState {
  openIssues: IListItem[];
  closedIssues: IListItem[];
}

export interface IListItem {
  issueTitle: string;
  issueNum: number;
  issueCreated: string;
}

const getClassNames = classNamesFunction<IFeedbackListStyleProps, IFeedbackListStyles>();

export class FeedbackListBase extends React.Component<IFeedbackListProps, IFeedbackListState, IListItem> {
  private _classNames: IProcessedStyleSet<IFeedbackListStyles>;
  private _isMounted: boolean;

  constructor(props: IFeedbackListProps) {
    super(props);
    this.state = {
      openIssues: [],
      closedIssues: []
    };
  }

  public async componentDidMount(): Promise<void> {
    this._isMounted = true;
    const githubUrl =
      'https://api.github.com/search/issues?q=type:issue%20repo:OfficeDev/office-ui-fabric-react%20label:%22Component:%20' +
      this.props.title;

    const openIssuesURL = githubUrl + '%22%20is:open';
    const closedIssuesURL = githubUrl + '%22%20is:closed';

    const results = await Promise.all([this._getIssues(openIssuesURL), this._getIssues(closedIssuesURL)]);

    if (this._isMounted) {
      this.setState({ openIssues: results[0], closedIssues: results[1] });
    }
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render(): JSX.Element | null {
    const { styles, theme } = this.props;
    const { openIssues, closedIssues } = this.state;

    const classNames = (this._classNames = getClassNames(styles, { theme }));
    const { subComponentStyles } = classNames;

    return (
      <div className={classNames.root}>
        <div>
          <PrimaryButton
            href="https://github.com/OfficeDev/office-ui-fabric-react/issues/new/choose"
            target="_blank"
            className={classNames.button}
          >
            Submit GitHub Issue
          </PrimaryButton>
        </div>
        {(openIssues.length > 0 || closedIssues.length > 0) && (
          <Pivot styles={subComponentStyles.pivot}>
            <PivotItem headerText="Open Issues">
              <List items={openIssues} onRenderCell={this._onRenderCell} data-is-scrollable={true} className={classNames.issueList} />
            </PivotItem>
            <PivotItem headerText="Closed Issues">
              <List items={closedIssues} onRenderCell={this._onRenderCell} data-is-scrollable={true} className={classNames.issueList} />
            </PivotItem>
          </Pivot>
        )}
      </div>
    );
  }

  private async _getIssues(url: string): Promise<IListItem[]> {
    const response = await fetch(url);
    const responseText = await response.text();

    const { items = [] } = JSON.parse(responseText);

    // Intentionally render the first 30 issues until pagination support is added for
    // https://github.com/OfficeDev/office-ui-fabric-react/issues/8284
    return items.map((item: { created_at: string; title: string; number: number }) => {
      const dateCreated = new Date(item.created_at);
      const openedOn = relativeDates(dateCreated, new Date());

      return {
        issueTitle: item.title,
        issueNum: item.number,
        issueCreated: openedOn
      };
    });
  }

  private _onRenderCell = (item: IListItem): JSX.Element => {
    const classNames = this._classNames;
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <div className={classNames.itemName}>
          <Link href={'https://github.com/OfficeDev/office-ui-fabric-react/issues/' + item.issueNum} target="_blank">
            <Label className={classNames.itemLabel}>{item.issueTitle}</Label>
          </Link>
          <Label className={classNames.timeStamp}>
            <Link href={'https://github.com/OfficeDev/office-ui-fabric-react/issues/' + item.issueNum} target="_blank">
              {'#' + item.issueNum}
            </Link>
            {' opened ' + item.issueCreated}
          </Label>
        </div>
      </div>
    );
  };
}

export const FeedbackList: React.StatelessComponent<IFeedbackListProps> = styled<
  IFeedbackListProps,
  IFeedbackListStyleProps,
  IFeedbackListStyles
>(FeedbackListBase, getStyles, undefined, {
  scope: 'FeedbackList'
});
