import routes_data from '../../assets/data/routes_data.json';
import { isHoliday } from './holidayUtils';
import { Route, Stop, PathPoint } from './types/routes';

const [routeTMC, routeH221, routeHovey] = routes_data.routes;

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDate = today.getDate();
const currentDay = today.getDay();
const currentHours = today.getHours();
const currentMinutes = today.getMinutes();
const currentSeconds = today.getSeconds();


export function trackBus() {
  const [runningTimesTMC, runningCountsTMC ] = getRunnigBus(routeTMC);
  const [runningTimesH221, runningCountsH221 ] = getRunnigBus(routeH221);
  const [runningTimesHovey, runningCountsHovey ] = getRunnigBus(routeHovey);
}

function getRunnigBus(route:Route) {
  const todaySchedule = isHoliday(currentYear,currentMonth, currentDate)||[6,7].includes(currentDay) ? route.schedule_holidays : route.schedule_weekdays;
  let currentRunningBus = [];
  let busCount = 0;
  for(let i=0; i<todaySchedule.length;i++){
    if(currentHours==0||currentHours==1) today.setTime(today.getTime() - 24*60*60*1000);

    const busTime = new Date(today.toLocaleDateString("en-CA")+" "+todaySchedule[i]);
    const pivotTime = new Date(today.getTime() - route.totalMinutes*60*1000);

    if(pivotTime.getTime() < busTime.getTime() && busTime.getTime() < today.getTime()){
      currentRunningBus.push(todaySchedule[i]);
      busCount++;
    }
  }
  return [currentRunningBus, busCount];
}



function getBusProgress(route:Route, elapsedTime:number){

  let currentStop;
  let progress;

  for(let i=0; i<route.stops.length; i++){
    if(route.stops[i].durationFromStart <= elapsedTime && elapsedTime < route.stops[i+1].durationFromStart){
      currentStop = route.stops[i];
      progress = (elapsedTime-route.stops[i].durationFromStart)/(route.stops[i+1].durationFromStart-route.stops[i].durationFromStart);
      break;
    }
  }
  return [currentStop, progress];// [currentStop:Stop, progress:number(0.XX)]
}

function getDistancesBetweenStop(pathList:PathPoint, currentStop:Stop, nextStop:Stop){
  let pointList = [];
  let pushOnList = false;
  for(let i=0; i<pathList.length;i++){
    if(pathList[i] == nextStop.x)
  }
}