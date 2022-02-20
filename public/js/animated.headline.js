/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/js/animated.headline.js":
/*!**********************************************!*\
  !*** ./resources/js/js/animated.headline.js ***!
  \**********************************************/
/***/ (() => {

jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2500,
      //loading bar effect
  barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000,
      //3000 is the duration of the transition on the loading bar - set in the scss/css file
  //letters effect
  lettersDelay = 50,
      //type effect
  typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
  revealDuration = 600,
      revealAnimationDelay = 1500;
  initHeadline();

  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($('.cd-headline.letters').find('b')); //initialise headline animation

    animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
    $words.each(function () {
      var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');

      for (i in letters) {
        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = selected ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
      }

      var newLetters = letters.join('');
      word.html(newLetters).css('opacity', 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function () {
      var headline = $(this);

      if (headline.hasClass('loading-bar')) {
        duration = barAnimationDelay;
        setTimeout(function () {
          headline.find('.cd-words-wrapper').addClass('is-loading');
        }, barWaiting);
      } else if (headline.hasClass('clip')) {
        var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10;
        spanWrapper.css('width', newWidth);
      } else if (!headline.hasClass('type')) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find('.cd-words-wrapper b'),
            width = 0;
        words.each(function () {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find('.cd-words-wrapper').css('width', width);
      }

      ; //trigger animation

      setTimeout(function () {
        hideWord(headline.find('.is-visible').eq(0));
      }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if ($word.parents('.cd-headline').hasClass('type')) {
      var parentSpan = $word.parent('.cd-words-wrapper');
      parentSpan.addClass('selected').removeClass('waiting');
      setTimeout(function () {
        parentSpan.removeClass('selected');
        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
      }, selectionDuration);
      setTimeout(function () {
        showWord(nextWord, typeLettersDelay);
      }, typeAnimationDelay);
    } else if ($word.parents('.cd-headline').hasClass('letters')) {
      var bool = $word.children('i').length >= nextWord.children('i').length ? true : false;
      hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        width: '2px'
      }, revealDuration, function () {
        switchWord($word, nextWord);
        showWord(nextWord);
      });
    } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
      $word.parents('.cd-words-wrapper').removeClass('is-loading');
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, barAnimationDelay);
      setTimeout(function () {
        $word.parents('.cd-words-wrapper').addClass('is-loading');
      }, barWaiting);
    } else {
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if ($word.parents('.cd-headline').hasClass('type')) {
      showLetter($word.find('i').eq(0), $word, false, $duration);
      $word.addClass('is-visible').removeClass('is-hidden');
    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        'width': $word.width() + 10
      }, revealDuration, function () {
        setTimeout(function () {
          hideWord($word);
        }, revealAnimationDelay);
      });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass('in').addClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function () {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function () {
        hideWord(takeNext($word));
      }, animationDelay);
    }

    if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass('in').removeClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function () {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents('.cd-headline').hasClass('type')) {
        setTimeout(function () {
          $word.parents('.cd-words-wrapper').addClass('waiting');
        }, 200);
      }

      if (!$bool) {
        setTimeout(function () {
          hideWord($word);
        }, animationDelay);
      }
    }
  }

  function takeNext($word) {
    return !$word.is(':last-child') ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return !$word.is(':first-child') ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  }
});

/***/ }),

/***/ "./resources/js/js/bootstrap.min.js":
/*!******************************************!*\
  !*** ./resources/js/js/bootstrap.min.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
  * Bootstrap v4.0.0 (https://getbootstrap.com)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function (t, e) {
  "object" == ( false ? 0 : _typeof(exports)) && "undefined" != "object" ? e(exports, __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'popper.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), Object(function webpackMissingModule() { var e = new Error("Cannot find module 'popper.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function (t, e, n) {
  "use strict";

  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }

  function r() {
    return (r = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  e = e && e.hasOwnProperty("default") ? e["default"] : e, n = n && n.hasOwnProperty("default") ? n["default"] : n;

  var o,
      a,
      l,
      h,
      c,
      u,
      f,
      d,
      _,
      g,
      p,
      m,
      v,
      E,
      T,
      y,
      C,
      I,
      A,
      b,
      D,
      S,
      w,
      N,
      O,
      k,
      P = function (t) {
    var e = !1;

    function n(e) {
      var n = this,
          s = !1;
      return t(this).one(i.TRANSITION_END, function () {
        s = !0;
      }), setTimeout(function () {
        s || i.triggerTransitionEnd(n);
      }, e), this;
    }

    var i = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function getUID(t) {
        do {
          t += ~~(1e6 * Math.random());
        } while (document.getElementById(t));

        return t;
      },
      getSelectorFromElement: function getSelectorFromElement(e) {
        var n,
            i = e.getAttribute("data-target");
        i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));

        try {
          return t(document).find(i).length > 0 ? i : null;
        } catch (t) {
          return null;
        }
      },
      reflow: function reflow(t) {
        return t.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(n) {
        t(n).trigger(e.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(e);
      },
      isElement: function isElement(t) {
        return (t[0] || t).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(t, e, n) {
        for (var s in n) {
          if (Object.prototype.hasOwnProperty.call(n, s)) {
            var r = n[s],
                o = e[s],
                a = o && i.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
            if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".');
          }
        }

        var l;
      }
    };
    return e = ("undefined" == typeof window || !window.QUnit) && {
      end: "transitionend"
    }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
      bindType: e.end,
      delegateType: e.end,
      handle: function handle(e) {
        if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    }), i;
  }(e),
      L = (a = "alert", h = "." + (l = "bs.alert"), c = (o = e).fn[a], u = {
    CLOSE: "close" + h,
    CLOSED: "closed" + h,
    CLICK_DATA_API: "click" + h + ".data-api"
  }, f = "alert", d = "fade", _ = "show", g = function () {
    function t(t) {
      this._element = t;
    }

    var e = t.prototype;
    return e.close = function (t) {
      t = t || this._element;

      var e = this._getRootElement(t);

      this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
    }, e.dispose = function () {
      o.removeData(this._element, l), this._element = null;
    }, e._getRootElement = function (t) {
      var e = P.getSelectorFromElement(t),
          n = !1;
      return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n;
    }, e._triggerCloseEvent = function (t) {
      var e = o.Event(u.CLOSE);
      return o(t).trigger(e), e;
    }, e._removeElement = function (t) {
      var e = this;
      o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, function (n) {
        return e._destroyElement(t, n);
      }).emulateTransitionEnd(150) : this._destroyElement(t);
    }, e._destroyElement = function (t) {
      o(t).detach().trigger(u.CLOSED).remove();
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = o(this),
            i = n.data(l);
        i || (i = new t(this), n.data(l, i)), "close" === e && i[e](this);
      });
    }, t._handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, s(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.0.0";
      }
    }]), t;
  }(), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g())), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function () {
    return o.fn[a] = c, g._jQueryInterface;
  }, g),
      R = (m = "button", E = "." + (v = "bs.button"), T = ".data-api", y = (p = e).fn[m], C = "active", I = "btn", A = "focus", b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = "input", w = ".active", N = ".btn", O = {
    CLICK_DATA_API: "click" + E + T,
    FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
  }, k = function () {
    function t(t) {
      this._element = t;
    }

    var e = t.prototype;
    return e.toggle = function () {
      var t = !0,
          e = !0,
          n = p(this._element).closest(D)[0];

      if (n) {
        var i = p(this._element).find(S)[0];

        if (i) {
          if ("radio" === i.type) if (i.checked && p(this._element).hasClass(C)) t = !1;else {
            var s = p(n).find(w)[0];
            s && p(s).removeClass(C);
          }

          if (t) {
            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
            i.checked = !p(this._element).hasClass(C), p(i).trigger("change");
          }

          i.focus(), e = !1;
        }
      }

      e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C);
    }, e.dispose = function () {
      p.removeData(this._element, v), this._element = null;
    }, t._jQueryInterface = function (e) {
      return this.each(function () {
        var n = p(this).data(v);
        n || (n = new t(this), p(this).data(v, n)), "toggle" === e && n[e]();
      });
    }, s(t, null, [{
      key: "VERSION",
      get: function get() {
        return "4.0.0";
      }
    }]), t;
  }(), p(document).on(O.CLICK_DATA_API, b, function (t) {
    t.preventDefault();
    var e = t.target;
    p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), "toggle");
  }).on(O.FOCUS_BLUR_DATA_API, b, function (t) {
    var e = p(t.target).closest(N)[0];
    p(e).toggleClass(A, /^focus(in)?$/.test(t.type));
  }), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function () {
    return p.fn[m] = y, k._jQueryInterface;
  }, k),
      j = function (t) {
    var e = "carousel",
        n = "bs.carousel",
        i = "." + n,
        o = t.fn[e],
        a = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0
    },
        l = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean"
    },
        h = "next",
        c = "prev",
        u = "left",
        f = "right",
        d = {
      SLIDE: "slide" + i,
      SLID: "slid" + i,
      KEYDOWN: "keydown" + i,
      MOUSEENTER: "mouseenter" + i,
      MOUSELEAVE: "mouseleave" + i,
      TOUCHEND: "touchend" + i,
      LOAD_DATA_API: "load" + i + ".data-api",
      CLICK_DATA_API: "click" + i + ".data-api"
    },
        _ = "carousel",
        g = "active",
        p = "slide",
        m = "carousel-item-right",
        v = "carousel-item-left",
        E = "carousel-item-next",
        T = "carousel-item-prev",
        y = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]'
    },
        C = function () {
      function o(e, n) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners();
      }

      var C = o.prototype;
      return C.next = function () {
        this._isSliding || this._slide(h);
      }, C.nextWhenVisible = function () {
        !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next();
      }, C.prev = function () {
        this._isSliding || this._slide(c);
      }, C.pause = function (e) {
        e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
      }, C.cycle = function (t) {
        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
      }, C.to = function (e) {
        var n = this;
        this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];

        var i = this._getItemIndex(this._activeElement);

        if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) t(this._element).one(d.SLID, function () {
          return n.to(e);
        });else {
          if (i === e) return this.pause(), void this.cycle();
          var s = e > i ? h : c;

          this._slide(s, this._items[e]);
        }
      }, C.dispose = function () {
        t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
      }, C._getConfig = function (t) {
        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t;
      }, C._addEventListeners = function () {
        var e = this;
        this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
          return e._keydown(t);
        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
          return e.pause(t);
        }).on(d.MOUSELEAVE, function (t) {
          return e.cycle(t);
        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
          e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
            return e.cycle(t);
          }, 500 + e._config.interval);
        }));
      }, C._keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
          case 37:
            t.preventDefault(), this.prev();
            break;

          case 39:
            t.preventDefault(), this.next();
        }
      }, C._getItemIndex = function (e) {
        return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e);
      }, C._getItemByDirection = function (t, e) {
        var n = t === h,
            i = t === c,
            s = this._getItemIndex(e),
            r = this._items.length - 1;

        if ((i && 0 === s || n && s === r) && !this._config.wrap) return e;
        var o = (s + (t === c ? -1 : 1)) % this._items.length;
        return -1 === o ? this._items[this._items.length - 1] : this._items[o];
      }, C._triggerSlideEvent = function (e, n) {
        var i = this._getItemIndex(e),
            s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
            r = t.Event(d.SLIDE, {
          relatedTarget: e,
          direction: n,
          from: s,
          to: i
        });

        return t(this._element).trigger(r), r;
      }, C._setActiveIndicatorElement = function (e) {
        if (this._indicatorsElement) {
          t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);

          var n = this._indicatorsElement.children[this._getItemIndex(e)];

          n && t(n).addClass(g);
        }
      }, C._slide = function (e, n) {
        var i,
            s,
            r,
            o = this,
            a = t(this._element).find(y.ACTIVE_ITEM)[0],
            l = this._getItemIndex(a),
            c = n || a && this._getItemByDirection(e, a),
            _ = this._getItemIndex(c),
            C = Boolean(this._interval);

        if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
          this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
          var I = t.Event(d.SLID, {
            relatedTarget: c,
            direction: r,
            from: l,
            to: _
          });
          P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, function () {
            t(c).removeClass(i + " " + s).addClass(g), t(a).removeClass(g + " " + s + " " + i), o._isSliding = !1, setTimeout(function () {
              return t(o._element).trigger(I);
            }, 0);
          }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle();
        }
      }, o._jQueryInterface = function (e) {
        return this.each(function () {
          var i = t(this).data(n),
              s = r({}, a, t(this).data());
          "object" == _typeof(e) && (s = r({}, s, e));
          var l = "string" == typeof e ? e : s.slide;
          if (i || (i = new o(this, s), t(this).data(n, i)), "number" == typeof e) i.to(e);else if ("string" == typeof l) {
            if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
            i[l]();
          } else s.interval && (i.pause(), i.cycle());
        });
      }, o._dataApiClickHandler = function (e) {
        var i = P.getSelectorFromElement(this);

        if (i) {
          var s = t(i)[0];

          if (s && t(s).hasClass(_)) {
            var a = r({}, t(s).data(), t(this).data()),
                l = this.getAttribute("data-slide-to");
            l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault();
          }
        }
      }, s(o, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return a;
        }
      }]), o;
    }();

    return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function () {
      t(y.DATA_RIDE).each(function () {
        var e = t(this);

        C._jQueryInterface.call(e, e.data());
      });
    }), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function () {
      return t.fn[e] = o, C._jQueryInterface;
    }, C;
  }(e),
      H = function (t) {
    var e = "collapse",
        n = "bs.collapse",
        i = "." + n,
        o = t.fn[e],
        a = {
      toggle: !0,
      parent: ""
    },
        l = {
      toggle: "boolean",
      parent: "(string|element)"
    },
        h = {
      SHOW: "show" + i,
      SHOWN: "shown" + i,
      HIDE: "hide" + i,
      HIDDEN: "hidden" + i,
      CLICK_DATA_API: "click" + i + ".data-api"
    },
        c = "show",
        u = "collapse",
        f = "collapsing",
        d = "collapsed",
        _ = "width",
        g = "height",
        p = {
      ACTIVES: ".show, .collapsing",
      DATA_TOGGLE: '[data-toggle="collapse"]'
    },
        m = function () {
      function i(e, n) {
        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));

        for (var i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
          var r = i[s],
              o = P.getSelectorFromElement(r);
          null !== o && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r));
        }

        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
      }

      var o = i.prototype;
      return o.toggle = function () {
        t(this._element).hasClass(c) ? this.hide() : this.show();
      }, o.show = function () {
        var e,
            s,
            r = this;

        if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && 0 === (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
          var o = t.Event(h.SHOW);

          if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
            e && (i._jQueryInterface.call(t(e).not(this._selector), "hide"), s || t(e).data(n, null));

            var a = this._getDimension();

            t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);

            var l = function l() {
              t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(h.SHOWN);
            };

            if (P.supportsTransitionEnd()) {
              var _ = "scroll" + (a[0].toUpperCase() + a.slice(1));

              t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[_] + "px";
            } else l();
          }
        }
      }, o.hide = function () {
        var e = this;

        if (!this._isTransitioning && t(this._element).hasClass(c)) {
          var n = t.Event(h.HIDE);

          if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
            var i = this._getDimension();

            if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0) for (var s = 0; s < this._triggerArray.length; s++) {
              var r = this._triggerArray[s],
                  o = P.getSelectorFromElement(r);
              if (null !== o) t(o).hasClass(c) || t(r).addClass(d).attr("aria-expanded", !1);
            }
            this.setTransitioning(!0);

            var a = function a() {
              e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN);
            };

            this._element.style[i] = "", P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a();
          }
        }
      }, o.setTransitioning = function (t) {
        this._isTransitioning = t;
      }, o.dispose = function () {
        t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
      }, o._getConfig = function (t) {
        return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t;
      }, o._getDimension = function () {
        return t(this._element).hasClass(_) ? _ : g;
      }, o._getParent = function () {
        var e = this,
            n = null;
        P.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
        var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
        return t(n).find(s).each(function (t, n) {
          e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n]);
        }), n;
      }, o._addAriaAndCollapsedClass = function (e, n) {
        if (e) {
          var i = t(e).hasClass(c);
          n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i);
        }
      }, i._getTargetFromElement = function (e) {
        var n = P.getSelectorFromElement(e);
        return n ? t(n)[0] : null;
      }, i._jQueryInterface = function (e) {
        return this.each(function () {
          var s = t(this),
              o = s.data(n),
              l = r({}, a, s.data(), "object" == _typeof(e) && e);

          if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), "string" == typeof e) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e]();
          }
        });
      }, s(i, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return a;
        }
      }]), i;
    }();

    return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
      "A" === e.currentTarget.tagName && e.preventDefault();
      var i = t(this),
          s = P.getSelectorFromElement(this);
      t(s).each(function () {
        var e = t(this),
            s = e.data(n) ? "toggle" : i.data();

        m._jQueryInterface.call(e, s);
      });
    }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
      return t.fn[e] = o, m._jQueryInterface;
    }, m;
  }(e),
      W = function (t) {
    var e = "dropdown",
        i = "bs.dropdown",
        o = "." + i,
        a = ".data-api",
        l = t.fn[e],
        h = new RegExp("38|40|27"),
        c = {
      HIDE: "hide" + o,
      HIDDEN: "hidden" + o,
      SHOW: "show" + o,
      SHOWN: "shown" + o,
      CLICK: "click" + o,
      CLICK_DATA_API: "click" + o + a,
      KEYDOWN_DATA_API: "keydown" + o + a,
      KEYUP_DATA_API: "keyup" + o + a
    },
        u = "disabled",
        f = "show",
        d = "dropup",
        _ = "dropright",
        g = "dropleft",
        p = "dropdown-menu-right",
        m = "dropdown-menu-left",
        v = "position-static",
        E = '[data-toggle="dropdown"]',
        T = ".dropdown form",
        y = ".dropdown-menu",
        C = ".navbar-nav",
        I = ".dropdown-menu .dropdown-item:not(.disabled)",
        A = "top-start",
        b = "top-end",
        D = "bottom-start",
        S = "bottom-end",
        w = "right-start",
        N = "left-start",
        O = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent"
    },
        k = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)"
    },
        L = function () {
      function a(t, e) {
        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
      }

      var l = a.prototype;
      return l.toggle = function () {
        if (!this._element.disabled && !t(this._element).hasClass(u)) {
          var e = a._getParentFromElement(this._element),
              i = t(this._menu).hasClass(f);

          if (a._clearMenus(), !i) {
            var s = {
              relatedTarget: this._element
            },
                r = t.Event(c.SHOW, s);

            if (t(e).trigger(r), !r.isDefaultPrevented()) {
              if (!this._inNavbar) {
                if ("undefined" == typeof n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                var o = this._element;
                t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig());
              }

              "ontouchstart" in document.documentElement && 0 === t(e).closest(C).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s));
            }
          }
        }
      }, l.dispose = function () {
        t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
      }, l.update = function () {
        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
      }, l._addEventListeners = function () {
        var e = this;
        t(this._element).on(c.CLICK, function (t) {
          t.preventDefault(), t.stopPropagation(), e.toggle();
        });
      }, l._getConfig = function (n) {
        return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n;
      }, l._getMenuElement = function () {
        if (!this._menu) {
          var e = a._getParentFromElement(this._element);

          this._menu = t(e).find(y)[0];
        }

        return this._menu;
      }, l._getPlacement = function () {
        var e = t(this._element).parent(),
            n = D;
        return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n;
      }, l._detectNavbar = function () {
        return t(this._element).closest(".navbar").length > 0;
      }, l._getPopperConfig = function () {
        var t = this,
            e = {};
        return "function" == typeof this._config.offset ? e.fn = function (e) {
          return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e;
        } : e.offset = this._config.offset, {
          placement: this._getPlacement(),
          modifiers: {
            offset: e,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          }
        };
      }, a._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data(i);

          if (n || (n = new a(this, "object" == _typeof(e) ? e : null), t(this).data(i, n)), "string" == typeof e) {
            if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
            n[e]();
          }
        });
      }, a._clearMenus = function (e) {
        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
          var r = a._getParentFromElement(n[s]),
              o = t(n[s]).data(i),
              l = {
            relatedTarget: n[s]
          };

          if (o) {
            var h = o._menu;

            if (t(r).hasClass(f) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
              var u = t.Event(c.HIDE, l);
              t(r).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)));
            }
          }
        }
      }, a._getParentFromElement = function (e) {
        var n,
            i = P.getSelectorFromElement(e);
        return i && (n = t(i)[0]), n || e.parentNode;
      }, a._dataApiKeydownHandler = function (e) {
        if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
          var n = a._getParentFromElement(this),
              i = t(n).hasClass(f);

          if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
            var s = t(n).find(I).get();

            if (0 !== s.length) {
              var r = s.indexOf(e.target);
              38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus();
            }
          } else {
            if (27 === e.which) {
              var o = t(n).find(E)[0];
              t(o).trigger("focus");
            }

            t(this).trigger("click");
          }
        }
      }, s(a, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return O;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return k;
        }
      }]), a;
    }();

    return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, L._clearMenus).on(c.CLICK_DATA_API, E, function (e) {
      e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), "toggle");
    }).on(c.CLICK_DATA_API, T, function (t) {
      t.stopPropagation();
    }), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function () {
      return t.fn[e] = l, L._jQueryInterface;
    }, L;
  }(e),
      M = function (t) {
    var e = "modal",
        n = "bs.modal",
        i = "." + n,
        o = t.fn.modal,
        a = {
      backdrop: !0,
      keyboard: !0,
      focus: !0,
      show: !0
    },
        l = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean"
    },
        h = {
      HIDE: "hide" + i,
      HIDDEN: "hidden" + i,
      SHOW: "show" + i,
      SHOWN: "shown" + i,
      FOCUSIN: "focusin" + i,
      RESIZE: "resize" + i,
      CLICK_DISMISS: "click.dismiss" + i,
      KEYDOWN_DISMISS: "keydown.dismiss" + i,
      MOUSEUP_DISMISS: "mouseup.dismiss" + i,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
      CLICK_DATA_API: "click" + i + ".data-api"
    },
        c = "modal-scrollbar-measure",
        u = "modal-backdrop",
        f = "modal-open",
        d = "fade",
        _ = "show",
        g = {
      DIALOG: ".modal-dialog",
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      STICKY_CONTENT: ".sticky-top",
      NAVBAR_TOGGLER: ".navbar-toggler"
    },
        p = function () {
      function o(e, n) {
        this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0;
      }

      var p = o.prototype;
      return p.toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t);
      }, p.show = function (e) {
        var n = this;

        if (!this._isTransitioning && !this._isShown) {
          P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
          var i = t.Event(h.SHOW, {
            relatedTarget: e
          });
          t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, function (t) {
            return n.hide(t);
          }), t(this._dialog).on(h.MOUSEDOWN_DISMISS, function () {
            t(n._element).one(h.MOUSEUP_DISMISS, function (e) {
              t(e.target).is(n._element) && (n._ignoreBackdropClick = !0);
            });
          }), this._showBackdrop(function () {
            return n._showElement(e);
          }));
        }
      }, p.hide = function (e) {
        var n = this;

        if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
          var i = t.Event(h.HIDE);

          if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
            this._isShown = !1;
            var s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
            s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, function (t) {
              return n._hideModal(t);
            }).emulateTransitionEnd(300) : this._hideModal();
          }
        }
      }, p.dispose = function () {
        t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null;
      }, p.handleUpdate = function () {
        this._adjustDialog();
      }, p._getConfig = function (t) {
        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t;
      }, p._showElement = function (e) {
        var n = this,
            i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();

        var s = t.Event(h.SHOWN, {
          relatedTarget: e
        }),
            r = function r() {
          n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s);
        };

        i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r();
      }, p._enforceFocus = function () {
        var e = this;
        t(document).off(h.FOCUSIN).on(h.FOCUSIN, function (n) {
          document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus();
        });
      }, p._setEscapeEvent = function () {
        var e = this;
        this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function (t) {
          27 === t.which && (t.preventDefault(), e.hide());
        }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS);
      }, p._setResizeEvent = function () {
        var e = this;
        this._isShown ? t(window).on(h.RESIZE, function (t) {
          return e.handleUpdate(t);
        }) : t(window).off(h.RESIZE);
      }, p._hideModal = function () {
        var e = this;
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
          t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN);
        });
      }, p._removeBackdrop = function () {
        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null);
      }, p._showBackdrop = function (e) {
        var n = this,
            i = t(this._element).hasClass(d) ? d : "";

        if (this._isShown && this._config.backdrop) {
          var s = P.supportsTransitionEnd() && i;
          if (this._backdrop = document.createElement("div"), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, function (t) {
            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide());
          }), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
          if (!s) return void e();
          t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150);
        } else if (!this._isShown && this._backdrop) {
          t(this._backdrop).removeClass(_);

          var r = function r() {
            n._removeBackdrop(), e && e();
          };

          P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r();
        } else e && e();
      }, p._adjustDialog = function () {
        var t = this._element.scrollHeight > document.documentElement.clientHeight;
        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
      }, p._resetAdjustments = function () {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
      }, p._checkScrollbar = function () {
        var t = document.body.getBoundingClientRect();
        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
      }, p._setScrollbar = function () {
        var e = this;

        if (this._isBodyOverflowing) {
          t(g.FIXED_CONTENT).each(function (n, i) {
            var s = t(i)[0].style.paddingRight,
                r = t(i).css("padding-right");
            t(i).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px");
          }), t(g.STICKY_CONTENT).each(function (n, i) {
            var s = t(i)[0].style.marginRight,
                r = t(i).css("margin-right");
            t(i).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px");
          }), t(g.NAVBAR_TOGGLER).each(function (n, i) {
            var s = t(i)[0].style.marginRight,
                r = t(i).css("margin-right");
            t(i).data("margin-right", s).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px");
          });
          var n = document.body.style.paddingRight,
              i = t("body").css("padding-right");
          t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px");
        }
      }, p._resetScrollbar = function () {
        t(g.FIXED_CONTENT).each(function (e, n) {
          var i = t(n).data("padding-right");
          "undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right");
        }), t(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function (e, n) {
          var i = t(n).data("margin-right");
          "undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right");
        });
        var e = t("body").data("padding-right");
        "undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right");
      }, p._getScrollbarWidth = function () {
        var t = document.createElement("div");
        t.className = c, document.body.appendChild(t);
        var e = t.getBoundingClientRect().width - t.clientWidth;
        return document.body.removeChild(t), e;
      }, o._jQueryInterface = function (e, i) {
        return this.each(function () {
          var s = t(this).data(n),
              a = r({}, o.Default, t(this).data(), "object" == _typeof(e) && e);

          if (s || (s = new o(this, a), t(this).data(n, s)), "string" == typeof e) {
            if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
            s[e](i);
          } else a.show && s.show(i);
        });
      }, s(o, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return a;
        }
      }]), o;
    }();

    return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function (e) {
      var i,
          s = this,
          o = P.getSelectorFromElement(this);
      o && (i = t(o)[0]);
      var a = t(i).data(n) ? "toggle" : r({}, t(i).data(), t(this).data());
      "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
      var l = t(i).one(h.SHOW, function (e) {
        e.isDefaultPrevented() || l.one(h.HIDDEN, function () {
          t(s).is(":visible") && s.focus();
        });
      });

      p._jQueryInterface.call(t(i), a, this);
    }), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function () {
      return t.fn.modal = o, p._jQueryInterface;
    }, p;
  }(e),
      U = function (t) {
    var e = "tooltip",
        i = "bs.tooltip",
        o = "." + i,
        a = t.fn[e],
        l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        h = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)"
    },
        c = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left"
    },
        u = {
      animation: !0,
      template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent"
    },
        f = "show",
        d = "out",
        _ = {
      HIDE: "hide" + o,
      HIDDEN: "hidden" + o,
      SHOW: "show" + o,
      SHOWN: "shown" + o,
      INSERTED: "inserted" + o,
      CLICK: "click" + o,
      FOCUSIN: "focusin" + o,
      FOCUSOUT: "focusout" + o,
      MOUSEENTER: "mouseenter" + o,
      MOUSELEAVE: "mouseleave" + o
    },
        g = "fade",
        p = "show",
        m = ".tooltip-inner",
        v = ".arrow",
        E = "hover",
        T = "focus",
        y = "click",
        C = "manual",
        I = function () {
      function a(t, e) {
        if ("undefined" == typeof n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
      }

      var I = a.prototype;
      return I.enable = function () {
        this._isEnabled = !0;
      }, I.disable = function () {
        this._isEnabled = !1;
      }, I.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      }, I.toggle = function (e) {
        if (this._isEnabled) if (e) {
          var n = this.constructor.DATA_KEY,
              i = t(e.currentTarget).data(n);
          i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
        } else {
          if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);

          this._enter(null, this);
        }
      }, I.dispose = function () {
        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
      }, I.show = function () {
        var e = this;
        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
        var i = t.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          t(this.element).trigger(i);
          var s = t.contains(this.element.ownerDocument.documentElement, this.element);
          if (i.isDefaultPrevented() || !s) return;
          var r = this.getTipElement(),
              o = P.getUID(this.constructor.NAME);
          r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(g);

          var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
              h = this._getAttachment(l);

          this.addAttachmentClass(h);
          var c = !1 === this.config.container ? document.body : t(this.config.container);
          t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
            placement: h,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: v
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(t) {
              t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
            },
            onUpdate: function onUpdate(t) {
              e._handlePopperPlacementChange(t);
            }
          }), t(r).addClass(p), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);

          var u = function u() {
            e.config.animation && e._fixTransition();
            var n = e._hoverState;
            e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e);
          };

          P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u();
        }
      }, I.hide = function (e) {
        var n = this,
            i = this.getTipElement(),
            s = t.Event(this.constructor.Event.HIDE),
            r = function r() {
          n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e();
        };

        t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "");
      }, I.update = function () {
        null !== this._popper && this._popper.scheduleUpdate();
      }, I.isWithContent = function () {
        return Boolean(this.getTitle());
      }, I.addAttachmentClass = function (e) {
        t(this.getTipElement()).addClass("bs-tooltip-" + e);
      }, I.getTipElement = function () {
        return this.tip = this.tip || t(this.config.template)[0], this.tip;
      }, I.setContent = function () {
        var e = t(this.getTipElement());
        this.setElementContent(e.find(m), this.getTitle()), e.removeClass(g + " " + p);
      }, I.setElementContent = function (e, n) {
        var i = this.config.html;
        "object" == _typeof(n) && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n);
      }, I.getTitle = function () {
        var t = this.element.getAttribute("data-original-title");
        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
      }, I._getAttachment = function (t) {
        return c[t.toUpperCase()];
      }, I._setListeners = function () {
        var e = this;
        this.config.trigger.split(" ").forEach(function (n) {
          if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
            return e.toggle(t);
          });else if (n !== C) {
            var i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
            t(e.element).on(i, e.config.selector, function (t) {
              return e._enter(t);
            }).on(s, e.config.selector, function (t) {
              return e._leave(t);
            });
          }
          t(e.element).closest(".modal").on("hide.bs.modal", function () {
            return e.hide();
          });
        }), this.config.selector ? this.config = r({}, this.config, {
          trigger: "manual",
          selector: ""
        }) : this._fixTitle();
      }, I._fixTitle = function () {
        var t = _typeof(this.element.getAttribute("data-original-title"));

        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
      }, I._enter = function (e, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
          n._hoverState === f && n.show();
        }, n.config.delay.show) : n.show());
      }, I._leave = function (e, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
          n._hoverState === d && n.hide();
        }, n.config.delay.hide) : n.hide());
      }, I._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger) {
          if (this._activeTrigger[t]) return !0;
        }

        return !1;
      }, I._getConfig = function (n) {
        return "number" == typeof (n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
          show: n.delay,
          hide: n.delay
        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n;
      }, I._getDelegateConfig = function () {
        var t = {};
        if (this.config) for (var e in this.config) {
          this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
        }
        return t;
      }, I._cleanTipClass = function () {
        var e = t(this.getTipElement()),
            n = e.attr("class").match(l);
        null !== n && n.length > 0 && e.removeClass(n.join(""));
      }, I._handlePopperPlacementChange = function (t) {
        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
      }, I._fixTransition = function () {
        var e = this.getTipElement(),
            n = this.config.animation;
        null === e.getAttribute("x-placement") && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n);
      }, a._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data(i),
              s = "object" == _typeof(e) && e;

          if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), "string" == typeof e)) {
            if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
            n[e]();
          }
        });
      }, s(a, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return u;
        }
      }, {
        key: "NAME",
        get: function get() {
          return e;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return i;
        }
      }, {
        key: "Event",
        get: function get() {
          return _;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return o;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return h;
        }
      }]), a;
    }();

    return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function () {
      return t.fn[e] = a, I._jQueryInterface;
    }, I;
  }(e),
      x = function (t) {
    var e = "popover",
        n = "bs.popover",
        i = "." + n,
        o = t.fn[e],
        a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        l = r({}, U.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }),
        h = r({}, U.DefaultType, {
      content: "(string|element|function)"
    }),
        c = "fade",
        u = "show",
        f = ".popover-header",
        d = ".popover-body",
        _ = {
      HIDE: "hide" + i,
      HIDDEN: "hidden" + i,
      SHOW: "show" + i,
      SHOWN: "shown" + i,
      INSERTED: "inserted" + i,
      CLICK: "click" + i,
      FOCUSIN: "focusin" + i,
      FOCUSOUT: "focusout" + i,
      MOUSEENTER: "mouseenter" + i,
      MOUSELEAVE: "mouseleave" + i
    },
        g = function (r) {
      var o, g;

      function p() {
        return r.apply(this, arguments) || this;
      }

      g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
      var m = p.prototype;
      return m.isWithContent = function () {
        return this.getTitle() || this._getContent();
      }, m.addAttachmentClass = function (e) {
        t(this.getTipElement()).addClass("bs-popover-" + e);
      }, m.getTipElement = function () {
        return this.tip = this.tip || t(this.config.template)[0], this.tip;
      }, m.setContent = function () {
        var e = t(this.getTipElement());
        this.setElementContent(e.find(f), this.getTitle());

        var n = this._getContent();

        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(c + " " + u);
      }, m._getContent = function () {
        return this.element.getAttribute("data-content") || this.config.content;
      }, m._cleanTipClass = function () {
        var e = t(this.getTipElement()),
            n = e.attr("class").match(a);
        null !== n && n.length > 0 && e.removeClass(n.join(""));
      }, p._jQueryInterface = function (e) {
        return this.each(function () {
          var i = t(this).data(n),
              s = "object" == _typeof(e) ? e : null;

          if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), "string" == typeof e)) {
            if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
            i[e]();
          }
        });
      }, s(p, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return l;
        }
      }, {
        key: "NAME",
        get: function get() {
          return e;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return n;
        }
      }, {
        key: "Event",
        get: function get() {
          return _;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return i;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return h;
        }
      }]), p;
    }(U);

    return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
      return t.fn[e] = o, g._jQueryInterface;
    }, g;
  }(e),
      K = function (t) {
    var e = "scrollspy",
        n = "bs.scrollspy",
        i = "." + n,
        o = t.fn[e],
        a = {
      offset: 10,
      method: "auto",
      target: ""
    },
        l = {
      offset: "number",
      method: "string",
      target: "(string|element)"
    },
        h = {
      ACTIVATE: "activate" + i,
      SCROLL: "scroll" + i,
      LOAD_DATA_API: "load" + i + ".data-api"
    },
        c = "dropdown-item",
        u = "active",
        f = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: ".active",
      NAV_LIST_GROUP: ".nav, .list-group",
      NAV_LINKS: ".nav-link",
      NAV_ITEMS: ".nav-item",
      LIST_ITEMS: ".list-group-item",
      DROPDOWN: ".dropdown",
      DROPDOWN_ITEMS: ".dropdown-item",
      DROPDOWN_TOGGLE: ".dropdown-toggle"
    },
        d = "offset",
        _ = "position",
        g = function () {
      function o(e, n) {
        var i = this;
        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + f.NAV_LINKS + "," + this._config.target + " " + f.LIST_ITEMS + "," + this._config.target + " " + f.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
          return i._process(t);
        }), this.refresh(), this._process();
      }

      var g = o.prototype;
      return g.refresh = function () {
        var e = this,
            n = this._scrollElement === this._scrollElement.window ? d : _,
            i = "auto" === this._config.method ? n : this._config.method,
            s = i === _ ? this._getScrollTop() : 0;
        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
          var n,
              r = P.getSelectorFromElement(e);

          if (r && (n = t(r)[0]), n) {
            var o = n.getBoundingClientRect();
            if (o.width || o.height) return [t(n)[i]().top + s, r];
          }

          return null;
        }).filter(function (t) {
          return t;
        }).sort(function (t, e) {
          return t[0] - e[0];
        }).forEach(function (t) {
          e._offsets.push(t[0]), e._targets.push(t[1]);
        });
      }, g.dispose = function () {
        t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
      }, g._getConfig = function (n) {
        if ("string" != typeof (n = r({}, a, n)).target) {
          var i = t(n.target).attr("id");
          i || (i = P.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i;
        }

        return P.typeCheckConfig(e, n, l), n;
      }, g._getScrollTop = function () {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }, g._getScrollHeight = function () {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }, g._getOffsetHeight = function () {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }, g._process = function () {
        var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();

        if (this._scrollHeight !== e && this.refresh(), t >= n) {
          var i = this._targets[this._targets.length - 1];
          this._activeTarget !== i && this._activate(i);
        } else {
          if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

          for (var s = this._offsets.length; s--;) {
            this._activeTarget !== this._targets[s] && t >= this._offsets[s] && ("undefined" == typeof this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s]);
          }
        }
      }, g._activate = function (e) {
        this._activeTarget = e, this._clear();

        var n = this._selector.split(",");

        n = n.map(function (t) {
          return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
        });
        var i = t(n.join(","));
        i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS + ", " + f.LIST_ITEMS).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
          relatedTarget: e
        });
      }, g._clear = function () {
        t(this._selector).filter(f.ACTIVE).removeClass(u);
      }, o._jQueryInterface = function (e) {
        return this.each(function () {
          var i = t(this).data(n);

          if (i || (i = new o(this, "object" == _typeof(e) && e), t(this).data(n, i)), "string" == typeof e) {
            if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
            i[e]();
          }
        });
      }, s(o, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }, {
        key: "Default",
        get: function get() {
          return a;
        }
      }]), o;
    }();

    return t(window).on(h.LOAD_DATA_API, function () {
      for (var e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
        var i = t(e[n]);

        g._jQueryInterface.call(i, i.data());
      }
    }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
      return t.fn[e] = o, g._jQueryInterface;
    }, g;
  }(e),
      V = function (t) {
    var e = "bs.tab",
        n = "." + e,
        i = t.fn.tab,
        r = {
      HIDE: "hide" + n,
      HIDDEN: "hidden" + n,
      SHOW: "show" + n,
      SHOWN: "shown" + n,
      CLICK_DATA_API: "click.bs.tab.data-api"
    },
        o = "dropdown-menu",
        a = "active",
        l = "disabled",
        h = "fade",
        c = "show",
        u = ".dropdown",
        f = ".nav, .list-group",
        d = ".active",
        _ = "> li > .active",
        g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        p = ".dropdown-toggle",
        m = "> .dropdown-menu .active",
        v = function () {
      function n(t) {
        this._element = t;
      }

      var i = n.prototype;
      return i.show = function () {
        var e = this;

        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
          var n,
              i,
              s = t(this._element).closest(f)[0],
              o = P.getSelectorFromElement(this._element);

          if (s) {
            var h = "UL" === s.nodeName ? _ : d;
            i = (i = t.makeArray(t(s).find(h)))[i.length - 1];
          }

          var c = t.Event(r.HIDE, {
            relatedTarget: this._element
          }),
              u = t.Event(r.SHOW, {
            relatedTarget: i
          });

          if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
            o && (n = t(o)[0]), this._activate(this._element, s);

            var g = function g() {
              var n = t.Event(r.HIDDEN, {
                relatedTarget: e._element
              }),
                  s = t.Event(r.SHOWN, {
                relatedTarget: i
              });
              t(i).trigger(n), t(e._element).trigger(s);
            };

            n ? this._activate(n, n.parentNode, g) : g();
          }
        }
      }, i.dispose = function () {
        t.removeData(this._element, e), this._element = null;
      }, i._activate = function (e, n, i) {
        var s = this,
            r = ("UL" === n.nodeName ? t(n).find(_) : t(n).children(d))[0],
            o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
            a = function a() {
          return s._transitionComplete(e, r, i);
        };

        r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a();
      }, i._transitionComplete = function (e, n, i) {
        if (n) {
          t(n).removeClass(c + " " + a);
          var s = t(n.parentNode).find(m)[0];
          s && t(s).removeClass(a), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1);
        }

        if (t(e).addClass(a), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
          var r = t(e).closest(u)[0];
          r && t(r).find(p).addClass(a), e.setAttribute("aria-expanded", !0);
        }

        i && i();
      }, n._jQueryInterface = function (i) {
        return this.each(function () {
          var s = t(this),
              r = s.data(e);

          if (r || (r = new n(this), s.data(e, r)), "string" == typeof i) {
            if ("undefined" == typeof r[i]) throw new TypeError('No method named "' + i + '"');
            r[i]();
          }
        });
      }, s(n, null, [{
        key: "VERSION",
        get: function get() {
          return "4.0.0";
        }
      }]), n;
    }();

    return t(document).on(r.CLICK_DATA_API, g, function (e) {
      e.preventDefault(), v._jQueryInterface.call(t(this), "show");
    }), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function () {
      return t.fn.tab = i, v._jQueryInterface;
    }, v;
  }(e);

  !function (t) {
    if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
  }(e), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});

/***/ }),

