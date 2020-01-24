import {COMPANIES} from "./actions";

const initialState = {
    companies: null
};

export default function (oldState = initialState, action) {
    switch (action.type) {
        case COMPANIES:
            return {
                companies: action.data,
            };

        default:
            return oldState;
    }
};
