var storage = "";        //строка вычислений
var buf = "";            //введёное значение
var switchOn = false;    //кальлятор вкл/выкл
var soundclick;          //звук вкл/выкл
var maxD = 21;           //максимальное число цифр на табло
var dotLength = 10;      //точность

var $ = function(id) {
    return document.getElementById(id);
};

var note = $("note");
var beep = $("beep");
var mutePlay = $("mutePlay");
var on = $("on");
var off = $("off");
var output = $("output");
var one = $("one");
var two = $("two");
var three = $("three");
var four = $("four");
var five = $("five");
var six = $("six");
var seven = $("seven");
var eight = $("eight");
var nine = $("nine");
var zero = $("zero");
var plus = $("plus");
var minus = $("minus");
var multiply = $("multiply");
var divide = $("divide");
var sqrt = $("sqrt");
var sqr = $("sqr");
var dot = $("dot");
var equal = $("equal");
var mirror = $("mirror");

on.addEventListener("click", turnOn);
mutePlay.addEventListener("mousedown", muteOrPlay);
off.addEventListener("click", turnOff);
one.addEventListener("click", numPressed);
two.addEventListener("click", numPressed);
three.addEventListener("click", numPressed);
four.addEventListener("click", numPressed);
five.addEventListener("click", numPressed);
six.addEventListener("click", numPressed);
seven.addEventListener("click", numPressed);
eight.addEventListener("click", numPressed);
nine.addEventListener("click", numPressed);
zero.addEventListener("click", numPressed);
dot.addEventListener("click", toDot);
plus.addEventListener("click", toPlus);
minus.addEventListener("click", toMinus);
multiply.addEventListener("click", toMultiply);
divide.addEventListener("click", toDivide);
sqrt.addEventListener("click", getSqrt);
sqr.addEventListener("click", getSqr);
equal.addEventListener("click", toEqual);