/***/ "./resources/js/js/contact.js":
/*!************************************!*\
  !*** ./resources/js/js/contact.js ***!
  \************************************/
/***/ (() => {

$(document).ready(function () {
  (function ($) {
    "use strict";

    jQuery.validator.addMethod('answercheck', function (value, element) {
      return this.optional(element) || /^\bcat\b$/.test(value);
    }, "type the correct answer -_-"); // validate contactForm form

    $(function () {
      $('#contactForm').validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          subject: {
            required: true,
            minlength: 4
          },
          number: {
            required: true,
            minlength: 5
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 20
          }
        },
        messages: {
          name: {
            required: "come on, you have a name, don't you?",
            minlength: "your name must consist of at least 2 characters"
          },
          subject: {
            required: "come on, you have a subject, don't you?",
            minlength: "your subject must consist of at least 4 characters"
          },
          number: {
            required: "come on, you have a number, don't you?",
            minlength: "your Number must consist of at least 5 characters"
          },
          email: {
            required: "no email, no message"
          },
          message: {
            required: "um...yea, you have to write something to send this form.",
            minlength: "thats all? really?"
          }
        },
        submitHandler: function submitHandler(form) {
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "contact_process.php",
            success: function success() {
              $('#contactForm :input').attr('disabled', 'disabled');
              $('#contactForm').fadeTo("slow", 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
                $('.modal').modal('hide');
                $('#success').modal('show');
              });
            },
            error: function error() {
              $('#contactForm').fadeTo("slow", 1, function () {
                $('#error').fadeIn();
                $('.modal').modal('hide');
                $('#error').modal('show');
              });
            }
          });
        }
      });
    });
  })(jQuery);
});

/***/ }),

/***/ "./resources/js/js/jquery.ajaxchimp.min.js":
/*!*************************************************!*\
  !*** ./resources/js/js/jquery.ajaxchimp.min.js ***!
  \*************************************************/
/***/ (() => {

(function ($) {
  'use strict';

  $.ajaxChimp = {
    responses: {
      'We have sent you a confirmation email': 0,
      'Please enter a valid email': 1,
      'An email address must contain a single @': 2,
      'The domain portion of the email address is invalid (the portion after the @: )': 3,
      'The username portion of the email address is invalid (the portion before the @: )': 4,
      'This email address looks fake or invalid. Please enter a real email address': 5
    },
    translations: {
      'en': null
    },
    init: function init(selector, options) {
      $(selector).ajaxChimp(options);
    }
  };

  $.fn.ajaxChimp = function (options) {
    $(this).each(function (i, elem) {
      var form = $(elem);
      var email = form.find('input[type=email]');
      var label = form.find('.info');
      var settings = $.extend({
        'url': form.attr('action'),
        'language': 'en'
      }, options);
      var url = settings.url.replace('/post?', '/post-json?').concat('&c=?');
      form.attr('novalidate', 'true');
      email.attr('name', 'EMAIL');
      form.submit(function () {
        var msg;

        function successCallback(resp) {
          if (resp.result === 'success') {
            msg = 'We have sent you a confirmation email';
            label.removeClass('error').addClass('valid');
            email.removeClass('error').addClass('valid');
          } else {
            email.removeClass('valid').addClass('error');
            label.removeClass('valid').addClass('error');
            var index = -1;

            try {
              var parts = resp.msg.split(' - ', 2);

              if (parts[1] === undefined) {
                msg = resp.msg;
              } else {
                var i = parseInt(parts[0], 10);

                if (i.toString() === parts[0]) {
                  index = parts[0];
                  msg = parts[1];
                } else {
                  index = -1;
                  msg = resp.msg;
                }
              }
            } catch (e) {
              index = -1;
              msg = resp.msg;
            }
          } // Translate and display message


          if (settings.language !== 'en' && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
            msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]];
          }

          label.html(msg);
          label.show(2000);

          if (settings.callback) {
            settings.callback(resp);
          }
        }

        var data = {};
        var dataArray = form.serializeArray();
        $.each(dataArray, function (index, item) {
          data[item.name] = item.value;
        });
        $.ajax({
          url: url,
          data: data,
          success: successCallback,
          dataType: 'jsonp',
          error: function error(resp, text) {
            console.log('mailchimp ajax submit error: ' + text);
          }
        }); // Translate and display submit message

        var submitMsg = 'Submitting...';

        if (settings.language !== 'en' && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]['submit']) {
          submitMsg = $.ajaxChimp.translations[settings.language]['submit'];
        }

        label.html(submitMsg).show(2000);
        return false;
      });
    });
    return this;
  };
})(jQuery);

/***/ }),

/***/ "./resources/js/js/jquery.form.js":
/*!****************************************!*\
  !*** ./resources/js/js/jquery.form.js ***!
  \****************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * jQuery Form Plugin
 * version: 3.32.0-2013.04.09
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */

/*global ActiveXObject */
;

