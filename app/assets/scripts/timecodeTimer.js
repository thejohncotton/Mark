let timecodeTimer = {
    timeString: '00:00:00:00',
    hours: 0,
    minutes: 0,
    seconds:0,
    frames: 0,
    reset: function(){
        this.hours = 0
        this.minutes = 0
        this.seconds = 0
        this.frames = 0
    },
    counter: function(framerate){
         let frameString, secondString, minuteString, hourString
        if (this.frames < framerate ){
            
        this.frames++
            
        } else if (this.frames === framerate){
            this.seconds ++
            this.frames = 0
        }
        if (this.seconds === 60) {
            this.seconds = 0
            this. minutes ++
        }
        if (this.minutes === 60){
            this.minutes = 0
            this.hours ++
        }
        if (this.hours === 13){
            this.hours = 1
        }

        if (parseInt(this.frames, 10) < 10) {
                    frameString = `0${this.frames}`
            } else {
                frameString = this.frames
            }
        if (parseInt(this.seconds, 10) < 10) {
                secondString = `0${this.seconds}`
            } else {
                secondString = this.seconds
            }
                if (parseInt(this.minutes, 10) < 10) {
                    minuteString = `0${this.minutes}`
                } else {
                    minuteString = this.minutes
                }
                if (parseInt(this.hours, 10) < 10) {
                    hourString = `0${this.hours}`
                } else {
                    hourString = this.hours
                }
        
        return `${hourString}:${minuteString}:${secondString}:${frameString}`

    }

}
export default timecodeTimer