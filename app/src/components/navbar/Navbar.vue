<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">School library</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"/>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#" @click="openAddBookModal">Create book</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input v-model="stateSearch" size="sm" class="mr-sm-2" placeholder="Search book"/>
                    </b-nav-form>
                    <b-nav-item-dropdown text="Sort" right>
                        <b-dropdown-item
                          v-for="(item, index) in sortList"
                          :key="index"
                          @click="onSort(item.key)"
                        >
                            {{ item.name }}
                            <!----designed by Pixel perfect from Flaticon--->
                            <img
                              v-if="item.key === sort"
                              src="../../assets/selectedIcon.png"
                              height="12"
                              width="12"
                              alt="edit"
                              class="mb-1 ml-1"
                            >
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="Order" right>
                        <b-dropdown-item
                          v-for="(item, index) in orderList"
                          :key="index"
                          @click="onOrder(item.key)"
                        >
                            {{ item.name }}
                            <!----designed by Pixel perfect from Flaticon--->
                            <img
                              v-if="item.key === order"
                              src="../../assets/selectedIcon.png"
                              height="12"
                              width="12"
                              alt="edit"
                              class="mb-1 ml-1"
                            >
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';
  import {Order, Sort} from '@/store/modules/library/libraryInterface';
  import {LibraryModule} from '@/store/modules/library/library';
  import {NavbarItemsType} from '@/components/navbar/navbarInterface';

  @Component
  export default class Navbar extends Vue {
    stateSearch: string | null = null;
    stateSortList: NavbarItemsType = [
      {
        key: Sort.ID,
        name: 'ID',
      },
      {
        key: Sort.CREATED_AT,
        name: 'Created At',
      },
      {
        key: Sort.UPDATED_AT,
        name: 'Updated At',
      },
      {
        key: Sort.BUY_DATE,
        name: 'Buy date',
      },
      {
        key: Sort.PRICE,
        name: 'Price',
      },
      {
        key: Sort.YEAR_OF_PUBLISH,
        name: 'Year of publish',
      }
    ];
    stateOrderList: NavbarItemsType = [
      {
        key: Order.ASC,
        name: 'Ascending',
      },
      {
        key: Order.DESC,
        name: 'Descending',
      }
    ];

    get sortList() {
      return this.stateSortList;
    }

    get orderList() {
      return this.stateOrderList;
    }

    get sort() {
      return LibraryModule.sort;
    }

    get order() {
      return LibraryModule.order;
    }

    openAddBookModal() {
      this.$modal.show('createBookModal');
    }

    onSort(sort: Sort) {
      LibraryModule.onSortBooks(sort);
    }

    onOrder(order: Order) {
      LibraryModule.onOrderBooks(order);
    }

    @Watch('stateSearch')
    onSearch = (value: string) => LibraryModule.onSearchBooks(value);
  }
</script>
