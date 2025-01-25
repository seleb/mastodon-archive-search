# [1.5.0](https://github.com/seleb/mastodon-archive-search/compare/v1.4.0...v1.5.0) (2025-01-25)


### Bug Fixes

* avoid exact + inexact highlight overlaps ([29c40be](https://github.com/seleb/mastodon-archive-search/commit/29c40beb64a5ddf67e6a5efec60eaab1507c95ed))
* avoid immediate flicker on stale ([f13c12d](https://github.com/seleb/mastodon-archive-search/commit/f13c12d3e1d38959bd57cc23c174836d5024f5d3))
* error case being flagged as stale ([bb2c1a6](https://github.com/seleb/mastodon-archive-search/commit/bb2c1a647e35d7bc3a7f2a01c467547cd1fdb041))
* improve highlight performance ([e05647a](https://github.com/seleb/mastodon-archive-search/commit/e05647a0e3d923c0b85b2a2bf7589b9d60992ac4))
* results showing all posts instead of 0 posts on load ([6e31bb4](https://github.com/seleb/mastodon-archive-search/commit/6e31bb47a75a88c4cbc5011c011fe0cebd1e6c04))
* simplify highlight ([1efbeba](https://github.com/seleb/mastodon-archive-search/commit/1efbebaa94fa830de9ce67857cfdcfa87eef332d))
* stable scroll gutters ([ed9b76c](https://github.com/seleb/mastodon-archive-search/commit/ed9b76c2373e4fbd2bc00a1fb88624e4708d2a9a))


### Features

* add web worker support to avoid blocking input while searching ([796f87a](https://github.com/seleb/mastodon-archive-search/commit/796f87ab21a4ce1f81f0fd161641c83934669aa4))
* lazy-load search items to improve performance ([9dc0a9b](https://github.com/seleb/mastodon-archive-search/commit/9dc0a9b2f487b491b18225f9175994f2667eac95))
* remove 3 character minimum ([bf412a1](https://github.com/seleb/mastodon-archive-search/commit/bf412a17240ea391dca543425d79ac4723ff5531))
* show loading state while indexing posts ([f722cf7](https://github.com/seleb/mastodon-archive-search/commit/f722cf74127874adc4bc5a26ce5e7e480c1f2a56))

# [1.4.0](https://github.com/seleb/mastodon-archive-search/compare/v1.3.7...v1.4.0) (2024-12-14)


### Features

* show number of matching posts ([bda4fe5](https://github.com/seleb/mastodon-archive-search/commit/bda4fe5fc5b6e7c6157d9b0445942baa664ec1b0))

## [1.3.7](https://github.com/seleb/mastodon-archive-search/compare/v1.3.6...v1.3.7) (2024-05-30)


### Bug Fixes

* search highlight breaking html ([7a4ac9e](https://github.com/seleb/mastodon-archive-search/commit/7a4ac9e8fb2ec0dd457425835c501d16345b9b32))

## [1.3.6](https://github.com/seleb/mastodon-archive-search/compare/v1.3.5...v1.3.6) (2024-05-28)


### Bug Fixes

* more permissive tokenizer ([3997227](https://github.com/seleb/mastodon-archive-search/commit/399722773b791804553cc5bbe0c268b2fb5ce8fd))

## [1.3.5](https://github.com/seleb/mastodon-archive-search/compare/v1.3.4...v1.3.5) (2024-05-18)


### Bug Fixes

* version display in footer ([0a4727d](https://github.com/seleb/mastodon-archive-search/commit/0a4727d64a80294a4bb4c685216d34b1adafe5fb))

## [1.3.4](https://github.com/seleb/mastodon-archive-search/compare/v1.3.3...v1.3.4) (2024-05-09)


### Bug Fixes

* twitter card title ([97cecf0](https://github.com/seleb/mastodon-archive-search/commit/97cecf0a8df5e9d9ecfa6c2ef732d8c64b484538))

## [1.3.3](https://github.com/seleb/mastodon-archive-search/compare/v1.3.2...v1.3.3) (2024-05-09)


### Bug Fixes

* html templating ([c2fbb26](https://github.com/seleb/mastodon-archive-search/commit/c2fbb26b558a4943a949941ab7194ed724ec452c))

## [1.3.2](https://github.com/seleb/mastodon-archive-search/compare/v1.3.1...v1.3.2) (2024-05-09)


### Bug Fixes

* link preview ([c99deac](https://github.com/seleb/mastodon-archive-search/commit/c99deacd23f14de966861e103e97604e0711622c))

## [1.3.1](https://github.com/seleb/mastodon-archive-search/compare/v1.3.0...v1.3.1) (2024-05-09)


### Bug Fixes

* icon ([f54149f](https://github.com/seleb/mastodon-archive-search/commit/f54149fa39f29be35f302a46048b4ea1f9f782e5))

# [1.3.0](https://github.com/seleb/mastodon-archive-search/compare/v1.2.0...v1.3.0) (2024-05-09)


### Bug Fixes

* case-insensitive highlighting ([216b65c](https://github.com/seleb/mastodon-archive-search/commit/216b65cfcd06256a48f0f1c1626429e99d8b2360))
* content summaries not properly highlighted ([6ddaafa](https://github.com/seleb/mastodon-archive-search/commit/6ddaafa4d0d0c74aa6db5e6f52261719a2647230))


### Features

* add date-based sort options ([39b17b0](https://github.com/seleb/mastodon-archive-search/commit/39b17b028f05a3fa1d09a7721daf9223eb8a81ca))

# [1.2.0](https://github.com/seleb/mastodon-archive-search/compare/v1.1.0...v1.2.0) (2024-05-09)


### Bug Fixes

* alt text respects whitespace ([30304fc](https://github.com/seleb/mastodon-archive-search/commit/30304fcd2d6d822d60881ccd398ff16984b4db9f))


### Features

* allow img alt text to be selected ([41ad3c4](https://github.com/seleb/mastodon-archive-search/commit/41ad3c46e6ea7c74e3de8665b7fc84cbac0958bb))
* img alt is highlighted with search term ([dacd404](https://github.com/seleb/mastodon-archive-search/commit/dacd4049222db2b3348e979f5720f95dd5d92d10))
* individual token matches are also subtly highlighted ([b6097c4](https://github.com/seleb/mastodon-archive-search/commit/b6097c4e328390ce4e20da26859736aea779d13d))

# [1.1.0](https://github.com/seleb/mastodon-archive-search/compare/v1.0.5...v1.1.0) (2024-04-24)


### Features

* use actual search input element ([64b5004](https://github.com/seleb/mastodon-archive-search/commit/64b500450518737a36edd54a28a168097e805298))

## [1.0.5](https://github.com/seleb/mastodon-archive-search/compare/v1.0.4...v1.0.5) (2024-04-24)


### Bug Fixes

* error type safety ([309f78c](https://github.com/seleb/mastodon-archive-search/commit/309f78c779a81a9c020b1a0cced8ce082317b018))
* noscript location ([71c8bfd](https://github.com/seleb/mastodon-archive-search/commit/71c8bfdde6c3529017d5274af86a199c055cd4d9))
* search input placeholder ([98dfae1](https://github.com/seleb/mastodon-archive-search/commit/98dfae1947d22b1e882db39337a2bb2be9325045))

## [1.0.4](https://github.com/seleb/mastodon-archive-search/compare/v1.0.3...v1.0.4) (2024-04-24)


### Bug Fixes

* build dir ([4b6f919](https://github.com/seleb/mastodon-archive-search/commit/4b6f9196666e8a8354304ef2501a932843b6e33e))

## [1.0.3](https://github.com/seleb/mastodon-archive-search/compare/v1.0.2...v1.0.3) (2024-04-24)


### Bug Fixes

* disable success comment/fail title ([1b5a3fb](https://github.com/seleb/mastodon-archive-search/commit/1b5a3fb17653d226e48d9ec9c6c9678c4fad9602))

## [1.0.2](https://github.com/seleb/mastodon-archive-search/compare/v1.0.1...v1.0.2) (2024-04-24)


### Bug Fixes

* release versions ([91fc8b6](https://github.com/seleb/mastodon-archive-search/commit/91fc8b60b4395567aabfb770552942c345d1b62d))

## [1.0.1](https://github.com/seleb/mastodon-archive-search/compare/v1.0.0...v1.0.1) (2024-04-24)


### Bug Fixes

* build ([f557cc2](https://github.com/seleb/mastodon-archive-search/commit/f557cc207e7bfcf170555d9e3ec3483f3e58b109))

# 1.0.0 (2024-04-24)


### Features

* initial release ([1575f2a](https://github.com/seleb/mastodon-archive-search/commit/1575f2a37a4e050c09a71a052ce7181bc6256ff7))
