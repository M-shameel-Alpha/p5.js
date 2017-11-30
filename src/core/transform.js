/**
 * @module Transform
 * @submodule Transform
 * @for p5
 * @requires core
 * @requires constants
 */

'use strict';

var p5 = require('./core');
var constants = require('./constants');

/**
 * Multiplies the current matrix by the one specified through the parameters.
 * This is a powerful operation that can perform the equivalent of translate,
 * scale, shear and rotate all at once. You can learn more about transformation
 * matrices on <a href="https://en.wikipedia.org/wiki/Transformation_matrix">
 * Wikipedia</a>.
 *
 * The naming of the arguments here follows the naming of the <a href=
 * "https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-transform">
 * WHATWG specification</a> and corresponds to a
 * transformation matrix of the
 * form:
 *
 * > <img style="max-width: 150px" src="assets/transformation-matrix.png"
 * alt="The transformation matrix used when applyMatrix is called"/>
 *
 * @method applyMatrix
 * @param  {Number} a numbers which define the 2x3 matrix to be multiplied
 * @param  {Number} b numbers which define the 2x3 matrix to be multiplied
 * @param  {Number} c numbers which define the 2x3 matrix to be multiplied
 * @param  {Number} d numbers which define the 2x3 matrix to be multiplied
 * @param  {Number} e numbers which define the 2x3 matrix to be multiplied
 * @param  {Number} f numbers which define the 2x3 matrix to be multiplied
 * @chainable
 * @example
 * <div>
 * <code>
 * function setup() {
 *   frameRate(10);
 *   rectMode(CENTER);
 * }
 *
 * function draw() {
 *   var step = frameCount % 20;
 *   background(200);
 *   // Equivalent to translate(x, y);
 *   applyMatrix(1, 0, 0, 1, 40 + step, 50);
 *   rect(0, 0, 50, 50);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * function setup() {
 *   frameRate(10);
 *   rectMode(CENTER);
 * }
 *
 * function draw() {
 *   var step = frameCount % 20;
 *   background(200);
 *   translate(50, 50);
 *   // Equivalent to scale(x, y);
 *   applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);
 *   rect(0, 0, 50, 50);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * function setup() {
 *   frameRate(10);
 *   rectMode(CENTER);
 * }
 *
 * function draw() {
 *   var step = frameCount % 20
 *   var angle = map(step, 0, 20, 0, TWO_PI);
 *   var cos_a = cos(angle);
 *   var sin_a = sin(angle);
 *   background(200);
 *   translate(50, 50);
 *   // Equivalent to rotate(angle);
 *   applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
 *   rect(0, 0, 50, 50);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * function setup() {
 *   frameRate(10);
 *   rectMode(CENTER);
 * }
 *
 * function draw() {
 *   var step = frameCount % 20
 *   var angle = map(step, 0, 20, -PI/4, PI/4);
 *   background(200);
 *   translate(50, 50);
 *   // equivalent to shearX(angle);
 *   var shear_factor = 1 / tan(PI/2 - angle);
 *   applyMatrix(1, 0, shear_factor, 1, 0, 0);
 *   rect(0, 0, 50, 50);
 * }
 * </code>
 * </div>
 *
 * @alt
 * A rectangle translating to the right
 * A rectangle shrinking to the center
 * A rectangle rotating clockwise about the center
 * A rectangle shearing
 *
 */
p5.prototype.applyMatrix = function(a, b, c, d, e, f) {
  this._renderer.applyMatrix(a, b, c, d, e, f);
  return this;
};

p5.prototype.popMatrix = function() {
  throw new Error('popMatrix() not used, see pop()');
};

p5.prototype.printMatrix = function() {
  throw new Error('printMatrix() not implemented');
};

p5.prototype.pushMatrix = function() {
  throw new Error('pushMatrix() not used, see push()');
};

/**
 * Replaces the current matrix with the identity matrix.
 *
 * @method resetMatrix
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(50, 50);
 * applyMatrix(0.5, 0.5, -0.5, 0.5, 0, 0);
 * rect(0, 0, 20, 20);
 * // Note that the translate is also reset.
 * resetMatrix();
 * rect(0, 0, 20, 20);
 * </code>
 * </div>
 *
 * @alt
 * A rotated retangle in the center with another at the top left corner
 *
 */
p5.prototype.resetMatrix = function() {
  this._renderer.resetMatrix();
  return this;
};