(function ($) {
  "use strict";
  /*
      Usage Note:
      -----------
      Do not use both ajaxSubmit and ajaxForm on the same form.  These
      functions are mutually exclusive.  Use ajaxSubmit if you want
      to bind your own submit handler to the form.  For example,
  
      $(document).ready(function() {
          $('#myForm').on('submit', function(e) {
              e.preventDefault(); // <-- important
              $(this).ajaxSubmit({
                  target: '#output'
              });
          });
      });
  
      Use ajaxForm when you want the plugin to manage all the event binding
      for you.  For example,
  
      $(document).ready(function() {
          $('#myForm').ajaxForm({
              target: '#output'
          });
      });
  
      You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
      form does not have to exist when you invoke ajaxForm:
  
      $('#myForm').ajaxForm({
          delegation: true,
          target: '#output'
      });
  
      When using ajaxForm, the ajaxSubmit function will be invoked for you
      at the appropriate time.
  */

  /**
   * Feature detection
   */

  var feature = {};
  feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
  feature.formdata = window.FormData !== undefined;
  var hasProp = !!$.fn.prop; // attr2 uses prop when it can but checks the return type for
  // an expected string.  this accounts for the case where a form 
  // contains inputs with names like "action" or "method"; in those
  // cases "prop" returns the element

  $.fn.attr2 = function () {
    if (!hasProp) return this.attr.apply(this, arguments);
    var val = this.prop.apply(this, arguments);
    if (val && val.jquery || typeof val === 'string') return val;
    return this.attr.apply(this, arguments);
  };
  /**
   * ajaxSubmit() provides a mechanism for immediately submitting
   * an HTML form using AJAX.
   */


  $.fn.ajaxSubmit = function (options) {
    /*jshint scripturl:true */
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
      log('ajaxSubmit: skipping submit process - no element selected');
      return this;
    }

    var method,
        action,
        url,
        $form = this;

    if (typeof options == 'function') {
      options = {
        success: options
      };
    }

    method = this.attr2('method');
    action = this.attr2('action');
    url = typeof action === 'string' ? $.trim(action) : '';
    url = url || window.location.href || '';

    if (url) {
      // clean url (don't include hash vaue)
      url = (url.match(/^([^#]+)/) || [])[1];
    }

    options = $.extend(true, {
      url: url,
      success: $.ajaxSettings.success,
      type: method || 'GET',
      iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options); // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor

    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);

    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
      return this;
    } // provide opportunity to alter form data before it is serialized


    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSerialize callback');
      return this;
    }

    var traditional = options.traditional;

    if (traditional === undefined) {
      traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx,
        a = this.formToArray(options.semantic, elements);

    if (options.data) {
      options.extraData = options.data;
      qx = $.param(options.data, traditional);
    } // give pre-submit callback an opportunity to abort the submit


    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSubmit callback');
      return this;
    } // fire vetoable 'validate' event


    this.trigger('form-submit-validate', [a, this, options, veto]);

    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
      return this;
    }

    var q = $.param(a, traditional);

    if (qx) {
      q = q ? q + '&' + qx : qx;
    }

    if (options.type.toUpperCase() == 'GET') {
      options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
      options.data = null; // data is null for 'get'
    } else {
      options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];

    if (options.resetForm) {
      callbacks.push(function () {
        $form.resetForm();
      });
    }

    if (options.clearForm) {
      callbacks.push(function () {
        $form.clearForm(options.includeHidden);
      });
    } // perform a load on the target only if dataType is not provided


    if (!options.dataType && options.target) {
      var oldSuccess = options.success || function () {};

      callbacks.push(function (data) {
        var fn = options.replaceTarget ? 'replaceWith' : 'html';
        $(options.target)[fn](data).each(oldSuccess, arguments);
      });
    } else if (options.success) {
      callbacks.push(options.success);
    }

    options.success = function (data, status, xhr) {
      // jQuery 1.4+ passes xhr as 3rd arg
      var context = options.context || this; // jQuery 1.4+ supports scope context

      for (var i = 0, max = callbacks.length; i < max; i++) {
        callbacks[i].apply(context, [data, status, xhr || $form, $form]);
      }
    }; // are there files to upload?
    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219


    var fileInputs = $('input[type=file]:enabled[value!=""]', this);
    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = $form.attr('enctype') == mp || $form.attr('encoding') == mp;
    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
    var jqxhr; // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected

    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
      // hack to fix Safari hang (thanks to Tim Molendijk for this)
      // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
      if (options.closeKeepAlive) {
        $.get(options.closeKeepAlive, function () {
          jqxhr = fileUploadIframe(a);
        });
      } else {
        jqxhr = fileUploadIframe(a);
      }
    } else if ((hasFileInputs || multipart) && fileAPI) {
      jqxhr = fileUploadXhr(a);
    } else {
      jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr); // clear element array

    for (var k = 0; k < elements.length; k++) {
      elements[k] = null;
    } // fire 'notify' event


    this.trigger('form-submit-notify', [this, options]);
    return this; // utility fn for deep serialization

    function deepSerialize(extraData) {
      var serialized = $.param(extraData).split('&');
      var len = serialized.length;
      var result = [];
      var i, part;

      for (i = 0; i < len; i++) {
        // #252; undo param space replacement
        serialized[i] = serialized[i].replace(/\+/g, ' ');
        part = serialized[i].split('='); // #278; use array instead of object storage, favoring array serializations

        result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
      }

      return result;
    } // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)


    function fileUploadXhr(a) {
      var formdata = new FormData();

      for (var i = 0; i < a.length; i++) {
        formdata.append(a[i].name, a[i].value);
      }

      if (options.extraData) {
        var serializedData = deepSerialize(options.extraData);

        for (i = 0; i < serializedData.length; i++) {
          if (serializedData[i]) formdata.append(serializedData[i][0], serializedData[i][1]);
        }
      }

      options.data = null;
      var s = $.extend(true, {}, $.ajaxSettings, options, {
        contentType: false,
        processData: false,
        cache: false,
        type: method || 'POST'
      });

      if (options.uploadProgress) {
        // workaround because jqXHR does not expose upload property
        s.xhr = function () {
          var xhr = jQuery.ajaxSettings.xhr();

          if (xhr.upload) {
            xhr.upload.addEventListener('progress', function (event) {
              var percent = 0;
              var position = event.loaded || event.position;
              /*event.position is deprecated*/

              var total = event.total;

              if (event.lengthComputable) {
                percent = Math.ceil(position / total * 100);
              }

              options.uploadProgress(event, position, total, percent);
            }, false);
          }

          return xhr;
        };
      }

      s.data = null;
      var beforeSend = s.beforeSend;

      s.beforeSend = function (xhr, o) {
        o.data = formdata;
        if (beforeSend) beforeSend.call(this, xhr, o);
      };

      return $.ajax(s);
    } // private function for handling file uploads (hat tip to YAHOO!)


    function fileUploadIframe(a) {
      var form = $form[0],
          el,
          i,
          s,
          g,
          id,
          $io,
          io,
          xhr,
          sub,
          n,
          timedOut,
          timeoutHandle;
      var deferred = $.Deferred();

      if (a) {
        // ensure that every serialized input is still enabled
        for (i = 0; i < elements.length; i++) {
          el = $(elements[i]);
          if (hasProp) el.prop('disabled', false);else el.removeAttr('disabled');
        }
      }

      s = $.extend(true, {}, $.ajaxSettings, options);
      s.context = s.context || s;
      id = 'jqFormIO' + new Date().getTime();

      if (s.iframeTarget) {
        $io = $(s.iframeTarget);
        n = $io.attr2('name');
        if (!n) $io.attr2('name', id);else id = n;
      } else {
        $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
        $io.css({
          position: 'absolute',
          top: '-1000px',
          left: '-1000px'
        });
      }

      io = $io[0];
      xhr = {
        // mock object
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: 'n/a',
        getAllResponseHeaders: function getAllResponseHeaders() {},
        getResponseHeader: function getResponseHeader() {},
        setRequestHeader: function setRequestHeader() {},
        abort: function abort(status) {
          var e = status === 'timeout' ? 'timeout' : 'aborted';
          log('aborting upload... ' + e);
          this.aborted = 1;

          try {
            // #214, #257
            if (io.contentWindow.document.execCommand) {
              io.contentWindow.document.execCommand('Stop');
            }
          } catch (ignore) {}

          $io.attr('src', s.iframeSrc); // abort op in progress

          xhr.error = e;
          if (s.error) s.error.call(s.context, xhr, e, status);
          if (g) $.event.trigger("ajaxError", [xhr, s, e]);
          if (s.complete) s.complete.call(s.context, xhr, e);
        }
      };
      g = s.global; // trigger ajax global events so that activity/block indicators work like normal

      if (g && 0 === $.active++) {
        $.event.trigger("ajaxStart");
      }

      if (g) {
        $.event.trigger("ajaxSend", [xhr, s]);
      }

      if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
        if (s.global) {
          $.active--;
        }

        deferred.reject();
        return deferred;
      }

      if (xhr.aborted) {
        deferred.reject();
        return deferred;
      } // add submitting element to data if we know it


      sub = form.clk;

      if (sub) {
        n = sub.name;

        if (n && !sub.disabled) {
          s.extraData = s.extraData || {};
          s.extraData[n] = sub.value;

          if (sub.type == "image") {
            s.extraData[n + '.x'] = form.clk_x;
            s.extraData[n + '.y'] = form.clk_y;
          }
        }
      }

      var CLIENT_TIMEOUT_ABORT = 1;
      var SERVER_ABORT = 2;

      function getDoc(frame) {
        /* it looks like contentWindow or contentDocument do not
         * carry the protocol property in ie8, when running under ssl
         * frame.document is the only valid response document, since
         * the protocol is know but not on the other two objects. strange?
         * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
         */
        var doc = null; // IE8 cascading access check

        try {
          if (frame.contentWindow) {
            doc = frame.contentWindow.document;
          }
        } catch (err) {
          // IE8 access denied under ssl & missing protocol
          log('cannot get iframe.contentWindow document: ' + err);
        }

        if (doc) {
          // successful getting content
          return doc;
        }

        try {
          // simply checking may throw in ie8 under ssl or mismatched protocol
          doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch (err) {
          // last attempt
          log('cannot get iframe.contentDocument: ' + err);
          doc = frame.document;
        }

        return doc;
      } // Rails CSRF hack (thanks to Yvan Barthelemy)


      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');

      if (csrf_param && csrf_token) {
        s.extraData = s.extraData || {};
        s.extraData[csrf_param] = csrf_token;
      } // take a breath so that pending repaints get some cpu time before the upload starts


      function doSubmit() {
        // make sure form attrs are set
        var t = $form.attr2('target'),
            a = $form.attr2('action'); // update form attrs in IE friendly way

        form.setAttribute('target', id);

        if (!method) {
          form.setAttribute('method', 'POST');
        }

        if (a != s.url) {
          form.setAttribute('action', s.url);
        } // ie borks in some cases when setting encoding


        if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
          $form.attr({
            encoding: 'multipart/form-data',
            enctype: 'multipart/form-data'
          });
        } // support timout


        if (s.timeout) {
          timeoutHandle = setTimeout(function () {
            timedOut = true;
            cb(CLIENT_TIMEOUT_ABORT);
          }, s.timeout);
        } // look for server aborts


        function checkState() {
          try {
            var state = getDoc(io).readyState;
            log('state = ' + state);
            if (state && state.toLowerCase() == 'uninitialized') setTimeout(checkState, 50);
          } catch (e) {
            log('Server abort: ', e, ' (', e.name, ')');
            cb(SERVER_ABORT);
            if (timeoutHandle) clearTimeout(timeoutHandle);
            timeoutHandle = undefined;
          }
        } // add "extra" data to form if provided in options


        var extraInputs = [];

        try {
          if (s.extraData) {
            for (var n in s.extraData) {
              if (s.extraData.hasOwnProperty(n)) {
                // if using the $.param format that allows for multiple values with the same name
                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                  extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value).appendTo(form)[0]);
                } else {
                  extraInputs.push($('<input type="hidden" name="' + n + '">').val(s.extraData[n]).appendTo(form)[0]);
                }
              }
            }
          }

          if (!s.iframeTarget) {
            // add iframe to doc and submit the form
            $io.appendTo('body');
            if (io.attachEvent) io.attachEvent('onload', cb);else io.addEventListener('load', cb, false);
          }

          setTimeout(checkState, 15);

          try {
            form.submit();
          } catch (err) {
            // just in case form has element with name/id of 'submit'
            var submitFn = document.createElement('form').submit;
            submitFn.apply(form);
          }
        } finally {
          // reset attrs and remove "extra" input elements
          form.setAttribute('action', a);

          if (t) {
            form.setAttribute('target', t);
          } else {
            $form.removeAttr('target');
          }

          $(extraInputs).remove();
        }
      }

      if (s.forceSync) {
        doSubmit();
      } else {
        setTimeout(doSubmit, 10); // this lets dom updates render
      }

      var data,
          doc,
          domCheckCount = 50,
          callbackProcessed;

      function cb(e) {
        if (xhr.aborted || callbackProcessed) {
          return;
        }

        doc = getDoc(io);

        if (!doc) {
          log('cannot access response document');
          e = SERVER_ABORT;
        }

        if (e === CLIENT_TIMEOUT_ABORT && xhr) {
          xhr.abort('timeout');
          deferred.reject(xhr, 'timeout');
          return;
        } else if (e == SERVER_ABORT && xhr) {
          xhr.abort('server abort');
          deferred.reject(xhr, 'error', 'server abort');
          return;
        }

        if (!doc || doc.location.href == s.iframeSrc) {
          // response not received yet
          if (!timedOut) return;
        }

        if (io.detachEvent) io.detachEvent('onload', cb);else io.removeEventListener('load', cb, false);
        var status = 'success',
            errMsg;

        try {
          if (timedOut) {
            throw 'timeout';
          }

          var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
          log('isXml=' + isXml);

          if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
            if (--domCheckCount) {
              // in some browsers (Opera) the iframe DOM is not always traversable when
              // the onload callback fires, so we loop a bit to accommodate
              log('requeing onLoad callback, DOM not available');
              setTimeout(cb, 250);
              return;
            } // let this fall through because server response could be an empty document
            //log('Could not access iframe DOM after mutiple tries.');
            //throw 'DOMException: not available';

          } //log('response detected');


          var docRoot = doc.body ? doc.body : doc.documentElement;
          xhr.responseText = docRoot ? docRoot.innerHTML : null;
          xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
          if (isXml) s.dataType = 'xml';

          xhr.getResponseHeader = function (header) {
            var headers = {
              'content-type': s.dataType
            };
            return headers[header];
          }; // support for XHR 'status' & 'statusText' emulation :


          if (docRoot) {
            xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
            xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
          }

          var dt = (s.dataType || '').toLowerCase();
          var scr = /(json|script|text)/.test(dt);

          if (scr || s.textarea) {
            // see if user embedded response in textarea
            var ta = doc.getElementsByTagName('textarea')[0];

            if (ta) {
              xhr.responseText = ta.value; // support for XHR 'status' & 'statusText' emulation :

              xhr.status = Number(ta.getAttribute('status')) || xhr.status;
              xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
            } else if (scr) {
              // account for browsers injecting pre around json response
              var pre = doc.getElementsByTagName('pre')[0];
              var b = doc.getElementsByTagName('body')[0];

              if (pre) {
                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
              } else if (b) {
                xhr.responseText = b.textContent ? b.textContent : b.innerText;
              }
            }
          } else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);
          }

          try {
            data = httpData(xhr, dt, s);
          } catch (err) {
            status = 'parsererror';
            xhr.error = errMsg = err || status;
          }
        } catch (err) {
          log('error caught: ', err);
          status = 'error';
          xhr.error = errMsg = err || status;
        }

        if (xhr.aborted) {
          log('upload aborted');
          status = null;
        }

        if (xhr.status) {
          // we've set xhr.status
          status = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ? 'success' : 'error';
        } // ordering of these callbacks/triggers is odd, but that's how $.ajax does it


        if (status === 'success') {
          if (s.success) s.success.call(s.context, data, 'success', xhr);
          deferred.resolve(xhr.responseText, 'success', xhr);
          if (g) $.event.trigger("ajaxSuccess", [xhr, s]);
        } else if (status) {
          if (errMsg === undefined) errMsg = xhr.statusText;
          if (s.error) s.error.call(s.context, xhr, status, errMsg);
          deferred.reject(xhr, 'error', errMsg);
          if (g) $.event.trigger("ajaxError", [xhr, s, errMsg]);
        }

        if (g) $.event.trigger("ajaxComplete", [xhr, s]);

        if (g && ! --$.active) {
          $.event.trigger("ajaxStop");
        }

        if (s.complete) s.complete.call(s.context, xhr, status);
        callbackProcessed = true;
        if (s.timeout) clearTimeout(timeoutHandle); // clean up

        setTimeout(function () {
          if (!s.iframeTarget) $io.remove();
          xhr.responseXML = null;
        }, 100);
      }

      var toXml = $.parseXML || function (s, doc) {
        // use parseXML if available (jQuery 1.5+)
        if (window.ActiveXObject) {
          doc = new ActiveXObject('Microsoft.XMLDOM');
          doc.async = 'false';
          doc.loadXML(s);
        } else {
          doc = new DOMParser().parseFromString(s, 'text/xml');
        }

        return doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror' ? doc : null;
      };

      var parseJSON = $.parseJSON || function (s) {
        /*jslint evil:true */
        return window['eval']('(' + s + ')');
      };

      var httpData = function httpData(xhr, type, s) {
        // mostly lifted from jq1.4.4
        var ct = xhr.getResponseHeader('content-type') || '',
            xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
            data = xml ? xhr.responseXML : xhr.responseText;

        if (xml && data.documentElement.nodeName === 'parsererror') {
          if ($.error) $.error('parsererror');
        }

        if (s && s.dataFilter) {
          data = s.dataFilter(data, type);
        }

        if (typeof data === 'string') {
          if (type === 'json' || !type && ct.indexOf('json') >= 0) {
            data = parseJSON(data);
          } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
            $.globalEval(data);
          }
        }

        return data;
      };

      return deferred;
    }
  };
  /**
   * ajaxForm() provides a mechanism for fully automating form submission.
   *
   * The advantages of using this method instead of ajaxSubmit() are:
   *
   * 1: This method will include coordinates for <input type="image" /> elements (if the element
   *    is used to submit the form).
   * 2. This method will include the submit element's name/value data (for the element that was
   *    used to submit the form).
   * 3. This method binds the submit() method to the form for you.
   *
   * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
   * passes the options argument along after properly binding events for submit elements and
   * the form itself.
   */


  $.fn.ajaxForm = function (options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on); // in jQuery 1.3+ we can fix mistakes with the ready state

    if (!options.delegation && this.length === 0) {
      var o = {
        s: this.selector,
        c: this.context
      };

      if (!$.isReady && o.s) {
        log('DOM not ready, queuing ajaxForm');
        $(function () {
          $(o.s, o.c).ajaxForm(options);
        });
        return this;
      } // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()


      log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
      return this;
    }

    if (options.delegation) {
      $(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
      return this;
    }

    return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin', options, captureSubmittingElement);
  }; // private event handlers


  function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;

    if (!e.isDefaultPrevented()) {
      // if event has been canceled, don't proceed
      e.preventDefault();
      $(this).ajaxSubmit(options);
    }
  }

  function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);

    if (!$el.is("[type=submit],[type=image]")) {
      // is this a child element of the submit el?  (ex: a span within a button)
      var t = $el.closest('[type=submit]');

      if (t.length === 0) {
        return;
      }

      target = t[0];
    }

    var form = this;
    form.clk = target;

    if (target.type == 'image') {
      if (e.offsetX !== undefined) {
        form.clk_x = e.offsetX;
        form.clk_y = e.offsetY;
      } else if (typeof $.fn.offset == 'function') {
        var offset = $el.offset();
        form.clk_x = e.pageX - offset.left;
        form.clk_y = e.pageY - offset.top;
      } else {
        form.clk_x = e.pageX - target.offsetLeft;
        form.clk_y = e.pageY - target.offsetTop;
      }
    } // clear form vars


    setTimeout(function () {
      form.clk = form.clk_x = form.clk_y = null;
    }, 100);
  } // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm


  $.fn.ajaxFormUnbind = function () {
    return this.unbind('submit.form-plugin click.form-plugin');
  };
  /**
   * formToArray() gathers form element data into an array of objects that can
   * be passed to any of the following ajax functions: $.get, $.post, or load.
   * Each object in the array has both a 'name' and 'value' property.  An example of
   * an array for a simple login form might be:
   *
   * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
   *
   * It is this array that is passed to pre-submit callback functions provided to the
   * ajaxSubmit() and ajaxForm() methods.
   */


  $.fn.formToArray = function (semantic, elements) {
    var a = [];

    if (this.length === 0) {
      return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;

    if (!els) {
      return a;
    }

    var i, j, n, v, el, max, jmax;

    for (i = 0, max = els.length; i < max; i++) {
      el = els[i];
      n = el.name;

      if (!n || el.disabled) {
        continue;
      }

      if (semantic && form.clk && el.type == "image") {
        // handle image inputs on the fly when semantic == true
        if (form.clk == el) {
          a.push({
            name: n,
            value: $(el).val(),
            type: el.type
          });
          a.push({
            name: n + '.x',
            value: form.clk_x
          }, {
            name: n + '.y',
            value: form.clk_y
          });
        }

        continue;
      }

      v = $.fieldValue(el, true);

      if (v && v.constructor == Array) {
        if (elements) elements.push(el);

        for (j = 0, jmax = v.length; j < jmax; j++) {
          a.push({
            name: n,
            value: v[j]
          });
        }
      } else if (feature.fileapi && el.type == 'file') {
        if (elements) elements.push(el);
        var files = el.files;

        if (files.length) {
          for (j = 0; j < files.length; j++) {
            a.push({
              name: n,
              value: files[j],
              type: el.type
            });
          }
        } else {
          // #180
          a.push({
            name: n,
            value: '',
            type: el.type
          });
        }
      } else if (v !== null && typeof v != 'undefined') {
        if (elements) elements.push(el);
        a.push({
          name: n,
          value: v,
          type: el.type,
          required: el.required
        });
      }
    }

    if (!semantic && form.clk) {
      // input type=='image' are not found in elements array! handle it here
      var $input = $(form.clk),
          input = $input[0];
      n = input.name;

      if (n && !input.disabled && input.type == 'image') {
        a.push({
          name: n,
          value: $input.val()
        });
        a.push({
          name: n + '.x',
          value: form.clk_x
        }, {
          name: n + '.y',
          value: form.clk_y
        });
      }
    }

    return a;
  };
  /**
   * Serializes form data into a 'submittable' string. This method will return a string
   * in the format: name1=value1&amp;name2=value2
   */


  $.fn.formSerialize = function (semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
  };
  /**
   * Serializes all field elements in the jQuery object into a query string.
   * This method will return a string in the format: name1=value1&amp;name2=value2
   */


  $.fn.fieldSerialize = function (successful) {
    var a = [];
    this.each(function () {
      var n = this.name;

      if (!n) {
        return;
      }

      var v = $.fieldValue(this, successful);

      if (v && v.constructor == Array) {
        for (var i = 0, max = v.length; i < max; i++) {
          a.push({
            name: n,
            value: v[i]
          });
        }
      } else if (v !== null && typeof v != 'undefined') {
        a.push({
          name: this.name,
          value: v
        });
      }
    }); //hand off to jQuery.param for proper encoding

    return $.param(a);
  };
  /**
   * Returns the value(s) of the element in the matched set.  For example, consider the following form:
   *
   *  <form><fieldset>
   *      <input name="A" type="text" />
   *      <input name="A" type="text" />
   *      <input name="B" type="checkbox" value="B1" />
   *      <input name="B" type="checkbox" value="B2"/>
   *      <input name="C" type="radio" value="C1" />
   *      <input name="C" type="radio" value="C2" />
   *  </fieldset></form>
   *
   *  var v = $('input[type=text]').fieldValue();
   *  // if no values are entered into the text inputs
   *  v == ['','']
   *  // if values entered into the text inputs are 'foo' and 'bar'
   *  v == ['foo','bar']
   *
   *  var v = $('input[type=checkbox]').fieldValue();
   *  // if neither checkbox is checked
   *  v === undefined
   *  // if both checkboxes are checked
   *  v == ['B1', 'B2']
   *
   *  var v = $('input[type=radio]').fieldValue();
   *  // if neither radio is checked
   *  v === undefined
   *  // if first radio is checked
   *  v == ['C1']
   *
   * The successful argument controls whether or not the field element must be 'successful'
   * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
   * The default value of the successful argument is true.  If this value is false the value(s)
   * for each element is returned.
   *
   * Note: This method *always* returns an array.  If no valid value can be determined the
   *    array will be empty, otherwise it will contain one or more values.
   */


  $.fn.fieldValue = function (successful) {
    for (var val = [], i = 0, max = this.length; i < max; i++) {
      var el = this[i];
      var v = $.fieldValue(el, successful);

      if (v === null || typeof v == 'undefined' || v.constructor == Array && !v.length) {
        continue;
      }

      if (v.constructor == Array) $.merge(val, v);else val.push(v);
    }

    return val;
  };
  /**
   * Returns the value of the field element.
   */


  $.fieldValue = function (el, successful) {
    var n = el.name,
        t = el.type,
        tag = el.tagName.toLowerCase();

    if (successful === undefined) {
      successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
      return null;
    }

    if (tag == 'select') {
      var index = el.selectedIndex;

      if (index < 0) {
        return null;
      }

      var a = [],
          ops = el.options;
      var one = t == 'select-one';
      var max = one ? index + 1 : ops.length;

      for (var i = one ? index : 0; i < max; i++) {
        var op = ops[i];

        if (op.selected) {
          var v = op.value;

          if (!v) {
            // extra pain for IE...
            v = op.attributes && op.attributes['value'] && !op.attributes['value'].specified ? op.text : op.value;
          }

          if (one) {
            return v;
          }

          a.push(v);
        }
      }

      return a;
    }

    return $(el).val();
  };
  /**
   * Clears the form data.  Takes the following actions on the form's input fields:
   *  - input text fields will have their 'value' property set to the empty string
   *  - select elements will have their 'selectedIndex' property set to -1
   *  - checkbox and radio inputs will have their 'checked' property set to false
   *  - inputs of type submit, button, reset, and hidden will *not* be effected
   *  - button elements will *not* be effected
   */


  $.fn.clearForm = function (includeHidden) {
    return this.each(function () {
      $('input,select,textarea', this).clearFields(includeHidden);
    });
  };
  /**
   * Clears the selected form elements.
   */


  $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list

    return this.each(function () {
      var t = this.type,
          tag = this.tagName.toLowerCase();

      if (re.test(t) || tag == 'textarea') {
        this.value = '';
      } else if (t == 'checkbox' || t == 'radio') {
        this.checked = false;
      } else if (tag == 'select') {
        this.selectedIndex = -1;
      } else if (t == "file") {
        if (/MSIE/.test(navigator.userAgent)) {
          $(this).replaceWith($(this).clone(true));
        } else {
          $(this).val('');
        }
      } else if (includeHidden) {
        // includeHidden can be the value true, or it can be a selector string
        // indicating a special test; for example:
        //  $('#myForm').clearForm('.special:hidden')
        // the above would clean hidden inputs that have the class of 'special'
        if (includeHidden === true && /hidden/.test(t) || typeof includeHidden == 'string' && $(this).is(includeHidden)) this.value = '';
      }
    });
  };
  /**
   * Resets the form data.  Causes all form elements to be reset to their original value.
   */


  $.fn.resetForm = function () {
    return this.each(function () {
      // guard against an input with the name of 'reset'
      // note that IE reports the reset function as an 'object'
      if (typeof this.reset == 'function' || _typeof(this.reset) == 'object' && !this.reset.nodeType) {
        this.reset();
      }
    });
  };
  /**
   * Enables or disables any matching elements.
   */


  $.fn.enable = function (b) {
    if (b === undefined) {
      b = true;
    }

    return this.each(function () {
      this.disabled = !b;
    });
  };
  /**
   * Checks/unchecks any matching checkboxes or radio buttons and
   * selects/deselects and matching option elements.
   */


  $.fn.selected = function (select) {
    if (select === undefined) {
      select = true;
    }

    return this.each(function () {
      var t = this.type;

      if (t == 'checkbox' || t == 'radio') {
        this.checked = select;
      } else if (this.tagName.toLowerCase() == 'option') {
        var $sel = $(this).parent('select');

        if (select && $sel[0] && $sel[0].type == 'select-one') {
          // deselect all other options
          $sel.find('option').selected(false);
        }

        this.selected = select;
      }
    });
  }; // expose debug var


  $.fn.ajaxSubmit.debug = false; // helper fn for console logging

  function log() {
    if (!$.fn.ajaxSubmit.debug) return;
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');

    if (window.console && window.console.log) {
      window.console.log(msg);
    } else if (window.opera && window.opera.postError) {
      window.opera.postError(msg);
    }
  }
})(jQuery);

/***/ }),

/***/ "./resources/js/js/jquery.magnific-popup.js":
/*!**************************************************!*\
  !*** ./resources/js/js/jquery.magnific-popup.js ***!
  \**************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (a) {
  var b,
      c,
      d,
      e,
      f,
      g,
      h = "Close",
      i = "BeforeClose",
      j = "AfterClose",
      k = "BeforeAppend",
      l = "MarkupParse",
      m = "Open",
      n = "Change",
      o = "mfp",
      p = "." + o,
      q = "mfp-ready",
      r = "mfp-removing",
      s = "mfp-prevent-close",
      t = function t() {},
      u = !!window.jQuery,
      v = a(window),
      w = function w(a, c) {
    b.ev.on(o + a + p, c);
  },
      x = function x(b, c, d, e) {
    var f = document.createElement("div");
    return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f;
  },
      y = function y(c, d) {
    b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
  },
      z = function z(c) {
    return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn;
  },
      A = function A() {
    a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
  },
      B = function B() {
    var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
    if (void 0 !== a.transition) return !0;

    for (; b.length;) {
      if (b.pop() + "Transition" in a) return !0;
    }

    return !1;
  };

  t.prototype = {
    constructor: t,
    init: function init() {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {};
    },
    open: function open(c) {
      var e;

      if (c.isObj === !1) {
        b.items = c.items.toArray(), b.index = 0;
        var g,
            h = c.items;

        for (e = 0; e < h.length; e++) {
          if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
            b.index = e;
            break;
          }
        }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;

      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
        b.close();
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
        b._checkIfClose(a.target) && b.close();
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;

      for (e = 0; e < i.length; e++) {
        var j = i[e];
        j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
      }

      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
        c.close_replaceWith = z(d.type);
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
        overflow: b.st.overflowY,
        overflowX: "hidden",
        overflowY: b.st.overflowY
      }) : b.wrap.css({
        top: v.scrollTop(),
        position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
        height: d.height(),
        position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
        27 === a.keyCode && b.close();
      }), v.on("resize" + p, function () {
        b.updateSize();
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
          n = {};

      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();

        o && (n.marginRight = o);
      }

      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
    },
    close: function close() {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
        b._close();
      }, b.st.removalDelay)) : b._close());
    },
    _close: function _close() {
      y(h);
      var c = r + " " + q + " ";

      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
      }

      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
    },
    updateSize: function updateSize(a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
            d = window.innerHeight * c;
        b.wrap.css("height", d), b.wH = d;
      } else b.wH = a || v.height();

      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;

      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
      }

      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange");
    },
    appendContent: function appendContent(a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
    },
    parseEl: function parseEl(c) {
      var d,
          e = b.items[c];

      if (e.tagName ? e = {
        el: a(e)
      } : (d = e.type, e = {
        data: e,
        src: e.src
      }), e.el) {
        for (var f = b.types, g = 0; g < f.length; g++) {
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        }

        e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
      }

      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c];
    },
    addGroup: function addGroup(a, c) {
      var d = function d(_d) {
        _d.mfpEl = this, b._openClick(_d, a, c);
      };

      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)));
    },
    _openClick: function _openClick(c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;

      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
        var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
        if (g) if (a.isFunction(g)) {
          if (!g.call(b)) return !0;
        } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e);
      }
    },
    updateStatus: function updateStatus(a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
        var e = {
          status: a,
          text: d
        };
        y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation();
        }), b.container.addClass("mfp-s-" + a), c = a;
      }
    },
    _checkIfClose: function _checkIfClose(c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
            e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;

        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function _addClassToMFP(a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function _removeClassFromMFP(a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function _hasScrollBar(a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
    },
    _setFocus: function _setFocus() {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
    },
    _parseMarkup: function _parseMarkup(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
        if (void 0 === d || d === !1) return !0;

        if (e = c.split("_"), e.length > 1) {
          var f = b.find(p + "-" + e[0]);

          if (f.length > 0) {
            var g = e[1];
            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
          }
        } else b.find(p + "-" + c).html(d);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
      }

      return b.scrollbarSize;
    }
  }, a.magnificPopup = {
    instance: null,
    proto: t.prototype,
    modules: [],
    open: function open(b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
    },
    close: function close() {
      return a.magnificPopup.instance && a.magnificPopup.instance.close();
    },
    registerModule: function registerModule(b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (c) {
    A();
    var d = a(this);
    if ("string" == typeof c) {
      if ("open" === c) {
        var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
        f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
          mfpEl: e
        }, d, f);
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
    } else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
    return d;
  };

  var C,
      D,
      E,
      F = "inline",
      G = function G() {
    E && (D.after(E.addClass(C)).detach(), E = null);
  };

  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        b.types.push(F), w(h + "." + F, function () {
          G();
        });
      },
      getInline: function getInline(c, d) {
        if (G(), c.src) {
          var e = b.st.inline,
              f = a(c.src);

          if (f.length) {
            var g = f[0].parentNode;
            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), f = a("<div>");

          return c.inlineElement = f, f;
        }

        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      }
    }
  });

  var H,
      I = "ajax",
      J = function J() {
    H && a(document.body).removeClass(H);
  },
      K = function K() {
    J(), b.req && b.req.abort();
  };

  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function initAjax() {
        b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
      },
      getAjax: function getAjax(c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend({
          url: c.src,
          success: function success(d, e, f) {
            var g = {
              data: d,
              xhr: f
            };
            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
              b.wrap.addClass(q);
            }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
          },
          error: function error() {
            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
          }
        }, b.st.ajax.settings);
        return b.req = a.ajax(d), "";
      }
    }
  });

  var L,
      M = function M(c) {
    if (c.data && void 0 !== c.data.title) return c.data.title;
    var d = b.st.image.titleSrc;

    if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || "";
    }

    return "";
  };

  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var c = b.st.image,
            d = ".image";
        b.types.push("image"), w(m + d, function () {
          "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
        }), w(h + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
        }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function resizeImage() {
        var a = b.currItem;

        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function _onImageHasSize(a) {
        a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
      },
      findImageSize: function findImageSize(a) {
        var c = 0,
            d = a.img[0],
            e = function e(f) {
          L && clearInterval(L), L = setInterval(function () {
            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
          }, f);
        };

        e(1);
      },
      getImage: function getImage(c, d) {
        var e = 0,
            f = function f() {
          c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()));
        },
            g = function g() {
          c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0);
        },
            h = b.st.image,
            i = d.find(".mfp-img");

        if (i.length) {
          var j = document.createElement("img");
          j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
        }

        return b._parseMarkup(d, {
          title: M(c),
          img_replaceWith: c.img
        }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d);
      }
    }
  });

  var N,
      O = function O() {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N;
  };

  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var a,
            c = b.st.zoom,
            d = ".zoom";

        if (c.enabled && b.supportsTransition) {
          var e,
              f,
              g = c.duration,
              j = function j(a) {
            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                f = "transition";
            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
          },
              k = function k() {
            b.content.css("visibility", "visible");
          };

          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
              f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                f.css(b._getOffset(!0)), e = setTimeout(function () {
                  k(), setTimeout(function () {
                    f.remove(), a = f = null, y("ZoomAnimationEnded");
                  }, 16);
                }, g);
              }, 16);
            }
          }), w(i + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.st.removalDelay = g, !a) {
                if (a = b._getItemToZoom(), !a) return;
                f = j(a);
              }

              f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                f.css(b._getOffset());
              }, 16);
            }
          }), w(h + d, function () {
            b._allowZoom() && (k(), f && f.remove(), a = null);
          });
        }
      },
      _allowZoom: function _allowZoom() {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function _getItemToZoom() {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function _getOffset(c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
            f = parseInt(d.css("padding-top"), 10),
            g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h;
      }
    }
  });

  var P = "iframe",
      Q = "//about:blank",
      R = function R(a) {
    if (b.currTemplate[P]) {
      var c = b.currTemplate[P].find("iframe");
      c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
    }
  };

  a.magnificPopup.registerModule(P, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        b.types.push(P), w("BeforeChange", function (a, b, c) {
          b !== c && (b === P ? R() : c === P && R(!0));
        }), w(h + "." + P, function () {
          R();
        });
      },
      getIframe: function getIframe(c, d) {
        var e = c.src,
            f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0;
        });
        var g = {};
        return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
      }
    }
  });

  var S = function S(a) {
    var c = b.items.length;
    return a > c - 1 ? a - c : 0 > a ? c + a : a;
  },
      T = function T(a, b, c) {
    return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
  };

  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var c = b.st.gallery,
            e = ".mfp-gallery";
        return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
          c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
            return b.items.length > 1 ? (b.next(), !1) : void 0;
          }), d.on("keydown" + e, function (a) {
            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
          });
        }), w("UpdateStatus" + e, function (a, c) {
          c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
        }), w(l + e, function (a, d, e, f) {
          var g = b.items.length;
          e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
        }), w("BuildControls" + e, function () {
          if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
            var d = c.arrowMarkup,
                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
            e.click(function () {
              b.prev();
            }), f.click(function () {
              b.next();
            }), b.container.append(e.add(f));
          }
        }), w(n + e, function () {
          b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
            b.preloadNearbyImages(), b._preloadTimeout = null;
          }, 16);
        }), void w(h + e, function () {
          d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null;
        })) : !1;
      },
      next: function next() {
        b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
      },
      prev: function prev() {
        b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
      },
      goTo: function goTo(a) {
        b.direction = a >= b.index, b.index = a, b.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var a,
            c = b.st.gallery.preload,
            d = Math.min(c[0], b.items.length),
            e = Math.min(c[1], b.items.length);

        for (a = 1; a <= (b.direction ? e : d); a++) {
          b._preloadItem(b.index + a);
        }

        for (a = 1; a <= (b.direction ? d : e); a++) {
          b._preloadItem(b.index - a);
        }
      },
      _preloadItem: function _preloadItem(c) {
        if (c = S(c), !b.items[c].preloaded) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
            d.hasSize = !0;
          }).on("error.mfploader", function () {
            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
          }).attr("src", d.src)), d.preloaded = !0;
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function replaceSrc(a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function initRetina() {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
              c = a.ratio;
          c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
            b.img.css({
              "max-width": b.img[0].naturalWidth / c,
              width: "100%"
            });
          }), w("ElementParse." + U, function (b, d) {
            d.src = a.replaceSrc(d, c);
          }));
        }
      }
    }
  }), A();
});

/***/ }),

/***/ "./resources/js/js/jquery.nice-select.min.js":
/*!***************************************************!*\
  !*** ./resources/js/js/jquery.nice-select.min.js ***!
  \***************************************************/
/***/ (() => {

/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
!function (e) {
  e.fn.niceSelect = function (t) {
    function s(t) {
      t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
      var s = t.next(),
          n = t.find("option"),
          i = t.find("option:selected");
      s.find(".current").html(i.data("display") || i.text()), n.each(function (t) {
        var n = e(this),
            i = n.data("display");
        s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()));
      });
    }

    if ("string" == typeof t) return "update" == t ? this.each(function () {
      var t = e(this),
          n = e(this).next(".nice-select"),
          i = n.hasClass("open");
      n.length && (n.remove(), s(t), i && t.next().trigger("click"));
    }) : "destroy" == t ? (this.each(function () {
      var t = e(this),
          s = e(this).next(".nice-select");
      s.length && (s.remove(), t.css("display", ""));
    }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
    this.hide(), this.each(function () {
      var t = e(this);
      t.next().hasClass("nice-select") || s(t);
    }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) {
      var s = e(this);
      e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus();
    }), e(document).on("click.nice_select", function (t) {
      0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option");
    }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) {
      var s = e(this),
          n = s.closest(".nice-select");
      n.find(".selected").removeClass("selected"), s.addClass("selected");
      var i = s.data("display") || s.text();
      n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change");
    }), e(document).on("keydown.nice_select", ".nice-select", function (t) {
      var s = e(this),
          n = e(s.find(".focus") || s.find(".list .option.selected"));
      if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;

      if (40 == t.keyCode) {
        if (s.hasClass("open")) {
          var i = n.nextAll(".option:not(.disabled)").first();
          i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"));
        } else s.trigger("click");

        return !1;
      }

      if (38 == t.keyCode) {
        if (s.hasClass("open")) {
          var l = n.prevAll(".option:not(.disabled)").first();
          l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"));
        } else s.trigger("click");

        return !1;
      }

      if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");else if (9 == t.keyCode && s.hasClass("open")) return !1;
    });
    var n = document.createElement("a").style;
    return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this;
  };
}(jQuery);

