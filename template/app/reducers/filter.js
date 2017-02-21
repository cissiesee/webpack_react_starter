import { FILTER_ITEM } from '../constants/actionTypes';
import * as actionTypes from '../constants/actionTypes';

const initialFilterItem = '';

export default function filter(state = initialFilterItem, action) {
    switch(action.type) {
    case actionTypes.FILTER_ITEM:
        return action.filterItem;
    default:
        return state;
    }
}