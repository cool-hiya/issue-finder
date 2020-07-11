import User from "./user";

export default interface Issue {
    number: string,
    creationDate: string,
    title: string,
    user: User
}