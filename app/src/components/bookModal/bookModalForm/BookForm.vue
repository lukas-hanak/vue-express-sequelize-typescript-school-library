<template>
    <b-form class="border border-light p-5" @submit="onFormSubmit">
        <p class="h2 mb-4 text-center">{{ modalTitle }}</p>
        <div class="form-row mb-4">
            <div class="col">
                <b-form-group label="Author surname:" label-for="authorSurname">
                    <b-form-input id="authorSurname" type="text" v-model="bookForm.authorSurname"
                                  placeholder="Author surname"/>
                </b-form-group>
            </div>
            <div class="col">
                <b-form-group label="Author name:" label-for="authorName">
                    <b-form-input id="authorName" type="text" v-model="bookForm.authorName" placeholder="Author name"/>
                </b-form-group>
            </div>
        </div>
        <div class="form-row mb-4">
            <div class="col">
                <b-form-group label="Title:" label-for="title">
                    <b-form-input id="title" type="text" v-model="bookForm.title" placeholder="Title"/>
                </b-form-group>
            </div>
            <div class="col">
                <b-form-group label="Year of publish:" label-for="yearOfPublish">
                    <b-form-input id="yearOfPublish" type="number" v-model="bookForm.yearOfPublish"
                                  placeholder="Year of publish"/>
                </b-form-group>
            </div>
        </div>
        <div class="form-row mb-4">
            <div class="col">
                <b-form-group label="Price (CZK):" label-for="price">
                    <b-form-input id="price" type="number" v-model="bookForm.price" placeholder="Price"/>
                </b-form-group>
            </div>
            <div class="col">
                <b-form-group label="Publisher:" label-for="publisher">
                    <b-form-input id="publisher" type="text" v-model="bookForm.publisher" placeholder="Publisher"/>
                </b-form-group>
            </div>
        </div>
        <div class="form-row mb-4">
            <div class="col">
                <b-form-group label="Type of publish:" label-for="typeOfPublish">
                    <b-form-input id="typeOfPublish" type="text" v-model="bookForm.typeOfPublish"
                                  placeholder="Type of publish"/>
                </b-form-group>
            </div>
            <div class="col">
                <b-form-group label="Type:" label-for="type">
                    <b-form-input id="type" type="text" v-model="bookForm.type" placeholder="Type"/>
                </b-form-group>
            </div>
        </div>
        <b-form-group label="Buy date:" label-for="buyDate">
            <b-form-input id="buyDate" type="date" v-model="bookForm.buyDate" placeholder="Buy date"/>
        </b-form-group>
        <b-button class="btn my-4 btn-block" type="submit" variant="primary">{{ buttonName }}</b-button>
    </b-form>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import {Book} from '@/store/modules/library/libraryInterface';

  @Component
  export default class BookForm extends Vue {
    @Prop({type: String, required: true})
    readonly propTitle!: string;

    @Prop({type: Object, required: false})
    readonly propBook!: Book;

    @Prop({type: Function, required: true})
    readonly onSubmit!: (book: Book) => void;

    bookForm: Book = {
      id: this.propBook.id,
      authorSurname: this.propBook.authorSurname,
      authorName: this.propBook.authorName,
      title: this.propBook.title,
      yearOfPublish: this.propBook.yearOfPublish || new Date().getFullYear(),
      price: this.propBook.price,
      publisher: this.propBook.publisher,
      typeOfPublish: this.propBook.typeOfPublish,
      type: this.propBook.type,
      buyDate: this.propBook.buyDate && this.formatBuyDate(this.propBook.buyDate) || this.todayDate,
    };

    get modalTitle() {
      return this.propTitle;
    }

    get buttonName() {
      return this.propTitle.split(' ')[0];
    }

    get todayDate() {
      return new Date().toISOString().split('T')[0];
    }

    formatBuyDate(originalDate: string) {
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
      return `${finalDate.year}-${finalDate.month < 10 ? `0${finalDate.month}` : finalDate.month}-${finalDate.day < 10 ? `0${finalDate.day}` : finalDate.day}`;
    }

    onFormSubmit(e: Event) {
      this.onSubmit(this.bookForm);
      e.preventDefault();
    };
  }
</script>
