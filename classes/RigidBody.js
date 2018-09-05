const GameObject = require('./GameObject');
const Physics = require('./Physics')

class RigidBody extends GameObject {
  constructor(params) {
    super(params);
    this.fixed = false
  }

  update() {
    super.update();
  }

  onRigidCollision(collider) {
    if (collider instanceof RigidBody && !this.fixed) {
      // Collision solver from https://www.ibm.com/developerworks/library/wa-build2dphysicsengine/index.html

      var dx = 2*(collider.x - this.x) / collider.width;
      var dy = 2*(collider.y - this.y) / collider.height;

      var absDX = Math.abs(dx);
      var absDY = Math.abs(dy);
      
      if (Math.abs(absDX - absDY) < .1) {

        if (dx < 0) {
          this.x = collider.x + collider.width;
        } else {
          this.x = collider.x - this.width;
        }

        if (dy < 0) {
          this.y = collider.y + collider.height;
        } else {
          this.y = collider.y - this.height;
        }

        if (Math.random() < .5) {
          this.velX = 0;
        } else {
          this.velY = 0;
        }

      } else if (absDX > absDY) {

        if (dx < 0) {
          this.x = collider.x + collider.width;
        } else {
          this.x = collider.x - this.width;
        }
        this.velX = 0;

      } else {

        if (dy < 0) {
          this.y = collider.y + collider.height;

        } else {
          this.y = collider.y - this.height;
        }
        this.velY = 0;
      }
    }
  }

  static collisionDetection() {
    for(var i=0; i < GameObject.list.length; i++) {
      for(var j=0; j < GameObject.list.length; j++) {
        if(j !== i) {
          const rectA = GameObject.list[i].getBounds();
          const rectB = GameObject.list[j].getBounds();
          if(Physics.rectIntersect(rectA, rectB)) {
            GameObject.list[i].onCollision(GameObject.list[j])
            if(GameObject.list[i] instanceof RigidBody && GameObject.list[j] instanceof RigidBody) {
              RigidBody.collisionHandler(GameObject.list[i], GameObject.list[j])
            }
          }
        }
      }
    }
  }

  static collisionHandler(bodyA, bodyB) {
    bodyB.x -= bodyB.velX;
    bodyB.y -= bodyB.velY;
    bodyA.x -= bodyA.velX;
    bodyA.y -= bodyA.velY;
    // if(bodyA.fixed) {
    //   bodyB.onRigidCollision(bodyA)
    // } else if(bodyB.fixed) {
    //   bodyA.onRigidCollision(bodyB)
    // } else {
    //   //halts both players
    //   bodyB.x -= bodyB.velX;
    //   bodyB.y -= bodyB.velY;
    //   bodyA.x -= bodyA.velX;
    //   bodyA.y -= bodyA.velY;
    // }
  }
}

module.exports = RigidBody;