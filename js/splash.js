/*global window, document*/
'use strict';
(function () {
    var baseUrl = '/insightsbeta';

    if (window.location.pathname.indexOf('/node') !== -1) {
        // halt on node page
        return;
    }

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
            // only bounce if authed and on the base page
            // dont bounce on splash/ or info/
            if (session.isAuthenticated() && window.location.pathname.match(/^\/insights(beta)*(\/)*$/)) {
                window.location = baseUrl + '/overview/';
            }
        });
    });
}());
