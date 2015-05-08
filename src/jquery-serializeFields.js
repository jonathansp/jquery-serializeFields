/*
 * serializeFields
 * https://github.com/jonathansp/serializeFields
 *
 * Copyright (c) 2015 

 * Jonathan Prates (jonathansp),
 * Gabriel Broilo (broilogabriel)

 * Licensed under GPL license.
 */
(function($) {

    "use strict"

    $.fn.serializeFields = function(options) {
        var settings = $.extend({
            fieldset_selector: "fieldset:enabled",
            field_selector: "input:enabled"
        }, options);

        var response = [];
        var parse = function(element) {

            if (!$(this).is("form")) {
                throw "Not a form element."
            }

            var data = {};
            element.children().each(function() {
                if ($(this).is(settings.field_selector)) {
                    var key = $(this).attr("name") || $(this).attr("id");
                    var value = $(this).val();

                    if (key)
                        data[key] = value;
                } else {

                    if ($(this).is(settings.fieldset_selector)) {
                        var name = $(this).attr("name");
                        if (name) {
                            data[name] = parse($(this));
                        } else {
                            $.extend(data, parse($(this)));
                        }
                    }
                }
            });
            return data;
        }

        if (this.length < 1) {
            return;
        } else if (this.length == 1) {
            return parse($(this));
        } else {
            this.each(function() {
                response.push(
                    parse($(this))
                );
            });
            return response;
        }
    };
}(jQuery));
