export interface Task {
    id: any;
    name: string;
    type?: TaskType;
    left: number;
    top: number;
    line?: any;
    next?: any;
}

export type TaskType = 'ENTRYPOINT' | 'CONDITIONAL' | 'CODE' | 'HTTP_REQUEST' | 'ENDPOINT';
