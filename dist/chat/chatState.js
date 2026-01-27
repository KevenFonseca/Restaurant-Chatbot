export var ChatState;
(function (ChatState) {
    ChatState["START"] = "START";
    ChatState["MENU"] = "MENU";
    ChatState["ORDERING"] = "ORDERING";
    ChatState["CHECKOUT"] = "CHECKOUT";
    ChatState["PAYMENT"] = "PAYMENT";
    ChatState["COMPLETED"] = "COMPLETED";
    ChatState["CANCELLED"] = "CANCELLED";
})(ChatState || (ChatState = {}));
