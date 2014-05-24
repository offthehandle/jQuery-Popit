
/*
 * Popit Plugin for jQuery JavaScript Library
 * 
 * Copyright (c) 2014 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.0.0
 * Date: May 24 2014
 *  
 */

$.fn.popit = function (options) {
    this.each(function () {
        var settings = $.extend({
            popup: $(this),
            defaultWidth: 960,
            defaultHeight: 285,
            url: $(this).attr("href"),
            name: $(this).attr("target"),
            dynamicWidth: $(this).data("width"),
            dynamicHeight: $(this).data("height")
        }, options);

        var show = function (e) {
            e.preventDefault();
            if (settings.dynamicWidth && settings.dynamicHeight) {
                var popitWindow = window.open(settings.url, settings.name, "location=0, menubar=0, status=0, toolbar=0, width=" + settings.dynamicWidth + ", height=" + settings.dynamicHeight + '"', false)
            } else if (settings.dynamicWidth || settings.dynamicHeight) {
                if (settings.dynamicWidth) {
                    var popitWindow = window.open(settings.url, settings.name, "location=0, menubar=0, status=0, toolbar=0, width=" + settings.dynamicWidth + ", height=" + settings.defaultHeight + '"', false)
                } else {
                    var popitWindow = window.open(settings.url, settings.name, "location=0, menubar=0, status=0, toolbar=0, width=" + settings.defaultWidth + ", height=" + settings.dynamicHeight + '"', false)
                }
            } else {
                var popitWindow = window.open(settings.url, settings.name, "location=0, menubar=0, status=0, toolbar=0, width=" + settings.defaultWidth + ", height=" + settings.defaultHeight + '"', false)
            }

            // Brings the new window to the front
            popitWindow.focus();

            // Reloads window to process JS like location.hash for playlist index in named windows
            var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            if (!isFirefox) popitWindow.location.reload();
            if (isFirefox) popitWindow.history.go(0);
            return popitWindow;
        };

        settings.popup.on("click.popit", show);
    });
};
