// import 资源文件
// import background
import background from '/games/emoji-match/background.png?url'
// import logo
import logo from '/games/emoji-match/logo.png?url'
// import emojis
import emojis from '/games/emoji-match/emojis.png?url'
// import emojis json
import emojisJson from '/games/emoji-match/emojis.json?url'
// import music
import music from '/games/emoji-match/sounds/music.mp3?url'
// import countdown
import countdown from '/games/emoji-match/sounds/countdown.mp3?url'
// import match
import match from '/games/emoji-match/sounds/match.mp3?url'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader')

    this.loadText
  }

  preload() {
    let scaleX = this.game.config.width / 800
    let scaleY = this.game.config.height / 600
    this.loadText = this.add.text(400 * scaleX, 300 * scaleY, 'Loading ...', {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#e3f2ed'
    })

    this.loadText.setOrigin(0.5)
    this.loadText.setStroke('#203c5b', 6)
    this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false)

    // this.load.setPath('/games/emoji-match/')
    // this.load.image(['background', 'logo'])
    // this.load.atlas('emojis', 'emojis.png', 'emojis.json?url')

    // //  Audio ...
    // this.load.setPath('/games/emoji-match/sounds/')

    // this.load.audio('music', ['music.mp3?url'])
    // this.load.audio('countdown', ['countdown.mp3?url'])
    // this.load.audio('match', ['match.mp3?url'])

    this.load.image('background', background)
    this.load.image('logo', logo)
    this.load.atlas('emojis', emojis, emojisJson)
    this.load.audio('music', music)
    this.load.audio('countdown', countdown)
    this.load.audio('match', match)
  }

  create() {
    if (this.sound.locked) {
      this.loadText.setText('Click to Start')

      this.input.once('pointerdown', () => {
        this.scene.start('MainMenu')
      })
    } else {
      this.scene.start('MainMenu')
    }
  }
}
