export default class SessionStorage
{
    private static TOKEN_KEY: string = "TOKEN_KEY";


    public saveToken(token: string): void
    {
        window.sessionStorage.setItem(SessionStorage.TOKEN_KEY, token);
    }

    public getToken(): string | null
    {
        const token: string | null = window.sessionStorage.getItem(SessionStorage.TOKEN_KEY);
        if(token && token.trim() !== "")
        {
            return token;
        }
        return null;
    }

    public tokenExists(): boolean 
    {
        return this.getToken() !== null;
    }

    public clear(): void
    {
        window.sessionStorage.clear();
    }

}