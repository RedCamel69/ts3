export class SearchResponse {
    webPages: webPages;
    queryContext: queryContext;
}


export class webPages {

    totalEstimatedMatches: Number;
    value: Array<value>;
}

export class value {
    displayUrl: string;
    name: string;
}


export class queryContext {
    originalQuery: string;
}