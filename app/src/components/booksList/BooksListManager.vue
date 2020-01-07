<template>
    <div>
        <table class="table table-striped tableFixHead">
            <BookListHeader :propColumnNames="columnNames"/>
            <BookListTable :propBooks="books" :propPage="page" :propPerPage="perPages"/>
        </table>
        <BookListPagination :propPage="page" :propPages="pages" :onPageChange="onPageChange"/>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import {LibraryModule} from '@/store/modules/library/library';
  import BookListHeader from '@/components/booksList/BookListHeader.vue';
  import BookListTable from '@/components/booksList/bookListTable/BookListTable.vue';
  import BookListPagination from '@/components/booksList/BookListPagination.vue';

  @Component({
    components: {
      BookListHeader,
      BookListTable,
      BookListPagination
    }
  })
  export default class BooksListManager extends Vue {
    stateColumnNames = ['ID', 'Surname', 'Name', 'Title', 'Year of publish',
      'Type of publish', 'Price', 'Publisher', 'Focus', 'Bought', ''];
    statePage = 1;
    statePerPage = 15;
    statePages: number[] = [];

    get books() {
      return LibraryModule.books;
    }

    get columnNames() {
      return this.stateColumnNames;
    }

    get pages() {
      return this.statePages;
    }

    get page() {
      return this.statePage;
    }

    get perPages() {
      return this.statePerPage;
    }

    @Watch('books')
    setPages() {
      if (!this.books) {
        return;
      }
      this.statePage = 1;
      this.statePages = [];
      let numberOfPages = Math.ceil(this.books.length / this.statePerPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.statePages.push(index);
      }
    }

    onPageChange(page: number) {
      this.statePage = page;
    }

    created() {
      LibraryModule.onLoadBooks();
    }
  }
</script>
