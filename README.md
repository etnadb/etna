<img src="/docs/cover.png" />

[![Build Status](https://travis-ci.org/etnadb/etna.svg?branch=master)](https://travis-ci.org/etnadb/etna)
[![Coverage](https://img.shields.io/codecov/c/github/etnadb/etna.svg)](https://codecov.io/gh/etnadb/etna)
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/jsmonday)](https://opencollective.com/jsmonday)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/etnadb/etna/blob/master/LICENSE.md)

<h1 align="center"> WORK IN PROGRESS </h1>

# EQL - Etna Query Language

### Short Demonstration

```etna
SET &string name "Mitch"
# => OK.

SET &int age "24"
# => OK.

GET name
# => "Mitch"

GET age
# => 24

DELETE name
# => OK.

EXIST name
# => false
```

### Types
Etna currently supports six basic types:

| Type    | Alias |
|---------|-------|
| &string | &s    |
| &int    | &i    |
| &float  | &f    |
| &bool   | &b    |
| &null   | &n    |
| &json   | &j    |

### Commands
Etna currently supports four basic commands:

- `SET`
- `GET`
- `DELETE`
- `EXIST`

### Query Language

Set a new value of type string and `name` as its key:
```etna
SET       &string   name  "John"
^         ^         ^      ^
command   type      key    value
```

Get the `name` value:
```etna
GET       name
^         ^
command   key
```

Delete the `name` value:
```etna
DELETE    name
^         ^
command   key
```

Check if the `name` key exists:
```etna
EXIST     name
^         ^
command   key
```
