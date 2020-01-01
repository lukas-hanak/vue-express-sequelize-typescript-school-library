<template>
    <tbody>
    <BookUI
      v-for="(item, index) in pageOfBooks"
      :propBook="item"
      :key="index"
    />
    </tbody>
</template>¨
<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import BookUI from '@/components/booksList/bookListTable/BookUI.vue';
  import {Book} from '@/store/modules/library/libraryInterface';

  @Component({
    components: {
      BookUI,
    }
  })
  export default class BookListTable extends Vue {
    @Prop({type: Array, required: true})
    readonly propBooks!: Book[];

    @Prop({type: Number, required: true})
    readonly propPage!: number;

    @Prop({type: Number, required: true})
    readonly propPerPage!: number;

    get pageOfBooks() {
      if (!this.propBooks) {
        return [];
      }
      return this.makePageForBooks(this.propBooks);
    }

    makePageForBooks(books: Book[]) {
      let page = this.propPage;
      let perPage = this.propPerPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return books.slice(from, to);
    }
  }
</script>
<style scoped>
</style>
