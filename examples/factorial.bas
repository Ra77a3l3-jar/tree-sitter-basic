10 REM Factorial Calculator
20 INPUT "Enter a number: ", N
30 LET F = 1
40 FOR I = 1 TO N
50   LET F = F * I
60 NEXT I
70 PRINT "Factorial of "; N; " is "; F
80 END
