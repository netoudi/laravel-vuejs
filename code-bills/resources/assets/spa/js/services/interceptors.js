import Auth from "./auth";
import appConfig from "./appConfig";

Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', Auth.getAuthorizationHeader());
    next();
});

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status === 401) { // token invalid
            return Auth.refreshToken().then(() => {
                return Vue.http(request);
            }).then(() => {
                Auth.clear();
                window.location.href = appConfig.login_url;
            });
        }
    });
});