const fs = require('fs');
const path = require('path');
const rewire = require('rewire');

jest.dontMock('fs');
//here we are going to store and accumulate (concatenate) all the console log's from the exercise
let _buffer = "";
let _log = console.log;

// lets override the console.log function to mock it,
// but we are also going to save what supposed to be the ouput of the console inside _buffer
global.console.log = console.log = jest.fn((text) => _buffer += text + "\n");

const file = rewire("./app.js");
const myArray = file.__get__("myArray");

it('console.log() function should have been called 2 times', function () {
    //then I import the index.js (which should have the alert() call inside)
    const file = require("./app.js");
    expect(console.log.mock.calls.length).toBe(2);
});

it('Print the 3rd item of the array (position 2)', function () {
    //You can also compare the entire console buffer (if there have been several console.log calls on the exercise)
    expect(_buffer.includes("tuesday\n")).toBe(true);
});

it('The fourth item in the array must be equal to "null"' , function(){
    expect(myArray[4]).toBe(null)
})

it('Print the 4th position of the array (item 5)', function () {
    //You can also compare the entire console buffer (if there have been several console.log calls on the exercise)
    expect(_buffer.includes("null\n")).toBe(true);
});
