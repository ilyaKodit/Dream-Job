import {TEST} from "./actions";

export const Refresh = (data) => {
    return {
        type: TEST,
        data: data,
    }
};

