export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    role: 'USER' | 'ADMIN';
}

export interface Chatroom {
    id: number;
    name: string;
    createdAt: Date;
    users: number[];
}