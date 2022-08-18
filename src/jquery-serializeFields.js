/*!
 * jquery-serializeFields.
 * https://github.com/jonathansp/serializeFields
 *
 * Copyright (c) 2015-2022.
 * Licensed under GPL license.
 */
(function ($) {

    "use strict";

    $.fn.serializeFields = function (options) {
        var sf = $.serializeFields; // namespace
        sf.extendSettings(options);

        var response = [];

        if (this.length < 1) {
            return; // do nothing
        }

        if (this.length === 1) {
            return sf.parse($(this)[0]); // return as object
        }

        this.each(function () {
            response.push(
                sf.parse($(this))
            );
        });
        return response; /// return as array

    };

    // Use $.serializeFields as namespace for the auxiliar functions
    // and settings
    $.serializeFields = {

        defaultSettings: function () {
            return {
                field_selector: "input:enabled,select:enabled,textarea:enabled",
                fieldset_selector: "fieldset:enabled",
                fieldset_nameattr: "data-name",
                ignored_fields: "input[type='radio']:not(:checked)",
                strict_convert_number_type: "false"
            };
        },

        /**
          Function extend default settings
          param: options
        **/
        extendSettings: function (options) {
            $.serializeFields.settings = $.serializeFields.defaultSettings();
            $.extend($.serializeFields.settings, options);
        },

        /**
          Function to parse value from input by type
          param: element
          return: value
        **/
        getValue: function (element) {
            var sf = $.serializeFields;
            var value = $(element).val();
            var type = $(element).attr("type");

            if (type == "checkbox") {
                return $(element).is(":checked");
            }

            if (sf.settings.strict_convert_number_type === true && $.isNumeric(value)) {
                return parseFloat(value);
            }

            return value;
        },

        /**
          Function contain all the logic to parse fields to a JSON object
          param: element
          return: json object
        **/
        parse: function (element) {
            var sf = $.serializeFields;
            var data = {};

            $(element).children().each(function () {

                if (!$(this).is(sf.settings.ignored_fields)) {

                    if ($(this).is(sf.settings.field_selector)) {

                        var key = $(this).attr("name") || $(this).attr("id");
                        var value = sf.getValue(this);

                        if (key) {
                            data[key] = value;
                        }

                    } else {

                        if ($(this).is(sf.settings.fieldset_selector)) {
                            var name = $(this).attr(sf.settings.fieldset_nameattr);
                            if (name) {
                                data[name] = sf.parse($(this));
                            }
                        } else {
                            $.extend(data, sf.parse($(this)));
                        }
                    }
                }
            });
            return data;
        }
    };
}(jQuery));
