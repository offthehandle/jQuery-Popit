
/*
 * Popit Plugin for jQuery JavaScript Library
 * 
 * Copyright (c) 2014 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.1.2
 * Date: December 17, 2014
 * 
 */

(function ($) {
    $.fn.popit = function (options) {
        this.each(function () {
            var settings = $.extend({
                popup: $(this),
                defaultWidth: 960,
                defaultHeight: 285,
                url: $(this).attr("href"),
                name: $(this).attr("target"),
                dynamicWidth: $(this).data("width"),
                dynamicHeight: $(this).data("height"),
                processParams: false,
                waitToProcess: 500
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

                // Brings named windows to the front if they are minimized or blurred
                popitWindow.focus();

                // Reloads window to process params on query string in named windows for playlist items and the like
                if (settings.processParams === true) {
                    setTimeout(function () {
                        popitWindow.location.reload();
                    }, settings.waitToProcess);
                }

                return popitWindow;
            };

            settings.popup.on("click.popit", show);
        });
    };
}(jQuery));
