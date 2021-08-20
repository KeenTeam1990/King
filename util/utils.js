module.exports = {
  transTime: function (e) {
    var t = new Date(1e3 * parseInt(e)),
        n = t.getFullYear(),
        r = t.getMonth() + 1,
        a = t.getDate(),
        s = t.getHours(),
        g = t.getMinutes(),
        o = t.getSeconds(),
        u = new Date();
    Date.parse(u.toDateString());
    return n + "-" + r + "-" + a + " " + s + ":" + g + ":" + o;
  }
};