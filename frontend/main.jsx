import Application from "./core/Application";
import Request from "./core/Request";
import CurrentViewActions from "./store/state/currentView";
import store from "./store/store";
import User from "./store/User";

import IndexView from "views/IndexView/IndexView";
import HelpView from "views/HelpView/HelpView";
import ThemeView from "views/ThemeView/ThemeView";
import UploadView from "views/UploadView/UploadView";


import "./main.less";

Application.setConfigValue("admin-email", "info@ideacolorthemes.org");

Request.setApiFn(apiFn);

Application.registerView(IndexView);
Application.registerView(HelpView);
Application.registerView(ThemeView);
Application.registerView(UploadView);

Application.run();
User.update();

function apiFn(method, request, params, callback, context) {
    if (params && (method === "GET")) {
        var query = Object.keys(params)
            .map(p => encodeURIComponent(p) + "=" + encodeURIComponent(params[p]))
            .join("&");
        if (query) {
            request += "?" + query;
        }
        params = null;
    }
    return Request.run("/api/" + request, method,
        {"Content-Type": "application/json"},
        params && JSON.stringify(params),
        callback && function(err, data) {
            callback.call(context, err, data && JSON.parse(data));
        });
}