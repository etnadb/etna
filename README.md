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

- `SET`
- `GET`
- `DELETE`

### Query Language

```etna

SET         &string name:  "John"
^ command   ^ type  ^ key  ^ value
```