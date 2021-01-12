export interface IMessage {
  messageId: number;
  senderId: number;
  senderUsername: string;
  senderPhotUrl: string;
  recipientId: number;
  recipientUsername: string;
  recipientPhotUrl: string;
  content: string;
  dateRead: Date;
  messageSent: Date;
}
