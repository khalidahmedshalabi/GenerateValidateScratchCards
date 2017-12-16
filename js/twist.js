/**
 * @license TwistJS
 * (c) 2014 Kivra AB https://kivra.com
 * License: MIT
 */

/**
 *  Format-perserving Encryption
 */

(function (window) {'use strict';

  // Generate rotation delta
  var delta = function (x, secret) {
    var chars = secret.split('');
    var value = 0;
    for (var i = 0; i < chars.length; i++) {
      var charVal = chars[i].charCodeAt();
      value += x + (i * charVal);
    }
    return value;
  };

  // Rotate
  var rotate = function (config, value, x, secret, revese) {
    var size = config.codeToChar.length;
    var d = delta(x, secret);
    value = config.charToCode[value];
    d %= size;
    if (revese) {
      value += size - d;
    } else {
      value += d;
    }
    value %= size;
    return config.codeToChar[value];
  };

  var twist = function (pattern, value, secret, reverse) {
    var config = {
      charToCode: {},
      codeToChar: []
    };
    if (!pattern.test(value)) {
      throw 'Message does not fit pattern';
    }
    for (var i = 32; i <= 382; i++) {
      var char = String.fromCharCode(i);
      if (pattern.test(char)) {
        config.charToCode[char] = config.codeToChar.length;
        config.codeToChar.push(char);
      }
    }
    value = value.split('');
    for (var j = value.length - 1; j >= 0; j--) {
      value[j] = (rotate(config, value[j], j+1, secret, reverse));
    }
    return value.join('');
  };

  window.twist = {
    encrypt: twist,
    decrypt: function (pattern, value, secret) {
      return twist(pattern, value, secret, true);
    }
  };

})(window);
