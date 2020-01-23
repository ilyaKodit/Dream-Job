import {TEST} from "./actions";

const initialState = {
    test: ''
};

export default function (oldState = initialState, action) {
    switch (action.type) {
        case TEST:
            return {
                test: action.data,
            };

        default:
            return oldState;
    }
};
