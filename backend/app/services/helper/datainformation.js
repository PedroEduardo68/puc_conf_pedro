export const createNameDataFile = () =>{
    const dateToday = new Date();
    let day = dateToday.getDate();
    let month = dateToday.getMonth();
    let year = dateToday.getFullYear();
    

    let hours = dateToday.getHours();
    let minutes = dateToday.getMinutes();
    let seconds = dateToday.getSeconds();


    return { nameFile : day + "_" + month + "_" + year + "_" + hours + "_" + minutes + "_" + seconds, timeStampToday: dateToday} 
}


export const addDays = (days) =>{
    const dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + days);
    return dateToday;
}