export type Message = {
    id: string,
    text: string,
    sender: User,
    createdAt: string
}

export type User = {
    id: string,
    email: string,
    token: string,
    chats: IChat[]
}

export interface IChat{
    id: string,
    users: User[],
    messages: Message[]
}