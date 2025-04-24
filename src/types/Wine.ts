import { WineType } from "./enums";

export interface Wine {
    winery: string;
    wine: string;
    rating: { 
        average: string; 
        reviews: string;
    };
    location: string;
    image: string;
    id: number;
    type?: WineType;
}