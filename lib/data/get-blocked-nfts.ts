import { REQUEST_METHODS, fetchApi } from "@/lib/data/fetch";

export const getBlockedNfts = async (): Promise<any> => {
    const fetchUrl = `https://surface-api-z3w7d7dnea-ew.a.run.app/blocked-nfts`;

    return fetchApi(fetchUrl, REQUEST_METHODS.get);
};
