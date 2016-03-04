import * as React from 'react';
import './Card.scss';
import { FocusZone, FocusZoneDirection } from '../../../../../../utilities/focus/index';

export interface ICardProps {
  focusNamespace?: string;
}

export default class Card extends React.Component<ICardProps, any> {

  public componentDidMount(): void {
  }

  public render() {
    return (
      <FocusZone
      className="CardWrapper"
      isChildZone={ true }
      focusNamespace={ this.props.focusNamespace }>
        <div
        data-is-focusable={ true }
        data-focusable-context="Card"
        className="CardSample">
          <FocusZone
          isCircularNavigation={ true }
          focusNamespace="TidBit">
          <div className="ContainerCard-header">
            <div
            data-is-focusable={ true }
            data-focusable-context="TidBit"
            className="ContainerCard-title">T3</div>
          </div>
          <div className="ContainerCard-Activities">
            <div className="Activity hasPersona">
              <img className="ms-Persona-image" src="https://msft.spoppe.com/_layouts/15/UserPhoto.aspx?size=s&amp;userName=davguerr@microsoft.com" />
              <a data-focusable-context="TidBit" title="You viewed &quot;OCE Schedule Workbook&quot; on 1/29/2016" href="#" className="Activity-description">You viewed <strong>OCE Schedule Workbook</strong> on 1/29/2016</a>
            </div>
            <div className="Activity hasPersona">
              <img className="ms-Persona-image" src="https://msft.spoppe.com/_layouts/15/UserPhoto.aspx?size=s&amp;userName=davguerr@microsoft.com" />
              <a data-focusable-context="TidBit" title="Roger Gu modified &quot;Allow users to see recycle bin items which they can before deletion&quot; 11 hours ago" href="#" className="Activity-description">Roger Gu modified <strong>Allow users to...e deletion</strong> 11 hours ago</a>
            </div>
            <div className="Activity hasPersona">
              <img className="ms-Persona-image" src="https://msft.spoppe.com/_layouts/15/UserPhoto.aspx?size=s&amp;userName=davguerr@microsoft.com" />
              <a data-focusable-context="TidBit" title="Ben Parker modified &quot;Team Escalations Contacts During Business Hours&quot; 12 hours ago" href="#" className="Activity-description">Ben Parker modified <strong>Team Escalati...ess Hours</strong> 12 hours ago</a>
            </div>
          </div>
          <div className="ContainerCard-socialButtons">
            <a data-focusable-context="TidBit" title="Follow" className="ContainerCard-socialButton" href="#">
              FI<i className="mdl2-Icon mdl2-Icon--favoriteStar"></i>
            </a>
          </div>
          </FocusZone>
        </div>
      </FocusZone>
    );
  }
}