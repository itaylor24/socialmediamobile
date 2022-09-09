export function toCorrectDate(date){
    let thisDate = new Date(date); 

    if(Math.floor((new Date()- thisDate) /1000) >= 0  && Math.floor((new Date()- thisDate) /1000)< 60){
        return Math.floor((new Date()- thisDate) /1000 ) + "s"
    }else if(Math.floor((new Date()- thisDate) /1000 /60) >= 0  && Math.floor((new Date()- thisDate) /1000 /60 )< 60){
        return Math.floor((new Date()- thisDate) /1000 /60) + "min"
    }else if(Math.floor((new Date()- thisDate) /1000 /60/60 ) >= 0  && Math.floor((new Date()- thisDate) /1000 /60/60 )< 24){
        return Math.floor((new Date()- thisDate) /1000 /60/60) + "h"; 
    }else if(Math.floor((new Date()- thisDate) /1000 /60/60 )>= 24  && Math.floor((new Date()- thisDate) /1000 /60/60 )< 48){
        return "1d"; 
    }else if(Math.floor((new Date() - thisDate) /1000 /60/60 )>= 48  && Math.floor((new Date()- thisDate) /1000 /60/60 ) < 24*7){
        return Math.floor((new Date() - thisDate) /1000 /60/60 /24)+"d"; 
    }else{
        return thisDate.toLocaleDateString(); 
    }
}
