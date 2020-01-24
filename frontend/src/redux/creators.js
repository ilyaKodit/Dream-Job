import {COMPANIES} from "./actions";

export const LoadingCompanies = (data) => {
    return {
        type: COMPANIES,
        data: data,
    }
};

