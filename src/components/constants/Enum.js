export default LoanDurationTypeEnum =
{
    Daily: 1,
    Weekly: 2,
    Monthly: 3,
    Quarterly: 4,
    Yearly: 5,
    Byweekly: 6,
}
export const BorrowerTypeEnum =
{
    Borrower: 1,
    CoBorrower: 2,
    Guarantor: 3
}

export const LoanStatusEnum = {
    PendingReview: 1,
    BranchManagerReviewed: 2,
    OnGoing: 3,
    EmiPaid: 4,
    EmiUnpaid: 5,
    PendingOnAO: 6,
    PendingOnOps: 7,
    PendingOnDis: 8,
    RejectedByBM: 9,
    RejectedByAO: 10,
    RejectedByOps: 11,
    RejectedByDis: 12
};

export const LoanStatusEnumMessage = {
    PendingReview: { text: "Pending Review", color: "#158E3A" },
    BranchManagerReviewed: { text: "Branch Manager Reviewed", color: "#E10004" },
    OnGoing: { text: "On going", color: "#E10004" },
    EmiPaid: { text: "Emi Paid", color: "#20262E" },
    EmiUnpaid: { text: "Emi Unpaid", color: "#158E3A" },
    PendingOnAO: { text: "Pending on AO", color: "#E10004" },
    PendingOnOps: { text: "Pending on Ops", color: "#E10004" },
    PendingOnDis: { text: "Pending on Dis", color: "#025B12" },
    RejectedByBM: { text: "Rejected by BM", color: "#E10004" },
    RejectedByAO: { text: "Rejected by AO", color: "#E10004" },
    RejectedByOps: { text: "Rejected by Ops", color: "#158E3A" },
    RejectedByDis: { text: "Rejected by Dis", color: "#20262E" },
};