const Settings = require('../settings')

module.exports = {
  timer: 300,
  lobbyTimer: 5,
  tickTimer: 0,
  lobbyTickTimer: 0,
  inGame: false,
  getTimer() {
    if(this.timer <= 0) {
      return {min:0, sec:0, finished:true}
    }
    if(this.tickTimer >= Settings.tickRate) {
      this.timer--;
      this.tickTimer = 0;
    } else {
      this.tickTimer++;
    }
    const min = Math.floor(this.timer/60);
    const sec = this.timer%60;
    return {min:min, sec:sec, finished:false};
  },
  getLobbyTimer() {
    if(this.lobbyTimer <= 0) {
      return {min:0, sec:0, finished:true}
    }
    if(this.lobbyTickTimer >= Settings.tickRate) {
      this.lobbyTimer--;
      this.lobbyTickTimer = 0;
    } else {
      this.lobbyTickTimer++;
    }
    const min = Math.floor(this.lobbyTimer/60);
    const sec = this.lobbyTimer%60;
    return {min:min, sec:sec, finished:false};
  }
}