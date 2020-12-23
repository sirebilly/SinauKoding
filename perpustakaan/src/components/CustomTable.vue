<template>
    <div class="custom-table table-responsive">
        <div class="table-wrapper">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <slot name="title" />
                <button v-if="canAdd" type="button" class="btn btn-info"
                        @click="() => onAddOrEdit()">
                    Add
                </button>
            </div>
            <pagination rootTag="table" rootClass="table table-bordered" 
                        renderContainerTag="tbody" renderContainerClass="table-body"
                        :isBeingRequest="isBeingRequest"
                        :offset="offset" :limit="limit"
                        :datas="records" :rows="rows"
                        :maxLengthPagination="5"
                        @onPagination="doFind">
                <thead>
                    <tr>
                        <slot name="renderedTh" />
                        <th v-if="hasAction" class="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tr slot="onRenderedData" slot-scope="{data,index}">
                    <slot name="renderedTd" :record="record" :data="data" :index="index"/>
                    <td v-if="hasAction" 
                        class="d-md-flex justify-content-center align-item-center align-middle">
                        <template v-if="record && record.id === data.id">
                            <button type="button"
                                    class="btn btn-sm btn-primary m-2 mt-md-0 mb-md-0"
                                    @click="() => doSave(index)">
                                Save
                            </button>

                            <button type="button" 
                                    class="btn btn-sm btn-warning m-2 mt-md-0 mb-md-0 text-white"
                                    @click="onCancelAddOrEdit">
                                Cancel
                            </button>
                        </template>
                        <button v-if="canEdit && data.id && !record" type="button"
                                class="btn btn-sm btn-warning m-2 mt-md-0 mb-md-0 text-white"
                                @click="() => onAddOrEdit(data)">
                            Edit
                        </button>
                        <button v-if="canDelete && data.id && !record" type="button"
                                class="btn btn-sm btn-danger m-2 mt-md-0 mb-md-0"
                                @click="() => doDelete(data, index)">
                            Delete
                        </button>
                    </td>
                </tr>
                <tr slot="onRequestOrEmptyData" class="text-center">
                    <td :colspan="(totalColumn + (hasAction ? 1: 0))">
                        <span v-if="isBeingRequest" class="spinner-border text-dark" role="status">
                            <span class="sr-only"> </span>
                        </span>
                        <span v-else>No data found</span>
                    </td>
                </tr>
            </pagination>            
        </div>
    </div>
</template>

