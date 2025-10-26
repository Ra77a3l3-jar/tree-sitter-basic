module.exports = grammar({
  name: 'basic',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  conflicts: $ => [
    [$.line_number_statement],
    [$.print_statement],
    [$.next_statement],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.line_number_statement,
      $.print_statement,
      $.let_statement,
      $.if_statement,
      $.goto_statement,
      $.gosub_statement,
      $.return_statement,
      $.for_statement,
      $.next_statement,
      $.input_statement,
      $.end_statement,
      $.rem_statement,
      $.data_statement,
      $.read_statement,
      $.dim_statement,
    ),

    line_number_statement: $ => seq(
      field('line_number', $.number),
      optional($._line_content),
    ),

    _line_content: $ => choice(
      $.print_statement,
      $.let_statement,
      $.if_statement,
      $.goto_statement,
      $.gosub_statement,
      $.return_statement,
      $.for_statement,
      $.next_statement,
      $.input_statement,
      $.end_statement,
      $.rem_statement,
      $.data_statement,
      $.read_statement,
      $.dim_statement,
    ),

    print_statement: $ => seq(
      alias(/[Pp][Rr][Ii][Nn][Tt]/, 'PRINT'),
      optional(seq(
        $._expression,
        repeat(seq(
          choice(',', ';'),
          $._expression
        ))
      ))
    ),

    let_statement: $ => seq(
      optional(alias(/[Ll][Ee][Tt]/, 'LET')),
      field('variable', $.identifier),
      '=',
      field('value', $._expression)
    ),

    if_statement: $ => seq(
      alias(/[Ii][Ff]/, 'IF'),
      field('condition', $._expression),
      alias(/[Tt][Hh][Ee][Nn]/, 'THEN'),
      field('consequence', choice(
        $.line_number,
        $._line_content
      ))
    ),

    goto_statement: $ => seq(
      alias(/[Gg][Oo][Tt][Oo]/, 'GOTO'),
      field('target', $.line_number)
    ),

    gosub_statement: $ => seq(
      alias(/[Gg][Oo][Ss][Uu][Bb]/, 'GOSUB'),
      field('target', $.line_number)
    ),

    return_statement: $ => alias(/[Rr][Ee][Tt][Uu][Rr][Nn]/, 'RETURN'),

    for_statement: $ => seq(
      alias(/[Ff][Oo][Rr]/, 'FOR'),
      field('variable', $.identifier),
      '=',
      field('start', $._expression),
      alias(/[Tt][Oo]/, 'TO'),
      field('end', $._expression),
      optional(seq(
        alias(/[Ss][Tt][Ee][Pp]/, 'STEP'),
        field('step', $._expression)
      ))
    ),

    next_statement: $ => seq(
      alias(/[Nn][Ee][Xx][Tt]/, 'NEXT'),
      optional(field('variable', $.identifier))
    ),

    input_statement: $ => seq(
      alias(/[Ii][Nn][Pp][Uu][Tt]/, 'INPUT'),
      optional(seq(
        field('prompt', $.string),
        choice(',', ';')
      )),
      field('variable', $.identifier)
    ),

    end_statement: $ => alias(/[Ee][Nn][Dd]/, 'END'),

    rem_statement: $ => seq(
      alias(/[Rr][Ee][Mm]/, 'REM'),
      field('text', $.comment_text)
    ),

    data_statement: $ => seq(
      alias(/[Dd][Aa][Tt][Aa]/, 'DATA'),
      $._expression,
      repeat(seq(',', $._expression))
    ),

    read_statement: $ => seq(
      alias(/[Rr][Ee][Aa][Dd]/, 'READ'),
      $.identifier,
      repeat(seq(',', $.identifier))
    ),

    dim_statement: $ => seq(
      alias(/[Dd][Ii][Mm]/, 'DIM'),
      $.array_declaration,
      repeat(seq(',', $.array_declaration))
    ),

    array_declaration: $ => seq(
      $.identifier,
      '(',
      $._expression,
      repeat(seq(',', $._expression)),
      ')'
    ),

    _expression: $ => choice(
      $.number,
      $.string,
      $.identifier,
      $.binary_expression,
      $.unary_expression,
      $.parenthesized_expression,
      $.function_call,
    ),

    binary_expression: $ => choice(
      prec.left(1, seq($._expression, choice('OR', 'or'), $._expression)),
      prec.left(2, seq($._expression, choice('AND', 'and'), $._expression)),
      prec.left(3, seq($._expression, choice('=', '<>', '<', '>', '<=', '>='), $._expression)),
      prec.left(4, seq($._expression, choice('+', '-'), $._expression)),
      prec.left(5, seq($._expression, choice('*', '/'), $._expression)),
      prec.right(6, seq($._expression, '^', $._expression)),
    ),

    unary_expression: $ => prec(7, seq(
      choice('+', '-', alias(/[Nn][Oo][Tt]/, 'NOT')),
      $._expression
    )),

    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')'
    ),

    function_call: $ => seq(
      field('function', choice(
        /[Aa][Bb][Ss]/,
        /[Ss][Ii][Nn]/,
        /[Cc][Oo][Ss]/,
        /[Tt][Aa][Nn]/,
        /[Ss][Qq][Rr]/,
        /[Ll][Ee][Nn]/,
        /[Vv][Aa][Ll]/,
        /[Aa][Ss][Cc]/,
        /[Cc][Hh][Rr]\$/,
        /[Ll][Ee][Ff][Tt]\$/,
        /[Rr][Ii][Gg][Hh][Tt]\$/,
        /[Mm][Ii][Dd]\$/,
      )),
      '(',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ')'
    ),

    identifier: $ => /[A-Za-z][A-Za-z0-9]*\$?/,

    line_number: $ => $.number,

    number: $ => /\d+(\.\d+)?/,

    string: $ => /"[^"]*"/,

    comment: $ => token(seq("'", /.*/)),

    comment_text: $ => /.*/,
  }
});
