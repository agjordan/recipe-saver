export interface IRecipe {
    json: string
    name: string
    url: string
    id: string
    image: string
    category: string
    cuisine: string
    ingredients: any[]
    yield: string
    cookTime: string
    prepTime: string
    notes:string
}

export interface IImageObject {
    url: string 
    '@type'?: string;
    height?: number;
    width?: number;
}