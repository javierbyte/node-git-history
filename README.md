# node-git-history

A dependency-free git log wrapper for node to get a git repo history data.

Tested on node 8 and git 2.

## How to use
```
nodeGitHistory(PATH, OPTIONS)
```

See the [Argument options](#argument-options) section.

### Example
```js
const nodeGitHistory = require('node-git-history');

nodeGitHistory("/", [
	"H", // commit hash
	"an", // author name
	"ae", // author email
	"ad", // author date
	"s" // subject
])
	.then(res => {
		console.log(`RESPONSE`, res)

		/*
			'res' is going to look like this:
		  { H: '0b8c4b541d955a02168064c4d5782d054fc54a87',
		    an: 'Javier Bórquez',
		    ae: 'javierbyte@Javiers-MacBook.local',
		    ad: 'Sun Apr 30 19:18:05 2017 -0600',
		    s: 'Add dist code' },
		  { H: '39cdee04986274252b834fd7a80a147a27ac0961',
		    an: 'Javier Bórquez',
		    ae: 'javierbyte@Javiers-MacBook.local',
		    ad: 'Sun Apr 30 19:15:47 2017 -0600',
		    s: 'Initial commit' } ]
		*/
	})

```


## Argument options
* 'H': 'Commit hash',
* 'h': 'Abbreviated commit hash',
* 'T': 'Tree hash',
* 't': 'Abbreviated tree hash',
* 'P': 'Parent hashes',
* 'p': 'Abbreviated parent hashes',
* 'an': 'Author name',
* 'ae': 'Author email',
* 'ad': 'Author date (format respects the --date=option)',
* 'ar': 'Author date, relative',
* 'cn': 'Committer name',
* 'ce': 'Committer email',
* 'cd': 'Committer date',
* 'cr': 'Committer date, relative',
* 's': 'Subject,