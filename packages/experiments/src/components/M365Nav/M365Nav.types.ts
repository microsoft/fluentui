import { INavLink, INavProps } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';

export interface IM365NavProps extends INavProps {
    /**
     * Used to toggle the nav component between expanded and collapsed state
     */
    isNavCollapsed?: boolean;

    /**
     * Optional: If used inside a parent element with scrollbar, provide the parent element id to properly position
     * the floating nav by considering the scroll bar.
     */
    navScrollerId?: string;

    /**
     * Optional: callback for the parent component when the nav component is toggled between expanded and collapsed state
     */
    onNavCollapsedCallback?(isCollapsed: boolean): void;
}

export interface IM365NavState extends INavState {
    /**
     * Used to toggle the nav component between expanded and collapsed state.
     */
    isNavCollapsed?: boolean;
}

export interface IM365NavLink extends INavLink {
    /* used to adjust the floating nav when the scrollbar appears */
    scrollTop?: number;
}
