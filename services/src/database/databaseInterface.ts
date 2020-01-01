export interface Book {
    id: number;
    authorSurname: string | null;
    authorName: string | null;
    title: string | null;
    yearOfPublish: number | null;
    price: number | null;
    publisher: string | null;
    typeOfPublish: string | null;
    type: string | null;
    buyDate: string | null;
    createdAt: string;
    updatedAt: string;
}
