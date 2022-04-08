# Rock, Paper, Canvas


A simple game of rock paper scissors using the open source [Twemoji emoji library](https://twemoji.twitter.com/). 

## Overview:
1. Player Select - player chooses from a list of characters for their icon
2. Move Select - Select from rock, paper, or scissors
3. Outcome is displayed, after a brief animation
4. Score and 'health' are updated according to win/loss/tie.

## Asset Pre-Loading

Add more using the gameObj object

```
const gameObj = {
    rock:{
        icon: '1faa8',
        src: function(){return genSrc(this.icon)},
       loaded: false, h: 100, w: 100,},

```

## SVGs, PNGs, OMG!

Super-lite, local repo is just over 500KB 
Most game assets just over 1.5kB

58kB transfer

Canvas in Firefox does not accept SVGs with "missing" height and width properties, when user agent of Firefox is identified assets are loaded as PNG

~180 ms load time, 714 ms in Firefox

