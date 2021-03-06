
var userController = function(params) {

    var validationCode = null;
    var btnValidate = null;
    var btnSave = null;

    function initData() {
        validationCode = ge("validationCode");
        btnValidate = ge("btnValidate");
        btnSave = ge("btnSave");
    }

    function doSave(evt) {
        EventHelper.cancel(evt);
    }

    function doValidate(evt) {
        EventHelper.cancel(evt);

        var code = validationCode.value.trim();
        if (isStringEmpty(code)) {
            validationCode.focus();
            return;
        }

        queryHelper.requestUserData({
            action: "validate",
            code: code
        }, validateCallback);
    }

    function validateCallback(payload) {
        if (payload && payload.data && payload.data.length > 0) {
            var isActive = payload.data[0].IsActive == 1;
            if (isActive) {
                ge("validationTextRow").style.display = "";
                ge("validationInputRow").style.display = "none";
                ge("validationCodePane").style.display = "";
            }
        }
    }

    function init() {
        initData();
        btnSave.onclick = doSave;
        if (btnValidate)
            btnValidate.onclick = doValidate;
    }

    init();
};
