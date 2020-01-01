<template>
    <BookModal
      :propTitle="'Create book'"
      :propModalName="stateModalName"
      :propBook="book"
      :onFormSubmit="onFormSubmit"
    />
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import BookModal from '@/components/bookModal/BookModal.vue';
  import {LibraryModule} from '@/store/modules/library/library';
  import {Book} from '@/store/modules/library/libraryInterface';

  @Component({
    components: {BookModal}
  })
  export default class CreateBookModal extends Vue {
    stateModalName = 'createBookModal';
    stateBook: Book | null = null;

    get book() {
      return this.stateBook;
    }

    onFormSubmit(book: Book) {
      console.log(book);
      LibraryModule.onCreateBook(book);
    }

    created() {
      this.stateBook = {
        authorSurname: null,
        authorName: null,
        title: null,
        yearOfPublish: null,
        price: null,
        publisher: null,
        typeOfPublish: null,
        type: null,
        buyDate: null,
      };
    }
  }
</script>
