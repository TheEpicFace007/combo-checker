"use strict";
const { findCombo } = require("../dist/index");
const { expect, should } = require('chai');

describe("findCombo function test", () =>
{

  it("An combo without an email - username:password", () =>
  {
    const result = findCombo("username:password");

    expect(result).to.deep.equal({
      NumberOfCombo: 1,
      ComboArray: [
        {
          Username: "username",
          Password: "password"
        }
      ]
    });
  });

  it("An combo with an email - username@gmail.org:password", () =>
  {
    const result = findCombo("username@gmail.org:password");

    expect(result).to.deep.equal({
      NumberOfCombo: 1,
      ComboArray: [
        {
          Username: "username@gmail.org",
          Password: "password"
        }
      ]
    });
  });

  it("An combo with \":\" in the passowrd", () =>
  {
    const result = findCombo("john@johndoemail.org:Ihave:InmyPasswordlol")

    expect(result).to.deep.equal({
      NumberOfCombo: 1,
      ComboArray: [
        {
          Username: "john@johndoemail.org",
          Password: "Ihave:InmyPasswordlol"
        }
      ]
    })
  })

  it("Mix of username and email", () =>
  {
    const result = findCombo(`
    john123:passwd
    theguy@example.org:njfskd
    abi12duchef:passwd23
    thattufgirl@example.net:dontlookatme
    `);

    expect(result).to.deep.equal({
      NumberOfCombo: 4,
      ComboArray: [
        { Username: 'john123', Password: 'passwd' },
        { Username: 'theguy@example.org', Password: 'njfskd' },
        { Username: 'abi12duchef', Password: 'passwd23' },
        { Username: 'thattufgirl@example.net', Password: 'dontlookatme' },
      ]
    });
  });

  it("Multiple email", () =>
  {
    const result = findCombo(`
    theguy@example.org:njfskd
    thattufgirl@example.net:dontlookatme
    `);

    expect(result).to.deep.equal({
      NumberOfCombo: 2,
      ComboArray: [
        { Username: 'theguy@example.org', Password: 'njfskd' },
        { Username: 'thattufgirl@example.net', Password: 'dontlookatme' },
      ]
    });
  });

});