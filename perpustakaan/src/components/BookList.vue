<template>
    <div class="book-list p-1 p-md-5">
        <custom-table   :baseApi="baseApi"
                        :totalColumn="5"
                        :entity="entity"
                        :validate="doValidate"
                        :canEdit="user.isAdmin"
                        :canDelete="user.isAdmin">
            <h2 slot="title"> Books</h2>
            <template slot="renderedTh"></template>
            <template slot="renderedTd" slot-scope="{record, data}">
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Name">
                    <span v-else>{{data.name}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Descrition">
                    <span v-else>{{data.description}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="ISBN">
                    <span v-else>{{data.isbn}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Author">
                    <span v-else>{{data.author}}</span>
                </td>
                <td class="align-middle">
                    <input v-if="record && record.id === data.id" class="form-control" placeholder="Publisher">
                    <span v-else>{{data.publisher}}</span>
                </td>
            </template>
        </custom-table>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import customTable from '@/components/CustomTable.vue'
import User from '@/entity/User';
import Book from '@/entity/Book';
import Session from '@/common/Session';
import { Loan } from '@/entity/Loan';

@Component({
    components:{
        customTable
    }
})
export default class BookList extends Vue{
    public baseApi: string = "http://202.152.159.164:8088/perpus/books/"

    public entity: new () => Book = Book;

    public get user(): User {
        return Session.get();
    }
    public doValidate(book: Book) {
        const keys: Array<keyof Book>  = ["id", "description", "isbn", "author", "publisher"];
        return keys.every(prop => book[prop] !== "");
    }
}
</script>