<template>
    <BookModal
      :propTitle="'Edit book'"
      :propModalName="stateModalName"
      :propBook="book"
      :onFormSubmit="onFormSubmit"
      :onInitModal="onInitModal"
    />
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import BookModal from '@/components/bookModal/BookModal.vue';
  import {LibraryModule} from '@/store/modules/library/library';
  import {Book} from '@/store/modules/library/libraryInterface';

  @Component({
    components: {BookModal}
  })
  export default class EditBookModal extends Vue {
    stateModalName = 'editBookModal';
    stateBook: Book | null = null;

    get book() {
      return this.stateBook;
    }

    onFormSubmit(book: Book) {
      LibraryModule.onUpdateBook(book);
    }

    onInitModal(book: Book) {
      this.stateBook = book;
    }
  }
</script>
