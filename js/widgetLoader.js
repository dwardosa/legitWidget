/*
Code taken from the good people at shoot it live, improved upon to suit project specific needs 
Loads widget from external URL and creates a new div and adds to the DOM element calling the loader
Works with multiple widget calls in a page 
*/
(function(global) {

var widgetUrl = 'js/widgetURL.js';

  // Globals
  if(!global.Widget) { global.Widget = {}; };
  var Widget = global.Widget;

  // To keep track of which embeds we have already processed
  if(!Widget.foundEls) Widget.foundEls = [];
  var foundEls = Widget.foundEls;

  // This is read by widget.js and a widget is created for each one
  if(!Widget.settings) Widget.settings = [];
  var settings = Widget.settings;

// Finding all elements on the page, and setting a regular expresion to check if they're the widget elements we're interested in 
  var els = document.getElementsByTagName('script');
  var re = /.*widgetLoader\.([^/]+\.)?js/;

  // Looping through all the elements
  for(var i = 0; i < els.length; i++) {
    var el = els[i];
    
     //If the element is a regex match, and one of widget elements we're interested in, add to array
    if(el.src.match(re) && foundEls.indexOf(el) < 0) {
      foundEls.push(el);

      var info = parseQueryString(el.src);

      // Create container div
      var d = document.createElement('div');
      var container = document.createElement('div');
      el.parentNode.insertBefore(container, el);
      info['container'] = container;

      settings.push(info);
    }
  }

  // Load main javascript
  var s = document.createElement('script');
  s.async = true; s.src = widgetUrl;
  document.body.appendChild(s);



  //
  // Utility methods from the nice people at shoot it live and JQuery
  //

  function parseQueryString(url) {
    var a = document.createElement('a');
    a.href = url;
    str = a.search.replace(/\?/, '');

    return deparam(str, true /* coerce values, eg. 'false' into false */);
  };

  // deparam
  //
  // Inverse of $.param()
  //
  // Taken from jquery-bbq by Ben Alman
  // https://github.com/cowboy/jquery-bbq/blob/master/jquery.ba-bbq.js

  // FIXME: add isNaN() method used below

  var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };

 function deparam( params, coerce ) {
    var obj = {},
    coerce_types = { 'true': !0, 'false': !1, 'null': null };

    // Iterate over all name=value pairs.
    for(param in params)( params.replace( /\+/g, ' ' ).split( '&' ), function(v, j){
      var param = v.split( '=' ),
      key = decodeURIComponent( param[0] ),
      val,
      cur = obj,
      i = 0,

      // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
      // into its component parts.
      keys = key.split( '][' ),
      keys_last = keys.length - 1;

      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if ( /\[/.test( keys[0] ) && /\]$/.test( keys[ keys_last ] ) ) {
        // Remove the trailing ] from the last keys part.
        keys[ keys_last ] = keys[ keys_last ].replace( /\]$/, '' );

        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat( keys );

        keys_last = keys.length - 1;
      } else {
        // Basic 'foo' style key.
        keys_last = 0;
      }

      // Are we dealing with a name=value pair, or just a name?
      if ( param.length === 2 ) {
        val = decodeURIComponent( param[1] );

        // Coerce values.
        if ( coerce ) {
          val = val && !isNaN(val)            ? +val              // number
          : val === 'undefined'             ? undefined         // undefined
          : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
          : val;                                                // string
        }

        if ( keys_last ) {
          // Complex key, build deep object structure based on a few rules:
          // * The 'cur' pointer starts at the object top-level.
          // * [] = array push (n is set to array length), [n] = array if n is 
          //   numeric, otherwise object.
          // * If at the last keys part, set the value.
          // * For each keys part, if the current level is undefined create an
          //   object or array based on the type of the next keys part.
          // * Move the 'cur' pointer to the next level.
          // * Rinse & repeat.
          for ( ; i <= keys_last; i++ ) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last
            ? cur[key] || ( keys[i+1] && isNaN( keys[i+1] ) ? {} : [] )
            : val;
          }

        } else {
          // Simple key, even simpler rules, since only scalars and shallow
          // arrays are allowed.

          if ( isArray( obj[key] ) ) {
            // val is already an array, so push on the next value.
            obj[key].push( val );

          } else if ( obj[key] !== undefined ) {
            // val isn't an array, but since a second value has been specified,
            // convert val into an array.
            obj[key] = [ obj[key], val ];

          } else {
            // val is a scalar.
            obj[key] = val;
          }
        }

      } else if ( key ) {
        // No value was defined, so set something meaningful.
        obj[key] = coerce
        ? undefined
        : '';
      }
    });

    return obj;
  };

}(this));