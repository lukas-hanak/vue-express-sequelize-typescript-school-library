export interface Book {
  id?: number;
  authorSurname: string | null;
  authorName: string | null;
  title: string | null;
  yearOfPublish: number | null;
  price: number | null;
  publisher: string | null;
  typeOfPublish: string | null;
  type: string | null;
  buyDate: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

export enum Sort {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  BUY_DATE = 'buyDate',
  PRICE = 'price',
  YEAR_OF_PUBLISH = 'yearOfPublish'
}
