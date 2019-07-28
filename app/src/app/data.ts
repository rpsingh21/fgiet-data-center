export const fee_form = {
    fee: {
        year: null,
        amount: null,
        branch: null,
        fee_type: null,
        total_fee: null,
        challan_no: "",
        transfer_id: null,
        transfer_date: null,
        mode_of_payment: null
    },
    basic: {
        dob: null,
        name: null,
        year: null,
        email: null,
        image: null,
        branch: null,
        gender: null,
        address: null,
        roll_no: null,
        category: null,
        sub_category: "",
        addhar_no: null,
        mobile_no: null,
        father_name: null,
        mother_name: null,
        father_mobile_no: null,
        mother_mobile_no: "",
        mode_of_admission: null,
        mode_of_admission_category: null
    },
    academics: [
        {
            text: "HighSchool",
            board: null,
            marks: null,
            academic_type: "HighSchool"
        },
        {
            text: "Intermediate",
            board: null,
            marks: null,
            academic_type: "Intermediate"
        },
        {
            text: "Ug or Diploma",
            board: null,
            marks: null,
            academic_type: "UgOrDiploma"
        }
    ],
    semesters: [
        {
            marks: null,
            semester: null,
            total_marks: null
        }
    ]
};

export const fee_form_errors = {
    fee: null,
    basic: null,
    academics: null,
    semesters: null
};

export const filter_form = {
    roll_no: "",
    form_id: "",
    session: "2019-20",
    status: "",
    branch: "1",
    fee_type: "",
    mode_of_payment: "",
    year: "",
    transfer_date_to: "",
    transfer_date_from: ""
};
