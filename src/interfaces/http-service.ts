export interface IHttpService {
    execute(httpParams: HttpParams): Promise<HttpResponse>;
}

export interface HttpParams{
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'HEAD';
    url: string;
    headers?: {[key: string]: string};
    bodyBuilder?: string;
    body?: string;
}

export interface HttpResponse {
    request: HttpParams;
    response: {
        status: number,
        body: any,
        headers: any
    };
}