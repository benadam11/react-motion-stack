import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var Fragment = React.Fragment || 'div';

var clamp = function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
};

var MotionStack =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MotionStack, _React$Component);

  function MotionStack(_ref) {
    var _this;

    var data = _ref.data;
    _classCallCheck(this, MotionStack);
    _this = _possibleConstructorReturn(this, (MotionStack.__proto__ || Object.getPrototypeOf(MotionStack)).apply(this, arguments));

    _initialiseProps.call(_assertThisInitialized(_this));

    _this.state = {
      topDeltaX: 0,
      mouseX: 0,
      isPressed: false,
      pressedId: null,
      swiped: false,
      swipedId: null,
      direction: null,
      data: data
    };
    return _this;
  }

  _createClass(MotionStack, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('touchmove', this.handleTouchMove);
      window.addEventListener('touchend', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data.length !== nextProps.data.length) {
        this.setState({
          data: nextProps.data
        });
      }
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          swipedId = _state.swipedId,
          data = _state.data;
      var _props = this.props,
          renderCount = _props.renderCount,
          renderButtons = _props.renderButtons;
      return React.createElement(Fragment, null, React.createElement("div", {
        className: "motion-card-stack",
        ref: function ref(el) {
          return _this2.el = el;
        }
      }, data.map(function (_ref2, i) {
        var id = _ref2.id,
            rest = _objectWithoutProperties(_ref2, ["id"]);
        return i < renderCount && React.createElement(Motion, {
          key: id,
          style: _this2.getStyle(id, i),
          onRest: function onRest() {
            var action = _this2.props.infinite ? _this2.shuffle : _this2.handleRemove;
            swipedId === id && action(swipedId);
          }
        }, function (_ref3) {
          var scale = _ref3.scale,
              shadow = _ref3.shadow,
              x = _ref3.x,
              rotate = _ref3.rotate,
              opacity = _ref3.opacity;
          return React.createElement("div", {
            className: "motion-card-item",
            onMouseDown: _this2.handleMouseDown.bind(null, id, x),
            onTouchStart: _this2.handleTouchStart.bind(null, id, x),
            children: _this2.props.render(_extends({
              id: id
            }, rest)),
            style: {
              boxShadow: "rgba(0, 0, 0, 0.2) 0px ".concat(shadow, "px ").concat(shadow, "px 0px"),
              opacity: opacity,
              transform: "translate3d(".concat(x, "px, 0, 0) scale(").concat(scale, ") rotate(").concat(rotate, "deg)"),
              zIndex: data.length - i
            }
          });
        });
      })), renderButtons && renderButtons({
        accept: this.accept,
        reject: this.reject
      }));
    }
  }]);
  return MotionStack;
}(React.Component);

