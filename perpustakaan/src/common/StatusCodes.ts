import Vue from 'vue';

export default class StatusCode{
    public static SAVE_SUCCESS: string = "0010";
    public static SAVE_FAILED: string = "0011";
    public static UPDATE_FAILED: string = "0012";
    public static UPDATE_SUCCESS: string = "0013";
    public static DELETE_SUCCESS: string = "0014";
    public static DELETE_FAILED: string = "0015";
    public static UPLOAD_FAILED: string = "0016";
    public static UPLOAD_SUCCESS: string = "0017";
    public static CONNECTION_FAILED: string = "0018";
    public static SYSTEM_EXCEPTION: string = "0019";
    public static DB_EXCEPTION: string = "0020";
    public static DATA_NOT_FOUND: string = "0021";

    public static LOGIN_SUCCESS: string = "1101";
    public static LOGIN_FAILED: string = "1102";
    public static PASSWORD_OR_USER_NOT_REGISTERED: string = "1103";
    public static USER_EXIST: string = "1104";
    public static USER_NOT_VERIFIED_YET: string = "1105";
    public static PASSWORD_NOT_VALID: string = "1106";
    public static TOKEN_NOT_VALID: string = "1107";
    public static ILLEGAL_ACCESS: string = "1108";
    public static PAYMENT_REQUIRED: string = "1109";

    public static INPUT_NOT_VALID: string = "1111";
    public static OPERATION_COMPLETE: string = "1112";
    public static OPERATION_FAILED: string = "1113";

    public static MAIL_EXIST: string = "1201";
    public static MAIL_NOT_FOUND: string = "1202";
    public static USERNAME_EXIST: string = "1203";
}

Vue.prototype.getStatusCode = () => StatusCode;

declare module "vue/types/vue"{
    interface Vue{
        getStatusCode(): typeof StatusCode
    }
}