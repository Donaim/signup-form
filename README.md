
# Simple signup form

This is a simple react application that implements event signup form.

The fronted is implemented in React + Redux, but there is also a server side that provides a persistent database for registered events.
The database is handled by MongoDB.

The app is well tested and can serve as an example usage of mentioned technologies.

# Deployment

Frontend is available after `npm build` in `signup-form-gui`,
but backend requires a `SERVER_ADDRESS` 
to be specified in `signup-form-gui/src/serverConnection.ts`,
and an instance of `MongoDB` to be running.
When that is done, run `node src/index.js` in `signup-form-server` 
and expect your server to be running on `http://localhost:3001`.
