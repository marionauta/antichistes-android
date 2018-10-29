export interface AntiJoke {
    id: number;
    first_part: string;
    second_part: string;
}

export interface ServerResponse {
    items: Array<AntiJoke>;
}