<script lang="ts">
    import { get } from 'lodash';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import Axios, {AxiosResponse, AxiosError} from "axios";
    import Pagination from './Pagination.vue';

    import baseEntity from "../entity/BaseEntity";
    import Session from "./../common/Session";
    import StatusCode from '../common/StatusCodes';


    import { Deserialize, Serialize } from 'cerialize';
    

    

    @Component({components: {Pagination}})
    export default class CustomTable<E extends baseEntity> extends Vue{
        @Prop({default: ""})
        public baseApi!: string;

        @Prop({default: baseEntity})
        public entity!: new () => E;

        @Prop({default: () => true})
        public validate: (record: E) => boolean;

        @Prop({default: 1})
        public totalColumn: number;

        @Prop({default: true})
        public canAdd: boolean;

        @Prop({default: true})
        public canEdit: boolean;

        @Prop({default: true})
        public canDelete: boolean;

        public isBeingRequest: boolean = false;

        public record: E = null;

        public records: Array<E> = [];

        public offset: number = 0;

        public limit: number = 5;

        public rows: number = 0;

        public get hasAction(){
            return this.canAdd || this.canEdit || this.canDelete
        }

        public created(){
            this.doFind();
        }

        public onAddOrEdit(record: E = null){
            if (this.record !== null){
                this.$notify({
                    group: 'StatusCodes',
                    title: 'Please finish previous step or cancel it'
                });
            }else{
                // console.log("OnAddOrEdit")
                if (record === null){
                    this.record = new this.entity();
                    this.records.unshift(new this.entity());
                    // console.log(this.record, this.records)
                }else{
                    this.record = record.clone();
                }
                // console.log("test")
                this.$emit('onAddOrEdit');

            }
        }

        public onCancelAddOrEdit(){
            if (this.record !==null){
                if(!this.record.id){
                    this.records.splice(0,1);
                }

                //Notification.snackbar(`Cancel ${this.record.id ? "edit" : "add new"} data`);
                this.$notify({
                    group:'StatusCodes',
                    title:`Cancel ${this.record.id ? "edit" : "add new"} data`
                });


                this.$nextTick(() => this.record = null);
            }
        }

        public doFind(offset: number = this.offset, revert?: Function){
            if (!this.isBeingRequest){
                this.isBeingRequest = true;

                Axios.get(this.baseApi,{
                    responseType: "json",
                    params: {offset, limit: this.limit},
                    headers: {"Authorization": Session.get("token")}
                }).then((response: AxiosResponse) =>{
                    if(get(response,"data.status") === StatusCode.OPERATION_COMPLETE){
                        // console.log(response);
                        this.records = Deserialize(get(response, "data.data", []), this.entity);
                        // console.log(178, this.records);
                        this.rows = get(response, "data.rows", 0);
                        this.offset = offset;
                    }else{
                        //Notification.snackbar(StatusCode.DATA_NOT_FOUND);
                        this.$notify({
                            group:'StatusCodes',
                            title:"Data not found"
                        });
                    }
                }).catch((error: AxiosError) => {
                    console.error(error);

                    //Notification.snackbar(StatusCode.CONNECTION_FAILED);
                    this.$notify({
                        group:'StatusCodes',
                        title: "Connection Failed"
                    });

                    

                    if(typeof revert === "function"){
                        revert();
                    }
                }).finally(() =>{
                    this.isBeingRequest = false;
                });
            }
        }

        public doSave(index: number){
            if (this.validate(this.record)){
                this.isBeingRequest = true;
                // console.log(this.record);
                Axios.request({
                    url: this.baseApi,
                    responseType: 'json',
                    data: this.record.serialize(),
                    method: this.record.id ? 'put' : 'post',
                    headers: {'Authorization': Session.get("token")}
                }).then((response: AxiosResponse) => {
                    const status: string = get(response, 'data.status');
                    if(status === StatusCode.SAVE_SUCCESS || status === StatusCode.UPDATE_SUCCESS || status === StatusCode.OPERATION_COMPLETE){
                        this.$set(this.records, index, Deserialize(get(response, "data.data"), this.entity));

                        this.$nextTick(() => this.record = null);

                        this.$notify({
                            group:'notif',
                            title:status
                        });
                    }
                }).catch((error: AxiosError) =>{
                    console.error(error);

                    this.$notify({
                        group:'StatusCodes',
                        title:StatusCode.CONNECTION_FAILED
                    });
                }).finally(()=>{
                    this.isBeingRequest = false;
                })
            }else{
                this.$notify({
                    group:'notif',
                    title:'Please fill all field'
                });
            }
        }

        public doDelete(record: E, index: number){
            if (record.id && confirm("Are you sure delete this?")){
                this.isBeingRequest = true;

                Axios.delete(`${this.baseApi}${record.id}`,{
                    responseType: 'json',
                    headers: {'Authorization': Session.get("token")}  
                }).then((response: AxiosResponse) =>{
                    const status: string = get(response, "data.status");

                    if(status === StatusCode.DELETE_SUCCESS){
                        this.records.splice(index, 1);
                    }

                    this.$notify({
                        group:'notif',
                        title:status
                    });

                }).catch((error: AxiosError) =>{
                    console.error(error);

                    this.$notify({
                        group:'notif',
                        title:StatusCode.CONNECTION_FAILED
                    });
                }).finally(() => {
                    this.isBeingRequest = false;
                });
            }
        }
    }
</script>