/**
 * Rotates a shape the amount specified by the angle parameter. This
 * function accounts for angleMode, so angles can be entered in either
 * RADIANS or DEGREES.
 * <br><br>
 * Objects are always rotated around their relative position to the
 * origin and positive numbers rotate objects in a clockwise direction.
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * rotate(HALF_PI) and then rotate(HALF_PI) is the same as rotate(PI).
 * All tranformations are reset when draw() begins again.
 * <br><br>
 * Technically, rotate() multiplies the current transformation matrix
 * by a rotation matrix. This function can be further controlled by
 * the push() and pop().
 *
 * @method rotate
 * @param  {Number} angle the angle of rotation, specified in radians
 *                        or degrees, depending on current angleMode
 * @param  {p5.Vector|Number[]} [axis] (in 3d) the axis to rotate around
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(width/2, height/2);
 * rotate(PI/3.0);
 * rect(-26, -26, 52, 52);
 * </code>
 * </div>
 *
 * @alt
 * white 52x52 rect with black outline at center rotated counter 45 degrees
 *
 */
p5.prototype.rotate = function(angle, axis) {
  p5._validateParameters('rotate', arguments);
  var args = new Array(arguments.length);
  var r;
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  if (this._angleMode === constants.DEGREES) {
    r = this.radians(args[0]);
  } else if (this._angleMode === constants.RADIANS) {
    r = args[0];
  }
  //in webgl mode
  if (args.length > 1) {
    this._renderer.rotate(r, args[1]);
  } else {
    this._renderer.rotate(r);
  }
  return this;
};

/**
 * Rotates around X axis.
 * @method  rotateX
 * @param  {Number} rad angles in radians
 * @chainable
 * @example
 * <div modernizr='webgl'>
 * <code>
 * function setup() {
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw() {
 *   background(255);
 *   rotateX(millis() / 1000);
 *   box();
 * }
 * </code>
 * </div>
 *
 * @alt
 * 3d box rotating around the x axis.
 */