/***/ }),

/***/ "./resources/js/js/jquery.paroller.min.js":
/*!************************************************!*\
  !*** ./resources/js/js/jquery.paroller.min.js ***!
  \************************************************/
/***/ ((module, exports) => {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
/**
* jQuery plugin paroller.js v1.4.6
* https://github.com/tgomilar/paroller.js
* preview: https://tgomilar.github.io/paroller/
**/

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (a) {
  'use strict';

   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(function (a) {
  'use strict';

  var b = Math.round;

  var c = !1,
      d = function d() {
    c = !1;
  },
      e = {
    bgVertical: function bgVertical(a, b) {
      return a.css({
        "background-position": 'center ' + -b + 'px'
      });
    },
    bgHorizontal: function bgHorizontal(a, b) {
      return a.css({
        "background-position": -b + 'px center'
      });
    },
    vertical: function vertical(a, b, c, d) {
      return 'none' === d && (d = ''), a.css({
        "-webkit-transform": 'translateY(' + b + 'px)' + d,
        "-moz-transform": 'translateY(' + b + 'px)' + d,
        transform: 'translate(0,' + b + 'px)' + d,
        transition: c,
        "will-change": 'transform'
      });
    },
    horizontal: function horizontal(a, b, c, d) {
      return 'none' === d && (d = ''), a.css({
        "-webkit-transform": 'translateX(' + b + 'px)' + d,
        "-moz-transform": 'translateX(' + b + 'px)' + d,
        transform: 'translate(' + b + 'px, 0)' + d,
        transition: c,
        "will-change": 'transform'
      });
    }
  },
      f = {
    factor: function factor(a, b, c) {
      var d = a.data('paroller-factor'),
          e = d ? d : c.factor;

      if (576 > b) {
        var _b = a.data('paroller-factor-xs'),
            _d = _b ? _b : c.factorXs;

        return _d ? _d : e;
      }

      if (768 >= b) {
        var _b2 = a.data('paroller-factor-sm'),
            _d2 = _b2 ? _b2 : c.factorSm;

        return _d2 ? _d2 : e;
      }

      if (1024 >= b) {
        var _b3 = a.data('paroller-factor-md'),
            _d3 = _b3 ? _b3 : c.factorMd;

        return _d3 ? _d3 : e;
      }

      if (1200 >= b) {
        var _b4 = a.data('paroller-factor-lg'),
            _d4 = _b4 ? _b4 : c.factorLg;

        return _d4 ? _d4 : e;
      }

      if (1920 >= b) {
        var _b5 = a.data('paroller-factor-xl'),
            _d5 = _b5 ? _b5 : c.factorXl;

        return _d5 ? _d5 : e;
      }

      return e;
    },
    bgOffset: function bgOffset(a, c) {
      return b(a * c);
    },
    transform: function transform(a, c, d, e) {
      return b((a - d / 2 + e) * c);
    }
  },
      g = {
    background: function background(a) {
      return a.css({
        "background-position": 'unset'
      });
    },
    foreground: function foreground(a) {
      return a.css({
        transform: 'unset',
        transition: 'unset'
      });
    }
  };

  a.fn.paroller = function (h) {
    var i = a(window).height(),
        j = a(document).height(); // default options

    return h = a.extend({
      factor: 0,
      // - to +
      factorXs: 0,
      // - to +
      factorSm: 0,
      // - to +
      factorMd: 0,
      // - to +
      factorLg: 0,
      // - to +
      factorXl: 0,
      // - to +
      transition: 'transform .1s ease',
      // CSS transition
      type: 'background',
      // foreground
      direction: 'vertical' // horizontal

    }, h), this.each(function () {
      var k = a(this);

      var l = k.outerHeight(),
          m = a(window).width(),
          n = k.offset().top,
          o = 0,
          p = function p(a, b) {
        // console.log(`offset ${scrollOffset} => ${transform - scrollOffset}`)
        return a || (o = b), b - o;
      };

      var q = k.data('paroller-type'),
          r = k.data('paroller-direction'),
          s = k.data('paroller-transition'),
          t = k.css('transform'),
          u = s ? s : h.transition,
          v = q ? q : h.type,
          w = r ? r : h.direction;
      var x = 0,
          y = f.bgOffset(n, x),
          z = f.transform(n, x, i, l);
      'background' === v ? 'vertical' === w ? e.bgVertical(k, y) : 'horizontal' === w && e.bgHorizontal(k, y) : 'foreground' === v && ('vertical' === w ? e.vertical(k, z, u, t) : 'horizontal' === w && e.horizontal(k, z, u, t)), a(window).on('resize', function () {
        var o = a(this).scrollTop();
        m = a(window).width(), n = k.offset().top, l = k.outerHeight(), x = f.factor(k, m, h), y = b(n * x);
        var q = p(a(document).scrollTop(), b((n - i / 2 + l) * x));
        c || (window.requestAnimationFrame(d), c = !0), 'background' === v ? (g.background(k), 'vertical' === w ? e.bgVertical(k, y) : 'horizontal' === w && e.bgHorizontal(k, y)) : 'foreground' === v && o <= j && (g.foreground(k), 'vertical' === w ? e.vertical(k, q, u) : 'horizontal' === w && e.horizontal(k, q, u));
      }), a(window).on('load scroll', function () {
        var g = a(this).scrollTop(),
            o = a(document).scrollTop();
        x = f.factor(k, m, h);
        var q = p(o, b((n - i / 2 + l - g) * x));
        c || (window.requestAnimationFrame(d), c = !0), 'background' === v ? 'vertical' === w ? e.bgVertical(k, y) : 'horizontal' === w && e.bgHorizontal(k, y) : 'foreground' === v && g <= j && ('vertical' === w ? e.vertical(k, q, u, t) : 'horizontal' === w && e.horizontal(k, q, u, t));
      });
    });
  };
});

/***/ }),

/***/ "./resources/js/js/jquery.scrollUp.min.js":
/*!************************************************!*\
  !*** ./resources/js/js/jquery.scrollUp.min.js ***!
  \************************************************/
/***/ (() => {

/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
!function (l, o, e) {
  "use strict";

  l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
  }, l.fn.scrollUp.init = function (r) {
    var s,
        t,
        c,
        i,
        n,
        a,
        d,
        p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
        f = !1;

    switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
      id: p.scrollName,
      href: "#top"
    }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
      display: "none",
      position: "fixed",
      zIndex: p.zIndex
    }), p.activeOverlay && l("<div/>", {
      id: p.scrollName + "-active"
    }).css({
      position: "absolute",
      top: p.scrollDistance + "px",
      width: "100%",
      borderTop: "1px dotted" + p.activeOverlay,
      zIndex: p.zIndex
    }).appendTo("body"), p.animation) {
      case "fade":
        s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
        break;

      case "slide":
        s = "slideDown", t = "slideUp", c = p.animationSpeed;
        break;

      default:
        s = "show", t = "hide", c = 0;
    }

    i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function () {
      l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1);
    }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function (o) {
      o.preventDefault(), l("html, body").animate({
        scrollTop: a
      }, p.scrollSpeed, p.easingType);
    });
  }, l.fn.scrollUp.defaults = {
    scrollName: "scrollUp",
    scrollDistance: 300,
    scrollFrom: "top",
    scrollSpeed: 300,
    easingType: "linear",
    animation: "fade",
    animationSpeed: 200,
    scrollTrigger: !1,
    scrollTarget: !1,
    scrollText: "Scroll to top",
    scrollTitle: !1,
    scrollImg: !1,
    activeOverlay: !1,
    zIndex: 2147483647
  }, l.fn.scrollUp.destroy = function (r) {
    l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r);
  }, l.scrollUp = l.fn.scrollUp;
}(jQuery, window, document);

/***/ }),

/***/ "./resources/js/js/jquery.slicknav.min.js":
/*!************************************************!*\
  !*** ./resources/js/js/jquery.slicknav.min.js ***!
  \************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!function (e, t, n) {
  function a(t, n) {
    this.element = t, this.settings = e.extend({}, i, n), this.settings.duplicate || n.hasOwnProperty("removeIds") || (this.settings.removeIds = !1), this._defaults = i, this._name = s, this.init();
  }

  var i = {
    label: "MENU",
    duplicate: !0,
    duration: 200,
    easingOpen: "swing",
    easingClose: "swing",
    closedSymbol: "&#9658;",
    openedSymbol: "&#9660;",
    prependTo: "body",
    appendTo: "",
    parentTag: "a",
    closeOnClick: !1,
    allowParentLinks: !1,
    nestedParentLinks: !0,
    showChildren: !1,
    removeIds: !0,
    removeClasses: !1,
    removeStyles: !1,
    brand: "",
    animations: "jquery",
    init: function init() {},
    beforeOpen: function beforeOpen() {},
    beforeClose: function beforeClose() {},
    afterOpen: function afterOpen() {},
    afterClose: function afterClose() {}
  },
      s = "slicknav",
      o = "slicknav",
      l = {
    DOWN: 40,
    ENTER: 13,
    ESCAPE: 27,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  };
  a.prototype.init = function () {
    var n,
        a,
        i = this,
        s = e(this.element),
        r = this.settings;

    if (r.duplicate ? i.mobileNav = s.clone() : i.mobileNav = s, r.removeIds && (i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function (t, n) {
      e(n).removeAttr("id");
    })), r.removeClasses && (i.mobileNav.removeAttr("class"), i.mobileNav.find("*").each(function (t, n) {
      e(n).removeAttr("class");
    })), r.removeStyles && (i.mobileNav.removeAttr("style"), i.mobileNav.find("*").each(function (t, n) {
      e(n).removeAttr("style");
    })), n = o + "_icon", "" === r.label && (n += " " + o + "_no-text"), "a" == r.parentTag && (r.parentTag = 'a href="#"'), i.mobileNav.attr("class", o + "_nav"), a = e('<div class="' + o + '_menu"></div>'), "" !== r.brand) {
      var c = e('<div class="' + o + '_brand">' + r.brand + "</div>");
      e(a).append(c);
    }

    i.btn = e(["<" + r.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + o + "_btn " + o + '_collapsed">', '<span class="' + o + '_menutxt">' + r.label + "</span>", '<span class="' + n + '">', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', "</span>", "</" + r.parentTag + ">"].join("")), e(a).append(i.btn), "" !== r.appendTo ? e(r.appendTo).append(a) : e(r.prependTo).prepend(a), a.append(i.mobileNav);
    var p = i.mobileNav.find("li");
    e(p).each(function () {
      var t = e(this),
          n = {};

      if (n.children = t.children("ul").attr("role", "menu"), t.data("menu", n), n.children.length > 0) {
        var a = t.contents(),
            s = !1,
            l = [];
        e(a).each(function () {
          return e(this).is("ul") ? !1 : (l.push(this), void (e(this).is("a") && (s = !0)));
        });
        var c = e("<" + r.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + o + '_item"/>');
        if (r.allowParentLinks && !r.nestedParentLinks && s) e(l).wrapAll('<span class="' + o + "_parent-link " + o + '_row"/>').parent();else {
          var p = e(l).wrapAll(c).parent();
          p.addClass(o + "_row");
        }
        r.showChildren ? t.addClass(o + "_open") : t.addClass(o + "_collapsed"), t.addClass(o + "_parent");
        var d = e('<span class="' + o + '_arrow">' + (r.showChildren ? r.openedSymbol : r.closedSymbol) + "</span>");
        r.allowParentLinks && !r.nestedParentLinks && s && (d = d.wrap(c).parent()), e(l).last().after(d);
      } else 0 === t.children().length && t.addClass(o + "_txtnode");

      t.children("a").attr("role", "menuitem").click(function (t) {
        r.closeOnClick && !e(t.target).parent().closest("li").hasClass(o + "_parent") && e(i.btn).click();
      }), r.closeOnClick && r.allowParentLinks && (t.children("a").children("a").click(function (t) {
        e(i.btn).click();
      }), t.find("." + o + "_parent-link a:not(." + o + "_item)").click(function (t) {
        e(i.btn).click();
      }));
    }), e(p).each(function () {
      var t = e(this).data("menu");
      r.showChildren || i._visibilityToggle(t.children, null, !1, null, !0);
    }), i._visibilityToggle(i.mobileNav, null, !1, "init", !0), i.mobileNav.attr("role", "menu"), e(t).mousedown(function () {
      i._outlines(!1);
    }), e(t).keyup(function () {
      i._outlines(!0);
    }), e(i.btn).click(function (e) {
      e.preventDefault(), i._menuToggle();
    }), i.mobileNav.on("click", "." + o + "_item", function (t) {
      t.preventDefault(), i._itemClick(e(this));
    }), e(i.btn).keydown(function (t) {
      var n = t || event;

      switch (n.keyCode) {
        case l.ENTER:
        case l.SPACE:
        case l.DOWN:
          t.preventDefault(), n.keyCode === l.DOWN && e(i.btn).hasClass(o + "_open") || i._menuToggle(), e(i.btn).next().find('[role="menuitem"]').first().focus();
      }
    }), i.mobileNav.on("keydown", "." + o + "_item", function (t) {
      var n = t || event;

      switch (n.keyCode) {
        case l.ENTER:
          t.preventDefault(), i._itemClick(e(t.target));
          break;

        case l.RIGHT:
          t.preventDefault(), e(t.target).parent().hasClass(o + "_collapsed") && i._itemClick(e(t.target)), e(t.target).next().find('[role="menuitem"]').first().focus();
      }
    }), i.mobileNav.on("keydown", '[role="menuitem"]', function (t) {
      var n = t || event;

      switch (n.keyCode) {
        case l.DOWN:
          t.preventDefault();
          var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              r = s + 1;
          a.length <= r && (r = 0);
          var c = a.eq(r);
          c.focus();
          break;

        case l.UP:
          t.preventDefault();
          var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              c = a.eq(s - 1);
          c.focus();
          break;

        case l.LEFT:
          if (t.preventDefault(), e(t.target).parent().parent().parent().hasClass(o + "_open")) {
            var p = e(t.target).parent().parent().prev();
            p.focus(), i._itemClick(p);
          } else e(t.target).parent().parent().hasClass(o + "_nav") && (i._menuToggle(), e(i.btn).focus());

          break;

        case l.ESCAPE:
          t.preventDefault(), i._menuToggle(), e(i.btn).focus();
      }
    }), r.allowParentLinks && r.nestedParentLinks && e("." + o + "_item a").click(function (e) {
      e.stopImmediatePropagation();
    });
  }, a.prototype._menuToggle = function (e) {
    var t = this,
        n = t.btn,
        a = t.mobileNav;
    n.hasClass(o + "_collapsed") ? (n.removeClass(o + "_collapsed"), n.addClass(o + "_open")) : (n.removeClass(o + "_open"), n.addClass(o + "_collapsed")), n.addClass(o + "_animating"), t._visibilityToggle(a, n.parent(), !0, n);
  }, a.prototype._itemClick = function (e) {
    var t = this,
        n = t.settings,
        a = e.data("menu");
    a || (a = {}, a.arrow = e.children("." + o + "_arrow"), a.ul = e.next("ul"), a.parent = e.parent(), a.parent.hasClass(o + "_parent-link") && (a.parent = e.parent().parent(), a.ul = e.parent().next("ul")), e.data("menu", a)), a.parent.hasClass(o + "_collapsed") ? (a.arrow.html(n.openedSymbol), a.parent.removeClass(o + "_collapsed"), a.parent.addClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e)) : (a.arrow.html(n.closedSymbol), a.parent.addClass(o + "_collapsed"), a.parent.removeClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e));
  }, a.prototype._visibilityToggle = function (t, n, a, i, s) {
    function l(t, n) {
      e(t).removeClass(o + "_animating"), e(n).removeClass(o + "_animating"), s || p.afterOpen(t);
    }

    function r(n, a) {
      t.attr("aria-hidden", "true"), d.attr("tabindex", "-1"), c._setVisAttr(t, !0), t.hide(), e(n).removeClass(o + "_animating"), e(a).removeClass(o + "_animating"), s ? "init" == n && p.init() : p.afterClose(n);
    }

    var c = this,
        p = c.settings,
        d = c._getActionItems(t),
        u = 0;

    a && (u = p.duration), t.hasClass(o + "_hidden") ? (t.removeClass(o + "_hidden"), s || p.beforeOpen(i), "jquery" === p.animations ? t.stop(!0, !0).slideDown(u, p.easingOpen, function () {
      l(i, n);
    }) : "velocity" === p.animations && t.velocity("finish").velocity("slideDown", {
      duration: u,
      easing: p.easingOpen,
      complete: function complete() {
        l(i, n);
      }
    }), t.attr("aria-hidden", "false"), d.attr("tabindex", "0"), c._setVisAttr(t, !1)) : (t.addClass(o + "_hidden"), s || p.beforeClose(i), "jquery" === p.animations ? t.stop(!0, !0).slideUp(u, this.settings.easingClose, function () {
      r(i, n);
    }) : "velocity" === p.animations && t.velocity("finish").velocity("slideUp", {
      duration: u,
      easing: p.easingClose,
      complete: function complete() {
        r(i, n);
      }
    }));
  }, a.prototype._setVisAttr = function (t, n) {
    var a = this,
        i = t.children("li").children("ul").not("." + o + "_hidden");
    n ? i.each(function () {
      var t = e(this);
      t.attr("aria-hidden", "true");

      var i = a._getActionItems(t);

      i.attr("tabindex", "-1"), a._setVisAttr(t, n);
    }) : i.each(function () {
      var t = e(this);
      t.attr("aria-hidden", "false");

      var i = a._getActionItems(t);

      i.attr("tabindex", "0"), a._setVisAttr(t, n);
    });
  }, a.prototype._getActionItems = function (e) {
    var t = e.data("menu");

    if (!t) {
      t = {};
      var n = e.children("li"),
          a = n.find("a");
      t.links = a.add(n.find("." + o + "_item")), e.data("menu", t);
    }

    return t.links;
  }, a.prototype._outlines = function (t) {
    t ? e("." + o + "_item, ." + o + "_btn").css("outline", "") : e("." + o + "_item, ." + o + "_btn").css("outline", "none");
  }, a.prototype.toggle = function () {
    var e = this;

    e._menuToggle();
  }, a.prototype.open = function () {
    var e = this;
    e.btn.hasClass(o + "_collapsed") && e._menuToggle();
  }, a.prototype.close = function () {
    var e = this;
    e.btn.hasClass(o + "_open") && e._menuToggle();
  }, e.fn[s] = function (t) {
    var n = arguments;
    if (void 0 === t || "object" == _typeof(t)) return this.each(function () {
      e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new a(this, t));
    });

    if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
      var i;
      return this.each(function () {
        var o = e.data(this, "plugin_" + s);
        o instanceof a && "function" == typeof o[t] && (i = o[t].apply(o, Array.prototype.slice.call(n, 1)));
      }), void 0 !== i ? i : this;
    }
  };
}(jQuery, document, window);

/***/ }),

/***/ "./resources/js/js/jquery.sticky.js":
/*!******************************************!*\
  !*** ./resources/js/js/jquery.sticky.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  var slice = Array.prototype.slice; // save ref to original slice()

  var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: 'is-sticky',
    wrapperClassName: 'sticky-wrapper',
    center: false,
    getWidthFrom: '',
    widthFromWrapper: true,
    // works only when .getWidthFrom is empty
    responsiveWidth: false,
    zIndex: 'inherit'
  },
      $window = $(window),
      $document = $(document),
      sticked = [],
      windowHeight = $window.height(),
      scroller = function scroller() {
    var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = scrollTop > dwh ? dwh - scrollTop : 0;

    for (var i = 0, l = sticked.length; i < l; i++) {
      var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra; //update height in case of dynamic content

      s.stickyWrapper.css('height', s.stickyElement.outerHeight());

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          s.stickyElement.css({
            'width': '',
            'position': '',
            'top': '',
            'z-index': ''
          });
          s.stickyElement.parent().removeClass(s.className);
          s.stickyElement.trigger('sticky-end', [s]);
          s.currentTop = null;
        }
      } else {
        var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;

        if (newTop < 0) {
          newTop = newTop + s.topSpacing;
        } else {
          newTop = s.topSpacing;
        }

        if (s.currentTop !== newTop) {
          var newWidth;

          if (s.getWidthFrom) {
            padding = s.stickyElement.innerWidth() - s.stickyElement.width();
            newWidth = $(s.getWidthFrom).width() - padding || null;
          } else if (s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
          }

          if (newWidth == null) {
            newWidth = s.stickyElement.width();
          }

          s.stickyElement.css('width', newWidth).css('position', 'fixed').css('top', newTop).css('z-index', s.zIndex);
          s.stickyElement.parent().addClass(s.className);

          if (s.currentTop === null) {
            s.stickyElement.trigger('sticky-start', [s]);
          } else {
            // sticky is started but it have to be repositioned
            s.stickyElement.trigger('sticky-update', [s]);
          }

          if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
            // just reached bottom || just started to stick but bottom is already reached
            s.stickyElement.trigger('sticky-bottom-reached', [s]);
          } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
            // sticky is started && sticked at topSpacing && overflowing from top just finished
            s.stickyElement.trigger('sticky-bottom-unreached', [s]);
          }

          s.currentTop = newTop;
        } // Check if sticky has reached end of container and stop sticking


        var stickyWrapperContainer = s.stickyWrapper.parent();
        var unstick = s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight() && s.stickyElement.offset().top <= s.topSpacing;

        if (unstick) {
          s.stickyElement.css('position', 'absolute').css('top', '').css('bottom', 0).css('z-index', '');
        } else {
          s.stickyElement.css('position', 'fixed').css('top', newTop).css('bottom', '').css('z-index', s.zIndex);
        }
      }
    }
  },
      resizer = function resizer() {
    windowHeight = $window.height();

    for (var i = 0, l = sticked.length; i < l; i++) {
      var s = sticked[i];
      var newWidth = null;

      if (s.getWidthFrom) {
        if (s.responsiveWidth) {
          newWidth = $(s.getWidthFrom).width();
        }
      } else if (s.widthFromWrapper) {
        newWidth = s.stickyWrapper.width();
      }

      if (newWidth != null) {
        s.stickyElement.css('width', newWidth);
      }
    }
  },
      methods = {
    init: function init(options) {
      return this.each(function () {
        var o = $.extend({}, defaults, options);
        var stickyElement = $(this);
        var stickyId = stickyElement.attr('id');
        var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
        var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);
        stickyElement.wrapAll(function () {
          if ($(this).parent("#" + wrapperId).length == 0) {
            return wrapper;
          }
        });
        var stickyWrapper = stickyElement.parent();

        if (o.center) {
          stickyWrapper.css({
            width: stickyElement.outerWidth(),
            marginLeft: "auto",
            marginRight: "auto"
          });
        }

        if (stickyElement.css("float") === "right") {
          stickyElement.css({
            "float": "none"
          }).parent().css({
            "float": "right"
          });
        }

        o.stickyElement = stickyElement;
        o.stickyWrapper = stickyWrapper;
        o.currentTop = null;
        sticked.push(o);
        methods.setWrapperHeight(this);
        methods.setupChangeListeners(this);
      });
    },
    setWrapperHeight: function setWrapperHeight(stickyElement) {
      var element = $(stickyElement);
      var stickyWrapper = element.parent();

      if (stickyWrapper) {
        stickyWrapper.css('height', element.outerHeight());
      }
    },
    setupChangeListeners: function setupChangeListeners(stickyElement) {
      if (window.MutationObserver) {
        var mutationObserver = new window.MutationObserver(function (mutations) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            methods.setWrapperHeight(stickyElement);
          }
        });
        mutationObserver.observe(stickyElement, {
          subtree: true,
          childList: true
        });
      } else {
        if (window.addEventListener) {
          stickyElement.addEventListener('DOMNodeInserted', function () {
            methods.setWrapperHeight(stickyElement);
          }, false);
          stickyElement.addEventListener('DOMNodeRemoved', function () {
            methods.setWrapperHeight(stickyElement);
          }, false);
        } else if (window.attachEvent) {
          stickyElement.attachEvent('onDOMNodeInserted', function () {
            methods.setWrapperHeight(stickyElement);
          });
          stickyElement.attachEvent('onDOMNodeRemoved', function () {
            methods.setWrapperHeight(stickyElement);
          });
        }
      }
    },
    update: scroller,
    unstick: function unstick(options) {
      return this.each(function () {
        var that = this;
        var unstickyElement = $(that);
        var removeIdx = -1;
        var i = sticked.length;

        while (i-- > 0) {
          if (sticked[i].stickyElement.get(0) === that) {
            splice.call(sticked, i, 1);
            removeIdx = i;
          }
        }

        if (removeIdx !== -1) {
          unstickyElement.unwrap();
          unstickyElement.css({
            'width': '',
            'position': '',
            'top': '',
            'float': '',
            'z-index': ''
          });
        }
      });
    }
  }; // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):


  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.unstick.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $(function () {
    setTimeout(scroller, 0);
  });
});

/***/ }),

