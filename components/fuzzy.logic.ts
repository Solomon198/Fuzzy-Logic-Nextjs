// @ts-nocheck
/**
 * Parent object for all shapes. Only uses four coordinates
 */
function Shape(x0, x1, x2, x3) {
  "use strict";
  this.x0 = x0;
  this.x1 = x1;
  this.x2 = x2;
  this.x3 = x3;
}

/**
 * Grade Type
 * @param x0 left/lower side
 * @param x1 right upper side
 */
function Grade(x0, x1) {
  "use strict";
  Shape.call(this, x0, x1);
}
Grade.prototype = {
  evaluate: function (val) {
    "use strict";
    var result = 0,
      x = val;

    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x1) {
      result = 1;
    } else {
      result = x / (this.x1 - this.x0) - this.x0 / (this.x1 - this.x0);
    }
    return result;
  },
};

/**
 * Reverse Grade
 * @param x0 left/upper side
 * @param x1 right/lower side
 */
function ReverseGrade(x0, x1) {
  "use strict";
  Shape.call(this, x0, x1);
}
ReverseGrade.prototype = {
  evaluate: function (val) {
    "use strict";
    var result = 0,
      x = val;

    if (x <= this.x0) {
      result = 1;
    } else if (x >= this.x1) {
      result = 0;
    } else {
      result = -x / (this.x1 - this.x0) + this.x1 / (this.x1 - this.x0);
    }
    return result;
  },
};

// exports the shapes
module.exports.Grade = Grade;
module.exports.ReverseGrade = ReverseGrade;

// Shortcut methods

/**
 * Grade Type
 * @param val Value to check on
 * @param x0 left/lower side
 * @param x1 right upper side
 * @return Grade
 */
export function grade(val, x0, x1) {
  "use strict";
  return new Grade(x0, x1).evaluate(val);
}

export function getFuzzyRemark(fuzzyNumber: number) {
  const computedRemarks = {
    "0.1": "very poor",
    "0.2": "poor",
    "0.3": "averagely poor",
    "0.4": "fair",
    "0.5": "Averagely good",
    "0.6": "Good",
    "0.7": "Very Good",
    "0.8": "Wonderfully good",
    "0.9": "Excellently good",
    "1.0": "Super Exellently good",
  };
  return computedRemarks[fuzzyNumber.toFixed(1).toString()];
}
