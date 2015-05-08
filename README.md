# jquery-serializeFields
jQuery plugin to serialize form elements into a complex json object

## How to use

HTML code:

```html
<form id="form1">
    <input type="text" name="username" value="my user name" />

    <fieldset name="address">
        <input type="text" name="street" value="654, test street" />
        <input type="text" name="county" value="Brazil" />
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
        "county":"Brazil"
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


## Release

0.0.1 First version

## License
Copyright (c) 2015

* Jonathan Prates (jonathansp),
* Gabriel Broilo (broilogabriel)

## NPM

Download at https://www.npmjs.com/package/jquery-serializefields

```bash
npm i jquery-serializefields
```

Licensed under GPL license.