/***/ "./resources/js/js/jquery.validate.min.js":
/*!************************************************!*\
  !*** ./resources/js/js/jquery.validate.min.js ***!
  \************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function (t) {
  t.extend(t.fn, {
    validate: function validate(e) {
      if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
      var i = t.data(this[0], "validator");
      return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
        i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0);
      }), this.submit(function (e) {
        function s() {
          var s;
          return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0;
        }

        return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1);
      })), i);
    },
    valid: function valid() {
      if (t(this[0]).is("form")) return this.validate().form();
      var e = !0,
          i = t(this[0].form).validate();
      return this.each(function () {
        e = e && i.element(this);
      }), e;
    },
    removeAttrs: function removeAttrs(e) {
      var i = {},
          s = this;
      return t.each(e.split(/\s/), function (t, e) {
        i[e] = s.attr(e), s.removeAttr(e);
      }), i;
    },
    rules: function rules(e, i) {
      var s = this[0];

      if (e) {
        var r = t.data(s.form, "validator").settings,
            n = r.rules,
            a = t.validator.staticRules(s);

        switch (e) {
          case "add":
            t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
            break;

          case "remove":
            if (!i) return delete n[s.name], a;
            var u = {};
            return t.each(i.split(/\s/), function (t, e) {
              u[e] = a[e], delete a[e];
            }), u;
        }
      }

      var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);

      if (o.required) {
        var l = o.required;
        delete o.required, o = t.extend({
          required: l
        }, o);
      }

      return o;
    }
  }), t.extend(t.expr[":"], {
    blank: function blank(e) {
      return !t.trim("" + t(e).val());
    },
    filled: function filled(e) {
      return !!t.trim("" + t(e).val());
    },
    unchecked: function unchecked(e) {
      return !t(e).prop("checked");
    }
  }), t.validator = function (e, i) {
    this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init();
  }, t.validator.format = function (e, i) {
    return 1 === arguments.length ? function () {
      var i = t.makeArray(arguments);
      return i.unshift(e), t.validator.format.apply(this, i);
    } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
      e = e.replace(RegExp("\\{" + t + "\\}", "g"), function () {
        return i;
      });
    }), e);
  }, t.extend(t.validator, {
    defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: "error",
      validClass: "valid",
      errorElement: "label",
      focusInvalid: !0,
      errorContainer: t([]),
      errorLabelContainer: t([]),
      onsubmit: !0,
      ignore: ":hidden",
      ignoreTitle: !1,
      onfocusin: function onfocusin(t) {
        this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide());
      },
      onfocusout: function onfocusout(t) {
        this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t);
      },
      onkeyup: function onkeyup(t, e) {
        (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t);
      },
      onclick: function onclick(t) {
        t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode);
      },
      highlight: function highlight(e, i, s) {
        "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s);
      },
      unhighlight: function unhighlight(e, i, s) {
        "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s);
      }
    },
    setDefaults: function setDefaults(e) {
      t.extend(t.validator.defaults, e);
    },
    messages: {
      required: "This field is required.",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      maxlength: t.validator.format("Please enter no more than {0} characters."),
      minlength: t.validator.format("Please enter at least {0} characters."),
      rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
      range: t.validator.format("Please enter a value between {0} and {1}."),
      max: t.validator.format("Please enter a value less than or equal to {0}."),
      min: t.validator.format("Please enter a value greater than or equal to {0}.")
    },
    autoCreateRanges: !1,
    prototype: {
      init: function init() {
        function e(e) {
          var i = t.data(this[0].form, "validator"),
              s = "on" + e.type.replace(/^validate/, "");
          i.settings[s] && i.settings[s].call(i, this[0], e);
        }

        this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
        var i = this.groups = {};
        t.each(this.settings.groups, function (e, s) {
          "string" == typeof s && (s = s.split(/\s/)), t.each(s, function (t, s) {
            i[s] = e;
          });
        });
        var s = this.settings.rules;
        t.each(s, function (e, i) {
          s[e] = t.validator.normalizeRule(i);
        }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
      },
      form: function form() {
        return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
      },
      checkForm: function checkForm() {
        this.prepareForm();

        for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) {
          this.check(e[t]);
        }

        return this.valid();
      },
      element: function element(e) {
        e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
        var i = this.check(e) !== !1;
        return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i;
      },
      showErrors: function showErrors(e) {
        if (e) {
          t.extend(this.errorMap, e), this.errorList = [];

          for (var i in e) {
            this.errorList.push({
              message: e[i],
              element: this.findByName(i)[0]
            });
          }

          this.successList = t.grep(this.successList, function (t) {
            return !(t.name in e);
          });
        }

        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
      },
      resetForm: function resetForm() {
        t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
      },
      numberOfInvalids: function numberOfInvalids() {
        return this.objectLength(this.invalid);
      },
      objectLength: function objectLength(t) {
        var e = 0;

        for (var i in t) {
          e++;
        }

        return e;
      },
      hideErrors: function hideErrors() {
        this.addWrapper(this.toHide).hide();
      },
      valid: function valid() {
        return 0 === this.size();
      },
      size: function size() {
        return this.errorList.length;
      },
      focusInvalid: function focusInvalid() {
        if (this.settings.focusInvalid) try {
          t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
        } catch (e) {}
      },
      findLastActive: function findLastActive() {
        var e = this.lastActive;
        return e && 1 === t.grep(this.errorList, function (t) {
          return t.element.name === e.name;
        }).length && e;
      },
      elements: function elements() {
        var e = this,
            i = {};
        return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
          return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0);
        });
      },
      clean: function clean(e) {
        return t(e)[0];
      },
      errors: function errors() {
        var e = this.settings.errorClass.replace(" ", ".");
        return t(this.settings.errorElement + "." + e, this.errorContext);
      },
      reset: function reset() {
        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([]);
      },
      prepareForm: function prepareForm() {
        this.reset(), this.toHide = this.errors().add(this.containers);
      },
      prepareElement: function prepareElement(t) {
        this.reset(), this.toHide = this.errorsFor(t);
      },
      elementValue: function elementValue(e) {
        var i = t(e).attr("type"),
            s = t(e).val();
        return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s;
      },
      check: function check(e) {
        e = this.validationTargetFor(this.clean(e));
        var i,
            s = t(e).rules(),
            r = !1,
            n = this.elementValue(e);

        for (var a in s) {
          var u = {
            method: a,
            parameters: s[a]
          };

          try {
            if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
              r = !0;
              continue;
            }

            if (r = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
            if (!i) return this.formatAndAdd(e, u), !1;
          } catch (o) {
            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o;
          }
        }

        return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0);
      },
      customDataMessage: function customDataMessage(e, i) {
        return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase());
      },
      customMessage: function customMessage(t, e) {
        var i = this.settings.messages[t];
        return i && (i.constructor === String ? i : i[e]);
      },
      findDefined: function findDefined() {
        for (var t = 0; arguments.length > t; t++) {
          if (void 0 !== arguments[t]) return arguments[t];
        }

        return void 0;
      },
      defaultMessage: function defaultMessage(e, i) {
        return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>");
      },
      formatAndAdd: function formatAndAdd(e, i) {
        var s = this.defaultMessage(e, i.method),
            r = /\$?\{(\d+)\}/g;
        "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
          message: s,
          element: e
        }), this.errorMap[e.name] = s, this.submitted[e.name] = s;
      },
      addWrapper: function addWrapper(t) {
        return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t;
      },
      defaultShowErrors: function defaultShowErrors() {
        var t, e;

        for (t = 0; this.errorList[t]; t++) {
          var i = this.errorList[t];
          this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
        }

        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (t = 0; this.successList[t]; t++) {
          this.showLabel(this.successList[t]);
        }
        if (this.settings.unhighlight) for (t = 0, e = this.validElements(); e[t]; t++) {
          this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
        }
        this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
      },
      validElements: function validElements() {
        return this.currentElements.not(this.invalidElements());
      },
      invalidElements: function invalidElements() {
        return t(this.errorList).map(function () {
          return this.element;
        });
      },
      showLabel: function showLabel(e, i) {
        var s = this.errorsFor(e);
        s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s);
      },
      errorsFor: function errorsFor(e) {
        var i = this.idOrName(e);
        return this.errors().filter(function () {
          return t(this).attr("for") === i;
        });
      },
      idOrName: function idOrName(t) {
        return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name);
      },
      validationTargetFor: function validationTargetFor(t) {
        return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t;
      },
      checkable: function checkable(t) {
        return /radio|checkbox/i.test(t.type);
      },
      findByName: function findByName(e) {
        return t(this.currentForm).find("[name='" + e + "']");
      },
      getLength: function getLength(e, i) {
        switch (i.nodeName.toLowerCase()) {
          case "select":
            return t("option:selected", i).length;

          case "input":
            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length;
        }

        return e.length;
      },
      depend: function depend(t, e) {
        return this.dependTypes[_typeof(t)] ? this.dependTypes[_typeof(t)](t, e) : !0;
      },
      dependTypes: {
        "boolean": function boolean(t) {
          return t;
        },
        string: function string(e, i) {
          return !!t(e, i.form).length;
        },
        "function": function _function(t, e) {
          return t(e);
        }
      },
      optional: function optional(e) {
        var i = this.elementValue(e);
        return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch";
      },
      startRequest: function startRequest(t) {
        this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0);
      },
      stopRequest: function stopRequest(e, i) {
        this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
      },
      previousValue: function previousValue(e) {
        return t.data(e, "previousValue") || t.data(e, "previousValue", {
          old: null,
          valid: !0,
          message: this.defaultMessage(e, "remote")
        });
      }
    },
    classRuleSettings: {
      required: {
        required: !0
      },
      email: {
        email: !0
      },
      url: {
        url: !0
      },
      date: {
        date: !0
      },
      dateISO: {
        dateISO: !0
      },
      number: {
        number: !0
      },
      digits: {
        digits: !0
      },
      creditcard: {
        creditcard: !0
      }
    },
    addClassRules: function addClassRules(e, i) {
      e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e);
    },
    classRules: function classRules(e) {
      var i = {},
          s = t(e).attr("class");
      return s && t.each(s.split(" "), function () {
        this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this]);
      }), i;
    },
    attributeRules: function attributeRules(e) {
      var i = {},
          s = t(e),
          r = s[0].getAttribute("type");

      for (var n in t.validator.methods) {
        var a;
        "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0);
      }

      return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i;
    },
    dataRules: function dataRules(e) {
      var i,
          s,
          r = {},
          n = t(e);

      for (i in t.validator.methods) {
        s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
      }

      return r;
    },
    staticRules: function staticRules(e) {
      var i = {},
          s = t.data(e.form, "validator");
      return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i;
    },
    normalizeRules: function normalizeRules(e, i) {
      return t.each(e, function (s, r) {
        if (r === !1) return delete e[s], void 0;

        if (r.param || r.depends) {
          var n = !0;

          switch (_typeof(r.depends)) {
            case "string":
              n = !!t(r.depends, i.form).length;
              break;

            case "function":
              n = r.depends.call(i, i);
          }

          n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s];
        }
      }), t.each(e, function (s, r) {
        e[s] = t.isFunction(r) ? r(i) : r;
      }), t.each(["minlength", "maxlength"], function () {
        e[this] && (e[this] = Number(e[this]));
      }), t.each(["rangelength", "range"], function () {
        var i;
        e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]));
      }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e;
    },
    normalizeRule: function normalizeRule(e) {
      if ("string" == typeof e) {
        var i = {};
        t.each(e.split(/\s/), function () {
          i[this] = !0;
        }), e = i;
      }

      return e;
    },
    addMethod: function addMethod(e, i, s) {
      t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e));
    },
    methods: {
      required: function required(e, i, s) {
        if (!this.depend(s, i)) return "dependency-mismatch";

        if ("select" === i.nodeName.toLowerCase()) {
          var r = t(i).val();
          return r && r.length > 0;
        }

        return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0;
      },
      email: function email(t, e) {
        return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
      },
      url: function url(t, e) {
        return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t);
      },
      date: function date(t, e) {
        return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t));
      },
      dateISO: function dateISO(t, e) {
        return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
      },
      number: function number(t, e) {
        return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
      },
      digits: function digits(t, e) {
        return this.optional(e) || /^\d+$/.test(t);
      },
      creditcard: function creditcard(t, e) {
        if (this.optional(e)) return "dependency-mismatch";
        if (/[^0-9 \-]+/.test(t)) return !1;
        var i = 0,
            s = 0,
            r = !1;
        t = t.replace(/\D/g, "");

        for (var n = t.length - 1; n >= 0; n--) {
          var a = t.charAt(n);
          s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r;
        }

        return 0 === i % 10;
      },
      minlength: function minlength(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || r >= s;
      },
      maxlength: function maxlength(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || s >= r;
      },
      rangelength: function rangelength(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || r >= s[0] && s[1] >= r;
      },
      min: function min(t, e, i) {
        return this.optional(e) || t >= i;
      },
      max: function max(t, e, i) {
        return this.optional(e) || i >= t;
      },
      range: function range(t, e, i) {
        return this.optional(e) || t >= i[0] && i[1] >= t;
      },
      equalTo: function equalTo(e, i, s) {
        var r = t(s);
        return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
          t(i).valid();
        }), e === r.val();
      },
      remote: function remote(e, i, s) {
        if (this.optional(i)) return "dependency-mismatch";
        var r = this.previousValue(i);
        if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {
          url: s
        } || s, r.old === e) return r.valid;
        r.old = e;
        var n = this;
        this.startRequest(i);
        var a = {};
        return a[i.name] = e, t.ajax(t.extend(!0, {
          url: s,
          mode: "abort",
          port: "validate" + i.name,
          dataType: "json",
          data: a,
          success: function success(s) {
            n.settings.messages[i.name].remote = r.originalMessage;
            var a = s === !0 || "true" === s;

            if (a) {
              var u = n.formSubmitted;
              n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors();
            } else {
              var o = {},
                  l = s || n.defaultMessage(i, "remote");
              o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o);
            }

            r.valid = a, n.stopRequest(i, a);
          }
        }, s)), "pending";
      }
    }
  }), t.format = t.validator.format;
})(jQuery), function (t) {
  var e = {};
  if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, i, s) {
    var r = t.port;
    "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s);
  });else {
    var i = t.ajax;

    t.ajax = function (s) {
      var r = ("mode" in s ? s : t.ajaxSettings).mode,
          n = ("port" in s ? s : t.ajaxSettings).port;
      return "abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments);
    };
  }
}(jQuery), function (t) {
  t.extend(t.fn, {
    validateDelegate: function validateDelegate(e, i, s) {
      return this.bind(i, function (i) {
        var r = t(i.target);
        return r.is(e) ? s.apply(r, arguments) : void 0;
      });
    }
  });
}(jQuery);

/***/ }),

/***/ "./resources/js/js/mail-script.js":
/*!****************************************!*\
  !*** ./resources/js/js/mail-script.js ***!
  \****************************************/
/***/ (() => {

// -------   Mail Send ajax
$(document).ready(function () {
  var form = $('#myForm'); // contact form

  var submit = $('.submit-btn'); // submit button

  var alert = $('.alert-msg'); // alert div for show alert message
  // form submit event

  form.on('submit', function (e) {
    e.preventDefault(); // prevent default form submit

    $.ajax({
      url: 'mail.php',
      // form action url
      type: 'POST',
      // form submit method get/post
      dataType: 'html',
      // request type html/json/xml
      data: form.serialize(),
      // serialize form data
      beforeSend: function beforeSend() {
        alert.fadeOut();
        submit.html('Sending....'); // change submit button text
      },
      success: function success(data) {
        alert.html(data).fadeIn(); // fade in response data

        form.trigger('reset'); // reset form

        submit.attr("style", "display: none !important");
        ; // reset submit button text
      },
      error: function error(e) {
        console.log(e);
      }
    });
  });
});

/***/ }),

/***/ "./resources/js/js/main.js":
/*!*********************************!*\
  !*** ./resources/js/js/main.js ***!
  \*********************************/
/***/ (() => {

(function ($) {
  "use strict";
  /* 1. Proloder */

  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
  });
  /* 2. slick Nav */
  // mobile_menu

  var menu = $('ul#navigation');

  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: '+',
      openedSymbol: '-'
    });
  }

  ;
  /* 3. MainSlider-1 */

  function mainSlider() {
    var BasicSlider = $('.slider-active');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: false,
      fade: true,
      arrows: false,
      prevArrow: '<button type="button" class="slick-prev"><i class="ti-shift-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="ti-shift-right"></i></button>',
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }, {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }]
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }

  mainSlider();
  /* 4. Testimonial Active*/

  var testimonial = $('.h1-testimonial-active');

  if (testimonial.length) {
    testimonial.slick({
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      arrows: false,
      prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrow: false
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }]
    });
  }
  /* 5. Gallery Active */


  var client_list = $('.completed-active');

  if (client_list.length) {
    client_list.owlCarousel({
      slidesToShow: 2,
      slidesToScroll: 1,
      loop: true,
      autoplay: true,
      speed: 3000,
      smartSpeed: 2000,
      nav: false,
      dots: false,
      margin: 15,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 2
        },
        1200: {
          items: 3
        }
      }
    });
  }
  /* 6. Nice Selectorp  */


  var nice_Select = $('select');

  if (nice_Select.length) {
    nice_Select.niceSelect();
  }
  /* 7.  Custom Sticky Menu  */


  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();

    if (scroll < 245) {
      $(".header-sticky").removeClass("sticky-bar");
    } else {
      $(".header-sticky").addClass("sticky-bar");
    }
  });
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();

    if (scroll < 245) {
      $(".header-sticky").removeClass("sticky");
    } else {
      $(".header-sticky").addClass("sticky");
    }
  });
  /* 8. sildeBar scroll */

  $.scrollUp({
    scrollName: 'scrollUp',
    // Element ID
    topDistance: '300',
    // Distance from top before showing element (px)
    topSpeed: 300,
    // Speed back to top (ms)
    animation: 'fade',
    // Fade, slide, none
    animationInSpeed: 200,
    // Animation in speed (ms)
    animationOutSpeed: 200,
    // Animation out speed (ms)
    scrollText: '<i class="ti-arrow-up"></i>',
    // Text for element
    activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'

  });
  /* 9. data-background */

  $("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
  });
  /* 10. WOW active */

  new WOW().init();
  /* 11. Datepicker */
  // 11. ---- Mailchimp js --------//  

  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }

  mailChimp(); // 12 Pop Up Img

  var popUp = $('.single_gallery_part, .img-pop-up');

  if (popUp.length) {
    popUp.magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }
})(jQuery);

/***/ }),

/***/ "./resources/js/js/one-page-nav-min.js":
/*!*********************************************!*\
  !*** ./resources/js/js/one-page-nav-min.js ***!
  \*********************************************/
/***/ (() => {

/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function (t, i, n, s) {
  var e = function e(s, _e) {
    this.elem = s, this.$elem = t(s), this.options = _e, this.metadata = this.$elem.data("plugin-options"), this.$win = t(i), this.sections = {}, this.didScroll = !1, this.$doc = t(n), this.docHeight = this.$doc.height();
  };

  e.prototype = {
    defaults: {
      navItems: "a",
      currentClass: "current",
      changeHash: !1,
      easing: "swing",
      filter: "",
      scrollSpeed: 750,
      scrollThreshold: .5,
      begin: !1,
      end: !1,
      scrollChange: !1
    },
    init: function init() {
      return this.config = t.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)), this;
    },
    adjustNav: function adjustNav(t, i) {
      t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), i.addClass(t.config.currentClass);
    },
    bindInterval: function bindInterval() {
      var t,
          i = this;
      i.$win.on("scroll.onePageNav", function () {
        i.didScroll = !0;
      }), i.t = setInterval(function () {
        t = i.$doc.height(), i.didScroll && (i.didScroll = !1, i.scrollChange()), t !== i.docHeight && (i.docHeight = t, i.getPositions());
      }, 250);
    },
    getHash: function getHash(t) {
      return t.attr("href").split("#")[1];
    },
    getPositions: function getPositions() {
      var i,
          n,
          s,
          e = this;
      e.$nav.each(function () {
        i = e.getHash(t(this)), s = t("#" + i), s.length && (n = s.offset().top, e.sections[i] = Math.round(n));
      });
    },
    getSection: function getSection(t) {
      var i = null,
          n = Math.round(this.$win.height() * this.config.scrollThreshold);

      for (var s in this.sections) {
        this.sections[s] - n < t && (i = s);
      }

      return i;
    },
    handleClick: function handleClick(n) {
      var s = this,
          e = t(n.currentTarget),
          o = e.parent(),
          a = "#" + s.getHash(e);
      o.hasClass(s.config.currentClass) || (s.config.begin && s.config.begin(), s.adjustNav(s, o), s.unbindInterval(), s.scrollTo(a, function () {
        s.config.changeHash && (i.location.hash = a), s.bindInterval(), s.config.end && s.config.end();
      })), n.preventDefault();
    },
    scrollChange: function scrollChange() {
      var t,
          i = this.$win.scrollTop(),
          n = this.getSection(i);
      null !== n && (t = this.$elem.find('a[href$="#' + n + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)));
    },
    scrollTo: function scrollTo(i, n) {
      var s = t(i).offset().top;
      t("html, body").animate({
        scrollTop: s - this.config.scrollOffset
      }, this.config.scrollSpeed, this.config.easing, n);
    },
    unbindInterval: function unbindInterval() {
      clearInterval(this.t), this.$win.unbind("scroll.onePageNav");
    }
  }, e.defaults = e.prototype.defaults, t.fn.onePageNav = function (t) {
    return this.each(function () {
      new e(this, t).init();
    });
  };
}(jQuery, window, document);

/***/ }),

/***/ "./resources/js/js/owl.carousel.min.js":
/*!*********************************************!*\
  !*** ./resources/js/js/owl.carousel.min.js ***!
  \*********************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function (a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
      this._handlers[c] = a.proxy(this[c], this);
    }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
      this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
    }, this)), a.each(e.Workers, a.proxy(function (b, c) {
      this._pipe.push({
        filter: c.filter,
        run: a.proxy(c.run, this)
      });
    }, this)), this.setup(), this.initialize();
  }

  e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, e.Type = {
    Event: "event",
    State: "state"
  }, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function run() {
      this._width = this.$element.width();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      a.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: ["items", "settings"],
    run: function run() {
      this.$stage.children(".cloned").remove();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = this.settings.margin || "",
          c = !this.settings.autoWidth,
          d = this.settings.rtl,
          e = {
        width: "auto",
        "margin-left": d ? b : "",
        "margin-right": d ? "" : b
      };
      !c && this.$stage.children().css(e), a.css = e;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
          c = null,
          d = this._items.length,
          e = !this.settings.autoWidth,
          f = [];

      for (a.items = {
        merge: !1,
        width: b
      }; d--;) {
        c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
      }

      this._widths = f;
    }
  }, {
    filter: ["items", "settings"],
    run: function run() {
      var b = [],
          c = this._items,
          d = this.settings,
          e = Math.max(2 * d.items, 4),
          f = 2 * Math.ceil(c.length / 2),
          g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
          h = "",
          i = "";

      for (g /= 2; g--;) {
        b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
      }

      this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run() {
      for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) {
        d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
      }

      this._coordinates = f;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run() {
      var a = this.settings.stagePadding,
          b = this._coordinates,
          c = {
        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
        "padding-left": a || "",
        "padding-right": a || ""
      };
      this.$stage.css(c);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = this._coordinates.length,
          c = !this.settings.autoWidth,
          d = this.$stage.children();
      if (c && a.items.merge) for (; b--;) {
        a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
      } else c && (a.css.width = a.items.width, d.css(a.css));
    }
  }, {
    filter: ["items"],
    run: function run() {
      this._coordinates.length < 1 && this.$stage.removeAttr("style");
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current);
    }
  }, {
    filter: ["position"],
    run: function run() {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function run() {
      var a,
          b,
          c,
          d,
          e = this.settings.rtl ? 1 : -1,
          f = 2 * this.settings.stagePadding,
          g = this.coordinates(this.current()) + f,
          h = g + this.width() * e,
          i = [];

      for (c = 0, d = this._coordinates.length; c < d; c++) {
        a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
      }

      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"));
    }
  }], e.prototype.initialize = function () {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
      var b, c, e;
      b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b);
    }

    this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
  }, e.prototype.setup = function () {
    var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
    c ? (a.each(c, function (a) {
      a <= b && a > d && (d = Number(a));
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: e
      }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    });
  }, e.prototype.optionsLogic = function () {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
  }, e.prototype.prepare = function (b) {
    var c = this.trigger("prepare", {
      content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
    }), c.data;
  }, e.prototype.update = function () {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
      return this[a];
    }, this._invalidated), e = {}; b < c;) {
      (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
    }

    this._invalidated = {}, !this.is("valid") && this.enter("valid");
  }, e.prototype.width = function (a) {
    switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;

      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
    }
  }, e.prototype.refresh = function () {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed");
  }, e.prototype.onThrottledResize = function () {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  }, e.prototype.onResize = function () {
    return !!this._items.length && this._width !== this.$element.width() && !!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")));
  }, e.prototype.registerEventHandlers = function () {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
      return !1;
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)));
  }, e.prototype.onDragStart = function (b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
      x: d[16 === d.length ? 12 : 4],
      y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
      x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
      y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b));
      a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
    }, this)));
  }, e.prototype.onDragMove = function (a) {
    var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x));
  }, e.prototype.onDragEnd = function (b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
      return !1;
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
  }, e.prototype.closest = function (b, c) {
    var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
    return this.settings.freeDrag || a.each(g, a.proxy(function (a, h) {
      return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1;
    }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d;
  }, e.prototype.animate = function (b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s"
    }) : c ? this.$stage.animate({
      left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: b + "px"
    });
  }, e.prototype.is = function (a) {
    return this._states.current[a] && this._states.current[a] > 0;
  }, e.prototype.current = function (a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;

    if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
        property: {
          name: "position",
          value: a
        }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      });
    }

    return this._current;
  }, e.prototype.invalidate = function (b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
      return b;
    });
  }, e.prototype.reset = function (a) {
    a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
  }, e.prototype.normalize = function (a, b) {
    var c = this._items.length,
        e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a;
  }, e.prototype.relative = function (a) {
    return a -= this._clones.length / 2, this.normalize(a, !0);
  }, e.prototype.maximum = function (a) {
    var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;else if (e.autoWidth || e.merge) {
      for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d));) {
        ;
      }

      f = b + 1;
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0);
  }, e.prototype.minimum = function (a) {
    return a ? 0 : this._clones.length / 2;
  }, e.prototype.items = function (a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
  }, e.prototype.mergers = function (a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
  }, e.prototype.clones = function (b) {
    var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function f(a) {
      return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
    };

    return b === d ? a.map(this._clones, function (a, b) {
      return f(b);
    }) : a.map(this._clones, function (a, c) {
      return a === b ? f(c) : null;
    });
  }, e.prototype.speed = function (a) {
    return a !== d && (this._speed = a), this._speed;
  }, e.prototype.coordinates = function (b) {
    var c,
        e = 1,
        f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
      return this.coordinates(b);
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c));
  }, e.prototype.duration = function (a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
  }, e.prototype.to = function (a, b) {
    var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update();
  }, e.prototype.next = function (a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a);
  }, e.prototype.prev = function (a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a);
  }, e.prototype.onTransitionEnd = function (a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated");
  }, e.prototype.viewport = function () {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d;
  }, e.prototype.replace = function (b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
      return 1 === this.nodeType;
    }).each(a.proxy(function (a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items");
  }, e.prototype.add = function (b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
      content: b,
      position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
      content: b,
      position: c
    });
  }, e.prototype.remove = function (a) {
    a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
    }));
  }, e.prototype.preloadAutoWidthImages = function (b) {
    b.each(a.proxy(function (b, c) {
      this.enter("pre-loading"), c = a(c), a(new Image()).one("load", a.proxy(function (a) {
        c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
      }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"));
    }, this));
  }, e.prototype.destroy = function () {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));

    for (var d in this._plugins) {
      this._plugins[d].destroy();
    }

    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
  }, e.prototype.op = function (a, b, c) {
    var d = this.settings.rtl;

    switch (b) {
      case "<":
        return d ? a > c : a < c;

      case ">":
        return d ? a < c : a > c;

      case ">=":
        return d ? a <= c : a >= c;

      case "<=":
        return d ? a >= c : a <= c;
    }
  }, e.prototype.on = function (a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
  }, e.prototype.off = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
  }, e.prototype.trigger = function (b, c, d, f, g) {
    var h = {
      item: {
        count: this._items.length,
        index: this.current()
      }
    },
        i = a.camelCase(a.grep(["on", b, d], function (a) {
      return a;
    }).join("-").toLowerCase()),
        j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
      relatedTarget: this
    }, h, c));
    return this._supress[b] || (a.each(this._plugins, function (a, b) {
      b.onTrigger && b.onTrigger(j);
    }), this.register({
      type: e.Type.Event,
      name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j;
  }, e.prototype.enter = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++;
    }, this));
  }, e.prototype.leave = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b]--;
    }, this));
  }, e.prototype.register = function (b) {
    if (b.type === e.Type.Event) {
      if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
        var c = a.event.special[b.name]._default;
        a.event.special[b.name]._default = function (a) {
          return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments);
        }, a.event.special[b.name].owl = !0;
      }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
      return a.inArray(c, this._states.tags[b.name]) === d;
    }, this)));
  }, e.prototype.suppress = function (b) {
    a.each(b, a.proxy(function (a, b) {
      this._supress[b] = !0;
    }, this));
  }, e.prototype.release = function (b) {
    a.each(b, a.proxy(function (a, b) {
      delete this._supress[b];
    }, this));
  }, e.prototype.pointer = function (a) {
    var c = {
      x: null,
      y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c;
  }, e.prototype.isNumeric = function (a) {
    return !isNaN(parseFloat(a));
  }, e.prototype.difference = function (a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }, a.fn.owlCarousel = function (b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var d = a(this),
          f = d.data("owl.carousel");
      f || (f = new e(this, "object" == _typeof(b) && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
        f.register({
          type: e.Type.Event,
          name: c
        }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
          a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]));
        }, f));
      })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
    });
  }, a.fn.owlCarousel.Constructor = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoRefresh && this.watch();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, e.prototype.watch = function () {
    this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
  }, e.prototype.refresh = function () {
    this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
  }, e.prototype.destroy = function () {
    var a, c;
    b.clearInterval(this._interval);

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (c in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[c] && (this[c] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function (a, b) {
          this.load(b);
        }, this); f++ < e;) {
          this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++;
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    lazyLoad: !1
  }, e.prototype.load = function (c) {
    var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");

    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
      var e,
          f = a(d),
          g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
      this._core.trigger("load", {
        element: f,
        url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
        f.css("opacity", 1), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this)).attr("src", g) : (e = new Image(), e.onload = a.proxy(function () {
        f.css({
          "background-image": 'url("' + g + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this), e.src = g);
    }, this)), this._loaded.push(d.get(0)));
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) {
      this._core.$element.off(a, this.handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && this.update();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update();
      }, this),
      "loaded.owl.lazy": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, e.prototype.update = function () {
    var b = this._core._current,
        c = b + this._core.settings.items,
        d = this._core.$stage.children().toArray().slice(b, c),
        e = [],
        f = 0;

    a.each(d, function (b, c) {
      e.push(a(c).height());
    }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass);
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        });
      }, this),
      "resize.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault();
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" === a.property.name && this._playing && this.stop();
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
      this.play(a);
    }, this));
  };

  e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, e.prototype.fetch = function (a, b) {
    var c = function () {
      return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
    }(),
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");

    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";else if (d[3].indexOf("vimeo") > -1) c = "vimeo";else {
      if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      c = "vzaar";
    }
    d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
  }, e.prototype.thumbnail = function (b, c) {
    var d,
        e,
        f,
        g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function l(a) {
      e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e);
    };

    if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function success(a) {
        f = a[0].thumbnail_large, l(f);
      }
    }) : "vzaar" === c.type && a.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function success(a) {
        f = a.framegrab_url, l(f);
      }
    });
  }, e.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video");
  }, e.prototype.play = function (b) {
    var c,
        d = a(b.target),
        e = d.closest("." + this._core.settings.itemClass),
        f = this._videos[e.attr("data-video")],
        g = f.width || "100%",
        h = f.height || this._core.$stage.height();

    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"));
  }, e.prototype.isInFullScreen = function () {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame");
  }, e.prototype.destroy = function () {
    var a, b;

    this._core.$element.off("click.owl.video");

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
        a.namespace && (this.swapping = "translated" == a.type);
      }, this),
      "translate.owl.carousel": a.proxy(function (a) {
        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
      }, this)
    }, this.core.$element.on(this.handlers);
  };

  e.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, e.prototype.swap = function () {
    if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
      this.core.speed(0);
      var b,
          c = a.proxy(this.clear, this),
          d = this.core.$stage.children().eq(this.previous),
          e = this.core.$stage.children().eq(this.next),
          f = this.core.settings.animateIn,
          g = this.core.settings.animateOut;
      this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
        left: b + "px"
      }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f));
    }
  }, e.prototype.clear = function (b) {
    a(b.target).css({
      left: ""
    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) {
      this.core.$element.off(a, this.handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval();
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoplay && this.play();
      }, this),
      "play.owl.autoplay": a.proxy(function (a, b, c) {
        a.namespace && this.play(b, c);
      }, this),
      "stop.owl.autoplay": a.proxy(function (a) {
        a.namespace && this.stop();
      }, this),
      "mouseover.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
      }, this),
      "touchstart.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "touchend.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this.play();
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options);
  };

  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype.play = function (a, b) {
    this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval());
  }, e.prototype._getNextTimeout = function (d, e) {
    return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function () {
      this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed);
    }, this), d || this._core.settings.autoplayTimeout);
  }, e.prototype._setAutoPlayInterval = function () {
    this._timeout = this._getNextTimeout();
  }, e.prototype.stop = function () {
    this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"));
  }, e.prototype.pause = function () {
    this._core.is("rotating") && (this._paused = !0);
  }, e.prototype.destroy = function () {
    var a, b;
    this.stop();

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function e(b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function (b) {
        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
      }, this),
      "added.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop());
      }, this),
      "remove.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1);
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && this.draw();
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers);
  };

  e.Defaults = {
    nav: !1,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, e.prototype.initialize = function () {
    var b,
        c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.prev(c.navSpeed);
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.next(c.navSpeed);
    }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function (b) {
      var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(d, c.dotsSpeed);
    }, this));

    for (b in this._overrides) {
      this._core[b] = a.proxy(this[b], this);
    }
  }, e.prototype.destroy = function () {
    var a, b, c, d;

    for (a in this._handlers) {
      this.$element.off(a, this._handlers[a]);
    }

    for (b in this._controls) {
      this._controls[b].remove();
    }

    for (d in this.overides) {
      this._core[d] = this._overrides[d];
    }

    for (c in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[c] && (this[c] = null);
    }
  }, e.prototype.update = function () {
    var a,
        b,
        c,
        d = this._core.clones().length / 2,
        e = d + this._core.items().length,
        f = this._core.maximum(!0),
        g = this._core.settings,
        h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;

    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
      if (b >= h || 0 === b) {
        if (this._pages.push({
          start: Math.min(f, a - d),
          end: a - d + h - 1
        }), Math.min(f, a - d) === f) break;
        b = 0, ++c;
      }

      b += this._core.mergers(this._core.relative(a));
    }
  }, e.prototype.draw = function () {
    var b,
        c = this._core.settings,
        d = this._core.items().length <= c.items,
        e = this._core.relative(this._core.current()),
        f = c.loop || c.rewind;

    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"));
  }, e.prototype.onTrigger = function (b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    };
  }, e.prototype.current = function () {
    var b = this._core.relative(this._core.current());

    return a.grep(this._pages, a.proxy(function (a, c) {
      return a.start <= b && a.end >= b;
    }, this)).pop();
  }, e.prototype.getPosition = function (b) {
    var c,
        d,
        e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
  }, e.prototype.next = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
  }, e.prototype.prev = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
  }, e.prototype.to = function (b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c);
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function e(c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (c) {
        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content;
        }
      }, this),
      "changed.owl.carousel": a.proxy(function (c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
              e = a.map(this._hashes, function (a, b) {
            return a === d ? b : null;
          }).join();

          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e;
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
      var c = b.location.hash.substring(1),
          e = this._core.$stage.children(),
          f = this._hashes[c] && e.index(this._hashes[c]);

      f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0);
    }, this));
  };

  e.Defaults = {
    URLhashListener: !1
  }, e.prototype.destroy = function () {
    var c, d;
    a(b).off("hashchange.owl.navigation");

    for (c in this._handlers) {
      this._core.$element.off(c, this._handlers[c]);
    }

    for (d in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[d] && (this[d] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  function e(b, c) {
    var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
      if (g[b] !== d) return e = !c || b, !1;
    }), e;
  }

  function f(a) {
    return e(a, !0);
  }

  var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
    transition: {
      end: {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
      }
    },
    animation: {
      end: {
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "animationend",
        OAnimation: "oAnimationEnd",
        animation: "animationend"
      }
    }
  },
      j = {
    csstransforms: function csstransforms() {
      return !!e("transform");
    },
    csstransforms3d: function csstransforms3d() {
      return !!e("perspective");
    },
    csstransitions: function csstransitions() {
      return !!e("transition");
    },
    cssanimations: function cssanimations() {
      return !!e("animation");
    }
  };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d());
}(window.Zepto || window.jQuery, window, document);

/***/ }),

