import {createBook, fetchAllBooks, removeBook, updateBook} from '@/api/api';
import store from '@/store';
import {Book, Order, Sort} from '@/store/modules/library/libraryInterface';
import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

@Module({
  namespaced: true,
  name: 'library',
  dynamic: true,
  store
})
class LibraryModuleInternal extends VuexModule {
  stateAllBooks: Book[] | null = null;
  stateFilteredBooks: Book[] | null = null;
  stateSort: Sort = Sort.ID;
  stateOrder: Order = 'DESC';

  @Mutation
  setBooks(books: Book[] | null) {
    if (!books) {
      return;
    }
    if (!this.stateAllBooks) {
      this.stateAllBooks = books;
    }
    this.stateFilteredBooks = books;
  }

  @Mutation
  sortBooks(sort: Sort) {
    if (!this.stateAllBooks) {
      return;
    }
    this.stateSort = sort;
  }

  @Mutation
  orderBooks(order: Order) {
    if (!this.stateAllBooks) {
      return;
    }
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
    this.stateFilteredBooks = this.stateAllBooks;
  }

  @Mutation
  editBook(book: Book | null) {
    if (!book) {
      return;
    }
    const editFn = (books: Book[]) => books.map(item => item.id === book.id ? book : item);
    if (book.id) {
      if (this.stateAllBooks) {
        this.stateAllBooks = editFn(this.stateAllBooks);
      }
      if (this.stateFilteredBooks) {
        this.stateFilteredBooks = editFn(this.stateFilteredBooks);
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
      searchedBook && books.splice(books.indexOf(searchedBook), 1);
    };
    if (this.stateAllBooks) {
      deleteFn(this.stateAllBooks);
    }
    if (this.stateFilteredBooks) {
      deleteFn(this.stateFilteredBooks);
    }
  }

  @Action({commit: 'setBooks', rawError: true})
  onSearchBooks(value: string) {
    if (this.stateAllBooks) {
      return this.stateAllBooks
        .filter(book => Object.values(book)
          .find(val => val && val.toString().toLowerCase().includes(value.toLowerCase())));
    }
    return null;
  }

  @Action({commit: 'setBooks'})
  async onLoadBooks() {
    return await fetchAllBooks();
  }

  @Action({commit: 'sortBooks'})
  onSortBooks(sort: Sort) {
    return sort;
  }

  @Action({commit: 'orderBooks'})
  onOrderBooks(order: Order) {
    return order;
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

  get filteredBooks() {
    if (!this.stateFilteredBooks) {
      return [];
    }
    const allBooks = this.stateFilteredBooks;
    const sort = this.stateSort;
    const orderByASC = this.stateOrder === 'ASC';
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
