import {COMPANIES, FEEDBACK} from "./actions";

export const LoadingCompanies = (data) => {
    return {
        type: COMPANIES,
        data: data,
    }
};

export const LoadingFeedback = (data) => {
    return {
        type: FEEDBACK,
        data: data,
    }
};

