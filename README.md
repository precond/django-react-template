# django-react-template

An opinionated template project for a Django backend / React frontend application. The
template is a ready-to-use project skeleton on which you can start building your stuff.
The choices, technologies and components used in this template are my current go-to
full-stack toolset and thus reflect just my opinions and skill set. I do not put this
project out to impose my choices upon you, but if this is a good match to the stuff you
use in your work, this is one opinion on how to set up a project with these tools.

To be clear: I actually do not recommend you use this project as your template as such.
Use this as a learning aid to create your own template project which is optimized to your
favourite project setup. I did this mainly for saving my own time in starting new projects
by putting together all the new things I have learned in my recent projects, but I'm glad
if this is of any help to someone else working with the same technologies.

Author: Juhana Räsänen ([juhana.rasanen@prcond.com](mailto:juhana.rasanen@prcond.com))


## Components

The template includes the following components and tools.

### Backend

* [Django](https://www.djangoproject.com) latest LTS version (1.11.x)
* [Django REST Framework](http://www.django-rest-framework.org)
* [PyMySQL Client](https://github.com/PyMySQL/mysqlclient-python)
* Requires python 3.4+

### Frontend

* [Bootstrap](http://getbootstrap.com/) 3.3.7+
* [jQuery](https://jquery.com) 2.2.4 (because of Bootstrap 3.x)
* [React](https://reactjs.org/) 16.x+
* [Redux](https://redux.js.org/)
* [React-router](https://github.com/ReactTraining/react-router)
* [Fetch polyfill](https://github.com/github/fetch)
* [Promise polyfill](https://github.com/taylorhakes/promise-polyfill)
* Requires ES6 with JSX

### Tools

* Webpack
* Grunt
* Less
* Babel
* ESLint
* Coverage (for python)
* Docker support
* Jenkins support
* Gunicorn or Bjoern as the WSGI runner
* Nginx recommended as the proxy server


## Getting started

* Create a new repository for your project as a copy of this repository
* Change the name "template" to your project to your project name where applicable
* Edit this file as appropriate
* Run `npm install`
* Run `pip install -r pip-requirements.txt -r pip-dev-requirements.txt`
* Run `grunt` to build the frontend and static files
* Configure your nginx with the help of `etc/nginx-dev.conf` (edit paths)
* Run `src/manage.py migrate` to create initial database structure
* Run `src/manage.py createsuperuser` to create Django superuser
* Run `bin/dev-gunicorn.sh` to run the backend server
* Access the application in the URL served by your nginx and log in as superuser

## Development

* Backend tests can be run by `src/manage.py test <template>` where "<template>" is your project name
* Backend and frontend code can be linted with `grunt lint`


## Docker builds

Based on my own Ubuntu-derived base images intended for ECS deployment, but undocumented
for the time being.


## Jenkins integration

Based on `django-jenkins` package and running (python) coverage tests and linters in Jenkins.
I have my own private Jenkins setup which is not publicly available; but here is the Jenkins
script I use to build this project itself:

```
#!/bin/bash
mkdir log
virtualenv --python=python3 env
source env/bin/activate
pip install -r pip-requirements.txt
pip install -r pip-dev-requirements.txt

export APPLICATION_ENVIRONMENT=jenkins
src/manage.py jenkins --enable-coverage --coverage-rcfile=.coveragerc --project-apps-tests
flake8_junit reports/flake8.report reports/flake8.report.xml

npm install
grunt eslint:jenkins
```


## TODO

Plenty of things, because this project is mostly about documenting the ongoing process
of learning by doing. Few TODO items in particular:

* Javascript test framework
* A sample of `fetch` usage, eg. password changing possibility in the UI
* A sample REST API, potentially a generic REST view class for Django