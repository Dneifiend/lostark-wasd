class qwertyGame {
    constructor() {
        this.qwerty = []
        this._currentNum = 0
        this.setQWERTY()
        this.progress
    }


    get currentNum() {
        return this._currentNum
    }

    addNum() {
        this._currentNum++
    }

    get correct() {
        return this.qwerty[this._currentNum]
    }

    setQWERTY = () => {
        this.progress = 500
        this._currentNum = 0
        for (let i = 0; i < 8; i++) {
            this.qwerty[i] = 'QWERASDF'[Math.ceil(Math.random() * 8) - 1]
        }


    }

    setHTML = () => {
        for (let i = 0; i < 8; i++) {
            document.querySelector(`.key-container:nth-child(${i + 1}) > div > div`).textContent = this.qwerty[i]
            if (i < this.currentNum) {
                document.querySelector(`.key-container:nth-child(${i + 1}) > div`).classList = ['key complete']
            }
            if (i === this.currentNum) {
                document.querySelector(`.key-container:nth-child(${i + 1}) > div`).classList = ['key current']
            }
            if (i > this.currentNum) {
                document.querySelector(`.key-container:nth-child(${i + 1}) > div`).classList = ['key']
            }

        }

    }

    reset = () => {
        this.setQWERTY()
        this.setHTML()
        document.getElementById('progress-bar').style.width = "0%"
        clearTimeout(_st)

        // FIXME 타임 깔끔하게
        var _st = setTimeout(() => {
            document.getElementById('progress-container').remove()
            document.getElementById('container').innerHTML += `<div id="progress-container">
            <div id="progress-bar"></div>
            <div id="left-time">5.0 초</div>`
        }, 1000 * 0.9)
    }

    success = () => {
        this.addNum()
        this.setHTML()
        if (this._currentNum === this.qwerty.length) {
            this.lastSuccess()
        }
    }

    fail = () => {
        this.pop('fail')
    }

    lastSuccess = () => {
        this._currentNum = 0
        this.pop('success')
    }

    pop = (type) => {
        var qwertyContainer = document.getElementById('container')
        var _div = document.createElement('div')
        _div.classList.add('pop-container', type)
        document.body.append(_div)
        qwertyContainer.style.display = 'none'
        clearInterval(_st)
        var _st = setTimeout(() => {
            qwertyContainer.style.display = null
            qwertyContainer.style.opacity = 1
            _div.remove()
        }, 0.8 * 1000);
        this.reset()

    }

    check = (key) => {
        this.correct === key ? this.success() : this.fail()
    }
}