p5.prototype.rotateX = function(rad) {
  p5._validateParameters('rotateX', arguments);
  if (this._renderer.isP3D) {
    this._renderer.rotateX(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * Rotates around Y axis.
 * @method rotateY
 * @param  {Number} rad angles in radians
 * @chainable
 * @example
 * <div modernizr='webgl'>
 * <code>
 * function setup() {
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw() {
 *   background(255);
 *   rotateY(millis() / 1000);
 *   box();
 * }
 * </code>
 * </div>
 *
 * @alt
 * 3d box rotating around the y axis.
 */
p5.prototype.rotateY = function(rad) {
  p5._validateParameters('rotateY', arguments);
  if (this._renderer.isP3D) {
    this._renderer.rotateY(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * Rotates around Z axis. Webgl mode only.
 * @method rotateZ
 * @param  {Number} rad angles in radians
 * @chainable
 * @example
 * <div modernizr='webgl'>
 * <code>
 * function setup() {
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw() {
 *   background(255);
 *   rotateZ(millis() / 1000);
 *   box();
 * }
 * </code>
 * </div>
 *
 * @alt
 * 3d box rotating around the z axis.
 */
p5.prototype.rotateZ = function(rad) {
  p5._validateParameters('rotateZ', arguments);
  if (this._renderer.isP3D) {
    this._renderer.rotateZ(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * Increases or decreases the size of a shape by expanding and contracting
 * vertices. Objects always scale from their relative origin to the
 * coordinate system. Scale values are specified as decimal percentages.
 * For example, the function call scale(2.0) increases the dimension of a
 * shape by 200%.
 * <br><br>
 * Transformations apply to everything that happens after and subsequent
 * calls to the function multiply the effect. For example, calling scale(2.0)
 * and then scale(1.5) is the same as scale(3.0). If scale() is called
 * within draw(), the transformation is reset when the loop begins again.
 * <br><br>
 * Using this function with the z parameter is only available in WEBGL mode.
 * This function can be further controlled with push() and pop().
 *
 * @method scale
 * @param  {Number|p5.Vector|Number[]} s
 *                      percent to scale the object, or percentage to
 *                      scale the object in the x-axis if multiple arguments
 *                      are given
 * @param  {Number} [y] percent to scale the object in the y-axis
 * @param  {Number} [z] percent to scale the object in the z-axis (webgl only)
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(width/2, height/2);
 * rotate(PI/3.0);
 * rect(-26, -26, 52, 52);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rect(30, 20, 50, 50);
 * scale(0.5, 1.3);
 * rect(30, 20, 50, 50);
 * </code>
 * </div>
 *
 * @alt
 * white 52x52 rect with black outline at center rotated counter 45 degrees
 * 2 white rects with black outline- 1 50x50 at center. other 25x65 bottom left
 *
 */
/**
 * @method scale
 * @param  {p5.Vector|Number[]} scales per-axis percents to scale the object
 * @chainable
 */
p5.prototype.scale = function() {
  p5._validateParameters('scale', arguments);
  var x, y, z;
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
  }
  // Only check for Vector argument type if Vector is available
  if (typeof p5.Vector !== 'undefined' && args[0] instanceof p5.Vector) {
    x = args[0].x;
    y = args[0].y;
    z = args[0].z;
  } else if (args[0] instanceof Array) {
    x = args[0][0];
    y = args[0][1];
    z = args[0][2] || 1;
  } else {
    if (args.length === 1) {
      x = y = z = args[0];
    } else {
      x = args[0];
      y = args[1];
      z = args[2] || 1;
    }
  }

  if (this._renderer.isP3D) {
    this._renderer.scale.call(this._renderer, x, y, z);
  } else {
    this._renderer.scale.call(this._renderer, x, y);
  }
  return this;
};

/**
 * Shears a shape around the x-axis the amount specified by the angle
 * parameter. Angles should be specified in the current angleMode.
 * Objects are always sheared around their relative position to the origin
 * and positive numbers shear objects in a clockwise direction.
 * <br><br>
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * shearX(PI/2) and then shearX(PI/2) is the same as shearX(PI).
 * If shearX() is called within the draw(), the transformation is reset when
 * the loop begins again.
 * <br><br>
 * Technically, shearX() multiplies the current transformation matrix by a
 * rotation matrix. This function can be further controlled by the
 * push() and pop() functions.
 *
 * @method shearX
 * @param  {Number} angle angle of shear specified in radians or degrees,
 *                        depending on current angleMode
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(width/4, height/4);
 * shearX(PI/4.0);
 * rect(0, 0, 30, 30);
 * </code>
 * </div>
 *
 * @alt
 * white irregular quadrilateral with black outline at top middle.
 *
 */
p5.prototype.shearX = function(angle) {
  p5._validateParameters('shearX', arguments);
  if (this._angleMode === constants.DEGREES) {
    angle = this.radians(angle);
  }
  this._renderer.shearX(angle);
  return this;
};

/**
 * Shears a shape around the y-axis the amount specified by the angle
 * parameter. Angles should be specified in the current angleMode. Objects
 * are always sheared around their relative position to the origin and
 * positive numbers shear objects in a clockwise direction.
 * <br><br>
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * shearY(PI/2) and then shearY(PI/2) is the same as shearY(PI). If
 * shearY() is called within the draw(), the transformation is reset when
 * the loop begins again.
 * <br><br>
 * Technically, shearY() multiplies the current transformation matrix by a
 * rotation matrix. This function can be further controlled by the
 * push() and pop() functions.
 *
 * @method shearY
 * @param  {Number} angle angle of shear specified in radians or degrees,
 *                        depending on current angleMode
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(width/4, height/4);
 * shearY(PI/4.0);
 * rect(0, 0, 30, 30);
 * </code>
 * </div>
 *
 * @alt
 * white irregular quadrilateral with black outline at middle bottom.
 *
 */
p5.prototype.shearY = function(angle) {
  p5._validateParameters('shearY', arguments);
  if (this._angleMode === constants.DEGREES) {
    angle = this.radians(angle);
  }
  this._renderer.shearY(angle);
  return this;
};

/**
 * Specifies an amount to displace objects within the display window.
 * The x parameter specifies left/right translation, the y parameter
 * specifies up/down translation.
 * <br><br>
 * Transformations are cumulative and apply to everything that happens after
 * and subsequent calls to the function accumulates the effect. For example,
 * calling translate(50, 0) and then translate(20, 0) is the same as
 * translate(70, 0). If translate() is called within draw(), the
 * transformation is reset when the loop begins again. This function can be
 * further controlled by using push() and pop().
 *
 * @method translate
 * @param  {Number} x left/right translation
 * @param  {Number} y up/down translation
 * @param  {Number} [z] forward/backward translation (webgl only)
 * @chainable
 * @example
 * <div>
 * <code>
 * translate(30, 20);
 * rect(0, 0, 55, 55);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rect(0, 0, 55, 55);  // Draw rect at original 0,0
 * translate(30, 20);
 * rect(0, 0, 55, 55);  // Draw rect at new 0,0
 * translate(14, 14);
 * rect(0, 0, 55, 55);  // Draw rect at new 0,0
 * </code>
 * </div>
 *
 * @alt
 * white 55x55 rect with black outline at center right.
 * 3 white 55x55 rects with black outlines at top-l, center-r and bottom-r.
 *
 */
p5.prototype.translate = function(x, y, z) {
  p5._validateParameters('translate', arguments);
  if (this._renderer.isP3D) {
    this._renderer.translate(x, y, z);
  } else {
    this._renderer.translate(x, y);
  }
  return this;
};

module.exports = p5;
