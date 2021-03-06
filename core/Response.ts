export class Response {
    public request: any;
    private res_status: number;
    private res_headers: Map<string, string>;

    constructor(req: any) {
        this.request = req;
        this.res_status = 200;
        this.res_headers = new Map();
    }

    private encode_body(body: any): any {
        if (typeof body === "object") {
            return JSON.stringify(body)
        }
        return body
    }

    public headers(httpHeaders: any): this {
        let headers_map = new Map();
        for(const prop in httpHeaders) {
            headers_map.set(prop, httpHeaders[prop]);
        }
        this.res_headers = headers_map;
        return this;
    }

    public status(httpStatus: number): this {
        this.res_status = httpStatus;
        return this;
    }

    public send(res_body: any): void {
        this.request.respond({
            headers: this.res_headers,
            status: this.res_status,
            body: this.encode_body(res_body)
        });
    }
    
    public getHeaders(): Map<string, string> {
        return this.res_headers;
    }
    
    public getStatus(): number {
        return this.res_status;
    }
}