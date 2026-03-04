/* Lexer */
%lex
%%
\s+                   { /* skip whitespace */; }
<<<<<<< HEAD
"//.*"                { /* skip oneline comments */; }
[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)? {return 'NUMBER';  }
"**"                  { return 'OP';           }
[-+*/]                { return 'OP';           }
=======
[0-9]+(\.[0-9]+)?     { return 'NUMBER';       }
"**"                  { return 'OPOW';         }
[+\-]                 { return 'OPAD';         }
[*/]                  { return 'OPMU';         }
"("                   { return '(';            }
")"                   { return ')';            }
>>>>>>> doc
<<EOF>>               { return 'EOF';          }
.                     { return 'INVALID';      }
/lex

/* Parser */
%start expressions
%token NUMBER
%%

expressions
    : expression EOF
        { return $expression; }
    ;

expression
    : expression OPAD term
        { $$ = operate($OPAD, $expression, $term); }
    | term
        { $$ = $term; }
    ;

term
    : term OPMU rexp
        { $$ = operate($OPMU, $term, $rexp); }
    | rexp
        { $$ = $rexp; }
    ;

rexp
    : factor OPOW rexp
        { $$ = operate($OPOW, $factor, $rexp); }
    | factor
        { $$ = $factor; }
    ;

factor
    : NUMBER
        { $$ = convert(yytext); }
    | '(' expression ')'
        { $$ = $expression; }
    ;
%%

function convert(str) {
    return str.includes('.') ? parseFloat(str) : parseInt(str, 10);
}

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}
