var game = new qwertyGame
game.reset()

document.addEventListener('keypress', evt => {
    if ('qwerasdf'.indexOf(evt.key) !== -1) {
        game.check(evt.key.toUpperCase())
    }
})


var yb = document.getElementById('yb').contentWindow
