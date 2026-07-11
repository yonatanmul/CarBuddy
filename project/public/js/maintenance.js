function checkPrice(treatType) {
    var cat = "service";
    if (treatType === "החלפת צמיגים" || treatType === "החלפת בלמים") {
        cat = "parts";
    }
    window.location = "/pricing/" + cat;
}
