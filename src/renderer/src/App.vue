<template>
  <div ref="canvasBox" class="canvas_box">
    <div ref="myCanvas"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as Phaser from 'Phaser'

import Boot from './components/games/emoji-match/Boot'
import Preloader from './components/games/emoji-match/Preloader'
import MainMenu from './components/games/emoji-match/MainMenu'
import MainGame from './components/games/emoji-match/Game'

const myCanvas = ref(null)
const canvasBox = ref(null)
let game = null

onMounted(() => {
  // This is revert of https://github.com/photonstorm/phaser/commit/7cbf3840af296c2f1f510be15b39a2519f7a72cf
  // If remove below, safari doesn't play sounds
  Phaser.Scenes.SceneManager.prototype.loadComplete = function (loader) {
    const scene = loader.scene
    if (this.game.sound && this.game.sound.onBlurPausedSounds) {
      this.game.sound.unlock()
    }
    this.create(scene)
  }

  // console.log(exampleScene.sprite)
  // overlayScene = new Overlay()

  let config = {
    type: Phaser.AUTO,
    render: {
      antialias: true, // 抗锯齿
      transparent: false // 背景透明
    },
    scale: {
      mode: Phaser.Scale.FIT, // 自适应
      parent: myCanvas.value,
      autoCenter: Phaser.Scale.BOTH, // 自动居中
      width: window.innerWidth,
      height: window.innerHeight
    },
    // 渲染之前清除
    // clearBeforeRender: false,
    // 显示到console中
    title: 'Emoji Match',
    url: 'https://wxbuluo.com',
    version: '1.0',
    // banner: {
    //   text: "#ffffff",
    //   background: ["#fff200", "#38f0e8", "#00bff3", "#ec008c"],
    //   hidePhaser: true,
    // },
    banner: false,
    backgroundColor: '#2d2d2d',
    // transparent: true, // 透明，backgroundColor失效
    scene: [Boot, Preloader, MainMenu, MainGame], // 初始化完成后，默认加载第一个scene
    pixelArt: true, //将 antialias 设置为 false 并将 roundPixels 设置为 true。 这是像素艺术游戏的最佳设置
    roundPixels: true,
    audio: {
      // 音频配置对象
      // disableWebAudio: false,
      // noAudio: false, // if this is true, it works, with audio enabled it fails
    },
    physics: {
      // default: 'matter',
      // matter: {
      //   debug: true,
      //   gravity: {
      //     y: 0.3,
      //   },
      // },
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    input: {
      // mouse: false, // 移动端项目一般关掉mouse，不然会出点透bug
      activePointers: 1 // 多指触摸限制
    },
    disableContextMenu: true, // 禁用鼠标右键菜单
    loader: {
      crossOrigin: 'anonymous' // 避免图片跨域
    }
  }

  game = new Phaser.Game(config)
})

onUnmounted(() => {
  game.destroy(true)
})
</script>
<style lang="less">
@import './assets/css/styles.less';
.canvas_box {
  width: 100vw;
  height: 100vh;
}
</style>
