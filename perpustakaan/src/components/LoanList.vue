<template>
    <div class="loan-list p-1 p-md-5">
        <custom-table :baseApi="`${baseApi}loans/`"
        :totalColumn ="5"
        :entity="entity"
        :validate="doValidate"
        :canEdit="user.isAdmin"
        :canDelete="user.isAdmin"
        @onAddOrEdit="onAddOrEdit">
            <h2 slot="title">Loans</h2>
            <template slot="renderedTh"></template>
            <template slot="renderedTd" slot-scope="{record, data}">
                <td class="align-middle">
                    <select v-if="record && record.id === data.id"
                            v-model="record.book.id"
                            class="form-control"
                            @click="(e) => onChangeBook(e.target.value, record)">
                        <option value="" disabled selected>Please select book</option>
                        <option v-for="(book, idx) in books" :key="`${idx}-${book.id}`" value="book.id">{{book.title}}</option>
                    </select>
                    <span v-else>{{data.book.name}}</span>
                </td>
                <td class="align-middle">
                    <span v-if="record && record.id === data.id">
                        {{record.book.isbn}}
                    </span>
                    <span v-else>
                        {{data.book.isbn}}
                    </span>
                </td>
                <td class="align-middle text-center">
                    {{data.status || "-"}}
                </td>
                <td class="align-middle text-center">
                    {{data.loanDate}}
                </td>
            </template>
        </custom-table>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import customTable from './CustomTable.vue';
import Book from "@/entity/Book";
import User from "@/entity/User";
import Session from "@/common/Session";
import { Loan } from '@/entity/Loan';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import {get} from 'lodash';
import StatusCode from '@/common/StatusCodes';


@Component({
    components: {customTable}
})
export default class LoanList extends Vue {
    public baseApi: string = "http://202.152.159.164:8088/perpus/books/";
    public entity: new() => Book = Book;
    public rows : number = 0;
    public isBeingRequest: boolean = false;
    public books: Array<Book> = [];
    public get user(): User {
        return Session.get();
    }
    public doValidate(book:Book){
        const keys: Array<keyof Book>  = ["id", "description", "isbn", "author", "publisher"];
        return keys.every(prop => book[prop] !== "");
    }

    public onChangeBook(value: string, loan: Loan){
        if(value === "loadMore"){
            this.doFind();
        }else{
            const index: number = this.books.findIndex(book => book.id === parseInt(value));

            loan.book = index > -1 ? this.books[index].clone() : new Book();

            this.$nextTick(() => {
                if(!loan.book.id){
                    //Notify invalid book
                }
            })
        }
    }
    public onAddOrEdit(){
        this.books = [];
        this.rows = 0;

        this.doFind();
    }
    public doFind(){
        if(!this.isBeingRequest){
            this.isBeingRequest = true;

            Axios.get(this.baseApi, {responseType: "json", 
            params:{offset: this.books.length, limit: 3}, 
            headers:{ "Authorization": Session.get("token")}
            }). then((response: AxiosResponse) =>{
                if(get(response, "data.status") === StatusCode.OPERATION_COMPLETE){
                    this.books.push(...Book.instanceFrom(get(response, "data.data")))
                    this.rows = get(response, "data.rows", 0);
                }else{
                    //notify status code 
                }
            }).catch((error: AxiosError)=> {
                console.error(error); 
                //notify conn. error
            }).finally(()=> {
                this.isBeingRequest = false;
            });
        }
    }
}

</script>