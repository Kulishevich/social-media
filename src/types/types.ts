export type Message = {
    id: string,
    text: string,
    sender: User,
    createdAt: string
}

export type User = {
    email: string,
}

export interface IChat{
    id: string,
    users: User[],
    messages: Message[]
}