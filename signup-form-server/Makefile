

test: unittest integrationtest

unittest:
	npm test

integrationtest:
	mkdir -p /tmp/db
	mongod --dbpath /tmp/db &
	node src/index.js &
	sleep 5

	test "$$(curl 'http://localhost:3001/ping' 2>/dev/null)" = 'pong' \
		|| echo "ping did not work"
	echo "$$(curl 'http://localhost:3001/create-event?first_name=abc&last_name=def&email=ab@de.fg&date=2000-01-01' 2>/dev/null)" \
		| grep '"id":' \
		|| echo "create event did not work"
