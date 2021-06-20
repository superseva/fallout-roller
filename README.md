# fallout-roller
#Follout 2d20 Roller

You need to create two macros to trigger the rollers.

## For D20
crate a script macro and paste this line in to it:

```game.fallout.Dialog2d20.createDialog({diceNum:2, attribute:1, skill:0, tag:false, complication: 20})```


## for DC Die (d6)
crate a script macro and paste this line in to it: 

```game.fallout.DialogD6.createDialog({diceNum:1})```

## This should work with Dice So Nice so you can have 3d dice animation if you want