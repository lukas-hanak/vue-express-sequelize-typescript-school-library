<template>
    <div>
        <modal @before-open="beforeOpen" :name="modalName" :width="650" :height="750">
            <button type="button" class="close p-3" aria-label="Close" @click="hide">
                <span aria-hidden="true">&times;</span>
            </button>
            <BookForm :propTitle="modalTitle" :propBook="book" :onSubmit="onSubmit"/>
        </modal>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import BookForm from './bookModalForm/BookForm.vue';
  import {Book} from '@/store/modules/library/libraryInterface';

  @Component({
    components: {
      BookForm,
    }
  })
  export default class BookModal extends Vue {
    @Prop({type: String, required: true})
    readonly propTitle!: string;

    @Prop({type: String, required: true})
    readonly propModalName!: string;

    @Prop({type: Object, required: true})
    readonly propBook!: Book;

    @Prop({type: Function, required: true})
    readonly onFormSubmit!: (book: Book) => void;

    @Prop({type: Function, required: false})
    readonly onInitModal!: (book: Book) => void;

    get modalTitle() {
      return this.propTitle;
    }

    get modalName() {
      return this.propModalName;
    }

    get book() {
      return this.propBook;
    }

    beforeOpen(e: any) {
      this.onInitModal(e.params.book);
    }

    hide() {
      this.$modal.hide(this.modalName);
    }

    onSubmit(book: Book) {
      this.hide();
      this.onFormSubmit(book);
    };
  }
</script>
