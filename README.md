Pack Planner
============

Development Instructions
------------------------
In order to maintain consistent dependencies and simplify deployment, we use a virtual environment when working with Django.

To set up and run in a virtual environment
``` bash
$ virtualenv venv --distribute
$ source venv/bin/activate
$ pip install -r requirements.txt
```

Note that every time you wish to run the application, you must first activate the virtual environment, via `source venv/bin/activate`.

Finally, to run a local devserver, run:
``` bash
$ python manage.py runserver
```