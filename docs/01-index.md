---
title: Refractor
---

An experiment in using <a href="http://fractal.build">Fractal</a>
to document and test React components.  Rather than trying to
<a href="https://github.com/frctl/react-adapter">
use React as a templating engine</a> on the server
this project focuses on rendering React
components in the browser by providing a Handlebars helper
to generate a `<script type="text/babel">`.

```
\{{#jsx requires}}
<Example color="\{{color}}">
    <p>\{{text}}</p>
</Example>
\{{/jsx}}
```

becomes

```
<script type="text/babel">
    ...
    ReactDOM.render(
        <Example color="red">
            <p>This is (just) an Example!</p>
        </Example>,
        document.getElementById("refractor-mountpoint"));
    ...
</script>
<div class="refractor-mountpoint"></div>
```
