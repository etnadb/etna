<img src="/docs/cover.png" />

# WORK IN PROGRESS - DEVELOP BRANCH


# EQL - Etna Query Language

### Short Demonstration

```etna
SET &string name: "Mitch"
# => OK. name: "Mitch"

SET &int age: "24"
# => OK. age: 24

GET name
# => "Mitch"

GET age
# => 24

DELETE name
# => OK. DELETED name
```

### Types
Etna currently supports five basic types:

- `&string`
- `&integer`
- `&float`
- `&null`
- `&json`

### Commands
Etna currently supports three basic commands:

- `SET`
- `GET`
- `DELETE`

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