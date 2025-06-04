

export interface Note {
    id: number;
    pinned: boolean;
    simply_edit: boolean;
    title: string;
    content: string;
    date: string;
    tags: Number[];
};

export interface Tag {
    id: number;
    active: boolean;
    name: string;
};