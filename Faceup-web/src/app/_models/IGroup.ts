export interface IGroup {
  groupName: string;
  connections: IConnection[];
}

interface IConnection {
  connectionId: string;
  username: string;
}
