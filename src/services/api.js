import axios from "axios";

export default function (options) {
    options = options || {};

    console.log("API", options);

    const instance = axios.create({ baseURL: options.apiURL });

    instance.defaults.baseURL = options.apiURL;
    instance.defaults.headers.common.Accept = "application/json";
    instance.defaults.withCredentials = false;

    if (options.client) {
        instance.interceptors.request.use(
            (config) => {
                console.log("REQ UUID", config.uuid);

                let originalRequest = config;

                if (config.bypassInterceptor) {
                    console.log("BYPASSED INTERCEPTOR");
                    return originalRequest;
                }

                let token;

                if (options.token) {
                    token = options.token;
                } else if (window.localStorage["__bbux_user"]) {
                    let user = JSON.parse(window.localStorage["__bbux_user"]);
                    token = user.token;
                }

                if (token) originalRequest.headers["Authorization"] = token;

                return originalRequest;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }

    const api = {
        get(endpoint, params) {
            return new Promise((resolve, reject) => {
                instance
                    .get(endpoint, params)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        post(endpoint, payload, params) {
            return new Promise((resolve, reject) => {
                instance
                    .post(endpoint, payload, params)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        put(endpoint, payload, params) {
            return new Promise((resolve, reject) => {
                instance
                    .put(endpoint, payload, params)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        delete(endpoint, payload, params) {
            return new Promise((resolve, reject) => {
                instance
                    .delete(endpoint, payload, params)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        axios: instance,
    };

    return api;
}
