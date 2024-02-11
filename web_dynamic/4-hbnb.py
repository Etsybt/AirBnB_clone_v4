#!/usr/bin/python3
"""
Flask App
"""
from flask import Flask, render_template
from models import storage
import uuid

# Flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# Handle teardown of the database connection
@app.teardown_appcontext
def teardown_db(exception):
    """
    Closes the SQLAlchemy session after each request
    """
    storage.close()


@app.route('/4-hbnb/')
def hbnb():
    """
    Renders a custom template with states, cities, and amenities
    """
    state_objs = storage.all('State').values()
    states = dict([(state.name, state) for state in state_objs])
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([(user.id, f"{user.first_name} {user.last_name}")
                  for user in storage.all('User').values()])
    cache_id = uuid.uuid4()
    return render_template('4-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    Main function to run the Flask app
    """
    app.run(host=host, port=port)
