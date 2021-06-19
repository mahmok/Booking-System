import APIClient from "../services/APIClient";

export enum UserRoles {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN",
    SUPER_USER = "SUPER_USER"
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    role: UserRoles;
    password: string;
}


export default class User implements IUser {
    public id: number;
    public name: string;
    public username: string;
    public password: string;
    public role: UserRoles;

    constructor(id: number, name: string, username: string, role: UserRoles, password: string)
    {
        this.id = id;
        this.name = name;
        this.username = username;
        this.role = role;
        this.password = password;
    }

    public static fromJson(json: IUser) {
        return new User(json.id, json.name, json.username, json.role, "");
    }

    public async update(): Promise<User | null>
    {
        try
        {
            return APIClient.getInstance().getUsersService().update(this.id, this.name, this.role);
        }
        catch(err)
        {

        }
        return null;

    }

    public async create(): Promise<boolean>
    {
        try
        {
            await APIClient.getInstance().getUsersService().create(this);
            return true;
        }
        catch(err)
        {
            
        }
        return false;
    }

}

export {};