wasDefined = function(value) {
    return typeof(value) != "undefined"
}

QUnit.test("When form has one field it should create a simple Object", function(assert) {
    // given
    var name = "Obama"
    var form = '<form>' +
        '  <input type="text" name="name" value="' + name + '" />' +
        '  <input type="submit" />' +
        '</form>'

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result), "Result was defined!")
    assert.equal(name, result.name, "result.name is equal: " + result.name)
});

QUnit.test("When form has fieldset it should create an Object with child", function(assert) {
    // given
    var name = "Obama"
    var street = "654, test street"
    var country = "Brazil"
    var form = '<form>' +
        '  <input type="text" name="name" value="' + name + '" />' +
        '  <fieldset data-name="address">' +
        '    <legend>Address</legend>' +
        '    <input type="text" name="street" value="' + street + '" />' +
        '    <input type="text" name="country" value="' + country + '" />' +
        '  </fieldset>' +
        '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result.address), "Child Object was defined!")
    assert.equal(name, result.name,
        "result.name is equal: " + result.name)
    assert.equal(street, result.address.street,
        "result.address.street is equal: " + result.address.street)
    assert.equal(country, result.address.country,
        "result.address.country is equal: " + result.address.country)
});

QUnit.test("When form has fieldset under fieldset it should create an Object with grandson",
    function(assert) {
        // given
        var name = "Obama"
        var email = "contact@mysite.com"
        var primary = "+55 51 123456789"
        var mobile = "+55 51 987654987"
        var form = '<form>' +
            '  <input type="text" name="name" value="' + name + '" />' +
            '  <fieldset data-name="contact">' +
            '    <legend>Contact</legend>' +
            '    <input type="text" name="email" value="' + email + '" />' +
            '    <fieldset data-name="phones">' +
            '        <legend>Phones</legend>' +
            '        <input type="text" name="primary" value="' + primary + '" />' +
            '        <input type="text" name="mobile" value="' + mobile + '" />' +
            '    </fieldset>' +
            '  </fieldset>' +
            '</form>';

        // when
        var result = $(form).serializeFields()

        // then
        assert.ok(wasDefined(result.contact), "Child Object was defined!")
        assert.ok(wasDefined(result.contact.phones), "Grandson Object was defined!")
        assert.equal(name, result.name, "result.name is equal: " + name)
        assert.equal(email, result.contact.email, "result.contact.email is equal " + result.contact.email)
        assert.equal(primary, result.contact.phones.primary,
            "result.contact.phones.primary is equal " + result.contact.phones.primary)
        assert.equal(mobile, result.contact.phones.mobile,
            "result.contact.phones.mobile is equal " + result.contact.phones.mobile)
    });

QUnit.test("When form has disabled input it should ignore as default", function(assert) {
    // given
    var form = '<form>' +
        '  <input type="text" name="enabledfield" value="value for it" />' +
        '  <input disabled type="text" name="disabledfield" value="value for it" />' +
        '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result.enabledfield), "As default property was defined by input:enabled!")
    assert.ok(!wasDefined(result.disabledfield), "Input:disabled was not defined!")
});

QUnit.test("When send options it should include options tag", function(assert) {
    // given
    var form = '<form>' +
        '  <input data-property="true" type="text" name="enabledfield" value="value for it" />' +
        '  <input disabled type="text" name="disabledfield" value="value for it" />' +
        '  <fieldset data-object-name="dataobjectname">' +
        '    <input disabled type="text" name="son_disabledfield" value="value for it" />' +
        '  <fieldset/>' +
        '</form>';

    // when
    var result = $(form).serializeFields({
        field_selector: "input:disabled",
        fieldset_nameattr: "data-object-name"
    })

    // then
    assert.ok(!wasDefined(result.enabledfield), "Input enabled was not defined!")
    assert.ok(wasDefined(result.disabledfield), "Input disabled was defined!")
    assert.ok(wasDefined(result.dataobjectname), "Child Object was defined by data-object-name tag!")
    assert.ok(wasDefined(result.dataobjectname.son_disabledfield), "Child Object property was defined!")
});

