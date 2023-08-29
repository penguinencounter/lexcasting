# Lexcasting
### A tiny "DSL" for Hex Casting + MoreIotas
DSL is in quotes because it's really just a command dispatcher.

## Security
If you use a akashic library as a function source, if the libraries are compromised (i.e. malicious patterns are installed) your player reference could be writen to an arbitrary library without your knowledge.

Before passing the focus containing the Lexcasting data, check that it doesn't contain sensitive information that was stored with `save` or similar.

## Defining fuctions
Function keys need to follow a specific form.
Here are some examples:
```
// <function-name> <argument-count> <returns?>
raycast-entity 0 r
exponent 2 r
print 1
```

Functions can be "overloaded" to support a variable number of arguments.
```
// note that there is no space at the end
// this one launches the caster
launch 1
// this one launches another entity
launch 2
```

### Special functions (operators)
The math operators +, -, *, and / are actually functions with special names.
```
// addition infix operator
+ 2 r
// subtraction infix operator
- 2 r
// multiplication infix operator
* 2 r
// division infix operator
/ 2 r
```

### Recommended standard libraries
Implementations and documentation coming soonTM
```
// simple operators
op + 2 r
op - 2 r
op * 2 r
op / 2 r
self 0 r
head 0 r
head 1 r
feet 0 r
feet 1 r
facing 0 r
facing 1 r
print 1

random 0 r
mkvec 3 r

select-entity 2 r
select-entities 2 r
select-animal 2 r
select-animals 2 r
select-monster 2 r
select-monsters 2 r
select-item 2 r
select-items 2 r
select-player 2 r
select-players 2 r
select-living 2 r
select-livings 2 r
select-not-living 2 r
select-not-livings 2 r

first 1 r
last 1 r
index 2 r
set-or 2 r
set-and 2 r
set-xor 2 r
unique 1 r

read-entity 1 r
write-entity 2

// spells
// TODO: Shorten this up (both command length and count)
explode 2
fireball 2
launch 1 (default: self)
launch 2 
blink 1 (default: self)
blink 2
place 1
break 1
place-water 1
remove-liquid 1
conjure-block 1
conjure-light 1
grow 1
edify 1
ignite 1
extinguish 1
// you could implement the nadirs here in your own library
sentinel 1
rm-sentinel 1
loc-sentinel 0 r

// load your world's great spells into your library
// to use them

// constants
true 0 r
false 0 r
null 0 r
ZERO 0 r
EAST 0 r (+X)
WEST 0 r (-X)
UP 0 r (+Y)
DOWN 0 r (-Y)
SOUTH 0 r (+Z)
NORTH 0 r (-Z)
PI 0 r
TAU 0 r
E 0 r

// common actions
rc-vec 0 r
rc-vec 1 r
rc-ent 0 r
rc-ent 1 r

// spell debugging
dump-autorefs 0
dump-stack 0
dump-cache 0

// persistant storage
save 1
load 0 r
load 1 r
load-copy 0 r
load-copy 1 r
wipe-storage 0
count-storage 0 r
dump-storage 0

// temporary storage
stash 1
stash-pop 0 r
stash-clear 0

// autoref ($0, $1, ...) manipulation
reset-autorefs 0
discard 0
```