/***/ "./resources/js/js/plugins.js":
/*!************************************!*\
  !*** ./resources/js/js/plugins.js ***!
  \************************************/
/***/ (() => {

// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;

  var noop = function noop() {};

  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = window.console = window.console || {};

  while (length--) {
    method = methods[length]; // Only stub undefined methods.

    if (!console[method]) {
      console[method] = noop;
    }
  }
})(); // Place any jQuery/helper plugins in here.

/***/ }),

/***/ "./resources/js/js/popper.min.js":
/*!***************************************!*\
  !*** ./resources/js/js/popper.min.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  'object' == ( false ? 0 : _typeof(exports)) && 'undefined' != "object" ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = getComputedStyle(e, null);
    return t ? o[t] : o;
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }

  function n(e) {
    if (!e) return document.body;

    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body;

      case '#document':
        return e.body;
    }

    var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }

  function r(e) {
    var o = e && e.offsetParent,
        i = o && o.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : e ? e.ownerDocument.documentElement : document.documentElement;
  }

  function p(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e);
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = o ? e : t,
        n = o ? t : e,
        a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var l = a.commonAncestorContainer;
    if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
    var f = s(e);
    return f.host ? d(f.host, t) : d(e, s(t).host);
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
        o = 'top' === t ? 'scrollTop' : 'scrollLeft',
        i = e.nodeName;

    if ('BODY' === i || 'HTML' === i) {
      var n = e.ownerDocument.documentElement,
          r = e.ownerDocument.scrollingElement || n;
      return r[o];
    }

    return e[o];
  }

  function l(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = a(t, 'top'),
        n = a(t, 'left'),
        r = o ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
  }

  function f(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
        i = 'Left' == o ? 'Right' : 'Bottom';
    return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + i + 'Width'], 10);
  }

  function m(e, t, o, i) {
    return J(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0);
  }

  function h() {
    var e = document.body,
        t = document.documentElement,
        o = ie() && getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o)
    };
  }

  function c(e) {
    return se({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }

  function g(e) {
    var o = {};
    if (ie()) try {
      o = e.getBoundingClientRect();
      var i = a(e, 'top'),
          n = a(e, 'left');
      o.top += i, o.left += n, o.bottom += i, o.right += n;
    } catch (e) {} else o = e.getBoundingClientRect();
    var r = {
      left: o.left,
      top: o.top,
      width: o.right - o.left,
      height: o.bottom - o.top
    },
        p = 'HTML' === e.nodeName ? h() : {},
        s = p.width || e.clientWidth || r.right - r.left,
        d = p.height || e.clientHeight || r.bottom - r.top,
        l = e.offsetWidth - s,
        m = e.offsetHeight - d;

    if (l || m) {
      var g = t(e);
      l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m;
    }

    return c(r);
  }

  function u(e, o) {
    var i = ie(),
        r = 'HTML' === o.nodeName,
        p = g(e),
        s = g(o),
        d = n(e),
        a = t(o),
        f = parseFloat(a.borderTopWidth, 10),
        m = parseFloat(a.borderLeftWidth, 10),
        h = c({
      top: p.top - s.top - f,
      left: p.left - s.left - m,
      width: p.width,
      height: p.height
    });

    if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
      var u = parseFloat(a.marginTop, 10),
          b = parseFloat(a.marginLeft, 10);
      h.top -= f - u, h.bottom -= f - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b;
    }

    return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = l(h, o)), h;
  }

  function b(e) {
    var t = e.ownerDocument.documentElement,
        o = u(e, t),
        i = J(t.clientWidth, window.innerWidth || 0),
        n = J(t.clientHeight, window.innerHeight || 0),
        r = a(t),
        p = a(t, 'left'),
        s = {
      top: r - o.top + o.marginTop,
      left: p - o.left + o.marginLeft,
      width: i,
      height: n
    };
    return c(s);
  }

  function w(e) {
    var i = e.nodeName;
    return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || w(o(e));
  }

  function y(e, t, i, r) {
    var p = {
      top: 0,
      left: 0
    },
        s = d(e, t);
    if ('viewport' === r) p = b(s);else {
      var a;
      'scrollParent' === r ? (a = n(o(t)), 'BODY' === a.nodeName && (a = e.ownerDocument.documentElement)) : 'window' === r ? a = e.ownerDocument.documentElement : a = r;
      var l = u(a, s);

      if ('HTML' === a.nodeName && !w(s)) {
        var f = h(),
            m = f.height,
            c = f.width;
        p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = c + l.left;
      } else p = l;
    }
    return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
  }

  function E(e) {
    var t = e.width,
        o = e.height;
    return t * o;
  }

  function v(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = y(o, i, r, n),
        s = {
      top: {
        width: p.width,
        height: t.top - p.top
      },
      right: {
        width: p.right - t.right,
        height: p.height
      },
      bottom: {
        width: p.width,
        height: p.bottom - t.bottom
      },
      left: {
        width: t.left - p.left,
        height: p.height
      }
    },
        d = Object.keys(s).map(function (e) {
      return se({
        key: e
      }, s[e], {
        area: E(s[e])
      });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        a = d.filter(function (e) {
      var t = e.width,
          i = e.height;
      return t >= o.clientWidth && i >= o.clientHeight;
    }),
        l = 0 < a.length ? a[0].key : d[0].key,
        f = e.split('-')[1];
    return l + (f ? '-' + f : '');
  }

  function O(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }

  function L(e) {
    var t = getComputedStyle(e),
        o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
        i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
        n = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + o
    };
    return n;
  }

  function x(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }

  function S(e, t, o) {
    o = o.split('-')[0];
    var i = L(e),
        n = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ['right', 'left'].indexOf(o),
        p = r ? 'top' : 'left',
        s = r ? 'left' : 'top',
        d = r ? 'height' : 'width',
        a = r ? 'width' : 'height';
    return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[x(s)], n;
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function D(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });
    var i = T(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }

  function C(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, D(t, 'name', i));
    return n.forEach(function (t) {
      t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var i = t['function'] || t.fn;
      t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = i(o, t));
    }), o;
  }

  function N() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = O(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = C(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function k(e, t) {
    return e.some(function (e) {
      var o = e.name,
          i = e.enabled;
      return i && o === t;
    });
  }

  function W(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      var i = t[n],
          r = i ? '' + i + o : e;
      if ('undefined' != typeof document.body.style[r]) return r;
    }

    return null;
  }

  function P() {
    return this.state.isDestroyed = !0, k(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[W('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function B(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }

  function H(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
        p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || H(n(p.parentNode), t, o, i), i.push(p);
  }

  function A(e, t, o, i) {
    o.updateBound = i, B(e).addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }

  function I() {
    this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function M(e, t) {
    return B(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }

  function R() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
  }

  function U(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = '';
      -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && U(t[o]) && (i = 'px'), e.style[o] = t[o] + i;
    });
  }

  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }

  function F(e, t, o) {
    var i = T(e, function (e) {
      var o = e.name;
      return o === t;
    }),
        n = !!i && e.some(function (e) {
      return e.name === o && e.enabled && e.order < i.order;
    });

    if (!n) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }

    return n;
  }

  function K(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }

  function q(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = ae.indexOf(e),
        i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }

  function V(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +n[1],
        p = n[2];
    if (!r) return e;

    if (0 === p.indexOf('%')) {
      var s;

      switch (p) {
        case '%p':
          s = o;
          break;

        case '%':
        case '%r':
        default:
          s = i;
      }

      var d = c(s);
      return d[t] / 100 * r;
    }

    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? J(document.documentElement.clientHeight, window.innerHeight || 0) : J(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }

    return r;
  }

  function z(e, t, o, i) {
    var n = [0, 0],
        r = -1 !== ['right', 'left'].indexOf(i),
        p = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = p.indexOf(T(p, function (e) {
      return -1 !== e.search(/,|\s/);
    }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
        a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, i) {
      var n = (1 === i ? !r : r) ? 'height' : 'width',
          p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return V(e, n, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, i) {
        U(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1));
      });
    }), n;
  }

  function G(e, t) {
    var o,
        i = t.offset,
        n = e.placement,
        r = e.offsets,
        p = r.popper,
        s = r.reference,
        d = n.split('-')[0];
    return o = U(+i) ? [+i, 0] : z(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
  }

  for (var _ = Math.min, X = Math.floor, J = Math.max, Q = 'undefined' != typeof window && 'undefined' != typeof document, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1) {
    if (Q && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  }

  var i,
      te = Q && window.Promise,
      oe = te ? function (e) {
    var t = !1;
    return function () {
      t || (t = !0, window.Promise.resolve().then(function () {
        t = !1, e();
      }));
    };
  } : function (e) {
    var t = !1;
    return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, $));
    };
  },
      ie = function ie() {
    return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i;
  },
      ne = function ne(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  },
      re = function () {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++) {
        o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, o, i) {
      return o && e(t.prototype, o), i && e(t, i), t;
    };
  }(),
      pe = function pe(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = o, e;
  },
      se = Object.assign || function (e) {
    for (var t, o = 1; o < arguments.length; o++) {
      for (var i in t = arguments[o], t) {
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
    }

    return e;
  },
      de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
      ae = de.slice(3),
      le = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  },
      fe = function () {
    function t(o, i) {
      var n = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      ne(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(n.update);
      }, this.update = oe(this.update.bind(this)), this.options = se({}, t.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = o && o.jquery ? o[0] : o, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return se({
          name: e
        }, n.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
      }), this.update();
      var p = this.options.eventsEnabled;
      p && this.enableEventListeners(), this.state.eventsEnabled = p;
    }

    return re(t, [{
      key: 'update',
      value: function value() {
        return N.call(this);
      }
    }, {
      key: 'destroy',
      value: function value() {
        return P.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function value() {
        return I.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function value() {
        return R.call(this);
      }
    }]), t;
  }();

  return fe.Utils = ('undefined' == typeof window ? __webpack_require__.g : window).PopperUtils, fe.placements = de, fe.Defaults = {
    placement: 'bottom',
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = t.split('-')[1];

          if (i) {
            var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ['bottom', 'top'].indexOf(o),
                d = s ? 'left' : 'top',
                a = s ? 'width' : 'height',
                l = {
              start: pe({}, d, r[d]),
              end: pe({}, d, r[d] + r[a] - p[a])
            };
            e.offsets.popper = se({}, p, l[i]);
          }

          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: G,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          var i = y(e.instance.popper, e.instance.reference, t.padding, o);
          t.boundaries = i;
          var n = t.priority,
              p = e.offsets.popper,
              s = {
            primary: function primary(e) {
              var o = p[e];
              return p[e] < i[e] && !t.escapeWithReference && (o = J(p[e], i[e])), pe({}, e, o);
            },
            secondary: function secondary(e) {
              var o = 'right' === e ? 'left' : 'top',
                  n = p[o];
              return p[e] > i[e] && !t.escapeWithReference && (n = _(p[o], i[e] - ('right' === e ? p.width : p.height))), pe({}, o, n);
            }
          };
          return n.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            p = se({}, p, s[t](e));
          }), e.offsets.popper = p, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split('-')[0],
              r = X,
              p = -1 !== ['top', 'bottom'].indexOf(n),
              s = p ? 'right' : 'bottom',
              d = p ? 'left' : 'top',
              a = p ? 'width' : 'height';
          return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, o) {
          var i;
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var n = o.element;

          if ('string' == typeof n) {
            if (n = e.instance.popper.querySelector(n), !n) return e;
          } else if (!e.instance.popper.contains(n)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;

          var r = e.placement.split('-')[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ['left', 'right'].indexOf(r),
              l = a ? 'height' : 'width',
              f = a ? 'Top' : 'Left',
              m = f.toLowerCase(),
              h = a ? 'left' : 'top',
              g = a ? 'bottom' : 'right',
              u = L(n)[l];
          d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)), d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]), e.offsets.popper = c(e.offsets.popper);
          var b = d[m] + d[l] / 2 - u / 2,
              w = t(e.instance.popper),
              y = parseFloat(w['margin' + f], 10),
              E = parseFloat(w['border' + f + 'Width'], 10),
              v = b - e.offsets.popper[m] - y - E;
          return v = J(_(s[l] - u, v), 0), e.arrowElement = n, e.offsets.arrow = (i = {}, pe(i, m, Math.round(v)), pe(i, h, ''), i), e;
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (k(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
              i = e.placement.split('-')[0],
              n = x(i),
              r = e.placement.split('-')[1] || '',
              p = [];

          switch (t.behavior) {
            case le.FLIP:
              p = [i, n];
              break;

            case le.CLOCKWISE:
              p = q(i);
              break;

            case le.COUNTERCLOCKWISE:
              p = q(i, !0);
              break;

            default:
              p = t.behavior;
          }

          return p.forEach(function (s, d) {
            if (i !== s || p.length === d + 1) return e;
            i = e.placement.split('-')[0], n = x(i);
            var a = e.offsets.popper,
                l = e.offsets.reference,
                f = X,
                m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom),
                h = f(a.left) < f(o.left),
                c = f(a.right) > f(o.right),
                g = f(a.top) < f(o.top),
                u = f(a.bottom) > f(o.bottom),
                b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u,
                w = -1 !== ['top', 'bottom'].indexOf(i),
                y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
            (m || b || y) && (e.flipped = !0, (m || b) && (i = p[d + 1]), y && (r = K(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = C(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport'
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ['left', 'right'].indexOf(o),
              s = -1 === ['top', 'left'].indexOf(o);
          return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = x(t), e.offsets.popper = c(n), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
            return 'preventOverflow' === e.name;
          }).boundaries;

          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }

          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
            return 'applyStyle' === e.name;
          }).gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              l = r(e.instance.popper),
              f = g(l),
              m = {
            position: n.position
          },
              h = {
            left: X(n.left),
            top: X(n.top),
            bottom: X(n.bottom),
            right: X(n.right)
          },
              c = 'bottom' === o ? 'top' : 'bottom',
              u = 'right' === i ? 'left' : 'right',
              b = W('transform');
          if (d = 'bottom' == c ? -f.height + h.bottom : h.top, s = 'right' == u ? -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';else {
            var w = 'bottom' == c ? -1 : 1,
                y = 'right' == u ? -1 : 1;
            m[c] = d * w, m[u] = s * y, m.willChange = c + ', ' + u;
          }
          var E = {
            "x-placement": e.placement
          };
          return e.attributes = se({}, E, e.attributes), e.styles = se({}, m, e.styles), e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return Y(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Y(e.arrowElement, e.arrowStyles), e;
        },
        onLoad: function onLoad(e, t, o, i, n) {
          var r = O(n, t, e),
              p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), Y(t, {
            position: 'absolute'
          }), o;
        },
        gpuAcceleration: void 0
      }
    }
  }, fe;
});

/***/ }),

