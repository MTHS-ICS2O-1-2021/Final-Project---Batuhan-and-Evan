/* global Phaser */

// Copyright (c) 2022 Batuhan Durhan All rights reserved
//
// Created by: Batuhan Durhan
// Created on: April 2022
// This is the game Scene

class GameScene extends Phaser.Scene {
  // create an alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 5; // this will get a number between 1 and 1920
    let alienXVelocity = Math.floor(Math.random() * 50) + 1; // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, "alien");
    anAlien.body.velocity.y = 800;
    anAlien.body.velocity.x = 0;
    this.alienGroup.add(anAlien);
  }

  constructor() {
    super({ key: "gameScene" });

    this.gameOverText = null
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#000000",
      align: "center",

    this.ship = null;
  }


  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a");
  }

  preload() {
    console.log("Game Scene");

    //images
    this.load.image("starBackground", "assets/road.png");
    this.load.image("ship", "assets/car.png");
    this.load.image("alien", "assets/trucker.png");
    this.load.image("square", "assets/Redsquare.png");

    //sound
    this.load.audio("bomb", "assets/siuu.mp3");
    this.load.audio("music", "assets/thomas.mp3");
  }

  create(data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0);
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship");

    // create a group for the aliens
    this.alienGroup = this.add.group();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();
    this.createAlien();

    // Collision between ship and aliens
    this.sound.play("music");
    this.physics.add.collider(
      this.ship,
      this.alienGroup,
      function (shipCollide, alienCollide) {
        this.sound.play("bomb");
        this.physics.pause();
        alienCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! \nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
      }.bind(this)
    );
  }

  update(time, delta) {
    // called 60 times a second, hopefully!

    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }

    this.alienGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.x = Math.floor(Math.random() * 1920) + 1;
        item.y = -100;
      }
    });
  }
}

export default GameScene;
