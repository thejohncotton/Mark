let hours, minutes, seconds, frames
hours = 0
minutes = 0
seconds = 0
frames = 0      
var counter= function(framerate){
    let frameString, secondString, minuteString, hourString
    if (frames < framerate ){
        
    frames++
        
    } else if (frames === framerate){
        seconds ++
        frames = 0
    }
    if (seconds === 60) {
        seconds = 0
        minutes ++
    }
    if (minutes === 60){
        minutes = 0
        hours ++
    }
    if (hours === 13){
        hours = 1
    }

    if (parseInt(frames, 10) < 10) {
                frameString = `0${frames}`
        } else {
            frameString = frames
        }
    if (parseInt(seconds, 10) < 10) {
            secondString = `0${seconds}`
        } else {
            secondString = seconds
        }
            if (parseInt(minutes, 10) < 10) {
                minuteString = `0${minutes}`
            } else {
                 minuteString = minutes
            }
            if (parseInt(hours, 10) < 10) {
                hourString = `0${hours}`
            } else {
                 hourString = hours
            }
    
    return `${hourString}:${minuteString}:${secondString}:${frameString}`

}
export default hours; minutes; seconds; frames; counter;