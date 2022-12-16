export interface ArrayFieldsChild {
  id: number;
  int: number
  color: string;
  child: Child;
  float: number;
}

export interface Child {
  id: string,
  color: string
}
