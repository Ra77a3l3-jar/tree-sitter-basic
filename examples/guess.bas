10 REM Number Guessing Game
20 LET N = 50
30 PRINT "Guess a number between 1 and 100"
40 INPUT G
50 IF G = N THEN 100
60 IF G < N THEN 80
70 PRINT "Too high! Try again"
75 GOTO 40
80 PRINT "Too low! Try again"
90 GOTO 40
100 PRINT "Correct! You win!"
110 END
