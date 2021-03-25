class qwertyGame {
    constructor() {
        this.qwerty = []
        this._currentNum = 0
        this.setQWERTY()
        this.progress
        this._mode = 'N'
        this._onDoing = false
    }


    get mode() {
        return this._mode
    }
    set mode(mode) {
        this._mode = mode
        var othermode = mode === 'N' ? 'H' : 'N'
        document.querySelector(`#button-${mode}`).toggleAttribute('disabled')
        document.querySelector(`#button-${othermode}`).toggleAttribute('disabled')

        document.getElementById('progress-bar').classList.remove('normal')
        document.getElementById('progress-bar').classList.remove('hard')
        document.getElementById('progress-bar').classList.add(mode)
        this.lastSuccess()
        return this._mode
    }

    get que() {
        return this.mode === "N" ? "QWEASD" : "QWERASDF"
    }
    get qwertyLength() {
        return this.mode === "N" ? 6 : 8
    }

    get onDoing() {
        return this._onDoing
    }
    set onDoing(bloorean) {
        this._onDoing = bloorean
    }


    get limitTime() {
        return this.mode === "N" ? 8000 : 5000
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
        this._currentNum = 0
        this.qwerty = []
        for (let i = 0; i < this.qwertyLength; i++) {
            this.qwerty[i] = this.que[Math.ceil(Math.random() * this.qwertyLength) - 1]
        }

    }

    setHTML = () => {
        // <div id="key1" class="key-container">
        //     <div class="key">
        //         <div>Q</div>
        //         <div>▲</div>
        //     </div>
        // </div>

        // var keyContainer = document.createElement('div')
        // var keyDiv = document.createElement('div')
        // var QWERTY = document.createElement('div')
        // var arrow = document.createElement('div')
        // keyContainer.classList.add('key-container')
        // keyDiv.classList.add('key')
        // keyContainer.append(keyDiv)
        // keyDiv.append(QWERTY)
        // keyDiv.append(arrow)

        if (document.getElementById('container').childElementCount === 1) {

            for (let i = 0; i < this.qwertyLength; i++) {
                var keyContainer = document.createElement('div')
                var keyDiv = document.createElement('div')
                var QWERTY = document.createElement('div')
                var arrow = document.createElement('div')

                keyContainer.classList.add('key-container')
                QWERTY.textContent = this.qwerty[i]
                keyDiv.classList.add('key')
                keyContainer.append(keyDiv)
                keyDiv.append(QWERTY)
                keyDiv.append(arrow)
                arrow.textContent = "▲"
                // console.log(keyContainer)
                document.getElementById('progress-container').before(keyContainer)
            }
        }

        document.querySelectorAll('.key-container').forEach((e, i) => {
            e.querySelector('div.key').classList = 'key'
            var _needClass = this.currentNum === i ? 'current' : this.currentNum < i ? 'before' : 'after'
            e.querySelector('div.key').classList.add(_needClass)
        })


    }

    progressStart = () => {
        clearInterval(_si)
        this.progress = this.limitTime

        var _si = setInterval(() => {
            if (!this.onDoing) {
                clearInterval(_si)
            }
            else {
                if (this.progress > 0) {
                    document.getElementById('progress-bar').style.width = "0%"
                    this.progress -= 100
                    document.getElementById('left-time').textContent = this.progress / 1000 + ' 초'
                }
                else {
                    clearInterval(_si)
                    this.fail()
                }
            }
        }, 100);

    }

    reset = () => {
        document.getElementById('progress-bar').style.width = "100%"



        document.getElementById('container').querySelectorAll('div.key-container').forEach(e => { e.remove() })

        document.getElementById('progress-container').remove()
        document.getElementById('container').innerHTML += `<div id="progress-container">
        <div id="progress-bar" class="${this.mode}" style="width:100%"></div>
        <div id="left-time">0.0 초</div>`
        this.setQWERTY()
        this.setHTML()
        this.onDoing = true
        this.progressStart()
        // FIXME 타임 깔끔하게

    }

    success = () => {
        this.addNum()
        this.setHTML()

        if (this._currentNum === this.qwertyLength) {
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
        this.onDoing = false
        this.progress = this.limitTime

        var qwertyContainer = document.getElementById('container')
        var _div = document.createElement('div')
        _div.classList.add('pop-container', type)
        document.body.append(_div)
        qwertyContainer.style.display = 'none'

        clearTimeout(_st)
        var _st = setTimeout(() => {
            qwertyContainer.style.display = null
            qwertyContainer.style.opacity = 1
            _div.remove()
            this.reset()
        }, 1 * 1000);


    }

    check = (key) => {
        this.correct === key ? this.success() : this.fail()
    }
}