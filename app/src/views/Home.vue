<template>
    <div>
        <BooksListManager/>
        <CreateBookModal/>
        <EditBookModal/>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import BooksListManager from '@/components/booksList/BooksListManager.vue';
  import CreateBookModal from '@/components/createBook/CreateBookModal.vue';
  import EditBookModal from '@/components/editBook/EditBookModal.vue';

  @Component({
    components: {
      BooksListManager,
      CreateBookModal,
      EditBookModal,
    },
  })
  export default class Home extends Vue {}
</script>
