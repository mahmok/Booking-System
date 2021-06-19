import User, { IUser } from '../models/User';
import APIClient, { BaseResponse, RequestOptions } from './APIClient';

export default class UsersService {
    private static instance: UsersService;

    private constructor() { }

    public static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }

        return UsersService.instance;
    }

    public async login(username: string, password: string): Promise<string> {

        const request: RequestOptions = {
            method: "POST",
            url: `${APIClient.baseUrl}v1/users/auth`,
            body: {username, password}
        };
        return (await APIClient.makeRequest<BaseResponse<string>>(request)).data;
    }

    public async get(): Promise<User[]> {

        const request: RequestOptions = {
            method: "GET",
            url: `${APIClient.baseUrl}v1/users`,
        };
        const users: User[] = (await APIClient.makeRequest<BaseResponse<User[]>>(request)).data.map((u: User) => {
            return User.fromJson(u);
        });

        return users;
    }


    public async update(id: number, name: string, role: string): Promise<User> {

        const request: RequestOptions = {
            method: "PATCH",
            url: `${APIClient.baseUrl}v1/users/${id}`,
            body: {name, role}
        };
        return User.fromJson((await APIClient.makeRequest<BaseResponse<User>>(request)).data)
    }

    public async create(user: IUser): Promise<User> {

        const request: RequestOptions = {
            method: "POST",
            url: `${APIClient.baseUrl}v1/users`,
            body: {username: user.username, name: user.name, password: user.password}
        };
        return User.fromJson((await APIClient.makeRequest<BaseResponse<User>>(request)).data)
    }


}