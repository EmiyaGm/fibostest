exports.getcw = (scnumber, scprice, totalnumber, totalprice) => {
    var from = {
        supply: scnumber,
        price: scprice
    }
    var to = {
        supply: totalnumber,
        price: totalprice
    }
    var cw1 = 0;
    var cw2 = 1;
    n = 0
    while (true) {
        var cw = (cw1 + cw2) / 2;
        if (Math.abs(cw1 - cw2) < 0.001){
            console.log(cw)
            break;
        }

        var r = from.supply * from.price * cw;
        var s = from.supply;
        var t = to.supply - from.supply;

        var e = r * (Math.pow(t / s + 1, 1 / cw) - 1);

        var p = (r + e) / (to.supply * cw);

        var dp = p - to.price;
        if (dp > 0)
            cw1 = cw;
        else
            cw2 = cw;
    }
    console.log(cw)
}