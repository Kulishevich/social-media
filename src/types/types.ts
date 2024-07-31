export type Message = {
    id: string,
    text: string,
    sender: string,
    createdAt: string
}

export type User = {
    email: string,
    uid: string,
    friends: string[]
}

export interface IChat{
    id: string,
    users: string[],
    messages: Message[]
}