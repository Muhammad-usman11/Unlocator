import type {FetchRequest, FetchOptions, FetchResponse} from 'ofetch';
import {FetchContext, ofetch} from "ofetch";

const fetcher = function (url: string, params: any, token: string | null = null) {
    const runtimeConf = useRuntimeConfig();
    const fetchingApiUrl = runtimeConf.public.apiBaseUrl + '/web';
    const instance = ofetch.create({
        baseURL: fetchingApiUrl,
        onRequest({options}): Promise<void> | void {

            if (!token) {
                try {
                    const {data} = useAuth();
                    if (data.value != null) {
                        //@ts-ignore
                        token = data.value.access_token;
                    }
                } catch (e) {

                }
            }
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                }
            }

            options.headers = {
                ...options.headers,
                accept: 'application/json'
            }
        },
        onResponseError(context: FetchContext & { response: FetchResponse<ResponseType> }): Promise<void> | void {
            if (context.response.status == 401) {
                //todo change logic to auto refresh token
                navigateTo("/");
            }
        },
    });
    return instance(url, params);
}

export default async <T>(url: string, params: any, token: string | null = null) => {
    try {
        const response = await fetcher(url, params, token);
        return response as FetchResponse<T>;
    } catch (error: any) {
        return error;
    }
}
