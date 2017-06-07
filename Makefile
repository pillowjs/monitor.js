git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
jshint:
	@${npm_bin}/jshint .
server:
	@${npm_bin}/startserver -p 8090
.PHONY: test
