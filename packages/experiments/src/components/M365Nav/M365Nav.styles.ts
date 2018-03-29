/* tslint:disable */
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export type IM365NavItemStyle = {
    root?: IStyle;
    iconColumn?: IStyle;
    nameColumn?: IStyle;
};

export type IM365FloatingNavStyle = IStyle & {
    root?: IStyle;
    withChild?: IStyle;
};

const navFontSize = '13px';
const navTextColor = '#FFF';
const navWidth = '280px';
const navCollapsedWidth = '50px';
const navFloatingWidth = '230px';
const navItemHeight = 50;
const navBackgroundColor = '#333333';
const navItemHoverColor = '#767676';
const navGroupSeparatorItemHeight = '40px';
const navItemWithChildBgColor = '#505050';
const navItemSelectedColor = '#666666';
const navItemIndentSize = 50;

export const getM365NavStyle = (isCollapsed: boolean): IStyle => {
    return {
        width: isCollapsed ? navCollapsedWidth : navWidth,
        backgroundColor: navBackgroundColor,
        color: navTextColor,
        selectors: {
            ul: {
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                fontSize: navFontSize,
                selectors: {
                    li: {
                        selectors: {
                            ':hover': {
                                selectors: {
                                    '>div[class*=m365FloatingNav]': {
                                        visibility: 'visible'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            a: {
                color: `${navTextColor} !important`,
                outline: 'none'
            }
        }
    };
};

export const getM365NavItemStyle = (isSelected?: boolean, hasChildren?: boolean, nestingLevel?: number): IM365NavItemStyle => {
    return {
        root: {
            height: navItemHeight,
            cursor: 'pointer',
            backgroundColor: isSelected ? navItemSelectedColor : 'inherit',
            paddingLeft: !!nestingLevel && nestingLevel > 0 ? nestingLevel * navItemIndentSize : 'inherit',
            selectors: {
                ':hover': {
                    backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
                }
            }
        },
        iconColumn: getM365NavItemIconColumnStyle(),
        nameColumn: getM365NavItemNameColumnStyle()
    };
};

const getM365NavItemIconColumnStyle = (): IStyle => {
    return {
        width: navCollapsedWidth,
        fontSize: '15px',
        lineHeight: navItemHeight,
        textAlign: 'center'
    }
};

const getM365NavItemNameColumnStyle = (): IStyle => {
    return {
        width: '100%',
        lineHeight: navItemHeight,
        verticalAlign: 'top',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
};

export const getM365FloatingNavStyle = (hasChildren?: boolean, scrollTop?: number): IStyle => {
    return {
        displayName: 'm365FloatingNav',
        display: 'block',
        visibility: 'hidden',
        position: 'absolute',
        left: navCollapsedWidth,
        marginTop: -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor,
        selectors: {
            a: {
                width: '100%',
                backgroundColor: 'inherit'
            }
        }
    };
};

export const getM365SlimNavItemStyle = (hasChildren?: boolean): IStyle => {
    return {
        selectors: {
            ':hover': {
                backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
            }
        }
    }
}

export const getM365FloatingNavItemStyle = (isSelected?: boolean, nestingLevel?: number): IM365NavItemStyle => {
    return {
        root: {
            height: navItemHeight,
            cursor: 'pointer',
            backgroundColor: !!nestingLevel && nestingLevel > 0 && isSelected ? navItemSelectedColor : 'inherit',
            paddingLeft: !!nestingLevel && nestingLevel > 0 ? nestingLevel * navItemIndentSize : 'inherit',
            selectors: {
                ':hover': {
                    backgroundColor: !!nestingLevel && nestingLevel > 0 ? navItemHoverColor : 'unset'
                }
            }
        },
        iconColumn: getM365NavItemIconColumnStyle(),
        nameColumn: getM365NavItemNameColumnStyle()
    };
};

export const getM365NavGroupSeparatorStyle = (): IStyle => {
    return {
        width: '100%',
        height: navGroupSeparatorItemHeight,
        textAlign: 'center',
        selectors: {
            '>.horizontalLine': {
                height: '20px',
                borderBottom: `1px solid ${navItemWithChildBgColor}`,
                selectors: {
                    '>.groupName': {
                        lineHeight: navGroupSeparatorItemHeight,
                        padding: '0 8px',
                        color: '#9B9B9B',
                        backgroundColor: navBackgroundColor
                    }
                }
            }
        }
    };
};
/* tslint:enable */
