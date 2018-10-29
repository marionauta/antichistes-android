export function isResponseOk(res: Response) {
    if (res.ok) {
        return res;
    }

    throw Error(res.statusText);
}