Object.defineProperty(MotionStack, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    springConfig: PropTypes.object,
    threshold: PropTypes.number,
    renderCount: PropTypes.number,
    infinite: PropTypes.bool,
    onSwipeEnd: PropTypes.func,
    render: PropTypes.func.isRequired,
    renderButtons: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any
    })).isRequired
  }
});
Object.defineProperty(MotionStack, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    springConfig: {
      stiffness: 1600,
      damping: 80
    },
    threshold: 200,
    renderCount: 3,
    infinite: true,
    onSwipeEnd: function onSwipeEnd() {},
    onBeforeSwipe: null
  }
});

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  Object.defineProperty(this, "handleMouseDown", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(id, pressX, _ref4) {
      var pageX = _ref4.pageX;

      if (_this3.el) {
        _this3.setState(function (prevState) {
          return {
            topDeltaX: pageX - pressX,
            mouseX: pressX,
            isPressed: !prevState.swiped,
            pressedId: id
          };
        });
      }
    }
  });
  Object.defineProperty(this, "handleMouseMove", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(_ref5) {
      var pageX = _ref5.pageX;

      if (_this3.el) {
        var _this3$state = _this3.state,
            isPressed = _this3$state.isPressed,
            topDeltaX = _this3$state.topDeltaX,
            pressedId = _this3$state.pressedId;
        var threshold = _this3.props.threshold;

        if (isPressed) {
          var mouseX = pageX - topDeltaX;

          _this3.setState({
            mouseX: mouseX
          });

          if (Math.abs(mouseX) > threshold) {
            _this3.handleSwipe(mouseX, pressedId);
          }
        }
      }
    }
  });
  Object.defineProperty(this, "handleMouseUp", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      if (_this3.el) {
        _this3.setState({
          isPressed: false,
          topDeltaX: 0,
          mouseX: 0
        });
      }
    }
  });
  Object.defineProperty(this, "handleTouchStart", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(id, pressLocation, e) {
      if (_this3.el) {
        _this3.handleMouseDown(id, pressLocation, e.touches[0]);
      }
    }
  });
  Object.defineProperty(this, "handleTouchMove", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(e) {
      e.preventDefault();

      if (_this3.el) {
        _this3.handleMouseMove(e.touches[0]);
      }
    }
  });
  Object.defineProperty(this, "handleSwipe", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(x, id) {
      var direction = x > 0 ? 'right' : 'left';

      if (_this3.props.onBeforeSwipe) {
        _this3.handleMouseUp();

        _this3.props.onBeforeSwipe(function (_direction) {
          return _this3.swipe(_direction || direction, id);
        }, direction, _this3.state);
      } else {
        _this3.swipe(direction, id);
      }
    }
  });
  Object.defineProperty(this, "swipe", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(direction, id) {
      _this3.setState({
        direction: direction,
        swiped: true,
        swipedId: id
      });
    }
  });
  Object.defineProperty(this, "accept", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      _this3.handleSwipe(1, _this3.state.data[0].id);
    }
  });
  Object.defineProperty(this, "reject", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      _this3.handleSwipe(-1, _this3.state.data[0].id);
    }
  });
  Object.defineProperty(this, "handleRemove", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(id) {
      _this3.setState(function (_ref6) {
        var data = _ref6.data;
        return {
          data: data.filter(function (item) {
            return item.id !== id;
          }),
          swipedId: null,
          mouseX: 0,
          swiped: false
        };
      });

      _this3.props.onSwipeEnd(_this3.state);
    }
  });
  Object.defineProperty(this, "shuffle", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(id) {
      _this3.setState(function (_ref7) {
        var data = _ref7.data;
        data.push(data.shift());
        return {
          data: data,
          swipedId: null,
          mouseX: 0,
          swiped: false
        };
      });

      _this3.props.onSwipeEnd(_this3.state);
    }
  });
  Object.defineProperty(this, "getStyle", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(id, i) {
      var _this3$state2 = _this3.state,
          isPressed = _this3$state2.isPressed,
          mouseX = _this3$state2.mouseX,
          direction = _this3$state2.direction,
          swiped = _this3$state2.swiped,
          swipedId = _this3$state2.swipedId,
          pressedId = _this3$state2.pressedId;
      var _this3$props = _this3.props,
          springConfig = _this3$props.springConfig,
          threshold = _this3$props.threshold;
      var isSecond = !isPressed ? i === 1 && swiped ? 1 : 0.5 : clamp(1 * Math.abs(mouseX) / threshold, 0.5, 1);
      var nextOpacity = i > 1 ? 0 : 1;
      var next = {
        scale: spring(isSecond, springConfig),
        shadow: spring(0, springConfig),
        rotate: spring(0, springConfig),
        opacity: spring(nextOpacity, springConfig),
        x: spring(0, springConfig)
      };
      var first = _extends({}, next, {
        scale: spring(1, springConfig),
        opacity: spring(1, springConfig)
      });
      var pan = {
        scale: spring(1.1, springConfig),
        shadow: spring(16, springConfig),
        opacity: spring(clamp(1 / (Math.abs(mouseX) / 100) + 0.5, 0, 1), springConfig),
        rotate: clamp(mouseX / 15, -45, 45),
        x: mouseX
      };
      var finish = _extends({}, pan, {
        rotate: spring(direction === 'left' ? -45 : 45, springConfig),
        opacity: spring(0, springConfig),
        x: spring(direction === 'left' ? -360 : 360, springConfig)
      });
      return swiped && swipedId === id ? finish : pressedId === id && isPressed ? pan : i < 1 ? first : next;
    }
  });
};

export default MotionStack;
