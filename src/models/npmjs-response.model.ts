interface NpmjsMetadata {
    version: string;
}

interface NpmjsCollected {
    metadata: NpmjsMetadata;
}

interface NpmjsPopularity {
    downloadsCount: number;
}

interface NpmjsEvaluation {
    popularity: NpmjsPopularity;
}

interface NpmjsDetail {
    popularity: number;
}

interface NpmjsScore {
    final: number;
    detail: NpmjsDetail;
}

export interface NpmjsResponse {
    analyzedAt: Date;
    collected: NpmjsCollected;
    evaluation: NpmjsEvaluation;
    score: NpmjsScore;
}
