
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const timeElaspedTill2025 = year*55+day*14;
let isLeapYear = false;



export function getCurrentYear() {
  const currentYear = Math.floor((Date.now()-timeElaspedTill2025)/year)+2025;
  const Datefrom2025 = Date.now()-timeElaspedTill2025;
  const isLeapYear = (currentYear-1970)%4==0? true : false;
  const [currentMonth, currentDay] = getMonth(Math.floor(Datefrom2025/day), isLeapYear)

  return [currentYear, currentMonth, currentDay];
}


function getMonth(x:number, leapYear:boolean) {
  console.log("x: "+x)
  let leapYearAdditon = 0;
  if(leapYear) leapYearAdditon = 1;

  let currentMonth = 0;
  let currentDay = 0;
  const daysInEachMonth = [31, 28+leapYearAdditon, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for(let i=0; i<12; i++){
    if(x<daysInEachMonth[i]){
      currentMonth = i+1;
      currentDay = x;
      break;
    }else{
    x = x - daysInEachMonth[i];
    console.log("On iteration["+(i+1)+"], x = "+x);
    }
    
    
  } return [currentMonth, currentDay];
}