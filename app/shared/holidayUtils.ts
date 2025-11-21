import holidays_data from '../../assets/data/holidays_data.json';

const holidaysList = holidays_data.holidays;

export function checkHoliday(year:number, month:number, date:number) {
  let isHoliday = false;
  for(let i=0; i<holidaysList.length; i++){
    if(holidaysList[i].Year == year && holidaysList[i].Month == month && holidaysList[i].Date == date && holidaysList[i].US){
      isHoliday = true;
      break;
    }else if(new Date(year, month - 1, date).getDay() == 0 || new Date(year, month - 1, date).getDay() == 6){
      isHoliday = true;
      break;
    }
  }
  return isHoliday;
}