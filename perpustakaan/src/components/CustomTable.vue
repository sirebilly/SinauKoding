<template>
    <div class="customTable">
        <div class="table-wrapper">
            <div class="d-flex">
                <slot name="title"/>
                <button v-if="canAdd" type="button">
                    Add
                </button>
            </div>
            <pagination rootTag="table" rootClass="table table-bordered" renderContainerTag="tbody" renderContainerClass="table-body"
            :isBeingRequest="isBeingRequest" 
            :offset="offset" :limit="limit" 
            :datas="records" :rows="rows" 
            :maxLengthPagination="5" 
            @onPagination="doFind">
                <thead>
                    <slot name="renderedTh"/>
                    <th v-if="hasAction" class="text-center">Actions</th>  
                </thead>
                <tr slot="onRenderedData" slot-scope="{data, index}">
                    <slot name="renderedTd" :record="record" :data="data" :index="index"/>
                    <td v-if="hasAction" class="d-md-flex justify-content-center align-items-center align-middle">
                        <template v-if="record && record.id === data.id">
                            <button type="button" class="btn btn-sm btn-primary m-2 mt-md-0 mb-md-0" @click="()=> doSave(index)">Save</button>
                            <button type="button" class="btn btn-sm btn-warning m-2 mt-md-0 mb-md-0" @click="onCancelAddOrEdit">Cancel</button>
                        </template>
                        <button type="button" v-if="canEdit" class="btn btn-sm btn-primary m-2 mt-md-0 mb-md-0" @click="onAddOrEdit">Edit </button>
                        <button type="button" v-if="canEdit" class="btn btn-sm btn-danger m-2 mt-md-0 mb-md-0" @click="onDelete">Delete</button>
                    </td>
                </tr>
                <tr slot="onRequestOrEmptyData" class="text-center">
                    <span v-if="isBeingRequest" class="spinnes-border text-dark" role="status">
                        <span class="sr-only"></span>
                    </span>
                    <span v-else>No data found</span>
                </tr>
            </pagination>
        </div>
    </div>
</template>

<script lang="ts">
import baseEntity from '@/entity/BaseEntity';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {get} from 'lodash';
import Pagination from '@/components/Pagination.vue';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import Session from '@/common/Session';
import StatusCode from '@/common/StatusCodes';
import { Deserialize } from 'cerialize';


@Component({
    components:{
        Pagination,
    }
})
export default class customTable<E extends baseEntity> extends Vue{
    @Prop({default: ""})
    public baseApi!: string;
    @Prop({default: baseEntity})
    public entity!: new() =>E;
    @Prop({default: () => true})
    public validate!:(record: E) => boolean;
    @Prop({default: 1})
    public totalColumn!:number;
    @Prop({default: true})
    public canAdd!:boolean;
    @Prop({default: true})
    public canEdit!:boolean;
    @Prop({default: true})
    public canDelete!:boolean;

    public isBeingRequest:boolean = false;

    public record: E = null;

    public records: Array<E> = [];
    public offset: number = 0;
    public limit: number = 5;
    public rows: number = 0;
    public get hasAction(){
        return this.canAdd || this.canEdit || this.canDelete;
    }

    public created(){
        this.doFind();
    }
    
    public onAddOrEdit(record: E = null){
        if(this.record !== null){
            //Notify finish previous step or cancel it
        }
        else{
            if(record === null){
                this.record = new this.entity();
                this.records.unshift(new this.entity());
            }else{
                this.record = record.clone();
            }
  
            this.$emit("onAddOrEdit");
        }
    }

    public onCancelAddOrEdit(){
        if(this.record!==null){
            if(!this.record.id){
                this.records.splice(0,1);
            }
            //Notify Cancel edit/add data
            this.$nextTick(() => this.record = null);
        }
    }

    public doFind(offset: number = this.offset, revert?: Function){
        if(!this.isBeingRequest){
            this.isBeingRequest = true;

            Axios.get(this.baseApi, {responseType: "json", 
            params:{offset, limit: this.limit}, 
            headers:{ "Authorization": Session.get("token")}
            }). then((response: AxiosResponse) =>{
                if(get(response, "data.status") === StatusCode.OPERATION_COMPLETE){
                    this.records = Deserialize(get(response, "data.data", []), this.entity);
                    this.rows = get(response, "data.rows", 0);
                    this.offset = offset;
                }else{
                    //notify status code
                }
            }).catch((error: AxiosError)=> {
                console.error(error); 
                //notify conn. error

                if(typeof revert === 'function'){
                    revert();
                }
            }).finally(()=> {
                this.isBeingRequest = false;
            });
        }
    }

    public doSave(index: number){
        if (this.validate(this.record)){
            this.isBeingRequest = true
            Axios.request({
                url: this.baseApi, 
                responseType: "json", 
                data: this.record.serialize(), 
                method: this.record.id ? "put" : "post", 
                headers: {"Authorization": Session.get("token")}
            }).then((response: AxiosResponse) => {
                const status: string = get(response, "data.status");

                if(status === StatusCode.SAVE_SUCCESS || status === StatusCode.UPDATE_SUCCESS){
                    this.$set(this.records, index, get(response, "data.data"));

                    this.$nextTick(() => this.record = null);
                }

                //Notify status
            }).catch((error: AxiosError) => {
                console.error(error);

                //Notify conn failed
            }).finally(() => {
                this.isBeingRequest = false;
            });
        }else{
            //Notify fill all field
        }
    }

    public doDelete(record: E, index: number){
        //Confirmation Alert
        if(record.id && confirm("Are you sure you want to delete this?")){
            this.isBeingRequest = true;

            Axios.delete(`${this.baseApi}${record.id}`,{
                responseType:"json", 
                headers: {"Authorization": Session.get("token")}
            }).then((response: AxiosResponse) => {
                const status: string = get(response, "data.status");

                if(status === StatusCode.DELETE_SUCCESS){
                    this.records.splice(index,1);
                }

                //Notify status
            }).catch((error: AxiosError) => {
                console.error(error);

                //Notify conn. failed
            }).finally(()=>{
                this.isBeingRequest = false;
            });
        }

        
    }
}

</script>

<style scoped>

</style>