/***/ "./resources/js/js/price_rangs.js":
/*!****************************************!*\
  !*** ./resources/js/js/price_rangs.js ***!
  \****************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// Ion.RangeSlider
// version 2.1.7 Build: 371
// Â© Denis Ineshin, 2017
// https://github.com/IonDen
//
// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
// GitHub page:     https://github.com/IonDen/ion.rangeSlider
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================
;

(function (factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (jQuery) {
      return factory(jQuery, document, window, navigator);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($, document, window, navigator, undefined) {
  "use strict"; // =================================================================================================================
  // Service

  var plugin_count = 0; // IE8 fix

  var is_old_ie = function () {
    var n = navigator.userAgent,
        r = /msie\s\d+/i,
        v;

    if (n.search(r) > 0) {
      v = r.exec(n).toString();
      v = v.split(" ")[1];

      if (v < 9) {
        $("html").addClass("lt-ie9");
        return true;
      }
    }

    return false;
  }();

  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      var slice = [].slice;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
          bound = function bound() {
        if (this instanceof bound) {
          var F = function F() {};

          F.prototype = target.prototype;
          var self = new F();
          var result = target.apply(self, args.concat(slice.call(arguments)));

          if (Object(result) === result) {
            return result;
          }

          return self;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };

      return bound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k;

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;

      if (len === 0) {
        return -1;
      }

      var n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      if (n >= len) {
        return -1;
      }

      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (k in O && O[k] === searchElement) {
          return k;
        }

        k++;
      }

      return -1;
    };
  } // =================================================================================================================
  // Template


  var base_html = '<span class="irs">' + '<span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span>' + '<span class="irs-min">0</span><span class="irs-max">1</span>' + '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' + '</span>' + '<span class="irs-grid"></span>' + '<span class="irs-bar"></span>';
  var single_html = '<span class="irs-bar-edge"></span>' + '<span class="irs-shadow shadow-single"></span>' + '<span class="irs-slider single"></span>';
  var double_html = '<span class="irs-shadow shadow-from"></span>' + '<span class="irs-shadow shadow-to"></span>' + '<span class="irs-slider from"></span>' + '<span class="irs-slider to"></span>';
  var disable_html = '<span class="irs-disable-mask"></span>'; // =================================================================================================================
  // Core

  /**
   * Main plugin constructor
   *
   * @param input {Object} link to base input element
   * @param options {Object} slider config
   * @param plugin_count {Number}
   * @constructor
   */

  var IonRangeSlider = function IonRangeSlider(input, options, plugin_count) {
    this.VERSION = "2.1.7";
    this.input = input;
    this.plugin_count = plugin_count;
    this.current_plugin = 0;
    this.calc_count = 0;
    this.update_tm = 0;
    this.old_from = 0;
    this.old_to = 0;
    this.old_min_interval = null;
    this.raf_id = null;
    this.dragging = false;
    this.force_redraw = false;
    this.no_diapason = false;
    this.is_key = false;
    this.is_update = false;
    this.is_start = true;
    this.is_finish = false;
    this.is_active = false;
    this.is_resize = false;
    this.is_click = false;
    options = options || {}; // cache for links to all DOM elements

    this.$cache = {
      win: $(window),
      body: $(document.body),
      input: $(input),
      cont: null,
      rs: null,
      min: null,
      max: null,
      from: null,
      to: null,
      single: null,
      bar: null,
      line: null,
      s_single: null,
      s_from: null,
      s_to: null,
      shad_single: null,
      shad_from: null,
      shad_to: null,
      edge: null,
      grid: null,
      grid_labels: []
    }; // storage for measure variables

    this.coords = {
      // left
      x_gap: 0,
      x_pointer: 0,
      // width
      w_rs: 0,
      w_rs_old: 0,
      w_handle: 0,
      // percents
      p_gap: 0,
      p_gap_left: 0,
      p_gap_right: 0,
      p_step: 0,
      p_pointer: 0,
      p_handle: 0,
      p_single_fake: 0,
      p_single_real: 0,
      p_from_fake: 0,
      p_from_real: 0,
      p_to_fake: 0,
      p_to_real: 0,
      p_bar_x: 0,
      p_bar_w: 0,
      // grid
      grid_gap: 0,
      big_num: 0,
      big: [],
      big_w: [],
      big_p: [],
      big_x: []
    }; // storage for labels measure variables

    this.labels = {
      // width
      w_min: 0,
      w_max: 0,
      w_from: 0,
      w_to: 0,
      w_single: 0,
      // percents
      p_min: 0,
      p_max: 0,
      p_from_fake: 0,
      p_from_left: 0,
      p_to_fake: 0,
      p_to_left: 0,
      p_single_fake: 0,
      p_single_left: 0
    };
    /**
     * get and validate config
     */

    var $inp = this.$cache.input,
        val = $inp.prop("value"),
        config,
        config_from_data,
        prop; // default config

    config = {
      type: "single",
      min: 10,
      max: 100,
      from: null,
      to: null,
      step: 1,
      min_interval: 0,
      max_interval: 0,
      drag_interval: false,
      values: [],
      p_values: [],
      from_fixed: false,
      from_min: null,
      from_max: null,
      from_shadow: false,
      to_fixed: false,
      to_min: null,
      to_max: null,
      to_shadow: false,
      prettify_enabled: true,
      prettify_separator: " ",
      prettify: null,
      force_edges: false,
      keyboard: false,
      keyboard_step: 5,
      grid: false,
      grid_margin: true,
      grid_num: 4,
      grid_snap: false,
      hide_min_max: false,
      hide_from_to: false,
      prefix: "",
      postfix: "",
      max_postfix: "",
      decorate_both: true,
      values_separator: " â€” ",
      input_values_separator: ";",
      disable: false,
      onStart: null,
      onChange: null,
      onFinish: null,
      onUpdate: null
    }; // check if base element is input

    if ($inp[0].nodeName !== "INPUT") {
      console && console.warn && console.warn("Base element should be <input>!", $inp[0]);
    } // config from data-attributes extends js config


    config_from_data = {
      type: $inp.data("type"),
      min: $inp.data("min"),
      max: $inp.data("max"),
      from: $inp.data("from"),
      to: $inp.data("to"),
      step: $inp.data("step"),
      min_interval: $inp.data("minInterval"),
      max_interval: $inp.data("maxInterval"),
      drag_interval: $inp.data("dragInterval"),
      values: $inp.data("values"),
      from_fixed: $inp.data("fromFixed"),
      from_min: $inp.data("fromMin"),
      from_max: $inp.data("fromMax"),
      from_shadow: $inp.data("fromShadow"),
      to_fixed: $inp.data("toFixed"),
      to_min: $inp.data("toMin"),
      to_max: $inp.data("toMax"),
      to_shadow: $inp.data("toShadow"),
      prettify_enabled: $inp.data("prettifyEnabled"),
      prettify_separator: $inp.data("prettifySeparator"),
      force_edges: $inp.data("forceEdges"),
      keyboard: $inp.data("keyboard"),
      keyboard_step: $inp.data("keyboardStep"),
      grid: $inp.data("grid"),
      grid_margin: $inp.data("gridMargin"),
      grid_num: $inp.data("gridNum"),
      grid_snap: $inp.data("gridSnap"),
      hide_min_max: $inp.data("hideMinMax"),
      hide_from_to: $inp.data("hideFromTo"),
      prefix: $inp.data("prefix"),
      postfix: $inp.data("postfix"),
      max_postfix: $inp.data("maxPostfix"),
      decorate_both: $inp.data("decorateBoth"),
      values_separator: $inp.data("valuesSeparator"),
      input_values_separator: $inp.data("inputValuesSeparator"),
      disable: $inp.data("disable")
    };
    config_from_data.values = config_from_data.values && config_from_data.values.split(",");

    for (prop in config_from_data) {
      if (config_from_data.hasOwnProperty(prop)) {
        if (config_from_data[prop] === undefined || config_from_data[prop] === "") {
          delete config_from_data[prop];
        }
      }
    } // input value extends default config


    if (val !== undefined && val !== "") {
      val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

      if (val[0] && val[0] == +val[0]) {
        val[0] = +val[0];
      }

      if (val[1] && val[1] == +val[1]) {
        val[1] = +val[1];
      }

      if (options && options.values && options.values.length) {
        config.from = val[0] && options.values.indexOf(val[0]);
        config.to = val[1] && options.values.indexOf(val[1]);
      } else {
        config.from = val[0] && +val[0];
        config.to = val[1] && +val[1];
      }
    } // js config extends default config


    $.extend(config, options); // data config extends config

    $.extend(config, config_from_data);
    this.options = config; // validate config, to be sure that all data types are correct

    this.update_check = {};
    this.validate(); // default result object, returned to callbacks

    this.result = {
      input: this.$cache.input,
      slider: null,
      min: this.options.min,
      max: this.options.max,
      from: this.options.from,
      from_percent: 0,
      from_value: null,
      to: this.options.to,
      to_percent: 0,
      to_value: null
    };
    this.init();
  };

  IonRangeSlider.prototype = {
    /**
     * Starts or updates the plugin instance
     *
     * @param [is_update] {boolean}
     */
    init: function init(is_update) {
      this.no_diapason = false;
      this.coords.p_step = this.convertToPercent(this.options.step, true);
      this.target = "base";
      this.toggleInput();
      this.append();
      this.setMinMax();

      if (is_update) {
        this.force_redraw = true;
        this.calc(true); // callbacks called

        this.callOnUpdate();
      } else {
        this.force_redraw = true;
        this.calc(true); // callbacks called

        this.callOnStart();
      }

      this.updateScene();
    },

    /**
     * Appends slider template to a DOM
     */
    append: function append() {
      var container_html = '<span class="irs js-irs-' + this.plugin_count + '"></span>';
      this.$cache.input.before(container_html);
      this.$cache.input.prop("readonly", true);
      this.$cache.cont = this.$cache.input.prev();
      this.result.slider = this.$cache.cont;
      this.$cache.cont.html(base_html);
      this.$cache.rs = this.$cache.cont.find(".irs");
      this.$cache.min = this.$cache.cont.find(".irs-min");
      this.$cache.max = this.$cache.cont.find(".irs-max");
      this.$cache.from = this.$cache.cont.find(".irs-from");
      this.$cache.to = this.$cache.cont.find(".irs-to");
      this.$cache.single = this.$cache.cont.find(".irs-single");
      this.$cache.bar = this.$cache.cont.find(".irs-bar");
      this.$cache.line = this.$cache.cont.find(".irs-line");
      this.$cache.grid = this.$cache.cont.find(".irs-grid");

      if (this.options.type === "single") {
        this.$cache.cont.append(single_html);
        this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
        this.$cache.s_single = this.$cache.cont.find(".single");
        this.$cache.from[0].style.visibility = "hidden";
        this.$cache.to[0].style.visibility = "hidden";
        this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
      } else {
        this.$cache.cont.append(double_html);
        this.$cache.s_from = this.$cache.cont.find(".from");
        this.$cache.s_to = this.$cache.cont.find(".to");
        this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
        this.$cache.shad_to = this.$cache.cont.find(".shadow-to");
        this.setTopHandler();
      }

      if (this.options.hide_from_to) {
        this.$cache.from[0].style.display = "none";
        this.$cache.to[0].style.display = "none";
        this.$cache.single[0].style.display = "none";
      }

      this.appendGrid();

      if (this.options.disable) {
        this.appendDisableMask();
        this.$cache.input[0].disabled = true;
      } else {
        this.$cache.cont.removeClass("irs-disabled");
        this.$cache.input[0].disabled = false;
        this.bindEvents();
      }

      if (this.options.drag_interval) {
        this.$cache.bar[0].style.cursor = "ew-resize";
      }
    },

    /**
     * Determine which handler has a priority
     * works only for double slider type
     */
    setTopHandler: function setTopHandler() {
      var min = this.options.min,
          max = this.options.max,
          from = this.options.from,
          to = this.options.to;

      if (from > min && to === max) {
        this.$cache.s_from.addClass("type_last");
      } else if (to < max) {
        this.$cache.s_to.addClass("type_last");
      }
    },

    /**
     * Determine which handles was clicked last
     * and which handler should have hover effect
     *
     * @param target {String}
     */
    changeLevel: function changeLevel(target) {
      switch (target) {
        case "single":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
          break;

        case "from":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
          this.$cache.s_from.addClass("state_hover");
          this.$cache.s_from.addClass("type_last");
          this.$cache.s_to.removeClass("type_last");
          break;

        case "to":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
          this.$cache.s_to.addClass("state_hover");
          this.$cache.s_to.addClass("type_last");
          this.$cache.s_from.removeClass("type_last");
          break;

        case "both":
          this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
          this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
          this.$cache.s_to.removeClass("type_last");
          this.$cache.s_from.removeClass("type_last");
          break;
      }
    },

    /**
     * Then slider is disabled
     * appends extra layer with opacity
     */
    appendDisableMask: function appendDisableMask() {
      this.$cache.cont.append(disable_html);
      this.$cache.cont.addClass("irs-disabled");
    },

    /**
     * Remove slider instance
     * and ubind all events
     */
    remove: function remove() {
      this.$cache.cont.remove();
      this.$cache.cont = null;
      this.$cache.line.off("keydown.irs_" + this.plugin_count);
      this.$cache.body.off("touchmove.irs_" + this.plugin_count);
      this.$cache.body.off("mousemove.irs_" + this.plugin_count);
      this.$cache.win.off("touchend.irs_" + this.plugin_count);
      this.$cache.win.off("mouseup.irs_" + this.plugin_count);

      if (is_old_ie) {
        this.$cache.body.off("mouseup.irs_" + this.plugin_count);
        this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
      }

      this.$cache.grid_labels = [];
      this.coords.big = [];
      this.coords.big_w = [];
      this.coords.big_p = [];
      this.coords.big_x = [];
      cancelAnimationFrame(this.raf_id);
    },

    /**
     * bind all slider events
     */
    bindEvents: function bindEvents() {
      if (this.no_diapason) {
        return;
      }

      this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
      this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
      this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
      this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
      this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

      if (this.options.drag_interval && this.options.type === "double") {
        this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
        this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
      } else {
        this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      }

      if (this.options.type === "single") {
        this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      } else {
        this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
        this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
        this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      }

      if (this.options.keyboard) {
        this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
      }

      if (is_old_ie) {
        this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
        this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
      }
    },

    /**
     * Mousemove or touchmove
     * only for handlers
     *
     * @param e {Object} event object
     */
    pointerMove: function pointerMove(e) {
      if (!this.dragging) {
        return;
      }

      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
      this.coords.x_pointer = x - this.coords.x_gap;
      this.calc();
    },

    /**
     * Mouseup or touchend
     * only for handlers
     *
     * @param e {Object} event object
     */
    pointerUp: function pointerUp(e) {
      if (this.current_plugin !== this.plugin_count) {
        return;
      }

      if (this.is_active) {
        this.is_active = false;
      } else {
        return;
      }

      this.$cache.cont.find(".state_hover").removeClass("state_hover");
      this.force_redraw = true;

      if (is_old_ie) {
        $("*").prop("unselectable", false);
      }

      this.updateScene();
      this.restoreOriginalMinInterval(); // callbacks call

      if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
        this.callOnFinish();
      }

      this.dragging = false;
    },

    /**
     * Mousedown or touchstart
     * only for handlers
     *
     * @param target {String|null}
     * @param e {Object} event object
     */
    pointerDown: function pointerDown(target, e) {
      e.preventDefault();
      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;

      if (e.button === 2) {
        return;
      }

      if (target === "both") {
        this.setTempMinInterval();
      }

      if (!target) {
        target = this.target || "from";
      }

      this.current_plugin = this.plugin_count;
      this.target = target;
      this.is_active = true;
      this.dragging = true;
      this.coords.x_gap = this.$cache.rs.offset().left;
      this.coords.x_pointer = x - this.coords.x_gap;
      this.calcPointerPercent();
      this.changeLevel(target);

      if (is_old_ie) {
        $("*").prop("unselectable", true);
      }

      this.$cache.line.trigger("focus");
      this.updateScene();
    },

    /**
     * Mousedown or touchstart
     * for other slider elements, like diapason line
     *
     * @param target {String}
     * @param e {Object} event object
     */
    pointerClick: function pointerClick(target, e) {
      e.preventDefault();
      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;

      if (e.button === 2) {
        return;
      }

      this.current_plugin = this.plugin_count;
      this.target = target;
      this.is_click = true;
      this.coords.x_gap = this.$cache.rs.offset().left;
      this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();
      this.force_redraw = true;
      this.calc();
      this.$cache.line.trigger("focus");
    },

    /**
     * Keyborard controls for focused slider
     *
     * @param target {String}
     * @param e {Object} event object
     * @returns {boolean|undefined}
     */
    key: function key(target, e) {
      if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
        return;
      }

      switch (e.which) {
        case 83: // W

        case 65: // A

        case 40: // DOWN

        case 37:
          // LEFT
          e.preventDefault();
          this.moveByKey(false);
          break;

        case 87: // S

        case 68: // D

        case 38: // UP

        case 39:
          // RIGHT
          e.preventDefault();
          this.moveByKey(true);
          break;
      }

      return true;
    },

    /**
     * Move by key. Beta
     * @todo refactor than have plenty of time
     *
     * @param right {boolean} direction to move
     */
    moveByKey: function moveByKey(right) {
      var p = this.coords.p_pointer;

      if (right) {
        p += this.options.keyboard_step;
      } else {
        p -= this.options.keyboard_step;
      }

      this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
      this.is_key = true;
      this.calc();
    },

    /**
     * Set visibility and content
     * of Min and Max labels
     */
    setMinMax: function setMinMax() {
      if (!this.options) {
        return;
      }

      if (this.options.hide_min_max) {
        this.$cache.min[0].style.display = "none";
        this.$cache.max[0].style.display = "none";
        return;
      }

      if (this.options.values.length) {
        this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
        this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
      } else {
        this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min));
        this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max));
      }

      this.labels.w_min = this.$cache.min.outerWidth(false);
      this.labels.w_max = this.$cache.max.outerWidth(false);
    },

    /**
     * Then dragging interval, prevent interval collapsing
     * using min_interval option
     */
    setTempMinInterval: function setTempMinInterval() {
      var interval = this.result.to - this.result.from;

      if (this.old_min_interval === null) {
        this.old_min_interval = this.options.min_interval;
      }

      this.options.min_interval = interval;
    },

    /**
     * Restore min_interval option to original
     */
    restoreOriginalMinInterval: function restoreOriginalMinInterval() {
      if (this.old_min_interval !== null) {
        this.options.min_interval = this.old_min_interval;
        this.old_min_interval = null;
      }
    },
    // =============================================================================================================
    // Calculations

    /**
     * All calculations and measures start here
     *
     * @param update {boolean=}
     */
    calc: function calc(update) {
      if (!this.options) {
        return;
      }

      this.calc_count++;

      if (this.calc_count === 10 || update) {
        this.calc_count = 0;
        this.coords.w_rs = this.$cache.rs.outerWidth(false);
        this.calcHandlePercent();
      }

      if (!this.coords.w_rs) {
        return;
      }

      this.calcPointerPercent();
      var handle_x = this.getHandleX();

      if (this.target === "both") {
        this.coords.p_gap = 0;
        handle_x = this.getHandleX();
      }

      if (this.target === "click") {
        this.coords.p_gap = this.coords.p_handle / 2;
        handle_x = this.getHandleX();

        if (this.options.drag_interval) {
          this.target = "both_one";
        } else {
          this.target = this.chooseHandle(handle_x);
        }
      }

      switch (this.target) {
        case "base":
          var w = (this.options.max - this.options.min) / 100,
              f = (this.result.from - this.options.min) / w,
              t = (this.result.to - this.options.min) / w;
          this.coords.p_single_real = this.toFixed(f);
          this.coords.p_from_real = this.toFixed(f);
          this.coords.p_to_real = this.toFixed(t);
          this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          this.target = null;
          break;

        case "single":
          if (this.options.from_fixed) {
            break;
          }

          this.coords.p_single_real = this.convertToRealPercent(handle_x);
          this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
          this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
          this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
          break;

        case "from":
          if (this.options.from_fixed) {
            break;
          }

          this.coords.p_from_real = this.convertToRealPercent(handle_x);
          this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);

          if (this.coords.p_from_real > this.coords.p_to_real) {
            this.coords.p_from_real = this.coords.p_to_real;
          }

          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          break;

        case "to":
          if (this.options.to_fixed) {
            break;
          }

          this.coords.p_to_real = this.convertToRealPercent(handle_x);
          this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);

          if (this.coords.p_to_real < this.coords.p_from_real) {
            this.coords.p_to_real = this.coords.p_from_real;
          }

          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;

        case "both":
          if (this.options.from_fixed || this.options.to_fixed) {
            break;
          }

          handle_x = this.toFixed(handle_x + this.coords.p_handle * 0.001);
          this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
          this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
          this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;

        case "both_one":
          if (this.options.from_fixed || this.options.to_fixed) {
            break;
          }

          var real_x = this.convertToRealPercent(handle_x),
              from = this.result.from_percent,
              to = this.result.to_percent,
              full = to - from,
              half = full / 2,
              new_from = real_x - half,
              new_to = real_x + half;

          if (new_from < 0) {
            new_from = 0;
            new_to = new_from + full;
          }

          if (new_to > 100) {
            new_to = 100;
            new_from = new_to - full;
          }

          this.coords.p_from_real = this.calcWithStep(new_from);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_real = this.calcWithStep(new_to);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;
      }

      if (this.options.type === "single") {
        this.coords.p_bar_x = this.coords.p_handle / 2;
        this.coords.p_bar_w = this.coords.p_single_fake;
        this.result.from_percent = this.coords.p_single_real;
        this.result.from = this.convertToValue(this.coords.p_single_real);

        if (this.options.values.length) {
          this.result.from_value = this.options.values[this.result.from];
        }
      } else {
        this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2);
        this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);
        this.result.from_percent = this.coords.p_from_real;
        this.result.from = this.convertToValue(this.coords.p_from_real);
        this.result.to_percent = this.coords.p_to_real;
        this.result.to = this.convertToValue(this.coords.p_to_real);

        if (this.options.values.length) {
          this.result.from_value = this.options.values[this.result.from];
          this.result.to_value = this.options.values[this.result.to];
        }
      }

      this.calcMinMax();
      this.calcLabels();
    },

    /**
     * calculates pointer X in percent
     */
    calcPointerPercent: function calcPointerPercent() {
      if (!this.coords.w_rs) {
        this.coords.p_pointer = 0;
        return;
      }

      if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)) {
        this.coords.x_pointer = 0;
      } else if (this.coords.x_pointer > this.coords.w_rs) {
        this.coords.x_pointer = this.coords.w_rs;
      }

      this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
    },
    convertToRealPercent: function convertToRealPercent(fake) {
      var full = 100 - this.coords.p_handle;
      return fake / full * 100;
    },
    convertToFakePercent: function convertToFakePercent(real) {
      var full = 100 - this.coords.p_handle;
      return real / 100 * full;
    },
    getHandleX: function getHandleX() {
      var max = 100 - this.coords.p_handle,
          x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

      if (x < 0) {
        x = 0;
      } else if (x > max) {
        x = max;
      }

      return x;
    },
    calcHandlePercent: function calcHandlePercent() {
      if (this.options.type === "single") {
        this.coords.w_handle = this.$cache.s_single.outerWidth(false);
      } else {
        this.coords.w_handle = this.$cache.s_from.outerWidth(false);
      }

      this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
    },

    /**
     * Find closest handle to pointer click
     *
     * @param real_x {Number}
     * @returns {String}
     */
    chooseHandle: function chooseHandle(real_x) {
      if (this.options.type === "single") {
        return "single";
      } else {
        var m_point = this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2;

        if (real_x >= m_point) {
          return this.options.to_fixed ? "from" : "to";
        } else {
          return this.options.from_fixed ? "to" : "from";
        }
      }
    },

    /**
     * Measure Min and Max labels width in percent
     */
    calcMinMax: function calcMinMax() {
      if (!this.coords.w_rs) {
        return;
      }

      this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
      this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
    },

    /**
     * Measure labels width and X in percent
     */
    calcLabels: function calcLabels() {
      if (!this.coords.w_rs || this.options.hide_from_to) {
        return;
      }

      if (this.options.type === "single") {
        this.labels.w_single = this.$cache.single.outerWidth(false);
        this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
        this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2;
        this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);
      } else {
        this.labels.w_from = this.$cache.from.outerWidth(false);
        this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
        this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2;
        this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
        this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);
        this.labels.w_to = this.$cache.to.outerWidth(false);
        this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
        this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2;
        this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
        this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);
        this.labels.w_single = this.$cache.single.outerWidth(false);
        this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
        this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2;
        this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
        this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);
      }
    },
    // =============================================================================================================
    // Drawings

    /**
     * Main function called in request animation frame
     * to update everything
     */
    updateScene: function updateScene() {
      if (this.raf_id) {
        cancelAnimationFrame(this.raf_id);
        this.raf_id = null;
      }

      clearTimeout(this.update_tm);
      this.update_tm = null;

      if (!this.options) {
        return;
      }

      this.drawHandles();

      if (this.is_active) {
        this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
      } else {
        this.update_tm = setTimeout(this.updateScene.bind(this), 300);
      }
    },

    /**
     * Draw handles
     */
    drawHandles: function drawHandles() {
      this.coords.w_rs = this.$cache.rs.outerWidth(false);

      if (!this.coords.w_rs) {
        return;
      }

      if (this.coords.w_rs !== this.coords.w_rs_old) {
        this.target = "base";
        this.is_resize = true;
      }

      if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
        this.setMinMax();
        this.calc(true);
        this.drawLabels();

        if (this.options.grid) {
          this.calcGridMargin();
          this.calcGridLabels();
        }

        this.force_redraw = true;
        this.coords.w_rs_old = this.coords.w_rs;
        this.drawShadow();
      }

      if (!this.coords.w_rs) {
        return;
      }

      if (!this.dragging && !this.force_redraw && !this.is_key) {
        return;
      }

      if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
        this.drawLabels();
        this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
        this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

        if (this.options.type === "single") {
          this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";
          this.$cache.single[0].style.left = this.labels.p_single_left + "%";
        } else {
          this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
          this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

          if (this.old_from !== this.result.from || this.force_redraw) {
            this.$cache.from[0].style.left = this.labels.p_from_left + "%";
          }

          if (this.old_to !== this.result.to || this.force_redraw) {
            this.$cache.to[0].style.left = this.labels.p_to_left + "%";
          }

          this.$cache.single[0].style.left = this.labels.p_single_left + "%";
        }

        this.writeToInput();

        if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
          this.$cache.input.trigger("change");
          this.$cache.input.trigger("input");
        }

        this.old_from = this.result.from;
        this.old_to = this.result.to; // callbacks call

        if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
          this.callOnChange();
        }

        if (this.is_key || this.is_click) {
          this.is_key = false;
          this.is_click = false;
          this.callOnFinish();
        }

        this.is_update = false;
        this.is_resize = false;
        this.is_finish = false;
      }

      this.is_start = false;
      this.is_key = false;
      this.is_click = false;
      this.force_redraw = false;
    },

    /**
     * Draw labels
     * measure labels collisions
     * collapse close labels
     */
    drawLabels: function drawLabels() {
      if (!this.options) {
        return;
      }

      var values_num = this.options.values.length,
          p_values = this.options.p_values,
          text_single,
          text_from,
          text_to;

      if (this.options.hide_from_to) {
        return;
      }

      if (this.options.type === "single") {
        if (values_num) {
          text_single = this.decorate(p_values[this.result.from]);
          this.$cache.single.html(text_single);
        } else {
          text_single = this.decorate(this._prettify(this.result.from), this.result.from);
          this.$cache.single.html(text_single);
        }

        this.calcLabels();

        if (this.labels.p_single_left < this.labels.p_min + 1) {
          this.$cache.min[0].style.visibility = "hidden";
        } else {
          this.$cache.min[0].style.visibility = "visible";
        }

        if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
          this.$cache.max[0].style.visibility = "hidden";
        } else {
          this.$cache.max[0].style.visibility = "visible";
        }
      } else {
        if (values_num) {
          if (this.options.decorate_both) {
            text_single = this.decorate(p_values[this.result.from]);
            text_single += this.options.values_separator;
            text_single += this.decorate(p_values[this.result.to]);
          } else {
            text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
          }

          text_from = this.decorate(p_values[this.result.from]);
          text_to = this.decorate(p_values[this.result.to]);
          this.$cache.single.html(text_single);
          this.$cache.from.html(text_from);
          this.$cache.to.html(text_to);
        } else {
          if (this.options.decorate_both) {
            text_single = this.decorate(this._prettify(this.result.from), this.result.from);
            text_single += this.options.values_separator;
            text_single += this.decorate(this._prettify(this.result.to), this.result.to);
          } else {
            text_single = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to);
          }

          text_from = this.decorate(this._prettify(this.result.from), this.result.from);
          text_to = this.decorate(this._prettify(this.result.to), this.result.to);
          this.$cache.single.html(text_single);
          this.$cache.from.html(text_from);
          this.$cache.to.html(text_to);
        }

        this.calcLabels();
        var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
            single_left = this.labels.p_single_left + this.labels.p_single_fake,
            to_left = this.labels.p_to_left + this.labels.p_to_fake,
            max = Math.max(single_left, to_left);

        if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
          this.$cache.from[0].style.visibility = "hidden";
          this.$cache.to[0].style.visibility = "hidden";
          this.$cache.single[0].style.visibility = "visible";

          if (this.result.from === this.result.to) {
            if (this.target === "from") {
              this.$cache.from[0].style.visibility = "visible";
            } else if (this.target === "to") {
              this.$cache.to[0].style.visibility = "visible";
            } else if (!this.target) {
              this.$cache.from[0].style.visibility = "visible";
            }

            this.$cache.single[0].style.visibility = "hidden";
            max = to_left;
          } else {
            this.$cache.from[0].style.visibility = "hidden";
            this.$cache.to[0].style.visibility = "hidden";
            this.$cache.single[0].style.visibility = "visible";
            max = Math.max(single_left, to_left);
          }
        } else {
          this.$cache.from[0].style.visibility = "visible";
          this.$cache.to[0].style.visibility = "visible";
          this.$cache.single[0].style.visibility = "hidden";
        }

        if (min < this.labels.p_min + 1) {
          this.$cache.min[0].style.visibility = "hidden";
        } else {
          this.$cache.min[0].style.visibility = "visible";
        }

        if (max > 100 - this.labels.p_max - 1) {
          this.$cache.max[0].style.visibility = "hidden";
        } else {
          this.$cache.max[0].style.visibility = "visible";
        }
      }
    },

    /**
     * Draw shadow intervals
     */
    drawShadow: function drawShadow() {
      var o = this.options,
          c = this.$cache,
          is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
          is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
          is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
          is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),
          from_min,
          from_max,
          to_min,
          to_max;

      if (o.type === "single") {
        if (o.from_shadow && (is_from_min || is_from_max)) {
          from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
          from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
          from_min = this.toFixed(from_min - this.coords.p_handle / 100 * from_min);
          from_max = this.toFixed(from_max - this.coords.p_handle / 100 * from_max);
          from_min = from_min + this.coords.p_handle / 2;
          c.shad_single[0].style.display = "block";
          c.shad_single[0].style.left = from_min + "%";
          c.shad_single[0].style.width = from_max + "%";
        } else {
          c.shad_single[0].style.display = "none";
        }
      } else {
        if (o.from_shadow && (is_from_min || is_from_max)) {
          from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
          from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
          from_min = this.toFixed(from_min - this.coords.p_handle / 100 * from_min);
          from_max = this.toFixed(from_max - this.coords.p_handle / 100 * from_max);
          from_min = from_min + this.coords.p_handle / 2;
          c.shad_from[0].style.display = "block";
          c.shad_from[0].style.left = from_min + "%";
          c.shad_from[0].style.width = from_max + "%";
        } else {
          c.shad_from[0].style.display = "none";
        }

        if (o.to_shadow && (is_to_min || is_to_max)) {
          to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
          to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
          to_min = this.toFixed(to_min - this.coords.p_handle / 100 * to_min);
          to_max = this.toFixed(to_max - this.coords.p_handle / 100 * to_max);
          to_min = to_min + this.coords.p_handle / 2;
          c.shad_to[0].style.display = "block";
          c.shad_to[0].style.left = to_min + "%";
          c.shad_to[0].style.width = to_max + "%";
        } else {
          c.shad_to[0].style.display = "none";
        }
      }
    },

    /**
     * Write values to input element
     */
    writeToInput: function writeToInput() {
      if (this.options.type === "single") {
        if (this.options.values.length) {
          this.$cache.input.prop("value", this.result.from_value);
        } else {
          this.$cache.input.prop("value", this.result.from);
        }

        this.$cache.input.data("from", this.result.from);
      } else {
        if (this.options.values.length) {
          this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
        } else {
          this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
        }

        this.$cache.input.data("from", this.result.from);
        this.$cache.input.data("to", this.result.to);
      }
    },
    // =============================================================================================================
    // Callbacks
    callOnStart: function callOnStart() {
      this.writeToInput();

      if (this.options.onStart && typeof this.options.onStart === "function") {
        this.options.onStart(this.result);
      }
    },
    callOnChange: function callOnChange() {
      this.writeToInput();

      if (this.options.onChange && typeof this.options.onChange === "function") {
        this.options.onChange(this.result);
      }
    },
    callOnFinish: function callOnFinish() {
      this.writeToInput();

      if (this.options.onFinish && typeof this.options.onFinish === "function") {
        this.options.onFinish(this.result);
      }
    },
    callOnUpdate: function callOnUpdate() {
      this.writeToInput();

      if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
        this.options.onUpdate(this.result);
      }
    },
    // =============================================================================================================
    // Service methods
    toggleInput: function toggleInput() {
      this.$cache.input.toggleClass("irs-hidden-input");
    },

    /**
     * Convert real value to percent
     *
     * @param value {Number} X in real
     * @param no_min {boolean=} don't use min value
     * @returns {Number} X in percent
     */
    convertToPercent: function convertToPercent(value, no_min) {
      var diapason = this.options.max - this.options.min,
          one_percent = diapason / 100,
          val,
          percent;

      if (!diapason) {
        this.no_diapason = true;
        return 0;
      }

      if (no_min) {
        val = value;
      } else {
        val = value - this.options.min;
      }

      percent = val / one_percent;
      return this.toFixed(percent);
    },

    /**
     * Convert percent to real values
     *
     * @param percent {Number} X in percent
     * @returns {Number} X in real
     */
    convertToValue: function convertToValue(percent) {
      var min = this.options.min,
          max = this.options.max,
          min_decimals = min.toString().split(".")[1],
          max_decimals = max.toString().split(".")[1],
          min_length,
          max_length,
          avg_decimals = 0,
          abs = 0;

      if (percent === 0) {
        return this.options.min;
      }

      if (percent === 100) {
        return this.options.max;
      }

      if (min_decimals) {
        min_length = min_decimals.length;
        avg_decimals = min_length;
      }

      if (max_decimals) {
        max_length = max_decimals.length;
        avg_decimals = max_length;
      }

      if (min_length && max_length) {
        avg_decimals = min_length >= max_length ? min_length : max_length;
      }

      if (min < 0) {
        abs = Math.abs(min);
        min = +(min + abs).toFixed(avg_decimals);
        max = +(max + abs).toFixed(avg_decimals);
      }

      var number = (max - min) / 100 * percent + min,
          string = this.options.step.toString().split(".")[1],
          result;

      if (string) {
        number = +number.toFixed(string.length);
      } else {
        number = number / this.options.step;
        number = number * this.options.step;
        number = +number.toFixed(0);
      }

      if (abs) {
        number -= abs;
      }

      if (string) {
        result = +number.toFixed(string.length);
      } else {
        result = this.toFixed(number);
      }

      if (result < this.options.min) {
        result = this.options.min;
      } else if (result > this.options.max) {
        result = this.options.max;
      }

      return result;
    },

    /**
     * Round percent value with step
     *
     * @param percent {Number}
     * @returns percent {Number} rounded
     */
    calcWithStep: function calcWithStep(percent) {
      var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

      if (rounded > 100) {
        rounded = 100;
      }

      if (percent === 100) {
        rounded = 100;
      }

      return this.toFixed(rounded);
    },
    checkMinInterval: function checkMinInterval(p_current, p_next, type) {
      var o = this.options,
          current,
          next;

      if (!o.min_interval) {
        return p_current;
      }

      current = this.convertToValue(p_current);
      next = this.convertToValue(p_next);

      if (type === "from") {
        if (next - current < o.min_interval) {
          current = next - o.min_interval;
        }
      } else {
        if (current - next < o.min_interval) {
          current = next + o.min_interval;
        }
      }

      return this.convertToPercent(current);
    },
    checkMaxInterval: function checkMaxInterval(p_current, p_next, type) {
      var o = this.options,
          current,
          next;

      if (!o.max_interval) {
        return p_current;
      }

      current = this.convertToValue(p_current);
      next = this.convertToValue(p_next);

      if (type === "from") {
        if (next - current > o.max_interval) {
          current = next - o.max_interval;
        }
      } else {
        if (current - next > o.max_interval) {
          current = next + o.max_interval;
        }
      }

      return this.convertToPercent(current);
    },
    checkDiapason: function checkDiapason(p_num, min, max) {
      var num = this.convertToValue(p_num),
          o = this.options;

      if (typeof min !== "number") {
        min = o.min;
      }

      if (typeof max !== "number") {
        max = o.max;
      }

      if (num < min) {
        num = min;
      }

      if (num > max) {
        num = max;
      }

      return this.convertToPercent(num);
    },
    toFixed: function toFixed(num) {
      num = num.toFixed(20);
      return +num;
    },
    _prettify: function _prettify(num) {
      if (!this.options.prettify_enabled) {
        return num;
      }

      if (this.options.prettify && typeof this.options.prettify === "function") {
        return this.options.prettify(num);
      } else {
        return this.prettify(num);
      }
    },
    prettify: function prettify(num) {
      var n = num.toString();
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
    },
    checkEdges: function checkEdges(left, width) {
      if (!this.options.force_edges) {
        return this.toFixed(left);
      }

      if (left < 0) {
        left = 0;
      } else if (left > 100 - width) {
        left = 100 - width;
      }

      return this.toFixed(left);
    },
    validate: function validate() {
      var o = this.options,
          r = this.result,
          v = o.values,
          vl = v.length,
          value,
          i;
      if (typeof o.min === "string") o.min = +o.min;
      if (typeof o.max === "string") o.max = +o.max;
      if (typeof o.from === "string") o.from = +o.from;
      if (typeof o.to === "string") o.to = +o.to;
      if (typeof o.step === "string") o.step = +o.step;
      if (typeof o.from_min === "string") o.from_min = +o.from_min;
      if (typeof o.from_max === "string") o.from_max = +o.from_max;
      if (typeof o.to_min === "string") o.to_min = +o.to_min;
      if (typeof o.to_max === "string") o.to_max = +o.to_max;
      if (typeof o.keyboard_step === "string") o.keyboard_step = +o.keyboard_step;
      if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

      if (o.max < o.min) {
        o.max = o.min;
      }

      if (vl) {
        o.p_values = [];
        o.min = 0;
        o.max = vl - 1;
        o.step = 1;
        o.grid_num = o.max;
        o.grid_snap = true;

        for (i = 0; i < vl; i++) {
          value = +v[i];

          if (!isNaN(value)) {
            v[i] = value;
            value = this._prettify(value);
          } else {
            value = v[i];
          }

          o.p_values.push(value);
        }
      }

      if (typeof o.from !== "number" || isNaN(o.from)) {
        o.from = o.min;
      }

      if (typeof o.to !== "number" || isNaN(o.to)) {
        o.to = o.max;
      }

      if (o.type === "single") {
        if (o.from < o.min) o.from = o.min;
        if (o.from > o.max) o.from = o.max;
      } else {
        if (o.from < o.min) o.from = o.min;
        if (o.from > o.max) o.from = o.max;
        if (o.to < o.min) o.to = o.min;
        if (o.to > o.max) o.to = o.max;

        if (this.update_check.from) {
          if (this.update_check.from !== o.from) {
            if (o.from > o.to) o.from = o.to;
          }

          if (this.update_check.to !== o.to) {
            if (o.to < o.from) o.to = o.from;
          }
        }

        if (o.from > o.to) o.from = o.to;
        if (o.to < o.from) o.to = o.from;
      }

      if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
        o.step = 1;
      }

      if (typeof o.keyboard_step !== "number" || isNaN(o.keyboard_step) || !o.keyboard_step || o.keyboard_step < 0) {
        o.keyboard_step = 5;
      }

      if (typeof o.from_min === "number" && o.from < o.from_min) {
        o.from = o.from_min;
      }

      if (typeof o.from_max === "number" && o.from > o.from_max) {
        o.from = o.from_max;
      }

      if (typeof o.to_min === "number" && o.to < o.to_min) {
        o.to = o.to_min;
      }

      if (typeof o.to_max === "number" && o.from > o.to_max) {
        o.to = o.to_max;
      }

      if (r) {
        if (r.min !== o.min) {
          r.min = o.min;
        }

        if (r.max !== o.max) {
          r.max = o.max;
        }

        if (r.from < r.min || r.from > r.max) {
          r.from = o.from;
        }

        if (r.to < r.min || r.to > r.max) {
          r.to = o.to;
        }
      }

      if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
        o.min_interval = 0;
      }

      if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
        o.max_interval = 0;
      }

      if (o.min_interval && o.min_interval > o.max - o.min) {
        o.min_interval = o.max - o.min;
      }

      if (o.max_interval && o.max_interval > o.max - o.min) {
        o.max_interval = o.max - o.min;
      }
    },
    decorate: function decorate(num, original) {
      var decorated = "",
          o = this.options;

      if (o.prefix) {
        decorated += o.prefix;
      }

      decorated += num;

      if (o.max_postfix) {
        if (o.values.length && num === o.p_values[o.max]) {
          decorated += o.max_postfix;

          if (o.postfix) {
            decorated += " ";
          }
        } else if (original === o.max) {
          decorated += o.max_postfix;

          if (o.postfix) {
            decorated += " ";
          }
        }
      }

      if (o.postfix) {
        decorated += o.postfix;
      }

      return decorated;
    },
    updateFrom: function updateFrom() {
      this.result.from = this.options.from;
      this.result.from_percent = this.convertToPercent(this.result.from);

      if (this.options.values) {
        this.result.from_value = this.options.values[this.result.from];
      }
    },
    updateTo: function updateTo() {
      this.result.to = this.options.to;
      this.result.to_percent = this.convertToPercent(this.result.to);

      if (this.options.values) {
        this.result.to_value = this.options.values[this.result.to];
      }
    },
    updateResult: function updateResult() {
      this.result.min = this.options.min;
      this.result.max = this.options.max;
      this.updateFrom();
      this.updateTo();
    },
    // =============================================================================================================
    // Grid
    appendGrid: function appendGrid() {
      if (!this.options.grid) {
        return;
      }

      var o = this.options,
          i,
          z,
          total = o.max - o.min,
          big_num = o.grid_num,
          big_p = 0,
          big_w = 0,
          small_max = 4,
          local_small_max,
          small_p,
          small_w = 0,
          result,
          html = '';
      this.calcGridMargin();

      if (o.grid_snap) {
        if (total > 50) {
          big_num = 50 / o.step;
          big_p = this.toFixed(o.step / 0.5);
        } else {
          big_num = total / o.step;
          big_p = this.toFixed(o.step / (total / 100));
        }
      } else {
        big_p = this.toFixed(100 / big_num);
      }

      if (big_num > 4) {
        small_max = 3;
      }

      if (big_num > 7) {
        small_max = 2;
      }

      if (big_num > 14) {
        small_max = 1;
      }

      if (big_num > 28) {
        small_max = 0;
      }

      for (i = 0; i < big_num + 1; i++) {
        local_small_max = small_max;
        big_w = this.toFixed(big_p * i);

        if (big_w > 100) {
          big_w = 100;
          local_small_max -= 2;

          if (local_small_max < 0) {
            local_small_max = 0;
          }
        }

        this.coords.big[i] = big_w;
        small_p = (big_w - big_p * (i - 1)) / (local_small_max + 1);

        for (z = 1; z <= local_small_max; z++) {
          if (big_w === 0) {
            break;
          }

          small_w = this.toFixed(big_w - small_p * z);
          html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
        }

        html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';
        result = this.convertToValue(big_w);

        if (o.values.length) {
          result = o.p_values[result];
        } else {
          result = this._prettify(result);
        }

        html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
      }

      this.coords.big_num = Math.ceil(big_num + 1);
      this.$cache.cont.addClass("irs-with-grid");
      this.$cache.grid.html(html);
      this.cacheGridLabels();
    },
    cacheGridLabels: function cacheGridLabels() {
      var $label,
          i,
          num = this.coords.big_num;

      for (i = 0; i < num; i++) {
        $label = this.$cache.grid.find(".js-grid-text-" + i);
        this.$cache.grid_labels.push($label);
      }

      this.calcGridLabels();
    },
    calcGridLabels: function calcGridLabels() {
      var i,
          label,
          start = [],
          finish = [],
          num = this.coords.big_num;

      for (i = 0; i < num; i++) {
        this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
        this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
        this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);
        start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
        finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
      }

      if (this.options.force_edges) {
        if (start[0] < -this.coords.grid_gap) {
          start[0] = -this.coords.grid_gap;
          finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);
          this.coords.big_x[0] = this.coords.grid_gap;
        }

        if (finish[num - 1] > 100 + this.coords.grid_gap) {
          finish[num - 1] = 100 + this.coords.grid_gap;
          start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);
          this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
        }
      }

      this.calcGridCollision(2, start, finish);
      this.calcGridCollision(4, start, finish);

      for (i = 0; i < num; i++) {
        label = this.$cache.grid_labels[i][0];

        if (this.coords.big_x[i] !== Number.POSITIVE_INFINITY) {
          label.style.marginLeft = -this.coords.big_x[i] + "%";
        }
      }
    },
    // Collisions Calc Beta
    // TODO: Refactor then have plenty of time
    calcGridCollision: function calcGridCollision(step, start, finish) {
      var i,
          next_i,
          label,
          num = this.coords.big_num;

      for (i = 0; i < num; i += step) {
        next_i = i + step / 2;

        if (next_i >= num) {
          break;
        }

        label = this.$cache.grid_labels[next_i][0];

        if (finish[i] <= start[next_i]) {
          label.style.visibility = "visible";
        } else {
          label.style.visibility = "hidden";
        }
      }
    },
    calcGridMargin: function calcGridMargin() {
      if (!this.options.grid_margin) {
        return;
      }

      this.coords.w_rs = this.$cache.rs.outerWidth(false);

      if (!this.coords.w_rs) {
        return;
      }

      if (this.options.type === "single") {
        this.coords.w_handle = this.$cache.s_single.outerWidth(false);
      } else {
        this.coords.w_handle = this.$cache.s_from.outerWidth(false);
      }

      this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
      this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - 0.1);
      this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
      this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
    },
    // =============================================================================================================
    // Public methods
    update: function update(options) {
      if (!this.input) {
        return;
      }

      this.is_update = true;
      this.options.from = this.result.from;
      this.options.to = this.result.to;
      this.update_check.from = this.result.from;
      this.update_check.to = this.result.to;
      this.options = $.extend(this.options, options);
      this.validate();
      this.updateResult(options);
      this.toggleInput();
      this.remove();
      this.init(true);
    },
    reset: function reset() {
      if (!this.input) {
        return;
      }

      this.updateResult();
      this.update();
    },
    destroy: function destroy() {
      if (!this.input) {
        return;
      }

      this.toggleInput();
      this.$cache.input.prop("readonly", false);
      $.data(this.input, "ionRangeSlider", null);
      this.remove();
      this.input = null;
      this.options = null;
    }
  };

  $.fn.ionRangeSlider = function (options) {
    return this.each(function () {
      if (!$.data(this, "ionRangeSlider")) {
        $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
      }
    });
  }; // =================================================================================================================
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
  // MIT license


  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  })();
}); // Trigger


