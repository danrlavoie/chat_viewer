import { GroupInfo } from "./GroupInfo";
import { Message } from "./Message";

export interface Chat {
    id: string;
    groupInfo: GroupInfo
    messages: Message[];
}