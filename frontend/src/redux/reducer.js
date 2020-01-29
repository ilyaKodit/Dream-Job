import {COMPANIES, FEEDBACK} from "./actions";

const initialState = {
    companies: [],
    feedback: []
};

export default function (oldState = initialState, action) {
    switch (action.type) {
        case COMPANIES:
            return {
                companies: action.data,
                feedback: oldState.feedback
            };

        case FEEDBACK:
            return {
                companies: oldState.companies,
                feedback: action.data
            };

        default:
            return oldState;
    }
};