$(function () {
  var $range = $(".js-range-slider"),
      $inputFrom = $(".js-input-from"),
      $inputTo = $(".js-input-to"),
      instance,
      min = 0,
      max = 1000,
      from = 10,
      to = 100;
  $range.ionRangeSlider({
    type: "double",
    min: min,
    max: max,
    from: 0,
    to: 500,
    prefix: 'tk. ',
    onStart: updateInputs,
    onChange: updateInputs,
    step: 1,
    prettify_enabled: true,
    prettify_separator: ".",
    values_separator: " - ",
    force_edges: true
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;
    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value"); // validate

    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });
  });
  $inputTo.on("input", function () {
    var val = $(this).prop("value"); // validate

    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });
  });
});

/***/ }),

/***/ "./resources/js/js/slick.min.js":
/*!**************************************!*\
  !*** ./resources/js/js/slick.min.js ***!
  \**************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

!function (i) {
  "use strict";

   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jquery'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (i),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (i) {
  "use strict";

  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (t, o) {
      var s,
          n = this;
      n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function customPaging(e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, n.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
    };
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    });
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
    var s = this;
    if ("boolean" == typeof t) o = t, t = null;else if (t < 0 || t >= s.slideCount) return !1;
    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e);
    }), s.$slidesCache = s.$slides, s.reinit();
  }, e.prototype.animateHeight = function () {
    var i = this;

    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.animate({
        height: e
      }, i.options.speed);
    }
  }, e.prototype.animateSlide = function (e, t) {
    var o = {},
        s = this;
    s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
      left: e
    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
      top: e
    }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
      animStart: s.currentLeft
    }).animate({
      animStart: e
    }, {
      duration: s.options.speed,
      easing: s.options.easing,
      step: function step(i) {
        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
      },
      complete: function complete() {
        t && t.call();
      }
    })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
      s.disableTransition(), t.call();
    }, s.options.speed));
  }, e.prototype.getNavTarget = function () {
    var e = this,
        t = e.options.asNavFor;
    return t && null !== t && (t = i(t).not(e.$slider)), t;
  }, e.prototype.asNavFor = function (e) {
    var t = this.getNavTarget();
    null !== t && "object" == _typeof(t) && t.each(function () {
      var t = i(this).slick("getSlick");
      t.unslicked || t.slideHandler(e, !0);
    });
  }, e.prototype.applyTransition = function (i) {
    var e = this,
        t = {};
    !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
  }, e.prototype.autoPlay = function () {
    var i = this;
    i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
  }, e.prototype.autoPlayClear = function () {
    var i = this;
    i.autoPlayTimer && clearInterval(i.autoPlayTimer);
  }, e.prototype.autoPlayIterator = function () {
    var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
    i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }));
  }, e.prototype.buildDots = function () {
    var e,
        t,
        o = this;

    if (!0 === o.options.dots) {
      for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) {
        t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
      }

      o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
  }, e.prototype.buildRows = function () {
    var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;

    if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
      for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
        var d = document.createElement("div");

        for (e = 0; e < l.options.rows; e++) {
          var a = document.createElement("div");

          for (t = 0; t < l.options.slidesPerRow; t++) {
            var c = i * r + (e * l.options.slidesPerRow + t);
            n.get(c) && a.appendChild(n.get(c));
          }

          d.appendChild(a);
        }

        o.appendChild(d);
      }

      l.$slider.empty().append(o), l.$slider.children().children().children().css({
        width: 100 / l.options.slidesPerRow + "%",
        display: "inline-block"
      });
    }
  }, e.prototype.checkResponsive = function (e, t) {
    var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();

    if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
      s = null;

      for (o in r.breakpoints) {
        r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
      }

      null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
    }
  }, e.prototype.changeSlide = function (e, t) {
    var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);

    switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
      case "previous":
        s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
        break;

      case "next":
        s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
        break;

      case "index":
        var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
        break;

      default:
        return;
    }
  }, e.prototype.checkNavigable = function (i) {
    var e, t;
    if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];else for (var o in e) {
      if (i < e[o]) {
        i = t;
        break;
      }

      t = e[o];
    }
    return i;
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
  }, e.prototype.cleanUpRows = function () {
    var i,
        e = this;
    e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
  }, e.prototype.clickHandler = function (i) {
    !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
  }, e.prototype.destroy = function (e) {
    var t = this;
    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      i(this).attr("style", i(this).data("originalStyling"));
    }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
  }, e.prototype.disableTransition = function (i) {
    var e = this,
        t = {};
    t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
  }, e.prototype.fadeSlide = function (i, e) {
    var t = this;
    !1 === t.cssTransitions ? (t.$slides.eq(i).css({
      zIndex: t.options.zIndex
    }), t.$slides.eq(i).animate({
      opacity: 1
    }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
      opacity: 1,
      zIndex: t.options.zIndex
    }), e && setTimeout(function () {
      t.disableTransition(i), e.call();
    }, t.options.speed));
  }, e.prototype.fadeSlideOut = function (i) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(i).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }));
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
    var e = this;
    null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
      t.stopImmediatePropagation();
      var o = i(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
      }, 0);
    });
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide;
  }, e.prototype.getDotCount = function () {
    var i = this,
        e = 0,
        t = 0,
        o = 0;
    if (!0 === i.options.infinite) {
      if (i.slideCount <= i.options.slidesToShow) ++o;else for (; e < i.slideCount;) {
        ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
      }
    } else if (!0 === i.options.centerMode) o = i.slideCount;else if (i.options.asNavFor) for (; e < i.slideCount;) {
      ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    } else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
    return o - 1;
  }, e.prototype.getLeft = function (i) {
    var e,
        t,
        o,
        s,
        n = this,
        r = 0;
    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
  }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
    return this.options[i];
  }, e.prototype.getNavigableIndexes = function () {
    var i,
        e = this,
        t = 0,
        o = 0,
        s = [];

    for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) {
      s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    }

    return s;
  }, e.prototype.getSlick = function () {
    return this;
  }, e.prototype.getSlideCount = function () {
    var e,
        t,
        o = this;
    return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
      if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
    }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
  }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
    this.changeSlide({
      data: {
        message: "index",
        index: parseInt(i)
      }
    }, e);
  }, e.prototype.init = function (e) {
    var t = this;
    i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
  }, e.prototype.initADA = function () {
    var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
      return i >= 0 && i < e.slideCount;
    });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
      var s = o.indexOf(t);
      i(this).attr({
        role: "tabpanel",
        id: "slick-slide" + e.instanceUid + t,
        tabindex: -1
      }), -1 !== s && i(this).attr({
        "aria-describedby": "slick-slide-control" + e.instanceUid + s
      });
    }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
      var n = o[s];
      i(this).attr({
        role: "presentation"
      }), i(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + e.instanceUid + s,
        "aria-controls": "slick-slide" + e.instanceUid + n,
        "aria-label": s + 1 + " of " + t,
        "aria-selected": null,
        tabindex: "-1"
      });
    }).eq(e.currentSlide).find("button").attr({
      "aria-selected": "true",
      tabindex: "0"
    }).end());

    for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) {
      e.$slides.eq(s).attr("tabindex", 0);
    }

    e.activateADA();
  }, e.prototype.initArrowEvents = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
      message: "index"
    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
  }, e.prototype.initUI = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
  }, e.prototype.keyHandler = function (i) {
    var e = this;
    i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "next" : "previous"
      }
    }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "previous" : "next"
      }
    }));
  }, e.prototype.lazyLoad = function () {
    function e(e) {
      i("img[data-lazy]", e).each(function () {
        var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
        r.onload = function () {
          e.animate({
            opacity: 0
          }, 100, function () {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
              opacity: 1
            }, 200, function () {
              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
            }), n.$slider.trigger("lazyLoaded", [n, e, t]);
          });
        }, r.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
        }, r.src = t;
      });
    }

    var t,
        o,
        s,
        n = this;
    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) {
      r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
    }
    e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
  }, e.prototype.loadSlider = function () {
    var i = this;
    i.setPosition(), i.$slideTrack.css({
      opacity: 1
    }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({
      data: {
        message: "next"
      }
    });
  }, e.prototype.orientationChange = function () {
    var i = this;
    i.checkResponsive(), i.setPosition();
  }, e.prototype.pause = e.prototype.slickPause = function () {
    var i = this;
    i.autoPlayClear(), i.paused = !0;
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var i = this;
    i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
  }, e.prototype.postSlide = function (e) {
    var t = this;
    t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({
      data: {
        message: "previous"
      }
    });
  }, e.prototype.preventDefault = function (i) {
    i.preventDefault();
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
    d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
      s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
    }, r.onerror = function () {
      e < 3 ? setTimeout(function () {
        l.progressiveLazyLoad(e + 1);
      }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
    }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
  }, e.prototype.refresh = function (e) {
    var t,
        o,
        s = this;
    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
      currentSlide: t
    }), s.init(), e || s.changeSlide({
      data: {
        message: "index",
        index: t
      }
    }, !1);
  }, e.prototype.registerBreakpoints = function () {
    var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;

    if ("array" === i.type(n) && n.length) {
      s.respondTo = s.options.respondTo || "window";

      for (e in n) {
        if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
          for (t = n[e].breakpoint; o >= 0;) {
            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
          }

          s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
        }
      }

      s.breakpoints.sort(function (i, e) {
        return s.options.mobileFirst ? i - e : e - i;
      });
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
  }, e.prototype.resize = function () {
    var e = this;
    i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
    }, 50));
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
    var o = this;
    if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
    o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
  }, e.prototype.setCSS = function (i) {
    var e,
        t,
        o = this,
        s = {};
    !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
  }, e.prototype.setDimensions = function () {
    var i = this;
    !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
      padding: "0px " + i.options.centerPadding
    }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
      padding: i.options.centerPadding + " 0px"
    })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
    var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
    !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
  }, e.prototype.setFade = function () {
    var e,
        t = this;
    t.$slides.each(function (o, s) {
      e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      }) : i(s).css({
        position: "relative",
        left: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      });
    }), t.$slides.eq(t.currentSlide).css({
      zIndex: t.options.zIndex - 1,
      opacity: 1
    });
  }, e.prototype.setHeight = function () {
    var i = this;

    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.css("height", e);
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e,
        t,
        o,
        s,
        n,
        r = this,
        l = !1;
    if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;else if ("multiple" === n) i.each(o, function (i, e) {
      r.options[i] = e;
    });else if ("responsive" === n) for (t in s) {
      if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];else {
        for (e = r.options.responsive.length - 1; e >= 0;) {
          r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
        }

        r.options.responsive.push(s[t]);
      }
    }
    l && (r.unload(), r.reinit());
  }, e.prototype.setPosition = function () {
    var i = this;
    i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
  }, e.prototype.setProps = function () {
    var i = this,
        e = document.body.style;
    i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
  }, e.prototype.setSlideClasses = function (i) {
    var e,
        t,
        o,
        s,
        n = this;

    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
      var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
      e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
    } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));

    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
  }, e.prototype.setupInfinite = function () {
    var e,
        t,
        o,
        s = this;

    if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
      for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) {
        t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
      }

      for (e = 0; e < o + s.slideCount; e += 1) {
        t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
      }

      s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        i(this).attr("id", "");
      });
    }
  }, e.prototype.interrupt = function (i) {
    var e = this;
    i || e.autoPlay(), e.interrupted = i;
  }, e.prototype.selectHandler = function (e) {
    var t = this,
        o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
    s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
  }, e.prototype.slideHandler = function (i, e, t) {
    var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
    if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
      a.postSlide(o);
    }) : a.postSlide(o));else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
      a.postSlide(o);
    }) : a.postSlide(o));else {
      if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
        a.postSlide(s);
      })) : a.postSlide(s), void a.animateHeight();
      !0 !== t ? a.animateSlide(d, function () {
        a.postSlide(s);
      }) : a.postSlide(s);
    }
  }, e.prototype.startLoad = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
  }, e.prototype.swipeDirection = function () {
    var i,
        e,
        t,
        o,
        s = this;
    return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
  }, e.prototype.swipeEnd = function (i) {
    var e,
        t,
        o = this;
    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;

    if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
      switch (t = o.swipeDirection()) {
        case "left":
        case "down":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
          break;

        case "right":
        case "up":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
      }

      "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
  }, e.prototype.swipeHandler = function (i) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
      case "start":
        e.swipeStart(i);
        break;

      case "move":
        e.swipeMove(i);
        break;

      case "end":
        e.swipeEnd(i);
    }
  }, e.prototype.swipeMove = function (i) {
    var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
    return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
  }, e.prototype.swipeStart = function (i) {
    var e,
        t = this;
    if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
    void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var i = this;
    null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
  }, e.prototype.unload = function () {
    var e = this;
    i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
  }, e.prototype.unslick = function (i) {
    var e = this;
    e.$slider.trigger("unslick", [e, i]), e.destroy();
  }, e.prototype.updateArrows = function () {
    var i = this;
    Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
  }, e.prototype.updateDots = function () {
    var i = this;
    null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
  }, e.prototype.visibility = function () {
    var i = this;
    i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
  }, i.fn.slick = function () {
    var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;

    for (i = 0; i < r; i++) {
      if ("object" == _typeof(s) || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
    }

    return o;
  };
});

/***/ }),

/***/ "./resources/js/js/wow.min.js":
/*!************************************!*\
  !*** ./resources/js/js/wow.min.js ***!
  \************************************/
/***/ (function() {

/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
  var a,
      b,
      c,
      d,
      e,
      f = function f(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  },
      g = [].indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++) {
      if (b in this && this[b] === a) return b;
    }

    return -1;
  };

  b = function () {
    function a() {}

    return a.prototype.extend = function (a, b) {
      var c, d;

      for (c in b) {
        d = b[c], null == a[c] && (a[c] = d);
      }

      return a;
    }, a.prototype.isMobile = function (a) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
    }, a.prototype.createEvent = function (a, b, c, d) {
      var e;
      return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e;
    }, a.prototype.emitEvent = function (a, b) {
      return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0;
    }, a.prototype.addEvent = function (a, b, c) {
      return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c;
    }, a.prototype.removeEvent = function (a, b, c) {
      return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b];
    }, a.prototype.innerHeight = function () {
      return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
    }, a;
  }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
    function a() {
      this.keys = [], this.values = [];
    }

    return a.prototype.get = function (a) {
      var b, c, d, e, f;

      for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) {
        if (c = f[b], c === a) return this.values[b];
      }
    }, a.prototype.set = function (a, b) {
      var c, d, e, f, g;

      for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) {
        if (d = g[c], d === a) return void (this.values[c] = b);
      }

      return this.keys.push(a), this.values.push(b);
    }, a;
  }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
    function a() {
      "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
    }

    return a.notSupported = !0, a.prototype.observe = function () {}, a;
  }()), d = this.getComputedStyle || function (a, b) {
    return this.getPropertyValue = function (b) {
      var c;
      return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
        return b.toUpperCase();
      }), (null != (c = a.currentStyle) ? c[b] : void 0) || null;
    }, this;
  }, e = /(\-([a-z]){1})/g, this.WOW = function () {
    function e(a) {
      null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c(), this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    return e.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0,
      live: !0,
      callback: null,
      scrollContainer: null
    }, e.prototype.init = function () {
      var a;
      return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = [];
    }, e.prototype.start = function () {
      var b, c, d, e;
      if (this.stopped = !1, this.boxes = function () {
        var a, c, d, e;

        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) {
          b = d[a], e.push(b);
        }

        return e;
      }.call(this), this.all = function () {
        var a, c, d, e;

        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) {
          b = d[a], e.push(b);
        }

        return e;
      }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle();else for (e = this.boxes, c = 0, d = e.length; d > c; c++) {
        b = e[c], this.applyStyle(b, !0);
      }
      return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
        return function (b) {
          var c, d, e, f, g;

          for (g = [], c = 0, d = b.length; d > c; c++) {
            f = b[c], g.push(function () {
              var a, b, c, d;

              for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) {
                e = c[a], d.push(this.doSync(e));
              }

              return d;
            }.call(a));
          }

          return g;
        };
      }(this)).observe(document.body, {
        childList: !0,
        subtree: !0
      }) : void 0;
    }, e.prototype.stop = function () {
      return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0;
    }, e.prototype.sync = function (b) {
      return a.notSupported ? this.doSync(this.element) : void 0;
    }, e.prototype.doSync = function (a) {
      var b, c, d, e, f;

      if (null == a && (a = this.element), 1 === a.nodeType) {
        for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) {
          b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
        }

        return f;
      }
    }, e.prototype.show = function (a) {
      return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a;
    }, e.prototype.applyStyle = function (a, b) {
      var c, d, e;
      return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
        return function () {
          return f.customStyle(a, b, d, c, e);
        };
      }(this));
    }, e.prototype.animate = function () {
      return "requestAnimationFrame" in window ? function (a) {
        return window.requestAnimationFrame(a);
      } : function (a) {
        return a();
      };
    }(), e.prototype.resetStyle = function () {
      var a, b, c, d, e;

      for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) {
        a = d[b], e.push(a.style.visibility = "visible");
      }

      return e;
    }, e.prototype.resetAnimation = function (a) {
      var b;
      return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0;
    }, e.prototype.customStyle = function (a, b, c, d, e) {
      return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
        animationDuration: c
      }), d && this.vendorSet(a.style, {
        animationDelay: d
      }), e && this.vendorSet(a.style, {
        animationIterationCount: e
      }), this.vendorSet(a.style, {
        animationName: b ? "none" : this.cachedAnimationName(a)
      }), a;
    }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
      var c, d, e, f;
      d = [];

      for (c in b) {
        e = b[c], a["" + c] = e, d.push(function () {
          var b, d, g, h;

          for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) {
            f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
          }

          return h;
        }.call(this));
      }

      return d;
    }, e.prototype.vendorCSS = function (a, b) {
      var c, e, f, g, h, i;

      for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) {
        i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
      }

      return g;
    }, e.prototype.animationName = function (a) {
      var b;

      try {
        b = this.vendorCSS(a, "animation-name").cssText;
      } catch (c) {
        b = d(a).getPropertyValue("animation-name");
      }

      return "none" === b ? "" : b;
    }, e.prototype.cacheAnimationName = function (a) {
      return this.animationNameCache.set(a, this.animationName(a));
    }, e.prototype.cachedAnimationName = function (a) {
      return this.animationNameCache.get(a);
    }, e.prototype.scrollHandler = function () {
      return this.scrolled = !0;
    }, e.prototype.scrollCallback = function () {
      var a;
      return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
        var b, c, d, e;

        for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) {
          a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
        }

        return e;
      }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop();
    }, e.prototype.offsetTop = function (a) {
      for (var b; void 0 === a.offsetTop;) {
        a = a.parentNode;
      }

      for (b = a.offsetTop; a = a.offsetParent;) {
        b += a.offsetTop;
      }

      return b;
    }, e.prototype.isVisible = function (a) {
      var b, c, d, e, f;
      return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f;
    }, e.prototype.util = function () {
      return null != this._util ? this._util : this._util = new b();
    }, e.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    }, e;
  }();
}).call(this);

/***/ }),

/***/ "./resources/scss/style.scss":
/*!***********************************!*\
  !*** ./resources/scss/style.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/animated.headline": 0,
/******/ 			"css/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/animated.headline.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/bootstrap.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/contact.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.ajaxchimp.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.form.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.magnific-popup.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.nice-select.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.paroller.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.scrollUp.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.slicknav.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.sticky.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/jquery.validate.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/mail-script.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/main.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/one-page-nav-min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/owl.carousel.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/plugins.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/popper.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/price_rangs.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/slick.min.js")))
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/js/js/wow.min.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./resources/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;