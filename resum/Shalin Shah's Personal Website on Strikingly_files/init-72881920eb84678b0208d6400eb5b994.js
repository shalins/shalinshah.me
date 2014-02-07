(function() {
var e;
e = $.noConflict(!0), window.$ || (window.$ = window.jQuery = e), $(function() {
var e, t;
return t = new Bobcat.SocialMediaConfig({
url:$S.page_meta.social_media_config.url,
fb_app_id:$S.page_meta.social_media_config.fb_app_id,
title:$S.page_meta.social_media_config.title,
image:$S.page_meta.social_media_config.image,
description:$S.page_meta.social_media_config.description
}), window.social_media_config = t, window.slide_navigator = new Bobcat.Navigator(), 
$B.isStatic() ? window.edit_page = new Bobcat.ShowPage({}) :(window.edit_page = new Bobcat.ShowPage(data), 
window.page_tranformers = new Bobcat.PageTransformer($("body"), !1), window.page_tranformers.transform()), 
window.edit_page.init(), window.slide_navigator.init(), e = {
page_id:$S.page_meta.id,
permalink:$S.page_meta.permalink,
membership:$S.page_meta.user.membership,
created_at:$S.page_meta.created_at,
showStrikinglyLogo:$S.page_meta.show_strikingly_logo
}, Bobcat.PageAE = new Bobcat.PageAnalyticsEngine(e, $S.conf.grepdata_source), $("meta[name=mode]").attr("content") ? void 0 :(Bobcat.PageAE.logPageView(), 
Bobcat.PageAE.startPing());
});
}).call(this);