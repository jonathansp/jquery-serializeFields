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
        var sf = $.serializeFields; // namespace
        sf.extendSettings(options);

        var response = [];

        if (this.length < 1) {
            return;  // do nothing
        }

        if (this.length === 1) {
            return sf.parse($(this)[0]); // return as object
        }

        this.each(function () {
            response.push(
              sf.parse($(this))
            );
        });
        return response;  /// return as array

    };

    // Use $.serializeFields as namespace for the auxiliar functions
    // and settings
    $.serializeFields = {

      defaultSettings: function() {
          return {
              field_selector: "input:enabled",
              fieldset_selector: "fieldset:enabled",
              fieldset_nameattr: "data-name",
              ignored_fields: [
                "input[type=checkbox]:not(:checked)"
              ]
          };
      },

      /**
        Function extend default settings

        param: options
      **/

      extendSettings: function(options){
        $.serializeFields.settings = $.serializeFields.defaultSettings();
        $.extend($.serializeFields.settings, options)
      },

      /**
        Function validate ignored fields from settings

        param: element to validate
        return: true/false
      **/
      isIgnored: function(element){
        var ignore = false;

        $($.serializeFields.settings.ignored_fields).each(function(i,ignored){
            ignore = $(element).is(ignored);
        })

        return ignore;
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

              if(!sf.isIgnored($(this))){
                  if ($(this).is(sf.settings.field_selector)) {
                      var key = $(this).attr("name") || $(this).attr("id");
                      var value = $(this).val();

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
    }
}(jQuery));
