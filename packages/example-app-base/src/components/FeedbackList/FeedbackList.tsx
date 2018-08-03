import './FeedbackList.scss';

import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { relativeDates } from './relativeDates';

export interface IFeedbackListProps {
  title: string;
}

export interface IFeedbackListState {
  openIssues: IListItem[];
  closedIssues: IListItem[];
}

export interface IListItem {
  issueTitle: string;
  issueNum: number;
  issueCreated: string;
}

export class FeedbackList extends React.Component<IFeedbackListProps, IFeedbackListState, IListItem> {
  constructor(props: IFeedbackListProps) {
    super(props);
    this.state = {
      openIssues: [],
      closedIssues: []
    };
  }

  public componentDidMount(): void {
    let openList: IListItem[] = [];
    let closedList: IListItem[] = [];

    const githubUrl =
      'https://api.github.com/search/issues?q=type:issue%20repo:OfficeDev/office-ui-fabric-react%20label:%22Component:%20' +
      this.props.title;

    const openIssuesURL = githubUrl + '%22%20is:open';
    const closedIssuesURL = githubUrl + '%22%20is:closed';

    const openIssueRequest = new XMLHttpRequest();
    const closedIssueRequest = new XMLHttpRequest();

    openIssueRequest.onload = closedIssueRequest.onload = function(): void {
      if (this.readyState === 4 && this.status === 200) {
        const myObj = JSON.parse(this.responseText);

        for (let i = 0; i < myObj.total_count; i++) {
          let dateCreated = new Date(myObj.items[i].created_at);
          let openedOn = relativeDates(dateCreated, new Date());

          if (this === openIssueRequest) {
            openList.push({
              issueTitle: myObj.items[i].title,
              issueNum: myObj.items[i].number,
              issueCreated: openedOn
            });
          } else if (this === closedIssueRequest) {
            closedList.push({
              issueTitle: myObj.items[i].title,
              issueNum: myObj.items[i].number,
              issueCreated: openedOn
            });
          }
        }
      }
    };

    this.setState({
      openIssues: openList,
      closedIssues: closedList
    });

    openIssueRequest.open('get', openIssuesURL, true);
    closedIssueRequest.open('get', closedIssuesURL, true);

    openIssueRequest.send();
    closedIssueRequest.send();
  }

  public render(): JSX.Element | null {
    let { openIssues, closedIssues } = this.state;

    return (
      <div>
        <PrimaryButton
          href="https://github.com/OfficeDev/office-ui-fabric-react/issues/new/choose"
          target="_blank"
          primary={true}
          className="FeedbackList-button"
        >
          Submit GitHub Issue
        </PrimaryButton>

        <Pivot className="FeedbackList-pivot">
          <PivotItem linkText="Open Issues">
            <List
              items={openIssues}
              onRenderCell={this._onRenderCell}
              data-is-scrollable={true}
              className="FeedbackList-issueList"
            />
          </PivotItem>
          <PivotItem linkText="Closed Issues">
            <List
              items={closedIssues}
              onRenderCell={this._onRenderCell}
              data-is-scrollable={true}
              className="FeedbackList-issueList"
            />
          </PivotItem>
        </Pivot>
      </div>
    );
  }

  private _onRenderCell(item: IListItem, index: number, isScrolling: boolean): JSX.Element {
    return (
      <div className="ms-ListGhostingExample-itemCell" data-is-focusable={true}>
        <div className="ms-ListGhostingExample-itemName">
          <Link href={'https://github.com/OfficeDev/office-ui-fabric-react/issues/' + item.issueNum} target="_blank">
            <Label className="FeedbackList-listElement">{item.issueTitle}</Label>
          </Link>
          <Label className="FeedbackList-timeStamp">
            <Link href={'https://github.com/OfficeDev/office-ui-fabric-react/issues/' + item.issueNum} target="_blank">
              {'#' + item.issueNum}
            </Link>
            {' opened ' + item.issueCreated}
          </Label>
        </div>
      </div>
    );
  }
}
