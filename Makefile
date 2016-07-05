
#
# Default.
#

default: run

#
# Tasks.
#

# Remove shit.
clean:
	@rm -rf ./node_modules

# Build client.
build:
	@npm install

# Run.
run:
	@node index.js

#
# Phonies.
#

.PHONY: clean build run
