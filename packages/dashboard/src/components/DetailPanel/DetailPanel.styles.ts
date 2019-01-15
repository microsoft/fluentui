import { IStyle } from '@uifabric/experiments/lib/Styling';
import { FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const PrimaryTextColor = '#323130';
const SecondaryTextColor = '#605E5C';
const HeaderTextColor = '#000';

interface IDetailPanelBaseStyles {
    header: IStyle;
    messageBar: IStyle;
    content: IStyle;
}

interface IDetailPanelLoadingStyles {
    pageShimmer: IStyle;
    spinner: IStyle;
    overlay: IStyle;
    shimmerGroup: IStyle;
}

interface IDetailPanelHederStyles {
    personaMode: IStyle;
    textMode: IStyle;
}

interface IDetailPanelContentStyles {
    content: IStyle;
}

interface IDetailContainerDetailStyles {
    generalContainer: IStyle;
    tilesContainer: IStyle;
}

interface IDetailTileStyles {
    item: IStyle;
    title: IStyle;
    message: IStyle;
    action: IStyle;
}

interface IDetailPanelConfirmationStyles {
    header: IStyle;
    headerIcon: IStyle;
    iconSuccess: IStyle;
    IconFailed: IStyle;
    description: IStyle;
    statusTitle: IStyle;
    statusItems: IStyle;
    linkListTitle: IStyle;
    linkListItems: IStyle;
}

const getDetailPanelBaseStyles = (): IDetailPanelBaseStyles => {
    return {
        header: {
            marginBottom: 48,
            color: HeaderTextColor
        },
        messageBar: {},
        content: {
            color: PrimaryTextColor
        }
    };
};

const getDetailPanelLoadingStyles = (): IDetailPanelLoadingStyles => {
    return {
        pageShimmer: {
            selectors: {
                '.ms-Shimmer-container:not(:first-child)': {
                    marginTop: 8
                }
            }
        },
        shimmerGroup: {
            marginTop: 24
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 60px)'
        },
        overlay: {
            zIndex: 99999
        }
    };
};

const getDetailPanelHeaderStyles = (): IDetailPanelHederStyles => {
    return {
        personaMode: {
            selectors: {
                '.ms-Persona-primaryText': {
                    fontSize: FontSizes.xxLarge,
                    lineHeight: 'normal',
                    fontWeight: FontWeights.bold
                },
                '.ms-Persona-secondaryText': {
                    marginLeft: -4,
                    lineHeight: 15,
                    FontSizes: FontSizes.icon
                },
                '.ms-Persona-tertiaryText': {
                    fontSize: FontSizes.medium,
                    lineHeight: 'normal',
                    color: SecondaryTextColor,
                    fontWeight: FontWeights.bold
                }
            }
        },
        textMode: {
            fontSize: FontSizes.xxLarge,
            lineHeight: 36,
            fontWeight: FontWeights.bold
        }
    };
};

const getDetailPanelContentStyles = (): IDetailPanelContentStyles => {
    return {
        content: {
            selectors: {
                '.ms-Pivot': {
                    marginLeft: -8
                }
            }
        }
    };
};

const getDetailContainerDetailStyles = (): IDetailContainerDetailStyles => {
    return {
        tilesContainer: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start'
        },
        generalContainer: {
            marginTop: 24
        }
    };
};

const getDetailTileStyles = (): IDetailTileStyles => {
    return {
        item: {
            width: 240,
            padding: '24px 24px 24px 0px'
        },
        title: {
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.semibold,
            lineHeight: 20,
            paddingBottom: 2
        },
        message: {
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.regular,
            lineHeight: 20,
            color: 'rgba(0, 0, 0, 0.6)',
            paddingBottom: 2
        },
        action: {
            fontSize: FontSizes.medium,
            lineHeight: 20,
            selectors: {
                '.ms-Link': {
                    height: 20
                }
            }
        }
    };
};

const getDetailPanelConfirmationStyles = (): IDetailPanelConfirmationStyles => {
    return {
        header: {
            display: 'flex',
            alignItems: 'center',
            fontSize: FontSizes.xxLarge,
            fontWeight: '700',
            lineHeight: 36,
            color: HeaderTextColor
        },
        headerIcon: {
            marginRight: 14
        },
        iconSuccess: {
            color: '#6BB700'
        },
        IconFailed: {
            color: '#C50F1F'
        },
        description: {
            color: HeaderTextColor,
            fontSize: FontSizes.medium,
            lineHeight: 20,
            paddingTop: 21
        },
        statusTitle: {
            display: 'flex',
            alignItems: 'center',
            fontSize: FontSizes.medium,
            lineHeight: 20,
            marginTop: 28,
            color: PrimaryTextColor
        },
        statusItems: {
            fontSize: FontSizes.medium,
            lineHeight: 20,
            paddingLeft: 46,
            margin: '7px 0px 7px 0px',
            color: SecondaryTextColor,
            selectors: {
                'li:not(:first-child)': {
                    marginTop: 7
                }
            }
        },
        linkListTitle: {
            color: PrimaryTextColor,
            fontSize: FontSizes.medium,
            lineHeight: 20,
            fontWeight: '600',
            marginTop: 32
        },
        linkListItems: {
            fontSize: FontSizes.medium,
            lineHeight: 20,
            listStyleType: 'none',
            paddingLeft: 0,
            margin: '7px 0px 7px 0px'
        }
    };
};

export const detailPanelBaseStyles = classNamesFunction<{}, IDetailPanelBaseStyles>()(getDetailPanelBaseStyles);

export const detailPanelLoadingStyles = classNamesFunction<{}, IDetailPanelLoadingStyles>()(
    getDetailPanelLoadingStyles
);

export const detailContainerDetailStyles = classNamesFunction<{}, IDetailContainerDetailStyles>()(
    getDetailContainerDetailStyles
);

export const detailTileClassNames = classNamesFunction<{}, IDetailTileStyles>()(getDetailTileStyles);

export const detailPanelHeaderStyles = classNamesFunction<{}, IDetailPanelHederStyles>()(getDetailPanelHeaderStyles);

export const detailPanelContentStyles = classNamesFunction<{}, IDetailPanelContentStyles>()(
    getDetailPanelContentStyles
);

export const detailPanelConfirmationStyles = classNamesFunction<{}, IDetailPanelConfirmationStyles>()(
    getDetailPanelConfirmationStyles
);
