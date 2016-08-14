'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal
    .set('project.title', 'Refract');

/*
 * Tell Fractal where to look for components.
 */

//var babelAdapter = require('./fractal-babelify');

const hbs = require('@frctl/handlebars')({
    helpers: {
        jsx: function ( requires, options ) {
            var id = 'refractor-mountpoint'; // TODO: make unique id
            var render = options.fn;
            // root context is exposed via the @root "local" variable
            var root = options.data.root;
            var out = [
                '<script type="text/babel">',
                '(function(render, requires){',
                // use destructuring assignment to import required symbols
                'const {' + requires.join(',') + '} = requires;',
                'render(',
                '\n\n',
                render(root),
                '\n\n',
                ')})(',
                'function(jsx){',
                'ReactDOM.render(jsx,document.getElementById("' + id + '"));',
                '},window.Refractor);',
                '</script>',
                '<div id="' + id + '"></div>'
            ];
            return out.join("");
        }
    }
});

fractal.components
    .set('path', path.join(__dirname, 'components'))
    .set('default.preview', '@preview')
    .engine(hbs);
    ;
/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs
    .set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web
    .set('static.path', path.join(__dirname, 'public'));
