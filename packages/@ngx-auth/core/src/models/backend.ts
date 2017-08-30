export interface Backend {
  endpoint: string;
  params: Array<{
    key: string;
    value: string;
  }>;
}
