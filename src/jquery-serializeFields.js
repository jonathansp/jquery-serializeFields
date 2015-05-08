/*
 * jquery-serializeFields v0.0.2
 * https://github.com/jonathansp/serializeFields
 *
 * Copyright (c) 2015

 * Jonathan Prates (jonathansp),
 * Gabriel Broilo (broilogabriel)

 * Licensed under GPL license.
 */
(function ($) {

    "use strict";

    $.fn.serializeFields = function (options) {
        var settings = $.extend({
            field_selector: "input:enabled",
            fieldset_selector: "fieldset:enabled",
            fieldset_nameattr: "data-name"
        }, options);

        var response = [];
        var parse = function (element) {

            var data = {};
            $(element).children().each(function () {

                if ($(this).is(settings.field_selector)) {
                    var key = $(this).attr("name") || $(this).attr("id");
                    var value = $(this).val();

                    if (key) {
                        data[key] = value;
                    }

                } else {

                    if ($(this).is(settings.fieldset_selector)) {
                        var name = $(this).attr(settings.fieldset_nameattr);
                        if (name) {
                            data[name] = parse($(this));
                        }
                    } else {
                        $.extend(data, parse($(this)));
                    }
                }
            });
            return data;
        };

        if (this.length < 1) {
            return;  // do nothing
        }

        if (this.length === 1) {
            return parse($(this)[0]); // return as object
        }

        this.each(function () {
            response.push(
                parse($(this))
            );
        });
        return response;  /// return as array

    };
}(jQuery));
