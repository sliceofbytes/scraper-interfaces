export interface SourceDataPoint {
  cases?: number;
  deaths?: number;
  serious?: number;
  critical?: number;
  recovered?: number;
  unresolved?: number;
  pui?: number;
  tested?: number;
  updateEpoch?: number;
}

export interface SourceLocalityDataPoint extends SourceDataPoint {
  localityName: string;
}

export interface SourceData {
  total: SourceDataPoint;
  localities: Array<SourceLocalityDataPoint>
}
