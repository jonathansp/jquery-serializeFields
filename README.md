# jquery-serializeFields
jQuery plugin to serialize form elements into a complex json object

## How to use

HTML code:

```html
<form id="form1">
    <input type="text" name="username" value="my user name" />

    <fieldset name="address">
        <input type="text" name="street" value="654, test street" />
        <input type="text" name="country" value="Brazil" />
    </fieldset>

    <fieldset name="contact">
        <input type="text" name="email" value="contact@mysite.com" />
        <fieldset name="phones">
            <input type="text" name="primary" value="+55 51 123456789" />
            <input type="text" name="mobile" value="+55 51 987654987" />
        </fieldset>
    </fieldset>

    <input type="submit" />
</form>

```

JS code:

```javascript
$(document).ready(function() {
    $("#form1").submit(function(event) {

        var data = $(this).serializeFields();

        event.preventDefault();
        console.log(JSON.stringify(data));
    });
});
```

Result:

```javascript
{
    "username":"my user name",
    "address":{
        "street":"654, test street",
        "country":"Brazil"
    },
    "contact":{
        "email":"contact@mysite.com",
        "phones":{
            "primary":"+55 51 123456789",
            "mobile":"+55 51 987654987"
        }
    }
}
```

Options:

```javascript
var data = $(this).serializeFields({
    fieldset_nameattr: "name",
    fieldset_selector: "fieldset:enabled",
    field_selector: "input:enabled",
    ignored_fields: [
      "input[type=checkbox]:not(:checked)"
    ]
});
```

## Why not jquery.serializeJSON, jquery-serialize-object, jquery.serialize-hash or jquery-serializeForm?

These are great plugins, but all of them are "bracket-based" and not so intuitive. Take a look:

* https://github.com/marioizquierdo/jquery.serializeJSON
* https://github.com/macek/jquery-serialize-object
* https://github.com/sdrdis/jquery.serialize-hash
* https://github.com/danheberden/jquery-serializeForm


## Release

* 0.0.2 Added support to nested elements.
* 0.0.1 First version.

## License
Copyright (c) 2015

* Jonathan Prates (jonathansp),
* Gabriel Broilo (broilogabriel)


### NPM

Download at https://www.npmjs.com/package/jquery-serializefields

```bash
npm i jquery-serializefields
```

### Bower
```bash
bower install jquery-serializeFields
```

Licensed under GPL license.
