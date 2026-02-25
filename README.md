# Syntax Directed Translation with Jison

Jison is a tool that receives as input a Syntax Directed Translation and produces as output a JavaScript parser  that executes
the semantic actions in a bottom up ortraversing of the parse tree.
 

## Compile the grammar to a parser

See file [grammar.jison](./src/grammar.jison) for the grammar specification. To compile it to a parser, run the following command in the terminal:
``` 
➜  jison git:(main) ✗ npx jison grammar.jison -o parser.js
```

## Use the parser

After compiling the grammar to a parser, you can use it in your JavaScript code. For example, you can run the following code in a Node.js environment:

```
➜  jison git:(main) ✗ node                                
Welcome to Node.js v25.6.0.
Type ".help" for more information.
> p = require("./parser.js")
{
  parser: { yy: {} },
  Parser: [Function: Parser],
  parse: [Function (anonymous)],
  main: [Function: commonjsMain]
}
> p.parse("2*3")
6
```

# Desarrollo

1. Se ha completado iniciado el proyecto con `npm i`, se ha producido el parser y se ha ejecutado la test suite
2.
2.1. La direfencia de devolver un token y skip whitespaces es que al leer un espacio en blanco queremos ignorar esos caracteres para producir la salida porque no necesitamos reglas para estos espacios en blanco.
2.2. La salida seria 'NUMBER OP NUMBER OP INVALID'
2.3. Indicamos antes ** porque si pusieramos primero los demás operadores, una entrada de ** casaria primero con el operador * que con el operador **.
2.4. Se devuelve EOF unicamente cuando llegamos al final del input del parser.
2.5. La reglas '.' es necesaria para tener un caso de accion ante entradas no contempladas en nuestro lenguaje, asi podemos devolver un error.
3. Se ha modificado grammar.jison añadiendo una regla que dice //.* { /* skip oneline comments */; }
4. Se han añadido las reglas `[0-9]\.[0-9]+[eE][+-][0-9]+ {return 'NUMBER'; }` y `[0-9]+\.[0-9]+ { return 'NUMBER'; }`
5. Hemos probado 2.35e+3 desde el grammar.jison
