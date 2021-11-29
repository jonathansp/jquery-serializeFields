# jquery-serializeFields 
[![npm version](https://badge.fury.io/js/jquery-serializefields.svg)](http://badge.fury.io/js/jquery-serializefields)

jQuery plugin to serialize form elements into a json object guided by fieldset element.

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
$(document).ready(() => {
    $("#form1").submit(event => {
        event.preventDefault()
        let data = $(this).serializeFields()
        console.log(JSON.stringify(data))
    })
})
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
let data = $(this).serializeFields({
    fieldset_nameattr: "name",
    fieldset_selector: "fieldset:enabled,select:enabled",
    field_selector: "input:enabled",
    ignored_fields: "input[type='radio']:not(:checked)"
})
```

## Build

```bash
npm install

sudo npm install -g grunt-cli

grunt build
```
The minified output file will be built into ./dist folder.

## Release

* 0.1.0 Updated npm.
* 0.0.5 Updated old dependencies.
* 0.0.4 Added support to radio and select inputs.
* 0.0.3 Added support to ignore fields and checkbox fix.
* 0.0.2 Added support to nested elements.
* 0.0.1 First version.

## License
Copyright (c) 2015

* Jonathan Prates (jonathansp)
* Gabriel Broilo (broilogabriel)
* Cristian Oliveira (CristianOliveiraDaRosa)

### NPM

Download at https://www.npmjs.com/package/jquery-serializefields

```bash
npm install jquery-serializefields
```

Licensed under GPL license.
