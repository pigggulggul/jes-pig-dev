/** 인스타 숫자 변환 */
export const formatNumberInsta = (num: number): string => {
  // 1만 이상인 경우
  if (num >= 10000) {
    const manUnit = num / 10000;
    // 소수점 한 자리까지 표시하고, 불필요한 .0 제거
    return `${manUnit.toFixed(1).replace(".0", "")}만`;
  }
  // 1000 이상인 경우
  if (num >= 1000) {
    return num.toLocaleString("ko-KR");
  }
  // 1000 미만인 경우
  return num.toString();
};
