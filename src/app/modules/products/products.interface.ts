// Define the allowed product categories
export type categoryType = "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious"
// Define the Product type with strict typing for all fields
export interface ProductType {
    title: string;
    author: string;
    price: number;
    category : categoryType;
    description : string;
    quantity : number;
    inStock : boolean;
    createdAt: Date;
    updatedAt: Date;
    isDeleted : boolean;
}

