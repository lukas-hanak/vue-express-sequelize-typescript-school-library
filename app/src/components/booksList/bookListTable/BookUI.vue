<template>
    <tr>
        <td>{{ book.id }}</td>
        <td>{{ book.authorSurname }}</td>
        <td>{{ book.authorName }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.yearOfPublish }}</td>
        <td>{{ book.typeOfPublish }}</td>
        <td>{{ price(book.price) }}</td>
        <td>{{ book.publisher }}</td>
        <td>{{ book.type }}</td>
        <td>{{ buyDateText(book.buyDate) }}</td>
        <td>
            <a>
                <!----designed by Freepik from Flaticon--->
                <img src="../../../assets/editIcon.png" height="12" width="12" alt="edit" class="m-1" @click="onUpdate">
            </a>
            <a>
                <!----designed by Alfredo Hernandez from Flaticon--->
                <img src="../../../assets/removeIcon.png" height="10" width="10" alt="remove" class="m-1"
                     @click="onRemove">
            </a>
        </td>
    </tr>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import {Book} from '@/store/modules/library/libraryInterface';
  import {LibraryModule} from '@/store/modules/library/library';

  @Component
  export default class BookUI extends Vue {
    @Prop({type: Object, required: true})
    readonly propBook!: Book;

    get book() {
      return this.propBook;
    }

    price(price?: string) {
      return price
        ? `${price} CZK`
        : ``;
    };

    buyDateText(originalDate?: string) {
      if (!originalDate) {
        return null;
      }

      let finalDate = {
        day: 0,
        month: 0,
        year: 0,
      };
      const date = originalDate.split('/');
      if (date.length === 3) {
        const originalYear = parseInt(date[2]);
        const currentYear = new Date().getFullYear();
        const year = originalYear > parseInt(currentYear.toString().slice(3, 4))
          ? `19${originalYear}`
          : `20${originalYear < 10 ? `0${originalYear}` : originalYear}`;
        finalDate = {
          day: parseInt(date[1]),
          month: parseInt(date[0]),
          year: parseInt(year),
        };
      } else {
        const date = originalDate.split('-');
        if (date.length !== 3) {
          return null;
        }
        finalDate = {
          day: parseInt(date[2]),
          month: parseInt(date[1]),
          year: parseInt(date[0]),
        };
      }
      return `${finalDate.day}.${finalDate.month}. ${finalDate.year}`;
    };

    onUpdate() {
      this.$modal.show('editBookModal', {
        book: this.propBook,
      });
    }

    onRemove() {
      this.propBook.id && LibraryModule.onRemoveBook(this.propBook.id);
    }
  }
</script>
