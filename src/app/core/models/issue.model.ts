import User from "./user";

export default interface Issue {
    id: number,
    number: string,
    creationDate: string,
    title: string,
    user: User,
    content: string,
    status: string,
    assignee: string 
}