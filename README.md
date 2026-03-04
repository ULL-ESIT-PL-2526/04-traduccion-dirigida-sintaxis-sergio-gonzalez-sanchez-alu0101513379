# Syntax Directed Translation with Jison

Jison recibe una Traducción Dirigida por la Sintaxis y genera un parser JavaScript que ejecuta las acciones semánticas en un recorrido bottom-up del árbol de análisis.

## Compilar la gramática

```
npm run build
```

## Ejecutar

<<<<<<< HEAD
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
=======
```
npm start
node src/index.js "2 + 3 * 4"
```

## Tests

```
npm test
```

---

# Desarrollo (Práctica 4)

1. Se inició el proyecto con `npm i`, se produjo el parser y se ejecutó la suite de tests.
   - 2.1. Al leer espacios en blanco, se omiten sin producir token para no generar ruido en el análisis.
   - 2.2. La salida sería `NUMBER OP NUMBER OP INVALID`.
   - 2.3. `**` se declara antes que `[*/]` para que el lexer lo reconozca como un único token y no como dos `*`.
   - 2.4. `EOF` se devuelve únicamente al alcanzar el final del input.
   - 2.5. La regla `.` captura cualquier carácter no reconocido y devuelve `INVALID`, evitando fallos silenciosos.

---

# Práctica 4.5

1.1. Las tres frases (`4.0-2.0*3.0`, `2**3**2`, `7-4/2`) tienen la misma derivación izquierda: `L ⟹ E eof ⟹ E op T eof ⟹ E op T op T eof ⟹ T op T op T eof ⟹ number op number op number eof`.
1.2. El árbol crece siempre a la izquierda por la recursión izquierda de `E → E op T`, agrupando `(4.0-2.0)*3.0`, `(2**3)**2` y `(7-4)/2`.
1.3. Las acciones se evalúan bottom-up: primero los números hoja, luego los nodos internos de izquierda a derecha. Resultados: `6.0` (en vez de `-2.0`), `64` (en vez de `512`), `1.5` (en vez de `5`). La SDD no respeta la precedencia matemática porque todos los operadores comparten nivel en la gramática.
1.4. Se añadieron tests de precedencia en `parser.test.js`; con la gramática original los 6 tests fallaban.

2. Se reestructuró `src/grammar.jison` con tres niveles de no-terminales (`E`/`T`/`R`/`F`) y tres tokens (`opad`, `opmu`, `opow`). `+`/`-` son asociativos por la izquierda (menor precedencia), `*`/`/` también por la izquierda (precedencia media) y `**` es asociativo por la derecha mediante recursión derecha en `R → F opow R` (mayor precedencia).

3. Se añadieron tests de precedencia y asociatividad con operandos flotantes en `parser.test.js`.

4. Se añadió la producción `F → ( E )` al grammar y los tokens `(` y `)` al lexer, permitiendo que cualquier expresión actúe como factor.

5. Se añadieron tests de paréntesis en `parser.test.js`: cambio de precedencia, anulación de asociatividad derecha de `**`, anidamiento, flotantes y error ante paréntesis desbalanceados.
>>>>>>> doc
