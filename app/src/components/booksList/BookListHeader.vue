<template>
    <thead>
    <tr>
        <th scope="col" v-for="(item, index) in columnNames" :key="index">{{ item }}</th>
    </tr>
    </thead>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class BookListHeader extends Vue {
    @Prop({type: Array, required: true})
    readonly propColumnNames!: string[];

    get columnNames() {
      return this.propColumnNames;
    }
  }
</script>
