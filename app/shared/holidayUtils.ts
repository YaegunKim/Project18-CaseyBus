import holidays_data from '../../assets/data/holidays_data.json';

const holidaysList = holidays_data.holidays;

export function isHoliday(year:number, month:number, date:number) {
  let isHoliday = false;
  for(let i=0; i<holidaysList.length; i++){
    if(holidaysList[i].Year == year && holidaysList[i].Month == month && holidaysList[i].Date == date){
      isHoliday = true;
      break;
    }
  }
  return isHoliday;
}