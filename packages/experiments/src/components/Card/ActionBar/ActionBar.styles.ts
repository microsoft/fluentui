import { IActionBarStyles } from './ActionBar.types';

export const getStyles = (): IActionBarStyles => {

    return ({
        root: {
            whiteSpace: 'nowrap',
            width: '100%',
            padding: '10px'
        }
    });
};