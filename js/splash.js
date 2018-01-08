/*global window, document*/
'use strict';
(function () {
    var baseUrl = '/insightsbeta';

    if (window.location.pathname === '/insights' || window.location.pathname === '/insights/') {
        baseUrl = '/insights';
    }

    // rewrite the gotoapp anchor
    document.querySelectorAll('a[href="/insights/overview/"]').forEach(function (a) {
        a.href = baseUrl + '/overview/';
    });

    // if the user is authed bounce
    window.require(['session'], function (session) {
        if (session.isAuthenticated()) {
            window.location = baseUrl + '/overview/';
        }
    });
}());
