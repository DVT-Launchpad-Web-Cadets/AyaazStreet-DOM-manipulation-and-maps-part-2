export interface IAllLaps {
  filename: string;
  title: string;
  summary: string;
  lapRecord: number;
  maxSpeed: number;
  numberOfLaps: number | undefined;
  lapSummaries: ILapSummary[] | undefined;
}

interface ILapSummary {
  lapNumber: number;
  maxSpeed: number;
  minSpeed: number;
  lapTime: number;
}

export interface ILap {
  filename: string;
  lapData: DataSet[];
}

interface DataSet {
  latitude: number;
  longitude: number;
  speed: number;
}
