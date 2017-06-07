git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm i --force
jshint:
	@${npm_bin}/jshint .
server:
	@${npm_bin}/startserver -p 8090
test: install
	@node ./test/render.test.js
xvfb:
  export DISPLAY=:99.0 Xvfb :99 -screen 0 1366x768x24 > /dev/null 2>&1 &
ci:
	docker run -it -v `pwd`:/src --entrypoint=bash --rm macacajs/macaca-electron-docker:latest -c "cd /src && make xvfb && make test"

.PHONY: test
