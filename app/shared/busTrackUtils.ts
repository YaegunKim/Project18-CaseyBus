import routesData from '../../assets/data/routes_data.json';
import svgPoint from '../../assets/data/svg_data.json';
import { checkHoliday } from './holidayUtils';
import { Route, Stop } from './types/routes';
import { SvgPoint } from './types/svg';

const [routeTMC, routeH221, routeHovey] = routesData.routes;
const [svgPointsTMC, svgPointsH221, svgPointsHovey] = svgPoint.svgPoints;


const second = 1000;
const minute = 60*second;


export function trackBus(today:Date) {

  const [runningTimesTMC, runningCountsTMC ] = getRunnigBus(routeTMC, today);
  const [runningTimesH221, runningCountsH221 ] = getRunnigBus(routeH221, today);
  const [runningTimesHovey, runningCountsHovey ] = getRunnigBus(routeHovey, today);
  let runnigBusList:[Route,number[]][] = [];

  runningTimesTMC.forEach(element => {
    const [currentStop, nextStop, progress] = getBusProgress(routeTMC, getElapsedTime(element, today));
    // console.log("---------element: "+getElapsedTime(element, today));
    // console.log("---------elasped Time: "+getElapsedTime(element, today));
    // console.log("---------progress: "+progress);
    const currentLocation = getCurrentLocation(getPointsBetweenStop(svgPointsTMC,currentStop,nextStop), progress);
    
    // console.log(currentLocation);
    runnigBusList.push([routeTMC,currentLocation]);
    
  });
  runningTimesH221.forEach(element => {
    const [currentStop, nextStop, progress] = getBusProgress(routeH221, getElapsedTime(element, today));

    const currentLocation = getCurrentLocation(getPointsBetweenStop(svgPointsH221,currentStop,nextStop), progress);

    runnigBusList.push([routeH221,currentLocation]);
    
  });

  runningTimesHovey.forEach(element => {
    const [currentStop, nextStop, progress] = getBusProgress(routeHovey, getElapsedTime(element, today));

    const currentLocation = getCurrentLocation(getPointsBetweenStop(svgPointsHovey,currentStop,nextStop), progress);

    runnigBusList.push([routeHovey,currentLocation]);
    
  });
  return runnigBusList;
}

function getRunnigBus(route:Route, today:Date): [string[], number] {
  const todaySchedule = checkHoliday(today.getFullYear(),today.getMonth() + 1, today.getDate())||[6,7].includes(today.getDay()) ? route.schedule_holidays : route.schedule_weekdays;
  let currentRunningBus = [];
  let busCount = 0;
  for(let i=0; i<todaySchedule.length;i++){
    if(today.getHours()==0||today.getHours()==1) today.setTime(today.getTime() - 24*60*60*1000);

    const busTime = new Date(today.toLocaleDateString("en-CA")+" "+todaySchedule[i]);
    const pivotTime = new Date(today.getTime() - route.totalMinutes*60*1000);

    if(pivotTime.getTime() < busTime.getTime() && busTime.getTime() < today.getTime()){
      currentRunningBus.push(todaySchedule[i]);
      busCount++;
    }
  }
  return [currentRunningBus, busCount];
}

function getElapsedTime(time:string, today:Date){
  const busTime = new Date(today.toLocaleDateString("en-CA")+" "+time);
  const elapsedTimeinMil = today.getTime() - busTime.getTime();
  return elapsedTimeinMil/second;
}


function getBusProgress(route:Route, elapsedTime:number): [Stop,Stop,number]{

  let currentStop = route.stops[0]; //temp
  let nextStop = route.stops[0]; //temp
  let progress = 0;

  for(let i=0; i<route.stops.length-1; i++){
    if(route.stops[i].durationFromStart <= elapsedTime && elapsedTime < route.stops[i+1].durationFromStart){
      currentStop = route.stops[i];
      nextStop = route.stops[i+1];
      progress = (elapsedTime-route.stops[i].durationFromStart)/(route.stops[i+1].durationFromStart-route.stops[i].durationFromStart);
      break;
    }
  }
  return [currentStop, nextStop, progress];
}

function getPointsBetweenStop(pathList:SvgPoint, currentStop:Stop, nextStop:Stop){
  let pointList: number[][] = [];
  let pushOnList = false;
  for(let i=0; i<pathList.pointList.length;i++){
    
    if(pathList.pointList[i][0] == currentStop.x && pathList.pointList[i][1] == currentStop.y && pathList.pointList[i][2] == currentStop.durationFromStart){
      pushOnList= true;
    }
    if(pushOnList){
      pointList.push(pathList.pointList[i]);
    }
    if(pathList.pointList[i][0] == nextStop.x && pathList.pointList[i][1] == nextStop.y && pathList.pointList[i][2] == nextStop.durationFromStart){
      pushOnList= false;
      break;
    }
  }
  return pointList;
}

function getDistancesBetweenPoints(list:number[][]){
  let result = [];
  for(let i=0;i<list.length-1;i++){
    result.push(Math.sqrt((list[i+1][0]-list[i][0])**2+(list[i+1][1]-list[i][1])**2));
  } return result;
}


function getCurrentLocation(pointList:number[][], progress:number) {

  // console.log("pointList: "+pointList);
  if(pointList.length == 1){
    return [pointList[0][0], pointList[0][1]];
  }

  const distancesBetweenPoints = getDistancesBetweenPoints(pointList);
  let totalDistance = 0;

  for(let i=0;i<distancesBetweenPoints.length;i++){
    totalDistance = totalDistance + distancesBetweenPoints[i];
    
  }
  let distanceTraveled = totalDistance*progress;
  let currentPointIndex = 0;
  let currentProgress = 0;

  for(let i=0;i<distancesBetweenPoints.length;i++){
    if(distanceTraveled < distancesBetweenPoints[i]){
      currentPointIndex = i;
      // console.log("index: "+i);
      currentProgress = distanceTraveled/distancesBetweenPoints[i];
      break;
    }
    distanceTraveled = distanceTraveled - distancesBetweenPoints[i];
  }
  // console.log(currentProgress);

  const finalX = pointList[currentPointIndex][0] + (pointList[currentPointIndex+1][0] - pointList[currentPointIndex][0])*currentProgress;
  const finalY = pointList[currentPointIndex][1] + (pointList[currentPointIndex+1][1] - pointList[currentPointIndex][1])*currentProgress;
  
  // console.log([finalX,finalY]);
  return [finalX,finalY];
}








/////////next Bus Track Utils/////////

export function getNextBusTime(schedule:string[], today:Date, durationFromStart:number): string[]{
  for(let i=0; i<schedule.length;i++){
    if(today.getHours()==0||today.getHours()==1) today.setTime(today.getTime() - 24*60*60*1000);

    const busTime = new Date(today.toLocaleDateString("en-CA")+" "+schedule[i]);
    busTime.setSeconds(busTime.getSeconds() + durationFromStart);
    if(busTime.getTime() > today.getTime()){
      const TimeLeftInMinutes = Math.floor((busTime.getTime()-today.getTime())/minute);
      const TimeLeftInSeconds = Math.floor(((busTime.getTime()-today.getTime())/second)%60);
      if(TimeLeftInMinutes >= 1){
        return [schedule[i-1], schedule[i], `${TimeLeftInMinutes} min ${TimeLeftInSeconds} sec`];
      }else{
        return [schedule[i-1], schedule[i], `Approaching`];
      }
    }
  }
  return ['No Bus', 'No Bus', 'null'];}
