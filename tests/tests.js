wasDefined = function(value){ return typeof(value) != "undefined" }

QUnit.test( "When form has one field it should create a simple Object", function( assert ) {
    // given
    var name = "Obama"
    var form = '<form>'+
               '  <input type="text" name="name" value="'+name+'" />'+
               '  <input type="submit" />'+
               '</form>'

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result),"Result was defined!")
    assert.equal(name, result.name, "result.name is equal: "+result.name)
});


QUnit.test( "When form has fieldset it should create an Object with child", function( assert ) {
    // given
    var name = "Obama"
    var street = "654, test street"
    var country = "Brazil"
    var form = '<form>'+
               '  <input type="text" name="name" value="'+name+'" />'+
               '  <fieldset data-name="address">'+
               '    <legend>Address</legend>'+
               '    <input type="text" name="street" value="'+ street +'" />'+
               '    <input type="text" name="country" value="'+ country +'" />'+
               '  </fieldset>'+
               '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result.address),"Child Object was defined!")
    assert.equal(name, result.name,
        "result.name is equal: "+result.name)
    assert.equal(street, result.address.street,
        "result.address.street is equal: "+result.address.street)
    assert.equal(country, result.address.country,
        "result.address.country is equal: "+result.address.country)
});

QUnit.test( "When form has fieldset under fieldset it should create an Object with grandson",
function( assert ) {
    // given
    var name = "Obama"
    var email = "contact@mysite.com"
    var primary = "+55 51 123456789"
    var mobile = "+55 51 987654987"
    var form = '<form>'+
               '  <input type="text" name="name" value="'+name+'" />'+
               '  <fieldset data-name="contact">'+
               '    <legend>Contact</legend>'+
               '    <input type="text" name="email" value="'+email+'" />'+
               '    <fieldset data-name="phones">'+
               '        <legend>Phones</legend>'+
               '        <input type="text" name="primary" value="'+primary+'" />'+
               '        <input type="text" name="mobile" value="'+mobile+'" />'+
               '    </fieldset>'+
               '  </fieldset>'+
               '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result.contact), "Child Object was defined!")
    assert.ok(wasDefined(result.contact.phones), "Grandson Object was defined!")
    assert.equal(name, result.name, "result.name is equal: " + name)
    assert.equal(email, result.contact.email, "result.contact.email is equal "+result.contact.email)
    assert.equal(primary, result.contact.phones.primary,
        "result.contact.phones.primary is equal "+result.contact.phones.primary)
    assert.equal(mobile, result.contact.phones.mobile,
        "result.contact.phones.mobile is equal "+result.contact.phones.mobile)
});

QUnit.test( "When form has disabled input it should ignore as default", function( assert ) {
    // given
    var form = '<form>'+
               '  <input type="text" name="enabledfield" value="value for it" />'+
               '  <input disabled type="text" name="disabledfield" value="value for it" />'+
               '</form>';

    // when
    var result = $(form).serializeFields()

    // then
    assert.ok(wasDefined(result.enabledfield),"As default property was defined by input:enabled!")
    assert.ok(!wasDefined(result.disabledfield),"Input:disabled was not defined!")
});

QUnit.test( "When send options it should include options tag", function( assert ) {
    // given
    var form = '<form>'+
               '  <input data-property="true" type="text" name="enabledfield" value="value for it" />'+
               '  <input disabled type="text" name="disabledfield" value="value for it" />'+
               '  <fieldset data-object-name="dataobjectname">'+
               '    <input disabled type="text" name="son_disabledfield" value="value for it" />'+
               '  <fieldset/>'+
               '</form>';

    // when
    var result = $(form).serializeFields({field_selector: "input:disabled",
                                          fieldset_nameattr: "data-object-name"})

    // then
    assert.ok(!wasDefined(result.enabledfield),"Input enabled was not defined!")
    assert.ok(wasDefined(result.disabledfield),"Input disabled was defined!")
    assert.ok(wasDefined(result.dataobjectname),"Child Object was defined by data-object-name tag!")
    assert.ok(wasDefined(result.dataobjectname.son_disabledfield),"Child Object property was defined!")
});

QUnit.test( "When define a filter to get property of object it should respect", function( assert ) {

  // given
  var form = '<form>'+
             '  <input data-property="true" type="text" name="bydataproperty" value="thevalue" />'+
             '  <input type="text" name="bytagname" value="value for it" />'+
             '</form>';

  // when
  var result = $(form).serializeFields({field_selector: '[data-property="true"]'})

  // then
  assert.ok(wasDefined(result.bydataproperty),"Property was defined by data-property tag!")
  assert.ok(!wasDefined(result.bytagname),"Property was not defined by input name!")
});

QUnit.test( "When define ignored fields it should respect", function( assert ) {

  // given
  var form = '<form>'+
             '  <input type="text" name="ignored_field" value="1" data-ignored-field />'+
             '  <input type="text" name="not_ignored_field" value="1"/>'+
             '</form>';
  var options = { ignored_fields: ["[data-ignored-field]"] }

  // when
  var result = $(form).serializeFields(options)

  // then
  assert.equal(result.not_ignored_field, "1","Property not_ignored_field has value!")
  assert.ok(!wasDefined(result.ignored_field),"Property ignored_field was not defined!")
});

QUnit.test( "When form has checkbox it should get value only from 'checked'", function( assert ) {

  // given
  var form = '<form>'+
             '  <input type="checkbox" name="checked_checkbox" value="true" checked/>'+
             '  <input type="checkbox" name="unchecked_checkbox1" value="true"/>'+
             '  <input type="checkbox" name="unchecked_checkbox2" value="true"/>'+
             '</form>';

  // when
  var result = $(form).serializeFields()

  // then
  assert.equal(result.checked_checkbox, "true","Property checked_checkbox has value!")
  assert.ok(!wasDefined(result.unchecked_checkbox1),"Property unchecked_checkbox1 was not defined!")
  assert.ok(!wasDefined(result.unchecked_checkbox2),"Property unchecked_checkbox2 was not defined!")
});
