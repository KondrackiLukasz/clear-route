export function getDayIndex(someDate:Date){
    const today = new Date()

    let difference = someDate.getTime() - today.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.floor(Math.abs(TotalDays));

  }