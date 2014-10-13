Boilerplate for Rails & Angular

`create user chess superuser;`

NOTE about templates:

Angular templates live in app/views/templates. They should be created at plain old html files (not .erb) and should be partials (prefixed with `_`). These will get renered to the DOM inside `<script type="text/ng-template">` tags and the id of the template will be the path name.

For example, if you create a home template put it in `app/views/templates/_home.html` Then call it in angular with ng-include="/home.html", or in a route with `templateUrl: '/home.html',`


NOTE about assets:

I'm using the`non-stupid-digest-assets`, which allows you to link to assets without the md5 hash: `<img src="/assets/spinner" />`
