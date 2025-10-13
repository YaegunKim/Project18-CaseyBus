// 📌 개별 정류장(Stop)
export interface Stop {
  index: number;
  name: string;
  durationFromStart: number;
  x: number;
  y: number;
  intersaction2?: boolean; // 선택적
  intersaction3?: boolean; // 선택적
  revisit?: boolean;       // 선택적
  description?: string; // 선택적
  
  openingHours?: string;
  opening_hours?: string;
  hours?: string;
  opening?: string;
}


// 📌 노선(Route)
export interface Route {
  id: string;
  name: string;
  color: string;
  totalMinutes: number;
  highlighted: boolean;
  stops: Stop[];
  schedule_weekdays: string[]; // "HH:MM" 포맷
  schedule_holidays: string[];
}

// 📌 전체 JSON 구조
export interface RoutesData {
  routes: Route[];
}
