Boilerplate for Rails & Angular

1. `git clone git@github.com:dylanjha/rails-angular-boilerplate my_awesome_app`
2. `cd my_awesome_app`
3. replace sqlite with postgres
4. change git remote `git remote rm origin && git remote add origin git@github.com:user/my_awesome_app`

NOTE about templates:

Angular templates live in app/views/templates. They should be created at plain old html files (not .erb) and should be partials (prefixed with `_`). These will get renered to the DOM inside `<script type="text/ng-template">` tags and the id of the template will be the path name.

For example, if you create a home template put it in `app/views/templates/_home.html` Then call it in angular with ng-include="/home.html", or in a route with `templateUrl: '/home.html',`

