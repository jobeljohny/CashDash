export interface IMonthTile {
  month: Date;
  monthDisplay: string;
  selected: boolean;
}

export function generateMonthList(): IMonthTile[] {
  const currentDate = new Date();
  const monthList: IMonthTile[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthAbbreviation = date.toLocaleString("default", {
      month: "short",
    }); // "Jan", "Feb", etc.
    const yearAbbreviation = date.getFullYear().toString().slice(-2);
    const monthDisplay = `${monthAbbreviation}'${yearAbbreviation}`;
    monthList.push({ month: date, monthDisplay, selected: false });
  }
  monthList[0].selected = true;
  return monthList.reverse();
}
