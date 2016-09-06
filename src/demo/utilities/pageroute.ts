import { AppState } from '../components/app/AppState';
/*
  Retreive the route URL for a page in a group from the the AppState
*/
export function getPageRouteFromState(groupName: string, pageName: string): string {
  let route: string = '';
  AppState.examplePages.map((pageValue) => {
    if (groupName === pageValue.name) {
      pageValue.links.map((linkValue) => {
        if (linkValue.name === pageName) {
          route = linkValue.url;
        }
      });
    }
  });

  return route;
}