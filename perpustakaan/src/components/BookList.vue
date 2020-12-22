<template>
    <div class="book-list p-l p-md-5">
        <custom-table :baseApi="baseApi"
                      :totalColumn="5"
                      :entity="entity"
                      :validate="doValidate"
                      :canAdd="true"
                      :canEdit="true"
                      :canDelete="true">
            <h2 slot="title">Books</h2>
            <template slot="renderedTh">
                <th>Name</th>
                <th>Description</th>
                <th>ISBN</th>
                <th>Author</th>
                <th>Publisher</th>
            </template> 
            <template slot="renderedTd" slot-scope="{record, data}">
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Name"
                            type="text" v-model="record.title">
                    <span v-else>{{data.title}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Description"
                            type="text" v-model="record.description">
                    <span v-else>{{data.description}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="ISBN"
                            type="text" v-model="record.isbn">
                    <span v-else>{{data.isbn}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Author"
                            type="text" v-model="record.author">
                    <span v-else>{{data.author}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Publisher"
                            type="text" v-model="record.publisher">
                    <span v-else>{{data.publisher}}</span>
                </td>
            </template>
        </custom-table>
    </div>
</template>

<script lang="ts">
    import Session from "../common/Session";
    import User from "../entity/User";
    import Book from "../entity/Book";
    import { Component, Vue } from 'vue-property-decorator';
    import CustomTable from "./CustomTable.vue";

    @Component({components: {CustomTable}})
    export default class Booklist extends Vue{

        public baseApi: string ="http://202.152.159.164:8088/perpus/books/";

        public entity: new () => Book = Book;

        public get user(): User{
            return Session.get();
        }

        public doValidate(book: Book){
            const keys: Array<keyof Book> = ["title", "description", "isbn", "author", "publisher"];

            return keys.every(prop => book[prop] !== "");
        }
    }
</script>