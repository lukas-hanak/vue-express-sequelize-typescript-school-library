import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {createBook, fetchAllBooks, removeBook, updateBook} from '@/api/api';
import {Book, Order, Sort} from '@/store/modules/library/libraryInterface';
import store from '@/store';

@Module({
  namespaced: true,
  name: 'library',
  dynamic: true,
  store
})
class LibraryModuleInternal extends VuexModule {
  stateAllBooks: Book[] = [];
  stateSearch: string = '';
  stateSort: Sort = Sort.ID;
  stateOrder: Order = Order.DESC;

  @Mutation
  setSearch(value: string) {
    this.stateSearch = value;
  }

  @Mutation
  setBooks(books: Book[] | null) {
    if (!books) {
      return;
    }
    this.stateAllBooks = books;
  }

  @Mutation
  sortBooks(sort: Sort) {
    this.stateSort = sort;
  }

  @Mutation
  orderBooks(order: Order) {
    this.stateOrder = order;
  }

  @Mutation
  addBook(book: Book | null) {
    if (!book) {
      return;
    }
    if (this.stateAllBooks) {
      this.stateAllBooks.push(book);
    }
  }

  @Mutation
  editBook(book: Book | null) {
    if (!book) {
      return;
    }
    const editFn = (books: Book[]) => books.map((item) => item.id === book.id ? book : item);
    if (book.id) {
      if (this.stateAllBooks) {
        this.stateAllBooks = editFn(this.stateAllBooks);
      }
    }
  }

  @Mutation
  deleteBook(bookID: number | null) {
    if (!bookID) {
      return;
    }
    const deleteFn = (books: Book[]) => {
      const searchedBook = books.find(book => book.id === bookID);
      if (searchedBook) {
       books.splice(books.indexOf(searchedBook), 1);
     }
    };
    if (this.stateAllBooks) {
      deleteFn(this.stateAllBooks);
    }
  }

  @Action({commit: 'setSearch'})
  onSearchBooks(value: string) {
    return value;
  }

  @Action({commit: 'sortBooks'})
  onSortBooks(sort: Sort) {
    return sort;
  }

  @Action({commit: 'orderBooks'})
  onOrderBooks(order: Order) {
    return order;
  }

  @Action({commit: 'setBooks'})
  async onLoadBooks() {
    return await fetchAllBooks();
  }

  @Action({commit: 'addBook'})
  async onCreateBook(book: Book) {
    return await createBook(book);
  }

  @Action({commit: 'editBook'})
  async onUpdateBook(book: Book) {
    return await updateBook(book);
  }

  @Action({commit: 'deleteBook'})
  async onRemoveBook(bookID: number) {
    return await removeBook(bookID);
  }

  get sort() {
    return this.stateSort;
  }

  get order() {
    return this.stateOrder;
  }

  get books() {
    const searchVal = this.stateSearch.toLowerCase();
    const allBooks = this.stateAllBooks
        .filter((book) => Object.values(book)
            .find((val) => val && val.toString().toLowerCase().includes(searchVal)));
    const sort = this.stateSort;
    const orderByASC = this.stateOrder === Order.ASC;
    const sortFn = (a?: number | null, b?: number | null) => {
       const first = a || 0;
       const second = b || 0;
       return orderByASC ? second - first : first - second;
    };
    let sortedBooks: Book[] = [];
    switch (sort) {
      case Sort.ID:
        sortedBooks = allBooks.sort((a, b) => sortFn(a.id, b.id));
        break;
      case Sort.CREATED_AT:
        sortedBooks = allBooks.sort(((a, b) =>
          sortFn(new Date(a.createdAt || 0).getTime(), new Date(b.createdAt || 0).getTime())));
        break;
      case Sort.UPDATED_AT:
        sortedBooks = allBooks.sort(((a, b) =>
          sortFn(new Date(a.updatedAt || 0).getTime(), new Date(b.updatedAt || 0).getTime())));
        break;
      case Sort.BUY_DATE:
        sortedBooks = allBooks.sort(((a, b) =>
          sortFn(new Date(a.buyDate || 0).getTime(), new Date(b.buyDate || 0).getTime())));
        break;
      case Sort.PRICE:
        sortedBooks = allBooks.sort(((a, b) => sortFn(a.price, b.price)));
        break;
      case Sort.YEAR_OF_PUBLISH:
        sortedBooks = allBooks.sort(((a, b) => sortFn(a.yearOfPublish, b.yearOfPublish)));
        break;
    }
    return sortedBooks;
  }
}

export const LibraryModule = getModule(LibraryModuleInternal);
