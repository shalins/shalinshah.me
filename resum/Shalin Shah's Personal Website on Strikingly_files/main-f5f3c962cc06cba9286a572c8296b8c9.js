(function() {
window.runAfterDomBinding.add("onyxnew", function() {
var t, e, n, i, r, o, a, s, l, u, c;
return $B.TH.applyTouchNav(), o = $("#s-nav"), a = $("#s-nav-placeholder"), r = function() {
return o.is(":visible") ? o.offset().top :0;
}, s = r(), l = function() {
return o.hasClass("fixed") ? (o.removeClass("fixed"), a.hide()) :void 0;
}, u = function() {
var t, e;
if ($B.TH.isSmallScreen() ? $("#s-nav").css({
display:"none"
}) :$("#s-nav").css({
display:"block"
}), e = $(document).scrollTop(), !window.edit_page.isShowPage || $B.TH.isSmallScreen()) return l(), 
void 0;
if (e > s + 2) {
if (!o.hasClass("fixed")) return t = o.height(), o.addClass("fixed"), a.addClass("s-nav").height(t).show();
} else if (s > e) return l();
}, o.is(":visible") && (u(), $(window).scroll(u), $(window).resize(u)), $(".email-form-container").each(function() {
return $(this).find(".input").each(function() {
var t, e, n;
return n = $(this).find("label.outside"), "none" !== n.css("display") ? (e = $(this).find("input, textarea"), 
t = function() {
return "" === e.val() ? n.show() :n.hide();
}, e.keypress(function() {
return "" === e.val() ? n.hide() :void 0;
}), e.keyup(t), e.blur(t), e.focus(function() {
return n.hide();
}), n.click(function() {
return e.focus();
})) :void 0;
});
}), $B.TH.enableAnimationForBlocks("95%"), i = [], $(".wide").each(function() {
var t;
return t = $(this), t.hasClass("experience-section") || t.hasClass("projects-section") ? i.push("w") :t.hasClass("image") ? i.push("i") :i.push("-");
}), n = function(t, e) {
var n;
return n = function(t) {
var e, n, i, r, o;
for (i = 0, n = r = 0, o = t.length; o > r; n = ++r) e = t[n], n > 0 && "i" !== e && e === t[n - 1] && (i -= 1);
return i;
}, n(t) > n(e);
}, c = [].concat(i), e = null, t = function(r) {
var o, a, s, l, u;
if (r === i.length) return (null === e || n(c, e)) && (e = [].concat(c)), void 0;
for (a = [ "g", "w" ], "-" !== i[r] && (a = [ i[r] ]), u = [], s = 0, l = a.length; l > s; s++) o = a[s], 
c[r] = o, u.push(t(r + 1));
return u;
}, t(0), $(".wide").each(function(t) {
var n;
return n = $(this), "g" === e[t] ? (n.removeClass("white"), n.addClass("gray")) :"w" === e[t] ? (n.removeClass("gray"), 
n.addClass("white")) :void 0;
});
});
}).call(this);