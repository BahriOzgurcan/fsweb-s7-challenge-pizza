import * as Yup from "yup";

const formSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(2, "İsim en az 2 karakter olmalıdır")
        .required(),
    size: Yup
        .string()
        .required(),
    thickness: Yup
        .string()
        .required(),
    quantity: Yup
        .number()
        .integer()
        .min(1, "1 adetten az pizza secimi yapilamaz"),
    special_note: Yup
        .string(),
});

export default formSchema
