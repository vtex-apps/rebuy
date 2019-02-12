# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Use `store-graphql` to fetch user's last order from OMS API
- Rebuy button now correctly rebuilds order

## [1.1.1] - 2019-01-29
### Fixed
- Remove `inheritComponent` from blocks.

## [1.1.0] - 2019-01-18
### Changed
- Update React builder to 3.x
- Bump vtex.styleguide to 9.x.

## [1.0.0] - 2019-01-10
### Changed
- Add support to store builder.

## [0.2.0] - 2018-11-30
### Changed
- Removes spinner and adds transition when customer data is loaded

## [0.1.2] - 2018-11-07
### Added
- Add Link to the products from last order. 

## [0.1.1] - 2018-11-05
### Added
- Error checking and warning when schema is not working

### Removed
- Option to configure the schema name

## [0.1.0] - 2018-11-01
### Added
- MVP of `vtex.rebuy` app with basic listing of last order items with add to cart functionality