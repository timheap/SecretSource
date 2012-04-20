(function (window) {
	"use strict";
	var _arr = [];

	var SecretSource = window.SecretSource = function(els, options) {
		els = _toArray(els);
		options = _extend({}, SecretSource.options, options);

		return els.map(function(el) {
			var out = options.wrap(el, options.getSource(el));
			_insertAfter(out, el);
			return {element: el, source: el, display: out};
		});
	};

	var _toArray = function(arrayish) {
		return _arr.slice.call(arrayish, 0);
	};

	var _extend = function() {
		var args = _toArray(arguments);

		return args.reduce(function(base, obj) {
			for (var k in obj) {
				if (_arr.hasOwnProperty.call(obj, k)) {
					base[k] = obj[k];
				}
			}
			return base;
		});
	};

	var _insertAfter = function(newEl, relativeTo) {
		var parent = relativeTo.parentNode;
		var sibling = relativeTo.nextSibling;
		if (!parent) { return; }
		if (sibling) {
			parent.insertBefore(newEl, sibling);
		} else {
			parent.appendChild(newEl);
		}
	};

	SecretSource.options = {
		className: 'secret-source',
		includeTag: false,

		wrap: function(el, src) {
			var pre = document.createElement('pre');
			pre.className = this.className;

			var type = (el.getAttribute('data-language') || el.getAttribute('type')) || '';
			if (type) {
				type = 'language-' + type.replace(/^.*\//, '');
			}

			var code = document.createElement('code');
			code.className = type;

			pre.appendChild(code);
			code.appendChild(document.createTextNode(src));

			return pre;
		},

		getSource: function(el) {
			return el[this.includeTag ? 'outerHTML' : 'innerHTML'];
		}
	};

	SecretSource.show = SecretSource;
})(window);