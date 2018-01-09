/*global window, document*/
'use strict';
(function () {
    var baseUrl = '/insightsbeta';

    if (window.location.pathname === '/insights' || (window.location.pathname.indexOf('/insights/') === 0)) {
        baseUrl = '/insights';
    }

    // rewrite the gotoapp anchor
    window.jQuery(function () {
        document.querySelectorAll('a[href="/insights/overview/"]').forEach(function (a) {
            a.href = baseUrl + '/overview/';
        });
    });

    // if the user is authed bounce
    window.require(['session'], function (session) {
        session.onInit(function () {
            if (session.isAuthenticated()) {
                window.location = baseUrl + '/overview/';
            }
        });
    });
}());
