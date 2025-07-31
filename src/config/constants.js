const UserRole = {
    ADMIN: "admin",
    DONOR: "donor",
    RECIPIENT: "recipient",
    BLOOD_BANK:"blood_bank"
}
const bloodType = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-"

}
const Gender={
    MALE:"male",
    FEMALE:"female",
    OTHER:"other"
}
const UserStatus={
    ACTIVE:"active",
    INACTIVE:"inactive"
}


module.exports = {UserRole, bloodType , Gender, UserStatus}