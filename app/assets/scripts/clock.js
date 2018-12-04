export default function clock(){
    let date, hours, minutes, seconds, hourString, minuteString, secondString
        date = new Date()
        hours = date.getHours()
        minutes = date.getMinutes()
        seconds = date.getSeconds()
        if (parseInt(seconds, 10) < 10) {
            secondString = `0${seconds}`
        } else {
            secondString = date.getSeconds()
        }
        if (parseInt(minutes, 10) < 10) {
            minuteString = `0${minutes}`
        } else {
             minuteString = date.getMinutes()
        }
        if (parseInt(hours) > 12){
            hourString = `${hours-12}`
        } else {
            hourString = date.getHours()
        }
        return `${hourString}:${minuteString}`

    }