<img src="/docs/cover.png" />

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
Etna currently supports five basic types:

- `&string`
- `&integer`
- `&float`
- `&null`
- `&json`

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