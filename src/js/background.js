(()=>{
    "use strict";
    let e, t = chrome;
    function o(o, s=null, r=[]) {
        e.get(s, (n=>{
            t.runtime.lastError ? (e = t.storage.local,
            e.get(s, (e=>{
                o(e, ...r)
            }
            ))) : o(n, ...r)
        }
        ))
    }
    function s(o) {
        e.set(o, (()=>{
            t.runtime.lastError && (e = t.storage.local,
            e.set(o))
        }
        ))
    }
    const r = ("object" == typeof browser && "object" == typeof browser.runtime && (t = browser),
    e = t.storage.local,
    "object" == typeof t.storage.sync && (e = t.storage.sync),
    t)
      , n = {
        hide_feed: !0,
        hide_redirect_home: !1,
        hide_sidebar: !0,
        hide_recommended: !0,
        hide_chat: !0,
        hide_playlists: !0,
        hide_donate: !0,
        hide_transcript: !0,
        hide_endscreen: !0,
        hide_cards: !0,
        hide_comments: !1,
        hide_prof: !1,
        hide_mix: !1,
        hide_merch: !0,
        hide_meta: !1,
        hide_bar: !1,
        hide_channel: !1,
        hide_desc: !1,
        hide_header: !1,
        hide_notifs: !0,
        hide_moreyt: !0,
        hide_search: !0,
        hide_trending: !1,
        hide_shorts: !1,
        hide_subs: !1,
        hide_autoplay: !0,
        hide_annotations: !0,
        yt_on: !1,
        popup_settings: {
            dark_mode: !1,
            sidebar_tree: !1,
            comment_tree: !0,
            meta_tree: !0,
            header_tree: !1
        }
    };
    function i(e) {
        const t = e ? "-off" : "";
        r.browserAction.setIcon({
            path: {
                16: `images/icon${t}-16.png`,
                32: `images/icon${t}-32.png`,
                48: `images/icon${t}-48.png`,
                128: `images/icon${t}-128.png`
            }
        })
    }
    r.runtime.onInstalled.addListener((({reason: e})=>{
        "install" === e && r.tabs.create({
            url: "src/welcome.html"
        })
    }
    )),
    
    r.runtime.setUninstallURL("src/uninstall.html");
    let c = {
        hide_feed: !1,
        hide_redirect_home: !1,
        hide_trending: !1,
        hide_subs: !1,
        yt_off: !1
    };
    const d = Object.keys(c);
    function a(e) {
        c = e
    }
    function h() {
        o(a, d)
    }
    function p(e, t) {
        r.tabs.update(t, {
            url: e
        })
    }
    o((function(o) {
        const r = Object.keys(o).length;
        0 === r ? s(n) : function(e, t) {
            return t !== Object.keys(n).length || Object.keys(n).some((t=>!Object.prototype.hasOwnProperty.call(e, t))) || Object.keys(e.popup_settings).length !== Object.keys(n.popup_settings).length
        }(o, r) && (Object.keys(n).forEach((e=>{
            Object.prototype.hasOwnProperty.call(o, e) ? "boolean" == typeof n[e] ? n[e] = o[e] : Object.keys(n[e]).forEach((t=>{
                Object.prototype.hasOwnProperty.call(o[e], t) && (n[e][t] = o[e][t])
            }
            )) : "hide_transcript" === e && Object.prototype.hasOwnProperty.call(o, "hide_sidebar") ? n[e] = o.hide_sidebar : "yt_on" === e && Object.prototype.hasOwnProperty.call(o, "yt_off") && (n[e] = !o.yt_off)
        }
        )),
        e.clear((()=>{
            t.runtime.lastError && (e = t.storage.local,
            e.clear())
        }
        )),
        s(n)),
        i(o.yt_off || n.yt_off)
    }
    )),
    h(),
    r.storage.onChanged.addListener((e=>{
        for (let t = 0; t < d.length; t += 1)
            if (Object.prototype.hasOwnProperty.call(e, d[t])) {
                "yt_off" === d[t] && i(e.yt_off.newValue),
                h();
                break
            }
    }
    )),
    r.webRequest.onBeforeRequest.addListener((({url: e, tabId: t})=>{
        c.yt_off || ((c.hide_trending && /^https:\/\/.*\.youtube\.com\/feed\/(trending|explore)/.test(e) || c.hide_subs && -1 !== e.indexOf("subscriptions")) && p("https://www.youtube.com", t),
        c.hide_redirect_home && c.hide_feed && !c.hide_subs && /^https:\/\/.*\.youtube\.com\/(?:\?.*)?$/.test(e) && p("https://www.youtube.com/feed/subscriptions", t))
    }
    ), {
        urls: ["https://*.youtube.com/", "https://*.youtube.com/?*", "https://*.youtube.com/feed/trending*", "https://*.youtube.com/feed/explore*", "https://*.youtube.com/feed/subscriptions*"],
        types: ["main_frame", "sub_frame", "xmlhttprequest"]
    })
}
)();
