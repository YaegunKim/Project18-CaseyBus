// 📌 개별 정류장(Stop)
// export interface Stop {
//   index: number;
//   name: string;
//   durationFromStart: number;
//   x: number;
//   y: number;
//   intersaction2?: boolean; // 선택적
//   intersaction3?: boolean; // 선택적
//   revisit?: boolean;       // 선택적
// }

export interface Stop {
  name: string;
  x: number;
  y: number;
  // ...other fields...
  openingHours?: string;
  opening_hours?: string;
  hours?: string;
  opening?: string;
  description?: string;
  [key: string]: any; // (optional) allows any extra property
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
