const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** macOS 메뉴바 스타일 시계 문자열. 예: "월 2:05 PM" */
export function formatClock(d: Date): string {
  const ap = d.getHours() < 12 ? "AM" : "PM";
  let h = d.getHours() % 12;
  if (h === 0) h = 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${DAYS[d.getDay()]} ${h}:${m} ${ap}`;
}
