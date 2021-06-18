interface NpmjsMetadata {
    version: string;
}

interface NpmjsCollected {
    metadata: NpmjsMetadata;
}

interface NpmjsDetail {
    popularity: number;
}

interface NpmjsScore {
    final: number;
    detail: NpmjsDetail;
}

export interface NpmjsResponse {
    analyzedAt: string;
    collected: NpmjsCollected;
    score: NpmjsScore;
}
