<template>
    <nav class="Page navigation example">
        <ul class="pagination pagination-lg justify-content-center">
            <li class="page-item">
                <a class="page-link" v-if="canShowPrevious" @click="onPrevious">
                    Previous
                </a>
            </li>
            <li class="page-item" v-for="item in pageNavigation">
                <a class="page-link" @click="onPage(item)">
                    {{item}}
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" v-if="canShowNext" @click="onNext">
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class BookListPagination extends Vue {
    @Prop({type: Array, required: true})
    readonly propPages!: number[];

    @Prop({type: Number, required: true})
    readonly propPage!: number;

    @Prop({type: Function, required: true})
    readonly onPageChange!: (page: number) => void;

    get pageNavigation() {
      const page = this.propPage;
      return this.propPages.slice(page - 1, page + 5);
    }

    get canShowPrevious() {
      return this.propPage !== 1;
    }

    get canShowNext() {
      return this.propPage < this.propPages.length;
    }

    onPrevious() {
      let page = this.propPage;
      this.onPageChange(--page);
    }

    onPage(page: number) {
      this.onPageChange(page);
    }

    onNext() {
      let page = this.propPage;
      this.onPageChange(++page);
    }
  }
</script>
