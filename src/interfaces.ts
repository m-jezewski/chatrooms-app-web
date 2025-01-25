export interface LoggedUser {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    role: 'USER' | 'ADMIN';
}