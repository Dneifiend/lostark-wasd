var game = new qwertyGame
game.reset()
// game.setQWERTY()
// game.setHTML()

document.addEventListener('keypress', evt => {
    if (game.onDoing) {
        if ('qwerasdf'.indexOf(evt.key) !== -1) {
            game.check(evt.key.toUpperCase())
        }
    }
})


// var yb = document.getElementById('yb').contentWindow
