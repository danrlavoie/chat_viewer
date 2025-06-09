import { UserDef } from "./UserDef";

export interface Message {
    message_id: string;
    topic_id: string;
    text: string;
    created_date: string;
    creator: UserDef;
};