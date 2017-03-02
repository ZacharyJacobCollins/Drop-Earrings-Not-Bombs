/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.2.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var perf;

if (process.env.NODE_ENV !== 'production') {
  perf = inBrowser && window.performance;
  if (perf && (!perf.mark || !perf.measure)) {
    perf = undefined;
  }
}

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

var warn = noop;
var tip = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1);
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, type) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, type);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + type + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'option is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
    updateComponent = function () {
      var name = vm._name;
      var startTag = "start " + name;
      var endTag = "end " + name;
      perf.mark(startTag);
      var vnode = vm._render();
      perf.mark(endTag);
      perf.measure((name + " render"), startTag, endTag);
      perf.mark(startTag);
      vm._update(vnode, hydrating);
      perf.mark(endTag);
      perf.measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  updateChildComponent(
    child,
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    activateChildComponent(vnode.componentInstance, true /* direct */);
  }
}

function destroy (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */);
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          data[key] = value[key];
        } else {
          var type = data.attrs && data.attrs.type;
          var hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initInjections (vm) {
  var provide = vm.$options.provide;
  var inject = vm.$options.inject;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && source._provided[provideKey]) {
          vm[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      perf.mark('init');
    }

    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    initInjections(vm);
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false);
      perf.mark('init end');
      perf.measure(((vm._name) + " init"), 'init', 'init end');
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.1';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  if (process.env.NODE_ENV !== 'production' &&
    el.attrsMap.checked != null) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  if (process.env.NODE_ENV !== 'production' &&
    el.attrsMap.checked != null) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  if (process.env.NODE_ENV !== 'production') {
    el.children.some(checkOptionWarning);
  }

  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function checkOptionWarning (option) {
  if (option.type === 1 &&
    option.tag === 'option' &&
    option.attrsMap.selected != null) {
    warn$1(
      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
      'inline selected attributes on <option> will be ignored when using v-model. ' +
      'Declare initial values in the component\'s data option instead.'
    );
    return true
  }
  return false
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookAgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookAgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var onRE = /^@|^v-on:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$2(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$2(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production' && !warned) {
          warned = true;
          warn$2(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
          warned = true;
          warn$2(
            'Component template requires a root element, rather than just text.'
          );
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("$event.button !== 0"),
  middle: genGuard("$event.button !== 1"),
  right: genGuard("$event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  } else if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  } else if (!handler.modifiers) {
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
      ? handler.value
      : ("function($event){" + (handler.value) + "}")
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code = genKeyFilter(keys) + code;
    }
    var handlerCode = simplePathRE.test(handler.value)
      ? handler.value + '($event)'
      : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    process.env.NODE_ENV !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = getNormalizationType(children);
    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
        ? normalizationType ? ("," + normalizationType) : ''
        : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// operators like typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');
// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;
// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
        perf.mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
        perf.mark('compile end');
        perf.measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(20)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {},namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.2.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["default"] = index_esm;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(2);

var _vuex2 = _interopRequireDefault(_vuex);

var _store = __webpack_require__(9);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

_vue2.default.component('creator', __webpack_require__(14));
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

_vue2.default.component('selector', __webpack_require__(15));
_vue2.default.component('colorpicker', __webpack_require__(13));
_vue2.default.component('classicEarring', __webpack_require__(12));

var app = new _vue2.default({
  store: _store2.default,
  el: '#app'
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['color'],
  computed: {
    layer1: function layer1() {
      return this.$store.state.earrings.color.layer1;
    },
    layer2: function layer2() {
      return this.$store.state.earrings.color.layer2;
    },
    layer3: function layer3() {
      return this.$store.state.earrings.color.layer3;
    },
    layer4: function layer4() {
      return this.$store.state.earrings.color.layer4;
    },
    layer5: function layer5() {
      return this.$store.state.earrings.color.layer5;
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: ["layername"],
  data: function data() {
    return {
      availableColors: availableColors
    };
  },

  methods: {
    updateColor: function updateColor(layer, color) {
      var payload = { layer: layer, color: color };
      this.$store.commit('SET_EARRING_LAYER_COLOR', payload);
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      items: [],
      shipping: 5.00
    };
  },

  computed: {
    earrings: function earrings() {
      return this.$store.state.earrings;
    },
    image: function image() {
      //Where selected is an array of the currently selected earring options
      var selected = [];
      selected.push(this.earrings.size);
      return this.earrings.size;
    },

    json: function json() {
      return JSON.stringify(this.data);
    },
    subTotal: function subTotal() {
      var total = 0;
      for (var i = 0; i < this.items.length; i++) {
        total += this.items[i].price * this.items[i].quantity;
      }
      return Number(total).toFixed(2);
    },
    total: function total() {
      var total = Number(this.subTotal);
      total += Number(this.shipping);
      total += Number(this.tax);
      return total.toFixed(2);
    },
    tax: function tax() {
      return Number(.06 * this.subTotal).toFixed(2);
    }
  },
  mounted: function mounted() {
    $.ajax({
      type: "get",
      // url: "http://45.79.70.166/cart/products",
      url: "http://localhost:8000/cart/products",
      headers: {
        'X-CSRF-TOKEN': window.Laravel.csrfToken
      },
      success: function success(msg) {
        console.log('success');
        app.items = msg;
      },
      fail: function fail(msg) {
        console.log('fail');
      }
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: ['available', 'title']
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(2);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var state = {
  earrings: {
    //TODO make ajax with laravel
    size: '',
    frames: { value: 'gold' },
    color: {
      //Contains an array of the colors available for the given layer
      layer1: 'none',
      layer2: 'none',
      layer3: 'none',
      layer4: 'none',
      layer5: 'none'
    },
    beads: ''

  }
};

var mutations = {
  SET_EARRING_LAYER_COLOR: function SET_EARRING_LAYER_COLOR(state, payload) {
    state.earrings.color[payload.layer] = payload.color;
  }
};

var actions = {};

var store = new _vuex2.default.Store({
  state: state,
  mutations: mutations,
  actions: actions
});

exports.default = store;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*eslint-disable no-unused-vars*/
/*!
 * jQuery JavaScript Library v3.1.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-07-07T21:44Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.0
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-04
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true;
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {
	// Known :disabled false positives:
	// IE: *[disabled]:not(button, input, select, textarea, optgroup, option, menuitem, fieldset)
	// not IE: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Check form elements and option elements for explicit disabling
		return "label" in elem && elem.disabled === disabled ||
			"form" in elem && elem.disabled === disabled ||

			// Check non-disabled form elements for fieldset[disabled] ancestors
			"form" in elem && elem.disabled === false && (
				// Support: IE6-11+
				// Ancestry is covered for us
				elem.isDisabled === disabled ||

				// Otherwise, assume any non-<option> under fieldset[disabled] is disabled
				/* jshint -W018 */
				elem.isDisabled !== !disabled &&
					("label" in elem || !disabledAncestor( elem )) !== disabled
			);
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnotwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) ),
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support: IE <=9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox <=42
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			return ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		opt.duration = typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in uncached url if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rts, "" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}





var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}


return jQuery;
} );


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(18),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ad/projects/Drop-Earrings-Not-Bombs/resources/assets/js/components/classic-earring.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] classic-earring.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fcd8d7e", Component.options)
  } else {
    hotAPI.reload("data-v-2fcd8d7e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(17),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ad/projects/Drop-Earrings-Not-Bombs/resources/assets/js/components/colorpicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] colorpicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2839d164", Component.options)
  } else {
    hotAPI.reload("data-v-2839d164", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(16),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ad/projects/Drop-Earrings-Not-Bombs/resources/assets/js/components/creator.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] creator.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11e5bfdf", Component.options)
  } else {
    hotAPI.reload("data-v-11e5bfdf", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ad/projects/Drop-Earrings-Not-Bombs/resources/assets/js/components/selector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] selector.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-366d7f3c", Component.options)
  } else {
    hotAPI.reload("data-v-366d7f3c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-6 earring-display"
  }, [_c('classic-earring', {
    attrs: {
      "color": _vm.earrings.color
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-3 creator-inputs"
  }, [_vm._l((_vm.earrings.color), function(layer, layerName) {
    return [_c('div', {
      staticClass: "form-group"
    }, [_c('label', {
      attrs: {
        "for": layerName
      }
    }, [_vm._v(" Choose a color for " + _vm._s(layerName))]), _vm._v(" "), _c('colorpicker', {
      attrs: {
        "layername": layerName
      }
    })], 1)]
  })], 2)]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden"
    },
    domProps: {
      "value": _vm.earrings
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-11e5bfdf", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.availableColors), function(color) {
    return _c('a', {
      style: ('background-color: ' + color.value),
      attrs: {
        "href": "#",
        "value": color.value
      },
      on: {
        "click": function($event) {
          _vm.updateColor(_vm.layername, color.value)
        }
      }
    }, [_vm._v("\n     \n  ")])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2839d164", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "80%",
      "viewBox": "0 0 602 998"
    }
  }, [_c('path', {
    attrs: {
      "id": "wireTop",
      "fill": "gold",
      "stroke": "none",
      "d": "M 264.00,210.67            C 264.00,210.67 277.33,209.33 277.33,209.33              277.33,209.33 289.33,208.67 289.33,208.67              289.33,208.67 306.67,209.33 306.67,209.33              306.67,209.33 322.00,210.67 322.00,210.67              322.00,210.67 332.00,211.33 332.00,211.33              332.00,211.33 341.33,210.00 342.00,210.00              342.67,210.00 348.67,210.00 348.67,210.00              348.67,210.00 349.33,226.00 349.33,226.00              349.33,226.00 350.67,238.00 350.67,238.00              350.67,238.00 349.33,248.00 349.33,248.00              349.33,248.00 348.67,258.00 348.67,258.00              348.67,258.00 348.67,269.33 348.67,269.33              348.67,269.33 348.00,280.67 348.00,280.67              348.00,280.67 348.00,289.33 348.00,289.33              348.00,289.33 349.33,294.67 349.33,294.67              349.33,294.67 344.00,299.33 344.00,300.00              344.00,300.67 332.67,304.67 332.67,304.67              332.67,304.67 319.33,306.67 319.33,306.67              319.33,306.67 301.33,306.67 301.33,306.67              301.33,306.67 282.67,304.67 282.67,304.67              282.67,304.67 267.33,300.67 267.33,300.67              267.33,300.67 258.67,297.33 258.67,297.33              258.67,297.33 258.00,288.67 258.00,288.67              258.00,288.67 260.00,274.67 260.00,274.67              260.00,274.67 261.33,265.33 261.33,265.33              261.33,265.33 261.33,252.67 261.33,252.67              261.33,252.67 259.33,239.33 259.33,239.33              259.33,239.33 260.67,224.00 260.67,224.00              260.67,224.00 264.00,210.67 264.00,210.67 Z            M 287.33,153.33            C 287.33,153.33 282.00,161.33 282.00,161.33              282.00,161.33 279.33,174.00 279.33,174.00              279.33,174.00 281.33,187.33 281.33,187.33              281.33,187.33 289.33,199.33 289.33,199.33              289.33,199.33 295.25,208.25 295.25,208.25              295.25,208.25 289.50,208.75 289.50,208.75              289.50,208.75 281.50,209.00 281.50,209.00              281.50,209.00 275.33,201.33 275.33,201.33              275.33,201.33 268.00,188.67 268.00,188.67              268.00,188.67 266.67,172.67 266.67,172.67              266.67,172.67 269.33,159.33 269.33,159.33              269.33,159.33 274.67,148.67 274.67,148.67              274.67,148.67 282.67,140.67 282.67,140.67              282.67,140.67 293.33,134.00 293.33,134.00              293.33,134.00 301.33,132.00 301.33,132.00              301.33,132.00 311.00,131.50 311.00,131.50              311.00,131.50 322.00,134.75 322.00,134.75              322.00,134.75 329.50,139.25 329.50,139.25              329.50,139.25 336.67,145.33 336.67,145.33              336.67,145.33 344.00,152.75 344.00,152.75              344.00,152.75 348.67,162.67 348.67,162.67              348.67,162.67 352.00,175.33 352.00,175.33              352.00,175.33 350.00,187.33 350.00,187.33              350.00,187.33 342.67,202.67 342.67,202.67              342.67,202.67 338.25,210.75 338.25,210.75              338.25,210.75 322.25,210.75 322.25,210.75              322.25,210.75 327.33,202.67 327.33,202.67              327.33,202.67 333.33,193.33 333.33,193.33              333.33,193.33 338.00,182.00 338.00,182.00              338.00,182.00 335.33,172.00 335.33,172.00              335.33,172.00 331.33,162.67 331.33,162.67              331.33,162.67 327.33,156.00 327.33,156.00              327.33,156.00 320.00,150.67 320.00,150.67              320.00,150.67 311.33,147.33 311.33,147.33              311.33,147.33 302.67,147.33 302.67,147.33              302.67,147.33 294.67,149.33 294.67,149.33"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "wire",
      "fill": "gold",
      "stroke": "none",
      "d": "M 483.33,604.00            C 483.33,604.00 492.00,600.00 492.00,600.00              492.00,600.00 501.33,594.67 501.33,594.67              501.33,594.67 510.67,590.00 510.67,590.00              510.67,590.00 516.00,586.67 516.00,586.67              516.00,586.67 520.00,592.00 520.00,592.00              520.00,592.00 516.67,596.00 516.67,596.00              516.67,596.00 508.67,601.33 508.67,601.33              508.67,601.33 500.00,604.67 500.00,604.67              500.00,604.67 492.00,607.33 492.00,607.33              492.00,607.33 485.33,610.67 485.33,610.67              485.33,610.67 483.33,604.00 483.33,604.00 Z            M 488.67,619.33            C 488.67,619.33 498.00,616.00 498.00,616.00              498.00,616.00 508.00,612.00 508.00,612.00              508.00,612.00 516.00,608.67 516.00,608.67              516.00,608.67 521.33,604.67 521.33,604.67              521.33,604.67 524.67,606.00 524.67,606.00              524.67,606.00 526.00,610.00 526.00,610.00              526.00,610.00 520.67,614.00 520.67,614.00              520.67,614.00 513.33,618.00 513.33,618.00              513.33,618.00 505.33,621.33 505.33,621.33              505.33,621.33 495.33,624.67 495.33,624.67              495.33,624.67 488.00,626.67 488.00,626.67              488.00,626.67 488.67,619.33 488.67,619.33 Z            M 492.67,638.00            C 492.67,638.00 501.33,636.00 501.33,636.00              501.33,636.00 510.67,632.00 510.67,632.00              510.67,632.00 518.67,628.67 518.67,628.67              518.67,628.67 526.00,625.33 526.00,625.33              526.00,625.33 529.33,624.67 530.00,624.67              530.67,624.67 531.33,628.67 531.33,628.67              531.33,628.67 530.00,632.00 530.00,632.00              530.00,632.00 525.33,635.33 525.33,635.33              525.33,635.33 520.67,637.33 520.67,637.33              520.67,637.33 512.67,640.00 512.67,640.00              512.67,640.00 506.00,642.67 506.00,642.67              506.00,642.67 497.33,645.33 497.33,645.33              497.33,645.33 492.00,645.33 492.00,645.33              492.00,645.33 492.67,638.00 492.67,638.00 Z            M 494.00,656.00            C 494.00,656.00 500.67,654.67 500.67,654.67              500.67,654.67 508.00,652.67 508.00,652.67              508.00,652.67 515.33,650.67 515.33,650.67              515.33,650.67 522.00,648.00 522.00,648.00              522.00,648.00 530.00,646.00 530.00,646.00              530.00,646.00 532.00,650.00 532.00,650.67              532.00,651.33 531.33,655.33 531.33,655.33              531.33,655.33 525.33,657.33 525.33,657.33              525.33,657.33 518.00,659.33 518.00,659.33              518.00,659.33 511.33,662.00 511.33,662.00              511.33,662.00 505.33,663.33 505.33,663.33              505.33,663.33 498.67,665.33 498.67,665.33              498.67,665.33 493.33,663.33 493.33,663.33              493.33,663.33 494.00,656.00 494.00,656.00 Z            M 518.15,614.37            C 518.15,614.37 521.97,619.19 521.97,619.19M 479.31,588.83            C 479.31,588.83 482.82,586.46 482.82,586.46              482.82,586.46 488.04,584.07 488.04,584.07              488.04,584.07 494.49,580.57 494.49,580.57              494.49,580.57 499.32,578.46 499.32,578.46              499.32,578.46 503.43,576.54 503.43,576.54              503.43,576.54 507.33,573.90 507.33,573.90              507.33,573.90 510.00,570.68 510.00,570.68              510.00,570.68 512.83,575.31 512.83,575.31              512.83,575.31 510.70,579.31 510.70,579.31              510.70,579.31 506.99,582.66 506.99,582.66              506.99,582.66 502.24,586.15 502.24,586.15              502.24,586.15 495.52,589.26 495.52,589.26              495.52,589.26 488.54,591.98 488.54,591.98              488.54,591.98 482.93,594.63 482.93,594.63              482.93,594.63 478.89,596.22 478.56,596.15              478.23,596.09 476.38,591.66 476.38,591.66              476.38,591.66 479.31,588.83 479.31,588.83 Z            M 322.00,332.00            C 322.00,332.00 324.00,339.33 324.00,339.33              324.00,339.33 328.67,332.67 328.67,332.67              328.67,332.67 335.33,324.67 335.33,324.67              335.33,324.67 342.67,318.67 342.67,318.00              342.67,317.33 349.33,311.33 349.33,311.33              349.33,311.33 352.00,303.33 352.00,303.33              352.00,303.33 349.33,297.33 349.33,297.33              349.33,297.33 343.33,302.67 343.33,302.67              343.33,302.67 337.33,310.00 337.33,310.00              337.33,310.00 330.67,317.33 330.67,317.33              330.67,317.33 324.00,324.67 324.00,324.67              324.00,324.67 322.00,332.00 322.00,332.00 Z            M 333.33,348.00            C 333.33,348.00 340.00,339.33 340.00,339.33              340.00,339.33 348.00,331.33 348.00,331.33              348.00,331.33 353.33,324.00 353.33,324.00              353.33,324.00 358.67,319.33 358.67,319.33              358.67,319.33 363.33,322.00 363.33,322.00              363.33,322.00 360.67,327.33 360.67,327.33              360.67,327.33 354.00,333.33 354.00,333.33              354.00,333.33 347.33,340.67 347.33,340.67              347.33,340.67 342.67,348.67 342.00,348.67              341.33,348.67 336.00,354.00 336.00,354.00              336.00,354.00 331.33,354.67 331.33,354.67              331.33,354.67 333.33,348.00 333.33,348.00 Z            M 344.67,364.00            C 344.67,364.00 350.00,355.33 350.00,355.33              350.00,355.33 356.67,348.67 356.67,348.67              356.67,348.67 362.67,342.67 362.67,342.67              362.67,342.67 368.67,336.00 368.67,336.00              368.67,336.00 373.33,332.67 373.33,332.67              373.33,332.67 374.67,338.00 374.67,338.00              374.67,338.00 372.00,344.67 372.00,344.67              372.00,344.67 366.00,350.67 366.00,350.67              366.00,350.67 359.33,358.67 359.33,358.67              359.33,358.67 353.33,364.67 353.33,364.67              353.33,364.67 349.33,370.00 349.33,370.00              349.33,370.00 344.67,364.00 344.67,364.00 Z            M 354.67,378.67            C 354.67,378.67 360.67,372.00 360.67,372.00              360.67,372.00 368.00,367.33 368.00,367.33              368.00,367.33 374.00,360.00 374.00,360.00              374.00,360.00 379.33,353.33 379.33,353.33              379.33,353.33 383.33,349.33 383.33,349.33              383.33,349.33 386.67,353.33 386.67,353.33              386.67,353.33 385.33,358.67 385.33,358.67              385.33,358.67 379.33,364.67 379.33,364.67              379.33,364.67 372.67,373.33 372.67,373.33              372.67,373.33 366.00,378.67 366.00,378.67              366.00,378.67 361.33,383.33 361.33,383.33              361.33,383.33 355.33,384.00 355.33,384.67              355.33,385.33 354.67,378.67 354.67,378.67 Z            M 366.00,396.67            C 366.00,396.67 371.33,390.67 371.33,390.67              371.33,390.67 377.33,385.33 377.33,385.33              377.33,385.33 384.00,378.00 384.00,378.00              384.00,378.00 389.33,371.33 389.33,371.33              389.33,371.33 394.00,366.00 394.00,366.00              394.00,366.00 396.67,370.00 396.67,370.00              396.67,370.00 396.67,374.67 396.67,374.67              396.67,374.67 392.67,380.00 392.67,380.00              392.67,380.00 388.67,386.00 388.67,386.00              388.67,386.00 380.00,394.00 380.00,394.00              380.00,394.00 374.00,399.33 374.00,399.33              374.00,399.33 367.33,400.67 367.33,400.67              367.33,400.67 366.00,396.67 366.00,396.67 Z            M 375.33,412.00            C 375.33,412.00 380.67,406.67 380.67,406.67              380.67,406.67 388.00,400.00 388.00,400.00              388.00,400.00 394.67,394.00 394.67,394.00              394.67,394.00 400.00,388.00 400.00,388.00              400.00,388.00 402.67,383.33 402.67,383.33              402.67,383.33 406.00,387.33 406.00,387.33              406.00,387.33 405.33,392.67 405.33,392.67              405.33,392.67 402.00,397.33 402.00,397.33              402.00,397.33 395.33,404.00 395.33,404.00              395.33,404.00 389.33,410.00 389.33,410.00              389.33,410.00 383.33,414.67 383.33,414.67              383.33,414.67 378.67,417.33 378.67,417.33              378.67,417.33 375.33,412.00 375.33,412.00 Z            M 388.00,436.00            C 388.00,436.00 393.33,431.33 393.33,431.33              393.33,431.33 399.33,426.00 399.33,426.00              399.33,426.00 405.33,421.33 405.33,421.33              405.33,421.33 412.00,415.33 412.00,415.33              412.00,415.33 417.33,408.67 417.33,408.67              417.33,408.67 418.00,402.00 418.00,402.00              418.00,402.00 414.00,398.00 414.00,398.00              414.00,398.00 410.67,404.67 410.67,404.67              410.67,404.67 406.67,409.33 406.67,409.33              406.67,409.33 400.67,415.33 400.67,415.33              400.67,415.33 394.00,420.67 394.00,420.67              394.00,420.67 386.67,426.67 386.67,426.67              386.67,426.67 382.67,430.67 382.67,430.67              382.67,430.67 388.00,436.00 388.00,436.00 Z            M 396.67,444.00            C 396.67,444.00 402.00,438.00 402.00,438.00              402.00,438.00 407.33,434.00 407.33,434.00              407.33,434.00 414.00,428.00 414.00,428.00              414.00,428.00 419.33,422.67 419.33,422.67              419.33,422.67 424.67,417.33 424.67,417.33              424.67,417.33 428.00,421.33 428.00,421.33              428.00,421.33 426.67,426.67 426.67,426.67              426.67,426.67 421.33,432.00 421.33,432.00              421.33,432.00 416.67,437.33 416.67,437.33              416.67,437.33 408.67,443.33 408.67,443.33              408.67,443.33 404.00,448.00 403.33,448.00              402.67,448.00 398.00,450.00 398.00,450.00              398.00,450.00 396.67,444.00 396.67,444.00 Z            M 432.67,430.00            C 432.67,430.00 436.00,434.00 436.00,434.00              436.00,434.00 437.33,438.67 437.33,438.67              437.33,438.67 434.00,444.67 434.00,444.67              434.00,444.67 428.67,450.00 428.67,450.00              428.67,450.00 423.33,455.33 423.33,455.33              423.33,455.33 417.33,458.67 417.33,458.67              417.33,458.67 412.67,463.33 412.67,463.33              412.67,463.33 407.33,466.00 407.33,466.00              407.33,466.00 404.00,461.33 404.00,461.33              404.00,461.33 410.00,457.33 410.00,457.33              410.00,457.33 417.33,450.67 417.33,450.67              417.33,450.67 423.33,444.00 423.33,444.00              423.33,444.00 429.33,436.67 429.33,436.67              429.33,436.67 432.67,430.00 432.67,430.00 Z            M 442.00,447.33            C 442.00,447.33 446.67,450.67 446.67,450.67              446.67,450.67 447.33,454.67 447.33,454.67              447.33,454.67 444.00,460.67 444.00,460.67              444.00,460.67 438.67,467.33 438.67,467.33              438.67,467.33 432.67,471.33 432.67,471.33              432.67,471.33 427.33,476.00 427.33,476.00              427.33,476.00 422.00,481.33 422.00,481.33              422.00,481.33 417.33,482.00 417.33,482.00              417.33,482.00 414.67,477.33 414.67,477.33              414.67,477.33 419.33,472.00 419.33,472.00              419.33,472.00 426.67,466.67 426.67,466.67              426.67,466.67 434.00,460.00 434.00,460.00              434.00,460.00 439.33,454.00 439.33,454.00              439.33,454.00 442.00,447.33 442.00,447.33 Z            M 454.00,464.67            C 454.00,464.67 458.67,469.33 458.67,469.33              458.67,469.33 456.67,474.00 456.67,474.00              456.67,474.00 452.00,479.33 452.00,479.33              452.00,479.33 446.67,483.33 446.67,484.00              446.67,484.67 442.67,487.33 442.67,487.33              442.67,487.33 438.67,490.67 438.67,491.33              438.67,492.00 434.67,496.67 434.67,496.67              434.67,496.67 430.00,499.33 430.00,499.33              430.00,499.33 424.67,496.00 424.67,496.00              424.67,496.00 425.33,490.67 425.33,490.67              425.33,490.67 430.67,488.00 430.67,488.00              430.67,488.00 434.67,482.67 435.33,482.67              436.00,482.67 441.33,478.00 441.33,478.00              441.33,478.00 446.00,472.67 446.00,472.67              446.00,472.67 450.00,469.33 450.00,469.33              450.00,469.33 454.00,464.67 454.00,464.67 Z            M 461.33,480.67            C 461.33,480.67 466.00,484.00 466.00,484.00              466.00,484.00 467.33,488.67 467.33,488.67              467.33,488.67 463.33,492.67 463.33,492.67              463.33,492.67 459.33,496.00 459.33,496.00              459.33,496.00 454.67,500.00 454.67,500.00              454.67,500.00 450.00,503.33 450.00,504.00              450.00,504.67 445.33,508.67 445.33,509.33              445.33,510.00 442.00,512.67 442.00,512.67              442.00,512.67 436.00,513.33 436.00,513.33              436.00,513.33 434.00,508.00 434.00,508.00              434.00,508.00 440.00,503.33 440.00,503.33              440.00,503.33 445.33,498.00 445.33,498.00              445.33,498.00 451.33,494.67 451.33,494.67              451.33,494.67 454.67,490.00 454.67,490.00              454.67,490.00 459.33,486.00 459.33,486.00              459.33,486.00 461.33,480.67 461.33,480.67 Z            M 469.33,498.00            C 469.33,498.00 474.67,499.33 474.67,499.33              474.67,499.33 477.33,503.33 477.33,503.33              477.33,503.33 474.00,507.33 474.00,507.33              474.00,507.33 470.00,512.67 470.00,512.67              470.00,512.67 464.00,516.67 464.00,516.67              464.00,516.67 460.00,520.67 459.33,520.67              458.67,520.67 454.67,524.00 454.67,524.00              454.67,524.00 450.67,528.00 450.67,528.00              450.67,528.00 445.33,529.33 445.33,529.33              445.33,529.33 442.00,526.00 442.00,526.00              442.00,526.00 446.67,521.33 446.67,521.33              446.67,521.33 452.00,516.00 452.00,516.00              452.00,516.00 456.67,512.00 456.67,512.00              456.67,512.00 462.00,508.00 462.00,508.00              462.00,508.00 466.67,503.33 466.67,503.33              466.67,503.33 469.33,498.00 469.33,498.00 Z            M 478.67,513.33            C 478.67,513.33 483.33,517.33 483.33,517.33              483.33,517.33 482.67,524.00 482.67,524.00              482.67,524.00 476.00,530.67 476.00,530.67              476.00,530.67 469.33,536.67 469.33,536.67              469.33,536.67 462.00,540.67 462.00,540.67              462.00,540.67 456.67,544.67 456.67,544.67              456.67,544.67 451.33,542.00 451.33,542.00              451.33,542.00 456.00,536.67 456.00,536.67              456.00,536.67 462.00,533.33 462.00,533.33              462.00,533.33 467.33,528.00 467.33,528.00              467.33,528.00 472.00,523.33 472.00,523.33              472.00,523.33 474.67,520.00 475.33,520.00              476.00,520.00 478.67,513.33 478.67,513.33 Z            M 460.67,557.33            C 460.67,557.33 464.67,553.33 464.67,553.33              464.67,553.33 467.67,550.33 467.67,550.33              467.67,550.33 471.67,548.00 471.67,548.00              471.67,548.00 475.00,546.67 475.33,546.67              475.67,546.67 479.67,543.67 479.67,543.67              479.67,543.67 483.33,540.00 483.33,540.00              483.33,540.00 486.00,536.33 486.00,536.33              486.00,536.33 484.67,533.00 484.67,533.00              484.67,533.00 488.33,532.67 488.33,532.67              488.33,532.67 491.67,535.33 491.67,535.33              491.67,535.33 492.00,539.00 492.00,539.00              492.00,539.00 489.00,543.67 489.00,543.67              489.00,543.67 485.00,547.67 485.00,547.67              485.00,547.67 481.33,551.00 481.33,551.00              481.33,551.00 477.00,554.67 477.00,554.67              477.00,554.67 472.00,558.33 472.00,558.33              472.00,558.33 469.00,560.67 469.00,560.67              469.00,560.67 463.67,562.33 463.67,562.33              463.67,562.33 460.33,560.67 460.33,560.67              460.33,560.67 460.67,557.33 460.67,557.33 Z            M 471.00,573.67            C 471.00,573.67 474.00,570.67 474.00,570.67              474.00,570.67 478.67,567.33 478.67,567.33              478.67,567.33 484.33,562.67 484.33,562.67              484.33,562.67 488.67,559.67 488.67,559.67              488.67,559.67 492.33,557.00 492.33,557.00              492.33,557.00 495.67,553.67 495.67,553.67              495.67,553.67 497.67,550.00 497.67,550.00              497.67,550.00 501.33,554.00 501.33,554.00              501.33,554.00 500.00,558.33 500.00,558.33              500.00,558.33 497.00,562.33 497.00,562.33              497.00,562.33 493.00,566.67 493.00,566.67              493.00,566.67 487.00,571.00 487.00,571.00              487.00,571.00 480.67,575.00 480.67,575.00              480.67,575.00 475.67,578.67 475.67,578.67              475.67,578.67 472.00,581.00 471.67,581.00              471.33,581.00 468.67,577.00 468.67,577.00              468.67,577.00 471.00,573.67 471.00,573.67 Z            M 496.00,676.67            C 496.00,676.67 504.00,674.00 504.00,674.00              504.00,674.00 512.67,672.00 512.67,672.00              512.67,672.00 519.33,670.00 519.33,670.00              519.33,670.00 526.67,667.33 526.67,667.33              526.67,667.33 530.00,667.33 530.00,667.33              530.00,667.33 532.67,670.00 532.67,670.00              532.67,670.00 532.67,675.33 532.67,675.33              532.67,675.33 527.33,677.33 527.33,677.33              527.33,677.33 519.33,680.00 519.33,680.00              519.33,680.00 511.33,681.33 511.33,681.33              511.33,681.33 506.67,682.00 506.67,682.67              506.67,683.33 501.33,684.67 501.33,684.67              501.33,684.67 496.67,684.67 496.67,684.67              496.67,684.67 496.00,676.67 496.00,676.67 Z            M 494.00,696.00            C 494.00,696.00 502.00,695.33 502.00,695.33              502.00,695.33 510.00,694.00 510.00,694.00              510.00,694.00 518.67,694.00 518.67,694.00              518.67,694.00 524.67,693.33 524.67,693.33              524.67,693.33 528.67,692.67 528.67,692.67              528.67,692.67 531.33,696.67 531.33,696.67              531.33,696.67 530.67,700.67 530.67,700.67              530.67,700.67 526.67,702.67 526.67,702.67              526.67,702.67 520.67,702.67 520.67,702.67              520.67,702.67 512.67,702.67 512.67,702.67              512.67,702.67 504.00,702.67 504.00,702.67              504.00,702.67 496.00,703.33 496.00,703.33              496.00,703.33 490.67,700.67 490.67,700.67              490.67,700.67 494.00,696.00 494.00,696.00 Z            M 488.67,720.00            C 488.67,720.00 492.67,714.67 492.67,714.67              492.67,714.67 500.67,714.67 500.67,714.67              500.67,714.67 510.67,714.67 510.67,714.67              510.67,714.67 518.67,715.33 519.33,715.33              520.00,715.33 524.00,715.33 524.00,715.33              524.00,715.33 527.33,718.67 528.00,718.67              528.67,718.67 525.33,722.67 525.33,722.67              525.33,722.67 520.67,724.67 520.67,724.67              520.67,724.67 515.33,724.67 515.33,724.67              515.33,724.67 510.00,724.67 510.00,724.67              510.00,724.67 502.00,722.67 502.00,722.67              502.00,722.67 496.67,723.33 496.00,723.33              495.33,723.33 488.67,720.00 488.67,720.00 Z            M 488.67,731.33            C 488.67,731.33 496.00,732.00 496.00,732.00              496.00,732.00 505.33,733.33 505.33,733.33              505.33,733.33 514.00,735.33 514.00,735.33              514.00,735.33 519.33,736.00 519.33,736.00              519.33,736.00 526.67,738.67 526.67,738.67              526.67,738.67 528.00,742.00 528.00,742.00              528.00,742.00 524.00,745.33 524.00,745.33              524.00,745.33 518.67,745.33 518.67,745.33              518.67,745.33 514.67,744.67 514.67,744.67              514.67,744.67 507.33,744.00 507.33,744.00              507.33,744.00 501.33,742.67 501.33,742.67              501.33,742.67 494.67,741.33 494.67,741.33              494.67,741.33 486.67,738.67 486.67,738.67              486.67,738.67 488.67,731.33 488.67,731.33 Z            M 483.33,750.00            C 483.33,750.00 490.67,750.00 490.67,750.00              490.67,750.00 498.00,751.33 498.00,751.33              498.00,751.33 506.00,753.33 506.00,753.33              506.00,753.33 513.33,754.00 513.33,754.67              513.33,755.33 520.00,756.67 520.00,756.67              520.00,756.67 520.67,758.00 521.33,758.00              522.00,758.00 522.00,762.00 522.00,762.00              522.00,762.00 519.33,764.67 519.33,764.67              519.33,764.67 514.67,764.00 514.67,764.00              514.67,764.00 510.00,762.67 510.00,762.67              510.00,762.67 502.67,761.33 502.67,761.33              502.67,761.33 496.00,760.00 495.33,760.00              494.67,760.00 488.67,759.33 488.00,759.33              487.33,759.33 482.67,756.67 482.67,756.67              482.67,756.67 483.33,750.00 483.33,750.00 Z            M 480.67,769.33            C 480.67,769.33 488.00,770.67 488.00,770.67              488.00,770.67 496.67,772.67 496.67,772.67              496.67,772.67 502.67,775.33 502.67,775.33              502.67,775.33 509.33,776.67 509.33,776.67              509.33,776.67 514.00,779.33 514.00,779.33              514.00,779.33 517.33,780.67 517.33,780.67              517.33,780.67 518.00,783.33 518.00,783.33              518.00,783.33 514.00,786.67 514.00,786.67              514.00,786.67 506.67,785.33 506.67,785.33              506.67,785.33 500.67,784.67 500.67,784.67              500.67,784.67 493.33,782.67 493.33,782.67              493.33,782.67 488.00,780.00 488.00,780.00              488.00,780.00 482.00,778.67 482.00,778.67              482.00,778.67 480.67,769.33 480.67,769.33 Z            M 479.33,790.00            C 479.33,790.00 483.33,790.00 483.33,790.00              483.33,790.00 491.33,792.67 491.33,792.67              491.33,792.67 498.00,796.00 498.00,796.00              498.00,796.00 502.67,796.67 502.67,796.67              502.67,796.67 506.00,797.33 506.00,797.33              506.00,797.33 508.67,800.00 508.67,800.00              508.67,800.00 508.67,802.67 508.67,802.67              508.67,802.67 506.00,805.33 506.00,805.33              506.00,805.33 500.00,803.33 500.00,803.33              500.00,803.33 494.00,802.67 494.00,802.67              494.00,802.67 486.00,800.00 486.00,800.00              486.00,800.00 478.00,797.33 478.00,797.33              478.00,797.33 472.67,792.67 472.67,792.67              472.67,792.67 479.33,790.00 479.33,790.00 Z            M 468.67,803.33            C 468.67,803.33 477.33,806.67 477.33,806.67              477.33,806.67 486.00,810.00 486.00,810.00              486.00,810.00 492.00,812.67 492.00,812.67              492.00,812.67 496.00,815.33 496.00,815.33              496.00,815.33 500.00,816.67 500.00,816.67              500.00,816.67 501.33,820.67 501.33,820.67              501.33,820.67 496.00,823.33 496.00,823.33              496.00,823.33 491.33,822.00 491.33,822.00              491.33,822.00 487.33,820.00 487.33,820.00              487.33,820.00 482.67,818.00 482.67,818.00              482.67,818.00 478.00,816.00 478.00,816.00              478.00,816.00 472.00,813.33 472.00,813.33              472.00,813.33 469.33,811.33 469.33,811.33              469.33,811.33 465.33,808.67 465.33,808.67              465.33,808.67 468.67,803.33 468.67,803.33 Z            M 462.00,816.00            C 462.00,816.00 470.00,819.33 470.00,819.33              470.00,819.33 476.67,824.67 477.33,824.67              478.00,824.67 484.00,827.33 484.67,827.33              485.33,827.33 489.33,829.33 489.33,829.33              489.33,829.33 493.33,832.67 493.33,832.67              493.33,832.67 490.00,835.33 490.00,835.33              490.00,835.33 480.67,834.67 480.67,834.67              480.67,834.67 475.33,831.33 475.33,831.33              475.33,831.33 470.00,828.67 470.00,828.67              470.00,828.67 464.67,826.67 464.67,826.00              464.67,825.33 458.67,822.67 458.67,822.67              458.67,822.67 462.00,816.00 462.00,816.00 Z            M 450.00,829.33            C 450.00,829.33 455.33,830.00 455.33,830.00              455.33,830.00 460.00,834.00 460.00,834.00              460.00,834.00 465.33,837.33 465.33,837.33              465.33,837.33 472.00,841.33 472.00,841.33              472.00,841.33 477.33,844.00 477.33,844.00              477.33,844.00 482.67,846.00 482.67,846.00              482.67,846.00 480.00,850.00 480.00,850.00              480.00,850.00 475.33,851.33 475.33,851.33              475.33,851.33 469.33,848.67 469.33,848.67              469.33,848.67 463.33,844.67 463.33,844.67              463.33,844.67 458.00,841.33 458.00,841.33              458.00,841.33 454.00,838.00 454.00,838.00              454.00,838.00 450.00,834.67 449.33,834.67              448.67,834.67 450.00,829.33 450.00,829.33 Z            M 439.33,840.67            C 439.33,840.67 445.33,842.00 445.33,842.00              445.33,842.00 449.33,844.67 449.33,844.67              449.33,844.67 453.33,848.67 453.33,848.67              453.33,848.67 458.00,852.00 458.00,852.00              458.00,852.00 462.67,855.33 462.67,855.33              462.67,855.33 466.00,858.67 466.00,858.67              466.00,858.67 466.00,864.00 466.00,864.00              466.00,864.00 460.67,864.00 460.67,864.00              460.67,864.00 454.67,860.00 454.67,860.00              454.67,860.00 450.00,855.33 450.00,855.33              450.00,855.33 444.67,851.33 444.67,851.33              444.67,851.33 440.67,846.67 440.67,846.67              440.67,846.67 439.33,840.67 439.33,840.67 Z            M 428.00,852.00            C 428.00,852.00 434.67,854.00 434.67,854.00              434.67,854.00 440.67,860.00 440.67,860.00              440.67,860.00 445.33,866.00 445.33,866.00              445.33,866.00 450.00,869.33 450.00,869.33              450.00,869.33 454.00,872.67 454.00,872.67              454.00,872.67 452.00,876.67 452.00,876.67              452.00,876.67 446.67,876.67 446.67,876.67              446.67,876.67 441.33,872.67 441.33,872.67              441.33,872.67 435.33,867.33 435.33,866.67              435.33,866.00 431.33,862.00 430.67,861.33              430.00,860.67 426.00,856.67 426.00,856.67              426.00,856.67 428.00,852.00 428.00,852.00 Z            M 414.00,860.00            C 414.00,860.00 419.33,863.33 419.33,863.33              419.33,863.33 424.00,868.67 424.00,868.67              424.00,868.67 429.33,874.00 429.33,874.00              429.33,874.00 434.00,881.33 434.00,881.33              434.00,881.33 438.00,884.00 438.00,884.00              438.00,884.00 438.67,889.33 438.67,889.33              438.67,889.33 434.00,890.00 434.00,890.00              434.00,890.00 427.33,886.00 427.33,886.00              427.33,886.00 422.67,880.00 422.67,880.00              422.67,880.00 416.67,874.00 416.67,874.00              416.67,874.00 411.33,868.00 411.33,868.00              411.33,868.00 414.00,860.00 414.00,860.00 Z            M 400.00,871.33            C 400.00,871.33 405.33,872.67 405.33,872.67              405.33,872.67 408.67,876.67 408.67,876.67              408.67,876.67 414.00,882.67 414.00,882.67              414.00,882.67 416.67,887.33 416.67,887.33              416.67,887.33 419.33,891.33 419.33,891.33              419.33,891.33 422.00,896.00 422.00,896.00              422.00,896.00 418.67,900.00 418.67,900.00              418.67,900.00 414.67,896.67 414.00,896.67              413.33,896.67 407.33,890.00 407.33,890.00              407.33,890.00 403.33,884.67 403.33,884.67              403.33,884.67 398.00,877.33 398.00,877.33              398.00,877.33 400.00,871.33 400.00,871.33 Z            M 389.33,880.67            C 389.33,880.67 392.00,886.00 392.00,886.00              392.00,886.00 394.67,890.67 394.67,890.67              394.67,890.67 400.67,897.33 401.33,897.33              402.00,897.33 404.00,901.33 404.00,902.00              404.00,902.67 404.67,908.67 404.67,908.67              404.67,908.67 400.67,908.67 400.67,908.67              400.67,908.67 397.33,906.00 397.33,906.00              397.33,906.00 394.67,901.33 394.67,901.33              394.67,901.33 388.67,893.33 388.67,893.33              388.67,893.33 386.67,888.67 386.67,888.67              386.67,888.67 383.33,884.00 383.33,884.00              383.33,884.00 389.33,880.67 389.33,880.67 Z            M 370.00,888.00            C 370.00,888.00 375.33,890.67 375.33,890.67              375.33,890.67 378.00,895.33 378.00,895.33              378.00,895.33 380.67,899.33 380.67,899.33              380.67,899.33 383.33,904.67 383.33,904.67              383.33,904.67 386.00,910.00 386.00,910.00              386.00,910.00 388.00,914.67 388.00,914.67              388.00,914.67 382.67,916.67 382.67,916.67              382.67,916.67 378.00,912.67 378.00,912.67              378.00,912.67 375.33,908.67 375.33,908.67              375.33,908.67 372.67,902.67 372.67,902.67              372.67,902.67 370.00,897.33 370.00,897.33              370.00,897.33 370.00,888.00 370.00,888.00 Z            M 354.00,892.00            C 354.00,892.00 354.67,900.00 354.67,900.00              354.67,900.00 358.00,908.00 358.00,908.00              358.00,908.00 360.67,912.67 360.67,912.67              360.67,912.67 363.33,918.00 363.33,918.00              363.33,918.00 366.00,922.00 366.00,922.00              366.00,922.00 370.67,919.33 370.67,919.33              370.67,919.33 368.67,914.00 368.67,914.00              368.67,914.00 365.33,908.67 365.33,908.67              365.33,908.67 362.67,904.00 362.67,904.00              362.67,904.00 360.00,899.33 360.00,899.33              360.00,899.33 358.67,894.67 358.67,894.67              358.67,894.67 354.00,892.00 354.00,892.00 Z            M 338.67,897.33            C 338.67,897.33 338.67,904.00 338.67,904.00              338.67,904.00 339.33,909.33 339.33,909.33              339.33,909.33 342.00,916.67 342.00,916.67              342.00,916.67 344.00,923.33 344.00,923.33              344.00,923.33 346.67,926.67 346.67,926.67              346.67,926.67 352.00,924.00 352.00,924.00              352.00,924.00 350.00,917.33 350.00,917.33              350.00,917.33 347.33,909.33 347.33,909.33              347.33,909.33 344.00,902.67 344.00,902.67              344.00,902.67 344.00,897.33 344.00,897.33              344.00,897.33 338.67,897.33 338.67,897.33 Z            M 325.33,902.67            C 325.33,902.67 324.00,910.67 324.00,910.67              324.00,910.67 324.67,918.67 324.67,918.67              324.67,918.67 327.33,926.00 327.33,926.00              327.33,926.00 330.00,929.33 330.00,929.33              330.00,929.33 334.00,930.00 334.00,930.00              334.00,930.00 337.33,926.67 337.33,926.67              337.33,926.67 334.67,923.33 334.67,923.33              334.67,923.33 331.33,914.67 331.33,914.67              331.33,914.67 329.33,908.00 329.33,908.00              329.33,908.00 325.33,902.67 325.33,902.67 Z            M 311.33,907.33            C 311.33,907.33 308.67,912.67 308.67,912.67              308.67,912.67 307.33,918.67 307.33,918.67              307.33,918.67 308.67,924.67 308.67,924.67              308.67,924.67 310.00,928.67 310.00,928.67              310.00,928.67 314.67,927.33 314.67,927.33              314.67,927.33 315.33,920.67 315.33,920.67              315.33,920.67 316.00,914.00 316.00,914.00              316.00,914.00 311.33,907.33 311.33,907.33 Z            M 294.67,908.67            C 294.67,908.67 292.67,915.33 292.67,915.33              292.67,915.33 291.33,921.33 291.33,921.33              291.33,921.33 292.00,927.33 292.00,927.33              292.00,927.33 295.33,931.33 295.33,931.33              295.33,931.33 299.33,929.33 299.33,929.33              299.33,929.33 298.00,922.67 298.00,922.67              298.00,922.67 298.00,914.00 298.00,914.00              298.00,914.00 294.67,908.67 294.67,908.67 Z            M 278.00,907.33            C 278.00,907.33 282.00,913.33 282.00,913.33              282.00,913.33 282.00,919.33 282.00,919.33              282.00,919.33 280.67,926.67 280.67,926.67              280.67,926.67 276.00,928.00 276.00,928.00              276.00,928.00 272.00,924.67 272.00,924.67              272.00,924.67 272.67,918.67 272.67,918.67              272.67,918.67 274.00,911.33 274.00,911.33              274.00,911.33 278.00,907.33 278.00,907.33 Z            M 263.33,904.67            C 263.33,904.67 264.67,911.33 264.67,911.33              264.67,911.33 264.67,915.33 264.67,915.33              264.67,915.33 264.67,922.67 264.67,922.67              264.67,922.67 261.33,928.00 261.33,928.00              261.33,928.00 256.67,925.33 256.67,925.33              256.67,925.33 255.33,919.33 255.33,919.33              255.33,919.33 256.67,911.33 256.67,911.33              256.67,911.33 263.33,904.67 263.33,904.67 Z            M 246.00,902.00            C 246.00,902.00 248.00,907.33 248.00,907.33              248.00,907.33 247.33,913.33 247.33,913.33              247.33,913.33 246.00,920.67 246.00,920.67              246.00,920.67 242.67,924.00 242.67,924.00              242.67,924.00 238.67,919.33 238.67,919.33              238.67,919.33 239.33,912.67 239.33,912.67              239.33,912.67 240.67,906.67 240.67,906.67              240.67,906.67 246.00,902.00 246.00,902.00 Z            M 230.00,894.00            C 230.00,894.00 231.33,900.67 231.33,900.67              231.33,900.67 230.00,905.33 230.00,905.33              230.00,905.33 228.67,911.33 228.67,911.33              228.67,911.33 229.33,916.67 228.67,916.67              228.00,916.67 222.67,918.67 222.67,918.67              222.67,918.67 222.00,913.33 222.00,913.33              222.00,913.33 222.67,904.67 222.67,904.67              222.67,904.67 224.00,896.00 224.00,896.00              224.00,896.00 230.00,894.00 230.00,894.00 Z            M 211.33,885.33            C 211.33,885.33 214.67,890.67 214.67,890.67              214.67,890.67 215.33,898.67 215.33,898.67              215.33,898.67 214.00,904.00 214.00,904.00              214.00,904.00 213.33,909.33 213.33,909.33              213.33,909.33 210.67,913.33 210.67,913.33              210.67,913.33 206.00,914.67 206.00,914.67              206.00,914.67 204.00,910.00 204.00,910.00              204.00,910.00 204.67,903.33 204.67,903.33              204.67,903.33 208.00,897.33 208.00,897.33              208.00,897.33 208.00,893.33 208.00,893.33              208.00,893.33 211.33,885.33 211.33,885.33 Z            M 198.67,881.33            C 198.67,881.33 200.00,886.00 200.00,886.00              200.00,886.00 198.67,891.33 198.67,891.33              198.67,891.33 196.67,896.67 196.67,896.67              196.67,896.67 194.67,902.00 194.67,902.00              194.67,902.00 192.67,906.00 192.67,906.00              192.67,906.00 187.33,906.00 187.33,906.00              187.33,906.00 188.00,898.00 188.00,898.00              188.00,898.00 191.33,890.00 191.33,890.00              191.33,890.00 193.33,883.33 193.33,883.33              193.33,883.33 198.67,881.33 198.67,881.33 Z            M 180.67,874.67            C 180.67,874.67 184.67,876.67 184.67,876.67              184.67,876.67 185.33,881.33 185.33,881.33              185.33,881.33 182.67,885.33 182.67,885.33              182.67,885.33 180.00,891.33 180.00,891.33              180.00,891.33 177.33,897.33 177.33,897.33              177.33,897.33 172.67,898.67 172.67,898.67              172.67,898.67 169.33,895.33 169.33,895.33              169.33,895.33 172.00,890.67 172.00,890.67              172.00,890.67 174.67,884.00 174.67,884.00              174.67,884.00 177.33,877.33 177.33,877.33              177.33,877.33 180.67,874.67 180.67,874.67 Z            M 158.67,874.67            C 158.67,874.67 162.00,869.33 162.00,869.33              162.00,869.33 166.67,865.33 166.67,865.33              166.67,865.33 168.67,870.67 168.67,870.67              168.67,870.67 167.33,874.67 167.33,874.67              167.33,874.67 166.00,879.33 165.33,879.33              164.67,879.33 162.00,885.33 162.00,885.33              162.00,885.33 158.00,888.00 158.00,888.00              158.00,888.00 154.00,886.67 154.00,886.67              154.00,886.67 155.33,880.67 155.33,880.67M 152.67,854.67            C 152.67,854.67 156.67,856.67 156.67,856.67              156.67,856.67 154.67,861.33 154.67,861.33              154.67,861.33 152.67,865.33 152.67,865.33              152.67,865.33 148.67,870.67 148.67,870.67              148.67,870.67 144.67,875.33 144.67,875.33              144.67,875.33 139.33,876.67 139.33,876.67              139.33,876.67 140.67,871.33 140.67,871.33              140.67,871.33 144.00,866.00 144.00,866.00              144.00,866.00 146.67,860.00 146.67,860.00              146.67,860.00 152.67,854.67 152.67,854.67 Z            M 138.00,845.33            C 138.00,845.33 142.67,848.67 142.67,848.67              142.67,848.67 138.00,856.00 138.00,856.00              138.00,856.00 134.67,859.33 134.67,860.00              134.67,860.67 130.67,862.67 130.67,862.67              130.67,862.67 126.00,864.67 126.00,864.67              126.00,864.67 126.67,857.33 126.67,857.33              126.67,857.33 131.33,852.00 131.33,852.00              131.33,852.00 138.00,845.33 138.00,845.33 Z            M 126.67,830.00            C 126.67,830.00 130.67,832.67 130.67,832.67              130.67,832.67 130.00,837.33 130.00,837.33              130.00,837.33 126.00,841.33 126.00,841.33              126.00,841.33 122.00,846.00 122.00,846.00              122.00,846.00 117.33,850.67 117.33,850.67              117.33,850.67 112.00,851.33 112.00,851.33              112.00,851.33 111.33,846.00 111.33,846.00              111.33,846.00 116.00,842.00 116.00,842.00              116.00,842.00 120.67,837.33 120.67,837.33              120.67,837.33 126.67,830.00 126.67,830.00 Z            M 104.00,826.00            C 104.00,826.00 97.33,832.00 97.33,832.00              97.33,832.00 101.33,836.67 101.33,836.67              101.33,836.67 105.33,835.33 105.33,835.33              105.33,835.33 110.00,830.67 110.00,830.67              110.00,830.67 116.00,826.67 116.00,826.67              116.00,826.67 120.67,822.00 120.67,822.00              120.67,822.00 112.00,819.33 112.00,819.33              112.00,819.33 116.00,818.00 116.00,818.00M 102.67,804.67            C 102.67,804.67 109.33,804.67 109.33,804.67              109.33,804.67 106.00,810.67 106.00,810.67              106.00,810.67 100.67,814.67 100.67,814.67              100.67,814.67 95.33,819.33 95.33,819.33              95.33,819.33 91.33,821.33 91.33,821.33              91.33,821.33 86.67,817.33 86.67,817.33              86.67,817.33 91.33,812.67 91.33,812.67              91.33,812.67 96.00,807.33 96.00,807.33              96.00,807.33 102.67,804.67 102.67,804.67 Z            M 96.67,785.33            C 96.67,785.33 101.33,786.67 101.33,786.67              101.33,786.67 103.33,791.33 103.33,791.33              103.33,791.33 98.67,794.67 98.67,794.67              98.67,794.67 91.33,799.33 91.33,799.33              91.33,799.33 85.33,803.33 85.33,803.33              85.33,803.33 79.33,806.00 79.33,806.00              79.33,806.00 77.33,800.00 77.33,800.00              77.33,800.00 83.33,796.67 83.33,796.67              83.33,796.67 88.67,791.33 88.67,791.33              88.67,791.33 96.67,785.33 96.67,785.33 Z            M 75.33,777.33            C 75.33,777.33 70.67,782.00 70.67,782.00              70.67,782.00 70.67,786.00 70.67,786.00              70.67,786.00 76.00,786.00 76.00,786.00              76.00,786.00 82.67,782.00 82.67,782.00              82.67,782.00 90.67,776.67 90.67,776.67              90.67,776.67 96.67,774.00 96.67,774.00              96.67,774.00 91.33,769.33 91.33,769.33              91.33,769.33 84.67,770.67 84.67,770.67              84.67,770.67 75.33,777.33 75.33,777.33 Z            M 91.33,756.00            C 91.33,756.00 85.33,760.00 85.33,760.00              85.33,760.00 78.67,762.67 78.67,762.67              78.67,762.67 72.00,765.33 72.00,765.33              72.00,765.33 67.33,767.33 67.33,767.33              67.33,767.33 64.00,761.33 64.00,761.33              64.00,761.33 69.33,758.67 69.33,758.67              69.33,758.67 75.33,755.33 75.33,755.33              75.33,755.33 83.33,752.67 83.33,752.67              83.33,752.67 87.33,750.67 87.33,750.67              87.33,750.67 91.33,756.00 91.33,756.00 Z            M 81.33,735.33            C 80.67,735.33 82.00,741.33 82.00,741.33              82.00,741.33 75.33,744.67 75.33,744.67              75.33,744.67 66.67,746.00 66.67,746.00              66.67,746.00 61.33,746.67 61.33,746.67              61.33,746.67 59.33,742.67 59.33,742.67              59.33,742.67 63.33,740.00 63.33,740.00              63.33,740.00 68.67,738.67 68.67,738.67              68.67,738.67 74.67,737.33 74.67,737.33M 80.67,724.00            C 80.67,724.00 72.67,727.33 72.67,727.33              72.67,727.33 65.33,728.00 65.33,728.00              65.33,728.00 59.33,728.67 59.33,728.67              59.33,728.67 56.00,724.00 56.00,724.00              56.00,724.00 59.33,720.67 60.00,720.67              60.67,720.67 69.33,718.67 69.33,718.67              69.33,718.67 78.67,716.67 78.67,716.67              78.67,716.67 80.67,724.00 80.67,724.00 Z            M 78.67,704.67            C 78.67,704.67 71.33,706.00 71.33,706.00              71.33,706.00 65.33,706.67 65.33,706.67              65.33,706.67 58.67,708.00 58.67,708.00              58.67,708.00 56.67,702.00 56.67,702.00              56.67,702.00 62.67,700.00 62.67,700.00              62.67,700.00 69.33,700.00 69.33,700.00              69.33,700.00 74.00,700.00 74.00,700.00              74.00,700.00 78.67,700.00 78.67,700.00              78.67,700.00 78.67,704.67 78.67,704.67 Z            M 56.67,682.67            C 56.67,682.67 62.00,678.67 62.00,678.67              62.00,678.67 68.00,679.33 68.00,679.33              68.00,679.33 76.67,679.33 76.67,679.33              76.67,679.33 82.67,681.33 82.67,681.33              82.67,681.33 80.67,686.00 80.67,686.00              80.67,686.00 74.00,686.67 74.00,686.67              74.00,686.67 66.00,688.00 66.00,688.00              66.00,688.00 56.67,682.67 56.67,682.67 Z            M 57.33,664.00            C 57.33,664.00 58.67,668.67 58.67,668.67              58.67,668.67 66.67,669.33 66.67,669.33              66.67,669.33 72.67,668.67 72.67,668.67              72.67,668.67 79.33,668.00 79.33,668.00              79.33,668.00 77.33,662.67 77.33,662.67              77.33,662.67 69.33,662.00 69.33,662.00              69.33,662.00 63.33,662.67 63.33,662.67              63.33,662.67 57.33,664.00 57.33,664.00 Z            M 64.00,640.67            C 64.00,640.67 61.33,645.33 61.33,645.33              61.33,645.33 64.00,649.33 64.00,649.33              64.00,649.33 68.67,648.67 68.67,648.67              68.67,648.67 73.33,649.33 73.33,649.33              73.33,649.33 78.00,649.33 78.00,649.33              78.00,649.33 82.67,649.33 82.67,649.33              82.67,649.33 86.67,650.00 86.67,650.00              86.67,650.00 89.33,644.00 89.33,644.00              89.33,644.00 83.33,640.67 83.33,640.67              83.33,640.67 77.33,641.33 77.33,641.33              77.33,641.33 72.67,641.33 72.67,641.33              72.67,641.33 64.00,640.67 64.00,640.67 Z            M 66.67,629.33            C 66.67,629.33 72.67,630.00 72.67,630.00              72.67,630.00 78.67,630.00 78.67,630.00              78.67,630.00 83.33,630.67 83.33,630.67              83.33,630.67 88.00,631.33 88.00,631.33              88.00,631.33 92.67,626.00 92.67,626.00              92.67,626.00 86.67,624.00 86.67,624.00              86.67,624.00 80.00,624.00 80.00,624.00              80.00,624.00 73.33,624.00 73.33,624.00              73.33,624.00 67.33,623.33 67.33,623.33              67.33,623.33 66.67,629.33 66.67,629.33 Z            M 72.67,609.33            C 72.67,609.33 78.67,608.67 78.67,608.67              78.67,608.67 84.00,610.00 84.00,610.00              84.00,610.00 89.33,611.33 89.33,611.33              89.33,611.33 94.00,613.33 94.00,613.33              94.00,613.33 98.67,608.67 98.67,608.67              98.67,608.67 92.67,606.67 92.67,606.67              92.67,606.67 86.67,604.00 86.67,604.00              86.67,604.00 81.33,603.33 81.33,603.33              81.33,603.33 75.33,603.33 75.33,603.33              75.33,603.33 72.67,609.33 72.67,609.33 Z            M 79.33,592.00            C 79.33,592.00 88.00,592.00 88.00,592.00              88.00,592.00 96.67,594.00 96.67,594.00              96.67,594.00 102.00,597.33 102.00,597.33              102.00,597.33 107.33,594.67 107.33,594.67              107.33,594.67 104.00,590.00 104.00,590.00              104.00,590.00 98.00,587.33 98.00,587.33              98.00,587.33 90.67,584.00 90.67,584.00              90.67,584.00 82.00,585.33 82.00,585.33              82.00,585.33 79.33,592.00 79.33,592.00 Z            M 89.33,573.33            C 89.33,573.33 96.00,573.33 96.00,573.33              96.00,573.33 104.00,574.67 104.00,574.67              104.00,574.67 110.00,576.67 110.00,577.33              110.00,578.00 114.00,580.00 114.00,580.00              114.00,580.00 116.67,575.33 116.67,575.33              116.67,575.33 111.33,570.67 111.33,570.67              111.33,570.67 104.67,567.33 104.67,567.33              104.67,567.33 100.00,564.67 100.00,564.67              100.00,564.67 95.33,564.67 95.33,564.67              95.33,564.67 90.00,567.33 90.00,567.33              90.00,567.33 89.33,573.33 89.33,573.33 Z            M 99.33,555.33            C 99.33,555.33 103.33,555.33 103.33,555.33              103.33,555.33 108.00,555.33 108.00,555.33              108.00,555.33 112.67,556.67 112.67,556.67              112.67,556.67 118.00,558.67 118.00,558.67              118.00,558.67 124.67,561.33 124.67,561.33              124.67,561.33 124.67,555.33 124.67,555.33              124.67,555.33 120.00,551.33 120.00,551.33              120.00,551.33 114.67,550.67 114.67,550.67              114.67,550.67 109.33,548.00 109.33,548.00              109.33,548.00 102.67,546.67 102.67,546.67              102.67,546.67 98.67,548.67 98.67,548.67              98.67,548.67 99.33,555.33 99.33,555.33 Z            M 108.00,536.67            C 108.00,536.67 113.33,536.67 113.33,536.67              113.33,536.67 119.33,539.33 119.33,539.33              119.33,539.33 125.33,541.33 125.33,541.33              125.33,541.33 130.00,543.33 130.00,543.33              130.00,543.33 134.00,543.33 134.00,543.33              134.00,543.33 132.67,538.00 132.67,538.00              132.67,538.00 127.33,535.33 127.33,535.33              127.33,535.33 120.67,532.00 120.67,532.00              120.67,532.00 114.67,530.00 114.67,530.00              114.67,530.00 108.67,530.67 108.67,530.67              108.67,530.67 108.00,536.67 108.00,536.67 Z            M 118.00,518.67            C 118.00,518.67 123.33,520.00 123.33,520.00              123.33,520.00 130.00,521.33 130.00,521.33              130.00,521.33 136.00,524.00 136.00,524.00              136.00,524.00 145.33,527.33 145.33,527.33              145.33,527.33 148.67,521.33 148.67,521.33              148.67,521.33 143.33,518.67 143.33,518.67              143.33,518.67 138.00,516.67 138.00,516.67              138.00,516.67 132.00,514.67 132.00,514.67              132.00,514.67 126.00,512.67 126.00,512.67              126.00,512.67 119.33,513.33 119.33,513.33              119.33,513.33 118.00,518.67 118.00,518.67 Z            M 128.67,502.00            C 128.67,502.00 133.33,504.00 133.33,504.67              133.33,505.33 138.67,505.33 138.67,505.33              138.67,505.33 143.33,507.33 143.33,507.33              143.33,507.33 148.00,508.00 148.00,508.00              148.00,508.00 151.33,510.67 151.33,510.67              151.33,510.67 156.00,511.33 156.00,511.33              156.00,511.33 159.33,506.67 159.33,506.67              159.33,506.67 154.00,502.67 154.00,502.67              154.00,502.67 148.00,498.67 148.00,498.67              148.00,498.67 141.33,497.33 141.33,497.33              141.33,497.33 133.33,495.33 133.33,495.33              133.33,495.33 128.67,502.00 128.67,502.00 Z            M 140.67,487.33            C 140.67,487.33 148.00,487.33 148.00,487.33              148.00,487.33 156.67,490.67 156.67,490.67              156.67,490.67 161.33,494.67 161.33,494.67              161.33,494.67 168.67,498.00 168.67,498.00              168.67,498.00 172.00,492.00 172.00,492.00              172.00,492.00 169.33,487.33 169.33,487.33              169.33,487.33 164.67,485.33 164.67,485.33              164.67,485.33 159.33,483.33 159.33,483.33              159.33,483.33 152.00,481.33 152.00,481.33              152.00,481.33 146.00,480.00 146.00,480.00              146.00,480.00 140.67,487.33 140.67,487.33 Z            M 151.33,471.33            C 151.33,471.33 157.33,471.33 157.33,471.33              157.33,471.33 164.00,474.67 164.00,474.67              164.00,474.67 169.33,477.33 169.33,477.33              169.33,477.33 174.00,482.00 174.00,482.00              174.00,482.00 180.67,480.00 180.67,480.00              180.67,480.00 178.00,476.00 178.00,475.33              178.00,474.67 173.33,469.33 173.33,469.33              173.33,469.33 166.67,467.33 166.67,467.33              166.67,467.33 161.33,464.67 161.33,464.67              161.33,464.67 156.00,464.00 156.00,464.00              156.00,464.00 151.33,471.33 151.33,471.33 Z            M 162.67,456.00            C 162.67,456.00 168.67,456.00 168.67,456.00              168.67,456.00 177.33,459.33 177.33,459.33              177.33,459.33 185.33,463.33 185.33,463.33              185.33,463.33 190.67,465.33 190.67,465.33              190.67,465.33 187.33,459.33 187.33,459.33              187.33,459.33 183.33,454.00 183.33,454.00              183.33,454.00 176.67,450.67 176.67,450.67              176.67,450.67 169.33,448.00 169.33,448.00              169.33,448.00 163.33,448.67 163.33,448.67              163.33,448.67 162.67,456.00 162.67,456.00 Z            M 173.33,439.33            C 173.33,439.33 179.33,439.33 179.33,439.33              179.33,439.33 186.67,441.33 186.67,441.33              186.67,441.33 192.67,445.33 192.67,445.33              192.67,445.33 199.33,448.67 199.33,448.67              199.33,448.67 197.33,438.00 197.33,438.00              197.33,438.00 190.00,434.67 190.00,434.67              190.00,434.67 184.00,432.00 184.00,432.00              184.00,432.00 178.00,431.33 178.00,431.33              178.00,431.33 173.33,439.33 173.33,439.33 Z            M 184.00,424.00            C 184.00,424.00 190.67,424.00 190.67,424.00              190.67,424.00 198.00,426.00 198.00,426.00              198.00,426.00 202.00,429.33 202.00,429.33              202.00,429.33 206.67,432.00 206.67,432.00              206.67,432.00 206.67,424.67 206.67,424.67              206.67,424.67 203.33,420.67 203.33,420.67              203.33,420.67 196.67,416.00 196.67,416.00              196.67,416.00 190.00,415.33 190.00,415.33              190.00,415.33 184.00,417.33 184.00,417.33              184.00,417.33 184.00,424.00 184.00,424.00 Z            M 194.67,408.67            C 194.67,408.67 199.33,406.67 199.33,406.67              199.33,406.67 206.00,409.33 206.00,409.33              206.00,409.33 214.00,415.33 214.00,415.33              214.00,415.33 219.33,420.00 219.33,420.00              219.33,420.00 218.00,407.33 218.00,407.33              218.00,407.33 212.00,403.33 212.00,403.33              212.00,403.33 204.67,400.00 204.67,400.00              204.67,400.00 198.67,400.00 198.67,400.00              198.67,400.00 193.33,402.00 193.33,402.00              193.33,402.00 194.67,408.67 194.67,408.67 Z            M 206.00,393.33            C 206.00,393.33 211.33,393.33 211.33,393.33              211.33,393.33 219.33,395.33 219.33,395.33              219.33,395.33 224.00,398.67 224.00,398.67              224.00,398.67 230.67,400.67 230.67,400.67              230.67,400.67 237.33,404.00 237.33,404.00              237.33,404.00 242.00,404.67 242.00,404.67              242.00,404.67 238.00,394.00 238.00,394.00              238.00,394.00 232.00,392.00 232.00,392.00              232.00,392.00 226.67,389.33 226.67,389.33              226.67,389.33 220.00,386.00 220.00,386.00              220.00,386.00 213.33,384.00 213.33,384.00              213.33,384.00 207.33,384.67 207.33,384.67              207.33,384.67 206.00,393.33 206.00,393.33 Z            M 218.00,379.33            C 218.00,379.33 221.33,376.00 221.33,376.00              221.33,376.00 226.67,376.00 226.67,376.00              226.67,376.00 232.00,380.00 232.00,380.00              232.00,380.00 237.33,382.00 237.33,382.00              237.33,382.00 241.33,384.00 241.33,384.00              241.33,384.00 246.00,385.33 246.00,385.33              246.00,385.33 251.33,389.33 251.33,389.33              251.33,389.33 248.00,377.33 248.00,377.33              248.00,377.33 241.33,375.33 241.33,375.33              241.33,375.33 236.00,371.33 236.00,371.33              236.00,371.33 230.00,369.33 230.00,369.33              230.00,369.33 223.33,368.00 223.33,368.00              223.33,368.00 217.33,370.67 217.33,370.67              217.33,370.67 218.00,379.33 218.00,379.33 Z            M 226.67,362.67            C 226.67,362.67 226.67,355.33 226.67,355.33              226.67,355.33 231.33,352.67 231.33,352.67              231.33,352.67 237.33,352.67 237.33,352.67              237.33,352.67 245.33,354.00 245.33,354.00              245.33,354.00 251.33,358.00 251.33,358.00              251.33,358.00 257.33,361.33 257.33,361.33              257.33,361.33 263.33,372.67 263.33,372.67              263.33,372.67 252.67,367.33 252.67,367.33              252.67,367.33 244.67,364.00 244.67,364.00              244.67,364.00 236.00,362.00 236.00,362.00              236.00,362.00 226.67,362.67 226.67,362.67 Z            M 240.67,344.67            C 240.67,344.67 245.33,344.00 245.33,344.00              245.33,344.00 253.33,344.00 253.33,344.00              253.33,344.00 259.33,348.00 259.33,348.00              259.33,348.00 266.00,351.33 266.00,351.33              266.00,351.33 270.00,354.67 270.00,354.67              270.00,354.67 267.33,342.00 267.33,342.00              267.33,342.00 258.67,338.00 258.67,338.00              258.67,338.00 252.67,336.00 252.67,336.00              252.67,336.00 246.67,336.00 246.67,336.00              246.67,336.00 241.33,336.00 241.33,336.00              241.33,336.00 240.67,344.67 240.67,344.67 Z            M 248.00,328.67            C 248.00,328.67 250.67,321.33 250.67,321.33              250.67,321.33 255.33,318.67 255.33,318.67              255.33,318.67 262.00,318.67 262.00,318.67              262.00,318.67 268.67,321.33 268.67,321.33              268.67,321.33 276.00,323.33 276.00,323.33              276.00,323.33 281.33,326.67 281.33,326.67              281.33,326.67 280.67,335.33 280.67,335.33              280.67,335.33 275.33,332.00 275.33,332.00              275.33,332.00 268.67,330.00 268.67,330.00              268.67,330.00 262.00,328.67 262.00,328.67              262.00,328.67 256.67,328.00 256.67,328.00              256.67,328.00 248.00,328.67 248.00,328.67 Z            M 260.67,312.67            C 260.67,312.67 266.67,308.00 266.67,308.00              266.67,308.00 274.00,308.67 274.00,308.67              274.00,308.67 280.00,311.33 280.00,311.33              280.00,311.33 284.67,314.00 284.67,314.00              284.67,314.00 288.00,306.67 288.00,306.67              288.00,306.67 280.67,305.33 280.67,305.33              280.67,305.33 273.33,302.67 273.33,302.67              273.33,302.67 264.67,301.33 264.67,301.33              264.67,301.33 261.33,303.33 260.67,304.00              260.00,304.67 260.67,312.67 260.67,312.67 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer1_1",
      "fill": _vm.layer1,
      "stroke": "none",
      "d": "M 314.67,306.67            C 314.67,306.67 322.67,307.33 322.67,307.33              322.67,307.33 318.67,405.33 319.33,405.33              320.00,405.33 328.00,351.33 328.00,351.33              328.00,351.33 332.00,336.00 332.67,336.00              333.33,336.00 338.00,328.00 338.00,328.00              338.00,328.00 343.33,322.00 343.33,322.00              343.33,322.00 347.33,324.67 347.33,324.67              347.33,324.67 347.33,330.00 347.33,330.00              347.33,330.00 340.00,338.00 340.00,338.00              340.00,338.00 335.33,346.67 335.33,346.67              335.33,346.67 318.67,472.67 318.67,472.67              318.67,472.67 339.33,363.33 339.33,363.33              339.33,363.33 348.67,346.67 348.67,346.67              348.67,346.67 354.00,338.67 354.00,338.67              354.00,338.67 358.00,342.67 358.00,342.67              358.00,342.67 358.00,350.00 358.00,350.00              358.00,350.00 351.33,356.67 351.33,356.67              351.33,356.67 348.00,361.33 348.00,361.33              348.00,361.33 346.00,366.00 346.00,366.00              346.00,366.00 333.33,428.67 333.33,428.67              333.33,428.67 350.67,376.67 350.67,376.67              350.67,376.67 354.00,369.33 354.00,369.33              354.00,369.33 357.33,363.33 357.33,363.33              357.33,363.33 361.33,358.67 361.33,358.67              361.33,358.67 364.67,356.67 365.33,356.67              366.00,356.67 368.67,359.33 368.67,360.00              368.67,360.67 370.67,366.00 370.00,366.00              369.33,366.00 364.00,371.33 364.00,371.33              364.00,371.33 358.67,377.33 358.67,377.33              358.67,377.33 355.33,383.33 355.33,383.33              355.33,383.33 326.67,470.67 326.67,470.67              326.67,470.67 371.33,376.00 371.33,376.00              371.33,376.00 376.00,372.00 376.00,372.00              376.00,372.00 379.33,380.00 379.33,380.00              379.33,380.00 376.67,385.33 376.00,385.33              375.33,385.33 371.33,390.00 371.33,390.00              371.33,390.00 368.67,394.00 368.67,394.67              368.67,395.33 364.00,401.33 364.00,401.33              364.00,401.33 329.33,502.00 329.33,502.00              329.33,502.00 370.00,409.33 370.00,409.33              370.00,409.33 380.00,398.00 380.00,398.00              380.00,398.00 385.33,390.00 385.33,390.00              385.33,390.00 388.00,394.00 388.00,394.00              388.00,394.00 388.00,399.33 388.00,399.33              388.00,399.33 383.33,406.00 383.33,406.00              383.33,406.00 378.00,412.00 378.00,412.00              378.00,412.00 374.00,416.00 374.00,416.00              374.00,416.00 349.33,472.00 349.33,472.00              349.33,472.00 390.00,410.67 390.00,410.67              390.00,410.67 396.67,405.33 396.67,405.33              396.67,405.33 398.00,413.33 398.00,413.33              398.00,413.33 394.00,417.33 394.00,417.33              394.00,417.33 388.67,424.67 388.67,424.67              388.67,424.67 336.67,504.67 336.67,504.67              336.67,504.67 328.67,521.33 328.67,521.33              328.67,521.33 321.33,536.00 321.33,536.00              321.33,536.00 371.33,464.67 371.33,464.67              371.33,464.67 380.00,453.33 380.00,453.33              380.00,453.33 388.00,441.33 388.00,441.33              388.00,441.33 393.33,434.67 393.33,434.67              393.33,434.67 398.00,429.33 398.00,429.33              398.00,429.33 405.33,423.33 405.33,423.33              405.33,423.33 410.67,424.00 410.67,424.00              410.67,424.00 406.67,430.00 406.67,430.00              406.67,430.00 397.33,437.33 397.33,437.33              397.33,437.33 391.33,446.00 391.33,446.00              391.33,446.00 386.67,452.67 386.67,452.67              386.67,452.67 314.67,561.33 314.67,561.33              314.67,561.33 386.00,466.00 386.00,466.00              386.00,466.00 382.00,479.33 382.00,479.33              382.00,479.33 378.67,488.00 378.67,488.00              378.67,488.00 374.00,496.00 374.00,496.00              374.00,496.00 370.00,505.33 370.00,505.33              370.00,505.33 322.67,562.00 322.67,562.00              322.67,562.00 374.00,512.67 374.00,512.67              374.00,512.67 368.67,533.33 368.67,533.33              368.67,533.33 318.00,575.33 318.00,575.33              318.00,575.33 366.00,542.00 366.00,542.00              366.00,542.00 348.00,560.67 348.00,560.67              348.00,560.67 365.33,551.33 366.00,551.33              366.67,551.33 362.00,562.67 362.00,562.67              362.00,562.67 352.61,567.50 342.67,574.67              332.28,582.16 321.33,592.00 321.33,592.00              321.33,592.00 359.33,570.00 359.33,570.00              359.33,570.00 358.67,575.33 358.67,575.33              358.67,575.33 322.00,603.33 322.00,603.33              322.00,603.33 354.67,588.67 354.67,588.67              354.67,588.67 353.33,596.67 353.33,596.67              353.33,596.67 345.33,603.33 345.33,603.33              345.33,603.33 352.67,603.33 352.67,603.33              352.67,603.33 351.33,608.67 351.33,608.67              351.33,608.67 319.33,621.33 319.33,621.33              319.33,621.33 348.67,619.33 348.67,619.33              348.67,619.33 346.67,629.33 346.67,629.33              346.67,629.33 330.67,632.67 330.67,632.67              330.67,632.67 344.67,636.67 344.67,636.67              344.67,636.67 340.00,648.67 340.00,648.67              340.00,648.67 335.33,658.67 335.33,658.67              335.33,658.67 329.33,670.67 329.33,670.67              329.33,670.67 323.33,680.67 323.33,680.67              323.33,680.67 315.33,690.00 315.33,690.00              315.33,690.00 308.00,696.67 308.00,696.67              308.00,696.67 303.33,658.00 303.33,658.00              303.33,658.00 298.00,699.33 298.00,699.33              298.00,699.33 292.00,696.67 292.00,696.67              292.00,696.67 297.33,652.00 297.33,652.00              297.33,652.00 285.33,692.00 285.33,692.00              285.33,692.00 280.67,687.33 280.67,687.33              280.67,687.33 286.00,646.00 286.00,646.00              286.00,646.00 274.00,678.67 274.00,678.67              274.00,678.67 268.67,669.33 268.67,669.33              268.67,669.33 264.67,657.33 264.67,657.33              264.67,657.33 262.00,644.00 262.00,644.00              262.00,644.00 262.00,630.00 262.00,630.00              262.00,630.00 260.67,615.33 260.67,615.33              260.67,615.33 258.00,604.00 258.00,604.00              258.00,604.00 264.67,609.33 264.67,609.33              264.67,609.33 266.67,605.33 267.33,605.33              268.00,605.33 256.00,592.67 256.00,592.67              256.00,592.67 269.33,599.33 269.33,599.33              269.33,599.33 272.00,596.00 272.00,596.00              272.00,596.00 256.67,585.33 256.67,585.33              256.67,585.33 254.67,576.67 254.67,576.67              254.67,576.67 274.67,591.33 274.67,591.33              274.67,591.33 276.67,584.67 276.67,584.67              276.67,584.67 250.00,555.33 250.00,555.33              250.00,555.33 248.00,540.00 248.00,540.00              248.00,540.00 280.00,576.00 280.00,576.00              280.00,576.00 282.67,570.67 282.67,570.67              282.67,570.67 246.00,522.00 246.00,522.00              246.00,522.00 244.00,508.00 244.00,508.00              244.00,508.00 282.00,558.00 282.00,558.00              282.00,558.00 242.67,497.33 242.67,497.33              242.67,497.33 239.33,484.00 239.33,484.00              239.33,484.00 263.33,514.67 263.33,514.67              263.33,514.67 238.00,467.33 238.00,467.33              238.00,467.33 232.00,435.33 232.00,435.33              232.00,435.33 285.33,550.00 285.33,550.00              285.33,550.00 287.33,539.33 287.33,539.33              287.33,539.33 284.00,530.67 284.00,530.67              284.00,530.67 274.67,508.00 274.67,508.00              274.67,508.00 258.00,468.67 258.00,468.67              258.00,468.67 248.67,448.00 248.67,448.00              248.67,448.00 242.00,432.67 242.00,432.67              242.00,432.67 229.33,414.67 229.33,414.67              229.33,414.67 223.33,408.67 223.33,408.67              223.33,408.67 218.00,404.00 218.00,404.00              218.00,404.00 223.33,402.00 223.33,402.00              223.33,402.00 232.00,408.67 232.00,408.67              232.00,408.67 240.00,417.33 240.00,417.33              240.00,417.33 249.33,436.67 249.33,436.67              249.33,436.67 258.00,458.67 258.00,458.67              258.00,458.67 266.00,474.67 266.00,474.67              266.00,474.67 270.67,483.33 270.67,483.33              270.67,483.33 243.33,402.00 243.33,402.00              243.33,402.00 238.00,394.67 238.00,394.67              238.00,394.67 229.33,390.00 229.33,390.00              229.33,390.00 233.33,384.67 233.33,384.67              233.33,384.67 240.67,388.67 240.67,388.67              240.67,388.67 248.67,397.33 249.33,397.33              250.00,397.33 256.00,403.33 256.00,403.33              256.00,403.33 294.67,528.67 294.67,528.67              294.67,528.67 256.67,394.67 256.67,394.67              256.67,394.67 252.00,383.33 252.00,383.33              252.00,383.33 245.33,376.00 245.33,376.00              245.33,376.00 239.33,371.33 239.33,371.33              239.33,371.33 253.33,376.67 253.33,376.67              253.33,376.67 259.33,381.33 259.33,381.33              259.33,381.33 263.33,388.67 263.33,388.67              263.33,388.67 293.33,499.33 293.33,499.33              293.33,499.33 262.00,370.67 262.00,370.67              262.00,370.67 258.00,361.33 258.00,361.33              258.00,361.33 252.67,354.67 252.67,354.67              252.67,354.67 262.00,357.33 262.00,357.33              262.00,357.33 267.33,363.33 267.33,363.33              267.33,363.33 270.67,369.33 270.67,369.33              270.67,369.33 286.67,443.33 286.67,443.33              286.67,443.33 268.00,348.00 268.00,348.00              268.00,348.00 266.00,342.00 266.00,342.00              266.00,342.00 271.33,340.67 271.33,340.67              271.33,340.67 276.00,345.33 276.67,346.00              277.33,346.67 292.00,432.00 292.00,432.00              292.00,432.00 280.00,329.33 280.00,329.33              280.00,329.33 272.00,323.33 272.00,323.33              272.00,323.33 284.00,322.00 284.00,322.00              284.00,322.00 286.67,331.33 286.67,331.33              286.67,331.33 290.00,344.67 290.00,344.67              290.00,344.67 291.33,353.33 291.33,353.33              291.33,353.33 287.33,312.67 287.33,312.67              287.33,312.67 291.33,306.00 291.33,306.00              291.33,306.00 298.00,348.00 298.00,348.00              298.00,348.00 298.67,305.33 298.67,305.33              298.67,305.33 303.33,306.00 303.33,306.00              303.33,306.00 302.67,369.33 302.67,369.33              302.67,369.33 314.67,306.67 314.67,306.67 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer1_2",
      "fill": _vm.layer1,
      "stroke": "none",
      "d": "M 395.33,503.33            C 395.67,503.33 434.00,473.00 434.00,473.00              434.00,473.00 440.67,469.67 440.67,469.67              440.67,469.67 409.33,503.67 409.33,503.67              409.33,503.67 397.67,515.33 397.67,515.33              397.67,515.33 394.33,522.67 394.33,522.67              394.33,522.67 392.67,527.67 392.67,527.67              392.67,527.67 435.33,496.00 435.33,496.00              435.33,496.00 438.00,501.00 438.00,501.00              438.00,501.00 403.00,530.00 403.00,530.00              403.00,530.00 399.67,539.33 399.67,539.33              399.67,539.33 402.67,543.00 402.67,543.00              402.67,543.00 432.33,516.33 432.67,516.33              433.00,516.33 447.00,509.67 447.00,509.67              447.00,509.67 459.00,505.00 459.00,505.00              459.00,505.00 454.67,510.67 454.67,510.67              454.67,510.67 434.00,521.33 434.00,521.33              434.00,521.33 416.67,539.67 416.67,539.67              416.67,539.67 405.33,553.67 405.33,553.67              405.33,553.67 445.33,532.33 445.33,532.33              445.33,532.33 457.67,525.67 457.67,525.67              457.67,525.67 466.00,523.33 466.00,523.33              466.00,523.33 452.33,533.00 452.33,533.00              452.33,533.00 439.67,542.33 439.67,542.33              439.67,542.33 427.33,550.00 427.33,550.00              427.33,550.00 411.00,560.00 411.00,560.00              411.00,560.00 401.00,565.00 401.00,565.00              401.00,565.00 392.33,571.00 392.33,571.00              392.33,571.00 404.33,568.67 404.33,568.67              404.33,568.67 458.67,546.00 458.67,546.00              458.67,546.00 467.67,542.33 467.67,542.33              467.67,542.33 465.67,546.33 465.67,546.33              465.67,546.33 403.00,581.67 390.67,581.33              378.33,581.00 377.00,587.00 377.00,587.00              377.00,587.00 391.33,588.33 391.33,588.33              391.33,588.33 434.67,573.67 434.67,573.67              434.67,573.67 466.00,561.67 466.00,561.67              466.00,561.67 472.00,561.67 472.00,561.67              472.00,561.67 472.33,564.33 472.33,564.33              472.33,564.33 403.33,597.67 381.33,596.67              359.33,595.67 374.67,604.00 374.67,604.00              374.67,604.00 398.33,601.33 398.33,601.33              398.33,601.33 469.33,575.67 469.33,575.67              469.33,575.67 474.33,578.33 474.33,578.33              474.33,578.33 474.00,582.00 474.00,582.00              474.00,582.00 366.00,615.00 366.00,615.00              366.00,615.00 362.00,634.33 362.00,634.33              362.00,634.33 399.67,635.00 400.00,635.00              400.33,635.00 396.00,641.67 396.00,641.67              396.00,641.67 364.67,642.00 364.67,642.00              364.67,642.00 362.67,647.33 362.67,647.33              362.67,647.33 386.33,650.00 386.33,650.00              386.33,650.00 385.00,656.67 385.00,656.67              385.00,656.67 359.33,653.33 359.33,653.33              359.33,653.33 350.67,650.67 350.67,650.67              350.67,650.67 395.00,503.33 395.33,503.33 Z            M 205.67,440.33            C 205.67,440.33 216.33,455.00 216.33,455.00              216.33,455.00 217.00,470.33 217.00,470.33              217.00,470.33 201.67,439.67 201.67,439.67              201.67,439.67 197.00,438.67 197.00,438.67              197.86,447.31 199.72,444.56 199.67,444.00              199.67,444.00 209.33,466.33 209.33,466.33              209.33,466.33 193.33,448.67 193.33,448.67              193.33,448.67 190.00,451.67 190.00,451.67              190.00,451.67 188.33,459.00 198.33,463.67              208.33,468.33 214.33,478.00 214.33,478.00              214.33,478.00 217.67,495.67 217.67,495.67              217.67,495.67 202.33,474.00 202.33,474.00              202.33,474.00 205.33,498.67 205.33,498.67              205.33,498.67 221.00,513.00 221.00,512.67              221.00,512.33 222.33,520.33 222.33,520.33              222.33,520.33 210.67,509.67 210.67,509.67              210.67,509.67 213.33,521.33 213.33,521.33              213.33,521.33 224.00,532.33 224.00,532.33              224.00,532.33 229.33,550.33 229.33,550.33              229.33,550.33 218.33,541.00 218.33,541.00              218.33,541.00 219.67,550.33 219.67,550.33              219.67,550.33 229.00,557.67 229.00,557.67              229.00,557.67 230.33,561.67 230.33,561.67              230.33,561.67 220.33,555.67 220.33,555.67              220.33,555.67 225.33,567.67 225.33,567.67              225.33,567.67 232.67,574.00 232.67,574.00              232.67,574.00 245.00,617.00 245.00,617.00              245.00,617.00 240.00,573.67 240.00,573.67              240.00,573.67 249.67,579.67 249.67,579.33              249.67,579.00 247.67,566.00 247.67,566.00              247.67,566.00 238.33,561.67 238.33,561.67              238.33,561.67 235.00,545.67 235.00,545.67              235.00,545.67 244.67,553.00 244.67,553.00              244.67,553.00 243.33,541.33 243.33,541.33              243.33,541.33 240.67,527.00 240.67,527.00              240.67,527.00 231.67,519.33 231.67,519.33              231.67,519.33 229.00,501.00 229.00,501.00              229.00,501.00 239.00,510.67 239.00,510.33              239.00,510.00 235.00,496.33 235.00,496.33              235.00,496.33 228.00,485.00 228.00,485.00              228.00,485.00 226.00,470.67 226.00,470.67              226.00,470.67 233.67,481.67 233.67,481.67              233.67,481.67 231.00,463.33 231.00,463.00              231.00,462.67 220.00,441.00 220.00,441.00              220.00,441.00 215.33,443.33 215.00,443.33              214.67,443.33 209.67,438.00 209.67,438.00              209.67,438.00 200.33,431.33 200.33,431.33              200.33,431.33 195.67,436.33 196.00,436.33"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer2",
      "fill": _vm.layer2,
      "stroke": "none",
      "d": "M 404.00,430.67            C 404.00,430.67 410.67,421.33 410.67,421.33              410.67,421.33 413.33,425.33 413.33,425.33              413.33,425.33 410.67,430.67 410.67,430.67              410.67,430.67 401.33,438.00 401.33,438.00              401.33,438.00 398.00,442.67 398.00,442.67              398.00,442.67 365.33,580.00 365.33,580.00              365.33,580.00 403.33,456.00 403.33,456.00              403.33,456.00 410.67,448.67 410.67,448.67              410.67,448.67 418.00,440.67 418.00,440.67              418.00,440.67 423.33,442.00 423.33,442.00              423.33,442.00 421.33,447.33 421.33,447.33              421.33,447.33 413.33,452.67 413.33,452.67              413.33,452.67 408.67,457.33 408.67,457.33              408.67,457.33 373.33,580.00 373.33,580.00              373.33,580.00 412.67,471.33 412.67,471.33              412.67,471.33 424.67,461.33 424.67,461.33              424.67,461.33 431.33,458.00 431.33,458.00              431.33,458.00 432.00,462.67 432.00,462.67              432.00,462.67 426.00,467.33 426.00,467.33              426.00,467.33 418.67,473.33 418.67,473.33              418.67,473.33 386.67,566.00 386.67,566.00              386.67,566.00 422.00,486.67 422.00,486.67              422.00,486.67 430.00,478.67 430.00,478.67              430.00,478.67 435.33,473.33 435.33,473.33              435.33,473.33 440.67,472.00 440.67,472.00              440.67,472.00 443.33,477.33 443.33,477.33              443.33,477.33 437.33,482.67 437.33,482.67              437.33,482.67 428.67,489.33 428.67,489.33              428.67,489.33 425.33,494.67 425.33,494.67              425.33,494.67 404.67,543.33 404.67,543.33              404.67,543.33 427.33,508.67 427.33,508.67              427.33,508.67 431.33,502.00 431.33,502.00              431.33,502.00 424.00,525.33 424.00,525.33              424.00,525.33 402.67,557.33 398.00,566.67              393.33,576.00 372.00,613.33 370.67,626.67              369.33,640.00 395.33,573.33 409.33,564.00              423.33,554.67 417.33,554.00 417.33,554.00              417.33,554.00 406.67,582.00 406.67,582.00              406.67,582.00 396.00,599.33 396.00,599.33              396.00,599.33 404.00,594.67 404.00,594.67              404.00,594.67 399.33,606.67 399.33,606.67              399.33,606.67 375.33,636.00 375.33,636.00              375.33,636.00 398.00,614.67 398.00,614.67              398.00,614.67 394.00,624.67 394.00,624.67              394.00,624.67 356.00,668.00 356.00,668.00              356.00,668.00 390.67,638.00 390.67,638.00              390.67,638.00 386.00,652.67 386.00,652.67              386.00,652.67 380.67,662.67 380.67,662.67              380.67,662.67 376.00,672.67 376.00,672.67              376.00,672.67 372.67,682.67 372.67,682.67              372.67,682.67 368.67,690.00 368.67,690.00              368.67,690.00 366.00,696.00 366.00,696.00              366.00,696.00 362.00,703.33 362.00,703.33              362.00,703.33 359.33,708.67 359.33,708.67              359.33,708.67 340.67,710.00 340.67,710.00              340.67,710.00 356.67,714.00 356.67,714.00              356.67,714.00 352.67,720.00 352.67,720.00              352.67,720.00 345.33,725.33 345.33,725.33              345.33,725.33 341.33,730.00 341.33,730.00              341.33,730.00 321.33,718.00 321.33,718.00              321.33,718.00 337.33,735.33 337.33,735.33              337.33,735.33 332.00,740.67 332.00,740.67              332.00,740.67 325.33,742.00 325.33,742.00              325.33,742.00 305.33,729.33 305.33,729.33              305.33,729.33 319.33,745.33 319.33,745.33              319.33,745.33 314.00,749.33 314.00,749.33              314.00,749.33 308.67,750.00 308.67,750.00              308.67,750.00 301.33,750.00 301.33,750.00              301.33,750.00 296.00,750.00 296.00,750.00              296.00,750.00 283.33,728.00 283.33,728.00              283.33,728.00 288.67,750.00 288.67,749.33              288.67,748.67 282.00,744.00 282.00,744.00              282.00,744.00 270.67,738.67 270.67,738.67              270.67,738.67 261.33,696.67 261.33,696.67              261.33,696.67 264.67,734.67 264.67,734.67              264.67,734.67 258.67,730.67 258.67,730.67              258.67,730.67 250.00,718.00 250.00,718.00              250.00,718.00 258.00,718.67 258.00,718.67              258.00,718.67 256.67,713.33 256.67,713.33              256.67,713.33 246.00,712.00 246.00,712.00              246.00,712.00 241.33,704.67 241.33,704.67              241.33,704.67 255.33,707.33 255.33,707.33              255.33,707.33 236.67,696.67 236.67,696.67              236.67,696.67 234.00,690.00 234.00,690.00              234.00,690.00 252.00,698.00 252.00,698.00              252.00,698.00 229.33,679.33 229.33,679.33              229.33,679.33 225.33,675.33 220.67,654.67              225.33,658.00 242.67,670.00 242.67,670.00              242.67,670.00 217.33,644.00 217.33,644.00              217.33,644.00 216.67,636.67 216.67,636.67              216.67,636.67 241.33,659.33 241.33,659.33              241.33,659.33 205.33,600.67 205.33,600.67              205.33,600.67 200.67,583.33 200.67,583.33              200.67,583.33 229.33,628.67 229.33,628.67              229.33,628.67 197.33,562.00 197.33,562.00              197.33,562.00 192.00,536.00 192.00,536.00              192.00,536.00 208.67,570.67 208.67,570.67              208.67,570.67 188.67,518.00 188.67,518.00              188.67,518.00 187.33,506.67 187.33,506.67              187.33,506.67 224.00,594.00 224.00,594.00              224.00,594.00 184.00,484.67 184.00,484.67              184.00,484.67 177.33,472.00 177.33,472.00              177.33,472.00 181.33,468.67 181.33,468.67              181.33,468.67 188.00,477.33 188.00,477.33              188.00,477.33 194.00,486.00 194.00,486.00              194.00,486.00 197.33,495.33 197.33,495.33              197.33,495.33 208.67,530.00 208.67,530.00              208.67,530.00 190.67,462.67 190.67,462.67              190.67,462.67 184.67,455.33 184.67,455.33              184.67,455.33 186.67,450.00 186.67,450.00              186.67,450.00 193.33,452.00 193.33,452.00              193.33,452.00 198.67,461.33 198.67,461.33              198.67,461.33 203.33,471.33 203.33,471.33              203.33,471.33 236.67,607.33 236.67,607.33              236.67,607.33 212.67,481.33 212.67,481.33              212.67,481.33 206.67,465.33 206.67,465.33              206.67,465.33 204.67,455.33 204.67,455.33              204.67,455.33 200.00,446.00 200.00,446.00              200.00,446.00 196.67,437.33 196.67,437.33              196.67,437.33 200.67,436.67 201.33,436.67              202.00,436.67 206.00,440.67 206.00,440.67              206.00,440.67 208.67,446.00 208.67,446.00              208.67,446.00 222.00,492.67 222.00,492.67              222.00,492.67 214.00,444.67 214.00,444.67              214.00,444.67 211.33,434.67 211.33,434.67              211.33,434.67 207.33,430.00 207.33,430.00              207.33,430.00 207.33,423.33 207.33,423.33              207.33,423.33 211.33,420.67 211.33,420.67              211.33,420.67 215.33,422.67 216.00,422.67              216.67,422.67 220.00,428.00 220.00,428.00              220.00,428.00 250.00,610.67 250.00,610.67              250.00,610.67 226.00,433.33 226.00,433.33              226.00,433.33 221.33,417.33 221.33,417.33              221.33,417.33 218.67,406.00 218.67,406.00              218.67,406.00 226.00,412.00 226.00,412.00              226.00,412.00 230.67,414.00 230.67,414.67              230.67,415.33 251.45,565.22 264.00,652.67              269.33,672.00 270.91,688.82 298.67,698.67              328.67,693.33 326.00,677.33 342.67,644.67              356.67,600.67 362.67,571.33 366.67,554.00              375.07,514.38 392.72,442.49 392.67,442.67"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer2_2",
      "fill": _vm.layer2,
      "stroke": "none",
      "d": "M 465.50,592.00            C 465.50,592.00 439.00,617.50 439.00,617.50              439.00,617.50 432.50,622.00 432.50,622.00              432.50,622.00 461.00,589.50 461.00,589.50              461.00,589.50 461.00,581.50 461.00,581.50              461.00,581.50 431.50,606.00 431.50,606.00              431.50,606.00 409.50,630.00 409.50,630.00              409.50,630.00 393.50,643.50 393.50,643.50              393.50,643.50 397.50,628.00 397.50,628.00              397.50,628.00 461.50,558.50 471.00,563.50              480.50,568.50 465.50,592.00 465.50,592.00 Z            M 470.00,545.00            C 470.00,545.00 448.00,577.50 433.50,581.00              428.00,587.50 427.00,593.00 427.00,593.00              427.00,593.00 409.00,605.00 409.00,605.00              409.00,605.00 410.00,593.00 410.00,593.00              410.00,593.00 432.00,576.00 432.00,576.00              432.00,576.00 442.50,559.00 448.50,556.00              454.50,553.00 470.00,545.00 470.00,545.00 Z            M 456.50,533.50            C 456.50,533.50 446.00,549.50 446.00,549.50              446.00,549.50 422.00,573.00 422.00,573.00              422.00,573.00 431.50,551.50 431.50,551.50              431.50,551.50 456.50,533.50 456.50,533.50 Z            M 444.50,520.00            C 444.50,520.00 432.00,545.00 432.00,545.00              432.00,545.00 418.50,560.00 418.50,560.00              418.50,560.00 424.50,534.00 424.50,534.00              424.50,534.00 444.50,520.00 444.50,520.00 Z            M 416.00,656.00            C 416.00,656.00 429.00,640.50 429.00,640.50              429.00,640.50 436.00,644.50 436.00,644.50              436.00,644.50 427.00,653.00 427.00,653.00              427.00,653.00 416.00,656.00 416.00,656.00 Z            M 410.50,676.00            C 410.50,676.00 402.00,682.50 402.00,682.50              402.00,682.50 419.00,687.00 419.00,687.00              419.00,687.00 434.50,693.50 434.50,693.50              434.50,693.50 435.00,687.50 435.00,687.50              435.00,687.50 410.50,676.00 410.50,676.00 Z            M 416.50,846.00            C 416.50,846.00 429.50,859.00 429.50,859.00              429.50,859.00 435.50,865.00 435.50,865.00              435.50,865.00 431.00,867.50 431.00,867.50              431.00,867.50 417.50,854.50 417.50,854.50              417.50,854.50 416.50,846.00 416.50,846.00 Z            M 426.50,842.00            C 426.50,842.00 439.50,851.50 439.50,851.50              439.50,851.50 446.50,855.00 446.50,855.00              446.50,855.00 442.00,848.50 442.00,848.50              442.00,848.50 433.50,841.50 433.50,841.50              433.50,841.50 426.50,842.00 426.50,842.00 Z            M 158.50,499.00            C 158.50,499.00 167.50,504.50 167.50,504.50              167.50,504.50 174.50,513.50 174.50,513.50              174.50,513.50 178.50,526.50 178.50,526.50              178.50,526.50 171.50,520.00 171.50,520.00              171.50,520.00 165.50,511.00 165.50,511.00              165.50,511.00 158.50,499.00 158.50,499.00 Z            M 147.50,515.00            C 147.50,515.00 156.00,516.50 156.00,516.50              156.00,516.50 164.50,526.50 164.50,526.50              164.50,526.50 172.50,543.50 172.50,543.50              172.50,543.50 177.00,558.00 177.00,558.00              177.00,558.00 157.00,531.00 157.00,531.00              157.00,531.00 147.50,515.00 147.50,515.00 Z            M 164.00,551.00            C 164.00,551.00 183.00,570.50 183.00,570.50              183.00,570.50 189.00,586.00 189.00,586.00              189.00,586.00 168.00,568.50 168.00,568.50              168.00,568.50 164.00,551.00 164.00,551.00 Z            M 183.50,601.00            C 183.50,601.00 204.00,627.50 204.00,627.50              204.00,627.50 206.50,644.50 206.50,644.50              206.50,644.50 190.50,623.50 190.50,623.50              190.50,623.50 183.50,601.00 183.50,601.00 Z            M 143.00,554.00            C 143.00,554.00 154.00,567.00 154.00,567.00              154.00,567.00 166.50,591.50 166.50,591.50              166.50,591.50 149.00,571.00 149.00,571.00              149.00,571.00 143.00,554.00 143.00,554.00 Z            M 136.00,525.50            C 136.00,525.50 153.00,538.50 153.00,538.50              153.00,538.50 156.50,549.50 156.50,549.50              156.50,549.50 137.50,535.00 137.50,535.00              137.50,535.00 136.00,525.50 136.00,525.50 Z            M 195.00,681.00            C 195.00,681.00 204.00,683.00 204.00,683.00              204.00,683.00 209.50,691.00 209.50,691.00              209.50,691.00 197.00,687.50 197.00,687.50              197.00,687.50 195.00,681.00 195.00,681.00 Z            M 121.00,540.00            C 121.00,540.00 128.00,543.00 128.00,543.00              128.00,543.00 134.50,554.50 134.50,554.50              134.50,554.50 125.00,547.50 125.00,547.50              125.00,547.50 121.00,540.00 121.00,540.00 Z            M 108.00,557.50            C 108.00,557.50 120.00,559.50 120.00,559.50              120.00,559.50 129.00,565.00 129.00,565.00              129.00,565.00 135.00,577.00 135.00,577.00              135.00,577.00 124.50,570.00 124.50,570.00              124.50,570.00 116.00,564.50 116.00,564.50              116.00,564.50 108.00,557.50 108.00,557.50 Z            M 100.00,575.50            C 100.00,575.50 109.50,576.00 109.50,576.00              109.50,576.00 117.00,580.00 117.00,580.00              117.00,580.00 125.00,588.00 125.00,588.00              125.00,588.00 130.00,596.50 130.00,596.50              130.00,596.50 131.00,601.00 131.00,601.00              131.00,601.00 116.00,587.50 116.00,587.50              116.00,587.50 107.50,583.00 107.50,583.00              107.50,583.00 100.00,575.50 100.00,575.50 Z            M 135.50,594.00            C 135.50,594.00 142.50,597.50 143.00,597.50              143.50,597.50 150.50,603.50 150.50,603.50              150.50,603.50 158.00,618.00 158.00,618.00              158.00,618.00 145.50,609.00 145.50,609.00              145.50,609.00 139.50,604.50 139.50,604.50              139.50,604.50 135.50,594.00 135.50,594.00 Z            M 90.00,592.00            C 90.00,592.00 101.00,595.00 101.00,595.00              101.00,595.00 108.00,600.00 108.00,600.00              108.00,600.00 110.50,605.50 110.50,605.50              110.50,605.50 101.00,600.50 101.00,600.50              101.00,600.50 94.00,597.50 94.00,597.50              94.00,597.50 90.00,592.00 90.00,592.00 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer3",
      "fill": _vm.layer3,
      "stroke": "none",
      "d": "M 166.67,466.00            C 166.67,466.00 172.00,466.00 172.00,466.00              172.00,466.00 177.33,471.33 177.33,471.33              177.33,471.33 181.33,478.00 181.33,478.00              181.33,478.00 198.67,568.00 198.67,568.00              198.67,568.00 215.33,634.00 215.33,634.00              215.33,634.00 234.00,689.33 234.00,689.33              234.00,689.33 248.67,724.00 260.67,730.67              269.33,742.00 303.33,760.67 320.67,745.33              343.33,738.67 356.00,716.00 356.00,716.00              356.00,716.00 374.00,678.00 374.00,678.00              374.00,678.00 408.53,582.66 414.00,565.33              414.00,565.33 432.00,504.00 432.00,504.00              432.00,504.00 439.33,495.33 439.33,495.33              439.33,495.33 446.67,487.33 446.67,487.33              446.67,487.33 451.33,484.67 451.33,484.67              451.33,484.67 450.00,493.33 450.00,493.33              450.00,493.33 444.67,499.33 444.67,499.33              444.67,499.33 438.00,504.00 438.00,504.00              438.00,504.00 410.00,593.33 410.00,593.33              410.00,593.33 441.33,518.67 441.33,518.67              441.33,518.67 446.67,512.00 446.67,512.00              446.67,512.00 454.00,504.67 454.00,504.67              454.00,504.67 458.00,500.67 458.00,500.67              458.00,500.67 458.00,509.33 458.00,509.33              458.00,509.33 453.33,514.67 453.33,514.67              453.33,514.67 446.00,522.67 446.00,522.67              446.00,522.67 386.67,671.33 386.67,671.33              386.67,671.33 452.00,534.00 452.00,534.00              452.00,534.00 458.67,527.33 458.67,527.33              458.67,527.33 462.00,521.33 462.00,521.33              462.00,521.33 467.33,518.67 467.33,518.67              467.33,518.67 466.00,526.00 466.67,526.00              467.33,526.00 459.33,534.00 459.33,534.00              459.33,534.00 454.00,540.00 454.00,540.00              454.00,540.00 399.33,662.00 399.33,662.00              399.33,662.00 456.67,556.00 456.67,556.00              456.67,556.00 464.00,546.00 464.00,546.00              464.00,546.00 469.33,540.00 469.33,540.00              469.33,540.00 474.00,536.00 474.00,536.00              474.00,536.00 476.67,540.00 476.67,540.00              476.67,540.00 472.00,546.67 472.00,546.67              472.00,546.67 463.33,555.33 463.33,555.33              463.33,555.33 418.67,638.67 418.67,638.67              418.67,638.67 471.33,560.67 471.33,560.67              471.33,560.67 430.67,630.67 430.67,630.67              430.67,630.67 445.33,615.33 445.33,615.33              445.33,615.33 437.33,630.67 437.33,630.67              437.33,630.67 430.00,645.33 430.00,645.33              430.00,645.33 404.67,670.67 404.67,671.33              404.67,672.00 430.67,652.00 430.67,652.00              430.67,652.00 423.33,668.00 423.33,668.00              423.33,668.00 418.00,676.00 418.00,676.00              418.00,676.00 389.33,701.33 389.33,701.33              389.33,701.33 414.67,686.00 414.67,686.00              414.67,686.00 409.33,696.00 409.33,696.00              409.33,696.00 377.33,720.67 377.33,720.67              377.33,720.67 402.00,708.00 402.00,708.00              402.00,708.00 386.00,728.00 386.00,728.00              386.00,728.00 378.67,742.00 376.67,744.00              374.67,746.00 358.00,767.33 354.67,768.67              351.33,770.00 314.00,794.67 295.33,789.33              268.67,781.33 273.33,788.67 246.67,766.00              230.67,748.67 223.33,738.00 223.33,738.00              223.33,738.00 216.67,726.00 216.67,726.00              216.67,726.00 226.00,731.33 226.00,731.33              226.00,731.33 212.67,718.00 212.67,718.00              212.67,718.00 208.67,709.33 208.67,709.33              208.67,709.33 222.67,718.00 222.67,718.00              222.67,718.00 202.67,698.00 202.67,698.00              202.67,698.00 196.00,682.67 196.00,682.67              196.00,682.67 212.67,700.00 212.67,700.00              212.67,700.00 194.00,668.67 194.00,668.67              194.00,668.67 180.67,648.67 180.67,648.67              180.67,648.67 150.00,574.00 150.00,574.00              150.00,574.00 202.67,669.33 202.67,669.33              202.67,669.33 148.00,557.33 148.00,557.33              148.00,557.33 138.00,542.67 138.00,542.67              138.00,542.67 132.67,536.00 132.00,536.00              131.33,536.00 139.33,534.67 139.33,534.67              139.33,534.67 146.00,539.33 146.00,539.33              146.00,539.33 173.33,594.00 173.33,594.00              173.33,594.00 144.67,528.67 144.67,528.67              144.67,528.67 137.33,516.67 137.33,516.67              137.33,516.67 144.00,516.67 144.00,516.67              144.00,516.67 152.00,522.00 152.00,522.00              152.00,522.00 204.97,651.97 209.33,658.67              219.80,656.95 166.00,527.33 166.00,527.33              166.00,527.33 156.00,513.33 156.00,513.33              156.00,513.33 147.33,499.33 147.33,499.33              147.33,499.33 153.33,497.33 153.33,497.33              153.33,497.33 162.67,501.33 162.67,501.33              162.67,501.33 167.33,509.33 167.33,509.33              167.33,509.33 194.67,586.67 194.67,586.67              194.67,586.67 162.67,489.33 162.67,489.33              162.67,489.33 158.00,479.33 158.00,479.33              158.00,479.33 169.33,484.67 169.33,484.67              169.33,484.67 184.67,538.67 185.33,538.67              186.00,538.67 171.33,475.33 171.33,475.33              171.33,475.33 166.67,466.00 166.67,466.00 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer3_2",
      "fill": _vm.layer3,
      "stroke": "none",
      "d": "M 116.67,567.33            C 116.67,567.33 124.67,569.33 124.67,569.33              124.67,569.33 144.67,588.00 144.67,588.00              144.67,588.00 154.00,608.67 154.00,608.67              154.00,608.67 122.67,576.67 122.67,576.67              122.67,576.67 116.67,567.33 116.67,567.33 Z            M 103.33,582.00            C 103.33,582.00 115.33,586.67 115.33,586.67              115.33,586.67 128.67,598.67 128.67,598.67              128.67,598.67 140.00,608.00 140.00,608.00              140.00,608.00 154.67,633.33 154.67,633.33              154.67,633.33 126.67,608.67 126.67,608.67              126.67,608.67 117.33,598.67 117.33,598.67              117.33,598.67 103.33,582.00 103.33,582.00 Z            M 124.67,618.00            C 124.67,618.00 145.33,636.00 146.00,636.00              146.67,636.00 168.67,659.33 168.67,659.33              168.67,659.33 179.33,674.00 179.33,674.00              179.33,674.00 154.00,652.67 154.00,652.67              154.00,652.67 140.67,642.67 140.67,642.67              140.67,642.67 124.67,618.00 124.67,618.00 Z            M 106.67,625.33            C 106.67,625.33 124.00,636.67 124.00,636.67              124.00,636.67 130.00,646.67 130.00,646.67              130.00,646.67 107.33,632.67 107.33,632.67              107.33,632.67 106.67,625.33 106.67,625.33 Z            M 115.33,646.67            C 115.33,646.67 146.00,664.67 146.00,664.67              146.00,664.67 156.67,677.33 157.33,677.33              158.00,677.33 167.33,690.67 167.33,690.67              167.33,690.67 179.33,706.67 179.33,706.67              179.33,706.67 184.00,714.00 184.00,714.00              184.00,714.00 149.33,699.33 149.33,699.33              149.33,699.33 144.00,692.00 144.00,692.00              144.00,692.00 168.00,699.33 168.00,699.33              168.00,699.33 156.67,689.33 156.67,689.33              156.67,689.33 135.33,681.33 135.33,681.33              135.33,681.33 133.33,671.33 133.33,671.33              133.33,671.33 148.67,678.00 148.67,678.00              148.67,678.00 135.33,665.33 135.33,665.33              135.33,665.33 124.67,660.00 124.67,660.00              124.67,660.00 115.33,646.67 115.33,646.67 Z            M 169.33,682.67            C 169.33,682.67 191.33,696.67 191.33,696.67              191.33,696.67 198.67,706.67 198.67,706.67              198.67,706.67 199.33,711.33 199.33,711.33              199.33,711.33 177.33,695.33 177.33,695.33              177.33,695.33 169.33,682.67 169.33,682.67 Z            M 183.33,703.33            C 183.33,703.33 203.67,716.67 203.67,716.67              203.67,716.67 211.33,734.33 211.67,734.67              212.00,735.00 200.00,728.67 200.00,728.67              200.00,728.67 183.33,703.33 183.33,703.33 Z            M 151.33,656.00            C 151.33,656.00 183.33,678.67 183.33,678.67              183.33,678.67 189.00,690.67 189.00,690.67              189.00,690.67 161.00,673.00 161.00,673.00              161.00,673.00 151.33,656.00 151.33,656.00 Z            M 432.67,673.00            C 432.67,673.00 495.33,626.00 495.33,626.00              495.33,626.00 495.67,631.00 495.67,631.00              495.67,631.00 424.67,686.67 424.67,686.67              424.67,686.67 432.67,673.00 432.67,673.00 Z            M 437.33,693.00            C 437.33,693.00 488.33,668.33 488.33,668.33              488.33,668.33 488.67,673.33 488.67,673.33              488.67,673.33 432.00,702.00 432.00,702.00              432.00,702.00 437.33,693.00 437.33,693.00 Z            M 356.00,842.67            C 356.00,842.67 387.67,861.00 387.67,861.00              387.67,861.00 375.33,859.33 375.33,859.33              375.33,859.33 361.67,850.67 361.67,850.67              361.67,850.67 356.00,842.67 356.00,842.67 Z            M 452.33,819.00            C 452.33,819.00 465.00,823.33 465.00,823.33              465.00,823.33 471.00,827.67 471.00,827.67              471.00,827.67 462.33,826.00 462.33,826.00              462.33,826.00 452.33,819.00 452.33,819.00 Z            M 127.67,802.00            C 127.67,802.00 152.67,797.00 152.67,797.00              152.67,797.00 167.00,798.67 167.00,798.67              167.00,798.67 155.00,804.67 155.00,804.67              155.00,804.67 137.67,804.67 137.67,804.67              137.67,804.67 127.67,802.00 127.67,802.00 Z            M 96.67,725.33            C 96.67,725.33 115.67,727.33 115.67,727.33              115.67,727.33 126.00,733.33 126.00,733.33              126.00,733.33 103.33,732.67 103.33,732.67              103.33,732.67 96.67,725.33 96.67,725.33 Z            M 99.00,711.33            C 99.00,711.33 116.33,711.00 116.33,711.00              116.33,711.00 127.67,717.67 127.67,717.67              127.67,717.67 132.33,722.33 132.33,722.67              132.33,723.00 114.33,719.00 114.33,719.00              114.33,719.00 99.00,711.33 99.00,711.33 Z            M 123.67,744.00            C 123.67,744.00 142.33,745.00 142.33,745.00              142.33,745.00 152.67,750.67 152.67,750.67              152.67,750.67 133.33,750.33 133.33,750.33              133.33,750.33 123.67,744.00 123.67,744.00 Z            M 174.00,851.00            C 174.00,851.00 193.33,837.67 193.33,837.67              193.33,837.67 201.67,837.00 201.67,837.00              201.67,837.00 189.33,847.33 189.33,847.33              189.33,847.33 174.00,851.00 174.00,851.00 Z            M 220.33,871.00            C 220.33,871.00 206.00,880.33 206.00,880.33              206.00,880.33 201.33,887.00 201.33,887.00              201.33,887.00 200.00,894.33 200.00,894.33              200.00,894.33 210.00,883.67 210.00,883.67              210.00,883.67 219.67,876.33 219.67,876.33              219.67,876.33 220.33,871.00 220.33,871.00 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer4",
      "fill": _vm.layer4,
      "stroke": "none",
      "d": "M 468.67,566.67            C 468.67,566.67 477.33,558.67 477.33,558.67              477.33,558.67 476.67,565.33 476.67,565.33              476.67,565.33 438.00,647.33 438.00,647.33              438.00,647.33 478.00,574.67 478.00,574.67              478.00,574.67 481.33,580.67 481.33,580.67              481.33,580.67 444.67,648.00 444.67,648.00              444.67,648.00 487.33,584.67 487.33,584.67              487.33,584.67 490.00,592.00 490.00,592.00              490.00,592.00 419.33,698.00 419.33,698.00              419.33,698.00 492.67,599.33 492.67,599.33              492.67,599.33 494.67,606.67 494.67,606.67              494.67,606.67 440.00,685.33 440.00,685.33              440.00,685.33 498.00,616.67 498.00,616.67              498.00,616.67 496.67,624.67 496.67,624.67              496.67,624.67 495.33,632.67 495.33,632.67              495.33,632.67 468.00,674.00 456.00,684.00              445.33,702.00 430.00,724.00 426.67,730.00              423.33,736.00 398.00,764.00 398.00,764.00              398.00,764.00 371.33,789.33 371.33,789.33              371.33,789.33 347.33,804.67 347.33,804.67              347.33,804.67 322.67,812.67 322.67,812.67              322.67,812.67 312.00,808.00 312.00,808.00              312.00,808.00 313.33,814.67 313.33,814.67              313.33,814.67 304.67,814.67 304.67,814.67              304.67,814.67 295.33,815.33 295.33,815.33              295.33,815.33 274.67,796.00 274.67,796.00              274.67,796.00 286.67,814.67 286.67,814.67              286.67,814.67 276.67,812.67 276.67,812.67              276.67,812.67 270.67,809.33 270.00,809.33              269.33,809.33 253.33,789.33 253.33,789.33              253.33,789.33 262.67,808.67 262.67,808.67              262.67,808.67 252.67,804.67 252.67,804.67              252.67,804.67 243.33,801.33 243.33,801.33              243.33,801.33 232.67,797.33 232.67,797.33              232.67,797.33 218.00,772.67 218.00,772.67              218.00,772.67 224.67,794.00 224.67,794.00              224.67,794.00 210.00,778.00 210.00,778.00              210.00,778.00 196.67,761.33 196.67,761.33              196.67,761.33 186.00,745.33 186.00,745.33              186.00,745.33 210.67,764.67 210.67,764.67              210.67,764.67 176.00,730.00 176.00,730.00              176.00,730.00 162.00,714.00 162.00,714.00              162.00,714.00 204.00,749.33 204.00,749.33              204.00,749.33 146.67,692.00 146.67,692.00              146.67,692.00 187.33,726.00 187.33,726.00              187.33,726.00 115.33,614.67 100.00,612.67              101.33,607.33 92.00,597.33 92.00,597.33              92.00,597.33 104.67,604.67 104.67,604.67              104.67,604.67 130.00,634.00 134.00,640.67              138.00,647.33 102.00,591.33 102.00,591.33              102.00,591.33 95.33,582.67 95.33,582.67              95.33,582.67 101.33,579.33 101.33,579.33              101.33,579.33 122.00,610.00 122.00,610.00              122.00,610.00 173.33,690.00 173.33,690.00              173.33,690.00 198.00,728.00 198.00,728.00              198.00,728.00 210.67,740.00 210.67,740.00              210.67,740.00 194.00,690.00 178.00,676.00              168.00,656.67 164.67,648.00 149.33,628.67              134.00,609.33 118.00,578.67 118.00,578.67              118.00,578.67 109.33,570.00 109.33,570.00              109.33,570.00 106.00,560.00 106.00,560.00              106.00,560.00 122.67,574.00 122.67,574.00              122.67,574.00 148.67,618.00 148.67,618.00              148.67,618.00 182.00,672.67 182.00,672.67              182.00,672.67 135.33,575.33 135.33,575.33              135.33,575.33 126.00,561.33 126.00,561.33              126.00,561.33 119.33,554.00 119.33,554.00              119.33,554.00 119.33,546.00 119.33,546.00              119.33,546.00 129.33,554.67 129.33,554.67              129.33,554.67 160.00,615.33 160.00,615.33              160.00,615.33 129.33,542.67 129.33,542.67              129.33,542.67 124.00,529.33 124.00,529.33              124.00,529.33 133.33,532.00 133.33,532.00              133.33,532.00 137.33,538.67 137.33,538.67              137.33,538.67 198.00,686.67 198.00,686.67              198.00,686.67 208.00,703.33 208.00,703.33              208.00,703.33 216.00,720.00 216.00,720.00              216.00,720.00 222.67,735.33 222.67,735.33              222.67,735.33 235.33,760.67 250.00,770.67              263.33,782.00 272.00,788.67 290.00,788.67              308.00,788.67 323.33,789.33 333.33,782.00              343.33,774.67 363.33,765.33 368.00,756.67              372.67,748.00 394.67,724.67 400.00,709.33              405.33,694.00 424.67,682.67 430.00,652.67              440.67,620.67 453.33,610.00 458.00,582.67"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer4_2",
      "fill": _vm.layer4,
      "stroke": "none",
      "d": "M 441.00,729.33            C 441.00,729.33 500.33,703.67 500.33,703.67              500.33,703.67 502.67,706.67 502.67,706.67              502.67,706.67 450.33,731.00 450.33,731.00              450.33,731.00 438.33,741.00 438.33,741.00              438.33,741.00 423.67,744.33 423.67,744.33              423.67,744.33 441.00,729.33 441.00,729.33 Z            M 427.33,756.67            C 427.33,756.67 449.33,754.00 449.33,754.00              449.33,754.00 442.33,757.33 442.33,757.33              442.33,757.33 434.00,762.00 434.00,762.00              434.00,762.00 419.33,761.33 419.33,761.33              419.33,761.33 427.33,756.67 427.33,756.67 Z            M 449.00,760.00            C 449.00,760.00 504.33,752.00 504.33,752.00              504.33,752.00 504.00,756.67 504.00,756.67              504.00,756.67 439.33,766.33 439.33,766.33              439.33,766.33 449.00,760.00 449.00,760.00 Z            M 427.33,772.33            C 427.33,772.33 465.67,766.00 465.67,766.00              465.67,766.00 463.33,770.67 463.33,770.67              463.33,770.67 408.33,780.33 408.33,780.33              408.33,780.33 427.33,772.33 427.33,772.33 Z            M 460.67,742.67            C 460.67,742.67 504.00,726.67 504.33,726.67              504.67,726.67 504.67,731.00 504.67,731.00              504.67,731.00 456.00,748.67 456.00,748.67              456.00,748.67 460.67,742.67 460.67,742.67 Z            M 392.00,787.33            C 392.00,787.33 418.33,787.33 418.33,787.33              418.33,787.33 403.67,796.67 403.67,796.67              403.67,796.67 385.33,792.33 385.33,792.33              385.33,792.33 392.00,787.33 392.00,787.33 Z            M 454.67,781.00            C 454.67,781.00 500.67,780.33 500.67,780.33              500.67,780.33 499.00,784.67 499.00,784.67              499.00,784.67 446.67,784.00 446.67,784.00              446.67,784.00 454.67,781.00 454.67,781.00 Z            M 443.00,791.33            C 443.00,791.33 468.67,788.00 468.67,788.00              468.67,788.00 496.00,790.00 496.00,790.00              496.00,790.00 495.33,795.67 495.33,795.67              495.33,795.67 458.67,796.67 458.67,796.67              458.67,796.67 437.00,798.67 437.00,798.67              437.00,798.67 418.00,797.00 418.00,797.00              418.00,797.00 443.00,791.33 443.00,791.33 Z            M 445.33,804.33            C 445.33,804.33 460.67,813.33 460.67,813.33              460.67,813.33 464.33,818.00 464.33,818.00              464.33,818.00 459.67,819.33 459.67,819.33              459.67,819.33 436.00,806.00 436.33,806.00              436.67,806.00 445.33,804.33 445.33,804.33 Z            M 405.00,801.00            C 405.00,801.00 456.00,839.00 456.00,839.00              456.00,839.00 453.33,841.00 453.33,841.00              453.33,841.00 400.67,805.00 400.67,805.00              400.67,805.00 405.00,801.00 405.00,801.00 Z            M 373.33,825.67            C 373.33,825.67 419.67,855.00 419.67,855.00              419.67,855.00 423.00,862.67 423.00,862.67              423.00,862.67 428.00,868.00 428.33,868.00              428.67,868.00 432.00,870.67 432.00,870.67              432.00,870.67 430.33,872.67 430.33,872.67              430.33,872.67 419.00,863.33 419.00,863.33              419.00,863.33 414.67,857.67 414.67,857.67              414.67,857.67 363.67,824.67 363.67,824.67              363.67,824.67 373.33,825.67 373.33,825.67 Z            M 384.67,829.00            C 384.67,829.00 415.67,845.33 422.67,845.67              429.67,846.00 436.00,851.00 436.00,851.00              436.00,851.00 437.67,855.33 438.33,855.33              439.00,855.33 441.67,858.67 441.67,859.00              441.67,859.33 445.00,857.00 445.00,857.00              445.00,857.00 443.33,853.33 443.33,853.33              443.33,853.33 436.00,847.67 436.00,847.67              436.00,847.67 430.33,844.33 430.33,844.33              430.33,844.33 406.67,832.67 406.67,832.67              406.67,832.67 390.33,827.33 390.33,827.33              390.33,827.33 384.67,829.00 384.67,829.00 Z            M 405.00,825.67            C 405.00,825.67 427.00,834.33 427.00,834.33              427.00,834.33 438.33,839.67 438.33,839.67              438.33,839.67 444.67,841.33 444.67,841.33              444.67,841.33 449.67,844.00 449.67,844.00              449.67,844.00 444.00,838.00 444.00,838.00              444.00,838.00 436.00,834.33 436.00,834.33              436.00,834.33 413.67,824.67 413.67,824.67              413.67,824.67 405.00,825.67 405.00,825.67 Z            M 366.00,843.00            C 366.00,843.00 406.67,871.67 406.67,871.67              406.67,871.67 417.33,877.33 417.33,877.33              417.33,877.33 418.00,873.67 418.00,873.67              418.00,873.67 398.00,856.00 398.00,856.00              398.00,856.00 366.00,843.00 366.00,843.00 Z            M 349.00,840.00            C 349.00,840.00 374.67,861.33 374.67,861.33              374.67,861.33 356.00,855.33 356.00,855.33              356.00,855.33 342.00,850.00 342.00,850.00              342.00,850.00 349.00,840.00 349.00,840.00 Z            M 380.33,862.67            C 380.33,862.67 399.67,882.00 399.67,882.00              399.67,882.00 394.67,883.33 394.67,883.33              394.67,883.33 367.67,861.33 367.67,861.33              367.67,861.33 380.33,862.67 380.33,862.67 Z            M 361.33,866.00            C 361.33,866.00 383.00,886.00 383.00,886.00              383.00,886.00 380.67,889.67 380.67,889.67              380.67,889.67 366.33,882.33 366.33,882.33              366.33,882.33 355.67,865.33 355.67,865.33              355.67,865.33 359.00,865.33 359.00,865.33              359.00,865.33 361.33,866.00 361.33,866.00 Z            M 347.33,873.33            C 347.33,873.33 358.67,879.67 358.67,879.67              358.67,879.67 368.00,896.67 368.33,896.67              368.67,896.67 362.67,893.67 362.67,893.67              362.67,893.67 357.00,889.33 357.00,889.33              357.00,889.33 351.67,887.33 351.67,887.33              351.67,887.33 347.33,873.33 347.33,873.33 Z            M 333.33,874.00            C 333.33,874.00 354.33,903.00 354.33,903.00              354.33,903.00 352.33,904.33 352.33,904.33              352.33,904.33 348.33,899.67 348.33,899.67              348.33,899.67 344.00,894.00 344.00,894.00              344.00,894.00 339.67,892.67 339.67,892.67              339.67,892.67 332.33,883.33 332.33,883.33              332.33,883.33 326.00,881.00 325.67,881.00              325.33,881.00 320.33,875.33 320.33,875.33              320.33,875.33 318.33,872.67 318.33,872.67              318.33,872.67 323.33,869.33 323.33,869.33              323.33,869.33 333.33,874.00 333.33,874.00 Z            M 320.00,880.00            C 320.00,880.00 338.33,907.33 338.33,907.33              338.33,907.33 337.00,913.33 337.00,913.33              337.00,913.33 331.67,903.67 331.67,903.67              331.67,903.67 326.33,900.00 326.33,900.00              326.33,900.00 318.67,887.67 318.67,887.67              318.67,887.67 320.00,880.00 320.00,880.00 Z            M 313.67,872.00            C 313.67,872.00 322.00,913.33 322.00,913.33              322.00,913.33 321.67,917.67 321.67,917.67              321.67,917.67 318.00,915.33 318.00,915.33              318.00,915.33 314.67,912.00 314.67,912.00              314.67,912.00 309.33,868.33 309.33,868.33              309.33,868.33 313.67,872.00 313.67,872.00 Z            M 306.67,866.67            C 306.67,866.67 309.67,917.33 309.67,917.33              309.67,917.33 308.67,923.00 308.67,923.00              308.67,923.00 306.00,924.33 306.00,924.33              306.00,924.33 304.67,917.00 304.67,917.00              304.67,917.00 304.00,864.67 304.00,864.67              304.00,864.67 306.67,866.67 306.67,866.67 Z            M 300.67,925.67            C 300.67,925.67 296.00,923.33 296.00,923.33              296.00,923.33 294.67,919.67 294.67,919.67              294.67,919.67 293.67,852.00 293.67,852.00              293.67,852.00 296.67,853.33 296.67,853.33              296.67,853.33 298.33,858.33 298.33,858.33              298.33,858.33 300.67,925.67 300.67,925.67 Z            M 290.00,855.00            C 290.00,855.00 293.33,857.33 293.33,857.33              293.33,857.33 291.00,862.00 291.00,862.00              291.00,862.00 245.67,899.00 245.67,899.00              245.67,899.00 237.67,904.67 237.67,904.67              237.67,904.67 232.67,907.33 232.67,907.33              232.67,907.33 237.67,897.67 237.67,897.67              237.67,897.67 245.00,886.67 245.00,886.67              245.00,886.67 290.00,855.00 290.00,855.00 Z            M 248.33,906.67            C 248.33,906.67 254.67,897.33 254.67,897.33              254.67,897.33 261.67,892.00 261.67,892.00              261.67,892.00 289.67,868.00 289.67,868.00              289.67,868.00 289.67,873.67 289.67,873.67              289.67,873.67 259.33,903.00 259.33,903.00              259.33,903.00 253.00,911.33 253.00,911.33              253.00,911.33 249.67,913.67 249.67,913.67              249.67,913.67 248.33,906.67 248.33,906.67 Z            M 263.67,860.00            C 263.67,860.00 287.67,845.00 287.67,845.00              287.67,845.00 290.00,848.67 290.00,848.67              290.00,848.67 287.00,854.00 287.00,854.00              287.00,854.00 265.33,868.67 265.33,868.67              265.33,868.67 233.33,890.00 233.33,890.00              233.33,890.00 221.33,898.67 221.33,898.67              221.33,898.67 215.33,899.00 215.33,899.00              215.33,899.00 226.33,889.33 226.33,889.33              226.33,889.33 236.00,884.33 236.00,884.33              236.00,884.33 241.33,876.00 241.33,876.00              241.33,876.00 250.67,869.67 250.67,869.67              250.67,869.67 257.33,865.33 257.33,865.33              257.33,865.33 263.67,860.00 263.67,860.00 Z            M 249.00,856.33            C 249.00,856.33 257.00,854.33 257.00,854.33              257.00,854.33 234.00,875.67 234.00,875.67              234.00,875.67 223.00,882.00 223.00,882.00              223.00,882.00 215.67,886.33 215.67,886.33              215.67,886.33 206.33,890.33 206.00,890.33              205.67,890.33 202.00,891.67 202.00,891.67              202.00,891.67 214.00,878.00 214.00,878.00              214.00,878.00 231.00,867.67 231.00,867.67              231.00,867.67 249.00,856.33 249.00,856.33 Z            M 189.00,881.67            C 189.00,881.67 206.67,872.67 206.67,872.67              206.67,872.67 221.33,866.67 221.33,866.67              221.33,866.67 232.00,860.00 232.00,860.00              232.00,860.00 207.33,866.00 207.33,866.00              207.33,866.00 193.67,873.33 193.67,873.33              193.67,873.33 189.00,881.67 189.00,881.67 Z            M 172.67,877.00            C 172.67,877.00 225.67,856.67 225.67,856.67              225.67,856.67 235.67,849.33 235.67,849.33              235.67,849.33 221.33,852.33 221.33,852.33              221.33,852.33 205.00,858.00 205.00,858.00              205.00,858.00 185.33,865.00 185.33,865.00              185.33,865.00 172.67,877.00 172.67,877.00 Z            M 159.00,869.00            C 159.00,869.00 169.00,863.67 169.00,863.67              169.00,863.67 184.00,859.00 184.00,859.00              184.00,859.00 195.67,853.33 195.67,853.33              195.67,853.33 201.67,851.00 202.00,851.00              202.33,851.00 207.67,846.33 207.67,846.33              207.67,846.33 199.33,847.33 199.33,847.33              199.33,847.33 186.67,850.33 186.67,850.33              186.67,850.33 173.00,854.67 173.00,854.67              173.00,854.67 163.67,860.67 163.67,860.67              163.67,860.67 157.67,869.33 157.67,869.33              157.67,869.33 159.00,869.00 159.00,869.00 Z            M 145.00,857.67            C 145.00,857.67 156.00,852.33 156.00,852.33              156.00,852.33 171.00,848.67 171.00,848.67              171.00,848.67 224.67,825.67 224.67,825.67              224.67,825.67 224.00,819.33 224.00,819.33              224.00,819.33 219.33,819.00 219.33,819.00              219.33,819.00 166.00,839.00 166.00,839.00              166.00,839.00 152.67,847.33 152.67,847.33              152.67,847.33 141.00,854.00 141.00,854.00              141.00,854.00 139.33,859.67 139.33,859.67              139.33,859.67 145.00,857.67 145.00,857.67 Z            M 199.67,842.00            C 199.67,842.00 205.67,837.00 205.67,837.00              205.67,837.00 210.33,835.33 211.00,835.33              211.67,835.33 220.00,833.33 220.67,833.33              221.33,833.33 227.67,833.33 228.00,833.33              228.33,833.33 231.67,834.33 231.67,834.33              231.67,834.33 220.00,840.67 220.00,840.67              220.00,840.67 211.33,842.33 211.33,842.33              211.33,842.33 199.67,842.00 199.67,842.00 Z            M 117.33,828.00            C 117.33,828.00 147.00,818.33 147.00,818.33              147.00,818.33 168.33,818.67 168.33,818.67              168.33,818.67 182.00,815.67 182.00,815.67              182.00,815.67 160.00,827.33 160.00,827.33              160.00,827.33 142.33,829.33 142.33,829.33              142.33,829.33 117.33,828.00 117.33,828.00 Z            M 210.33,818.67            C 210.33,818.67 189.00,818.00 189.00,818.00              189.00,818.00 165.67,827.67 165.67,827.67              165.67,827.67 157.67,830.67 157.67,830.67              157.67,830.67 177.67,831.33 177.67,831.33              177.67,831.33 210.33,818.67 210.33,818.67 Z            M 105.67,813.33            C 105.67,813.33 121.67,805.33 121.67,805.33              121.67,805.33 156.67,810.00 156.67,810.00              156.67,810.00 160.00,816.67 160.00,816.67              160.00,816.67 105.67,813.33 105.67,813.33 Z            M 97.00,798.33            C 97.00,798.33 112.33,793.33 112.33,793.33              112.33,793.33 121.00,792.00 121.33,792.00              121.67,792.00 143.00,796.33 143.00,796.33              143.00,796.33 149.67,797.67 149.67,797.67              149.67,797.67 128.00,799.00 128.00,799.00              128.00,799.00 109.33,800.00 109.33,800.00              109.33,800.00 97.00,798.33 97.00,798.33 Z            M 155.33,805.33            C 155.33,805.33 169.67,801.00 169.67,801.00              169.67,801.00 181.67,802.33 181.67,802.33              181.67,802.33 193.67,804.33 193.67,804.33              193.67,804.33 203.33,806.67 203.33,806.67              203.33,806.67 210.67,809.00 210.67,809.00              210.67,809.00 216.00,815.00 216.00,815.00              216.00,815.00 205.33,815.00 205.33,815.00              205.33,815.00 191.67,814.00 191.67,814.00              191.67,814.00 155.33,805.33 155.33,805.33 Z            M 144.67,791.00            C 144.67,791.00 179.00,788.67 179.00,788.67              179.00,788.67 201.33,799.33 201.33,799.33              201.33,799.33 202.67,803.33 202.67,803.33              202.67,803.33 144.67,791.00 144.67,791.00 Z            M 90.33,782.00            C 90.33,782.00 102.00,777.67 102.00,777.67              102.00,777.67 113.00,775.00 113.00,775.00              113.00,775.00 163.33,784.00 163.33,784.00              163.33,784.00 168.00,786.00 168.00,786.00              168.00,786.00 137.67,787.67 137.67,787.67              137.67,787.67 124.33,788.00 124.33,788.00              124.33,788.00 109.00,785.67 109.00,785.67              109.00,785.67 90.33,782.00 90.33,782.00 Z            M 84.00,764.67            C 84.00,764.67 104.33,770.00 104.33,770.00              104.33,770.00 141.67,776.33 141.67,776.33              141.67,776.33 98.33,758.00 98.33,758.00              98.33,758.00 84.00,764.67 84.00,764.67 Z            M 76.33,751.33            C 76.33,751.33 119.33,755.67 119.33,755.67              119.33,755.67 99.67,743.67 99.67,743.67              99.67,743.67 82.00,743.00 82.00,743.00              82.00,743.00 76.33,751.33 76.33,751.33 Z            M 79.67,728.00            C 79.67,728.00 94.67,728.00 94.67,728.00              94.67,728.00 105.67,735.67 106.00,736.00              106.33,736.33 110.67,740.33 110.67,740.33              110.67,740.33 94.67,737.33 94.67,737.33              94.67,737.33 85.67,734.33 85.67,734.33              85.67,734.33 79.67,728.00 79.67,728.00 Z            M 111.33,733.67            C 111.33,733.67 130.00,735.00 130.00,735.00              130.00,735.00 137.33,740.00 137.33,740.00              137.33,740.00 139.33,743.33 139.33,743.33              139.33,743.33 120.00,742.00 120.00,742.00              120.00,742.00 111.33,733.67 111.33,733.67 Z            M 157.00,756.67            C 157.00,756.67 160.33,768.67 160.33,768.67              160.33,768.67 167.67,772.67 167.67,772.67              167.67,772.67 163.67,760.33 163.67,760.33              163.67,760.33 157.00,756.67 157.00,756.67 Z            M 99.00,654.33            C 99.00,654.33 89.67,643.33 89.67,643.33              89.67,643.33 81.67,639.33 81.67,639.33              81.67,639.33 76.33,637.67 76.33,637.67              76.33,637.67 73.67,635.00 73.67,635.00              73.67,635.00 77.00,632.67 77.00,632.67              77.00,632.67 85.33,637.67 85.33,637.67              85.33,637.67 74.33,623.67 74.33,623.67              74.33,623.67 74.67,615.67 74.67,615.67              74.67,615.67 82.00,618.33 82.00,618.33              82.00,618.33 90.33,627.00 90.33,627.00              90.33,627.00 100.67,638.00 100.67,638.00              100.67,638.00 144.00,694.67 144.00,694.67              144.00,694.67 164.00,730.00 164.00,730.00              164.00,730.00 168.00,738.33 168.00,738.33              168.00,738.33 154.67,720.33 154.67,720.33              154.67,720.33 117.67,676.00 117.67,676.00M 72.33,653.33            C 72.33,653.33 80.67,653.67 80.67,653.67              80.67,653.67 91.67,659.00 91.67,659.00              91.67,659.00 99.00,664.33 99.00,664.33              99.00,664.33 106.67,670.67 106.67,670.67              106.67,670.67 119.33,687.33 119.33,687.33              119.33,687.33 101.33,673.67 101.33,673.67              101.33,673.67 90.00,667.67 90.00,667.67              90.00,667.67 83.67,667.33 83.67,667.33              83.67,667.33 77.67,660.67 77.67,660.67              77.67,660.67 72.33,653.33 72.33,653.33 Z            M 92.33,677.67            C 92.33,677.67 102.00,682.67 102.00,682.67              102.00,682.67 107.67,684.00 108.00,684.00              108.33,684.00 112.33,687.67 112.33,687.67              112.33,687.67 116.00,691.00 116.00,691.00              116.00,691.00 120.33,694.00 120.33,694.00              120.33,694.00 125.33,697.33 125.33,697.67              125.33,698.00 128.33,699.33 128.33,699.33              128.33,699.33 130.33,701.00 130.67,701.00              131.00,701.00 139.67,714.33 139.67,714.33              139.67,714.33 125.67,708.67 125.67,708.67              125.67,708.67 120.33,705.00 120.33,705.00              120.33,705.00 115.67,703.00 115.67,703.00              115.67,703.00 92.33,677.67 92.33,677.67 Z            M 68.67,691.33            C 68.67,691.33 82.33,691.67 82.33,691.67              82.33,691.67 93.33,696.00 93.33,696.00              93.33,696.00 103.67,700.67 103.67,700.67              103.67,700.67 109.33,703.67 109.33,703.67              109.33,703.67 115.67,710.33 116.00,710.33              116.33,710.33 119.00,713.67 119.00,713.67              119.00,713.67 95.33,705.33 95.33,705.33              95.33,705.33 87.00,702.00 87.00,702.00              87.00,702.00 81.67,698.33 81.67,698.33              81.67,698.33 74.67,696.67 74.67,696.67              74.67,696.67 68.67,691.33 68.67,691.33 Z            M 110.00,718.33            C 110.00,718.33 122.33,721.33 122.33,721.33              122.33,721.33 132.67,724.00 132.67,724.00              132.67,724.00 139.00,727.67 139.00,727.67              139.00,727.67 147.33,737.00 147.67,737.33              148.00,737.67 150.67,741.67 150.67,741.67              150.67,741.67 140.00,737.67 140.00,737.67              140.00,737.67 133.00,733.33 133.00,733.33              133.00,733.33 124.33,730.67 124.33,730.67              124.33,730.67 114.67,725.67 114.67,725.67              114.67,725.67 110.00,718.33 110.00,718.33 Z            M 65.67,711.00            C 65.67,711.00 74.67,709.00 74.67,709.00              74.67,709.00 83.67,709.67 84.00,709.67              84.33,709.67 93.33,711.67 94.00,711.67              94.67,711.67 100.33,714.33 100.33,714.33              100.33,714.33 108.67,724.67 108.67,724.67              108.67,724.67 96.67,720.33 96.67,720.33              96.67,720.33 86.00,719.00 86.00,719.00              86.00,719.00 77.33,715.67 77.33,715.67              77.33,715.67 72.00,713.33 72.00,713.33              72.00,713.33 65.67,711.00 65.67,711.00 Z            M 128.67,717.00            C 128.67,717.00 145.00,719.33 145.00,719.33              145.00,719.33 150.67,723.67 151.00,723.67              151.33,723.67 157.33,732.00 157.67,732.00              158.00,732.00 160.67,738.00 160.67,738.00              160.67,738.00 151.67,733.00 151.67,733.00              151.67,733.00 128.67,717.00 128.67,717.00 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer5_1",
      "fill": _vm.layer5,
      "stroke": "none",
      "d": "M 284.67,917.33            C 284.67,917.33 273.33,910.67 273.33,910.67              273.33,910.67 161.33,732.00 161.33,732.00              161.33,732.00 125.33,670.67 125.33,670.67              125.33,670.67 85.33,596.67 85.33,596.67              85.33,596.67 96.00,607.33 96.00,607.33              96.00,607.33 144.00,690.67 144.00,690.67              144.00,690.67 166.00,719.33 166.00,719.33              166.00,719.33 216.67,787.33 216.67,787.33              216.67,787.33 232.00,798.67 232.00,798.67              232.00,798.67 266.00,810.00 266.00,810.00              266.00,810.00 295.33,814.67 295.33,814.67              295.33,814.67 322.67,813.33 322.67,813.33              322.67,813.33 343.33,806.67 343.33,806.67              343.33,806.67 367.33,794.00 367.33,794.00              367.33,794.00 392.00,768.67 392.00,768.67              392.00,768.67 416.00,742.00 416.00,742.00              416.00,742.00 452.67,688.67 452.67,688.67              452.67,688.67 496.00,629.33 496.00,629.33              496.00,629.33 498.00,636.00 498.00,636.00              498.00,636.00 442.00,712.67 442.00,712.67              442.00,712.67 504.00,642.00 504.00,642.00              504.00,642.00 507.33,652.00 507.33,652.00              507.33,652.00 430.67,734.00 430.67,734.00              430.67,734.00 512.00,657.33 512.00,657.33              512.00,657.33 511.33,664.67 511.33,664.67              511.33,664.67 403.33,767.33 402.67,767.33              402.00,767.33 516.00,672.00 516.00,672.00              516.00,672.00 517.33,682.00 517.33,682.00              517.33,682.00 436.67,746.67 436.67,746.67              436.67,746.67 517.33,689.33 517.33,689.33              517.33,689.33 517.33,698.67 517.33,698.67              517.33,698.67 398.67,778.67 398.67,778.67              398.67,778.67 517.33,707.33 517.33,707.33              517.33,707.33 517.33,714.00 517.33,714.00              517.33,714.00 441.33,759.33 441.33,759.33              441.33,759.33 518.00,724.00 518.00,724.00              518.00,724.00 517.33,732.00 517.33,732.00              517.33,732.00 384.00,791.33 380.67,798.67              377.33,806.00 516.00,742.67 516.00,742.67              516.00,742.67 512.67,754.00 512.67,754.00              512.67,754.00 423.33,788.67 423.33,788.67              423.33,788.67 511.33,760.67 511.33,760.67              511.33,760.67 510.67,766.00 510.67,766.00              510.67,766.00 444.00,788.00 444.00,788.00              444.00,788.00 506.67,776.00 506.67,776.00              506.67,776.00 501.33,787.33 501.33,787.33              501.33,787.33 391.33,796.67 378.67,810.00              381.33,816.67 497.33,786.00 497.33,796.67              497.33,807.33 488.67,803.33 488.67,803.33              488.67,803.33 377.33,813.33 369.33,820.00              361.33,826.67 480.00,804.00 483.33,812.67              486.67,821.33 476.00,820.00 476.00,820.00              476.00,820.00 449.33,816.00 424.67,819.33              400.00,822.67 473.33,821.33 468.67,828.67              464.00,836.00 408.00,820.67 358.67,828.00              309.33,835.33 456.00,830.00 452.67,837.33              463.33,838.67 466.00,846.00 466.00,846.00              466.00,846.00 459.33,849.33 459.33,849.33              459.33,849.33 452.67,843.33 452.67,843.33              452.67,843.33 444.00,841.33 444.00,841.33              444.00,841.33 382.00,837.33 382.00,837.33              382.00,837.33 434.00,847.33 437.33,848.67              440.67,850.00 446.00,857.33 446.00,857.33              446.00,857.33 441.33,860.67 441.33,860.67              441.33,860.67 434.67,854.67 434.67,854.67              434.67,854.67 384.00,844.67 384.00,844.67              384.00,844.67 428.67,862.00 428.67,862.00              428.67,862.00 436.67,868.67 436.67,868.67              436.67,868.67 430.67,871.33 430.67,871.33              430.67,871.33 422.00,864.67 422.00,864.67              422.00,864.67 412.67,861.33 412.67,861.33              412.67,861.33 350.00,841.33 350.00,841.33              350.00,841.33 343.33,846.67 343.33,846.67              343.33,846.67 412.00,871.33 412.00,871.33              412.00,871.33 418.67,876.67 418.67,876.67              418.67,876.67 418.67,882.67 418.67,882.67              418.67,882.67 351.33,854.00 315.33,845.33              279.33,836.67 394.67,879.33 394.67,879.33              394.67,879.33 404.67,888.00 404.67,888.00              404.67,888.00 402.00,894.00 402.00,894.00              402.00,894.00 389.33,882.67 389.33,882.67              389.33,882.67 287.33,841.33 287.33,841.33              287.33,841.33 380.00,886.67 380.00,886.67              380.00,886.67 386.00,894.67 386.00,894.67              386.00,894.67 382.67,900.00 382.67,900.00              382.67,900.00 372.67,889.33 372.67,889.33              372.67,889.33 298.67,853.33 298.67,853.33              298.67,853.33 366.67,894.67 367.33,894.67              368.00,894.67 373.33,902.67 373.33,902.67              373.33,902.67 369.33,906.00 369.33,906.00              369.33,906.00 356.00,893.33 356.00,893.33              356.00,893.33 312.00,866.67 311.33,866.67              310.67,866.67 348.67,899.33 348.67,899.33              348.67,899.33 354.00,908.00 354.67,908.00              355.33,908.00 340.67,899.33 340.67,899.33              340.67,899.33 328.00,890.00 328.00,890.00              328.00,890.00 246.67,828.00 246.67,828.00              246.67,828.00 334.67,908.00 334.67,907.33              334.67,906.67 337.33,914.67 337.33,914.67              337.33,914.67 326.67,908.67 326.67,908.67              326.67,908.67 258.67,846.67 258.67,846.67              258.67,846.67 320.67,918.00 320.67,918.00              320.67,918.00 315.33,924.67 315.33,924.00              315.33,923.33 275.33,876.00 275.33,876.00              275.33,876.00 305.33,924.00 306.00,924.00              306.67,924.00 296.67,920.67 296.67,920.67              296.67,920.67 278.00,871.33 212.00,804.00              214.00,810.67 284.67,909.33 285.33,913.33"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "layer5_2",
      "fill": _vm.layer5,
      "stroke": "none",
      "d": "M 379.75,796.25            C 379.75,796.25 299.25,912.25 291.00,917.50              282.75,922.75 285.50,918.75 285.50,918.75              285.50,918.75 288.25,911.75 288.25,911.75              288.25,911.75 360.00,816.50 360.00,816.50              360.00,816.50 270.00,919.50 270.00,919.50              270.00,919.50 264.75,921.00 264.75,921.00              264.75,921.00 263.50,917.25 263.50,917.25              263.50,917.25 351.25,820.25 351.25,820.25              351.25,820.25 257.75,915.25 257.75,915.25              257.75,915.25 252.25,918.50 252.25,918.50              252.25,918.50 249.75,915.50 249.75,915.50              249.75,915.50 341.75,820.50 341.75,820.50              341.75,820.50 340.25,816.00 340.25,816.00              340.25,816.00 255.50,905.00 236.25,911.50              217.00,918.00 238.00,903.75 238.00,903.75              238.00,903.75 291.67,856.67 291.67,856.67              291.67,856.67 221.50,903.25 221.50,903.25              221.50,903.25 218.50,905.75 218.50,905.75              218.50,905.75 215.75,903.50 215.75,903.50              215.75,903.50 218.00,899.75 218.00,899.75              218.00,899.75 294.75,846.25 294.75,846.25              294.75,846.25 289.50,842.00 289.50,842.00              289.50,842.00 284.00,849.75 284.00,849.75              284.00,849.75 222.00,889.25 215.25,892.00              208.50,894.75 203.75,897.75 203.75,897.75              203.75,897.75 199.50,898.75 199.50,898.75              199.50,898.75 208.50,889.00 208.50,889.00              208.50,889.00 214.50,885.00 214.75,885.00              215.00,885.00 285.00,845.25 285.00,845.25              285.00,845.25 283.50,840.25 283.50,840.25              283.50,840.25 272.50,847.25 272.50,847.25              272.50,847.25 193.00,884.25 190.75,886.75              188.50,889.25 184.50,890.75 184.50,890.75              184.50,890.75 182.25,887.75 182.25,887.75              182.25,887.75 196.50,876.50 196.50,876.50              196.50,876.50 258.75,848.50 258.75,848.50              258.75,848.50 277.25,840.75 277.25,840.75              277.25,840.75 276.75,837.25 276.75,837.25              276.75,837.25 266.50,841.25 266.50,841.25              266.50,841.25 222.25,861.75 222.25,861.75              222.25,861.75 172.75,881.00 170.00,883.25              167.25,885.50 168.25,880.00 168.25,880.00              168.25,880.00 177.25,872.75 177.25,872.75              177.25,872.75 211.00,861.25 214.25,860.00              217.50,858.75 245.75,847.25 245.75,847.25              245.75,847.25 273.75,836.50 273.75,836.50              273.75,836.50 272.50,834.25 272.50,834.25              272.50,834.25 168.75,869.75 167.50,870.75              166.25,871.75 160.75,872.75 160.75,872.75              160.75,872.75 156.25,874.00 156.25,874.00              156.25,874.00 158.50,869.00 158.50,869.00              158.50,869.00 164.50,865.00 164.50,865.00              164.50,865.00 265.25,834.50 265.25,834.50              265.25,834.50 158.00,859.25 158.00,859.25              158.00,859.25 150.50,860.25 150.50,860.25              150.50,860.25 144.50,861.00 144.50,861.00              144.50,861.00 143.00,862.25 142.75,862.25              142.50,862.25 140.75,861.25 140.75,861.25              140.75,861.25 144.25,855.75 144.25,855.75              144.25,855.75 152.00,854.50 152.25,854.50              152.50,854.50 252.75,833.50 261.50,826.75              270.25,820.00 229.50,834.50 229.50,834.50              229.50,834.50 202.25,836.50 202.25,836.50              202.25,836.50 188.75,839.75 163.25,843.25              137.75,846.75 145.50,848.50 145.50,848.50              145.50,848.50 140.50,849.50 140.50,849.50              140.50,849.50 133.00,846.75 133.00,846.75              133.00,846.75 129.25,845.25 129.25,845.25              129.25,845.25 184.25,836.25 184.25,836.25              184.25,836.25 128.25,835.75 128.25,835.75              128.25,835.75 121.25,835.50 121.00,835.50              120.75,835.50 117.00,834.50 117.00,834.50              117.00,834.50 129.00,830.75 129.00,830.75              129.00,830.75 239.50,832.75 247.25,826.75              255.00,820.75 247.50,821.25 247.50,821.25              247.50,821.25 196.75,816.75 182.75,819.25              169.50,819.25 152.75,819.75 140.50,820.00              128.25,820.25 120.25,821.50 120.25,821.50              120.25,821.50 112.00,821.00 112.00,821.00              112.00,821.00 106.25,821.75 106.00,821.75              105.75,821.75 107.25,817.75 107.25,817.75              107.25,817.75 115.75,814.50 116.25,814.50              116.75,814.50 170.75,815.25 170.75,815.25              170.75,815.25 110.75,805.75 110.75,805.75              110.75,805.75 104.25,805.75 104.25,805.75              104.25,805.75 97.50,805.25 97.50,805.25              97.50,805.25 96.50,801.50 96.50,801.50              96.50,801.50 112.00,799.75 112.00,799.75              112.00,799.75 209.00,814.50 209.00,814.50              209.00,814.50 229.75,814.00 229.75,814.00              229.75,814.00 207.50,808.25 207.50,808.25              207.50,808.25 95.00,789.75 95.00,789.75              95.00,789.75 86.25,788.75 86.25,788.75              86.25,788.75 90.75,784.25 90.75,784.25              90.75,784.25 134.25,789.25 134.25,789.25              134.25,789.25 197.75,802.50 197.75,802.50              197.75,802.50 164.75,786.50 164.75,786.50              164.75,786.50 133.25,779.50 133.25,779.50              133.25,779.50 110.25,775.00 110.25,775.00              110.25,775.00 96.75,773.25 96.75,773.25              96.75,773.25 88.25,772.00 88.25,772.00              88.25,772.00 82.25,771.50 82.25,771.50              82.25,771.50 79.00,770.00 79.00,770.00              79.00,770.00 81.00,767.00 81.00,767.00              81.00,767.00 88.25,765.75 88.25,765.75              88.25,765.75 138.00,775.25 138.00,775.25              138.00,775.25 88.00,755.50 88.00,755.50              88.00,755.50 80.00,754.75 80.00,754.75              80.00,754.75 76.00,754.50 75.75,754.50              75.50,754.50 81.00,749.75 81.00,749.75              81.00,749.75 88.25,749.75 88.25,749.75              88.25,749.75 153.00,776.75 153.00,776.75              153.00,776.75 80.25,738.50 80.25,738.50              80.25,738.50 73.50,736.75 73.50,736.75              73.50,736.75 73.25,733.25 73.25,733.25              73.25,733.25 77.50,731.75 77.75,731.75              78.00,731.75 84.50,733.00 85.00,733.25              85.50,733.50 194.75,792.75 194.75,792.75              194.75,792.75 133.50,755.00 133.25,755.00              119.25,743.75 70.75,718.50 70.75,718.50              70.75,718.50 66.50,717.75 66.50,717.75              66.50,717.75 69.50,713.00 69.50,713.00              69.50,713.00 74.75,712.75 75.00,712.75              75.25,712.75 80.50,715.50 80.50,715.50              80.50,715.50 142.00,753.75 142.00,753.75              142.00,753.75 178.75,776.75 178.75,776.75              178.75,776.75 169.75,765.75 169.75,765.75              169.75,765.75 149.50,752.00 149.50,752.00              149.50,752.00 105.75,721.00 105.75,721.00              105.75,721.00 78.50,703.50 78.50,703.50              78.50,703.50 71.75,700.00 71.75,700.00              71.75,700.00 66.00,698.50 66.00,698.50              66.00,698.50 62.75,697.75 62.75,697.75              62.75,697.75 70.25,694.75 70.25,694.75              70.25,694.75 78.75,696.00 78.75,696.00              78.75,696.00 86.50,699.00 86.50,699.00              86.50,699.00 153.75,749.00 153.75,749.00              153.75,749.00 86.25,687.25 86.25,687.25              86.25,687.25 75.00,679.00 75.00,679.00              75.00,679.00 70.25,676.75 70.25,676.75              70.25,676.75 65.75,674.75 65.50,674.75              65.25,674.75 62.25,674.00 62.25,674.00              62.25,674.00 67.75,671.75 68.00,671.75              68.25,671.75 78.00,675.00 78.00,675.00              78.00,675.00 92.75,684.75 92.75,684.75              92.75,684.75 72.50,667.50 72.50,667.50              72.50,667.50 67.00,661.75 67.00,661.75              67.00,661.75 63.25,659.00 63.25,659.00              63.25,659.00 66.75,656.00 67.00,656.00              67.25,656.00 72.25,656.00 72.25,656.00              72.25,656.00 75.00,658.00 75.00,658.00              75.00,658.00 156.75,746.25 163.00,744.25              169.25,742.25 91.50,654.25 91.50,654.25              91.50,654.25 87.00,647.75 87.00,647.75              87.00,647.75 80.25,641.75 80.25,641.75              80.25,641.75 76.00,639.00 76.00,639.00              76.00,639.00 78.75,635.75 78.75,635.75              78.75,635.75 87.75,641.00 87.75,641.00              87.75,641.00 157.50,725.00 158.50,726.75              159.50,728.50 163.25,732.75 163.25,732.75              163.25,732.75 140.75,694.50 140.75,694.50              140.75,694.50 129.75,675.25 129.75,675.25              129.75,675.25 111.25,650.00 111.25,650.00              111.25,650.00 101.25,636.75 101.25,636.75              101.25,636.75 92.00,627.00 92.00,627.00              92.00,627.00 83.75,620.00 83.75,620.00              83.75,620.00 79.25,615.50 79.25,615.50              79.25,615.50 87.75,615.50 87.75,615.50              87.75,615.50 105.50,632.00 105.50,632.00              105.50,632.00 159.75,714.75 159.75,714.75              159.75,714.75 199.25,781.25 199.25,781.25              199.25,781.25 258.00,814.50 258.00,814.50              258.00,814.50 292.75,818.25 292.75,818.25              292.75,818.25 326.00,817.50 326.00,817.50              326.00,817.50 363.75,801.75 363.75,801.75              363.75,801.75 379.75,796.25 379.75,796.25 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "highlights",
      "fill": "white",
      "fill-opacity": "0.3",
      "stroke": "none",
      "d": "M 331.00,143.35            C 336.73,147.04 340.00,148.89 341.00,156.00              331.91,151.79 327.47,143.76 317.00,140.79              309.05,138.53 301.89,142.89 298.00,136.00              309.96,132.60 320.95,136.88 331.00,143.35 Z            M 278.97,151.95            C 278.97,151.95 274.12,169.00 274.12,169.00              274.12,169.00 277.41,193.00 277.41,193.00              277.41,193.00 282.00,204.00 282.00,204.00              278.03,200.96 272.84,194.69 270.99,190.00              267.41,180.91 268.41,166.22 272.62,157.46              273.89,154.83 276.15,152.24 278.00,150.00              278.00,150.00 278.97,151.95 278.97,151.95 Z            M 342.05,169.00            C 345.75,179.10 344.87,188.83 339.40,198.00              337.02,201.97 336.21,203.81 332.00,206.00              332.00,206.00 338.51,191.00 338.51,191.00              339.78,186.30 338.55,170.59 336.87,166.00              335.80,163.08 333.56,159.80 332.00,157.00              337.98,159.22 339.95,163.29 342.05,169.00 Z            M 340.00,172.00            C 340.00,172.00 341.00,173.00 341.00,173.00              341.00,173.00 341.00,172.00 341.00,172.00              341.00,172.00 340.00,172.00 340.00,172.00 Z            M 342.00,186.00            C 342.00,186.00 342.00,174.00 342.00,174.00              340.54,177.69 340.54,182.31 342.00,186.00 Z            M 332.00,214.00            C 332.00,214.00 332.00,216.00 332.00,216.00              325.09,216.00 312.13,216.46 306.00,214.00              306.00,214.00 332.00,214.00 332.00,214.00 Z            M 284.00,215.00            C 297.09,214.83 302.77,219.32 312.00,218.96              317.27,218.76 328.60,216.39 333.00,218.00              322.72,220.59 317.45,221.02 307.00,221.00              298.39,220.99 300.09,220.31 293.00,219.30              293.00,219.30 276.00,218.00 276.00,218.00              278.28,214.73 280.22,215.05 284.00,215.00 Z            M 328.00,226.00            C 328.00,226.00 305.00,228.00 305.00,228.00              308.34,228.39 309.04,228.18 311.00,231.00              311.00,231.00 290.00,228.18 290.00,228.18              290.00,228.18 276.00,226.00 276.00,226.00              285.26,223.37 294.81,225.59 304.00,227.00              304.00,227.00 304.00,224.00 304.00,224.00              310.12,224.00 323.33,222.56 328.00,226.00 Z            M 297.00,236.14            C 297.00,236.14 304.29,238.89 304.29,238.89              304.29,238.89 331.00,238.00 331.00,238.00              327.88,241.54 321.40,240.99 317.00,241.00              302.40,241.02 306.87,240.27 295.17,238.92              289.38,238.26 283.11,238.03 278.00,235.00              278.00,235.00 297.00,236.14 297.00,236.14 Z            M 328.00,234.00            C 328.00,234.00 328.00,236.00 328.00,236.00              328.00,236.00 305.00,234.00 305.00,234.00              305.00,234.00 328.00,234.00 328.00,234.00 Z            M 329.00,244.00            C 329.00,244.00 306.00,245.00 306.00,245.00              306.00,245.00 306.00,243.00 306.00,243.00              306.00,243.00 329.00,244.00 329.00,244.00 Z            M 328.00,246.00            C 325.52,248.77 319.68,248.28 316.00,248.72              305.22,249.99 297.34,247.16 287.00,246.08              287.00,246.08 277.00,246.08 277.00,246.08              277.00,246.08 277.00,244.00 277.00,244.00              297.56,244.45 302.42,249.37 328.00,246.00 Z            M 303.00,255.13            C 303.00,255.13 312.00,256.83 312.00,256.83              312.00,256.83 329.00,258.92 329.00,258.92              329.00,258.92 316.00,258.92 316.00,258.92              316.00,258.92 294.00,256.00 294.00,256.00              294.00,256.00 278.00,256.00 278.00,256.00              278.00,256.00 278.00,254.00 278.00,254.00              278.00,254.00 303.00,255.13 303.00,255.13 Z            M 295.96,263.49            C 295.96,263.49 301.28,265.34 301.28,265.34              301.28,265.34 314.00,266.89 314.00,266.89              314.00,266.89 331.00,266.89 331.00,266.89              323.89,269.02 308.46,268.05 301.00,266.89              296.20,265.91 297.21,265.11 291.00,265.00              287.11,264.94 283.67,265.46 280.00,264.00              280.00,264.00 295.96,263.49 295.96,263.49 Z            M 324.00,264.00            C 324.00,264.00 307.00,263.00 307.00,263.00              307.00,263.00 324.00,264.00 324.00,264.00 Z            M 297.83,272.25            C 297.83,272.25 305.43,275.04 305.43,275.04              305.43,275.04 329.00,275.04 329.00,275.04              329.00,275.04 329.00,277.00 329.00,277.00              329.00,277.00 311.00,277.00 311.00,277.00              311.00,277.00 290.00,274.00 290.00,274.00              290.00,274.00 279.00,273.00 279.00,273.00              279.00,273.00 297.83,272.25 297.83,272.25 Z            M 327.00,274.00            C 327.00,274.00 319.00,273.09 319.00,273.09              319.00,273.09 303.00,272.00 303.00,272.00              309.12,272.00 322.33,270.56 327.00,274.00 Z            M 308.00,285.00            C 308.00,285.00 328.00,285.00 328.00,285.00              317.11,288.59 308.84,286.53 298.00,286.04              290.77,285.71 282.87,285.81 277.00,281.00              277.00,281.00 308.00,285.00 308.00,285.00 Z            M 296.00,290.00            C 296.00,290.00 296.00,292.00 296.00,292.00              296.00,292.00 275.00,290.00 275.00,290.00              284.01,287.81 287.50,289.81 296.00,290.00 Z            M 325.00,289.00            C 325.00,289.00 325.00,291.00 325.00,291.00              325.00,291.00 304.00,291.00 304.00,291.00              304.00,291.00 304.00,289.00 304.00,289.00              304.00,289.00 325.00,289.00 325.00,289.00 Z            M 314.00,294.00            C 314.00,294.00 327.00,295.00 327.00,295.00              317.19,298.00 315.34,296.74 306.00,296.09              301.74,295.79 298.71,296.89 296.00,293.00              296.00,293.00 314.00,294.00 314.00,294.00 Z            M 291.00,300.21            C 291.00,300.21 300.00,302.79 300.00,302.79              300.00,302.79 322.00,302.00 322.00,302.00              319.02,305.34 311.30,304.99 307.00,305.00              294.26,305.02 298.96,303.98 291.01,303.09              285.29,302.44 278.75,302.65 274.00,299.00              274.00,299.00 291.00,300.21 291.00,300.21 Z            M 326.00,300.00            C 326.00,300.00 302.00,299.00 302.00,299.00              302.00,299.00 326.00,300.00 326.00,300.00 Z            M 267.33,302.59            C 267.33,302.59 282.71,304.02 282.71,304.02              282.71,304.02 285.00,307.00 285.00,307.00              273.15,306.42 279.51,303.95 264.00,306.00              264.00,306.00 267.33,302.59 267.33,302.59 Z            M 345.00,307.00            C 345.00,307.00 337.37,316.05 337.37,316.05              337.37,316.05 328.00,327.00 328.00,327.00              330.31,318.51 336.44,309.92 345.00,307.00 Z            M 290.98,329.00            C 290.51,322.27 286.00,314.45 293.00,312.00              293.00,312.00 294.17,336.00 294.17,336.00              294.17,336.00 296.68,349.00 296.68,349.00              296.68,349.00 299.00,363.00 299.00,363.00              299.91,357.91 300.53,344.81 300.05,339.74              299.61,334.15 297.82,328.50 300.05,323.00              300.05,323.00 301.90,348.00 301.90,348.00              301.90,348.00 301.90,359.00 301.90,359.00              301.90,359.00 300.04,368.00 300.04,368.00              300.04,368.00 301.92,383.00 301.92,383.00              301.92,383.00 301.92,397.00 301.92,397.00              301.92,397.00 303.00,415.00 303.00,415.00              303.00,415.00 300.00,402.00 300.00,402.00              300.00,402.00 297.00,405.00 297.00,405.00              297.00,405.00 298.87,415.00 298.87,415.00              298.87,415.00 297.19,434.00 297.19,434.00              297.19,434.00 301.00,452.00 301.00,452.00              301.00,452.00 299.00,454.00 299.00,454.00              299.00,454.00 298.00,454.00 298.00,454.00              298.00,454.00 298.00,453.00 298.00,453.00              298.00,453.00 296.10,451.00 296.10,451.00              296.10,451.00 296.10,462.00 296.10,462.00              296.10,462.00 301.00,488.00 301.00,488.00              301.00,488.00 295.00,482.00 295.00,482.00              295.00,482.00 300.00,503.00 300.00,503.00              294.90,499.63 293.00,485.95 293.00,480.00              293.00,480.00 297.00,480.00 297.00,480.00              297.00,480.00 290.00,471.00 290.00,471.00              290.00,471.00 290.00,482.00 290.00,482.00              290.00,482.00 288.50,468.01 288.50,468.01              288.50,468.01 284.40,456.00 284.40,456.00              284.40,456.00 281.01,434.42 281.01,434.42              281.01,434.42 278.59,428.16 278.59,428.16              278.59,428.16 275.00,404.00 275.00,404.00              275.00,404.00 272.00,403.00 272.00,403.00              272.00,403.00 271.00,406.00 271.00,406.00              270.65,390.06 265.87,394.74 266.00,375.00              266.02,371.28 265.74,370.07 268.00,367.00              268.00,367.00 269.41,379.00 269.41,379.00              269.41,379.00 271.73,386.00 271.73,386.00              271.73,386.00 272.49,394.00 272.49,394.00              272.49,394.00 275.56,402.00 275.56,402.00              278.76,411.37 280.99,419.05 281.00,429.00              281.00,429.00 284.00,428.00 284.00,428.00              284.00,428.00 287.00,460.00 287.00,460.00              287.00,460.00 289.00,460.00 289.00,460.00              289.00,460.00 290.00,455.00 290.00,455.00              290.00,464.27 289.72,464.53 294.00,473.00              295.07,464.27 293.58,448.82 292.00,440.00              292.00,440.00 294.00,439.00 294.00,439.00              294.00,439.00 295.00,440.00 295.00,440.00              295.00,440.00 295.99,419.00 295.99,419.00              295.99,419.00 291.00,388.00 291.00,388.00              291.00,388.00 295.00,394.00 295.00,394.00              295.00,394.00 289.67,378.00 289.67,378.00              289.67,378.00 288.17,365.00 288.17,365.00              288.17,365.00 285.92,352.00 285.92,352.00              285.30,348.49 282.33,334.82 280.40,332.63              277.86,329.75 267.90,325.78 264.00,324.99              264.00,324.99 258.17,324.99 258.17,324.99              258.17,324.99 251.00,323.00 251.00,323.00              251.00,323.00 251.00,321.00 251.00,321.00              251.00,321.00 273.00,323.93 273.00,323.93              273.00,323.93 281.00,330.77 281.00,330.77              281.00,330.77 281.99,330.77 281.99,330.77              281.99,330.77 285.92,343.00 285.92,343.00              285.92,343.00 288.26,354.91 288.26,354.91              288.26,354.91 290.76,361.09 290.76,361.09              290.76,361.09 298.00,382.00 298.00,382.00              298.00,355.88 292.11,345.22 290.98,329.00 Z            M 292.00,321.00            C 292.00,321.00 292.00,316.00 292.00,316.00              292.00,316.00 292.00,321.00 292.00,321.00 Z            M 361.00,321.00            C 361.00,321.00 354.68,329.71 354.68,329.71              354.68,329.71 348.68,336.29 348.68,336.29              345.15,340.80 344.72,343.86 339.00,346.00              344.99,332.10 347.45,329.37 359.00,320.00              359.00,320.00 361.00,321.00 361.00,321.00 Z            M 322.00,323.00            C 322.00,323.00 316.00,333.00 316.00,333.00              316.00,333.00 320.00,323.00 320.00,323.00              320.00,323.00 322.00,323.00 322.00,323.00 Z            M 353.00,327.00            C 353.00,327.00 354.00,328.00 354.00,328.00              354.00,328.00 354.00,327.00 354.00,327.00              354.00,327.00 353.00,327.00 353.00,327.00 Z            M 352.00,328.00            C 352.00,328.00 353.00,329.00 353.00,329.00              353.00,329.00 353.00,328.00 353.00,328.00              353.00,328.00 352.00,328.00 352.00,328.00 Z            M 251.00,338.47            C 258.35,340.14 265.27,338.83 268.00,348.00              257.75,343.88 257.28,341.11 245.00,341.00              245.00,341.00 245.00,338.00 245.00,338.00              245.00,338.00 241.00,338.00 241.00,338.00              241.00,338.00 241.00,336.00 241.00,336.00              246.72,336.59 246.47,337.45 251.00,338.47 Z            M 321.00,337.00            C 321.00,337.00 316.00,354.00 316.00,354.00              316.00,354.00 316.00,344.00 316.00,344.00              316.00,344.00 319.00,337.00 319.00,337.00              319.00,337.00 321.00,337.00 321.00,337.00 Z            M 359.58,349.00            C 361.36,346.57 363.22,343.59 366.04,342.13              368.32,341.20 369.70,341.59 372.00,342.13              372.00,342.13 361.29,352.01 361.29,352.01              361.29,352.01 350.00,364.00 350.00,364.00              351.61,358.07 356.00,353.88 359.58,349.00 Z            M 307.00,373.00            C 306.95,377.90 307.73,385.63 306.00,390.00              306.00,367.51 304.89,368.92 309.00,346.00              311.23,351.65 307.09,365.55 307.00,373.00 Z            M 334.00,346.00            C 330.02,356.60 329.00,377.08 327.42,389.00              326.66,394.75 327.71,400.16 324.00,405.00              324.00,405.00 325.83,393.00 325.83,393.00              325.83,393.00 326.96,375.00 326.96,375.00              326.96,375.00 332.00,346.00 332.00,346.00              332.00,346.00 334.00,346.00 334.00,346.00 Z            M 277.00,360.00            C 277.00,360.00 279.44,369.72 279.44,369.72              279.44,369.72 283.04,389.00 283.04,389.00              283.04,389.00 285.63,397.00 285.63,397.00              285.63,397.00 288.92,416.00 288.92,416.00              288.92,416.00 291.54,433.71 291.54,433.71              291.54,433.71 290.00,436.00 290.00,436.00              291.03,439.64 291.42,441.41 290.00,445.00              289.42,437.17 288.07,429.48 285.64,422.00              283.47,415.30 279.96,406.01 281.00,399.00              281.00,399.00 285.00,409.00 285.00,409.00              285.00,409.00 282.87,394.83 282.87,394.83              282.87,394.83 281.00,394.00 281.00,394.00              280.60,388.06 279.32,387.21 278.44,382.00              278.44,382.00 276.54,367.17 276.54,367.17              274.01,357.53 271.12,360.29 271.00,347.00              271.00,347.00 277.00,360.00 277.00,360.00 Z            M 321.00,354.00            C 320.57,358.69 317.63,369.05 314.00,372.00              314.00,372.00 319.00,354.00 319.00,354.00              319.00,354.00 321.00,354.00 321.00,354.00 Z            M 379.04,356.60            C 380.94,355.33 381.88,355.34 384.00,355.00              381.11,360.42 368.12,376.12 363.00,379.00              364.28,373.88 374.75,359.44 379.04,356.60 Z            M 240.00,357.00            C 248.21,357.01 256.92,358.67 259.00,368.00              259.00,368.00 243.00,360.48 243.00,360.48              243.00,360.48 227.00,359.00 227.00,359.00              230.87,356.15 235.33,356.99 240.00,357.00 Z            M 248.00,360.00            C 248.00,360.00 249.00,361.00 249.00,361.00              249.00,361.00 249.00,360.00 249.00,360.00              249.00,360.00 248.00,360.00 248.00,360.00 Z            M 342.00,369.00            C 338.26,376.99 339.10,377.55 339.00,386.00              338.90,393.81 335.88,408.14 334.04,416.00              332.96,420.61 333.42,423.84 331.00,428.00              331.00,428.00 334.75,405.00 334.75,405.00              334.75,405.00 337.02,391.00 337.02,391.00              337.02,391.00 337.02,380.00 337.02,380.00              337.02,380.00 338.00,371.00 338.00,371.00              338.00,371.00 339.00,371.00 339.00,371.00              339.00,371.00 340.00,369.00 340.00,369.00              340.00,369.00 342.00,369.00 342.00,369.00 Z            M 219.59,371.02            C 222.64,368.70 233.58,370.29 236.00,373.00              236.00,373.00 240.00,372.00 240.00,372.00              240.00,372.00 241.00,376.00 241.00,376.00              241.00,376.00 244.00,375.00 244.00,375.00              244.00,375.00 245.00,379.00 245.00,379.00              248.04,379.20 247.93,379.13 249.00,382.00              249.00,382.00 234.00,373.00 234.00,373.00              234.00,373.00 250.00,387.00 250.00,387.00              238.51,385.94 237.46,378.93 229.99,375.34              226.25,373.55 222.03,374.00 218.00,374.00              218.43,372.78 218.38,371.95 219.59,371.02 Z            M 319.51,373.11            C 319.51,373.11 316.00,387.00 316.00,387.00              316.01,377.69 315.84,378.67 319.00,370.00              319.00,370.00 319.51,373.11 319.51,373.11 Z            M 388.00,381.00            C 388.00,381.00 391.00,380.00 391.00,380.00              391.00,380.00 373.00,398.00 373.00,398.00              373.00,398.00 371.00,398.00 371.00,398.00              371.06,391.83 375.29,391.01 379.38,387.24              379.38,387.24 391.00,373.00 391.00,373.00              392.15,376.47 389.94,378.11 388.00,381.00 Z            M 291.00,376.00            C 291.00,376.00 292.00,377.00 292.00,377.00              292.00,377.00 292.00,376.00 292.00,376.00              292.00,376.00 291.00,376.00 291.00,376.00 Z            M 300.00,397.00            C 300.00,397.00 300.00,385.00 300.00,385.00              298.49,388.77 298.11,393.34 300.00,397.00 Z            M 352.00,386.00            C 350.64,389.06 348.36,391.71 347.57,395.00              346.70,398.63 348.42,407.86 340.00,413.00              342.43,425.39 330.13,431.56 331.00,442.00              332.13,438.01 333.46,433.38 337.00,431.00              337.00,431.00 331.24,445.72 331.24,445.72              330.41,448.76 331.31,449.79 329.81,454.00              329.81,454.00 324.32,467.83 324.32,467.83              324.32,467.83 320.98,474.04 320.98,474.04              318.90,479.30 319.42,481.65 318.59,485.00              318.59,485.00 315.34,494.00 315.34,494.00              315.34,494.00 314.57,502.00 314.57,502.00              313.67,508.30 310.60,517.11 312.00,523.00              312.00,523.00 314.00,511.00 314.00,511.00              314.00,511.00 316.00,511.00 316.00,511.00              316.00,511.00 312.17,534.00 312.17,534.00              312.17,534.00 309.00,568.00 309.00,568.00              309.00,568.00 315.00,561.00 315.00,561.00              312.83,558.66 314.11,556.83 315.00,554.00              315.00,554.00 313.00,551.00 313.00,551.00              313.00,551.00 316.00,550.00 316.00,550.00              316.00,550.00 316.00,548.00 316.00,548.00              316.00,548.00 314.00,548.00 314.00,548.00              315.86,544.38 322.30,537.79 325.35,533.96              325.35,533.96 341.36,511.00 341.36,511.00              341.36,511.00 350.04,495.17 350.04,495.17              350.04,495.17 353.30,487.99 353.30,487.99              356.80,481.81 372.90,460.25 378.00,456.00              378.00,456.00 377.00,461.00 377.00,461.00              377.00,461.00 390.00,447.00 390.00,447.00              387.28,451.73 382.69,459.30 378.00,462.00              377.94,468.70 373.78,468.51 370.67,473.17              370.67,473.17 368.26,479.00 368.26,479.00              368.26,479.00 364.57,484.00 364.57,484.00              364.57,484.00 361.46,489.72 361.46,489.72              361.46,489.72 351.66,502.00 351.66,502.00              349.43,505.58 349.75,507.10 346.76,510.99              346.76,510.99 338.45,522.00 338.45,522.00              338.45,522.00 333.50,528.00 333.50,528.00              333.50,528.00 330.23,535.00 330.23,535.00              326.41,541.52 325.86,538.92 323.00,548.00              326.28,545.28 327.95,542.64 332.00,545.00              332.00,545.00 333.00,540.00 333.00,540.00              333.00,540.00 340.79,528.80 340.79,528.80              340.79,528.80 347.17,522.39 347.17,522.39              347.17,522.39 353.30,514.26 353.30,514.26              353.30,514.26 360.53,507.95 360.53,507.95              360.53,507.95 371.00,491.00 371.00,491.00              371.00,491.00 370.00,494.00 370.00,494.00              370.00,494.00 381.00,481.00 381.00,481.00              381.00,481.00 372.89,494.00 372.89,494.00              372.89,494.00 360.20,512.42 360.20,512.42              360.20,512.42 351.00,525.00 351.00,525.00              351.00,525.00 352.00,523.00 352.00,523.00              344.99,528.72 338.30,538.20 333.61,546.00              331.01,550.31 331.82,550.61 328.00,556.00              336.67,555.55 337.30,548.79 348.00,544.00              342.29,552.96 341.47,550.69 337.13,554.91              334.71,557.26 335.06,558.49 331.11,562.18              327.66,565.41 316.58,571.37 312.00,573.00              312.00,573.00 324.15,558.93 324.15,558.93              324.15,558.93 331.00,550.00 331.00,550.00              331.00,550.00 332.00,546.00 332.00,546.00              332.00,546.00 328.13,546.78 328.13,546.78              328.13,546.78 316.28,561.72 316.28,561.72              316.28,561.72 308.93,572.00 308.93,572.00              308.93,572.00 306.82,587.00 306.82,587.00              306.82,587.00 305.00,599.00 305.00,599.00              305.00,599.00 304.00,622.00 304.00,622.00              304.00,622.00 303.00,639.00 303.00,639.00              303.00,639.00 318.00,641.00 318.00,641.00              318.00,641.00 319.00,638.00 319.00,638.00              319.00,638.00 339.00,643.00 339.00,643.00              339.00,643.00 339.00,645.00 339.00,645.00              335.37,646.03 335.07,646.21 335.00,650.00              335.00,650.00 326.00,645.00 326.00,645.00              326.00,645.00 333.00,656.00 333.00,656.00              333.00,656.00 324.00,649.00 324.00,649.00              324.00,649.00 331.00,659.00 331.00,659.00              326.16,656.59 322.88,652.54 323.00,647.00              323.00,647.00 302.00,640.00 302.00,640.00              302.00,640.00 303.00,652.00 303.00,652.00              303.00,652.00 305.00,648.00 305.00,648.00              305.00,648.00 307.00,653.00 307.00,653.00              304.11,663.20 299.11,669.69 299.00,681.00              299.00,681.00 293.00,683.00 293.00,683.00              293.00,683.00 295.00,667.00 295.00,667.00              297.70,663.33 296.89,660.50 297.59,656.00              298.88,647.72 300.90,639.41 301.00,631.00              301.00,631.00 301.00,616.00 301.00,616.00              301.01,607.06 302.11,607.14 302.83,600.00              302.83,600.00 306.30,571.00 306.30,571.00              306.30,571.00 307.81,563.00 307.81,563.00              307.81,563.00 307.81,556.00 307.81,556.00              307.81,556.00 310.00,534.00 310.00,534.00              310.00,534.00 310.00,523.00 310.00,523.00              310.00,523.00 313.00,493.00 313.00,493.00              313.01,483.98 315.17,474.91 313.00,466.00              317.09,461.35 316.98,457.88 317.00,452.00              317.00,452.00 319.00,452.00 319.00,452.00              319.00,452.00 316.00,481.00 316.00,481.00              316.00,481.00 318.00,481.00 318.00,481.00              318.00,481.00 323.00,460.00 323.00,460.00              323.00,460.00 319.00,461.00 319.00,461.00              319.00,461.00 330.04,434.91 330.04,434.91              330.04,434.91 333.00,426.00 333.00,426.00              333.00,426.00 337.10,416.00 337.10,416.00              337.10,416.00 343.65,402.00 343.65,402.00              343.65,402.00 350.00,386.00 350.00,386.00              350.00,386.00 352.00,386.00 352.00,386.00 Z            M 318.13,406.00            C 317.62,409.52 317.83,412.56 315.00,415.00              315.00,415.00 319.00,387.00 319.00,387.00              321.39,393.02 319.02,399.86 318.13,406.00 Z            M 223.00,390.00            C 228.80,389.58 236.17,396.17 239.00,401.00              239.00,401.00 207.00,390.00 207.00,390.00              207.00,390.00 207.00,388.00 207.00,388.00              211.36,388.00 220.02,386.68 223.00,390.00 Z            M 263.00,406.00            C 257.48,402.54 257.16,393.95 257.00,388.00              257.00,388.00 263.00,406.00 263.00,406.00 Z            M 218.00,391.00            C 218.00,391.00 224.00,391.00 224.00,391.00              224.00,391.00 218.00,391.00 218.00,391.00 Z            M 403.00,390.00            C 401.05,397.19 385.89,411.65 379.00,414.00              379.00,414.00 401.00,390.00 401.00,390.00              401.00,390.00 403.00,390.00 403.00,390.00 Z            M 226.00,393.00            C 226.00,393.00 227.00,394.00 227.00,394.00              227.00,394.00 227.00,393.00 227.00,393.00              227.00,393.00 226.00,393.00 226.00,393.00 Z            M 292.00,394.00            C 292.00,394.00 293.00,395.00 293.00,395.00              293.00,395.00 293.00,394.00 293.00,394.00              293.00,394.00 292.00,394.00 292.00,394.00 Z            M 365.00,395.00            C 365.00,395.00 361.44,402.00 361.44,402.00              361.44,402.00 360.43,408.00 360.43,408.00              360.43,408.00 356.42,419.01 356.42,419.01              356.42,419.01 342.72,445.00 342.72,445.00              342.72,445.00 342.00,450.00 342.00,450.00              343.60,446.75 343.53,446.22 347.00,445.00              347.00,445.00 337.45,461.00 337.45,461.00              337.45,461.00 331.37,473.00 331.37,473.00              331.37,473.00 320.00,497.00 320.00,497.00              320.00,497.00 323.00,489.00 323.00,489.00              323.00,489.00 321.00,489.00 321.00,489.00              321.00,489.00 326.41,478.00 326.41,478.00              326.41,478.00 333.28,461.00 333.28,461.00              335.05,456.92 338.31,452.50 337.00,448.00              344.29,437.06 344.95,433.72 350.37,423.00              350.37,423.00 354.26,416.17 354.26,416.17              357.00,410.19 353.63,410.84 363.00,395.00              363.00,395.00 365.00,395.00 365.00,395.00 Z            M 253.87,413.00            C 260.22,427.94 257.12,424.01 260.30,435.00              260.30,435.00 265.39,449.72 265.39,449.72              267.13,455.98 267.02,457.56 270.00,464.00              272.44,462.16 272.38,471.00 272.58,472.58              272.58,472.58 274.46,484.00 274.46,484.00              274.46,484.00 274.46,491.00 274.46,491.00              274.46,491.00 277.00,501.00 277.00,501.00              277.00,501.00 280.00,500.00 280.00,500.00              280.00,500.00 281.90,510.00 281.90,510.00              281.90,510.00 285.46,519.00 285.46,519.00              285.46,519.00 290.00,535.00 290.00,535.00              290.00,535.00 293.00,533.00 293.00,533.00              293.49,535.70 293.99,536.03 292.00,538.00              292.00,538.00 293.00,541.00 293.00,541.00              286.30,537.24 287.19,532.33 284.68,526.17              284.68,526.17 280.59,517.00 280.59,517.00              280.59,517.00 272.74,499.00 272.74,499.00              272.74,499.00 265.54,482.00 265.54,482.00              265.54,482.00 260.08,472.00 260.08,472.00              260.08,472.00 257.99,464.00 257.99,464.00              255.02,455.53 250.30,458.04 250.00,446.00              250.00,446.00 255.35,454.00 255.35,454.00              255.35,454.00 259.95,462.00 259.95,462.00              259.95,462.00 273.00,491.00 273.00,491.00              273.00,491.00 267.00,463.00 267.00,463.00              267.00,463.00 266.00,466.00 266.00,466.00              266.00,466.00 261.87,448.00 261.87,448.00              261.87,448.00 258.37,438.91 258.37,438.91              258.37,438.91 255.00,421.00 255.00,421.00              255.00,421.00 253.00,422.00 253.00,422.00              253.00,422.00 249.91,410.00 249.91,410.00              249.91,410.00 245.00,396.00 245.00,396.00              250.71,401.20 250.99,406.23 253.87,413.00 Z            M 298.00,402.00            C 298.00,402.00 297.00,398.00 297.00,398.00              297.00,398.00 298.00,402.00 298.00,402.00 Z            M 207.00,405.00            C 215.50,403.95 217.71,411.20 219.00,418.00              209.10,415.07 209.38,405.71 195.00,405.00              195.00,405.00 195.00,403.00 195.00,403.00              198.87,403.00 204.23,401.91 207.00,405.00 Z            M 409.44,414.00            C 406.11,418.24 395.60,427.82 391.00,430.00              396.25,418.82 407.74,413.66 412.00,405.00              414.20,409.12 412.10,410.62 409.44,414.00 Z            M 210.00,407.00            C 210.00,407.00 215.00,410.00 215.00,410.00              215.00,410.00 210.00,407.00 210.00,407.00 Z            M 267.36,416.99            C 267.36,416.99 271.00,435.00 271.00,435.00              267.00,431.72 265.07,413.88 264.00,408.00              267.76,410.62 266.62,412.93 267.36,416.99 Z            M 357.00,410.00            C 357.00,410.00 358.00,411.00 358.00,411.00              358.00,411.00 358.00,410.00 358.00,410.00              358.00,410.00 357.00,410.00 357.00,410.00 Z            M 366.00,422.00            C 366.00,422.00 372.00,410.00 372.00,410.00              372.47,414.05 369.26,419.66 366.00,422.00 Z            M 313.00,435.00            C 313.00,435.00 311.00,435.00 311.00,435.00              311.00,435.00 312.00,413.00 312.00,413.00              312.00,413.00 313.00,435.00 313.00,435.00 Z            M 225.00,428.00            C 225.06,421.59 225.41,419.91 228.00,414.00              228.63,417.48 226.80,424.91 225.00,428.00 Z            M 321.00,415.00            C 319.54,423.09 316.47,425.11 319.00,434.00              319.00,434.00 321.00,431.00 321.00,431.00              321.00,431.00 314.00,454.00 314.00,454.00              313.33,447.49 315.62,440.98 318.00,435.00              315.37,432.42 316.97,423.88 317.00,420.00              317.00,420.00 319.00,415.00 319.00,415.00              319.00,415.00 321.00,415.00 321.00,415.00 Z            M 206.00,428.00            C 206.00,428.00 197.00,422.60 197.00,422.60              192.14,420.83 190.24,423.74 187.00,418.00              195.01,418.02 204.65,418.43 206.00,428.00 Z            M 231.00,441.00            C 231.00,441.00 232.00,436.00 232.00,436.00              232.00,436.00 231.00,454.00 231.00,454.00              231.00,454.00 235.00,453.00 235.00,453.00              235.00,462.90 233.73,478.04 237.00,487.00              237.00,487.00 239.00,478.00 239.00,478.00              238.91,487.86 235.59,497.48 240.00,507.00              240.00,507.00 241.00,497.00 241.00,497.00              241.00,505.15 240.55,511.00 243.00,519.00              243.00,519.00 244.00,515.00 244.00,515.00              243.62,523.20 239.96,529.33 244.00,537.00              244.00,537.00 245.90,528.00 245.90,528.00              245.90,528.00 245.90,535.00 245.90,535.00              245.90,535.00 245.00,546.00 245.00,546.00              245.00,546.00 248.00,535.00 248.00,535.00              247.71,543.02 245.11,555.33 247.00,562.00              247.00,562.00 248.00,552.00 248.00,552.00              248.00,552.00 250.00,552.00 250.00,552.00              250.00,552.00 250.00,577.00 250.00,577.00              250.00,577.00 252.00,570.00 252.00,570.00              252.00,570.00 253.00,589.00 253.00,589.00              253.00,589.00 254.00,585.00 254.00,585.00              254.00,585.00 254.00,594.00 254.00,594.00              254.12,600.74 259.28,611.59 253.00,617.00              254.97,605.98 252.26,609.65 251.33,601.00              251.33,601.00 251.33,593.17 251.33,593.17              251.33,593.17 249.46,586.96 249.46,586.96              249.46,586.96 244.75,563.00 244.75,563.00              243.48,557.56 244.21,549.36 241.00,545.00              242.72,535.23 240.80,538.50 239.90,531.00              239.90,531.00 239.90,521.00 239.90,521.00              239.90,521.00 237.04,505.04 237.04,505.04              237.04,505.04 235.18,498.83 235.18,498.83              235.18,498.83 235.18,491.00 235.18,491.00              234.87,486.09 233.55,485.69 233.11,481.91              233.11,481.91 231.86,463.00 231.86,463.00              231.37,459.38 229.94,458.12 229.30,455.00              229.30,455.00 228.74,445.09 228.74,445.09              228.74,445.09 227.12,438.91 227.12,438.91              226.53,433.51 228.73,425.96 229.00,420.00              229.00,420.00 231.00,441.00 231.00,441.00 Z            M 424.00,420.00            C 424.54,421.81 425.14,423.03 424.69,425.00              423.28,431.19 408.89,444.38 403.00,446.00              403.00,446.00 422.00,420.00 422.00,420.00              422.00,420.00 424.00,420.00 424.00,420.00 Z            M 366.16,430.00            C 363.45,434.54 360.49,441.18 356.00,444.00              356.00,444.00 369.00,422.00 369.00,422.00              369.66,425.61 367.96,426.99 366.16,430.00 Z            M 419.00,426.00            C 419.00,426.00 420.00,427.00 420.00,427.00              420.00,427.00 420.00,426.00 420.00,426.00              420.00,426.00 419.00,426.00 419.00,426.00 Z            M 370.09,441.00            C 373.53,435.66 377.64,428.89 384.00,427.00              384.00,427.00 376.17,438.52 376.17,438.52              376.17,438.52 372.24,445.00 372.24,445.00              372.24,445.00 361.00,462.00 361.00,462.00              361.00,462.00 363.00,461.00 363.00,461.00              363.00,461.00 364.00,462.00 364.00,462.00              364.00,462.00 344.25,488.98 344.25,488.98              344.25,488.98 336.28,499.02 336.28,499.02              336.28,499.02 332.87,508.00 332.87,508.00              332.87,508.00 322.53,530.00 322.53,530.00              322.53,530.00 314.00,544.00 314.00,544.00              312.76,537.61 316.69,531.76 319.14,526.00              319.14,526.00 324.46,515.91 324.46,515.91              325.70,512.70 325.71,507.17 330.51,499.09              336.11,489.67 343.30,486.27 343.00,474.00              352.28,465.01 351.79,457.56 358.00,449.00              357.12,456.82 352.94,462.52 349.71,469.29              349.71,469.29 347.00,476.00 347.00,476.00              352.48,470.92 365.16,448.65 370.09,441.00 Z            M 220.00,458.00            C 220.00,458.00 222.00,457.00 222.00,457.00              222.00,457.00 224.62,472.00 224.62,472.00              224.62,472.00 224.00,486.00 224.00,486.00              224.00,486.00 228.06,484.00 228.06,484.00              224.88,496.03 227.52,489.94 228.06,498.00              228.06,498.00 228.06,505.99 228.06,505.99              228.36,510.38 229.62,510.14 229.39,515.04              229.16,519.97 229.80,523.24 231.00,528.00              231.00,528.00 235.00,525.00 235.00,525.00              234.84,532.33 233.29,542.36 237.00,549.00              233.28,554.12 232.68,562.13 235.00,568.00              235.00,568.00 236.00,562.00 236.00,562.00              236.00,562.00 236.00,567.00 236.00,567.00              236.12,573.95 237.32,572.63 238.46,577.09              238.46,577.09 239.26,583.91 239.26,583.91              240.57,590.98 242.11,590.08 240.00,599.00              244.45,600.85 242.95,605.09 242.00,609.00              249.21,613.66 243.40,617.74 246.00,627.00              246.00,627.00 248.00,623.00 248.00,623.00              248.00,623.00 250.00,627.00 250.00,627.00              250.00,627.00 253.00,625.00 253.00,625.00              253.00,625.00 252.09,635.00 252.09,635.00              252.09,635.00 254.00,655.00 254.00,655.00              254.00,655.00 255.96,650.00 255.96,650.00              255.96,650.00 255.96,660.00 255.96,660.00              255.96,660.00 255.00,674.00 255.00,674.00              255.00,674.00 258.00,659.00 258.00,659.00              258.00,659.00 255.00,682.00 255.00,682.00              255.00,682.00 258.00,672.00 258.00,672.00              258.00,672.00 261.00,672.00 261.00,672.00              261.32,675.93 261.29,676.10 264.00,679.00              264.00,679.00 267.00,673.00 267.00,673.00              266.42,678.60 265.61,678.42 264.52,683.00              263.16,688.75 262.23,698.18 263.00,704.00              259.76,701.09 261.00,695.05 261.00,691.00              261.00,691.00 259.00,691.00 259.00,691.00              259.00,691.00 257.46,706.46 257.46,706.46              257.46,706.46 256.00,708.00 256.00,708.00              256.00,708.00 256.00,687.00 256.00,687.00              256.00,687.00 253.00,695.00 253.00,695.00              253.00,695.00 251.26,685.00 251.26,685.00              251.26,685.00 252.00,670.00 252.00,670.00              252.00,670.00 252.00,674.00 252.00,674.00              252.00,674.00 250.00,674.00 250.00,674.00              250.99,661.83 251.83,661.49 248.00,649.00              248.00,649.00 246.76,656.00 246.76,656.00              247.00,653.40 247.19,648.50 246.76,646.17              246.76,646.17 243.41,639.71 243.41,639.71              242.76,636.95 243.75,634.84 243.41,632.17              243.41,632.17 241.83,626.91 241.83,626.91              241.83,626.91 239.62,615.04 239.62,615.04              239.62,615.04 237.71,596.00 237.71,596.00              237.71,596.00 235.07,581.00 235.07,581.00              235.07,581.00 235.07,574.01 235.07,574.01              234.21,569.51 232.07,569.24 231.12,564.07              231.12,564.07 231.12,553.04 231.12,553.04              231.12,553.04 229.55,546.83 229.55,546.83              229.24,544.53 230.62,539.44 229.55,533.00              227.95,520.73 217.50,504.90 219.00,495.00              219.00,495.00 221.00,498.00 221.00,498.00              221.46,491.36 214.22,475.80 211.55,469.00              209.84,464.65 207.24,460.56 209.00,456.00              209.90,460.97 211.63,466.18 215.00,470.00              215.00,470.00 220.33,487.00 220.33,487.00              220.33,487.00 226.00,509.00 226.00,509.00              226.00,509.00 221.53,479.01 221.53,479.01              221.53,479.01 219.20,471.83 219.20,471.83              219.20,471.83 216.72,458.00 216.72,458.00              213.89,446.92 214.28,448.00 214.75,437.00              214.90,433.36 213.96,433.35 216.00,430.00              220.88,441.29 220.00,446.22 220.00,458.00 Z            M 378.00,433.00            C 378.00,433.00 379.00,434.00 379.00,434.00              379.00,434.00 379.00,433.00 379.00,433.00              379.00,433.00 378.00,433.00 378.00,433.00 Z            M 377.00,434.00            C 377.00,434.00 378.00,435.00 378.00,435.00              378.00,435.00 378.00,434.00 378.00,434.00              378.00,434.00 377.00,434.00 377.00,434.00 Z            M 198.00,440.00            C 198.00,440.00 198.00,442.00 198.00,442.00              192.05,442.96 181.17,440.19 179.00,434.00              188.75,434.46 189.62,436.82 198.00,440.00 Z            M 274.01,439.29            C 274.01,439.29 278.18,455.89 278.18,455.89              278.18,455.89 278.18,459.00 278.18,459.00              278.18,459.00 272.00,437.00 272.00,437.00              272.00,437.00 274.01,439.29 274.01,439.29 Z            M 435.00,437.00            C 433.06,442.55 431.08,442.84 427.40,447.09              422.16,453.15 418.60,459.41 411.00,463.00              412.35,453.27 425.59,439.55 435.00,437.00 Z            M 328.00,456.00            C 328.00,456.00 330.00,442.00 330.00,442.00              325.96,446.31 324.01,451.07 328.00,456.00 Z            M 216.00,444.00            C 216.00,444.00 217.00,445.00 217.00,445.00              217.00,445.00 217.00,444.00 217.00,444.00              217.00,444.00 216.00,444.00 216.00,444.00 Z            M 309.08,457.00            C 309.08,457.00 309.08,466.00 309.08,466.00              309.08,466.00 307.00,466.00 307.00,466.00              307.07,458.25 307.88,450.47 310.00,443.00              311.84,447.78 309.66,452.08 309.08,457.00 Z            M 217.00,451.00            C 217.00,451.00 217.00,446.00 217.00,446.00              217.00,446.00 217.00,451.00 217.00,451.00 Z            M 392.56,456.00            C 392.56,456.00 387.45,474.00 387.45,474.00              386.54,478.02 387.79,479.46 384.00,482.00              384.16,474.79 387.32,462.56 390.35,456.00              392.56,451.23 394.16,450.78 396.00,445.00              397.77,450.07 394.57,451.64 392.56,456.00 Z            M 329.00,449.00            C 329.00,449.00 330.00,450.00 330.00,450.00              330.00,450.00 330.00,449.00 330.00,449.00              330.00,449.00 329.00,449.00 329.00,449.00 Z            M 241.40,460.00            C 241.40,460.00 251.00,485.00 251.00,485.00              246.68,482.22 242.48,471.03 243.00,466.00              239.65,463.43 237.05,454.23 236.00,450.00              236.00,450.00 241.40,460.00 241.40,460.00 Z            M 186.00,457.00            C 189.21,457.72 188.98,457.89 190.00,461.00              190.00,461.00 175.00,456.09 175.00,456.09              171.39,454.89 169.30,455.32 167.00,452.00              173.37,452.00 182.06,450.93 186.00,457.00 Z            M 445.00,453.00            C 445.00,453.00 446.00,454.00 446.00,454.00              446.00,454.00 446.00,456.00 446.00,456.00              441.78,459.02 435.71,463.41 432.31,467.17              427.94,472.00 427.23,475.91 421.00,479.00              423.20,470.11 436.43,456.35 445.00,453.00 Z            M 196.26,463.96            C 196.26,463.96 201.28,471.46 201.28,471.46              202.25,473.90 201.93,478.82 202.44,482.00              204.10,492.53 207.00,490.46 207.86,496.04              208.55,500.56 207.27,505.52 207.23,510.00              207.21,513.55 209.01,526.55 210.00,530.00              210.00,530.00 210.00,517.00 210.00,517.00              210.00,517.00 212.00,517.00 212.00,517.00              212.00,517.00 211.00,536.00 211.00,536.00              211.00,536.00 215.00,520.00 215.00,520.00              216.61,527.91 212.32,535.11 219.00,542.00              219.00,542.00 219.00,536.00 219.00,536.00              219.00,536.00 221.00,536.00 221.00,536.00              220.91,545.54 217.63,562.71 222.00,571.00              222.00,571.00 223.00,562.00 223.00,562.00              223.00,567.97 222.15,572.59 225.00,578.00              225.00,578.00 226.00,568.00 226.00,568.00              229.74,574.12 228.55,577.46 229.17,584.00              229.38,586.23 230.01,588.60 229.86,590.83              229.01,596.40 225.42,597.19 229.86,605.00              229.86,605.00 229.00,594.00 229.00,594.00              232.00,596.69 230.54,599.21 231.47,602.83              231.47,602.83 233.53,609.04 233.53,609.04              233.53,609.04 234.46,619.00 234.46,619.00              235.27,623.61 236.82,626.35 235.00,631.00              235.00,631.00 234.00,628.00 234.00,628.00              234.00,628.00 237.00,648.00 237.00,648.00              237.00,643.25 236.53,640.25 239.00,636.00              239.00,636.00 239.00,652.00 239.00,652.00              239.00,652.00 235.00,651.00 235.00,651.00              235.00,651.00 230.00,634.00 230.00,634.00              230.00,634.00 233.00,637.00 233.00,637.00              232.87,622.72 225.31,614.94 219.66,602.83              219.66,602.83 215.00,586.00 215.00,586.00              215.00,586.00 212.00,587.00 212.00,587.00              207.95,576.62 207.00,573.22 207.00,562.00              207.00,562.00 209.00,562.00 209.00,562.00              209.00,562.00 211.00,576.00 211.00,576.00              211.00,576.00 215.00,574.00 215.00,574.00              215.00,574.00 218.00,593.00 218.00,593.00              225.59,596.85 222.77,597.09 226.30,609.00              227.53,613.19 229.67,617.33 232.00,621.00              231.68,610.88 226.45,604.00 225.43,600.00              225.43,600.00 224.00,580.00 224.00,580.00              224.00,580.00 221.00,581.00 221.00,581.00              221.00,581.00 219.00,572.00 219.00,572.00              219.00,572.00 219.00,581.00 219.00,581.00              219.00,581.00 217.00,581.00 217.00,581.00              216.96,566.81 213.30,563.73 209.88,552.00              209.88,552.00 208.09,544.01 208.09,544.01              208.09,544.01 201.77,528.00 201.77,528.00              201.77,528.00 196.93,509.58 196.93,509.58              193.67,500.15 185.72,490.11 190.00,480.00              190.00,480.00 192.28,489.95 192.28,489.95              194.47,495.15 199.20,497.15 197.00,508.00              197.00,508.00 200.00,512.00 200.00,512.00              200.00,512.00 202.00,507.00 202.00,507.00              202.00,516.08 201.45,524.76 206.00,533.00              206.00,533.00 204.00,525.00 204.00,525.00              207.56,520.28 205.71,517.28 205.17,512.00              204.43,504.73 205.50,496.64 202.00,490.00              202.00,490.00 203.00,495.00 203.00,495.00              198.07,491.16 201.72,487.19 198.00,477.00              198.00,477.00 197.00,483.00 197.00,483.00              197.00,483.00 196.00,467.00 196.00,467.00              196.00,467.00 193.00,469.00 193.00,469.00              192.95,463.73 192.70,460.64 190.00,456.00              194.81,458.56 193.91,459.63 196.26,463.96 Z            M 324.00,457.00            C 324.00,457.00 325.00,458.00 325.00,458.00              325.00,458.00 325.00,457.00 325.00,457.00              325.00,457.00 324.00,457.00 324.00,457.00 Z            M 404.22,464.00            C 401.51,470.56 402.50,473.08 397.00,480.00              397.39,474.86 403.70,460.14 407.00,456.00              407.20,459.53 405.51,460.87 404.22,464.00 Z            M 326.00,458.00            C 326.00,458.00 327.00,459.00 327.00,459.00              327.00,459.00 327.00,458.00 327.00,458.00              327.00,458.00 326.00,458.00 326.00,458.00 Z            M 267.00,461.00            C 267.00,461.00 268.00,462.00 268.00,462.00              268.00,462.00 268.00,461.00 268.00,461.00              268.00,461.00 267.00,461.00 267.00,461.00 Z            M 324.00,462.00            C 324.00,462.00 325.00,463.00 325.00,463.00              325.00,463.00 325.00,462.00 325.00,462.00              325.00,462.00 324.00,462.00 324.00,462.00 Z            M 284.78,476.00            C 284.78,476.00 287.65,484.00 287.65,484.00              287.65,484.00 292.35,498.42 292.35,498.42              294.11,503.13 294.65,506.97 298.00,511.00              298.00,511.00 299.08,518.00 299.08,518.00              299.08,518.00 299.08,532.00 299.08,532.00              298.88,540.56 291.36,554.52 295.00,566.00              295.00,566.00 301.54,533.00 301.54,533.00              301.54,533.00 304.00,514.00 304.00,514.00              304.00,514.00 305.00,523.00 305.00,523.00              305.00,523.00 305.00,501.00 305.00,501.00              305.00,501.00 306.82,501.00 306.82,501.00              306.82,501.00 306.82,522.00 306.82,522.00              306.82,522.00 306.82,530.00 306.82,530.00              306.82,530.00 301.90,546.00 301.90,546.00              301.90,546.00 300.00,555.00 300.00,555.00              300.00,555.00 298.00,553.00 298.00,553.00              298.00,553.00 299.00,561.00 299.00,561.00              299.00,561.00 298.00,558.00 298.00,558.00              300.48,560.48 298.80,562.88 298.00,566.00              298.00,566.00 301.00,567.00 301.00,567.00              301.00,567.00 306.00,544.00 306.00,544.00              306.00,544.00 308.00,544.00 308.00,544.00              307.37,549.92 305.72,551.44 304.43,557.00              304.43,557.00 302.61,565.72 302.61,565.72              302.61,565.72 299.44,576.00 299.44,576.00              299.44,576.00 297.90,583.83 297.90,583.83              297.90,583.83 289.64,602.00 289.64,602.00              287.64,606.54 286.82,606.56 284.90,610.00              281.70,615.75 279.31,624.57 281.00,631.00              281.60,618.28 288.23,615.09 288.00,607.00              288.00,607.00 291.00,606.00 291.00,606.00              291.00,606.00 290.00,609.00 290.00,609.00              298.30,598.76 296.58,588.22 302.00,580.00              301.94,600.07 295.25,611.28 293.00,628.00              293.00,628.00 290.00,627.00 290.00,627.00              291.54,634.93 287.08,639.97 284.26,647.00              282.88,650.43 283.05,652.64 280.00,655.00              280.00,655.00 280.00,641.00 280.00,641.00              280.00,641.00 274.67,655.00 274.67,655.00              274.67,655.00 271.00,667.00 271.00,667.00              271.00,667.00 272.63,654.28 272.63,654.28              272.63,654.28 272.63,647.00 272.63,647.00              272.63,647.00 275.00,635.00 275.00,635.00              275.00,635.00 276.00,623.00 276.00,623.00              276.00,623.00 269.23,640.00 269.23,640.00              269.23,640.00 269.23,650.00 269.23,650.00              269.23,650.00 267.00,650.00 267.00,650.00              267.00,650.00 269.19,627.00 269.19,627.00              269.19,627.00 271.00,616.00 271.00,616.00              271.00,616.00 269.00,621.00 269.00,621.00              269.00,621.00 275.00,602.00 275.00,602.00              275.00,602.00 279.00,601.00 279.00,601.00              279.00,601.00 278.09,608.00 278.09,608.00              276.57,614.53 273.24,619.98 274.00,627.00              275.58,618.28 279.64,611.23 282.14,603.00              282.14,603.00 285.90,581.00 285.90,581.00              287.49,574.46 289.67,571.92 290.77,568.28              290.77,568.28 292.44,556.00 292.44,556.00              293.51,549.32 295.44,542.37 295.23,535.58              294.85,523.18 295.35,522.07 291.18,510.00              290.26,506.71 288.28,502.68 291.18,500.00              287.99,494.06 286.76,490.74 287.00,484.00              282.24,480.35 282.03,468.76 281.00,463.00              285.28,467.57 283.21,470.33 284.78,476.00 Z            M 359.00,464.00            C 359.00,464.00 360.00,465.00 360.00,465.00              360.00,465.00 360.00,464.00 360.00,464.00              360.00,464.00 359.00,464.00 359.00,464.00 Z            M 372.00,468.00            C 372.00,468.00 376.00,465.00 376.00,465.00              376.00,465.00 372.00,468.00 372.00,468.00 Z            M 315.00,466.00            C 315.00,466.00 316.00,467.00 316.00,467.00              316.00,467.00 316.00,466.00 316.00,466.00              316.00,466.00 315.00,466.00 315.00,466.00 Z            M 163.00,470.00            C 165.98,469.91 166.10,469.65 168.00,472.00              168.00,472.00 171.00,471.00 171.00,471.00              174.72,475.16 176.45,472.88 178.00,480.00              178.00,480.00 166.00,473.40 166.00,473.40              166.00,473.40 156.00,468.00 156.00,468.00              159.51,467.32 160.70,467.06 163.00,470.00 Z            M 455.00,469.00            C 453.33,476.98 448.47,480.28 443.32,485.75              438.62,490.75 437.86,493.80 430.00,495.00              433.22,488.21 436.81,487.44 442.00,482.82              446.86,478.48 449.63,474.46 453.00,469.00              453.00,469.00 455.00,469.00 455.00,469.00 Z            M 170.00,473.00            C 170.00,473.00 171.00,474.00 171.00,474.00              171.00,474.00 171.00,473.00 171.00,473.00              171.00,473.00 170.00,473.00 170.00,473.00 Z            M 347.00,481.00            C 350.46,478.93 351.71,476.76 353.00,473.00              353.00,473.00 347.00,481.00 347.00,481.00 Z            M 412.53,480.00            C 412.53,480.00 405.00,497.00 405.00,497.00              406.92,486.86 409.14,481.42 415.00,473.00              415.00,473.00 412.53,480.00 412.53,480.00 Z            M 346.00,477.00            C 346.00,477.00 347.00,478.00 347.00,478.00              347.00,478.00 347.00,477.00 347.00,477.00              347.00,477.00 346.00,477.00 346.00,477.00 Z            M 303.53,495.00            C 302.84,498.08 303.00,501.82 303.00,505.00              303.00,505.00 301.00,505.00 301.00,505.00              301.00,505.00 305.00,480.00 305.00,480.00              307.81,485.09 304.67,489.90 303.53,495.00 Z            M 344.00,487.00            C 344.00,487.00 347.00,481.00 347.00,481.00              344.61,483.17 343.66,483.66 344.00,487.00 Z            M 157.00,486.00            C 162.14,486.86 167.35,490.99 169.00,496.00              160.78,493.76 160.39,491.77 154.00,488.90              148.70,486.52 145.99,487.82 143.00,482.00              148.70,481.30 153.46,480.52 157.00,486.00 Z            M 359.00,482.00            C 359.00,482.00 351.00,497.00 351.00,497.00              355.86,494.22 359.96,489.84 359.00,484.00              359.00,484.00 361.00,482.00 361.00,482.00              361.00,482.00 359.00,482.00 359.00,482.00 Z            M 393.03,500.00            C 391.92,503.46 392.00,505.68 389.00,508.00              389.00,508.00 392.00,495.00 392.00,495.00              394.95,491.37 396.51,486.63 397.00,482.00              399.34,488.10 394.86,494.27 393.03,500.00 Z            M 464.00,483.00            C 463.87,485.29 463.91,486.68 462.88,488.83              459.77,495.32 446.64,506.19 440.00,509.00              440.00,509.00 452.70,495.71 452.70,495.71              452.70,495.71 462.00,483.00 462.00,483.00              462.00,483.00 464.00,483.00 464.00,483.00 Z            M 188.12,519.00            C 188.12,519.00 192.99,534.00 192.99,534.00              194.21,540.42 190.94,543.85 195.00,550.00              195.00,550.00 199.00,590.00 199.00,590.00              199.00,590.00 197.00,590.00 197.00,590.00              196.23,586.51 193.09,581.88 196.00,579.00              196.00,579.00 182.13,541.00 182.13,541.00              182.13,541.00 172.00,515.00 172.00,515.00              172.00,515.00 175.00,516.00 175.00,516.00              172.70,512.12 168.61,504.47 170.00,500.00              170.00,500.00 176.00,514.99 176.00,514.99              176.00,514.99 178.64,522.08 178.64,522.08              178.64,522.08 177.00,526.00 177.00,526.00              177.00,526.00 183.00,536.00 183.00,536.00              183.57,543.00 185.70,543.36 188.45,549.00              191.07,554.36 191.48,558.30 195.00,564.00              195.00,564.00 193.20,557.00 193.20,557.00              193.20,557.00 192.07,549.00 192.07,549.00              192.07,549.00 187.00,534.00 187.00,534.00              187.00,534.00 192.00,543.00 192.00,543.00              192.00,543.00 190.00,526.00 190.00,526.00              188.48,525.19 187.93,525.16 186.70,523.71              183.82,520.30 180.24,507.67 180.04,503.00              179.78,497.08 181.13,492.87 177.00,488.00              177.00,488.00 177.00,484.00 177.00,484.00              185.31,492.97 185.64,507.73 188.12,519.00 Z            M 380.95,498.00            C 379.01,502.61 379.18,508.80 375.00,512.00              380.33,493.80 376.74,501.97 386.00,484.00              387.26,489.08 382.85,493.50 380.95,498.00 Z            M 429.00,484.00            C 429.00,484.00 419.82,498.00 419.82,498.00              418.66,500.56 419.02,503.34 418.24,506.00              415.82,514.19 412.04,523.14 404.00,527.00              404.00,527.00 411.57,516.99 411.57,516.99              411.57,516.99 415.03,509.00 415.03,509.00              416.08,506.85 418.90,503.30 416.00,502.00              417.47,495.09 423.16,489.73 427.00,484.00              427.00,484.00 429.00,484.00 429.00,484.00 Z            M 436.00,489.00            C 436.00,489.00 437.00,490.00 437.00,490.00              437.00,490.00 437.00,489.00 437.00,489.00              437.00,489.00 436.00,489.00 436.00,489.00 Z            M 340.00,490.00            C 340.00,490.00 341.00,491.00 341.00,491.00              341.00,491.00 341.00,490.00 341.00,490.00              341.00,490.00 340.00,490.00 340.00,490.00 Z            M 339.00,491.00            C 339.00,491.00 340.00,492.00 340.00,492.00              340.00,492.00 340.00,491.00 340.00,491.00              340.00,491.00 339.00,491.00 339.00,491.00 Z            M 254.69,504.00            C 258.42,511.83 263.05,519.47 265.00,528.00              265.00,528.00 268.00,526.00 268.00,526.00              269.73,530.13 273.30,536.64 272.00,541.00              272.00,541.00 267.00,528.00 267.00,528.00              267.00,528.00 264.00,529.00 264.00,529.00              264.00,529.00 259.37,517.00 259.37,517.00              259.37,517.00 254.04,507.91 254.04,507.91              254.04,507.91 247.00,496.00 247.00,496.00              247.00,496.00 245.00,491.00 245.00,491.00              250.64,494.11 252.07,498.51 254.69,504.00 Z            M 273.00,493.00            C 273.00,493.00 274.00,494.00 274.00,494.00              274.00,494.00 274.00,493.00 274.00,493.00              274.00,493.00 273.00,493.00 273.00,493.00 Z            M 274.00,495.00            C 274.00,495.00 275.00,496.00 275.00,496.00              275.00,496.00 275.00,495.00 275.00,495.00              275.00,495.00 274.00,495.00 274.00,495.00 Z            M 368.00,496.00            C 368.00,496.00 369.00,497.00 369.00,497.00              369.00,497.00 369.00,496.00 369.00,496.00              369.00,496.00 368.00,496.00 368.00,496.00 Z            M 410.00,496.00            C 410.00,496.00 395.00,529.00 395.00,529.00              395.00,529.00 398.00,526.00 398.00,526.00              398.00,526.00 389.00,548.00 389.00,548.00              384.65,550.70 383.90,554.19 385.00,559.00              385.00,559.00 390.00,549.00 390.00,549.00              389.72,557.68 387.99,555.80 384.40,562.09              381.21,567.67 381.20,570.86 379.87,574.04              377.49,579.71 375.43,579.46 374.00,587.00              374.00,587.00 384.00,579.00 384.00,579.00              384.00,579.00 386.00,581.00 386.00,581.00              389.74,573.55 390.70,571.44 392.00,563.00              388.81,566.24 388.48,567.53 388.00,572.00              388.00,572.00 386.00,572.00 386.00,572.00              386.69,564.63 388.44,564.32 393.00,559.00              393.00,559.00 391.00,559.00 391.00,559.00              391.00,559.00 397.00,548.00 397.00,548.00              397.00,548.00 395.00,548.00 395.00,548.00              395.00,548.00 407.09,529.59 407.09,529.59              407.09,529.59 410.00,528.00 410.00,528.00              410.00,528.00 400.66,544.00 400.66,544.00              400.66,544.00 398.76,551.00 398.76,551.00              398.76,551.00 396.38,556.00 396.38,556.00              396.38,556.00 393.00,565.00 393.00,565.00              393.00,565.00 403.00,554.00 403.00,554.00              403.00,554.00 406.00,555.00 406.00,555.00              406.00,555.00 397.05,568.00 397.05,568.00              397.05,568.00 392.74,576.42 392.74,576.42              392.74,576.42 384.42,587.00 384.42,587.00              381.77,590.75 382.44,592.31 381.02,594.56              378.94,597.87 374.51,600.50 371.00,602.00              371.00,602.00 370.00,598.00 370.00,598.00              370.00,598.00 365.00,611.00 365.00,611.00              365.00,611.00 376.00,604.00 376.00,604.00              373.63,608.12 366.34,614.02 362.00,616.00              362.78,612.76 363.20,612.59 361.00,610.00              361.00,610.00 361.00,603.00 361.00,603.00              359.97,607.15 360.65,609.56 357.00,612.00              357.00,612.00 360.80,601.00 360.80,601.00              360.80,601.00 366.00,589.00 366.00,589.00              366.00,589.00 363.00,593.00 363.00,593.00              363.00,593.00 362.00,587.00 362.00,587.00              360.84,590.98 359.45,594.54 356.00,597.00              356.00,597.00 363.00,583.00 363.00,583.00              363.00,583.00 360.00,582.00 360.00,582.00              360.00,582.00 363.79,568.00 363.79,568.00              363.79,568.00 365.04,558.00 365.04,558.00              365.04,558.00 368.00,547.00 368.00,547.00              368.00,547.00 373.00,539.00 373.00,539.00              373.00,539.00 367.00,562.00 367.00,562.00              367.00,562.00 367.00,560.00 367.00,560.00              367.00,560.00 368.00,560.00 368.00,560.00              368.00,560.00 363.00,582.00 363.00,582.00              363.00,582.00 366.00,581.00 366.00,581.00              366.00,581.00 367.00,578.00 367.00,578.00              367.00,578.00 373.00,576.00 373.00,576.00              373.00,576.00 376.67,571.99 376.67,571.99              376.67,571.99 381.86,558.01 381.86,558.01              381.86,558.01 384.18,548.97 384.18,548.97              384.18,548.97 386.76,543.42 386.76,543.42              386.76,543.42 390.45,533.00 390.45,533.00              390.45,533.00 402.44,506.04 402.44,506.04              402.44,506.04 408.00,496.00 408.00,496.00              408.00,496.00 410.00,496.00 410.00,496.00 Z            M 154.00,507.00            C 148.66,506.03 135.90,502.46 133.00,498.00              139.61,498.19 150.78,500.91 154.00,507.00 Z            M 183.00,499.00            C 183.00,499.00 184.00,500.00 184.00,500.00              184.00,500.00 184.00,499.00 184.00,499.00              184.00,499.00 183.00,499.00 183.00,499.00 Z            M 329.00,508.00            C 329.00,508.00 333.00,501.00 333.00,501.00              333.00,501.00 329.00,508.00 329.00,508.00 Z            M 220.00,502.00            C 220.00,502.00 221.00,503.00 221.00,503.00              221.00,503.00 221.00,502.00 221.00,502.00              221.00,502.00 220.00,502.00 220.00,502.00 Z            M 467.57,512.00            C 462.57,519.65 456.76,527.43 447.00,528.00              447.00,528.00 458.91,515.99 458.91,515.99              458.91,515.99 471.00,502.00 471.00,502.00              472.17,506.07 469.78,508.62 467.57,512.00 Z            M 221.00,504.00            C 221.00,504.00 222.00,505.00 222.00,505.00              222.00,505.00 222.00,504.00 222.00,504.00              222.00,504.00 221.00,504.00 221.00,504.00 Z            M 383.00,531.00            C 383.00,531.00 389.00,510.00 389.00,510.00              390.85,515.07 386.21,526.80 383.00,531.00 Z            M 172.00,525.00            C 172.00,525.00 168.00,522.00 168.00,522.00              168.00,522.00 179.00,548.00 179.00,548.00              179.00,548.00 185.14,566.17 185.14,566.17              185.14,566.17 191.00,578.00 191.00,578.00              191.00,578.00 197.00,594.00 197.00,594.00              198.71,589.46 200.64,594.93 201.47,597.00              201.47,597.00 208.35,614.00 208.35,614.00              213.18,628.26 209.46,626.44 211.75,636.00              211.75,636.00 217.26,654.00 217.26,654.00              217.26,654.00 220.30,668.00 220.30,668.00              222.81,676.93 226.07,679.23 222.00,689.00              225.68,690.73 227.15,691.26 229.00,695.00              229.00,695.00 231.00,694.00 231.00,694.00              231.00,694.00 233.00,697.00 233.00,697.00              226.86,697.15 220.83,690.85 216.00,687.22              202.77,677.25 210.43,681.89 202.81,672.91              202.81,672.91 188.58,656.00 188.58,656.00              186.86,653.20 187.27,651.91 186.19,649.28              186.19,649.28 182.02,641.00 182.02,641.00              179.54,636.24 172.32,629.10 172.00,625.00              172.00,625.00 177.93,631.32 177.93,631.32              177.93,631.32 187.88,648.00 187.88,648.00              187.88,648.00 211.43,679.70 211.43,679.70              211.43,679.70 222.00,688.00 222.00,688.00              214.71,672.68 209.41,671.08 204.16,662.00              201.78,657.89 202.95,656.49 201.03,653.00              201.03,653.00 191.40,639.91 191.40,639.91              191.40,639.91 187.44,629.00 187.44,629.00              187.44,629.00 180.70,619.00 180.70,619.00              180.70,619.00 170.90,597.44 170.90,597.44              169.67,596.15 169.45,596.41 168.00,596.00              168.00,596.00 164.45,587.00 164.45,587.00              164.45,587.00 160.28,580.00 160.28,580.00              160.28,580.00 152.47,562.28 152.47,562.28              147.59,553.53 143.02,551.15 141.00,540.00              144.93,541.53 145.90,545.47 148.18,549.00              148.18,549.00 159.19,567.00 159.19,567.00              161.85,571.62 164.57,574.45 165.00,580.00              165.00,580.00 174.00,597.00 174.00,597.00              174.00,597.00 172.89,590.49 172.89,590.49              172.89,590.49 165.33,571.00 165.33,571.00              161.72,563.78 156.76,559.12 156.00,551.00              156.00,551.00 159.00,552.00 159.00,552.00              159.00,552.00 147.00,533.00 147.00,533.00              147.00,533.00 150.00,534.00 150.00,534.00              150.00,534.00 147.00,524.00 147.00,524.00              147.00,524.00 154.99,539.00 154.99,539.00              154.99,539.00 164.40,558.00 164.40,558.00              164.40,558.00 166.40,569.00 166.40,569.00              166.40,569.00 177.25,596.00 177.25,596.00              177.25,596.00 179.42,605.00 179.42,605.00              179.42,605.00 189.01,626.00 189.01,626.00              189.01,626.00 196.05,638.00 196.05,638.00              196.05,638.00 208.00,656.00 208.00,656.00              208.00,656.00 204.00,655.00 204.00,655.00              204.00,655.00 217.00,675.00 217.00,675.00              217.00,675.00 214.00,665.00 214.00,665.00              214.00,665.00 215.00,665.00 215.00,665.00              215.00,665.00 217.00,667.00 217.00,667.00              215.71,663.65 212.74,654.32 212.19,651.00              212.19,651.00 209.28,632.09 209.28,632.09              209.28,632.09 205.86,625.91 205.86,625.91              205.86,625.91 202.75,615.72 202.75,615.72              202.75,615.72 198.03,605.17 198.03,605.17              198.03,605.17 194.62,594.17 194.62,594.17              194.62,594.17 189.75,582.00 189.75,582.00              189.75,582.00 180.41,560.04 180.41,560.04              180.41,560.04 169.15,530.00 169.15,530.00              166.42,522.84 164.92,516.20 159.00,511.00              168.07,511.31 170.80,516.69 172.00,525.00 Z            M 145.00,522.00            C 140.24,521.95 126.06,518.77 122.57,515.87              121.35,514.85 121.46,514.29 121.00,513.00              129.72,513.56 140.50,512.79 145.00,522.00 Z            M 433.00,513.00            C 433.00,513.00 426.04,535.00 426.04,535.00              426.04,535.00 423.49,547.00 423.49,547.00              423.49,547.00 417.43,563.17 417.43,563.17              417.43,563.17 414.50,576.00 414.50,576.00              414.50,576.00 411.00,594.00 411.00,594.00              411.00,594.00 416.37,585.00 416.37,585.00              416.37,585.00 430.54,553.28 430.54,553.28              430.54,553.28 433.91,540.00 433.91,540.00              433.91,540.00 438.65,529.00 438.65,529.00              438.65,529.00 441.00,522.00 441.00,522.00              441.00,522.00 441.59,531.00 441.59,531.00              441.19,535.03 437.45,542.89 435.80,547.00              435.80,547.00 421.47,580.00 421.47,580.00              419.20,584.94 414.92,597.06 411.00,600.00              411.01,606.58 406.46,613.21 403.60,619.00              398.31,629.72 391.26,645.04 391.00,657.00              391.00,657.00 388.00,656.00 388.00,656.00              388.00,656.00 382.00,679.00 382.00,679.00              382.00,679.00 396.10,657.00 396.10,657.00              396.10,657.00 404.19,637.00 404.19,637.00              404.19,637.00 409.64,626.91 409.64,626.91              409.64,626.91 415.00,615.00 415.00,615.00              417.76,608.94 422.02,592.07 426.00,589.00              426.00,589.00 425.00,586.00 425.00,586.00              425.00,586.00 432.11,574.00 432.11,574.00              432.11,574.00 441.83,558.00 441.83,558.00              441.83,558.00 449.85,540.48 449.85,540.48              449.85,540.48 454.00,538.00 454.00,538.00              454.00,538.00 453.00,536.00 453.00,536.00              453.00,536.00 464.00,522.00 464.00,522.00              464.00,522.00 456.37,535.00 456.37,535.00              456.37,535.00 450.57,549.00 450.57,549.00              450.57,549.00 439.97,568.00 439.97,568.00              439.97,568.00 431.60,588.00 431.60,588.00              431.60,588.00 422.98,602.00 422.98,602.00              422.98,602.00 418.00,616.00 418.00,616.00              418.00,616.00 404.31,644.00 404.31,644.00              404.31,644.00 394.00,666.00 394.00,666.00              394.00,666.00 405.00,658.00 405.00,658.00              404.22,649.21 408.75,647.32 413.08,640.83              413.08,640.83 421.07,623.58 421.07,623.58              423.95,618.02 429.34,612.61 429.00,606.00              433.07,601.57 433.64,597.57 436.68,592.72              436.68,592.72 452.34,567.97 452.34,567.97              458.78,556.87 460.31,551.03 471.00,542.00              469.01,548.86 460.75,557.87 456.67,564.00              456.67,564.00 445.65,584.96 445.65,584.96              442.92,589.37 440.34,590.28 437.01,596.00              437.01,596.00 429.67,612.00 429.67,612.00              429.67,612.00 421.71,627.00 421.71,627.00              416.79,637.75 411.46,650.82 404.00,660.00              411.68,654.67 419.33,647.13 424.05,639.00              424.05,639.00 434.36,616.00 434.36,616.00              434.36,616.00 451.00,591.00 451.00,591.00              450.12,598.67 442.13,607.48 437.78,614.00              433.31,620.70 430.29,628.33 428.00,636.00              428.00,636.00 435.00,632.00 435.00,632.00              433.62,637.22 431.34,638.71 428.50,643.00              424.37,649.24 417.59,660.60 411.00,664.00              411.00,664.00 411.00,662.00 411.00,662.00              411.00,662.00 396.00,674.00 396.00,674.00              396.00,674.00 393.00,673.00 393.00,673.00              393.00,673.00 386.00,685.00 386.00,685.00              381.51,684.18 379.41,687.37 376.00,690.00              376.00,690.00 382.55,659.00 382.55,659.00              382.55,659.00 387.39,648.00 387.39,648.00              387.39,648.00 394.00,625.00 394.00,625.00              394.00,625.00 378.00,636.00 378.00,636.00              381.01,630.76 386.89,628.46 391.27,624.47              397.66,618.66 398.21,614.38 401.63,607.17              403.40,603.45 404.94,602.35 405.00,598.00              411.47,590.50 411.60,578.18 414.01,569.00              414.01,569.00 420.67,550.00 420.67,550.00              423.85,540.53 422.24,541.88 423.87,536.00              423.87,536.00 431.00,513.00 431.00,513.00              431.00,513.00 433.00,513.00 433.00,513.00 Z            M 354.00,515.00            C 354.00,515.00 355.00,516.00 355.00,516.00              355.00,516.00 355.00,515.00 355.00,515.00              355.00,515.00 354.00,515.00 354.00,515.00 Z            M 379.00,514.00            C 378.79,522.37 377.22,521.91 374.47,529.00              373.29,532.03 373.55,533.81 371.00,536.00              371.00,536.00 377.00,514.00 377.00,514.00              377.00,514.00 379.00,514.00 379.00,514.00 Z            M 167.00,517.00            C 167.00,517.00 168.00,518.00 168.00,518.00              168.00,518.00 168.00,517.00 168.00,517.00              168.00,517.00 167.00,517.00 167.00,517.00 Z            M 354.00,517.00            C 354.00,517.00 355.00,518.00 355.00,518.00              355.00,518.00 355.00,517.00 355.00,517.00              355.00,517.00 354.00,517.00 354.00,517.00 Z            M 250.00,517.00            C 250.00,517.00 260.00,534.00 260.00,534.00              255.19,531.62 249.25,522.08 248.00,517.00              248.00,517.00 250.00,517.00 250.00,517.00 Z            M 353.00,518.00            C 353.00,518.00 354.00,519.00 354.00,519.00              354.00,519.00 354.00,518.00 354.00,518.00              354.00,518.00 353.00,518.00 353.00,518.00 Z            M 168.00,519.00            C 168.00,519.00 169.00,520.00 169.00,520.00              169.00,520.00 169.00,519.00 169.00,519.00              169.00,519.00 168.00,519.00 168.00,519.00 Z            M 470.71,527.70            C 474.76,523.72 475.24,520.63 481.00,519.00              477.87,527.04 465.73,541.14 457.00,543.00              457.00,543.00 461.00,540.00 461.00,540.00              461.06,533.46 466.46,531.89 470.71,527.70 Z            M 361.00,527.00            C 361.00,527.00 370.00,520.00 370.00,520.00              370.00,523.57 363.94,525.88 361.00,527.00 Z            M 425.00,522.00            C 421.46,528.28 416.74,534.12 410.00,537.00              410.00,537.00 423.00,522.00 423.00,522.00              423.00,522.00 425.00,522.00 425.00,522.00 Z            M 321.00,527.00            C 321.00,527.00 322.00,528.00 322.00,528.00              322.00,528.00 322.00,527.00 322.00,527.00              322.00,527.00 321.00,527.00 321.00,527.00 Z            M 342.00,529.00            C 342.00,529.00 343.00,530.00 343.00,530.00              343.00,530.00 343.00,529.00 343.00,529.00              343.00,529.00 342.00,529.00 342.00,529.00 Z            M 370.00,528.00            C 364.83,535.98 363.45,538.14 355.00,543.00              355.00,543.00 361.00,538.00 361.00,538.00              361.00,538.00 359.00,536.00 359.00,536.00              359.00,536.00 368.00,528.00 368.00,528.00              368.00,528.00 370.00,528.00 370.00,528.00 Z            M 394.00,529.00            C 394.00,529.00 395.00,530.00 395.00,530.00              395.00,530.00 395.00,529.00 395.00,529.00              395.00,529.00 394.00,529.00 394.00,529.00 Z            M 393.00,530.00            C 393.00,530.00 394.00,531.00 394.00,531.00              394.00,531.00 394.00,530.00 394.00,530.00              394.00,530.00 393.00,530.00 393.00,530.00 Z            M 316.00,538.00            C 316.00,538.00 320.00,531.00 320.00,531.00              320.00,531.00 316.00,538.00 316.00,538.00 Z            M 340.00,531.00            C 340.00,531.00 341.00,532.00 341.00,532.00              341.00,532.00 341.00,531.00 341.00,531.00              341.00,531.00 340.00,531.00 340.00,531.00 Z            M 361.00,530.00            C 358.79,532.93 357.58,533.04 354.00,533.00              354.00,533.00 361.00,530.00 361.00,530.00 Z            M 125.00,535.00            C 128.41,535.03 128.28,535.05 130.00,538.00              130.00,538.00 111.00,534.00 111.00,534.00              111.00,534.00 111.00,532.00 111.00,532.00              115.68,532.00 122.02,530.73 125.00,535.00 Z            M 120.00,534.00            C 120.00,534.00 121.00,535.00 121.00,535.00              121.00,535.00 121.00,534.00 121.00,534.00              121.00,534.00 120.00,534.00 120.00,534.00 Z            M 381.61,542.00            C 379.61,547.28 377.85,555.85 373.00,559.00              373.00,559.00 383.00,533.00 383.00,533.00              384.18,536.69 382.92,538.53 381.61,542.00 Z            M 271.00,548.00            C 271.00,548.00 272.00,544.00 272.00,544.00              272.00,544.00 281.00,561.00 281.00,561.00              276.99,558.83 276.51,556.94 273.63,553.70              267.89,547.24 263.24,542.85 261.00,534.00              261.00,534.00 271.00,548.00 271.00,548.00 Z            M 152.00,536.00            C 152.00,536.00 153.00,537.00 153.00,537.00              153.00,537.00 153.00,536.00 153.00,536.00              153.00,536.00 152.00,536.00 152.00,536.00 Z            M 285.00,555.00            C 279.39,551.02 276.17,541.66 276.00,535.00              276.00,535.00 285.00,555.00 285.00,555.00 Z            M 291.00,536.00            C 291.00,536.00 292.00,537.00 292.00,537.00              292.00,537.00 292.00,536.00 292.00,536.00              292.00,536.00 291.00,536.00 291.00,536.00 Z            M 437.00,536.00            C 437.00,536.00 435.00,542.00 435.00,542.00              435.00,542.00 439.00,537.00 439.00,537.00              439.00,537.00 437.00,536.00 437.00,536.00 Z            M 464.00,536.00            C 464.00,536.00 465.00,537.00 465.00,537.00              465.00,537.00 465.00,536.00 465.00,536.00              465.00,536.00 464.00,536.00 464.00,536.00 Z            M 489.12,539.84            C 487.89,544.88 473.87,555.25 469.00,557.00              472.11,550.57 477.09,548.77 481.95,543.91              485.44,540.42 485.53,538.66 488.00,535.00              488.94,536.71 489.63,537.75 489.12,539.84 Z            M 213.00,539.00            C 213.00,539.00 214.00,540.00 214.00,540.00              214.00,540.00 214.00,539.00 214.00,539.00              214.00,539.00 213.00,539.00 213.00,539.00 Z            M 352.00,539.00            C 349.83,543.15 347.30,543.65 343.00,542.00              343.00,542.00 352.00,539.00 352.00,539.00 Z            M 414.00,539.00            C 411.99,543.31 406.07,552.00 401.00,552.00              401.00,552.00 412.00,539.00 412.00,539.00              412.00,539.00 414.00,539.00 414.00,539.00 Z            M 214.00,553.00            C 214.00,553.00 214.00,541.00 214.00,541.00              209.34,544.50 210.89,548.91 214.00,553.00 Z            M 216.00,558.00            C 216.00,558.00 216.00,542.00 216.00,542.00              214.47,545.85 214.47,554.15 216.00,558.00 Z            M 142.21,557.00            C 143.43,561.41 142.12,562.61 143.84,566.07              143.84,566.07 151.29,577.00 151.29,577.00              153.78,581.97 151.79,582.48 154.58,586.87              157.17,590.93 163.71,598.18 164.12,602.85              164.12,602.85 164.12,607.17 164.12,607.17              163.82,614.18 171.84,621.04 168.00,625.00              168.00,625.00 176.62,640.00 176.62,640.00              176.62,640.00 183.18,653.00 183.18,653.00              186.29,658.77 189.55,663.11 189.00,670.00              189.00,670.00 188.00,670.00 188.00,670.00              188.00,670.00 186.00,668.00 186.00,668.00              186.00,668.00 190.29,677.00 190.29,677.00              190.29,677.00 197.96,693.96 197.96,693.96              197.96,693.96 203.73,702.04 203.73,702.04              203.73,702.04 212.18,721.00 212.18,721.00              212.18,721.00 218.14,731.00 218.14,731.00              218.14,731.00 221.67,741.00 221.67,741.00              221.67,741.00 239.00,768.00 239.00,768.00              239.00,768.00 237.00,761.00 237.00,761.00              242.63,763.85 244.86,770.35 247.00,776.00              247.00,776.00 250.00,774.00 250.00,774.00              250.00,774.00 253.00,778.00 253.00,778.00              253.00,778.00 251.00,774.00 251.00,774.00              256.01,776.72 257.13,781.23 259.87,786.00              259.87,786.00 273.00,807.00 273.00,807.00              267.08,804.13 267.28,801.82 263.65,797.00              263.65,797.00 251.00,782.00 251.00,782.00              253.15,789.54 260.06,798.26 257.00,806.00              257.00,806.00 253.00,799.00 253.00,799.00              253.00,799.00 254.00,805.00 254.00,805.00              254.00,805.00 252.00,805.00 252.00,805.00              252.00,805.00 252.00,802.00 252.00,802.00              252.00,802.00 249.00,803.00 249.00,803.00              249.00,803.00 243.75,787.96 243.75,787.96              243.75,787.96 241.00,779.00 241.00,779.00              235.87,777.88 235.33,772.39 233.33,768.00              233.33,768.00 224.26,752.00 224.26,752.00              224.26,752.00 219.60,745.61 219.60,745.61              219.60,745.61 217.30,739.83 217.30,739.83              215.23,735.59 209.66,731.64 212.00,727.00              212.00,727.00 196.00,701.00 196.00,701.00              196.00,701.00 198.00,701.00 198.00,701.00              195.17,695.62 189.66,687.90 185.00,684.00              183.83,678.78 179.13,674.95 175.96,670.84              171.24,664.71 167.25,656.66 166.00,649.00              166.00,649.00 163.00,650.00 163.00,650.00              163.00,650.00 139.00,614.00 139.00,614.00              139.00,614.00 140.00,613.00 140.00,613.00              140.00,613.00 142.00,613.00 142.00,613.00              142.00,613.00 146.00,619.00 146.00,619.00              142.12,611.75 132.12,595.89 126.00,591.00              126.46,580.35 111.55,572.88 112.00,565.00              112.00,565.00 131.70,590.58 131.70,590.58              131.70,590.58 134.27,597.00 134.27,597.00              134.27,597.00 142.05,608.17 142.05,608.17              142.05,608.17 145.61,614.72 145.61,614.72              145.61,614.72 157.91,631.17 157.91,631.17              157.91,631.17 171.00,656.00 171.00,656.00              171.29,661.28 174.65,664.87 177.58,669.00              177.58,669.00 194.00,691.00 194.00,691.00              194.00,691.00 185.00,672.00 185.00,672.00              183.75,666.40 174.58,659.94 180.00,655.00              180.00,655.00 166.24,636.83 166.24,636.83              166.24,636.83 166.24,634.00 166.24,634.00              162.37,631.65 162.17,628.88 160.46,625.00              157.72,618.76 149.68,600.80 150.00,595.00              146.77,593.14 139.63,583.50 137.95,579.91              137.95,579.91 133.46,569.00 133.46,569.00              131.76,565.43 129.05,561.97 130.00,558.00              130.00,558.00 135.97,569.09 135.97,569.09              135.97,569.09 140.61,580.00 140.61,580.00              140.61,580.00 149.64,593.17 149.64,593.17              149.64,593.17 165.00,632.00 165.00,632.00              165.00,632.00 169.00,631.00 169.00,631.00              169.00,631.00 165.00,625.00 165.00,625.00              164.77,619.39 160.33,611.41 158.20,606.00              158.20,606.00 152.39,587.72 152.39,587.72              146.23,573.86 134.05,557.24 134.00,542.00              137.42,545.68 140.87,552.16 142.21,557.00 Z            M 232.00,543.00            C 232.00,543.00 233.00,559.00 233.00,559.00              233.00,559.00 234.00,543.00 234.00,543.00              234.00,543.00 232.00,543.00 232.00,543.00 Z            M 354.00,544.00            C 354.00,544.00 353.00,545.00 353.00,545.00              353.00,545.00 353.00,544.00 353.00,544.00              353.00,544.00 354.00,544.00 354.00,544.00 Z            M 407.00,546.00            C 407.00,546.00 408.00,547.00 408.00,547.00              408.00,547.00 408.00,546.00 408.00,546.00              408.00,546.00 407.00,546.00 407.00,546.00 Z            M 260.66,557.83            C 260.66,557.83 273.00,573.00 273.00,573.00              273.00,573.00 276.00,571.00 276.00,571.00              276.00,571.00 282.00,581.00 282.00,581.00              276.19,579.58 275.31,577.14 270.91,573.59              263.63,567.74 258.65,567.01 254.00,557.00              254.00,557.00 257.00,558.00 257.00,558.00              257.00,558.00 251.00,546.00 251.00,546.00              251.00,546.00 260.66,557.83 260.66,557.83 Z            M 448.00,551.00            C 448.00,551.00 449.00,547.00 449.00,547.00              449.00,547.00 448.00,551.00 448.00,551.00 Z            M 234.00,548.00            C 234.00,548.00 235.00,549.00 235.00,549.00              235.00,549.00 235.00,548.00 235.00,548.00              235.00,548.00 234.00,548.00 234.00,548.00 Z            M 271.00,548.00            C 271.00,548.00 272.00,549.00 272.00,549.00              272.00,549.00 272.00,548.00 272.00,548.00              272.00,548.00 271.00,548.00 271.00,548.00 Z            M 317.00,559.00            C 317.00,559.00 323.00,548.00 323.00,548.00              319.31,550.80 315.76,554.00 317.00,559.00 Z            M 118.98,553.50            C 119.84,554.72 119.77,555.66 120.00,557.00              120.00,557.00 101.00,551.00 101.00,551.00              105.41,548.15 115.73,548.87 118.98,553.50 Z            M 137.00,550.00            C 137.00,550.00 138.00,551.00 138.00,551.00              138.00,551.00 138.00,550.00 138.00,550.00              138.00,550.00 137.00,550.00 137.00,550.00 Z            M 138.00,552.00            C 138.00,552.00 139.00,553.00 139.00,553.00              139.00,553.00 139.00,552.00 139.00,552.00              139.00,552.00 138.00,552.00 138.00,552.00 Z            M 162.00,557.00            C 162.00,557.00 160.00,552.00 160.00,552.00              160.00,552.00 162.00,557.00 162.00,557.00 Z            M 363.00,555.00            C 363.00,555.00 355.00,555.00 355.00,555.00              355.00,555.00 363.00,555.00 363.00,555.00 Z            M 485.91,561.54            C 490.82,557.22 490.14,555.29 497.00,554.00              494.92,561.91 485.80,569.95 478.00,572.00              478.00,572.00 477.00,571.00 477.00,571.00              479.08,565.45 481.69,565.25 485.91,561.54 Z            M 348.00,556.00            C 346.51,560.29 343.87,561.16 340.42,564.00              340.42,564.00 332.72,570.25 332.72,570.25              332.72,570.25 326.00,573.76 326.00,573.76              326.00,573.76 317.00,580.00 317.00,580.00              320.21,573.36 327.60,570.08 334.00,567.00              334.00,567.00 333.00,565.00 333.00,565.00              333.00,565.00 345.00,555.00 345.00,555.00              345.00,555.00 348.00,556.00 348.00,556.00 Z            M 159.00,557.00            C 159.00,557.00 160.00,558.00 160.00,558.00              160.00,558.00 160.00,557.00 160.00,557.00              160.00,557.00 159.00,557.00 159.00,557.00 Z            M 345.00,557.00            C 345.00,557.00 346.00,558.00 346.00,558.00              346.00,558.00 346.00,557.00 346.00,557.00              346.00,557.00 345.00,557.00 345.00,557.00 Z            M 377.16,559.11            C 377.16,559.11 370.00,574.00 370.00,574.00              370.35,569.70 370.19,566.52 374.00,564.00              374.00,564.00 377.16,556.00 377.16,556.00              377.16,556.00 377.16,559.11 377.16,559.11 Z            M 160.00,558.00            C 160.00,558.00 161.00,559.00 161.00,559.00              161.00,559.00 161.00,558.00 161.00,558.00              161.00,558.00 160.00,558.00 160.00,558.00 Z            M 328.00,558.00            C 328.00,558.00 329.00,559.00 329.00,559.00              329.00,559.00 329.00,558.00 329.00,558.00              329.00,558.00 328.00,558.00 328.00,558.00 Z            M 341.00,561.00            C 341.00,561.00 345.00,558.00 345.00,558.00              345.00,558.00 341.00,561.00 341.00,561.00 Z            M 327.00,559.00            C 327.00,559.00 328.00,560.00 328.00,560.00              328.00,560.00 328.00,559.00 328.00,559.00              328.00,559.00 327.00,559.00 327.00,559.00 Z            M 361.00,558.00            C 361.00,558.00 348.15,568.75 348.15,568.75              348.15,568.75 322.00,588.00 322.00,588.00              322.00,588.00 321.00,586.00 321.00,586.00              321.00,586.00 322.00,585.00 322.00,585.00              322.00,585.00 309.00,593.00 309.00,593.00              309.00,593.00 311.00,586.00 311.00,586.00              311.00,586.00 332.00,573.00 332.00,573.00              332.00,573.00 319.00,584.00 319.00,584.00              319.00,584.00 337.00,574.00 337.00,574.00              337.00,574.00 334.00,572.00 334.00,572.00              334.00,572.00 346.00,564.00 346.00,564.00              346.00,564.00 344.00,564.00 344.00,564.00              344.00,564.00 344.00,563.00 344.00,563.00              344.00,563.00 361.00,558.00 361.00,558.00 Z            M 287.00,566.00            C 283.48,563.97 283.02,562.83 282.00,559.00              282.00,559.00 287.00,566.00 287.00,566.00 Z            M 325.00,561.00            C 325.00,561.00 317.00,569.00 317.00,569.00              321.16,567.14 324.69,565.01 327.00,561.00              327.00,561.00 325.00,561.00 325.00,561.00 Z            M 339.00,561.00            C 339.00,561.00 340.00,562.00 340.00,562.00              340.00,562.00 340.00,561.00 340.00,561.00              340.00,561.00 339.00,561.00 339.00,561.00 Z            M 297.00,562.00            C 297.00,562.00 298.00,563.00 298.00,563.00              298.00,563.00 298.00,562.00 298.00,562.00              298.00,562.00 297.00,562.00 297.00,562.00 Z            M 163.00,563.00            C 163.00,563.00 164.00,564.00 164.00,564.00              164.00,564.00 164.00,563.00 164.00,563.00              164.00,563.00 163.00,563.00 163.00,563.00 Z            M 110.00,576.00            C 110.00,576.00 92.00,572.00 92.00,572.00              92.00,572.00 92.00,570.00 92.00,570.00              92.00,570.00 96.00,569.00 96.00,569.00              96.00,569.00 93.00,567.00 93.00,567.00              101.51,567.00 107.28,566.09 110.00,576.00 Z            M 218.00,568.00            C 218.00,568.00 219.00,569.00 219.00,569.00              219.00,569.00 219.00,568.00 219.00,568.00              219.00,568.00 218.00,568.00 218.00,568.00 Z            M 295.00,569.00            C 294.91,571.98 294.65,572.10 297.00,574.00              297.00,574.00 297.00,569.00 297.00,569.00              297.00,569.00 295.00,569.00 295.00,569.00 Z            M 339.00,570.00            C 339.00,570.00 340.00,571.00 340.00,571.00              340.00,571.00 340.00,570.00 340.00,570.00              340.00,570.00 339.00,570.00 339.00,570.00 Z            M 292.00,571.00            C 292.00,571.00 292.00,578.00 292.00,578.00              292.00,578.00 294.00,571.00 294.00,571.00              294.00,571.00 292.00,571.00 292.00,571.00 Z            M 338.00,571.00            C 338.00,571.00 339.00,572.00 339.00,572.00              339.00,572.00 339.00,571.00 339.00,571.00              339.00,571.00 338.00,571.00 338.00,571.00 Z            M 339.11,581.59            C 339.11,581.59 347.41,576.54 347.41,576.54              352.27,572.54 352.69,569.18 360.00,571.00              360.00,571.00 353.68,577.22 353.68,577.22              353.68,577.22 348.00,581.37 348.00,581.37              348.00,581.37 324.55,600.77 324.55,600.77              324.55,600.77 312.00,606.00 312.00,606.00              312.00,606.00 320.00,600.00 320.00,600.00              315.36,600.52 312.27,599.88 308.00,598.00              312.91,595.79 317.67,589.02 323.00,590.00              323.00,590.00 312.00,598.00 312.00,598.00              312.00,598.00 334.00,590.00 334.00,590.00              334.00,590.00 327.00,589.00 327.00,589.00              335.00,586.99 333.42,585.56 339.11,581.59 Z            M 435.00,571.00            C 435.00,571.00 436.00,572.00 436.00,572.00              436.00,572.00 436.00,571.00 436.00,571.00              436.00,571.00 435.00,571.00 435.00,571.00 Z            M 462.03,590.00            C 462.03,590.00 453.43,607.00 453.43,607.00              453.43,607.00 446.41,623.95 446.41,623.95              446.41,623.95 439.42,637.00 439.42,637.00              437.27,642.02 432.20,648.68 434.00,654.00              434.85,649.31 436.06,645.80 439.00,642.00              439.78,649.42 438.84,653.26 436.00,660.00              443.76,650.82 444.89,644.62 449.42,634.00              449.42,634.00 455.58,619.00 455.58,619.00              455.58,619.00 463.00,604.00 463.00,604.00              463.00,604.00 466.00,605.00 466.00,605.00              468.26,598.50 473.23,584.43 478.00,580.00              478.00,580.00 463.06,613.72 463.06,613.72              459.32,620.02 451.99,628.72 452.00,636.00              455.35,627.26 462.49,620.27 468.14,612.91              472.72,606.95 474.93,601.81 481.00,597.00              480.07,602.87 476.81,605.53 474.31,611.00              474.31,611.00 470.66,619.00 470.66,619.00              470.66,619.00 446.00,652.83 446.00,652.83              446.00,652.83 438.14,662.00 438.14,662.00              434.11,666.82 428.94,678.78 423.00,680.00              423.00,680.00 415.00,703.00 415.00,703.00              415.00,703.00 412.00,701.00 412.00,701.00              412.00,701.00 397.26,723.00 397.26,723.00              397.26,723.00 386.00,745.00 386.00,745.00              386.00,745.00 396.00,736.00 396.00,736.00              393.83,733.26 397.17,730.32 399.00,728.00              399.00,728.00 415.02,707.17 415.02,707.17              415.02,707.17 424.54,695.00 424.54,695.00              427.40,690.46 427.59,687.29 432.52,681.00              432.52,681.00 447.10,665.00 447.10,665.00              447.10,665.00 463.16,643.00 463.16,643.00              466.66,637.86 478.20,624.89 479.00,620.00              482.19,616.76 482.52,615.47 483.00,611.00              483.00,611.00 485.00,611.00 485.00,611.00              483.89,621.40 475.33,629.20 469.54,637.32              469.54,637.32 446.54,670.00 446.54,670.00              446.54,670.00 442.28,678.00 442.28,678.00              439.86,682.18 433.51,690.76 430.00,694.00              430.00,694.00 433.00,695.00 433.00,695.00              433.00,695.00 424.14,704.28 424.14,704.28              424.14,704.28 408.00,726.00 408.00,726.00              418.12,720.18 429.82,708.59 436.48,699.00              436.48,699.00 444.23,685.60 444.23,685.60              444.23,685.60 456.76,671.00 456.76,671.00              456.76,671.00 474.18,648.04 474.18,648.04              474.18,648.04 483.68,639.70 483.68,639.70              488.37,634.88 490.23,629.59 496.00,625.00              496.00,625.00 489.00,634.00 489.00,634.00              489.52,640.43 486.24,640.73 482.32,645.09              482.32,645.09 473.19,656.91 473.19,656.91              473.19,656.91 463.37,670.84 463.37,670.84              458.86,675.57 457.97,672.48 450.61,682.58              443.17,692.80 445.14,692.87 442.01,698.00              442.01,698.00 420.00,726.00 420.00,726.00              420.00,726.00 426.00,725.00 426.00,725.00              426.00,725.00 417.00,731.37 417.00,731.37              417.00,731.37 403.00,744.00 403.00,744.00              403.00,744.00 410.00,741.00 410.00,741.00              410.00,741.00 394.00,754.00 394.00,754.00              394.00,754.00 401.00,754.00 401.00,754.00              401.00,754.00 392.00,759.68 392.00,759.68              392.00,759.68 377.00,772.00 377.00,772.00              377.00,772.00 388.00,767.00 388.00,767.00              384.76,774.85 380.81,774.31 374.00,776.95              371.22,778.03 369.39,779.29 367.00,780.76              369.41,781.00 372.71,781.12 375.00,780.76              380.59,779.08 392.15,768.52 397.01,764.86              403.64,759.89 418.33,749.85 423.00,744.00              429.48,743.87 441.34,732.43 446.96,728.38              446.96,728.38 466.00,714.10 466.00,714.10              466.00,714.10 479.00,706.39 479.00,706.39              479.00,706.39 490.29,696.57 490.29,696.57              498.32,690.13 500.97,689.51 508.00,681.00              508.00,681.00 513.00,679.00 513.00,679.00              513.00,679.00 506.30,679.91 506.30,679.91              506.30,679.91 487.00,693.65 487.00,693.65              487.00,693.65 478.17,697.83 478.17,697.83              478.17,697.83 470.99,702.82 470.99,702.82              470.99,702.82 455.01,712.61 455.01,712.61              455.01,712.61 443.00,724.76 443.00,724.76              443.00,724.76 432.00,731.00 432.00,731.00              432.00,731.00 423.96,737.96 423.96,737.96              423.96,737.96 414.00,745.00 414.00,745.00              414.00,745.00 425.57,733.67 425.57,733.67              425.57,733.67 448.09,703.74 448.09,703.74              448.09,703.74 463.87,690.33 463.87,690.33              463.87,690.33 473.00,680.00 473.00,680.00              473.00,680.00 461.00,689.00 461.00,689.00              459.90,682.25 462.67,683.04 466.05,675.00              471.84,661.21 475.21,659.16 483.36,647.83              486.00,644.16 490.38,637.27 494.00,635.00              494.00,635.00 474.09,663.42 474.09,663.42              474.09,663.42 466.48,679.00 466.48,679.00              466.48,679.00 462.00,686.00 462.00,686.00              473.21,678.66 486.00,663.82 496.00,653.86              499.11,650.76 500.43,648.83 504.00,646.00              501.13,652.11 496.27,659.80 491.00,664.00              493.31,667.80 489.37,670.47 487.00,674.00              487.00,674.00 501.63,666.10 501.63,666.10              501.63,666.10 507.00,661.00 507.00,661.00              502.82,661.00 500.51,661.58 497.00,659.00              497.00,659.00 512.00,655.41 512.00,655.41              512.00,655.41 528.00,650.00 528.00,650.00              524.21,656.50 514.21,656.65 508.21,662.25              501.97,668.06 498.21,676.41 492.62,682.68              488.83,686.93 479.74,693.33 475.00,697.00              475.00,697.00 503.00,680.00 503.00,680.00              503.00,680.00 501.00,676.00 501.00,676.00              501.00,676.00 527.00,668.00 527.00,668.00              527.00,668.00 519.00,677.00 519.00,677.00              519.00,677.00 532.00,673.00 532.00,673.00              527.97,678.35 521.96,678.27 518.09,680.27              518.09,680.27 506.00,689.18 506.00,689.18              506.00,689.18 486.96,705.58 486.96,705.58              477.09,713.09 475.65,712.07 472.09,714.63              472.09,714.63 451.00,733.00 451.00,733.00              451.00,733.00 462.96,727.33 462.96,727.33              467.15,726.01 466.67,728.33 472.99,724.30              484.60,716.90 492.26,707.52 506.00,702.00              506.00,702.00 505.00,707.00 505.00,707.00              505.00,707.00 483.00,719.47 483.00,719.47              483.00,719.47 469.16,729.00 469.16,729.00              462.76,732.94 459.78,736.54 452.00,738.00              452.00,738.00 460.00,731.00 460.00,731.00              451.89,734.62 448.24,738.64 441.00,743.07              437.44,745.36 434.80,746.95 432.00,743.07              441.42,741.68 448.51,732.46 455.43,726.59              460.60,722.20 462.42,722.04 467.00,716.00              467.00,716.00 444.17,732.67 444.17,732.67              444.17,732.67 421.00,750.76 421.00,750.76              421.00,750.76 410.00,759.00 410.00,759.00              410.00,759.00 415.00,760.00 415.00,760.00              415.00,760.00 399.00,768.00 399.00,768.00              402.04,767.83 408.91,765.10 410.00,768.00              410.00,768.00 424.84,753.78 424.84,753.78              424.84,753.78 449.00,741.00 449.00,741.00              445.32,746.75 433.88,749.96 428.09,754.10              428.09,754.10 413.91,768.37 413.91,768.37              408.42,772.58 401.08,774.36 395.04,777.55              391.56,779.39 390.75,781.25 387.91,783.36              387.91,783.36 380.00,788.00 380.00,788.00              391.59,787.50 390.91,786.70 401.00,782.00              401.00,782.00 400.00,779.00 400.00,779.00              400.00,779.00 409.00,775.96 409.00,775.96              409.00,775.96 436.71,764.41 436.71,764.41              436.71,764.41 464.00,748.00 464.00,748.00              464.00,748.00 463.00,745.00 463.00,745.00              463.00,745.00 486.00,736.00 486.00,736.00              486.00,736.00 487.00,737.00 487.00,737.00              487.00,737.00 486.00,739.00 486.00,739.00              486.00,739.00 489.00,743.00 489.00,743.00              489.00,743.00 462.17,753.15 462.17,753.15              462.17,753.15 453.42,757.92 453.42,757.92              453.42,757.92 447.99,760.12 447.99,760.12              447.99,760.12 439.00,765.48 439.00,765.48              439.00,765.48 415.04,775.40 415.04,775.40              415.04,775.40 407.91,780.32 407.91,780.32              407.91,780.32 384.00,792.97 384.00,792.97              384.00,792.97 360.00,801.00 360.00,801.00              360.00,801.00 370.00,801.00 370.00,801.00              364.94,805.62 356.04,805.66 349.00,808.00              360.68,807.97 369.87,806.68 381.00,803.00              381.00,803.00 374.00,803.00 374.00,803.00              374.00,803.00 374.00,801.00 374.00,801.00              379.75,801.00 390.49,799.68 395.00,803.00              384.86,806.10 364.60,805.77 357.00,813.00              357.00,813.00 375.00,811.00 375.00,811.00              375.00,811.00 374.00,814.00 374.00,814.00              374.00,814.00 399.00,812.61 399.00,812.61              399.00,812.61 406.00,810.00 406.00,810.00              402.67,814.91 398.57,814.93 393.00,815.00              393.00,815.00 374.00,815.00 374.00,815.00              374.00,815.00 359.00,816.00 359.00,816.00              354.00,816.02 350.92,815.60 346.00,817.00              346.00,817.00 354.00,817.82 354.00,817.82              354.00,817.82 363.00,817.10 363.00,817.10              363.00,817.10 379.00,818.96 379.00,818.96              379.00,818.96 395.00,818.96 395.00,818.96              399.66,819.06 410.47,819.48 414.00,822.00              414.00,822.00 426.00,815.00 426.00,815.00              426.00,815.00 440.00,813.00 440.00,813.00              440.00,813.00 473.00,813.00 473.00,813.00              473.00,813.00 473.00,815.00 473.00,815.00              455.68,815.00 430.95,812.77 416.00,822.00              416.00,822.00 442.00,822.00 442.00,822.00              447.99,822.01 456.19,822.15 461.00,826.00              461.00,826.00 433.00,826.00 433.00,826.00              433.00,826.00 418.00,825.00 418.00,825.00              418.00,825.00 448.00,824.00 448.00,824.00              441.16,822.34 428.50,822.97 421.00,823.00              421.00,823.00 409.00,823.92 409.00,823.92              409.00,823.92 394.17,822.76 394.17,822.76              394.17,822.76 387.96,821.13 387.96,821.13              384.96,820.81 382.83,821.47 380.00,821.68              371.17,822.33 359.71,815.40 355.00,827.00              355.00,827.00 365.00,829.00 365.00,829.00              365.00,829.00 364.00,832.00 364.00,832.00              364.00,832.00 387.00,833.96 387.00,833.96              387.00,833.96 401.00,833.96 401.00,833.96              401.00,833.96 401.00,837.00 401.00,837.00              401.00,837.00 422.00,836.00 422.00,836.00              422.00,836.00 437.00,837.00 437.00,837.00              437.00,837.00 454.00,838.00 454.00,838.00              454.00,838.00 452.00,834.78 452.00,834.78              453.48,834.65 454.06,834.28 455.72,834.78              458.58,835.02 471.01,841.36 473.00,844.00              473.00,844.00 477.00,847.00 477.00,847.00              467.35,849.11 465.24,843.48 458.00,840.49              454.04,838.85 445.40,838.01 441.00,838.00              441.00,838.00 401.00,838.00 401.00,838.00              394.50,838.00 385.02,837.29 379.00,839.00              379.00,839.00 400.00,842.80 400.00,842.80              400.00,842.80 414.00,844.30 414.00,844.30              414.00,844.30 424.83,846.66 424.83,846.66              431.63,848.09 437.04,846.52 441.00,854.00              433.39,853.58 426.52,849.30 419.00,847.66              419.00,847.66 386.00,843.25 386.00,843.25              376.09,841.15 372.32,836.78 361.00,840.00              361.00,840.00 387.00,849.38 387.00,849.38              387.00,849.38 396.00,852.03 396.00,852.03              396.00,852.03 411.00,857.00 411.00,857.00              411.00,857.00 411.00,859.00 411.00,859.00              403.33,859.00 402.48,859.43 395.00,857.00              395.00,857.00 397.00,854.00 397.00,854.00              390.36,852.10 390.36,853.35 386.00,852.21              386.00,852.21 373.00,847.32 373.00,847.32              373.00,847.32 362.00,844.20 362.00,844.20              358.76,843.06 351.06,838.68 348.04,839.49              344.86,840.34 340.66,847.17 339.00,850.00              339.00,850.00 360.00,853.74 360.00,853.74              360.00,853.74 370.42,857.01 370.42,857.01              370.42,857.01 391.00,860.69 391.00,860.69              395.84,862.35 404.26,864.58 407.00,869.00              407.00,869.00 389.00,861.98 389.00,861.98              389.00,861.98 370.00,858.55 370.00,858.55              370.00,858.55 356.00,854.44 356.00,854.44              352.76,853.49 341.93,851.38 339.02,852.45              336.52,853.37 335.51,855.01 334.00,857.00              334.00,857.00 349.00,860.04 349.00,860.04              349.00,860.04 356.56,862.84 356.56,862.84              368.14,866.20 365.71,864.29 379.00,869.77              383.68,871.70 391.14,872.84 393.00,878.00              393.00,878.00 378.00,871.91 378.00,871.91              378.00,871.91 368.00,867.55 368.00,867.55              368.00,867.55 350.00,862.59 350.00,862.59              350.00,862.59 332.00,858.00 332.00,858.00              336.29,865.34 347.78,864.86 353.00,874.00              358.45,874.27 376.81,881.62 380.00,886.00              371.36,885.80 368.77,883.22 361.00,880.37              361.00,880.37 326.00,866.00 326.00,866.00              326.00,866.00 325.00,870.00 325.00,870.00              325.00,870.00 354.00,885.00 354.00,885.00              343.88,884.31 340.24,879.63 331.83,875.18              324.46,871.29 325.03,869.88 320.00,874.00              324.42,876.13 328.16,879.64 332.01,882.65              339.09,888.18 348.12,895.38 353.00,903.00              353.00,903.00 341.96,893.37 341.96,893.37              341.96,893.37 335.18,888.20 335.18,888.20              335.18,888.20 318.00,875.00 318.00,875.00              315.77,879.84 314.72,880.58 315.00,886.00              319.07,886.55 321.22,889.49 323.00,893.00              323.00,893.00 314.00,885.00 314.00,885.00              314.00,885.00 312.24,889.07 312.24,889.07              312.24,889.07 318.00,894.92 318.00,894.92              318.00,894.92 331.00,906.00 331.00,906.00              316.63,902.44 311.74,883.69 303.83,899.00              302.96,900.69 302.51,902.20 302.00,904.00              304.61,904.63 313.46,912.44 315.00,915.00              311.07,917.63 312.00,920.62 312.00,925.00              312.00,925.00 310.00,925.00 310.00,925.00              310.00,925.00 311.00,912.00 311.00,912.00              304.77,909.16 303.95,906.03 301.78,905.45              297.67,904.35 293.03,913.63 293.00,917.00              293.00,917.00 296.00,914.00 296.00,914.00              296.00,914.00 297.00,927.00 297.00,927.00              291.95,925.23 290.83,917.91 289.00,913.00              292.55,910.87 298.60,904.69 297.47,900.09              296.89,897.73 292.75,893.82 291.00,892.00              288.84,894.63 279.54,902.88 279.37,905.37              279.16,908.66 286.81,916.42 289.00,919.00              281.14,917.87 284.40,913.92 275.00,907.00              273.01,911.39 271.70,913.50 267.00,915.00              267.00,915.00 275.00,903.00 275.00,903.00              272.76,901.67 271.27,898.93 269.06,898.31              266.66,897.63 264.57,899.75 263.04,901.30              258.90,905.50 258.63,908.92 253.00,912.00              253.00,912.00 262.04,899.66 262.04,899.66              262.04,899.66 266.37,893.87 266.37,893.87              266.37,893.87 262.00,886.00 262.00,886.00              255.41,891.45 249.05,895.37 243.30,902.00              240.46,905.27 238.81,909.41 234.00,908.00              243.68,902.07 245.22,891.83 261.00,886.00              258.93,882.59 258.76,882.36 255.00,881.00              252.86,885.34 249.31,888.82 245.00,891.00              245.00,891.00 255.00,879.00 255.00,879.00              255.00,879.00 223.00,899.00 223.00,899.00              223.00,899.00 233.17,890.11 233.17,890.11              233.17,890.11 255.00,876.00 255.00,876.00              255.00,876.00 249.00,868.00 249.00,868.00              249.00,868.00 234.00,878.67 234.00,878.67              234.00,878.67 214.00,893.00 214.00,893.00              216.89,887.18 221.09,885.73 226.16,882.13              234.12,876.48 239.98,871.40 249.00,867.00              247.75,865.02 246.27,862.24 243.87,861.52              241.42,860.79 236.60,862.85 234.00,863.52              224.63,865.97 213.32,871.57 205.00,876.62              199.52,879.94 198.35,878.97 195.00,885.00              195.00,885.00 198.00,885.00 198.00,885.00              198.00,885.00 190.03,904.71 190.03,904.71              190.03,904.71 187.00,907.00 187.00,907.00              187.00,907.00 193.00,883.00 193.00,883.00              193.00,883.00 186.00,887.00 186.00,887.00              188.92,882.80 197.37,878.08 202.04,875.53              215.31,868.28 228.18,862.38 243.00,859.00              243.00,859.00 243.00,856.00 243.00,856.00              234.38,852.22 237.12,854.63 226.00,857.41              226.00,857.41 183.00,874.00 183.00,874.00              183.00,874.00 181.00,878.00 181.00,878.00              181.61,883.24 177.20,895.85 172.81,899.00              172.81,899.00 172.81,890.99 172.81,890.99              172.81,890.99 180.00,877.00 180.00,877.00              180.00,877.00 172.00,879.00 172.00,879.00              172.00,879.00 172.00,877.00 172.00,877.00              172.00,877.00 202.00,864.85 202.00,864.85              202.00,864.85 218.00,857.00 218.00,857.00              218.00,857.00 206.00,861.66 206.00,861.66              206.00,861.66 192.00,863.61 192.00,863.61              192.00,863.61 179.00,869.00 179.00,869.00              185.95,860.62 193.75,862.51 203.00,860.62              210.77,859.04 222.67,853.86 228.00,848.00              228.00,848.00 206.00,852.63 206.00,852.63              206.00,852.63 187.04,860.23 187.04,860.23              178.79,863.83 170.33,869.70 161.00,865.81              163.57,866.00 167.60,866.13 170.00,865.81              174.12,864.72 184.87,859.77 188.00,857.00              188.00,857.00 203.00,851.74 203.00,851.74              203.00,851.74 220.00,847.00 220.00,847.00              220.00,847.00 233.00,843.00 233.00,843.00              233.00,843.00 232.00,839.00 232.00,839.00              215.51,842.31 212.61,844.97 195.00,845.19              192.81,845.00 190.12,844.93 188.00,845.19              179.98,847.12 170.02,856.63 153.00,857.00              153.00,857.00 146.00,875.00 146.00,875.00              146.00,875.00 143.73,872.71 143.73,872.71              143.73,872.71 150.00,857.00 150.00,857.00              150.00,857.00 143.00,856.00 143.00,856.00              160.40,856.00 160.48,855.75 176.00,848.26              179.83,846.41 182.73,845.82 186.00,843.00              193.50,844.82 203.55,844.26 211.00,842.27              211.00,842.27 220.00,839.46 220.00,839.46              220.00,839.46 230.00,838.00 230.00,838.00              229.00,836.42 228.36,835.05 226.67,834.02              224.98,832.99 222.91,833.04 221.00,833.09              221.00,833.09 209.00,833.09 209.00,833.09              201.99,833.92 203.93,834.98 194.00,835.00              178.44,835.02 185.08,836.01 172.00,838.79              172.00,838.79 162.00,840.46 162.00,840.46              148.90,842.97 144.03,845.00 130.00,845.00              130.00,845.00 130.00,843.00 130.00,843.00              147.75,843.00 144.36,841.90 160.00,839.28              166.07,838.27 173.15,838.14 178.00,834.00              178.00,834.00 167.00,833.00 167.00,833.00              167.00,833.00 128.00,834.00 128.00,834.00              130.79,830.62 134.89,831.02 139.00,831.00              139.00,831.00 166.00,831.00 166.00,831.00              166.00,831.00 183.00,833.00 183.00,833.00              188.91,833.07 201.46,834.34 206.00,831.00              206.00,831.00 225.00,831.00 225.00,831.00              222.96,827.43 217.53,818.10 213.82,816.59              211.53,815.67 202.03,816.00 199.00,816.00              199.00,816.00 200.00,819.00 200.00,819.00              190.71,819.66 187.72,825.42 180.00,827.99              176.70,829.09 173.45,829.73 171.00,827.10              171.00,827.10 177.00,827.10 177.00,827.10              177.00,827.10 196.00,816.00 196.00,816.00              196.00,816.00 186.00,816.98 186.00,816.98              186.00,816.98 169.00,816.98 169.00,816.98              169.00,816.98 147.00,819.00 147.00,819.00              147.00,819.00 126.00,819.00 126.00,819.00              126.00,819.00 110.00,819.00 110.00,819.00              110.00,819.00 122.00,818.00 122.00,818.00              122.00,818.00 145.00,818.00 145.00,818.00              148.96,817.94 156.85,817.16 160.00,815.00              167.50,816.82 183.94,816.94 191.00,814.00              191.00,814.00 168.00,811.00 168.00,811.00              142.42,810.87 149.94,809.76 127.00,805.46              127.00,805.46 104.00,803.00 104.00,803.00              104.00,803.00 117.00,803.00 117.00,803.00              117.00,803.00 150.00,808.75 150.00,808.75              150.00,808.75 170.00,810.00 170.00,810.00              170.00,810.00 214.00,815.00 214.00,815.00              214.00,815.00 211.00,806.00 211.00,806.00              211.00,806.00 208.00,807.00 208.00,807.00              208.00,807.00 186.00,802.14 186.00,802.14              186.00,802.14 173.00,797.67 173.00,797.67              173.00,797.67 162.00,796.72 162.00,796.72              162.00,796.72 147.00,794.63 147.00,794.63              147.00,794.63 141.00,793.21 141.00,793.21              141.00,793.21 133.00,792.58 133.00,792.58              133.00,792.58 112.00,787.13 112.00,787.13              112.00,787.13 98.00,787.13 98.00,787.13              98.00,787.13 83.00,802.00 83.00,802.00              83.00,802.00 81.00,802.00 81.00,802.00              81.00,802.00 79.00,799.00 79.00,799.00              79.00,799.00 95.00,787.00 95.00,787.00              95.00,787.00 91.00,785.00 91.00,785.00              96.90,786.43 102.00,785.97 108.00,786.00              119.09,786.05 117.56,788.25 126.00,790.04              126.00,790.04 140.00,791.43 140.00,791.43              140.00,791.43 159.00,794.83 159.00,794.83              166.71,795.60 182.26,794.94 187.00,802.00              187.00,802.00 210.00,805.00 210.00,805.00              204.64,798.36 192.87,795.72 185.00,792.60              185.00,792.60 150.00,779.68 150.00,779.68              150.00,779.68 143.00,778.68 143.00,778.68              143.00,778.68 121.00,774.98 121.00,774.98              121.00,774.98 114.00,774.98 114.00,774.98              104.71,773.38 97.48,764.89 83.00,771.00              85.62,767.08 88.62,768.00 93.00,768.00              105.72,768.01 102.37,769.61 112.00,772.31              117.89,773.95 136.30,776.36 142.00,775.00              142.00,775.00 132.00,773.00 132.00,773.00              132.00,773.00 128.00,769.00 128.00,769.00              124.65,769.19 111.02,765.18 108.00,763.49              102.53,760.44 97.67,755.64 91.00,754.83              84.85,754.09 74.43,762.27 68.00,764.00              72.83,754.64 85.24,750.80 95.04,753.85              103.04,756.33 105.39,760.00 111.00,762.59              111.00,762.59 120.00,765.10 120.00,765.10              120.00,765.10 131.83,770.30 131.83,770.30              131.83,770.30 138.04,772.32 138.04,772.32              142.72,774.06 145.88,776.95 151.00,777.00              151.00,777.00 136.17,766.00 136.17,766.00              133.21,763.83 130.81,762.70 130.00,759.00              124.86,758.46 109.47,753.03 105.05,750.17              99.60,746.66 101.10,745.02 94.00,741.67              89.92,739.74 76.00,735.32 74.00,733.00              80.33,734.13 93.38,738.70 98.72,741.96              98.72,741.96 116.00,752.69 116.00,752.69              116.00,752.69 134.00,759.94 134.00,759.94              143.09,764.69 146.82,768.78 151.00,771.20              151.00,771.20 176.00,781.57 176.00,781.57              188.81,787.16 186.78,789.15 205.00,795.00              191.43,781.97 192.80,786.01 179.00,778.12              179.00,778.12 163.00,767.75 163.00,767.75              163.00,767.75 139.01,757.74 139.01,757.74              139.01,757.74 113.83,741.81 113.83,741.81              113.83,741.81 105.00,736.34 105.00,736.34              102.02,734.24 87.19,723.75 85.00,723.14              81.13,722.05 74.91,723.85 71.00,724.77              67.27,725.19 62.83,725.00 59.00,724.77              59.00,724.77 60.00,721.00 60.00,721.00              60.00,721.00 82.00,720.00 82.00,720.00              77.20,718.68 75.61,718.74 72.00,715.00              79.39,718.12 89.69,720.73 94.00,728.00              101.77,727.27 104.36,732.58 109.80,736.72              109.80,736.72 120.01,743.90 120.01,743.90              124.19,746.59 127.38,747.46 130.00,752.00              134.73,751.90 142.36,756.02 145.00,760.00              149.93,759.93 151.24,761.39 155.58,762.92              165.69,766.51 165.46,766.01 174.28,772.87              176.65,774.72 178.24,775.51 180.00,778.00              185.47,777.92 191.89,780.97 197.00,783.00              197.00,783.00 192.25,776.87 192.25,776.87              192.25,776.87 178.17,767.95 178.17,767.95              178.17,767.95 170.16,762.00 170.16,762.00              170.16,762.00 143.00,743.38 143.00,743.38              143.00,743.38 131.28,737.13 131.28,737.13              131.28,737.13 117.96,727.14 117.96,727.14              117.96,727.14 96.00,711.00 96.00,711.00              93.48,713.07 91.31,710.79 89.00,709.10              89.00,709.10 79.00,701.61 79.00,701.61              75.53,699.51 72.52,699.36 70.00,696.00              78.45,698.95 96.36,706.53 101.00,714.00              101.00,714.00 103.00,713.00 103.00,713.00              103.00,713.00 109.00,720.00 109.00,720.00              114.78,721.04 122.96,728.58 127.83,732.22              127.83,732.22 152.00,746.51 152.00,746.51              155.39,748.79 161.45,754.26 165.00,755.00              168.24,758.82 180.22,767.17 185.00,769.00              185.00,769.00 138.60,733.91 138.60,733.91              138.60,733.91 117.23,715.54 117.23,715.54              106.43,704.04 106.40,700.61 92.00,691.00              92.00,691.00 93.00,688.00 93.00,688.00              93.00,688.00 80.00,680.00 80.00,680.00              80.00,680.00 77.73,682.13 77.73,682.13              77.73,682.13 62.00,682.13 62.00,682.13              62.00,682.13 62.00,680.00 62.00,680.00              62.00,680.00 80.00,679.00 80.00,679.00              80.00,679.00 67.00,675.00 67.00,675.00              67.00,675.00 74.00,676.00 74.00,676.00              74.00,676.00 72.00,674.00 72.00,674.00              72.00,674.00 72.00,673.00 72.00,673.00              78.77,673.76 81.24,676.77 87.00,680.00              87.00,680.00 72.96,666.58 72.96,666.58              72.96,666.58 61.00,666.00 61.00,666.00              61.00,666.00 61.00,664.00 61.00,664.00              61.00,664.00 74.00,663.00 74.00,663.00              74.00,663.00 69.00,659.00 69.00,659.00              81.59,664.10 93.55,677.77 99.00,690.00              104.80,691.04 108.84,696.55 112.41,700.95              112.41,700.95 121.00,710.11 121.00,710.11              121.00,710.11 127.79,719.42 127.79,719.42              133.14,725.86 144.93,734.21 151.98,739.34              160.57,745.60 168.56,751.95 178.00,757.00              178.00,757.00 169.74,748.78 169.74,748.78              169.74,748.78 156.95,734.00 156.95,734.00              156.95,734.00 145.00,720.00 145.00,720.00              145.00,720.00 148.00,719.00 148.00,719.00              153.89,725.84 157.09,730.98 165.00,736.00              161.53,730.53 153.71,719.16 149.03,715.01              144.07,710.62 135.33,705.82 134.00,699.00              130.40,696.97 119.92,683.66 116.83,679.72              112.58,674.32 112.15,670.95 105.00,671.00              105.00,671.00 109.00,677.00 109.00,677.00              104.13,675.65 104.61,674.26 100.83,672.09              94.11,668.25 92.08,669.30 86.00,662.00              86.00,662.00 92.00,662.00 92.00,662.00              92.00,662.00 82.00,658.00 82.00,658.00              93.01,658.61 95.48,664.22 105.00,667.00              105.00,667.00 88.00,652.00 88.00,652.00              88.00,652.00 90.00,651.00 90.00,651.00              90.00,651.00 91.00,652.00 91.00,652.00              91.00,652.00 84.00,645.00 84.00,645.00              83.56,646.06 83.67,646.71 82.41,647.20              79.54,648.97 68.42,647.61 65.00,647.20              65.43,645.77 65.38,644.95 66.59,644.02              69.98,641.44 79.42,643.49 83.00,645.00              87.04,640.76 90.55,648.12 92.76,650.98              96.66,656.03 98.12,655.66 101.91,659.21              101.91,659.21 109.18,667.70 109.18,667.70              109.18,667.70 119.00,676.00 119.00,676.00              119.00,676.00 87.00,631.00 87.00,631.00              87.00,631.00 98.43,643.74 98.43,643.74              98.43,643.74 103.28,648.17 103.28,648.17              103.28,648.17 128.57,682.00 128.57,682.00              128.57,682.00 131.40,689.83 131.40,689.83              131.40,689.83 137.27,701.74 137.27,701.74              137.27,701.74 151.98,714.81 151.98,714.81              151.98,714.81 167.62,735.83 167.62,735.83              167.62,735.83 175.00,745.00 175.00,745.00              175.00,745.00 172.00,745.00 172.00,745.00              172.00,745.00 192.39,772.59 192.39,772.59              192.39,772.59 206.00,783.00 206.00,783.00              206.00,783.00 193.58,764.43 193.58,764.43              193.58,764.43 186.47,756.83 186.47,756.83              186.47,756.83 175.27,742.04 175.27,742.04              175.27,742.04 170.25,735.84 170.25,735.84              170.25,735.84 165.55,727.20 165.55,727.20              165.55,727.20 151.44,708.00 151.44,708.00              151.44,708.00 143.26,695.59 143.26,695.59              143.26,695.59 138.06,689.55 138.06,689.55              138.06,689.55 131.00,679.00 131.00,679.00              131.00,679.00 128.00,671.00 128.00,671.00              128.00,671.00 121.00,665.00 121.00,665.00              119.97,660.80 109.16,644.26 106.02,639.96              103.55,636.59 99.25,633.39 100.00,629.00              100.00,629.00 110.00,642.00 110.00,642.00              110.00,642.00 107.00,630.00 107.00,630.00              110.62,634.57 110.35,636.49 112.95,641.00              117.28,648.52 122.20,651.55 120.00,661.00              124.90,663.82 135.65,679.33 137.00,685.00              141.02,685.96 140.96,688.72 143.12,692.00              143.12,692.00 155.21,710.00 155.21,710.00              155.21,710.00 171.19,731.00 171.19,731.00              171.19,731.00 174.77,738.00 174.77,738.00              174.77,738.00 189.09,756.99 189.09,756.99              194.90,763.15 203.00,768.24 210.00,773.00              206.60,762.61 202.42,765.34 198.00,756.00              198.00,756.00 210.00,766.00 210.00,766.00              206.41,753.75 204.22,755.35 194.72,747.26              194.72,747.26 171.00,725.00 171.00,725.00              171.00,725.00 190.00,737.00 190.00,737.00              190.00,737.00 191.00,734.00 191.00,734.00              191.00,734.00 196.00,737.00 196.00,737.00              190.94,731.03 176.52,721.59 169.58,715.97              165.07,712.33 161.78,711.52 159.00,706.00              159.00,706.00 195.00,732.00 195.00,732.00              195.00,732.00 185.75,719.04 185.75,719.04              185.75,719.04 183.16,712.83 183.16,712.83              183.16,712.83 173.32,699.17 173.32,699.17              168.39,693.32 157.74,682.51 157.00,675.00              157.00,675.00 166.00,684.00 166.00,684.00              166.00,684.00 158.96,672.29 158.96,672.29              158.96,672.29 146.67,658.01 146.67,658.01              146.67,658.01 134.80,640.00 134.80,640.00              134.80,640.00 127.00,629.02 127.00,629.02              125.97,627.21 124.86,625.90 127.00,625.00              124.58,619.01 116.82,609.53 112.73,604.00              110.66,601.21 106.61,595.44 103.91,593.60              98.48,589.90 89.19,592.98 85.00,586.00              85.00,586.00 101.00,589.00 101.00,589.00              101.00,589.00 100.00,585.00 100.00,585.00              100.00,585.00 103.00,586.00 103.00,586.00              103.00,586.00 104.00,583.00 104.00,583.00              104.00,583.00 116.19,600.00 116.19,600.00              116.19,600.00 120.18,609.91 120.18,609.91              120.18,609.91 127.47,620.04 127.47,620.04              127.47,620.04 134.93,635.99 134.93,635.99              134.93,635.99 143.00,649.00 143.00,649.00              143.00,649.00 145.00,648.00 145.00,648.00              145.00,648.00 163.16,675.00 163.16,675.00              163.16,675.00 172.13,694.00 172.13,694.00              172.13,694.00 181.31,706.28 181.31,706.28              181.31,706.28 195.06,725.15 195.06,725.15              195.06,725.15 202.14,735.91 202.14,735.91              202.14,735.91 214.00,745.77 214.00,745.77              214.00,745.77 215.23,745.77 215.23,745.77              215.23,745.77 225.38,758.00 225.38,758.00              225.38,758.00 229.91,771.00 229.91,771.00              229.91,771.00 235.69,783.00 235.69,783.00              235.69,783.00 239.06,791.00 239.06,791.00              239.06,791.00 246.00,802.00 246.00,802.00              241.27,799.59 240.05,796.68 238.00,792.00              238.00,792.00 235.00,794.00 235.00,794.00              235.00,794.00 230.00,786.00 230.00,786.00              231.24,789.98 232.55,791.91 231.00,796.00              225.30,784.48 221.42,771.85 213.00,762.00              213.00,762.00 219.00,785.00 219.00,785.00              219.00,785.00 209.34,775.70 209.34,775.70              209.34,775.70 199.00,768.00 199.00,768.00              199.00,768.00 210.68,783.00 210.68,783.00              210.68,783.00 217.09,790.42 217.09,790.42              217.09,790.42 227.58,795.37 227.58,795.37              227.58,795.37 241.00,807.00 241.00,807.00              241.00,807.00 241.00,805.00 241.00,805.00              241.00,805.00 256.00,807.39 256.00,807.39              256.00,807.39 264.00,811.56 264.00,811.56              264.00,811.56 289.00,820.81 289.00,820.81              289.00,820.81 303.00,824.00 303.00,824.00              303.00,824.00 280.00,813.00 280.00,813.00              280.00,813.00 301.00,820.47 301.00,820.47              301.00,820.47 314.00,821.00 314.00,821.00              310.76,818.04 309.31,817.56 305.00,817.00              305.00,817.00 305.00,815.11 305.00,815.11              305.00,815.11 320.00,815.11 320.00,815.11              320.00,815.11 326.00,814.57 326.00,814.57              326.00,814.57 333.00,811.00 333.00,811.00              333.00,811.00 329.00,817.00 329.00,817.00              329.00,817.00 353.00,811.00 353.00,811.00              353.00,811.00 343.00,811.00 343.00,811.00              345.37,804.24 353.49,805.38 360.00,803.00              360.00,803.00 355.00,803.00 355.00,803.00              355.00,803.00 370.00,789.00 370.00,789.00              370.00,789.00 358.00,791.03 358.00,791.03              358.00,791.03 344.00,791.03 344.00,791.03              338.62,791.92 328.96,792.97 324.00,791.03              324.00,791.03 340.00,791.03 340.00,791.03              340.00,791.03 340.00,789.00 340.00,789.00              340.00,789.00 315.00,789.00 315.00,789.00              315.00,789.00 315.00,787.00 315.00,787.00              315.00,787.00 337.00,786.00 337.00,786.00              337.00,786.00 353.00,786.00 353.00,786.00              353.00,786.00 362.00,785.21 362.00,785.21              367.21,785.03 368.60,787.54 372.00,787.85              375.76,788.19 383.87,784.10 387.00,782.00              387.00,782.00 338.00,782.00 338.00,782.00              338.00,782.00 338.00,779.00 338.00,779.00              345.57,779.00 350.57,779.27 358.00,777.00              358.00,777.00 347.00,776.00 347.00,776.00              353.04,771.41 356.72,773.94 364.00,771.79              372.50,769.28 380.27,764.69 387.00,759.00              379.92,761.00 369.00,768.68 362.00,766.00              374.54,763.63 389.46,756.48 399.00,748.00              399.00,748.00 380.00,758.00 380.00,758.00              380.00,758.00 384.00,753.00 384.00,753.00              384.00,753.00 369.00,757.00 369.00,757.00              376.53,753.54 385.47,751.48 391.00,745.00              385.27,746.83 380.00,749.38 374.00,747.00              374.00,747.00 384.00,746.00 384.00,746.00              384.00,746.00 384.00,742.00 384.00,742.00              384.00,742.00 381.00,743.00 381.00,743.00              381.00,743.00 393.47,724.00 393.47,724.00              400.26,713.12 406.43,701.66 415.00,692.00              415.00,692.00 414.00,701.00 414.00,701.00              414.00,701.00 423.55,676.13 423.55,676.13              423.55,676.13 424.70,668.99 424.70,668.99              424.70,668.99 428.80,656.00 428.80,656.00              428.80,656.00 442.32,625.00 442.32,625.00              442.32,625.00 446.63,614.08 446.63,614.08              446.63,614.08 451.00,606.00 451.00,606.00              451.00,606.00 457.64,592.00 457.64,592.00              457.64,592.00 468.00,570.00 468.00,570.00              473.57,579.01 467.70,577.81 462.03,590.00 Z            M 337.00,572.00            C 337.00,572.00 338.00,573.00 338.00,573.00              338.00,573.00 338.00,572.00 338.00,572.00              338.00,572.00 337.00,572.00 337.00,572.00 Z            M 147.00,573.00            C 147.00,573.00 148.00,574.00 148.00,574.00              148.00,574.00 148.00,573.00 148.00,573.00              148.00,573.00 147.00,573.00 147.00,573.00 Z            M 159.00,573.00            C 159.00,573.00 160.00,574.00 160.00,574.00              160.00,574.00 160.00,573.00 160.00,573.00              160.00,573.00 159.00,573.00 159.00,573.00 Z            M 350.00,577.00            C 350.00,577.00 355.00,573.00 355.00,573.00              355.00,573.00 350.00,577.00 350.00,577.00 Z            M 434.00,574.00            C 434.00,574.00 435.00,575.00 435.00,575.00              435.00,575.00 435.00,574.00 435.00,574.00              435.00,574.00 434.00,574.00 434.00,574.00 Z            M 275.00,575.00            C 275.00,575.00 276.00,576.00 276.00,576.00              276.00,576.00 276.00,575.00 276.00,575.00              276.00,575.00 275.00,575.00 275.00,575.00 Z            M 296.00,575.00            C 296.00,575.00 297.00,576.00 297.00,576.00              297.00,576.00 297.00,575.00 297.00,575.00              297.00,575.00 296.00,575.00 296.00,575.00 Z            M 426.00,594.00            C 428.74,589.75 430.99,587.29 431.00,582.00              433.83,579.80 433.67,578.45 434.00,575.00              430.65,578.86 424.89,588.91 426.00,594.00 Z            M 503.00,580.96            C 498.07,584.82 488.49,592.64 482.00,591.00              482.00,591.00 487.00,588.00 487.00,588.00              487.00,588.00 484.00,587.00 484.00,587.00              484.00,587.00 497.00,581.01 497.00,581.01              497.00,581.01 508.00,574.00 508.00,574.00              507.95,577.53 505.65,578.88 503.00,580.96 Z            M 291.00,591.00            C 291.00,591.00 296.00,576.00 296.00,576.00              293.36,579.25 289.96,586.88 291.00,591.00 Z            M 163.00,581.00            C 163.00,581.00 162.00,577.00 162.00,577.00              162.00,577.00 163.00,581.00 163.00,581.00 Z            M 372.00,578.00            C 372.00,578.00 373.00,579.00 373.00,579.00              373.00,579.00 373.00,578.00 373.00,578.00              373.00,578.00 372.00,578.00 372.00,578.00 Z            M 374.00,578.00            C 374.00,578.00 375.00,579.00 375.00,579.00              375.00,579.00 375.00,578.00 375.00,578.00              375.00,578.00 374.00,578.00 374.00,578.00 Z            M 196.00,579.00            C 196.00,579.00 197.00,580.00 197.00,580.00              197.00,580.00 197.00,579.00 197.00,579.00              197.00,579.00 196.00,579.00 196.00,579.00 Z            M 371.00,579.00            C 371.00,579.00 372.00,580.00 372.00,580.00              372.00,580.00 372.00,579.00 372.00,579.00              372.00,579.00 371.00,579.00 371.00,579.00 Z            M 388.00,579.00            C 388.00,579.00 389.00,580.00 389.00,580.00              389.00,580.00 389.00,579.00 389.00,579.00              389.00,579.00 388.00,579.00 388.00,579.00 Z            M 371.00,582.00            C 371.00,582.00 367.00,589.00 367.00,589.00              367.00,589.00 370.00,587.00 370.00,587.00              370.00,587.00 369.00,591.00 369.00,591.00              372.28,587.78 372.36,586.44 373.00,582.00              373.00,582.00 371.00,582.00 371.00,582.00 Z            M 383.00,582.00            C 383.00,582.00 382.00,585.00 382.00,585.00              382.00,585.00 385.00,582.00 385.00,582.00              385.00,582.00 383.00,582.00 383.00,582.00 Z            M 267.00,590.00            C 267.00,590.00 270.00,588.00 270.00,588.00              270.00,588.00 276.00,596.00 276.00,596.00              276.00,596.00 268.00,590.00 268.00,590.00              268.00,590.00 269.00,593.00 269.00,593.00              264.38,590.78 261.06,587.06 258.00,583.00              258.00,583.00 267.00,590.00 267.00,590.00 Z            M 318.00,584.00            C 318.00,584.00 319.00,585.00 319.00,585.00              319.00,585.00 319.00,584.00 319.00,584.00              319.00,584.00 318.00,584.00 318.00,584.00 Z            M 322.00,584.00            C 322.00,584.00 323.00,585.00 323.00,585.00              323.00,585.00 323.00,584.00 323.00,584.00              323.00,584.00 322.00,584.00 322.00,584.00 Z            M 339.00,584.00            C 339.00,584.00 340.00,585.00 340.00,585.00              340.00,585.00 340.00,584.00 340.00,584.00              340.00,584.00 339.00,584.00 339.00,584.00 Z            M 338.00,585.00            C 338.00,585.00 339.00,586.00 339.00,586.00              339.00,586.00 339.00,585.00 339.00,585.00              339.00,585.00 338.00,585.00 338.00,585.00 Z            M 492.00,585.00            C 492.00,585.00 493.00,586.00 493.00,586.00              493.00,586.00 493.00,585.00 493.00,585.00              493.00,585.00 492.00,585.00 492.00,585.00 Z            M 106.00,590.00            C 106.00,590.00 104.00,586.00 104.00,586.00              104.00,586.00 106.00,590.00 106.00,590.00 Z            M 379.00,586.00            C 379.00,586.00 380.00,587.00 380.00,587.00              380.00,587.00 380.00,586.00 380.00,586.00              380.00,586.00 379.00,586.00 379.00,586.00 Z            M 488.00,588.00            C 488.00,588.00 492.00,586.00 492.00,586.00              492.00,586.00 488.00,588.00 488.00,588.00 Z            M 397.00,586.00            C 397.00,586.00 389.00,602.00 389.00,602.00              389.00,602.00 397.00,601.00 397.00,601.00              397.00,601.00 396.00,607.00 396.00,607.00              396.00,607.00 376.00,625.00 376.00,625.00              378.30,620.83 378.83,620.30 383.00,618.00              383.06,612.36 386.35,612.95 393.00,607.00              393.00,607.00 389.00,609.00 389.00,609.00              389.00,609.00 388.00,606.00 388.00,606.00              388.00,606.00 385.00,607.00 385.00,607.00              385.00,607.00 395.00,586.00 395.00,586.00              395.00,586.00 397.00,586.00 397.00,586.00 Z            M 286.00,597.00            C 286.00,597.00 288.00,588.00 288.00,588.00              285.73,590.96 284.97,593.35 286.00,597.00 Z            M 373.00,599.00            C 377.94,596.65 379.97,593.47 379.00,588.00              379.00,588.00 373.00,599.00 373.00,599.00 Z            M 101.00,589.00            C 101.00,589.00 102.00,590.00 102.00,590.00              102.00,590.00 102.00,589.00 102.00,589.00              102.00,589.00 101.00,589.00 101.00,589.00 Z            M 368.00,596.00            C 371.83,594.10 372.86,593.15 374.00,589.00              374.00,589.00 368.00,596.00 368.00,596.00 Z            M 113.00,600.00            C 113.00,600.00 107.00,590.00 107.00,590.00              106.02,594.04 110.15,597.60 113.00,600.00 Z            M 299.00,596.00            C 299.00,596.00 300.00,590.00 300.00,590.00              300.00,590.00 299.00,596.00 299.00,596.00 Z            M 518.00,589.00            C 518.00,589.00 519.00,590.00 519.00,590.00              519.00,590.00 519.00,592.00 519.00,592.00              519.00,592.00 514.00,594.00 514.00,594.00              514.00,594.00 515.00,597.00 515.00,597.00              515.00,597.00 501.00,604.04 501.00,604.04              501.00,604.04 489.00,608.00 489.00,608.00              489.00,608.00 488.00,604.00 488.00,604.00              488.00,604.00 518.00,589.00 518.00,589.00 Z            M 156.00,592.00            C 156.00,592.00 157.00,593.00 157.00,593.00              157.00,593.00 157.00,592.00 157.00,592.00              157.00,592.00 156.00,592.00 156.00,592.00 Z            M 424.00,594.00            C 424.00,594.00 425.00,595.00 425.00,595.00              425.00,595.00 425.00,594.00 425.00,594.00              425.00,594.00 424.00,594.00 424.00,594.00 Z            M 409.00,595.00            C 409.00,595.00 410.00,596.00 410.00,596.00              410.00,596.00 410.00,595.00 410.00,595.00              410.00,595.00 409.00,595.00 409.00,595.00 Z            M 219.00,596.00            C 219.00,596.00 220.00,597.00 220.00,597.00              220.00,597.00 220.00,596.00 220.00,596.00              220.00,596.00 219.00,596.00 219.00,596.00 Z            M 423.00,596.00            C 423.00,596.00 424.00,597.00 424.00,597.00              424.00,597.00 424.00,596.00 424.00,596.00              424.00,596.00 423.00,596.00 423.00,596.00 Z            M 297.00,601.00            C 297.00,601.00 299.00,597.00 299.00,597.00              299.00,597.00 297.00,601.00 297.00,601.00 Z            M 355.29,610.58            C 354.23,613.90 355.86,621.59 349.00,626.00              349.00,626.00 353.35,616.00 353.35,616.00              353.35,616.00 353.35,610.28 353.35,610.28              353.35,610.28 361.00,596.00 361.00,596.00              360.63,601.14 356.42,607.05 355.29,610.58 Z            M 408.00,597.00            C 408.00,597.00 409.00,598.00 409.00,598.00              409.00,598.00 409.00,597.00 409.00,597.00              409.00,597.00 408.00,597.00 408.00,597.00 Z            M 113.00,600.00            C 113.00,600.00 114.00,601.00 114.00,601.00              114.00,601.00 114.00,600.00 114.00,600.00              114.00,600.00 113.00,600.00 113.00,600.00 Z            M 161.00,600.00            C 161.00,600.00 162.00,601.00 162.00,601.00              162.00,601.00 162.00,600.00 162.00,600.00              162.00,600.00 161.00,600.00 161.00,600.00 Z            M 285.00,600.00            C 285.00,600.00 286.00,601.00 286.00,601.00              286.00,601.00 286.00,600.00 286.00,600.00              286.00,600.00 285.00,600.00 285.00,600.00 Z            M 114.00,601.00            C 114.00,601.00 115.00,602.00 115.00,602.00              115.00,602.00 115.00,601.00 115.00,601.00              115.00,601.00 114.00,601.00 114.00,601.00 Z            M 179.00,610.00            C 179.00,610.00 176.00,601.00 176.00,601.00              175.31,604.79 176.55,607.16 179.00,610.00 Z            M 241.00,610.00            C 241.00,610.00 241.00,601.00 241.00,601.00              239.69,604.30 239.69,606.70 241.00,610.00 Z            M 201.00,606.00            C 201.00,606.00 200.00,602.00 200.00,602.00              199.24,604.34 199.17,604.37 201.00,606.00 Z            M 95.00,608.00            C 95.00,608.00 77.00,607.00 77.00,607.00              77.00,607.00 77.00,605.00 77.00,605.00              77.00,605.00 82.00,604.00 82.00,604.00              82.00,604.00 77.00,602.00 77.00,602.00              81.72,602.40 92.29,604.11 95.00,608.00 Z            M 353.00,608.00            C 344.66,608.28 346.99,610.19 341.91,611.57              341.91,611.57 334.09,612.26 334.09,612.26              334.09,612.26 328.83,613.88 328.83,613.88              324.93,614.45 313.46,615.37 310.00,613.88              310.00,613.88 315.00,613.00 315.00,613.00              315.00,613.00 311.00,610.00 311.00,610.00              318.11,609.77 317.44,608.25 322.04,608.06              329.41,607.76 329.71,610.76 340.00,607.00              334.82,606.69 333.90,606.40 331.00,602.00              344.90,602.00 341.77,600.68 353.00,608.00 Z            M 406.00,607.00            C 406.00,607.00 407.00,603.00 407.00,603.00              407.00,603.00 406.00,607.00 406.00,607.00 Z            M 391.00,604.00            C 391.00,604.00 392.00,605.00 392.00,605.00              392.00,605.00 392.00,604.00 392.00,604.00              392.00,604.00 391.00,604.00 391.00,604.00 Z            M 363.00,605.00            C 363.00,605.00 364.00,606.00 364.00,606.00              364.00,606.00 364.00,605.00 364.00,605.00              364.00,605.00 363.00,605.00 363.00,605.00 Z            M 343.00,607.00            C 343.00,607.00 344.00,608.00 344.00,608.00              344.00,608.00 344.00,607.00 344.00,607.00              344.00,607.00 343.00,607.00 343.00,607.00 Z            M 119.00,619.00            C 119.00,619.00 117.00,624.00 117.00,624.00              122.12,626.71 121.72,629.14 125.51,633.00              136.76,644.43 144.76,657.33 153.00,671.00              153.00,671.00 150.68,670.23 150.68,670.23              150.68,670.23 139.50,653.91 139.50,653.91              139.50,653.91 129.67,640.09 129.67,640.09              129.67,640.09 123.51,633.68 123.51,633.68              123.51,633.68 114.41,622.09 114.41,622.09              114.41,622.09 100.00,607.00 100.00,607.00              109.45,609.01 113.34,617.90 119.00,619.00 Z            M 518.00,611.00            C 518.00,611.00 522.00,610.00 522.00,610.00              519.57,613.88 517.89,613.42 514.00,615.22              507.72,618.13 497.95,624.67 491.00,622.00              491.00,622.00 503.00,617.11 503.00,617.11              503.00,617.11 518.00,608.00 518.00,608.00              518.00,608.00 518.00,611.00 518.00,611.00 Z            M 184.00,620.00            C 184.00,620.00 180.00,610.00 180.00,610.00              178.84,614.37 181.09,616.96 184.00,620.00 Z            M 514.00,613.00            C 514.00,613.00 518.00,611.00 518.00,611.00              518.00,611.00 514.00,613.00 514.00,613.00 Z            M 220.00,625.00            C 219.21,618.04 216.14,617.06 213.00,611.00              218.56,612.87 222.22,619.37 220.00,625.00 Z            M 293.00,612.00            C 293.00,612.00 294.00,613.00 294.00,613.00              294.00,613.00 294.00,612.00 294.00,612.00              294.00,612.00 293.00,612.00 293.00,612.00 Z            M 278.00,623.00            C 278.00,623.00 281.00,613.00 281.00,613.00              278.41,616.01 276.92,619.02 278.00,623.00 Z            M 287.00,625.00            C 282.35,626.63 282.33,629.79 284.00,634.00              287.23,628.54 291.85,619.16 293.00,613.00              289.23,617.06 287.63,619.43 287.00,625.00 Z            M 367.42,619.16            C 363.20,624.46 357.12,631.11 351.00,634.00              351.00,634.00 371.00,612.00 371.00,612.00              371.19,615.47 369.49,616.56 367.42,619.16 Z            M 272.00,614.00            C 272.00,614.00 273.00,615.00 273.00,615.00              273.00,615.00 273.00,614.00 273.00,614.00              273.00,614.00 272.00,614.00 272.00,614.00 Z            M 109.00,615.00            C 109.00,615.00 110.00,616.00 110.00,616.00              110.00,616.00 110.00,615.00 110.00,615.00              110.00,615.00 109.00,615.00 109.00,615.00 Z            M 259.00,614.00            C 259.00,614.00 257.00,634.00 257.00,634.00              257.00,634.00 255.00,634.00 255.00,634.00              255.00,634.00 257.00,614.00 257.00,614.00              257.00,614.00 259.00,614.00 259.00,614.00 Z            M 289.00,615.00            C 289.00,615.00 290.00,616.00 290.00,616.00              290.00,616.00 290.00,615.00 290.00,615.00              290.00,615.00 289.00,615.00 289.00,615.00 Z            M 398.00,622.00            C 398.00,622.00 400.00,616.00 400.00,616.00              397.98,618.38 397.47,618.85 398.00,622.00 Z            M 142.00,618.00            C 142.00,618.00 143.00,619.00 143.00,619.00              143.00,619.00 143.00,618.00 143.00,618.00              143.00,618.00 142.00,618.00 142.00,618.00 Z            M 467.00,619.00            C 467.00,619.00 468.00,620.00 468.00,620.00              468.00,620.00 468.00,619.00 468.00,619.00              468.00,619.00 467.00,619.00 467.00,619.00 Z            M 209.00,620.00            C 209.00,620.00 210.00,621.00 210.00,621.00              210.00,621.00 210.00,620.00 210.00,620.00              210.00,620.00 209.00,620.00 209.00,620.00 Z            M 166.00,621.00            C 166.00,621.00 167.00,622.00 167.00,622.00              167.00,622.00 167.00,621.00 167.00,621.00              167.00,621.00 166.00,621.00 166.00,621.00 Z            M 148.00,622.00            C 148.00,622.00 149.00,623.00 149.00,623.00              149.00,623.00 149.00,622.00 149.00,622.00              149.00,622.00 148.00,622.00 148.00,622.00 Z            M 149.00,623.00            C 149.00,623.00 150.00,624.00 150.00,624.00              150.00,624.00 150.00,623.00 150.00,623.00              150.00,623.00 149.00,623.00 149.00,623.00 Z            M 336.00,625.94            C 342.49,624.52 339.74,622.26 348.00,622.00              346.12,628.73 342.16,628.54 336.09,630.17              327.41,632.50 316.69,634.46 308.00,631.00              316.65,626.45 326.74,627.98 336.00,625.94 Z            M 396.00,623.00            C 394.46,627.01 392.59,630.75 394.00,635.00              394.00,635.00 398.00,623.00 398.00,623.00              398.00,623.00 396.00,623.00 396.00,623.00 Z            M 461.00,628.00            C 461.00,628.00 465.00,623.00 465.00,623.00              465.00,623.00 461.00,628.00 461.00,628.00 Z            M 147.00,624.00            C 147.00,624.00 148.00,625.00 148.00,625.00              148.00,625.00 148.00,624.00 148.00,624.00              148.00,624.00 147.00,624.00 147.00,624.00 Z            M 228.00,639.00            C 224.98,636.51 223.19,627.15 222.00,623.00              226.22,626.05 227.23,634.00 228.00,639.00 Z            M 127.00,625.00            C 127.00,625.00 128.00,626.00 128.00,626.00              128.00,626.00 128.00,625.00 128.00,625.00              128.00,625.00 127.00,625.00 127.00,625.00 Z            M 148.00,625.00            C 148.00,625.00 149.00,626.00 149.00,626.00              149.00,626.00 149.00,625.00 149.00,625.00              149.00,625.00 148.00,625.00 148.00,625.00 Z            M 289.00,625.00            C 289.00,625.00 290.00,626.00 290.00,626.00              290.00,626.00 290.00,625.00 290.00,625.00              290.00,625.00 289.00,625.00 289.00,625.00 Z            M 246.00,632.00            C 246.00,632.00 248.00,626.00 248.00,626.00              248.00,626.00 246.00,632.00 246.00,632.00 Z            M 85.00,626.00            C 85.00,626.00 85.00,628.00 85.00,628.00              85.00,628.00 71.00,628.00 71.00,628.00              71.00,628.00 71.00,626.00 71.00,626.00              71.00,626.00 85.00,626.00 85.00,626.00 Z            M 150.00,627.00            C 150.00,627.00 151.00,628.00 151.00,628.00              151.00,628.00 151.00,627.00 151.00,627.00              151.00,627.00 150.00,627.00 150.00,627.00 Z            M 272.00,627.00            C 272.00,627.00 273.00,628.00 273.00,628.00              273.00,628.00 273.00,627.00 273.00,627.00              273.00,627.00 272.00,627.00 272.00,627.00 Z            M 294.00,639.00            C 294.00,639.00 298.00,633.00 298.00,633.00              298.00,633.00 297.12,640.00 297.12,640.00              296.84,642.70 297.80,644.12 297.12,647.00              296.25,652.53 291.75,660.83 289.69,666.00              287.41,671.76 285.43,678.56 281.00,683.00              281.00,683.00 290.00,658.00 290.00,658.00              290.00,658.00 286.00,660.00 286.00,660.00              286.00,660.00 294.00,626.00 294.00,626.00              294.00,626.00 294.00,639.00 294.00,639.00 Z            M 358.61,633.50            C 353.41,637.72 348.21,642.37 342.00,645.00              342.00,645.00 363.00,627.00 363.00,627.00              363.72,630.34 361.04,631.52 358.61,633.50 Z            M 457.00,634.00            C 460.08,632.09 460.12,631.47 461.00,628.00              461.00,628.00 457.00,634.00 457.00,634.00 Z            M 151.00,629.00            C 151.00,629.00 152.00,630.00 152.00,630.00              152.00,630.00 152.00,629.00 152.00,629.00              152.00,629.00 151.00,629.00 151.00,629.00 Z            M 505.00,636.33            C 513.25,633.54 518.73,628.84 528.00,628.00              525.86,631.07 511.99,639.85 508.17,641.17              504.70,642.68 501.83,644.16 499.00,641.17              499.00,641.17 495.00,642.00 495.00,642.00              496.95,636.96 500.51,637.85 505.00,636.33 Z            M 251.00,637.00            C 251.00,637.00 251.00,630.00 251.00,630.00              251.00,630.00 251.00,637.00 251.00,637.00 Z            M 277.00,630.00            C 277.00,630.00 278.00,631.00 278.00,631.00              278.00,631.00 278.00,630.00 278.00,630.00              278.00,630.00 277.00,630.00 277.00,630.00 Z            M 155.00,631.00            C 155.00,631.00 156.00,632.00 156.00,632.00              156.00,632.00 156.00,631.00 156.00,631.00              156.00,631.00 155.00,631.00 155.00,631.00 Z            M 279.00,631.00            C 279.00,631.00 280.00,632.00 280.00,632.00              280.00,632.00 280.00,631.00 280.00,631.00              280.00,631.00 279.00,631.00 279.00,631.00 Z            M 281.00,632.00            C 281.00,632.00 282.00,633.00 282.00,633.00              282.00,633.00 282.00,632.00 282.00,632.00              282.00,632.00 281.00,632.00 281.00,632.00 Z            M 269.00,633.00            C 269.00,633.00 270.00,634.00 270.00,634.00              270.00,634.00 270.00,633.00 270.00,633.00              270.00,633.00 269.00,633.00 269.00,633.00 Z            M 259.46,634.54            C 259.46,634.54 260.85,649.89 260.85,649.89              260.85,649.89 260.00,653.00 260.00,653.00              260.00,653.00 258.00,633.00 258.00,633.00              258.00,633.00 259.46,634.54 259.46,634.54 Z            M 454.00,640.00            C 454.00,640.00 457.00,634.00 457.00,634.00              454.50,636.13 453.41,636.60 454.00,640.00 Z            M 280.00,635.00            C 280.00,635.00 281.00,636.00 281.00,636.00              281.00,636.00 281.00,635.00 281.00,635.00              281.00,635.00 280.00,635.00 280.00,635.00 Z            M 287.00,635.00            C 287.00,635.00 288.00,636.00 288.00,636.00              288.00,636.00 288.00,635.00 288.00,635.00              288.00,635.00 287.00,635.00 287.00,635.00 Z            M 320.00,634.00            C 320.00,634.00 320.00,636.00 320.00,636.00              320.00,636.00 308.00,636.00 308.00,636.00              308.00,636.00 308.00,634.00 308.00,634.00              308.00,634.00 320.00,634.00 320.00,634.00 Z            M 353.76,644.00            C 349.78,649.38 348.33,652.33 348.00,659.00              352.27,657.20 353.99,656.15 358.00,659.00              358.00,659.00 365.00,655.00 365.00,655.00              365.00,655.00 354.00,664.00 354.00,664.00              359.25,662.72 363.52,658.02 369.00,660.00              369.00,660.00 363.00,663.00 363.00,663.00              363.00,663.00 381.00,654.00 381.00,654.00              375.21,664.36 364.04,660.24 358.00,673.00              358.00,673.00 370.00,665.00 370.00,665.00              373.20,666.09 377.30,667.75 372.81,671.27              370.59,673.01 365.14,673.66 362.00,674.93              356.53,677.13 354.68,679.69 348.00,682.00              348.00,682.00 349.00,680.00 349.00,680.00              349.00,680.00 340.00,686.00 340.00,686.00              340.00,686.00 343.00,683.00 343.00,683.00              343.00,683.00 341.00,680.00 341.00,680.00              341.00,680.00 348.00,675.00 348.00,675.00              335.72,677.33 327.92,687.68 319.00,690.00              319.00,690.00 320.00,685.00 320.00,685.00              320.00,685.00 318.00,685.00 318.00,685.00              318.00,685.00 319.00,679.00 319.00,679.00              319.00,679.00 317.00,679.00 317.00,679.00              317.00,679.00 315.00,691.00 315.00,691.00              312.21,686.68 313.00,681.99 313.00,677.00              313.00,677.00 311.00,677.00 311.00,677.00              311.00,677.00 311.00,681.00 311.00,681.00              311.00,681.00 308.00,678.00 308.00,678.00              308.00,678.00 307.00,683.00 307.00,683.00              307.00,683.00 309.00,666.00 309.00,666.00              309.00,666.00 310.00,670.00 310.00,670.00              310.00,670.00 310.93,657.00 310.93,657.00              310.93,657.00 313.00,645.00 313.00,645.00              313.00,645.00 315.00,645.00 315.00,645.00              315.00,653.14 314.05,672.13 316.00,679.00              317.42,674.45 319.11,667.92 323.00,665.00              323.00,665.00 323.00,684.00 323.00,684.00              323.00,684.00 327.00,681.00 327.00,681.00              327.00,681.00 327.00,682.00 327.00,682.00              327.00,682.00 325.00,684.00 325.00,684.00              337.77,676.86 346.67,669.11 357.00,659.00              357.00,659.00 348.56,664.48 348.56,664.48              348.56,664.48 330.00,674.87 330.00,674.87              330.00,674.87 327.00,674.87 327.00,674.87              327.00,674.87 347.00,661.00 347.00,661.00              347.00,661.00 348.00,651.00 348.00,651.00              348.00,651.00 337.00,656.00 337.00,656.00              337.00,656.00 346.71,648.08 346.71,648.08              346.71,648.08 360.00,634.00 360.00,634.00              359.95,638.06 356.11,640.83 353.76,644.00 Z            M 431.00,635.00            C 431.00,635.00 432.00,636.00 432.00,636.00              432.00,636.00 432.00,635.00 432.00,635.00              432.00,635.00 431.00,635.00 431.00,635.00 Z            M 156.00,636.00            C 156.00,636.00 157.00,637.00 157.00,637.00              157.00,637.00 157.00,636.00 157.00,636.00              157.00,636.00 156.00,636.00 156.00,636.00 Z            M 160.00,640.00            C 160.00,640.00 160.00,639.00 160.00,639.00              160.00,639.00 158.00,637.00 158.00,637.00              158.00,637.00 160.00,640.00 160.00,640.00 Z            M 169.00,637.00            C 169.00,637.00 170.00,638.00 170.00,638.00              170.00,638.00 170.00,637.00 170.00,637.00              170.00,637.00 169.00,637.00 169.00,637.00 Z            M 193.00,637.00            C 193.00,637.00 194.00,638.00 194.00,638.00              194.00,638.00 194.00,637.00 194.00,637.00              194.00,637.00 193.00,637.00 193.00,637.00 Z            M 392.00,637.00            C 392.00,637.00 393.00,638.00 393.00,638.00              393.00,638.00 393.00,637.00 393.00,637.00              393.00,637.00 392.00,637.00 392.00,637.00 Z            M 428.00,637.00            C 428.00,637.00 426.00,642.00 426.00,642.00              426.00,642.00 431.00,637.00 431.00,637.00              431.00,637.00 428.00,637.00 428.00,637.00 Z            M 450.00,637.00            C 450.00,637.00 451.00,638.00 451.00,638.00              451.00,638.00 451.00,637.00 451.00,637.00              451.00,637.00 450.00,637.00 450.00,637.00 Z            M 447.00,648.00            C 447.00,648.00 450.00,638.00 450.00,638.00              447.26,641.18 445.62,643.78 447.00,648.00 Z            M 170.00,639.00            C 170.00,639.00 171.00,640.00 171.00,640.00              171.00,640.00 171.00,639.00 171.00,639.00              171.00,639.00 170.00,639.00 170.00,639.00 Z            M 194.00,639.00            C 194.00,639.00 195.00,640.00 195.00,640.00              195.00,640.00 195.00,639.00 195.00,639.00              195.00,639.00 194.00,639.00 194.00,639.00 Z            M 201.00,649.00            C 201.00,649.00 202.00,648.00 202.00,648.00              202.00,648.00 196.00,640.00 196.00,640.00              195.12,644.35 197.82,646.49 201.00,649.00 Z            M 278.00,640.00            C 278.00,640.00 279.00,641.00 279.00,641.00              279.00,641.00 279.00,640.00 279.00,640.00              279.00,640.00 278.00,640.00 278.00,640.00 Z            M 285.00,640.00            C 285.00,640.00 286.00,641.00 286.00,641.00              286.00,641.00 286.00,640.00 286.00,640.00              286.00,640.00 285.00,640.00 285.00,640.00 Z            M 342.00,643.00            C 342.00,643.00 334.00,639.00 334.00,639.00              337.80,639.60 339.76,639.68 342.00,643.00 Z            M 382.00,639.00            C 379.02,642.51 374.89,646.21 370.00,645.00              370.00,645.00 382.00,639.00 382.00,639.00 Z            M 504.00,640.00            C 504.00,640.00 505.00,641.00 505.00,641.00              505.00,641.00 505.00,640.00 505.00,640.00              505.00,640.00 504.00,640.00 504.00,640.00 Z            M 252.00,654.00            C 252.00,654.00 252.00,642.00 252.00,642.00              250.54,645.69 250.54,650.31 252.00,654.00 Z            M 328.00,642.00            C 328.00,642.00 329.00,643.00 329.00,643.00              329.00,643.00 329.00,642.00 329.00,642.00              329.00,642.00 328.00,642.00 328.00,642.00 Z            M 113.00,644.00            C 113.00,644.00 114.00,645.00 114.00,645.00              114.00,645.00 114.00,644.00 114.00,644.00              114.00,644.00 113.00,644.00 113.00,644.00 Z            M 296.00,644.00            C 296.00,644.00 297.00,645.00 297.00,645.00              297.00,645.00 297.00,644.00 297.00,644.00              297.00,644.00 296.00,644.00 296.00,644.00 Z            M 276.00,645.00            C 276.00,645.00 277.00,646.00 277.00,646.00              277.00,646.00 277.00,645.00 277.00,645.00              277.00,645.00 276.00,645.00 276.00,645.00 Z            M 234.00,660.00            C 234.00,660.00 229.87,653.04 229.87,653.04              229.87,653.04 224.00,645.00 224.00,645.00              230.81,648.35 232.88,652.78 234.00,660.00 Z            M 294.00,647.00            C 294.00,647.00 295.00,648.00 295.00,648.00              295.00,648.00 295.00,647.00 295.00,647.00              295.00,647.00 294.00,647.00 294.00,647.00 Z            M 478.00,647.00            C 478.00,647.00 479.00,648.00 479.00,648.00              479.00,648.00 479.00,647.00 479.00,647.00              479.00,647.00 478.00,647.00 478.00,647.00 Z            M 295.00,648.00            C 295.00,648.00 296.00,649.00 296.00,649.00              296.00,649.00 296.00,648.00 296.00,648.00              296.00,648.00 295.00,648.00 295.00,648.00 Z            M 389.00,648.00            C 389.00,648.00 390.00,649.00 390.00,649.00              390.00,649.00 390.00,648.00 390.00,648.00              390.00,648.00 389.00,648.00 389.00,648.00 Z            M 421.00,648.00            C 421.00,648.00 422.00,649.00 422.00,649.00              422.00,649.00 422.00,648.00 422.00,648.00              422.00,648.00 421.00,648.00 421.00,648.00 Z            M 445.00,648.00            C 445.00,648.00 446.00,649.00 446.00,649.00              446.00,649.00 446.00,648.00 446.00,648.00              446.00,648.00 445.00,648.00 445.00,648.00 Z            M 205.00,654.00            C 205.00,654.00 202.00,649.00 202.00,649.00              202.00,649.00 205.00,654.00 205.00,654.00 Z            M 293.00,649.00            C 293.00,649.00 294.00,650.00 294.00,650.00              294.00,650.00 294.00,649.00 294.00,649.00              294.00,649.00 293.00,649.00 293.00,649.00 Z            M 420.00,649.00            C 420.00,649.00 421.00,650.00 421.00,650.00              421.00,650.00 421.00,649.00 421.00,649.00              421.00,649.00 420.00,649.00 420.00,649.00 Z            M 437.00,655.00            C 437.00,655.00 438.00,649.00 438.00,649.00              436.33,651.59 436.05,652.02 437.00,655.00 Z            M 292.00,654.00            C 292.00,654.00 293.00,650.00 293.00,650.00              293.00,650.00 292.00,654.00 292.00,654.00 Z            M 118.00,652.00            C 118.00,652.00 119.00,653.00 119.00,653.00              119.00,653.00 119.00,652.00 119.00,652.00              119.00,652.00 118.00,652.00 118.00,652.00 Z            M 263.00,666.00            C 263.00,666.00 262.00,652.00 262.00,652.00              263.64,654.96 263.51,662.51 263.00,666.00 Z            M 304.00,653.00            C 304.00,653.00 305.00,654.00 305.00,654.00              305.00,654.00 305.00,653.00 305.00,653.00              305.00,653.00 304.00,653.00 304.00,653.00 Z            M 189.00,654.00            C 189.00,654.00 190.00,655.00 190.00,655.00              190.00,655.00 190.00,654.00 190.00,654.00              190.00,654.00 189.00,654.00 189.00,654.00 Z            M 215.00,654.00            C 215.00,654.00 216.00,655.00 216.00,655.00              216.00,655.00 216.00,654.00 216.00,654.00              216.00,654.00 215.00,654.00 215.00,654.00 Z            M 180.00,655.00            C 180.00,655.00 181.00,656.00 181.00,656.00              181.00,656.00 181.00,655.00 181.00,655.00              181.00,655.00 180.00,655.00 180.00,655.00 Z            M 303.00,655.00            C 303.00,655.00 304.00,656.00 304.00,656.00              304.00,656.00 304.00,655.00 304.00,655.00              304.00,655.00 303.00,655.00 303.00,655.00 Z            M 384.00,667.00            C 384.00,667.00 387.00,655.00 387.00,655.00              383.97,658.28 382.56,662.66 384.00,667.00 Z            M 332.00,663.00            C 332.00,663.00 341.00,655.00 341.00,655.00              340.94,659.20 335.45,661.51 332.00,663.00 Z            M 409.00,661.00            C 409.00,661.00 413.00,657.00 413.00,657.00              413.00,657.00 409.00,661.00 409.00,661.00 Z            M 470.00,657.00            C 470.00,657.00 471.00,658.00 471.00,658.00              471.00,658.00 471.00,657.00 471.00,657.00              471.00,657.00 470.00,657.00 470.00,657.00 Z            M 182.00,659.00            C 182.00,659.00 183.00,660.00 183.00,660.00              183.00,660.00 183.00,659.00 183.00,659.00              183.00,659.00 182.00,659.00 182.00,659.00 Z            M 242.00,664.00            C 242.00,664.00 238.00,658.00 238.00,658.00              241.08,659.91 241.12,660.53 242.00,664.00 Z            M 347.00,659.00            C 347.00,659.00 348.00,660.00 348.00,660.00              348.00,660.00 348.00,659.00 348.00,659.00              348.00,659.00 347.00,659.00 347.00,659.00 Z            M 180.00,660.00            C 180.00,660.00 181.00,661.00 181.00,661.00              181.00,661.00 181.00,660.00 181.00,660.00              181.00,660.00 180.00,660.00 180.00,660.00 Z            M 403.00,660.00            C 403.00,660.00 404.00,661.00 404.00,661.00              404.00,661.00 404.00,660.00 404.00,660.00              404.00,660.00 403.00,660.00 403.00,660.00 Z            M 186.00,668.00            C 186.00,668.00 182.00,661.00 182.00,661.00              181.62,664.77 183.22,665.75 186.00,668.00 Z            M 243.00,683.00            C 238.86,680.52 237.42,678.89 237.00,674.00              232.74,671.48 228.03,664.52 226.00,660.00              232.59,665.33 239.63,675.24 243.00,683.00 Z            M 407.00,661.00            C 407.00,661.00 408.00,662.00 408.00,662.00              408.00,662.00 408.00,661.00 408.00,661.00              408.00,661.00 407.00,661.00 407.00,661.00 Z            M 420.03,668.00            C 420.03,668.00 405.82,685.71 405.82,685.71              402.98,688.48 400.80,690.92 397.00,689.00              397.00,689.00 383.00,707.00 383.00,707.00              387.52,703.98 396.63,694.68 402.00,696.00              402.00,696.00 392.00,703.00 392.00,703.00              392.00,703.00 400.00,700.00 400.00,700.00              395.90,707.07 392.04,707.22 386.09,711.59              386.09,711.59 380.58,716.45 380.58,716.45              373.23,722.43 371.01,722.26 365.00,731.00              371.18,727.08 379.74,718.33 386.00,717.00              386.00,717.00 372.00,732.00 372.00,732.00              372.00,732.00 390.00,718.00 390.00,718.00              386.50,728.89 375.43,735.74 366.00,741.00              366.00,741.00 374.00,742.00 374.00,742.00              370.60,746.02 369.03,747.25 364.00,749.00              364.00,749.00 364.00,751.00 364.00,751.00              364.00,751.00 367.00,752.00 367.00,752.00              367.00,752.00 357.00,759.00 357.00,759.00              357.00,759.00 362.00,759.00 362.00,759.00              362.00,759.00 362.00,761.00 362.00,761.00              362.00,761.00 338.00,765.00 338.00,765.00              348.25,766.28 344.65,768.21 357.00,766.00              354.90,771.22 352.03,769.91 347.00,770.01              347.00,770.01 325.00,770.01 325.00,770.01              325.00,770.01 337.00,773.00 337.00,773.00              337.00,773.00 337.00,774.77 337.00,774.77              334.47,775.00 331.44,775.13 329.00,774.77              321.70,772.76 303.73,763.57 299.00,758.00              299.00,758.00 304.00,758.00 304.00,758.00              304.00,758.00 302.00,758.00 302.00,758.00              302.00,758.00 302.00,757.00 302.00,757.00              302.00,757.00 310.00,761.00 310.00,761.00              310.00,761.00 307.00,757.00 307.00,757.00              307.00,757.00 321.00,762.55 321.00,762.55              321.00,762.55 339.00,768.00 339.00,768.00              334.14,763.06 329.89,764.12 324.00,761.87              320.99,760.72 315.86,757.01 313.00,755.00              329.31,755.36 338.22,767.29 356.00,759.00              348.43,758.98 349.62,758.56 343.00,757.69              333.19,756.40 324.92,755.89 317.00,749.00              324.57,748.23 328.05,751.05 335.00,752.49              339.98,753.52 348.81,754.01 354.00,754.00              358.75,753.99 360.44,754.51 364.00,751.00              364.00,751.00 339.00,749.17 339.00,749.17              333.98,748.69 331.49,749.91 327.00,747.00              327.00,747.00 348.00,745.00 348.00,745.00              348.00,745.00 340.00,742.00 340.00,742.00              351.71,737.72 357.17,739.86 365.00,727.00              359.55,728.55 353.79,732.92 348.00,731.00              348.00,731.00 367.00,722.00 367.00,722.00              367.00,722.00 357.00,725.00 357.00,725.00              357.00,725.00 370.00,717.19 370.00,717.19              370.00,717.19 382.00,705.00 382.00,705.00              375.24,705.11 371.39,710.33 365.00,713.00              365.00,713.00 365.00,710.00 365.00,710.00              365.00,710.00 362.00,711.00 362.00,711.00              364.97,705.02 377.30,697.55 383.00,693.00              383.00,693.00 372.00,696.00 372.00,696.00              374.60,691.35 381.50,686.06 387.00,688.00              387.00,688.00 381.00,690.00 381.00,690.00              381.00,690.00 387.00,689.00 387.00,689.00              387.00,689.00 386.00,692.00 386.00,692.00              386.00,692.00 402.00,674.00 402.00,674.00              402.00,674.00 392.00,692.00 392.00,692.00              392.00,692.00 409.82,674.09 409.82,674.09              409.82,674.09 420.00,663.00 420.00,663.00              420.00,663.00 420.00,665.00 420.00,665.00              420.00,665.00 424.00,660.00 424.00,660.00              424.72,663.38 422.01,665.33 420.03,668.00 Z            M 490.00,661.00            C 490.00,661.00 491.00,662.00 491.00,662.00              491.00,662.00 491.00,661.00 491.00,661.00              491.00,661.00 490.00,661.00 490.00,661.00 Z            M 195.00,662.00            C 195.00,662.00 196.00,663.00 196.00,663.00              196.00,663.00 196.00,662.00 196.00,662.00              196.00,662.00 195.00,662.00 195.00,662.00 Z            M 466.00,663.00            C 466.00,663.00 467.00,664.00 467.00,664.00              467.00,664.00 467.00,663.00 467.00,663.00              467.00,663.00 466.00,663.00 466.00,663.00 Z            M 490.00,663.00            C 490.00,663.00 491.00,664.00 491.00,664.00              491.00,664.00 491.00,663.00 491.00,663.00              491.00,663.00 490.00,663.00 490.00,663.00 Z            M 91.00,664.00            C 94.30,668.12 95.84,669.02 101.00,670.00              97.74,666.27 95.80,665.15 91.00,664.00 Z            M 353.00,664.00            C 353.00,664.00 354.00,665.00 354.00,665.00              354.00,665.00 354.00,664.00 354.00,664.00              354.00,664.00 353.00,664.00 353.00,664.00 Z            M 403.00,664.00            C 403.00,664.00 404.00,665.00 404.00,665.00              404.00,665.00 404.00,664.00 404.00,664.00              404.00,664.00 403.00,664.00 403.00,664.00 Z            M 431.00,664.00            C 431.00,664.00 432.00,665.00 432.00,665.00              432.00,665.00 432.00,664.00 432.00,664.00              432.00,664.00 431.00,664.00 431.00,664.00 Z            M 482.00,671.00            C 486.33,669.39 487.17,668.19 489.00,664.00              489.00,664.00 482.00,671.00 482.00,671.00 Z            M 353.00,672.00            C 357.28,670.59 358.17,669.01 360.00,665.00              355.82,667.03 355.20,667.96 353.00,672.00 Z            M 419.00,665.00            C 419.00,665.00 420.00,666.00 420.00,666.00              420.00,666.00 420.00,665.00 420.00,665.00              420.00,665.00 419.00,665.00 419.00,665.00 Z            M 490.00,665.00            C 490.00,665.00 491.00,666.00 491.00,666.00              491.00,666.00 491.00,665.00 491.00,665.00              491.00,665.00 490.00,665.00 490.00,665.00 Z            M 355.00,666.00            C 355.00,666.00 356.00,667.00 356.00,667.00              356.00,667.00 356.00,666.00 356.00,666.00              356.00,666.00 355.00,666.00 355.00,666.00 Z            M 418.00,666.00            C 418.00,666.00 419.00,667.00 419.00,667.00              419.00,667.00 419.00,666.00 419.00,666.00              419.00,666.00 418.00,666.00 418.00,666.00 Z            M 105.00,667.00            C 105.00,667.00 106.00,668.00 106.00,668.00              106.00,668.00 106.00,667.00 106.00,667.00              106.00,667.00 105.00,667.00 105.00,667.00 Z            M 217.00,667.00            C 217.00,667.00 218.00,668.00 218.00,668.00              218.00,668.00 218.00,667.00 218.00,667.00              218.00,667.00 217.00,667.00 217.00,667.00 Z            M 363.00,672.00            C 367.89,671.59 371.32,671.49 374.00,667.00              368.72,667.48 366.62,668.01 363.00,672.00 Z            M 399.00,667.00            C 399.00,667.00 400.00,668.00 400.00,668.00              400.00,668.00 400.00,667.00 400.00,667.00              400.00,667.00 399.00,667.00 399.00,667.00 Z            M 417.00,667.00            C 417.00,667.00 418.00,668.00 418.00,668.00              418.00,668.00 418.00,667.00 418.00,667.00              418.00,667.00 417.00,667.00 417.00,667.00 Z            M 101.00,668.00            C 101.00,668.00 102.00,669.00 102.00,669.00              102.00,669.00 102.00,668.00 102.00,668.00              102.00,668.00 101.00,668.00 101.00,668.00 Z            M 107.00,668.00            C 107.00,668.00 108.00,669.00 108.00,669.00              108.00,669.00 108.00,668.00 108.00,668.00              108.00,668.00 107.00,668.00 107.00,668.00 Z            M 381.00,675.00            C 381.00,675.00 383.00,668.00 383.00,668.00              380.79,670.61 380.09,671.60 381.00,675.00 Z            M 398.00,668.00            C 398.00,668.00 399.00,669.00 399.00,669.00              399.00,669.00 399.00,668.00 399.00,668.00              399.00,668.00 398.00,668.00 398.00,668.00 Z            M 291.56,671.11            C 291.56,671.11 287.50,686.46 287.50,686.46              287.50,686.46 286.00,688.00 286.00,688.00              286.00,688.00 291.00,668.00 291.00,668.00              291.00,668.00 291.56,671.11 291.56,671.11 Z            M 391.00,676.00            C 391.00,676.00 394.00,669.00 394.00,669.00              391.50,671.42 390.27,672.42 391.00,676.00 Z            M 499.00,669.00            C 499.00,669.00 500.00,670.00 500.00,670.00              500.00,670.00 500.00,669.00 500.00,669.00              500.00,669.00 499.00,669.00 499.00,669.00 Z            M 246.00,679.00            C 246.00,679.00 244.00,679.00 244.00,679.00              244.00,679.00 239.00,669.00 239.00,669.00              242.75,671.34 244.64,674.88 246.00,679.00 Z            M 472.00,684.00            C 478.21,682.18 484.27,675.77 487.00,670.00              480.30,673.77 475.71,677.08 472.00,684.00 Z            M 461.00,704.00            C 467.21,701.37 472.18,696.76 477.58,692.81              477.58,692.81 485.00,687.95 485.00,687.95              490.05,684.14 496.53,675.83 499.00,670.00              482.82,675.19 469.88,690.01 461.00,704.00 Z            M 481.00,671.00            C 481.00,671.00 482.00,672.00 482.00,672.00              482.00,672.00 482.00,671.00 482.00,671.00              482.00,671.00 481.00,671.00 481.00,671.00 Z            M 296.00,672.00            C 296.00,672.00 297.00,673.00 297.00,673.00              297.00,673.00 297.00,672.00 297.00,672.00              297.00,672.00 296.00,672.00 296.00,672.00 Z            M 348.00,675.00            C 348.00,675.00 353.00,672.00 353.00,672.00              353.00,672.00 348.00,675.00 348.00,675.00 Z            M 389.00,672.00            C 389.00,672.00 390.00,673.00 390.00,673.00              390.00,673.00 390.00,672.00 390.00,672.00              390.00,672.00 389.00,672.00 389.00,672.00 Z            M 346.00,673.00            C 346.00,673.00 347.00,674.00 347.00,674.00              347.00,674.00 347.00,673.00 347.00,673.00              347.00,673.00 346.00,673.00 346.00,673.00 Z            M 517.00,674.00            C 517.00,674.00 518.00,675.00 518.00,675.00              518.00,675.00 518.00,674.00 518.00,674.00              518.00,674.00 517.00,674.00 517.00,674.00 Z            M 121.00,675.00            C 121.00,675.00 122.00,676.00 122.00,676.00              122.00,676.00 122.00,675.00 122.00,675.00              122.00,675.00 121.00,675.00 121.00,675.00 Z            M 352.00,675.00            C 352.00,675.00 353.00,676.00 353.00,676.00              353.00,676.00 353.00,675.00 353.00,675.00              353.00,675.00 352.00,675.00 352.00,675.00 Z            M 386.00,675.00            C 386.00,675.00 382.00,682.00 382.00,682.00              386.01,679.99 386.54,679.22 388.00,675.00              388.00,675.00 386.00,675.00 386.00,675.00 Z            M 440.00,675.00            C 440.00,675.00 428.00,693.00 428.00,693.00              432.28,690.54 440.40,679.72 442.00,675.00              442.00,675.00 440.00,675.00 440.00,675.00 Z            M 511.00,677.00            C 511.00,677.00 517.00,675.00 517.00,675.00              517.00,675.00 511.00,677.00 511.00,677.00 Z            M 122.00,676.00            C 122.00,676.00 123.00,677.00 123.00,677.00              123.00,677.00 123.00,676.00 123.00,676.00              123.00,676.00 122.00,676.00 122.00,676.00 Z            M 123.00,677.00            C 123.00,677.00 124.00,678.00 124.00,678.00              124.00,678.00 124.00,677.00 124.00,677.00              124.00,677.00 123.00,677.00 123.00,677.00 Z            M 408.00,679.00            C 408.00,679.00 409.00,680.00 409.00,680.00              409.00,680.00 409.00,679.00 409.00,679.00              409.00,679.00 408.00,679.00 408.00,679.00 Z            M 125.00,680.00            C 125.00,680.00 126.00,681.00 126.00,681.00              126.00,681.00 126.00,680.00 126.00,680.00              126.00,680.00 125.00,680.00 125.00,680.00 Z            M 404.00,685.00            C 404.00,685.00 408.00,680.00 408.00,680.00              408.00,680.00 404.00,685.00 404.00,685.00 Z            M 115.10,688.83            C 121.62,696.12 135.58,700.90 133.00,709.00              129.92,702.27 128.28,701.87 123.00,697.00              123.00,697.00 129.00,705.00 129.00,705.00              121.85,703.51 106.24,694.56 103.00,688.00              103.00,688.00 117.00,692.00 117.00,692.00              112.58,689.36 108.95,684.78 107.00,680.00              111.44,682.21 111.77,685.12 115.10,688.83 Z            M 273.19,688.83            C 276.86,693.26 289.54,701.63 295.00,704.00              295.00,704.00 278.00,689.00 278.00,689.00              278.00,689.00 281.00,689.00 281.00,689.00              281.00,689.00 281.00,692.00 281.00,692.00              284.95,692.50 287.07,694.62 289.00,698.00              292.39,698.45 300.84,702.33 303.00,705.00              303.00,705.00 296.00,703.00 296.00,703.00              297.85,707.44 298.83,711.38 297.00,716.00              297.00,716.00 297.00,707.00 297.00,707.00              297.00,707.00 291.00,705.00 291.00,705.00              290.99,712.94 289.35,721.82 284.00,728.00              284.00,728.00 286.00,724.00 286.00,724.00              286.00,724.00 290.00,704.00 290.00,704.00              285.03,701.24 272.18,692.44 269.81,687.49              268.96,685.70 269.06,683.92 269.00,682.00              269.00,682.00 273.19,688.83 273.19,688.83 Z            M 127.00,685.00            C 127.00,685.00 128.00,686.00 128.00,686.00              128.00,686.00 128.00,685.00 128.00,685.00              128.00,685.00 127.00,685.00 127.00,685.00 Z            M 165.00,685.00            C 165.00,685.00 166.00,686.00 166.00,686.00              166.00,686.00 166.00,685.00 166.00,685.00              166.00,685.00 165.00,685.00 165.00,685.00 Z            M 126.00,686.00            C 126.00,686.00 127.00,687.00 127.00,687.00              127.00,687.00 127.00,686.00 127.00,686.00              127.00,686.00 126.00,686.00 126.00,686.00 Z            M 266.00,698.00            C 266.00,698.00 265.00,690.00 265.00,690.00              265.00,690.00 267.00,685.00 267.00,685.00              268.29,688.53 267.39,694.52 266.00,698.00 Z            M 368.00,691.00            C 368.00,691.00 358.00,689.00 358.00,689.00              358.00,689.00 359.00,692.00 359.00,692.00              359.00,692.00 349.00,691.00 349.00,691.00              349.00,691.00 347.00,694.00 347.00,694.00              347.00,694.00 360.00,703.00 360.00,703.00              360.00,703.00 347.00,705.38 347.00,705.38              347.00,705.38 341.00,704.06 341.00,704.06              341.00,704.06 327.00,704.06 327.00,704.06              327.00,704.06 300.00,701.00 300.00,701.00              300.00,701.00 300.00,699.00 300.00,699.00              300.00,699.00 337.00,700.00 337.00,700.00              337.00,700.00 334.00,698.00 334.00,698.00              341.07,699.10 344.05,704.11 355.00,701.00              349.14,699.43 346.40,696.09 342.00,695.56              338.54,695.13 326.79,696.70 320.00,693.85              320.00,693.85 333.91,693.85 333.91,693.85              333.91,693.85 346.00,691.00 346.00,691.00              346.00,691.00 344.00,687.00 344.00,687.00              352.08,686.93 363.07,682.15 368.00,691.00 Z            M 445.00,686.00            C 445.00,686.00 446.00,687.00 446.00,687.00              446.00,687.00 446.00,686.00 446.00,686.00              446.00,686.00 445.00,686.00 445.00,686.00 Z            M 444.00,687.00            C 444.00,687.00 445.00,688.00 445.00,688.00              445.00,688.00 445.00,687.00 445.00,687.00              445.00,687.00 444.00,687.00 444.00,687.00 Z            M 472.00,687.00            C 472.00,687.00 473.00,688.00 473.00,688.00              473.00,688.00 473.00,687.00 473.00,687.00              473.00,687.00 472.00,687.00 472.00,687.00 Z            M 380.00,690.00            C 380.00,690.00 381.00,691.00 381.00,691.00              381.00,691.00 381.00,690.00 381.00,690.00              381.00,690.00 380.00,690.00 380.00,690.00 Z            M 467.00,690.00            C 467.00,690.00 458.00,703.00 458.00,703.00              463.59,700.33 467.07,695.83 469.00,690.00              469.00,690.00 467.00,690.00 467.00,690.00 Z            M 245.00,715.00            C 245.00,715.00 241.00,716.00 241.00,716.00              241.00,716.00 251.00,723.00 251.00,723.00              251.00,723.00 246.00,722.00 246.00,722.00              248.39,727.01 250.43,728.14 255.00,731.00              255.00,731.00 255.00,733.00 255.00,733.00              250.38,738.37 256.42,747.30 260.00,752.00              260.00,752.00 261.00,751.00 261.00,751.00              258.87,746.98 257.75,743.21 260.00,739.00              260.00,739.00 263.00,749.00 263.00,749.00              263.00,749.00 263.00,741.00 263.00,741.00              263.00,741.00 265.00,741.00 265.00,741.00              265.00,741.00 268.00,748.00 268.00,748.00              268.00,748.00 269.00,743.00 269.00,743.00              271.62,752.24 267.83,750.12 274.11,763.00              277.23,769.40 283.19,775.64 285.00,782.00              285.00,782.00 280.63,780.40 280.63,780.40              280.63,780.40 267.00,758.00 267.00,758.00              268.21,763.45 271.25,766.25 268.00,771.00              268.00,771.00 271.00,772.00 271.00,772.00              271.00,772.00 270.00,775.00 270.00,775.00              270.00,775.00 273.00,777.00 273.00,777.00              263.61,771.89 266.30,759.56 259.00,753.00              259.00,753.00 261.33,764.00 261.33,764.00              261.33,764.00 263.00,771.00 263.00,771.00              255.65,765.84 257.23,752.80 249.00,748.00              249.00,748.00 252.00,751.00 252.00,751.00              251.26,760.86 255.96,760.80 257.00,770.00              250.65,768.31 248.00,764.05 246.00,758.00              246.00,758.00 243.00,759.00 243.00,759.00              237.78,746.33 240.08,746.00 227.00,739.00              227.00,739.00 227.00,737.00 227.00,737.00              227.00,737.00 234.00,738.00 234.00,738.00              234.00,738.00 235.00,734.00 235.00,734.00              235.00,734.00 238.00,740.00 238.00,740.00              237.20,731.46 234.38,728.52 226.00,727.00              226.00,727.00 227.00,724.00 227.00,724.00              227.00,724.00 219.00,719.00 219.00,719.00              219.00,719.00 235.00,726.00 235.00,726.00              232.31,719.44 231.78,720.58 226.00,718.00              226.00,718.00 229.00,717.00 229.00,717.00              220.55,712.93 213.27,708.79 209.00,700.00              220.11,702.32 221.58,708.82 231.00,712.00              228.32,704.15 221.84,701.36 216.00,696.00              218.35,694.06 217.81,693.86 217.00,691.00              224.92,694.57 240.83,707.13 245.00,715.00 Z            M 122.00,699.00            C 122.00,699.00 111.00,693.00 111.00,693.00              112.26,697.18 117.86,699.73 122.00,699.00 Z            M 368.00,707.00            C 374.18,705.47 383.83,698.60 387.00,693.00              382.05,695.19 370.77,702.55 368.00,707.00 Z            M 460.00,695.00            C 460.00,695.00 461.00,696.00 461.00,696.00              461.00,696.00 461.00,695.00 461.00,695.00              461.00,695.00 460.00,695.00 460.00,695.00 Z            M 254.00,704.00            C 254.00,704.00 241.00,695.00 241.00,695.00              247.37,696.63 251.79,696.84 254.00,704.00 Z            M 459.00,696.00            C 459.00,696.00 460.00,697.00 460.00,697.00              460.00,697.00 460.00,696.00 460.00,696.00              460.00,696.00 459.00,696.00 459.00,696.00 Z            M 493.00,696.00            C 493.00,696.00 494.00,697.00 494.00,697.00              494.00,697.00 494.00,696.00 494.00,696.00              494.00,696.00 493.00,696.00 493.00,696.00 Z            M 506.17,696.12            C 506.17,696.12 517.00,696.12 517.00,696.12              517.00,696.12 527.00,695.00 527.00,695.00              527.00,695.00 521.83,699.45 521.83,699.45              521.83,699.45 500.00,700.00 500.00,700.00              500.00,700.00 500.00,698.00 500.00,698.00              500.00,698.00 506.17,696.12 506.17,696.12 Z            M 424.00,697.00            C 424.00,697.00 407.21,719.96 407.21,719.96              402.26,726.05 398.88,728.22 396.00,736.00              401.50,733.27 405.19,727.04 408.75,722.13              414.64,714.01 422.47,706.55 426.00,697.00              426.00,697.00 424.00,697.00 424.00,697.00 Z            M 433.00,727.00            C 440.91,726.48 445.77,721.26 450.00,715.00              450.00,715.00 439.00,723.00 439.00,723.00              439.00,723.00 450.41,711.70 450.41,711.70              450.41,711.70 453.78,706.00 453.78,706.00              453.78,706.00 459.00,697.00 459.00,697.00              450.51,702.04 437.59,718.32 433.00,727.00 Z            M 494.00,697.00            C 494.00,697.00 495.00,698.00 495.00,698.00              495.00,698.00 495.00,697.00 495.00,697.00              495.00,697.00 494.00,697.00 494.00,697.00 Z            M 271.00,697.00            C 271.00,697.00 269.00,717.00 269.00,717.00              269.00,717.00 267.00,717.00 267.00,717.00              267.00,717.00 269.00,697.00 269.00,697.00              269.00,697.00 271.00,697.00 271.00,697.00 Z            M 319.00,698.00            C 319.00,698.00 312.00,697.00 312.00,697.00              312.00,697.00 319.00,698.00 319.00,698.00 Z            M 386.00,699.00            C 386.00,699.00 387.00,700.00 387.00,700.00              387.00,700.00 387.00,699.00 387.00,699.00              387.00,699.00 386.00,699.00 386.00,699.00 Z            M 471.00,699.00            C 471.00,699.00 472.00,700.00 472.00,700.00              472.00,700.00 472.00,699.00 472.00,699.00              472.00,699.00 471.00,699.00 471.00,699.00 Z            M 110.00,701.00            C 110.00,701.00 111.00,702.00 111.00,702.00              111.00,702.00 111.00,701.00 111.00,701.00              111.00,701.00 110.00,701.00 110.00,701.00 Z            M 279.00,700.00            C 279.22,710.22 280.33,712.79 275.00,723.00              275.00,723.00 277.90,709.28 277.90,709.28              277.90,709.28 277.00,700.00 277.00,700.00              277.00,700.00 279.00,700.00 279.00,700.00 Z            M 410.00,701.00            C 410.00,701.00 411.00,702.00 411.00,702.00              411.00,702.00 411.00,701.00 411.00,701.00              411.00,701.00 410.00,701.00 410.00,701.00 Z            M 219.00,706.00            C 219.00,706.00 213.00,702.00 213.00,702.00              213.92,705.20 215.71,706.33 219.00,706.00 Z            M 409.00,702.00            C 409.00,702.00 410.00,703.00 410.00,703.00              410.00,703.00 410.00,702.00 410.00,702.00              410.00,702.00 409.00,702.00 409.00,702.00 Z            M 77.00,702.00            C 77.00,702.00 77.00,704.00 77.00,704.00              77.00,704.00 60.00,704.00 60.00,704.00              60.00,704.00 60.00,702.00 60.00,702.00              60.00,702.00 77.00,702.00 77.00,702.00 Z            M 124.00,719.00            C 122.02,712.81 116.48,707.71 112.00,703.00              110.94,708.76 119.37,716.34 124.00,719.00 Z            M 390.00,703.00            C 390.00,703.00 387.00,707.00 387.00,707.00              387.00,707.00 392.00,703.00 392.00,703.00              392.00,703.00 390.00,703.00 390.00,703.00 Z            M 408.00,703.00            C 408.00,703.00 409.00,704.00 409.00,704.00              409.00,704.00 409.00,703.00 409.00,703.00              409.00,703.00 408.00,703.00 408.00,703.00 Z            M 453.00,709.00            C 453.00,709.00 458.00,703.00 458.00,703.00              458.00,703.00 453.00,709.00 453.00,709.00 Z            M 260.00,717.00            C 260.00,717.00 248.00,707.00 248.00,707.00              253.33,708.14 254.64,709.85 258.00,714.00              258.00,714.00 259.00,704.00 259.00,704.00              259.00,704.00 260.00,717.00 260.00,717.00 Z            M 407.00,705.00            C 407.00,705.00 408.00,706.00 408.00,706.00              408.00,706.00 408.00,705.00 408.00,705.00              408.00,705.00 407.00,705.00 407.00,705.00 Z            M 391.00,706.00            C 391.00,706.00 392.00,707.00 392.00,707.00              392.00,707.00 392.00,706.00 392.00,706.00              392.00,706.00 391.00,706.00 391.00,706.00 Z            M 91.00,707.00            C 91.00,707.00 92.00,708.00 92.00,708.00              92.00,708.00 92.00,707.00 92.00,707.00              92.00,707.00 91.00,707.00 91.00,707.00 Z            M 223.00,710.00            C 223.00,710.00 220.00,707.00 220.00,707.00              220.00,707.00 223.00,710.00 223.00,710.00 Z            M 338.00,706.00            C 334.17,711.50 323.93,708.83 319.00,706.00              319.00,706.00 338.00,706.00 338.00,706.00 Z            M 380.00,710.00            C 380.00,710.00 383.00,707.00 383.00,707.00              383.00,707.00 380.00,710.00 380.00,710.00 Z            M 386.00,707.00            C 386.00,707.00 387.00,708.00 387.00,708.00              387.00,708.00 387.00,707.00 387.00,707.00              387.00,707.00 386.00,707.00 386.00,707.00 Z            M 406.00,707.00            C 406.00,707.00 407.00,708.00 407.00,708.00              407.00,708.00 407.00,707.00 407.00,707.00              407.00,707.00 406.00,707.00 406.00,707.00 Z            M 366.00,709.00            C 366.00,709.00 367.00,710.00 367.00,710.00              367.00,710.00 367.00,709.00 367.00,709.00              367.00,709.00 366.00,709.00 366.00,709.00 Z            M 403.00,709.00            C 403.00,709.00 402.00,712.00 402.00,712.00              402.00,712.00 405.00,709.00 405.00,709.00              405.00,709.00 403.00,709.00 403.00,709.00 Z            M 416.91,721.41            C 409.07,727.86 402.52,730.63 397.00,740.00              404.43,737.63 403.85,735.80 409.17,731.80              409.17,731.80 416.91,727.46 416.91,727.46              421.39,724.23 428.74,714.03 431.00,709.00              421.62,715.51 421.63,717.53 416.91,721.41 Z            M 382.00,710.00            C 382.00,710.00 383.00,711.00 383.00,711.00              383.00,711.00 383.00,710.00 383.00,710.00              383.00,710.00 382.00,710.00 382.00,710.00 Z            M 235.00,711.00            C 235.68,714.96 236.12,715.11 240.00,716.00              238.94,712.69 238.31,712.06 235.00,711.00 Z            M 284.00,710.00            C 283.99,716.94 282.17,724.79 279.00,731.00              279.00,731.00 279.00,722.00 279.00,722.00              282.49,717.89 281.98,715.14 282.00,710.00              282.00,710.00 284.00,710.00 284.00,710.00 Z            M 302.00,721.00            C 302.00,721.00 300.00,710.00 300.00,710.00              303.75,712.61 303.56,717.05 302.00,721.00 Z            M 355.00,715.00            C 355.00,715.00 355.00,717.00 355.00,717.00              349.68,716.73 347.01,716.80 346.00,711.00              349.38,714.37 350.25,714.55 355.00,715.00 Z            M 379.00,712.00            C 379.00,712.00 380.00,713.00 380.00,713.00              380.00,713.00 380.00,712.00 380.00,712.00              380.00,712.00 379.00,712.00 379.00,712.00 Z            M 274.00,712.00            C 273.26,716.08 271.16,724.41 268.00,727.00              268.00,727.00 272.00,712.00 272.00,712.00              272.00,712.00 274.00,712.00 274.00,712.00 Z            M 339.00,720.00            C 334.17,718.98 329.58,716.29 327.00,712.00              330.82,713.32 336.66,716.72 339.00,720.00 Z            M 351.00,720.00            C 344.78,718.99 339.61,716.28 335.00,712.00              338.37,712.54 349.12,717.58 351.00,720.00 Z            M 378.00,713.00            C 378.00,713.00 379.00,714.00 379.00,714.00              379.00,714.00 379.00,713.00 379.00,713.00              379.00,713.00 378.00,713.00 378.00,713.00 Z            M 265.00,713.00            C 265.00,713.00 263.00,732.00 263.00,732.00              263.00,732.00 263.00,713.00 263.00,713.00              263.00,713.00 265.00,713.00 265.00,713.00 Z            M 294.00,713.00            C 294.00,713.00 294.00,725.00 294.00,725.00              294.00,725.00 292.00,725.00 292.00,725.00              292.00,725.00 292.00,713.00 292.00,713.00              292.00,713.00 294.00,713.00 294.00,713.00 Z            M 377.00,714.00            C 377.00,714.00 378.00,715.00 378.00,715.00              378.00,715.00 378.00,714.00 378.00,714.00              378.00,714.00 377.00,714.00 377.00,714.00 Z            M 514.00,716.00            C 514.00,716.00 525.00,718.00 525.00,718.00              525.00,718.00 525.00,720.08 525.00,720.08              514.71,721.36 513.19,721.19 503.00,720.08              498.12,719.68 495.82,720.70 493.00,716.00              493.00,716.00 514.00,716.00 514.00,716.00 Z            M 325.00,723.00            C 321.62,721.09 321.45,720.57 320.00,717.00              320.00,717.00 325.00,723.00 325.00,723.00 Z            M 125.00,719.00            C 125.00,719.00 126.00,720.00 126.00,720.00              126.00,720.00 126.00,719.00 126.00,719.00              126.00,719.00 125.00,719.00 125.00,719.00 Z            M 237.00,719.00            C 237.00,719.00 238.00,720.00 238.00,720.00              238.00,720.00 238.00,719.00 238.00,719.00              238.00,719.00 237.00,719.00 237.00,719.00 Z            M 127.00,721.00            C 127.00,721.00 128.00,722.00 128.00,722.00              128.00,722.00 128.00,721.00 128.00,721.00              128.00,721.00 127.00,721.00 127.00,721.00 Z            M 289.00,734.00            C 289.00,734.00 290.00,720.00 290.00,720.00              291.76,724.44 291.15,729.78 289.00,734.00 Z            M 237.00,722.00            C 238.90,726.57 238.91,728.11 244.00,729.00              242.71,724.16 241.89,723.25 237.00,722.00 Z            M 335.00,727.00            C 335.00,727.00 330.00,721.00 330.00,721.00              330.00,721.00 335.00,727.00 335.00,727.00 Z            M 342.00,729.00            C 337.86,726.81 337.30,725.40 336.00,721.00              339.66,723.20 340.30,725.21 342.00,729.00 Z            M 149.00,723.00            C 149.00,723.00 150.00,724.00 150.00,724.00              150.00,724.00 150.00,723.00 150.00,723.00              150.00,723.00 149.00,723.00 149.00,723.00 Z            M 150.00,724.00            C 150.00,724.00 151.00,725.00 151.00,725.00              151.00,725.00 151.00,724.00 151.00,724.00              151.00,724.00 150.00,724.00 150.00,724.00 Z            M 305.00,739.00            C 305.00,739.00 303.00,739.00 303.00,739.00              303.00,739.00 301.00,734.00 301.00,734.00              301.00,734.00 300.00,723.00 300.00,723.00              300.00,723.00 305.00,739.00 305.00,739.00 Z            M 312.00,732.00            C 308.68,729.51 308.41,726.96 308.00,723.00              310.81,726.41 311.40,727.61 312.00,732.00 Z            M 492.83,727.22            C 492.83,727.22 478.00,733.67 478.00,733.67              469.17,738.47 456.20,748.49 447.58,754.74              447.58,754.74 436.00,763.05 436.00,763.05              432.08,765.35 422.30,770.37 418.00,769.00              418.00,769.00 436.00,761.00 436.00,761.00              436.00,761.00 429.00,760.00 429.00,760.00              429.00,760.00 445.72,753.50 445.72,753.50              445.72,753.50 468.99,736.67 468.99,736.67              468.99,736.67 486.00,727.00 486.00,727.00              490.46,727.05 493.22,725.14 497.00,723.00              497.07,725.57 494.99,726.24 492.83,727.22 Z            M 275.00,725.00            C 275.00,725.00 272.00,736.00 272.00,736.00              272.00,736.00 273.00,725.00 273.00,725.00              273.00,725.00 275.00,725.00 275.00,725.00 Z            M 407.00,726.00            C 407.00,726.00 408.00,727.00 408.00,727.00              408.00,727.00 408.00,726.00 408.00,726.00              408.00,726.00 407.00,726.00 407.00,726.00 Z            M 318.00,735.00            C 318.00,735.00 316.00,735.00 316.00,735.00              316.00,735.00 314.00,726.00 314.00,726.00              317.32,728.49 317.59,731.04 318.00,735.00 Z            M 406.00,727.00            C 406.00,727.00 407.00,728.00 407.00,728.00              407.00,728.00 407.00,727.00 407.00,727.00              407.00,727.00 406.00,727.00 406.00,727.00 Z            M 212.00,728.00            C 212.00,728.00 213.00,729.00 213.00,729.00              213.00,729.00 213.00,728.00 213.00,728.00              213.00,728.00 212.00,728.00 212.00,728.00 Z            M 371.00,728.00            C 371.00,728.00 372.00,729.00 372.00,729.00              372.00,729.00 372.00,728.00 372.00,728.00              372.00,728.00 371.00,728.00 371.00,728.00 Z            M 405.00,728.00            C 405.00,728.00 406.00,729.00 406.00,729.00              406.00,729.00 406.00,728.00 406.00,728.00              406.00,728.00 405.00,728.00 405.00,728.00 Z            M 370.00,729.00            C 370.00,729.00 371.00,730.00 371.00,730.00              371.00,730.00 371.00,729.00 371.00,729.00              371.00,729.00 370.00,729.00 370.00,729.00 Z            M 378.00,729.00            C 378.00,729.00 379.00,730.00 379.00,730.00              379.00,730.00 379.00,729.00 379.00,729.00              379.00,729.00 378.00,729.00 378.00,729.00 Z            M 464.00,729.00            C 464.00,729.00 465.00,730.00 465.00,730.00              465.00,730.00 465.00,729.00 465.00,729.00              465.00,729.00 464.00,729.00 464.00,729.00 Z            M 516.00,729.00            C 516.00,729.00 506.00,736.00 506.00,736.00              506.00,736.00 523.00,738.00 523.00,738.00              523.00,738.00 523.00,740.00 523.00,740.00              523.00,740.00 490.00,738.00 490.00,738.00              490.00,738.00 490.00,736.00 490.00,736.00              498.89,735.59 506.78,731.10 515.00,728.00              515.00,728.00 516.00,729.00 516.00,729.00 Z            M 377.00,730.00            C 377.00,730.00 378.00,731.00 378.00,731.00              378.00,731.00 378.00,730.00 378.00,730.00              378.00,730.00 377.00,730.00 377.00,730.00 Z            M 391.00,730.00            C 391.00,730.00 392.00,731.00 392.00,731.00              392.00,731.00 392.00,730.00 392.00,730.00              392.00,730.00 391.00,730.00 391.00,730.00 Z            M 413.00,730.00            C 413.00,730.00 414.00,731.00 414.00,731.00              414.00,731.00 414.00,730.00 414.00,730.00              414.00,730.00 413.00,730.00 413.00,730.00 Z            M 325.00,739.00            C 320.75,736.55 320.41,734.65 320.00,730.00              320.00,730.00 325.00,739.00 325.00,739.00 Z            M 365.00,734.00            C 365.00,734.00 369.00,731.00 369.00,731.00              369.00,731.00 365.00,734.00 365.00,734.00 Z            M 412.00,731.00            C 412.00,731.00 413.00,732.00 413.00,732.00              413.00,732.00 413.00,731.00 413.00,731.00              413.00,731.00 412.00,731.00 412.00,731.00 Z            M 241.00,732.00            C 241.00,732.00 242.00,733.00 242.00,733.00              242.00,733.00 242.00,732.00 242.00,732.00              242.00,732.00 241.00,732.00 241.00,732.00 Z            M 368.00,735.00            C 368.00,735.00 372.00,732.00 372.00,732.00              372.00,732.00 368.00,735.00 368.00,735.00 Z            M 243.00,733.00            C 243.54,738.16 244.23,741.39 249.00,744.00              248.51,738.48 249.02,734.98 243.00,733.00 Z            M 299.00,747.00            C 299.00,747.00 297.00,747.00 297.00,747.00              297.00,747.00 297.00,732.00 297.00,732.00              297.00,732.00 299.00,747.00 299.00,747.00 Z            M 184.00,734.00            C 184.00,734.00 185.00,735.00 185.00,735.00              185.00,735.00 185.00,734.00 185.00,734.00              185.00,734.00 184.00,734.00 184.00,734.00 Z            M 280.00,741.00            C 277.39,738.66 278.01,736.32 278.00,733.00              278.00,733.00 280.00,741.00 280.00,741.00 Z            M 311.00,745.00            C 306.53,742.20 306.24,737.92 306.00,733.00              306.00,733.00 311.00,745.00 311.00,745.00 Z            M 160.00,735.00            C 160.00,735.00 161.00,736.00 161.00,736.00              161.00,736.00 161.00,735.00 161.00,735.00              161.00,735.00 160.00,735.00 160.00,735.00 Z            M 366.00,735.00            C 366.00,735.00 367.00,736.00 367.00,736.00              367.00,736.00 367.00,735.00 367.00,735.00              367.00,735.00 366.00,735.00 366.00,735.00 Z            M 388.00,735.00            C 388.00,735.00 389.00,736.00 389.00,736.00              389.00,736.00 389.00,735.00 389.00,735.00              389.00,735.00 388.00,735.00 388.00,735.00 Z            M 448.00,735.00            C 448.00,735.00 449.00,736.00 449.00,736.00              449.00,736.00 449.00,735.00 449.00,735.00              449.00,735.00 448.00,735.00 448.00,735.00 Z            M 166.00,742.00            C 166.00,742.00 162.00,736.00 162.00,736.00              162.00,736.00 166.00,742.00 166.00,742.00 Z            M 193.00,742.00            C 193.00,742.00 188.00,736.00 188.00,736.00              188.05,739.70 189.90,740.49 193.00,742.00 Z            M 199.00,736.00            C 199.00,736.00 200.00,737.00 200.00,737.00              200.00,737.00 200.00,736.00 200.00,736.00              200.00,736.00 199.00,736.00 199.00,736.00 Z            M 405.00,736.00            C 405.00,736.00 406.00,737.00 406.00,737.00              406.00,737.00 406.00,736.00 406.00,736.00              406.00,736.00 405.00,736.00 405.00,736.00 Z            M 145.00,737.00            C 145.00,737.00 146.00,738.00 146.00,738.00              146.00,738.00 146.00,737.00 146.00,737.00              146.00,737.00 145.00,737.00 145.00,737.00 Z            M 197.00,737.00            C 197.00,737.00 198.00,738.00 198.00,738.00              198.00,738.00 198.00,737.00 198.00,737.00              198.00,737.00 197.00,737.00 197.00,737.00 Z            M 240.00,737.00            C 240.00,737.00 241.00,738.00 241.00,738.00              241.00,738.00 241.00,737.00 241.00,737.00              241.00,737.00 240.00,737.00 240.00,737.00 Z            M 367.00,737.00            C 367.00,737.00 368.00,738.00 368.00,738.00              368.00,738.00 368.00,737.00 368.00,737.00              368.00,737.00 367.00,737.00 367.00,737.00 Z            M 404.00,737.00            C 404.00,737.00 405.00,738.00 405.00,738.00              405.00,738.00 405.00,737.00 405.00,737.00              405.00,737.00 404.00,737.00 404.00,737.00 Z            M 201.88,746.76            C 201.88,746.76 207.00,751.00 207.00,751.00              207.00,751.00 205.00,742.00 205.00,742.00              205.00,742.00 204.00,743.00 204.00,743.00              204.00,743.00 205.00,745.00 205.00,745.00              205.00,745.00 194.00,738.00 194.00,738.00              193.79,742.13 199.01,744.50 201.88,746.76 Z            M 202.00,738.00            C 202.00,738.00 203.00,739.00 203.00,739.00              203.00,739.00 203.00,738.00 203.00,738.00              203.00,738.00 202.00,738.00 202.00,738.00 Z            M 234.00,738.00            C 234.00,738.00 235.00,739.00 235.00,739.00              235.00,739.00 235.00,738.00 235.00,738.00              235.00,738.00 234.00,738.00 234.00,738.00 Z            M 384.00,742.00            C 384.00,742.00 387.00,738.00 387.00,738.00              387.00,738.00 384.00,742.00 384.00,742.00 Z            M 403.00,738.00            C 403.00,738.00 404.00,739.00 404.00,739.00              404.00,739.00 404.00,738.00 404.00,738.00              404.00,738.00 403.00,738.00 403.00,738.00 Z            M 203.00,739.00            C 203.00,739.00 204.00,740.00 204.00,740.00              204.00,740.00 204.00,739.00 204.00,739.00              204.00,739.00 203.00,739.00 203.00,739.00 Z            M 392.00,747.00            C 397.29,745.66 399.64,743.16 403.00,739.00              398.25,740.81 394.83,742.69 392.00,747.00 Z            M 81.00,742.00            C 81.00,742.00 64.00,744.00 64.00,744.00              67.15,738.87 77.25,736.40 81.00,742.00 Z            M 204.00,740.00            C 204.00,740.00 205.00,741.00 205.00,741.00              205.00,741.00 205.00,740.00 205.00,740.00              205.00,740.00 204.00,740.00 204.00,740.00 Z            M 151.00,741.00            C 151.00,741.00 152.00,742.00 152.00,742.00              152.00,742.00 152.00,741.00 152.00,741.00              152.00,741.00 151.00,741.00 151.00,741.00 Z            M 362.00,743.00            C 362.00,743.00 366.00,741.00 366.00,741.00              366.00,741.00 362.00,743.00 362.00,743.00 Z            M 356.00,742.00            C 356.00,742.00 357.00,743.00 357.00,743.00              357.00,743.00 357.00,742.00 357.00,742.00              357.00,742.00 356.00,742.00 356.00,742.00 Z            M 346.00,748.00            C 355.54,749.26 360.84,750.95 368.00,743.00              361.70,743.84 350.98,744.55 346.00,748.00 Z            M 168.00,744.00            C 168.00,744.00 169.00,745.00 169.00,745.00              169.00,745.00 169.00,744.00 169.00,744.00              169.00,744.00 168.00,744.00 168.00,744.00 Z            M 369.00,744.00            C 369.00,744.00 370.00,745.00 370.00,745.00              370.00,745.00 370.00,744.00 370.00,744.00              370.00,744.00 369.00,744.00 369.00,744.00 Z            M 479.00,744.00            C 479.00,744.00 480.00,745.00 480.00,745.00              480.00,745.00 480.00,744.00 480.00,744.00              480.00,744.00 479.00,744.00 479.00,744.00 Z            M 169.00,745.00            C 169.00,745.00 170.00,746.00 170.00,746.00              170.00,746.00 170.00,745.00 170.00,745.00              170.00,745.00 169.00,745.00 169.00,745.00 Z            M 398.00,745.00            C 398.00,745.00 399.00,746.00 399.00,746.00              399.00,746.00 399.00,745.00 399.00,745.00              399.00,745.00 398.00,745.00 398.00,745.00 Z            M 401.00,745.00            C 401.00,745.00 402.00,746.00 402.00,746.00              402.00,746.00 402.00,745.00 402.00,745.00              402.00,745.00 401.00,745.00 401.00,745.00 Z            M 515.00,745.00            C 515.00,745.00 509.00,750.00 509.00,750.00              509.00,750.00 508.00,746.00 508.00,746.00              508.00,746.00 515.00,745.00 515.00,745.00 Z            M 196.00,746.00            C 196.00,746.00 197.00,747.00 197.00,747.00              197.00,747.00 197.00,746.00 197.00,746.00              197.00,746.00 196.00,746.00 196.00,746.00 Z            M 214.00,746.00            C 214.00,746.00 215.00,747.00 215.00,747.00              215.00,747.00 215.00,746.00 215.00,746.00              215.00,746.00 214.00,746.00 214.00,746.00 Z            M 511.00,746.00            C 511.00,746.00 512.00,747.00 512.00,747.00              512.00,747.00 512.00,746.00 512.00,746.00              512.00,746.00 511.00,746.00 511.00,746.00 Z            M 218.37,765.17            C 218.37,765.17 222.00,771.00 222.00,771.00              223.14,761.77 215.85,751.42 208.00,747.00              206.99,754.03 214.56,760.05 218.37,765.17 Z            M 160.00,748.00            C 160.00,748.00 161.00,749.00 161.00,749.00              161.00,749.00 161.00,748.00 161.00,748.00              161.00,748.00 160.00,748.00 160.00,748.00 Z            M 241.00,749.00            C 241.00,749.00 242.00,750.00 242.00,750.00              242.00,750.00 242.00,749.00 242.00,749.00              242.00,749.00 241.00,749.00 241.00,749.00 Z            M 280.00,757.00            C 280.00,757.00 281.00,750.00 281.00,750.00              281.29,759.41 287.67,770.27 295.00,776.00              295.00,776.00 294.00,782.00 294.00,782.00              283.25,778.32 273.83,758.99 276.00,748.00              276.00,748.00 280.00,757.00 280.00,757.00 Z            M 253.00,765.00            C 251.49,760.12 248.71,753.49 245.00,750.00              244.57,755.55 248.16,762.37 253.00,765.00 Z            M 263.00,750.00            C 263.00,750.00 264.00,751.00 264.00,751.00              264.00,751.00 264.00,750.00 264.00,750.00              264.00,750.00 263.00,750.00 263.00,750.00 Z            M 266.00,756.00            C 266.00,756.00 265.00,751.00 265.00,751.00              265.00,751.00 266.00,756.00 266.00,756.00 Z            M 384.00,753.00            C 384.00,753.00 389.00,751.00 389.00,751.00              389.00,751.00 384.00,753.00 384.00,753.00 Z            M 504.00,754.48            C 504.00,754.48 519.00,755.00 519.00,755.00              519.00,755.00 519.00,757.00 519.00,757.00              519.00,757.00 514.00,757.00 514.00,757.00              514.00,757.00 515.00,760.00 515.00,760.00              515.00,760.00 496.00,757.92 496.00,757.92              491.92,758.24 485.05,761.74 481.00,763.34              470.93,767.33 463.42,767.56 455.00,776.00              455.00,776.00 461.00,777.00 461.00,777.00              451.60,777.29 445.76,783.23 438.00,788.00              438.00,788.00 453.00,787.32 453.00,787.32              455.64,787.24 458.37,788.06 460.96,787.32              460.96,787.32 466.28,785.45 466.28,785.45              471.06,783.93 479.32,782.14 484.00,784.00              473.26,789.01 456.83,789.36 445.00,789.45              436.65,789.51 421.56,795.52 415.00,793.00              426.77,792.46 439.45,785.87 448.00,778.00              448.00,778.00 425.17,786.43 425.17,786.43              425.17,786.43 416.00,787.00 416.00,787.00              416.00,787.00 416.00,785.00 416.00,785.00              423.78,784.91 429.07,782.08 435.58,777.98              439.64,775.41 445.06,771.51 450.00,773.00              450.00,773.00 434.00,781.00 434.00,781.00              439.60,780.27 450.89,775.10 456.00,772.25              456.00,772.25 463.00,767.83 463.00,767.83              463.00,767.83 489.00,756.91 489.00,756.91              489.00,756.91 488.22,756.91 488.22,756.91              484.69,754.48 491.03,754.94 492.00,755.00              492.00,755.00 491.00,753.00 491.00,753.00              491.00,753.00 492.00,752.00 492.00,752.00              492.00,752.00 490.00,750.00 490.00,750.00              490.00,750.00 504.00,754.48 504.00,754.48 Z            M 332.00,753.00            C 332.00,753.00 333.00,754.00 333.00,754.00              333.00,754.00 333.00,753.00 333.00,753.00              333.00,753.00 332.00,753.00 332.00,753.00 Z            M 257.00,755.00            C 257.00,755.00 258.00,756.00 258.00,756.00              258.00,756.00 258.00,755.00 258.00,755.00              258.00,755.00 257.00,755.00 257.00,755.00 Z            M 300.09,772.90            C 305.24,778.04 310.73,779.21 313.00,787.00              306.13,784.46 305.22,782.49 300.00,778.00              300.00,778.00 307.00,788.00 307.00,788.00              302.71,786.53 300.38,782.56 297.81,778.96              297.81,778.96 283.00,755.00 283.00,755.00              293.14,759.13 292.50,765.33 300.09,772.90 Z            M 347.00,757.00            C 347.00,757.00 358.00,756.00 358.00,756.00              358.00,756.00 347.00,757.00 347.00,757.00 Z            M 440.00,756.00            C 440.00,756.00 441.00,757.00 441.00,757.00              441.00,757.00 441.00,756.00 441.00,756.00              441.00,756.00 440.00,756.00 440.00,756.00 Z            M 173.00,757.00            C 173.00,757.00 174.00,758.00 174.00,758.00              174.00,758.00 174.00,757.00 174.00,757.00              174.00,757.00 173.00,757.00 173.00,757.00 Z            M 178.00,758.00            C 178.04,761.66 178.77,761.56 182.00,763.00              182.00,763.00 178.00,758.00 178.00,758.00 Z            M 280.00,758.00            C 280.00,758.00 281.00,759.00 281.00,759.00              281.00,759.00 281.00,758.00 281.00,758.00              281.00,758.00 280.00,758.00 280.00,758.00 Z            M 301.01,761.88            C 301.01,761.88 324.00,780.00 324.00,780.00              314.56,778.71 296.23,765.38 292.00,757.00              292.00,757.00 301.01,761.88 301.01,761.88 Z            M 324.00,758.00            C 324.00,758.00 325.00,759.00 325.00,759.00              325.00,759.00 325.00,758.00 325.00,758.00              325.00,758.00 324.00,758.00 324.00,758.00 Z            M 387.00,758.00            C 387.00,758.00 388.00,759.00 388.00,759.00              388.00,759.00 388.00,758.00 388.00,758.00              388.00,758.00 387.00,758.00 387.00,758.00 Z            M 212.00,760.00            C 212.00,760.00 213.00,761.00 213.00,761.00              213.00,761.00 213.00,760.00 213.00,760.00              213.00,760.00 212.00,760.00 212.00,760.00 Z            M 222.00,760.00            C 222.00,760.00 223.00,761.00 223.00,761.00              223.00,761.00 223.00,760.00 223.00,760.00              223.00,760.00 222.00,760.00 222.00,760.00 Z            M 329.00,760.00            C 329.00,760.00 330.00,761.00 330.00,761.00              330.00,761.00 330.00,760.00 330.00,760.00              330.00,760.00 329.00,760.00 329.00,760.00 Z            M 407.00,760.00            C 407.00,760.00 408.00,761.00 408.00,761.00              408.00,761.00 408.00,760.00 408.00,760.00              408.00,760.00 407.00,760.00 407.00,760.00 Z            M 326.00,761.00            C 326.00,761.00 327.00,762.00 327.00,762.00              327.00,762.00 327.00,761.00 327.00,761.00              327.00,761.00 326.00,761.00 326.00,761.00 Z            M 310.00,762.00            C 310.00,762.00 311.00,763.00 311.00,763.00              311.00,763.00 311.00,762.00 311.00,762.00              311.00,762.00 310.00,762.00 310.00,762.00 Z            M 182.00,763.00            C 182.00,763.00 183.00,764.00 183.00,764.00              183.00,764.00 183.00,763.00 183.00,763.00              183.00,763.00 182.00,763.00 182.00,763.00 Z            M 137.00,764.00            C 137.00,764.00 138.00,765.00 138.00,765.00              138.00,765.00 138.00,764.00 138.00,764.00              138.00,764.00 137.00,764.00 137.00,764.00 Z            M 280.00,764.00            C 280.00,764.00 281.00,765.00 281.00,765.00              281.00,765.00 281.00,764.00 281.00,764.00              281.00,764.00 280.00,764.00 280.00,764.00 Z            M 314.00,764.00            C 314.00,764.00 315.00,765.00 315.00,765.00              315.00,765.00 315.00,764.00 315.00,764.00              315.00,764.00 314.00,764.00 314.00,764.00 Z            M 403.00,764.00            C 403.00,764.00 404.00,765.00 404.00,765.00              404.00,765.00 404.00,764.00 404.00,764.00              404.00,764.00 403.00,764.00 403.00,764.00 Z            M 486.00,771.62            C 491.11,768.47 501.01,761.83 507.00,764.00              507.00,764.00 480.00,776.00 480.00,776.00              481.87,773.63 483.47,773.18 486.00,771.62 Z            M 139.00,765.00            C 139.00,765.00 140.00,766.00 140.00,766.00              140.00,766.00 140.00,765.00 140.00,765.00              140.00,765.00 139.00,765.00 139.00,765.00 Z            M 253.00,765.00            C 253.00,765.00 254.00,766.00 254.00,766.00              254.00,766.00 254.00,765.00 254.00,765.00              254.00,765.00 253.00,765.00 253.00,765.00 Z            M 326.00,766.00            C 326.00,766.00 327.00,767.00 327.00,767.00              327.00,767.00 327.00,766.00 327.00,766.00              327.00,766.00 326.00,766.00 326.00,766.00 Z            M 381.00,766.00            C 381.00,766.00 382.00,767.00 382.00,767.00              382.00,767.00 382.00,766.00 382.00,766.00              382.00,766.00 381.00,766.00 381.00,766.00 Z            M 291.00,778.00            C 291.00,778.00 284.00,768.00 284.00,768.00              283.13,772.76 287.09,776.06 291.00,778.00 Z            M 189.00,772.00            C 189.00,772.00 188.00,769.00 188.00,769.00              186.63,771.08 186.73,771.04 189.00,772.00 Z            M 376.00,769.00            C 376.00,769.00 377.00,770.00 377.00,770.00              377.00,770.00 377.00,769.00 377.00,769.00              377.00,769.00 376.00,769.00 376.00,769.00 Z            M 393.00,771.00            C 393.00,771.00 397.00,770.00 397.00,770.00              397.00,770.00 393.00,771.00 393.00,771.00 Z            M 397.00,769.00            C 397.00,769.00 398.00,770.00 398.00,770.00              398.00,770.00 398.00,769.00 398.00,769.00              398.00,769.00 397.00,769.00 397.00,769.00 Z            M 391.00,775.27            C 387.11,777.07 385.43,776.98 382.00,780.00              389.69,779.21 390.77,777.41 397.09,774.94              401.13,773.37 405.30,772.62 408.00,769.00              397.86,770.37 399.20,771.47 391.00,775.27 Z            M 86.04,771.02            C 87.61,770.37 89.33,770.24 91.00,770.00              89.47,774.10 76.32,784.73 72.00,786.00              74.20,781.62 81.47,772.90 86.04,771.02 Z            M 147.00,771.00            C 147.00,771.00 148.00,772.00 148.00,772.00              148.00,772.00 148.00,771.00 148.00,771.00              148.00,771.00 147.00,771.00 147.00,771.00 Z            M 392.00,771.00            C 392.00,771.00 393.00,772.00 393.00,772.00              393.00,772.00 393.00,771.00 393.00,771.00              393.00,771.00 392.00,771.00 392.00,771.00 Z            M 174.00,785.00            C 172.70,781.30 171.85,781.04 168.00,781.00              168.00,781.00 149.00,772.00 149.00,772.00              150.85,778.13 168.01,783.04 174.00,785.00 Z            M 376.00,772.00            C 376.00,772.00 377.00,773.00 377.00,773.00              377.00,773.00 377.00,772.00 377.00,772.00              377.00,772.00 376.00,772.00 376.00,772.00 Z            M 367.00,773.00            C 367.00,773.00 368.00,774.00 368.00,774.00              368.00,774.00 368.00,773.00 368.00,773.00              368.00,773.00 367.00,773.00 367.00,773.00 Z            M 373.00,773.00            C 373.00,773.00 374.00,774.00 374.00,774.00              374.00,774.00 374.00,773.00 374.00,773.00              374.00,773.00 373.00,773.00 373.00,773.00 Z            M 225.00,775.00            C 225.00,775.00 226.00,776.00 226.00,776.00              226.00,776.00 226.00,775.00 226.00,775.00              226.00,775.00 225.00,775.00 225.00,775.00 Z            M 297.00,775.00            C 297.00,775.00 298.00,776.00 298.00,776.00              298.00,776.00 298.00,775.00 298.00,775.00              298.00,775.00 297.00,775.00 297.00,775.00 Z            M 448.00,778.00            C 448.00,778.00 454.00,775.00 454.00,775.00              454.00,775.00 448.00,778.00 448.00,778.00 Z            M 502.00,779.00            C 502.00,779.00 504.00,780.00 504.00,780.00              504.00,780.00 507.00,779.00 507.00,779.00              507.00,779.00 509.00,780.00 509.00,780.00              509.00,780.00 511.00,785.00 511.00,785.00              499.10,784.73 495.67,779.00 485.00,777.00              488.70,771.70 498.57,774.51 502.00,779.00 Z            M 143.00,776.00            C 143.00,776.00 144.00,777.00 144.00,777.00              144.00,777.00 144.00,776.00 144.00,776.00              144.00,776.00 143.00,776.00 143.00,776.00 Z            M 231.00,776.00            C 231.00,776.00 232.00,777.00 232.00,777.00              232.00,777.00 232.00,776.00 232.00,776.00              232.00,776.00 231.00,776.00 231.00,776.00 Z            M 253.00,782.00            C 253.00,782.00 249.00,776.00 249.00,776.00              249.00,776.00 253.00,782.00 253.00,782.00 Z            M 298.00,776.00            C 298.00,776.00 299.00,777.00 299.00,777.00              299.00,777.00 299.00,776.00 299.00,776.00              299.00,776.00 298.00,776.00 298.00,776.00 Z            M 467.00,780.29            C 460.84,782.38 454.40,783.86 448.00,785.00              450.72,781.83 456.06,781.48 460.00,780.58              466.24,779.15 467.63,778.46 473.00,775.00              472.95,778.68 470.10,779.24 467.00,780.29 Z            M 151.00,777.00            C 151.00,777.00 152.00,778.00 152.00,778.00              152.00,778.00 152.00,777.00 152.00,777.00              152.00,777.00 151.00,777.00 151.00,777.00 Z            M 299.00,777.00            C 299.00,777.00 300.00,778.00 300.00,778.00              300.00,778.00 300.00,777.00 300.00,777.00              300.00,777.00 299.00,777.00 299.00,777.00 Z            M 141.00,779.00            C 141.00,779.00 141.00,781.00 141.00,781.00              141.00,781.00 122.00,782.00 122.00,782.00              142.91,784.77 132.66,783.00 151.00,783.00              151.00,783.00 151.00,785.00 151.00,785.00              138.35,785.00 133.74,785.99 121.00,783.18              116.73,782.24 111.51,780.74 109.00,777.00              119.24,780.19 130.35,779.00 141.00,779.00 Z            M 206.00,786.00            C 206.00,786.00 197.00,778.00 197.00,778.00              196.72,783.37 201.50,785.14 206.00,786.00 Z            M 254.00,779.00            C 254.00,779.00 255.00,780.00 255.00,780.00              255.00,780.00 255.00,779.00 255.00,779.00              255.00,779.00 254.00,779.00 254.00,779.00 Z            M 303.00,779.00            C 303.00,779.00 304.00,780.00 304.00,780.00              304.00,780.00 304.00,779.00 304.00,779.00              304.00,779.00 303.00,779.00 303.00,779.00 Z            M 359.00,781.00            C 359.00,781.00 364.00,779.00 364.00,779.00              364.00,779.00 359.00,781.00 359.00,781.00 Z            M 309.00,782.00            C 309.00,782.00 306.00,780.00 306.00,780.00              305.95,782.36 306.94,782.27 309.00,782.00 Z            M 255.00,781.00            C 255.00,781.00 256.00,782.00 256.00,782.00              256.00,782.00 256.00,781.00 256.00,781.00              256.00,781.00 255.00,781.00 255.00,781.00 Z            M 505.00,781.00            C 505.00,781.00 506.00,782.00 506.00,782.00              506.00,782.00 506.00,781.00 506.00,781.00              506.00,781.00 505.00,781.00 505.00,781.00 Z            M 230.00,786.00            C 230.00,786.00 229.00,782.00 229.00,782.00              229.00,782.00 230.00,786.00 230.00,786.00 Z            M 237.00,790.00            C 237.00,790.00 234.00,782.00 234.00,782.00              233.06,785.80 234.39,787.35 237.00,790.00 Z            M 253.00,782.00            C 253.00,782.00 254.00,783.00 254.00,783.00              254.00,783.00 254.00,782.00 254.00,782.00              254.00,782.00 253.00,782.00 253.00,782.00 Z            M 206.00,783.00            C 206.00,783.00 207.00,784.00 207.00,784.00              207.00,784.00 207.00,783.00 207.00,783.00              207.00,783.00 206.00,783.00 206.00,783.00 Z            M 248.00,788.00            C 248.00,788.00 247.00,784.00 247.00,784.00              247.00,784.00 248.00,788.00 248.00,788.00 Z            M 232.00,785.00            C 232.00,785.00 233.00,786.00 233.00,786.00              233.00,786.00 233.00,785.00 233.00,785.00              233.00,785.00 232.00,785.00 232.00,785.00 Z            M 265.00,788.00            C 269.59,787.33 269.25,788.60 273.17,789.01              282.88,790.04 293.71,794.13 300.79,801.21              303.19,803.61 307.23,809.92 309.00,813.00              302.63,810.65 298.87,807.63 294.00,803.00              294.00,803.00 300.00,811.00 300.00,811.00              289.84,808.59 278.47,797.25 270.00,791.00              270.00,791.00 281.00,811.00 281.00,811.00              281.00,811.00 274.41,803.00 274.41,803.00              274.41,803.00 262.00,784.00 262.00,784.00              262.00,784.00 265.00,788.00 265.00,788.00 Z            M 198.00,786.00            C 198.00,786.00 199.00,787.00 199.00,787.00              199.00,787.00 199.00,786.00 199.00,786.00              199.00,786.00 198.00,786.00 198.00,786.00 Z            M 206.00,786.00            C 206.00,786.00 207.00,787.00 207.00,787.00              207.00,787.00 207.00,786.00 207.00,786.00              207.00,786.00 206.00,786.00 206.00,786.00 Z            M 183.00,787.00            C 183.00,787.00 184.00,788.00 184.00,788.00              184.00,788.00 184.00,787.00 184.00,787.00              184.00,787.00 183.00,787.00 183.00,787.00 Z            M 199.00,787.00            C 199.00,787.00 200.00,788.00 200.00,788.00              200.00,788.00 200.00,787.00 200.00,787.00              200.00,787.00 199.00,787.00 199.00,787.00 Z            M 204.00,789.00            C 204.00,789.00 209.00,795.00 209.00,795.00              209.00,795.00 210.00,792.00 210.00,792.00              210.00,792.00 215.00,796.00 215.00,796.00              215.00,796.00 208.00,787.00 208.00,787.00              208.00,787.00 204.00,789.00 204.00,789.00 Z            M 233.00,787.00            C 233.00,787.00 234.00,788.00 234.00,788.00              234.00,788.00 234.00,787.00 234.00,787.00              234.00,787.00 233.00,787.00 233.00,787.00 Z            M 186.00,789.00            C 186.00,789.00 187.00,790.00 187.00,790.00              187.00,790.00 187.00,789.00 187.00,789.00              187.00,789.00 186.00,789.00 186.00,789.00 Z            M 378.00,789.00            C 378.00,789.00 379.00,790.00 379.00,790.00              379.00,790.00 379.00,789.00 379.00,789.00              379.00,789.00 378.00,789.00 378.00,789.00 Z            M 246.00,790.00            C 246.00,790.00 247.00,791.00 247.00,791.00              247.00,791.00 247.00,790.00 247.00,790.00              247.00,790.00 246.00,790.00 246.00,790.00 Z            M 269.00,790.00            C 269.00,790.00 270.00,791.00 270.00,791.00              270.00,791.00 270.00,790.00 270.00,790.00              270.00,790.00 269.00,790.00 269.00,790.00 Z            M 375.00,790.00            C 375.00,790.00 376.00,791.00 376.00,791.00              376.00,791.00 376.00,790.00 376.00,790.00              376.00,790.00 375.00,790.00 375.00,790.00 Z            M 184.00,795.00            C 184.00,795.00 164.00,790.00 164.00,790.00              168.77,790.39 181.01,791.52 184.00,795.00 Z            M 247.00,792.00            C 247.00,792.00 248.00,793.00 248.00,793.00              248.00,793.00 248.00,792.00 248.00,792.00              248.00,792.00 247.00,792.00 247.00,792.00 Z            M 287.00,801.00            C 283.57,796.43 281.03,794.59 276.00,792.00              276.37,795.94 283.43,799.95 287.00,801.00 Z            M 327.00,796.76            C 327.00,796.76 348.00,796.76 348.00,796.76              351.70,797.07 352.88,796.83 355.00,800.00              355.00,800.00 329.00,800.91 329.00,800.91              329.00,800.91 316.00,799.00 316.00,799.00              316.00,799.00 328.00,811.00 328.00,811.00              320.85,809.29 319.84,806.68 314.00,803.67              306.55,799.82 300.33,799.91 295.00,792.00              302.85,796.07 303.78,792.31 315.00,800.00              315.00,800.00 316.00,797.00 316.00,797.00              316.00,797.00 310.00,791.00 310.00,791.00              321.86,791.05 318.51,794.26 327.00,796.76 Z            M 219.00,793.00            C 220.12,799.73 222.96,799.93 229.00,799.00              225.71,795.03 223.89,794.33 219.00,793.00 Z            M 248.00,793.00            C 248.00,793.00 249.00,794.00 249.00,794.00              249.00,794.00 249.00,793.00 249.00,793.00              249.00,793.00 248.00,793.00 248.00,793.00 Z            M 317.00,793.00            C 317.00,793.00 318.00,794.00 318.00,794.00              318.00,794.00 318.00,793.00 318.00,793.00              318.00,793.00 317.00,793.00 317.00,793.00 Z            M 503.00,802.00            C 503.00,802.00 479.00,794.00 479.00,794.00              479.00,794.00 479.00,792.00 479.00,792.00              485.79,792.07 499.39,796.07 503.00,802.00 Z            M 284.00,795.00            C 284.00,795.00 285.00,796.00 285.00,796.00              285.00,796.00 285.00,795.00 285.00,795.00              285.00,795.00 284.00,795.00 284.00,795.00 Z            M 286.00,796.00            C 286.00,796.00 287.00,797.00 287.00,797.00              287.00,797.00 287.00,796.00 287.00,796.00              287.00,796.00 286.00,796.00 286.00,796.00 Z            M 288.00,796.00            C 288.00,796.00 289.00,797.00 289.00,797.00              289.00,797.00 289.00,796.00 289.00,796.00              289.00,796.00 288.00,796.00 288.00,796.00 Z            M 398.91,796.91            C 405.03,795.63 412.34,792.83 418.00,796.91              409.06,799.73 400.25,799.00 391.00,799.00              391.00,799.00 391.00,796.91 391.00,796.91              391.00,796.91 398.91,796.91 398.91,796.91 Z            M 478.00,795.00            C 478.00,795.00 478.00,797.00 478.00,797.00              478.00,797.00 472.00,798.00 472.00,798.00              472.00,798.00 477.00,800.00 477.00,800.00              467.81,800.42 468.00,802.02 463.83,802.76              463.83,802.76 455.00,803.67 455.00,803.67              455.00,803.67 431.00,809.18 431.00,809.18              425.78,809.86 419.75,813.19 415.00,810.00              415.00,810.00 429.00,805.00 429.00,805.00              429.00,805.00 408.00,809.00 408.00,809.00              408.00,809.00 419.00,805.30 419.00,805.30              419.00,805.30 447.00,799.28 447.00,799.28              452.60,798.13 461.54,798.30 466.00,795.00              466.00,795.00 478.00,795.00 478.00,795.00 Z            M 205.00,797.00            C 205.00,797.00 206.00,798.00 206.00,798.00              206.00,798.00 206.00,797.00 206.00,797.00              206.00,797.00 205.00,797.00 205.00,797.00 Z            M 287.00,797.00            C 287.00,797.00 288.00,798.00 288.00,798.00              288.00,798.00 288.00,797.00 288.00,797.00              288.00,797.00 287.00,797.00 287.00,797.00 Z            M 292.00,798.00            C 292.00,798.00 293.00,799.00 293.00,799.00              293.00,799.00 293.00,798.00 293.00,798.00              293.00,798.00 292.00,798.00 292.00,798.00 Z            M 229.00,799.00            C 229.00,799.00 230.00,800.00 230.00,800.00              230.00,800.00 230.00,799.00 230.00,799.00              230.00,799.00 229.00,799.00 229.00,799.00 Z            M 289.00,799.00            C 289.00,799.00 290.00,800.00 290.00,800.00              290.00,800.00 290.00,799.00 290.00,799.00              290.00,799.00 289.00,799.00 289.00,799.00 Z            M 293.00,799.00            C 293.00,799.00 294.00,800.00 294.00,800.00              294.00,800.00 294.00,799.00 294.00,799.00              294.00,799.00 293.00,799.00 293.00,799.00 Z            M 308.00,799.00            C 308.00,799.00 309.00,800.00 309.00,800.00              309.00,800.00 309.00,799.00 309.00,799.00              309.00,799.00 308.00,799.00 308.00,799.00 Z            M 451.00,801.00            C 451.00,801.00 456.00,799.00 456.00,799.00              456.00,799.00 451.00,801.00 451.00,801.00 Z            M 227.00,800.00            C 227.00,800.00 228.00,801.00 228.00,801.00              228.00,801.00 228.00,800.00 228.00,800.00              228.00,800.00 227.00,800.00 227.00,800.00 Z            M 290.00,801.00            C 290.00,801.00 294.00,803.00 294.00,803.00              294.00,803.00 291.00,800.00 291.00,800.00              291.00,800.00 290.00,801.00 290.00,801.00 Z            M 294.00,800.00            C 294.00,800.00 295.00,801.00 295.00,801.00              295.00,801.00 295.00,800.00 295.00,800.00              295.00,800.00 294.00,800.00 294.00,800.00 Z            M 225.00,808.00            C 222.63,803.52 220.47,802.94 216.00,801.00              216.40,805.88 220.88,807.02 225.00,808.00 Z            M 287.00,801.00            C 287.00,801.00 288.00,802.00 288.00,802.00              288.00,802.00 288.00,801.00 288.00,801.00              288.00,801.00 287.00,801.00 287.00,801.00 Z            M 301.00,807.00            C 301.00,807.00 296.00,801.00 296.00,801.00              296.71,804.42 298.15,805.21 301.00,807.00 Z            M 315.00,801.00            C 315.00,801.00 316.00,802.00 316.00,802.00              316.00,802.00 316.00,801.00 316.00,801.00              316.00,801.00 315.00,801.00 315.00,801.00 Z            M 443.00,802.00            C 443.00,802.00 448.00,801.00 448.00,801.00              448.00,801.00 443.00,802.00 443.00,802.00 Z            M 439.00,802.00            C 439.00,802.00 440.00,803.00 440.00,803.00              440.00,803.00 440.00,802.00 440.00,802.00              440.00,802.00 439.00,802.00 439.00,802.00 Z            M 234.00,806.00            C 234.00,806.00 232.00,803.00 232.00,803.00              232.00,803.00 234.00,806.00 234.00,806.00 Z            M 213.00,804.00            C 213.00,804.00 214.00,805.00 214.00,805.00              214.00,805.00 214.00,804.00 214.00,804.00              214.00,804.00 213.00,804.00 213.00,804.00 Z            M 237.00,813.00            C 237.00,813.00 237.00,808.00 237.00,808.00              237.00,808.00 228.00,804.00 228.00,804.00              227.03,808.34 233.70,811.49 237.00,813.00 Z            M 290.00,804.00            C 290.00,804.00 291.00,805.00 291.00,805.00              291.00,805.00 291.00,804.00 291.00,804.00              291.00,804.00 290.00,804.00 290.00,804.00 Z            M 291.00,805.00            C 291.00,805.00 292.00,806.00 292.00,806.00              292.00,806.00 292.00,805.00 292.00,805.00              292.00,805.00 291.00,805.00 291.00,805.00 Z            M 427.00,808.00            C 430.66,807.95 432.48,808.66 434.00,805.00              434.00,805.00 427.00,808.00 427.00,808.00 Z            M 94.00,820.00            C 94.00,820.00 91.00,819.00 91.00,819.00              91.00,819.00 102.00,805.00 102.00,805.00              105.30,811.16 98.95,810.74 94.00,820.00 Z            M 242.39,829.09            C 242.39,829.09 228.82,811.70 228.82,811.70              228.82,811.70 222.00,808.50 222.00,808.50              222.00,808.50 213.00,806.00 213.00,806.00              215.64,817.21 219.11,815.00 229.00,815.00              229.00,815.00 229.00,817.00 229.00,817.00              229.00,817.00 219.00,817.00 219.00,817.00              220.98,822.95 225.50,829.94 232.00,831.00              232.00,831.00 230.00,836.00 230.00,836.00              230.00,836.00 235.00,837.00 235.00,837.00              234.50,842.81 240.86,856.14 247.00,857.00              247.37,862.01 248.02,862.02 251.00,866.00              257.10,863.08 259.74,862.62 264.00,857.00              264.00,857.00 242.39,829.09 242.39,829.09 Z            M 488.00,813.00            C 488.00,813.00 491.00,814.00 491.00,814.00              495.43,813.23 496.38,813.81 498.00,818.00              498.00,818.00 495.00,816.00 495.00,816.00              486.09,818.31 480.94,811.61 473.00,809.00              473.00,809.00 473.00,805.00 473.00,805.00              477.36,805.65 485.64,809.25 488.00,813.00 Z            M 241.00,807.00            C 243.48,811.81 247.05,814.07 252.00,816.00              249.00,812.35 245.58,808.46 241.00,807.00 Z            M 301.00,807.00            C 301.00,807.00 302.00,808.00 302.00,808.00              302.00,808.00 302.00,807.00 302.00,807.00              302.00,807.00 301.00,807.00 301.00,807.00 Z            M 426.00,808.00            C 426.00,808.00 427.00,809.00 427.00,809.00              427.00,809.00 427.00,808.00 427.00,808.00              427.00,808.00 426.00,808.00 426.00,808.00 Z            M 238.00,809.00            C 238.00,809.00 239.00,810.00 239.00,810.00              239.00,810.00 239.00,809.00 239.00,809.00              239.00,809.00 238.00,809.00 238.00,809.00 Z            M 247.00,809.00            C 247.00,809.00 248.00,810.00 248.00,810.00              248.00,810.00 248.00,809.00 248.00,809.00              248.00,809.00 247.00,809.00 247.00,809.00 Z            M 271.00,820.00            C 271.00,820.00 271.00,816.00 271.00,816.00              271.00,816.00 252.00,809.00 252.00,809.00              253.41,813.93 266.03,818.76 271.00,820.00 Z            M 247.00,814.00            C 247.00,814.00 240.00,810.00 240.00,810.00              240.98,813.64 243.33,815.88 247.00,814.00 Z            M 248.00,810.00            C 248.00,810.00 249.00,811.00 249.00,811.00              249.00,811.00 249.00,810.00 249.00,810.00              249.00,810.00 248.00,810.00 248.00,810.00 Z            M 249.00,812.00            C 249.00,812.00 281.01,834.88 281.01,834.88              285.12,837.17 291.51,841.92 295.00,837.00              284.20,832.82 284.98,831.07 276.99,825.87              276.99,825.87 250.00,811.00 250.00,811.00              250.00,811.00 249.00,812.00 249.00,812.00 Z            M 243.99,825.00            C 251.54,835.56 261.78,839.94 271.00,854.00              276.44,852.85 279.30,852.18 282.00,847.00              282.00,847.00 268.00,838.00 268.00,838.00              268.00,838.00 273.00,846.00 273.00,846.00              273.00,846.00 262.72,834.29 262.72,834.29              262.72,834.29 238.00,813.00 238.00,813.00              236.88,817.76 241.36,821.33 243.99,825.00 Z            M 247.00,831.00            C 247.00,831.00 234.00,814.00 234.00,814.00              234.70,819.09 242.18,829.14 247.00,831.00 Z            M 240.00,814.00            C 240.00,814.00 241.00,815.00 241.00,815.00              241.00,815.00 241.00,814.00 241.00,814.00              241.00,814.00 240.00,814.00 240.00,814.00 Z            M 246.00,819.00            C 246.00,819.00 246.00,818.00 246.00,818.00              246.00,818.00 244.00,816.00 244.00,816.00              244.00,816.00 246.00,819.00 246.00,819.00 Z            M 252.00,816.00            C 252.00,816.00 253.00,817.00 253.00,817.00              253.00,817.00 253.00,816.00 253.00,816.00              253.00,816.00 252.00,816.00 252.00,816.00 Z            M 333.00,818.00            C 333.00,818.00 345.00,817.00 345.00,817.00              340.31,815.68 337.38,815.76 333.00,818.00 Z            M 259.42,824.12            C 263.40,827.97 263.94,827.62 268.00,830.51              273.23,834.24 279.99,840.90 287.00,839.00              287.00,839.00 271.00,829.50 271.00,829.50              271.00,829.50 254.00,817.00 254.00,817.00              254.83,820.10 257.14,821.90 259.42,824.12 Z            M 279.09,823.07            C 286.79,827.33 292.82,826.90 299.00,834.00              299.00,834.00 304.00,830.00 304.00,830.00              304.00,830.00 273.00,817.00 273.00,817.00              273.00,819.90 276.76,821.78 279.09,823.07 Z            M 256.00,827.00            C 253.11,822.50 251.58,821.60 247.00,819.00              248.14,823.20 252.20,825.38 256.00,827.00 Z            M 271.00,821.00            C 271.00,821.00 275.00,824.00 275.00,824.00              275.00,824.00 276.00,823.00 276.00,823.00              276.00,823.00 272.00,820.00 272.00,820.00              272.00,820.00 271.00,821.00 271.00,821.00 Z            M 315.00,821.00            C 317.59,822.67 318.02,822.95 321.00,822.00              321.00,822.00 315.00,821.00 315.00,821.00 Z            M 337.00,822.00            C 337.00,822.00 326.00,820.00 326.00,820.00              326.08,824.12 334.37,823.04 337.00,822.00 Z            M 480.00,826.49            C 484.32,828.42 487.34,827.90 490.00,832.00              479.19,831.50 473.38,826.55 464.00,822.00              464.00,822.00 468.00,819.00 468.00,819.00              471.93,821.60 475.67,824.55 480.00,826.49 Z            M 253.00,821.00            C 253.00,821.00 254.00,822.00 254.00,822.00              254.00,822.00 254.00,821.00 254.00,821.00              254.00,821.00 253.00,821.00 253.00,821.00 Z            M 343.00,822.00            C 347.33,823.42 352.94,826.54 355.00,821.00              355.00,821.00 343.00,822.00 343.00,822.00 Z            M 114.00,821.00            C 112.83,824.48 104.24,833.29 101.00,835.00              102.40,827.75 107.02,823.38 114.00,821.00 Z            M 162.00,821.00            C 161.13,822.26 161.28,822.53 159.73,823.37              157.26,824.71 143.97,826.44 141.29,825.71              139.73,825.28 139.90,825.00 139.00,824.00              139.00,824.00 162.00,821.00 162.00,821.00 Z            M 258.00,826.00            C 258.00,826.00 255.00,822.00 255.00,822.00              255.00,822.00 258.00,826.00 258.00,826.00 Z            M 215.00,823.00            C 215.00,823.00 197.00,831.00 197.00,831.00              199.61,826.73 210.06,821.92 215.00,823.00 Z            M 281.84,828.78            C 287.18,832.63 292.63,835.26 299.00,837.00              296.25,828.08 284.49,826.88 277.00,823.00              277.00,826.02 279.54,827.13 281.84,828.78 Z            M 306.00,824.00            C 306.00,824.00 311.00,823.00 311.00,823.00              311.00,823.00 306.00,824.00 306.00,824.00 Z            M 312.00,824.00            C 312.00,824.00 319.00,824.00 319.00,824.00              319.00,824.00 312.00,824.00 312.00,824.00 Z            M 298.00,825.00            C 298.00,825.00 299.00,826.00 299.00,826.00              299.00,826.00 299.00,825.00 299.00,825.00              299.00,825.00 298.00,825.00 298.00,825.00 Z            M 391.00,826.00            C 391.00,826.00 368.00,824.00 368.00,824.00              373.80,824.00 386.63,822.78 391.00,826.00 Z            M 313.00,828.00            C 313.00,828.00 310.00,827.00 310.00,827.00              310.00,829.23 311.42,828.54 313.00,828.00 Z            M 321.00,828.00            C 321.00,828.00 329.00,830.00 329.00,830.00              329.00,830.00 329.00,828.00 329.00,828.00              329.00,828.00 321.00,828.00 321.00,828.00 Z            M 274.00,838.00            C 274.00,838.00 265.00,829.00 265.00,829.00              264.72,834.51 269.77,836.06 274.00,838.00 Z            M 317.00,829.00            C 317.00,829.00 316.00,832.00 316.00,832.00              316.00,832.00 321.00,831.00 321.00,831.00              321.00,831.00 317.00,829.00 317.00,829.00 Z            M 346.00,829.00            C 346.00,829.00 347.00,830.00 347.00,830.00              347.00,830.00 347.00,829.00 347.00,829.00              347.00,829.00 346.00,829.00 346.00,829.00 Z            M 302.00,835.00            C 302.00,835.00 309.00,838.00 309.00,838.00              309.00,838.00 312.00,832.00 312.00,832.00              306.82,830.81 305.54,830.86 302.00,835.00 Z            M 248.00,832.00            C 248.00,832.00 249.00,833.00 249.00,833.00              249.00,833.00 249.00,832.00 249.00,832.00              249.00,832.00 248.00,832.00 248.00,832.00 Z            M 324.35,839.01            C 327.18,836.94 327.61,830.66 321.00,833.00              321.00,833.00 324.00,834.00 324.00,834.00              316.17,837.10 315.87,831.20 310.00,838.00              313.45,839.29 321.05,841.43 324.35,839.01 Z            M 249.00,833.00            C 249.00,833.00 250.00,834.00 250.00,834.00              250.00,834.00 250.00,833.00 250.00,833.00              250.00,833.00 249.00,833.00 249.00,833.00 Z            M 317.00,833.00            C 317.00,833.00 318.00,834.00 318.00,834.00              318.00,834.00 318.00,833.00 318.00,833.00              318.00,833.00 317.00,833.00 317.00,833.00 Z            M 335.00,834.00            C 335.00,834.00 341.00,834.00 341.00,834.00              341.00,834.00 335.00,834.00 335.00,834.00 Z            M 344.00,834.00            C 344.00,834.00 348.00,833.00 348.00,833.00              348.00,833.00 344.00,834.00 344.00,834.00 Z            M 349.00,835.00            C 357.00,838.42 359.75,839.43 368.00,836.00              360.62,835.77 354.66,831.70 349.00,835.00 Z            M 250.00,834.00            C 250.00,834.00 251.00,835.00 251.00,835.00              251.00,835.00 251.00,834.00 251.00,834.00              251.00,834.00 250.00,834.00 250.00,834.00 Z            M 329.00,834.00            C 329.00,834.00 325.00,841.00 325.00,841.00              325.00,841.00 329.00,841.00 329.00,841.00              329.00,841.00 329.00,843.00 329.00,843.00              325.11,843.13 324.41,842.79 322.00,846.00              323.71,846.46 325.07,847.01 326.91,846.64              330.38,845.94 336.33,839.07 338.00,836.00              338.00,836.00 329.00,834.00 329.00,834.00 Z            M 252.09,839.04            C 253.38,842.53 261.68,854.61 265.02,855.76              267.09,856.47 268.18,855.70 270.00,855.00              267.18,848.93 257.43,838.74 252.09,835.00              251.68,836.80 251.54,837.17 252.09,839.04 Z            M 344.00,835.00            C 344.00,835.00 345.00,836.00 345.00,836.00              345.00,836.00 345.00,835.00 345.00,835.00              345.00,835.00 344.00,835.00 344.00,835.00 Z            M 128.00,836.00            C 124.12,841.94 121.65,848.76 114.00,850.00              116.18,844.29 121.02,835.13 128.00,836.00 Z            M 300.00,837.00            C 300.00,837.00 306.00,840.00 306.00,840.00              306.00,840.00 302.00,836.00 302.00,836.00              302.00,836.00 300.00,837.00 300.00,837.00 Z            M 275.00,837.00            C 275.00,837.00 276.00,838.00 276.00,838.00              276.00,838.00 276.00,837.00 276.00,837.00              276.00,837.00 275.00,837.00 275.00,837.00 Z            M 334.00,849.00            C 339.69,847.73 343.51,842.48 345.00,837.00              339.37,838.73 336.08,843.69 334.00,849.00 Z            M 284.00,848.00            C 284.00,848.00 288.00,844.00 288.00,844.00              288.00,844.00 275.00,839.00 275.00,839.00              274.91,842.56 281.20,846.35 284.00,848.00 Z            M 297.00,839.00            C 297.00,839.00 295.00,842.00 295.00,842.00              299.09,843.93 299.62,844.46 304.00,843.00              304.00,843.00 304.00,841.00 304.00,841.00              304.00,841.00 297.00,839.00 297.00,839.00 Z            M 322.00,844.00            C 322.00,844.00 322.00,842.00 322.00,842.00              322.00,842.00 310.00,839.00 310.00,839.00              310.09,843.06 318.81,844.55 322.00,844.00 Z            M 287.00,840.00            C 287.00,840.00 288.00,841.00 288.00,841.00              288.00,841.00 288.00,840.00 288.00,840.00              288.00,840.00 287.00,840.00 287.00,840.00 Z            M 305.00,842.00            C 305.00,842.00 304.00,847.00 304.00,847.00              304.00,847.00 309.00,843.00 309.00,843.00              309.00,843.00 305.00,842.00 305.00,842.00 Z            M 308.00,848.00            C 312.97,849.93 314.03,849.88 319.00,848.00              315.05,843.98 311.39,842.76 308.00,848.00 Z            M 225.67,852.37            C 225.67,852.37 220.00,857.00 220.00,857.00              226.28,856.11 232.44,854.05 238.00,851.00              238.00,851.00 238.00,848.00 238.00,848.00              238.00,848.00 236.00,845.00 236.00,845.00              228.26,845.91 230.42,848.08 225.67,852.37 Z            M 286.00,850.00            C 286.00,850.00 290.00,849.00 290.00,849.00              292.73,852.03 294.53,849.90 296.00,847.00              290.42,845.40 289.41,844.85 286.00,850.00 Z            M 448.00,844.00            C 454.01,852.38 460.78,853.86 463.00,861.00              463.00,861.00 444.00,849.00 444.00,849.00              444.00,849.00 445.00,844.00 445.00,844.00              445.00,844.00 448.00,844.00 448.00,844.00 Z            M 143.00,847.00            C 143.00,847.00 131.00,860.00 131.00,860.00              125.32,855.48 138.98,847.85 143.00,847.00 Z            M 318.00,849.00            C 318.00,849.00 318.00,851.00 318.00,851.00              318.00,851.00 324.00,854.00 324.00,854.00              324.00,854.00 327.00,849.00 327.00,849.00              327.00,849.00 318.00,849.00 318.00,849.00 Z            M 307.00,849.00            C 307.00,849.00 308.00,850.00 308.00,850.00              308.00,850.00 308.00,849.00 308.00,849.00              308.00,849.00 307.00,849.00 307.00,849.00 Z            M 328.00,849.00            C 328.00,849.00 329.00,850.00 329.00,850.00              329.00,850.00 329.00,849.00 329.00,849.00              329.00,849.00 328.00,849.00 328.00,849.00 Z            M 273.00,857.00            C 273.00,857.00 281.00,861.00 281.00,861.00              281.00,861.00 289.00,852.00 289.00,852.00              283.67,850.11 276.18,852.09 273.00,857.00 Z            M 295.00,853.00            C 299.01,855.13 300.16,854.24 303.00,851.00              303.00,851.00 295.00,853.00 295.00,853.00 Z            M 315.00,852.00            C 315.00,852.00 311.00,850.00 311.00,850.00              311.30,852.89 312.56,852.40 315.00,852.00 Z            M 328.00,853.00            C 328.00,853.00 329.00,856.00 329.00,856.00              329.00,856.00 334.00,850.00 334.00,850.00              334.00,850.00 328.00,853.00 328.00,853.00 Z            M 433.00,850.00            C 433.00,850.00 434.00,851.00 434.00,851.00              434.00,851.00 434.00,850.00 434.00,850.00              434.00,850.00 433.00,850.00 433.00,850.00 Z            M 436.00,850.00            C 436.00,850.00 437.00,851.00 437.00,851.00              437.00,851.00 437.00,850.00 437.00,850.00              437.00,850.00 436.00,850.00 436.00,850.00 Z            M 289.00,851.00            C 289.00,851.00 290.00,852.00 290.00,852.00              290.00,852.00 290.00,851.00 290.00,851.00              290.00,851.00 289.00,851.00 289.00,851.00 Z            M 303.00,852.00            C 303.00,852.00 301.00,856.00 301.00,856.00              305.05,858.92 306.83,860.85 311.00,857.00              311.00,857.00 303.00,852.00 303.00,852.00 Z            M 315.00,853.00            C 315.00,853.00 315.00,855.00 315.00,855.00              315.00,855.00 323.00,856.00 323.00,856.00              320.62,852.93 318.69,853.18 315.00,853.00 Z            M 284.00,860.00            C 288.02,858.99 288.93,858.65 291.00,855.00              291.00,855.00 284.00,860.00 284.00,860.00 Z            M 397.00,856.00            C 397.00,856.00 403.00,856.00 403.00,856.00              403.00,856.00 397.00,856.00 397.00,856.00 Z            M 283.00,862.00            C 287.06,867.71 291.29,862.89 296.00,860.00              296.00,860.00 296.00,857.00 296.00,857.00              290.36,856.52 288.24,859.62 283.00,862.00 Z            M 324.00,857.00            C 324.00,857.00 328.00,859.00 328.00,859.00              328.00,859.00 329.00,856.00 329.00,856.00              329.00,856.00 324.00,857.00 324.00,857.00 Z            M 449.00,869.00            C 449.00,869.00 447.00,872.00 447.00,872.00              447.00,872.00 451.00,876.00 451.00,876.00              451.00,876.00 440.00,871.00 440.00,871.00              438.70,864.63 430.48,864.76 431.00,855.00              437.59,860.44 440.16,866.07 449.00,869.00 Z            M 267.00,857.00            C 268.11,864.92 272.21,868.40 278.00,861.00              273.26,857.73 272.77,857.16 267.00,857.00 Z            M 306.00,864.00            C 306.00,859.59 303.62,858.89 300.00,857.00              299.93,860.65 303.16,862.26 306.00,864.00 Z            M 316.00,858.00            C 316.00,858.00 318.00,859.00 318.00,859.00              318.00,859.00 318.00,860.00 318.00,860.00              318.00,860.00 321.00,858.00 321.00,858.00              321.00,858.00 316.00,858.00 316.00,858.00 Z            M 152.00,858.00            C 152.00,858.00 153.00,859.00 153.00,859.00              153.00,859.00 153.00,858.00 153.00,858.00              153.00,858.00 152.00,858.00 152.00,858.00 Z            M 311.00,860.00            C 311.00,860.00 317.00,864.00 317.00,864.00              315.73,860.03 315.18,859.47 311.00,860.00 Z            M 321.00,860.00            C 321.00,860.00 326.00,860.00 326.00,860.00              326.00,860.00 321.00,860.00 321.00,860.00 Z            M 252.00,867.00            C 252.00,867.00 255.00,875.00 255.00,875.00              255.00,875.00 270.00,867.00 270.00,867.00              270.00,867.00 270.00,865.00 270.00,865.00              270.00,865.00 265.00,860.00 265.00,860.00              265.00,860.00 252.00,867.00 252.00,867.00 Z            M 301.84,868.42            C 303.00,866.65 303.55,865.30 302.38,863.32              298.25,856.33 285.30,864.98 293.11,870.26              293.11,870.26 298.00,873.00 298.00,873.00              298.00,873.00 301.84,868.42 301.84,868.42 Z            M 282.00,861.00            C 282.00,861.00 283.00,862.00 283.00,862.00              283.00,862.00 283.00,861.00 283.00,861.00              283.00,861.00 282.00,861.00 282.00,861.00 Z            M 309.00,862.00            C 309.04,865.95 309.54,866.20 313.00,868.00              313.00,868.00 314.00,863.00 314.00,863.00              314.00,863.00 309.00,862.00 309.00,862.00 Z            M 318.00,863.00            C 320.07,866.29 321.54,867.11 325.00,865.00              325.00,865.00 318.00,863.00 318.00,863.00 Z            M 329.00,864.00            C 331.90,868.07 348.17,875.22 353.00,874.00              353.00,874.00 340.00,867.00 340.00,867.00              340.00,867.00 334.00,863.00 334.00,863.00              334.00,863.00 329.00,864.00 329.00,864.00 Z            M 280.00,865.00            C 280.00,865.00 285.00,868.00 285.00,868.00              283.25,865.16 283.32,865.20 280.00,865.00 Z            M 237.00,869.90            C 229.10,874.61 220.65,878.83 212.00,882.00              214.45,878.21 218.03,877.51 222.00,875.54              222.00,875.54 244.00,864.00 244.00,864.00              244.75,867.47 239.56,868.37 237.00,869.90 Z            M 273.00,870.00            C 277.68,871.70 278.56,871.72 282.00,868.00              277.49,865.06 274.98,863.78 273.00,870.00 Z            M 305.26,867.09            C 304.12,867.67 303.22,868.70 302.40,869.60              296.29,876.31 306.28,878.96 309.30,871.17              309.30,871.17 310.00,867.09 310.00,867.09              308.33,866.83 306.90,866.47 305.26,867.09 Z            M 313.00,868.00            C 315.99,872.36 317.36,871.84 322.00,870.00              318.62,866.49 317.54,866.32 313.00,868.00 Z            M 416.37,870.02            C 415.89,867.23 418.07,863.38 420.00,868.00              420.00,868.00 424.00,871.00 424.00,871.00              424.00,871.00 426.00,870.00 426.00,870.00              426.00,870.00 433.14,883.17 433.14,883.17              433.14,883.17 433.14,888.00 433.14,888.00              429.10,887.33 428.25,887.09 428.00,883.00              424.36,881.64 417.03,873.82 416.37,870.02 Z            M 288.00,867.00            C 288.00,867.00 289.00,868.00 289.00,868.00              289.00,868.00 289.00,867.00 289.00,867.00              289.00,867.00 288.00,867.00 288.00,867.00 Z            M 258.00,876.00            C 260.84,889.20 270.04,877.80 276.00,874.00              268.72,864.28 266.36,871.52 258.00,876.00 Z            M 289.00,869.00            C 289.00,869.00 290.00,870.00 290.00,870.00              290.00,870.00 290.00,869.00 290.00,869.00              290.00,869.00 289.00,869.00 289.00,869.00 Z            M 166.00,871.00            C 166.00,871.00 159.43,885.46 159.43,885.46              159.43,885.46 157.00,887.00 157.00,887.00              157.00,887.00 162.00,869.00 162.00,869.00              162.00,869.00 166.00,871.00 166.00,871.00 Z            M 278.00,873.00            C 279.65,875.13 282.43,878.90 285.01,879.75              287.88,880.70 290.94,878.49 289.30,875.15              289.30,875.15 285.00,870.00 285.00,870.00              285.00,870.00 278.00,873.00 278.00,873.00 Z            M 420.00,871.00            C 420.00,871.00 424.00,873.00 424.00,873.00              424.00,873.00 421.00,870.00 421.00,870.00              421.00,870.00 420.00,871.00 420.00,871.00 Z            M 315.45,874.23            C 315.00,869.01 309.88,872.80 308.22,875.01              307.14,876.46 306.71,877.38 306.00,879.00              306.00,879.00 310.00,883.00 310.00,883.00              312.96,881.36 315.77,877.95 315.45,874.23 Z            M 445.00,871.00            C 445.00,871.00 446.00,872.00 446.00,872.00              446.00,872.00 446.00,871.00 446.00,871.00              446.00,871.00 445.00,871.00 445.00,871.00 Z            M 293.00,872.00            C 293.00,872.00 294.00,873.00 294.00,873.00              294.00,873.00 294.00,872.00 294.00,872.00              294.00,872.00 293.00,872.00 293.00,872.00 Z            M 294.00,873.00            C 294.00,873.00 295.00,874.00 295.00,874.00              295.00,874.00 295.00,873.00 295.00,873.00              295.00,873.00 294.00,873.00 294.00,873.00 Z            M 292.00,874.00            C 292.00,874.00 293.00,875.00 293.00,875.00              293.00,875.00 293.00,874.00 293.00,874.00              293.00,874.00 292.00,874.00 292.00,874.00 Z            M 271.00,894.00            C 271.00,894.00 282.67,881.95 282.67,881.95              282.67,881.95 278.00,875.00 278.00,875.00              268.20,878.40 258.47,885.95 271.00,894.00 Z            M 293.00,875.00            C 293.00,875.00 294.00,876.00 294.00,876.00              294.00,876.00 294.00,875.00 294.00,875.00              294.00,875.00 293.00,875.00 293.00,875.00 Z            M 301.00,880.00            C 300.76,876.38 300.23,876.46 297.00,875.00              297.00,875.00 301.00,880.00 301.00,880.00 Z            M 353.00,875.00            C 353.00,875.00 354.00,876.00 354.00,876.00              354.00,876.00 354.00,875.00 354.00,875.00              354.00,875.00 353.00,875.00 353.00,875.00 Z            M 298.00,880.00            C 298.00,880.00 295.00,876.00 295.00,876.00              295.04,878.79 295.64,878.70 298.00,880.00 Z            M 358.00,877.00            C 358.00,877.00 359.00,878.00 359.00,878.00              359.00,878.00 359.00,877.00 359.00,877.00              359.00,877.00 358.00,877.00 358.00,877.00 Z            M 287.81,884.45            C 292.39,891.90 299.47,877.54 290.00,880.51              290.00,880.51 287.00,882.00 287.00,882.00              287.26,882.89 287.24,883.52 287.81,884.45 Z            M 407.00,878.00            C 409.39,881.20 410.90,883.35 415.00,884.00              415.00,884.00 415.00,887.00 415.00,887.00              415.00,887.00 418.00,889.00 418.00,889.00              421.56,889.96 420.66,891.89 420.00,895.00              413.39,892.10 406.81,885.00 403.00,879.00              403.00,879.00 407.00,878.00 407.00,878.00 Z            M 298.00,880.00            C 298.00,880.00 299.00,881.00 299.00,881.00              299.00,881.00 299.00,880.00 299.00,880.00              299.00,880.00 298.00,880.00 298.00,880.00 Z            M 304.00,880.00            C 303.35,885.19 305.49,886.21 310.00,888.00              310.66,882.83 308.29,882.13 304.00,880.00 Z            M 368.00,881.00            C 368.00,881.00 369.00,882.00 369.00,882.00              369.00,882.00 369.00,881.00 369.00,881.00              369.00,881.00 368.00,881.00 368.00,881.00 Z            M 271.74,896.00            C 271.77,898.09 274.73,901.33 276.00,903.00              276.00,903.00 282.00,898.00 282.00,898.00              281.22,893.55 284.60,892.17 288.00,890.00              288.00,890.00 285.00,883.00 285.00,883.00              282.27,885.41 271.70,892.88 271.74,896.00 Z            M 300.00,885.00            C 300.00,885.00 301.00,886.00 301.00,886.00              301.00,886.00 301.00,885.00 301.00,885.00              301.00,885.00 300.00,885.00 300.00,885.00 Z            M 412.00,885.00            C 412.00,885.00 413.00,886.00 413.00,886.00              413.00,886.00 413.00,885.00 413.00,885.00              413.00,885.00 412.00,885.00 412.00,885.00 Z            M 297.02,886.57            C 289.43,887.56 294.55,896.71 302.00,899.00              302.00,899.00 307.00,891.00 307.00,891.00              304.26,889.57 299.96,886.19 297.02,886.57 Z            M 391.00,886.00            C 391.00,886.00 398.00,899.00 398.00,899.00              401.75,899.04 401.87,899.49 403.00,903.00              397.45,902.41 393.88,900.99 393.00,895.00              393.00,895.00 388.00,892.00 388.00,892.00              388.00,892.00 389.00,889.00 389.00,889.00              389.00,889.00 387.00,886.00 387.00,886.00              387.00,886.00 391.00,886.00 391.00,886.00 Z            M 414.00,887.00            C 414.00,887.00 415.00,888.00 415.00,888.00              415.00,888.00 415.00,887.00 415.00,887.00              415.00,887.00 414.00,887.00 414.00,887.00 Z            M 212.79,893.00            C 213.00,895.83 213.22,904.77 212.79,906.94              211.97,908.96 209.90,911.57 207.60,909.92              204.06,907.38 209.86,896.16 211.00,893.00              211.00,893.00 212.79,893.00 212.79,893.00 Z            M 383.00,912.00            C 383.00,912.00 381.00,912.00 381.00,912.00              381.00,912.00 373.58,900.59 373.58,900.59              373.58,900.59 371.00,894.00 371.00,894.00              376.51,896.29 383.79,905.99 383.00,912.00 Z            M 367.00,916.00            C 361.25,915.05 358.52,911.90 359.00,906.00              359.00,906.00 355.00,899.00 355.00,899.00              359.27,901.32 365.43,911.35 367.00,916.00 Z            M 227.99,902.59            C 230.02,905.27 228.88,913.90 227.99,917.00              227.99,917.00 226.00,917.00 226.00,917.00              226.00,917.00 225.00,901.00 225.00,901.00              226.23,901.43 227.05,901.38 227.99,902.59 Z            M 211.00,908.00            C 211.00,908.00 211.00,903.00 211.00,903.00              211.00,903.00 211.00,908.00 211.00,908.00 Z            M 341.00,902.00            C 341.00,902.00 348.00,925.00 348.00,925.00              346.70,924.78 345.82,924.87 344.64,924.01              342.06,922.12 338.36,910.34 338.26,907.00              338.21,905.05 338.57,903.84 339.00,902.00              339.00,902.00 341.00,902.00 341.00,902.00 Z            M 244.00,907.00            C 244.00,907.00 245.00,920.00 245.00,920.00              245.00,920.00 241.00,920.00 241.00,920.00              241.00,920.00 242.00,907.00 242.00,907.00              242.00,907.00 244.00,907.00 244.00,907.00 Z            M 262.00,912.00            C 262.00,912.00 262.00,925.00 262.00,925.00              262.00,925.00 259.00,925.00 259.00,925.00              258.75,919.49 255.94,914.12 262.00,912.00 Z            M 328.00,912.00            C 328.00,912.00 333.00,929.00 333.00,929.00              327.21,925.94 324.53,918.24 326.00,912.00              326.00,912.00 328.00,912.00 328.00,912.00 Z            M 279.00,914.00            C 279.00,919.15 280.35,922.85 275.00,925.00              275.00,925.00 277.00,914.00 277.00,914.00              277.00,914.00 279.00,914.00 279.00,914.00 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "id": "lowlights",
      "fill": "black",
      "fill-opacity": "0.3",
      "stroke": "none",
      "d": "M 325.00,210.00            C 325.00,210.00 325.00,212.00 325.00,212.00              325.00,212.00 308.00,210.04 308.00,210.04              308.00,210.04 287.00,210.04 287.00,210.04              287.00,210.04 287.00,208.00 287.00,208.00              303.82,208.00 308.00,207.76 325.00,210.00 Z            M 277.00,215.00            C 277.00,215.00 277.00,218.00 277.00,218.00              281.84,218.04 286.12,217.57 289.00,222.00              292.60,221.28 294.53,221.01 297.00,224.00              297.00,224.00 313.00,223.00 313.00,223.00              313.00,223.00 342.00,218.00 342.00,218.00              340.20,217.94 335.66,218.15 336.17,215.12              336.36,213.99 337.27,213.32 338.24,212.87              340.59,211.76 346.26,212.00 349.00,212.00              349.00,212.00 344.00,216.00 344.00,216.00              347.58,217.55 345.07,218.98 343.00,221.00              343.00,221.00 351.00,222.00 351.00,222.00              351.00,222.00 351.00,224.00 351.00,224.00              351.00,224.00 344.00,228.56 344.00,228.56              336.01,232.64 322.81,232.90 314.00,233.00              314.00,233.00 303.00,233.96 303.00,233.96              290.77,234.44 274.09,229.43 262.00,227.00              262.00,227.00 263.00,222.00 263.00,222.00              268.34,222.00 273.27,220.61 276.00,226.00              276.00,226.00 269.00,228.00 269.00,228.00              274.34,226.60 273.39,227.84 278.09,228.74              283.22,229.73 292.62,228.90 296.00,233.00              296.00,233.00 327.00,230.66 327.00,230.66              327.00,230.66 343.00,223.00 343.00,223.00              343.00,223.00 331.00,222.49 331.00,222.49              331.00,222.49 320.00,224.86 320.00,224.86              320.00,224.86 305.00,224.86 305.00,224.86              290.31,224.98 290.24,222.13 281.00,220.23              281.00,220.23 263.00,220.23 263.00,220.23              263.00,220.23 263.00,218.00 263.00,218.00              263.00,218.00 267.00,217.00 267.00,217.00              267.00,217.00 263.00,217.00 263.00,217.00              263.00,217.00 263.00,212.00 263.00,212.00              263.00,212.00 277.00,215.00 277.00,215.00 Z            M 278.00,235.00            C 273.82,235.00 271.51,234.42 268.00,237.00              272.19,235.82 279.90,235.53 283.00,239.00              286.26,238.60 286.91,238.35 289.00,240.83              290.18,240.81 289.93,240.53 292.00,240.83              292.00,240.83 298.00,241.94 298.00,241.94              298.00,241.94 311.00,241.94 311.00,241.94              324.99,241.98 334.47,236.47 347.00,232.00              347.68,237.12 345.39,236.85 341.00,237.00              341.00,237.00 341.00,240.00 341.00,240.00              341.00,240.00 328.00,241.32 328.00,241.32              328.00,241.32 318.00,243.91 318.00,243.91              318.00,243.91 300.00,243.91 300.00,243.91              290.08,243.98 290.85,242.06 282.00,239.71              282.00,239.71 273.00,238.41 273.00,238.41              273.00,238.41 263.00,236.00 263.00,236.00              263.00,236.00 264.00,232.00 264.00,232.00              268.68,232.00 275.02,230.73 278.00,235.00 Z            M 266.00,235.00            C 266.00,235.00 267.00,236.00 267.00,236.00              267.00,236.00 267.00,235.00 267.00,235.00              267.00,235.00 266.00,235.00 266.00,235.00 Z            M 262.00,236.00            C 266.58,240.88 267.41,239.61 272.72,242.03              280.86,245.74 278.54,244.31 286.00,246.73              302.41,252.05 297.54,251.03 315.00,251.00              326.85,250.98 323.71,249.26 333.00,245.36              333.00,245.36 348.00,241.00 348.00,241.00              343.85,248.95 339.70,245.64 333.04,248.13              329.76,249.35 327.92,251.34 323.99,252.39              320.23,253.40 306.72,253.01 302.00,253.00              289.53,252.98 291.41,250.73 282.00,248.47              282.00,248.47 265.00,247.00 265.00,247.00              265.00,247.00 268.00,244.00 268.00,244.00              268.00,244.00 259.00,240.00 259.00,240.00              259.00,240.00 260.00,236.00 260.00,236.00              260.00,236.00 262.00,236.00 262.00,236.00 Z            M 287.00,254.19            C 293.00,255.57 291.73,256.90 300.00,257.00              300.00,257.00 323.00,257.00 323.00,257.00              325.00,257.00 327.95,257.13 329.79,256.42              335.00,254.42 344.26,243.02 349.00,250.00              349.00,250.00 344.00,253.00 344.00,253.00              344.00,253.00 346.00,255.00 346.00,255.00              344.01,255.94 341.20,257.34 339.09,257.82              331.51,259.54 308.00,259.01 299.00,259.00              285.43,258.98 283.33,253.35 277.00,258.00              277.00,258.00 279.00,257.00 279.00,257.00              279.00,257.00 279.00,259.00 279.00,259.00              271.84,257.72 265.86,258.91 263.00,251.00              266.45,251.33 267.80,251.17 270.00,254.19              272.98,253.39 283.90,253.76 287.00,254.19 Z            M 279.00,263.47            C 279.00,263.47 292.00,267.84 292.00,267.84              292.00,267.84 317.00,267.84 317.00,267.84              322.94,267.99 326.56,267.59 331.99,264.82              338.75,261.36 337.25,258.52 346.00,258.00              346.00,258.00 344.00,262.00 344.00,262.00              344.00,262.00 347.00,263.00 347.00,263.00              347.00,263.00 347.00,265.00 347.00,265.00              347.00,265.00 337.00,266.32 337.00,266.32              337.00,266.32 324.00,269.90 324.00,269.90              324.00,269.90 295.00,269.90 295.00,269.90              285.19,269.95 287.90,268.82 281.00,267.12              273.52,265.27 264.30,268.10 261.00,259.00              273.23,265.42 268.90,261.56 279.00,263.47 Z            M 342.00,262.00            C 342.00,262.00 343.00,263.00 343.00,263.00              343.00,263.00 343.00,262.00 343.00,262.00              343.00,262.00 342.00,262.00 342.00,262.00 Z            M 281.00,273.00            C 281.00,273.00 281.00,275.00 281.00,275.00              281.00,275.00 277.00,277.00 277.00,277.00              277.00,277.00 280.00,278.00 280.00,278.00              280.00,278.00 308.00,280.00 308.00,280.00              308.00,280.00 325.00,279.39 325.00,279.39              325.00,279.39 333.00,277.00 333.00,277.00              333.00,277.00 332.00,273.00 332.00,273.00              332.00,273.00 347.00,270.00 347.00,270.00              347.00,270.00 345.00,274.00 345.00,274.00              346.76,277.24 345.75,277.92 344.00,281.00              344.00,281.00 349.00,280.00 349.00,280.00              349.00,280.00 345.86,283.55 345.86,283.55              345.86,283.55 327.00,288.13 327.00,288.13              327.00,288.13 302.00,290.00 302.00,290.00              302.00,290.00 279.00,286.40 279.00,286.40              279.00,286.40 262.00,283.00 262.00,283.00              262.00,283.00 261.00,278.00 261.00,278.00              261.00,278.00 281.00,282.00 281.00,282.00              281.00,282.00 281.00,285.00 281.00,285.00              281.00,285.00 304.00,288.00 304.00,288.00              310.30,288.07 323.33,287.52 328.96,285.18              328.96,285.18 333.42,282.55 333.42,282.55              338.41,279.78 339.44,282.55 343.00,277.00              343.00,277.00 335.00,278.18 335.00,278.18              335.00,278.18 320.00,281.95 320.00,281.95              320.00,281.95 301.00,281.95 301.00,281.95              301.00,281.95 293.00,280.91 293.00,280.91              293.00,280.91 285.00,280.91 285.00,280.91              285.00,280.91 263.00,274.00 263.00,274.00              263.00,274.00 265.00,271.00 265.00,271.00              265.00,271.00 261.00,268.00 261.00,268.00              261.00,268.00 281.00,273.00 281.00,273.00 Z            M 264.00,280.00            C 264.00,280.00 265.00,281.00 265.00,281.00              265.00,281.00 265.00,280.00 265.00,280.00              265.00,280.00 264.00,280.00 264.00,280.00 Z            M 277.00,289.00            C 277.00,289.00 277.00,291.00 277.00,291.00              277.00,291.00 268.00,292.00 268.00,292.00              284.65,293.35 286.16,296.44 295.00,297.85              295.00,297.85 316.00,297.85 316.00,297.85              323.34,297.91 329.49,296.21 335.28,291.61              337.61,289.76 340.26,286.76 343.00,289.00              343.00,289.00 346.00,288.00 346.00,288.00              343.68,301.91 336.32,295.86 327.00,298.50              320.02,300.48 298.26,300.82 291.00,299.54              291.00,299.54 279.00,296.09 279.00,296.09              266.94,292.91 273.39,296.96 260.00,290.00              260.00,290.00 262.00,287.00 262.00,287.00              262.00,287.00 260.00,285.00 260.00,285.00              268.80,289.09 266.81,288.99 277.00,289.00 Z            M 278.00,298.00            C 278.00,298.00 278.00,300.00 278.00,300.00              272.92,300.00 265.07,301.72 263.00,296.00              263.00,296.00 278.00,298.00 278.00,298.00 Z"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2fcd8d7e", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "sizes"
    }
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('select', {
    staticClass: "form-control"
  }, _vm._l((_vm.available), function(item) {
    return _c('option', {
      domProps: {
        "value": item
      },
      on: {
        "click": function($event) {}
      }
    }, [_vm._v(_vm._s(item.value))])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-366d7f3c", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);