QUnit.test("When define a filter to get property of object it should respect", function(assert) {

    // given
    var form = '<form>' +
        '  <input data-property="true" type="text" name="bydataproperty" value="thevalue" />' +
        '  <input type="text" name="bytagname" value="value for it" />' +
        '</form>';

    // when
    var result = $(form).serializeFields({
        field_selector: '[data-property="true"]'
    })

    // then
    assert.ok(wasDefined(result.bydataproperty), "Property bydataproperty was defined by data-property tag!")
    assert.ok(!wasDefined(result.bytagname), "Property bytagname was not defined by input name!")
});

QUnit.test("When set ignored field it should respect", function(assert) {

    // given
    var form = '<form>' +
        '  <input type="text" name="ignored_field" value="1" data-ignored-field/>' +
        '  <input type="text" name="not_ignored_field" value="1"/>' +
        '</form>';
    var option = {
        ignored_fields: "[data-ignored-field]"
    }

    // when
    var result = $(form).serializeFields(option);

    // then
    assert.ok(!wasDefined(result.ignored_field), "Property ignored_field must not be defined!")
    assert.ok(wasDefined(result.not_ignored_field), "Property not_ignored_field must be defined!")
});

QUnit.test("When form has numeric inputs it should parse value to float", function(assert) {

    // given
    var form = '<form>' +
        '  <input type="text" name="value_integer" value="1" />' +
        '  <input type="text" name="value_not_number" value="NaN" />' +
        '  <input type="text" name="value_float" value="1.0" />' +
        '  <input type="text" name="value_float_with_comma" value="1,5" />' +
        '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.equal(result.value_integer, 1, "Property value_integer has a integer value!")
    assert.equal(result.value_not_number, "NaN",  "Property value_not_number must not be a number!")
    assert.equal(result.value_float, 1.0, "Property value_float has a float value!")
    assert.ok(!$.isNumeric(result.value_float_with_comma), "Property value_float_with_comma must not be parsed to float!")
});

QUnit.test("When form has checkbox it should always get value true or false", function(assert) {

    // given
    var form = '<form>' +
        '  <input type="checkbox" name="checked" value="true" checked/>' +
        '  <input type="checkbox" name="unchecked1" value="true"/>' +
        '  <input type="checkbox" name="unchecked2" value="anothervalue"/>' +
        '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.equal(result.checked, true, "Property checked has value true!")
    assert.equal(result.unchecked1, false, "Property unchecked1 must be false!")
    assert.equal(result.unchecked2, false, "Property unchecked2 must be false!")
});

QUnit.test("When form has select input it should get value from selected", function(assert) {

    // given
    var form = '<form>'+
    '<select name="carlist">'+
    ' <option value="volvo" selected>Volvo</option>'+
    ' <option value="saab">Saab</option>'+
    ' <option value="opel">Opel</option>'+
    '</select>'+
    '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.equal(result.carlist, "volvo", "Property carlist has value Volvo!")
});

QUnit.test("When form has multiple select it should return an Array value from selecteds", function(assert) {

    // given
    var form = '<form>'+
    '<select name="carlist" multiple>'+
    ' <option value="volvo" selected>Volvo</option>'+
    ' <option value="saab" selected>Saab</option>'+
    ' <option value="opel">Opel</option>'+
    '</select>'+
    '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(result.carlist instanceof Array, "Property carlist is an Array.")
    assert.equal(result.carlist[0], "volvo" , "Property carlist[0] has value Volvo!")
    assert.equal(result.carlist[1], "saab" , "Property carlist[1] has value Saab!")
});

QUnit.test("When form has radio button input it should get value from checked", function(assert) {

    // given
    var form = '<form>'+
    ' <input type="radio" name="sex" value="male" checked>Male</input>'+
    ' <input type="radio" name="sex" value="female" />Female</input>'+
    '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.equal(result.sex, "male", "Property sex has value male!")
});
