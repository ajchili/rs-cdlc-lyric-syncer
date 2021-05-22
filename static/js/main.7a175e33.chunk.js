(this["webpackJsonprs-cdlc-lyric-syncer"]=this["webpackJsonprs-cdlc-lyric-syncer"]||[]).push([[0],{19:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n(1),r=n.n(a),c=n(9),s=n.n(c),l=n(2),o=n(3),u=n(5),d=n(4),p=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(l.a)(this,n),(i=t.call(this,e)).audioInputValueChanged=function(){var e=i.props.setMedia;if(e){var t=i.audioInput.current.files[0],n=URL.createObjectURL(t);e(t.name,t.type,n)}},i.selectAudioSource=function(){i.audioInput.current.click()},i.audioInput=r.a.createRef(),i}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{className:"uk-button uk-button-default uk-button-small",onClick:this.selectAudioSource,children:"Select Audio Source"}),Object(i.jsx)("input",{type:"file",accept:"audio/*",ref:this.audioInput,onChange:this.audioInputValueChanged,hidden:!0})]})}}]),n}(a.Component),h={SPACE:"Play/Pause",H:"Add lyric at current time",J:"End lyric at current time",K:"End verse at current time"},j=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderHotkeys=function(){var e=[];for(var t in h)e.push(Object(i.jsxs)("span",{children:[Object(i.jsx)("strong",{children:t})," - ",h[t]]}));return e.map((function(e,t){return Object(i.jsx)("li",{children:e},t)}))},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.id,t=void 0===e?"help-modal":e;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("a",{className:"uk-button uk-button-text",href:"#".concat(t),"uk-toggle":"target: #".concat(t),children:"Help"}),Object(i.jsx)("div",{id:t,className:"uk-flex-top","uk-modal":"true",children:Object(i.jsxs)("div",{className:"uk-modal-dialog uk-modal-body uk-margin-auto-vertical",children:[Object(i.jsx)("button",{className:"uk-modal-close-default",type:"button","uk-close":"true"}),Object(i.jsx)("h1",{className:"uk-heading-line uk-margin-top",children:Object(i.jsx)("span",{children:"Hotkeys"})}),Object(i.jsx)("ul",{className:"uk-list",children:this.renderHotkeys()}),Object(i.jsx)("h1",{className:"uk-heading-line uk-margin-top",children:Object(i.jsx)("span",{children:"Syntax"})}),Object(i.jsx)("ul",{className:"uk-list",children:Object(i.jsxs)("li",{children:["To specify syllables in a word, add a lyric per syllable, specifying a ",Object(i.jsx)("strong",{children:"- (hyphen)"})," at the end of each lyric"]})})]})})]})}}]),n}(a.Component),m=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{className:"uk-margin-top",children:[Object(i.jsx)(j,{}),Object(i.jsx)("a",{className:"uk-button uk-button-text uk-margin-left",href:"https://github.com/ajchili/rs-cdlc-lyric-syncer",target:"_blank",children:"Github"}),Object(i.jsx)("a",{className:"uk-button uk-button-text uk-margin-left",href:"https://github.com/ajchili/rs-cdlc-lyric-syncer/issues/new",target:"_blank",children:"Report an Issue"})]})}}]),n}(a.Component),b=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsx)("div",{className:"uk-margin-top",children:Object(i.jsx)("h1",{className:"uk-heading-line uk-text-center",children:Object(i.jsx)("span",{children:"Better UltraStar Creator"})})})}}]),n}(a.Component),f=n(10),y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.full,n=void 0!==t&&t,a=e.type,r=void 0===a?"default":a,c=e.onClick,s=void 0===c?function(){}:c,l=e.text,o=e.title,u=void 0===o?null:o;return Object(i.jsx)("button",{className:"uk-button uk-button-".concat(r," uk-button-small ").concat(n&&"uk-width-1-1"),onClick:function(e){s&&s(e)},title:u,children:l})}}]),n}(a.Component),v=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(l.a)(this,n),(i=t.call(this,e)).importFromTextfield=function(){var e=i.props.onImportLyrics,t=i.state.lyrics;if(null!=t&&0!==t.length){for(var n=t;n.includes("\n");)n=n.replace("\n"," ");n=n.split(" ");var a,r=[],c=Object(f.a)(n);try{for(c.s();!(a=c.n()).done;){a.value.split("-").forEach((function(e,t,n){n.length-1===t?r.push(e):r.push("".concat(e,"-"))}))}}catch(s){c.e(s)}finally{c.f()}e(r)}},i.importFromFile=function(){i.lyricInput.current.click()},i.lyricInputValueChanged=function(){var e=i.lyricInput.current.files[0],t=new FileReader;t.onload=i.parseLyricsFromFile,t.readAsText(e)},i.parseLyricsFromFile=function(e){var t=i.props.onImportPoints,n=e.target.result.split("\n"),a=(n.filter((function(e){return e.startsWith("#GAP")}))[0]||"#GAP:0").split(":")[1];a=parseInt(a,10)/1e3;var r=(n.filter((function(e){return e.startsWith("#BPM")}))[0]||"#BPM:100").split(":")[1];r=parseInt(r,10);for(var c=n.filter((function(e){return!e.startsWith("#")&&!e.startsWith("E")})),s=[],l=0;l<c.length;l++){var o=c[l],u=o.startsWith(":"),d=o.startsWith("-"),p=o.split(" "),h=parseInt(p[1],10)/1e3,j=h+parseInt(p[2],10)/1e3,m=h/r*15e3+a,b=j/r*15e3+a;if(d)s.push({color:"#FF0000",editable:!0,labelText:"(end of verse)",time:m});else if(u)if(s.push({color:"#666",editable:!0,labelText:p[p.length-1],time:m}),l+1<c.length){var f=c[l+1];j!==parseInt(f.split(" ")[1],10)/1e3&&s.push({color:"#0000FF",editable:!0,labelText:"(end of lyric)",time:b})}else s.push({color:"#FF0000",editable:!0,labelText:"(end of verse)",time:b})}t(s)},i.state={lyrics:""},i.lyricInput=r.a.createRef(),i}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.state.lyrics;return Object(i.jsx)("div",{className:"uk-card uk-card-default uk-card-body",children:Object(i.jsxs)("div",{className:"uk-flex uk-flex-column uk-height-1-1",children:[Object(i.jsx)("h3",{className:"uk-card-title",children:"Import Lyrics"}),Object(i.jsx)("textarea",{className:"uk-textarea uk-flex-1",placeholder:"Lyrics",style:{resize:"none"},value:t,onChange:function(t){t.stopPropagation(),e.setState({lyrics:t.target.value})}}),Object(i.jsxs)("div",{className:"uk-margin-top",children:[Object(i.jsx)(y,{full:!0,text:"Import From Textfield",onClick:this.importFromTextfield}),Object(i.jsx)(y,{full:!0,text:"Import From File",onClick:this.importFromFile}),Object(i.jsx)("input",{type:"file",accept:"text/plain",ref:this.lyricInput,onChange:this.lyricInputValueChanged,hidden:!0})]})]})})}}]),n}(a.Component),x=n(12),k=n(11),O=n.n(k),g=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.clear,n=void 0===t?function(){}:t,a=e.lyrics;return Object(i.jsx)("div",{className:"uk-width-1-3 uk-grid-item-match",children:Object(i.jsxs)("div",{className:"uk-flex uk-flex-column uk-height-1-1",style:{height:"35vh"},children:[Object(i.jsx)("h5",{className:"uk-heading-bullet",children:Object(i.jsxs)("span",{children:["Next Lyric: ",Object(i.jsx)("strong",{children:a[0]})]})}),Object(i.jsx)("div",{className:"uk-flex-1",style:{maxHeight:"100%",overflowY:"scroll"},children:Object(i.jsx)("ul",{className:"uk-list uk-list-striped",children:a.slice(1).map((function(e,t){return Object(i.jsx)("li",{children:e},t)}))})}),Object(i.jsx)("div",{className:"uk-margin-top",children:Object(i.jsx)(y,{full:!0,text:"Clear",onClick:n})})]})})}}]),n}(a.Component),w=window.AudioContext||window.webkitAudioContext,N=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(l.a)(this,n),(i=t.call(this,e)).initializePeaks=function(){var e=i.props.media;i.setState({instance:null}),i.audio.current.setAttribute("src",e.url),i.audio.current.setAttribute("type",e.type),i.audio.current.load(),i.audio.current.playbackRate=1;var t=new w,n={containers:{overview:document.getElementById("overview-container"),zoomview:document.getElementById("zoomview-container")},emitCueEvents:!0,mediaElement:i.audio.current,webAudio:{audioContext:t,scale:64,multiChannel:!0},keyboard:!0,showPlayheadTime:!0,zoomLevels:[64,128,256,512,1024,2048,4096,8192]};O.a.init(n,(function(e,t){i.setState({instance:t,playbackSpeed:1}),e?console.error(e.message):(console.log("Peak instance initialized."),t.on("points.enter",(function(e){var t="#666"===e.color;i.setState({currentLyric:t?e.labelText:null})})),t.on("points.dblclick",i.editLyric),document.querySelector('input[data-action="change-volume"]').onchange=i.changeVolume,document.querySelector('input[data-action="change-playback-speed"]').onchange=i.changePlaybackSpeed)}))},i.addEventListeners=function(){document.onkeydown=i.handleKeyDown},i.download=function(e,t,n){var i="".concat(t," - ").concat(e," lyrics.txt"),a=new Blob([n],{type:"data:text/plain;"}),r=URL.createObjectURL(a),c=document.createElement("a");c.setAttribute("href",r),c.setAttribute("download",i),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)},i.export=function(){var e=i.props.media,t=i.state.instance;if(null!==t){var n=prompt("Song title",e.title);if(null!==n&&0!==n.trim().length){var a=prompt("Artist","");if(null!==a&&0!==a.trim().length){var r=prompt("BPM","100");if(null!==r&&0!==r.trim().length){r=parseInt(r,10);var c=t.points.getPoints().sort((function(e,t){return e.time-t.time})),s=1e3*(c.length>0?c[0].time:0),l=r/15e3,o=["#TITLE:".concat(n),"#ARTIST:".concat(a),"#BPM:".concat(r),"#GAP:".concat(Math.floor(s))].concat(Object(x.a)(c.map((function(e,t){if("#0000FF"===e.color)return null;var n="#FF0000"===e.color,i=1e3*e.time,a=Math.floor((i-s)*l);if(n)return"- ".concat(t>0?Math.max(a+1,a):a);var r=1;if(t+1<c.length){var o=1e3*c[t+1].time,u=Math.floor((o-s)*l);r=Math.max(1,u-a)}var d=e.labelText;return"-"===d.slice(-1)&&(d=d.substr(0,d.length-1)),t>0&&"#FF0000"===c[t-1].color||t>0&&"-"!==c[t-1].labelText.slice(-1)?": ".concat(a," ").concat(r," 0  ").concat(d):": ".concat(a," ").concat(r," 0 ").concat(d)}))),["E"]).filter((function(e){return null!==e}));i.download(n,a,o.join("\n"))}}}}},i.handleKeyDown=function(e){switch(e.code.toLowerCase()){case"space":i.togglePaused();break;case"keyh":i.addLyric();break;case"keyj":i.addEndOfLyric();break;case"keyk":i.addEndOfVerse();break;default:console.log(e)}},i.clearLyrics=function(){i.setState({importedLyrics:[]},i.resizeView)},i.addLyric=function(){var e=i.state,t=e.importedLyrics,n=e.instance;if(null!==n){var a=i.audio.current.paused,r=n.player.getCurrentTime(),c="";if(t.length>0)c=t[0],i.setState({importedLyrics:t.slice(1)},i.resizeView);else if(n.player.pause(),null===(c=prompt("Please provide a lyric",""))||0===c.trim().length)return void(a||n.player.play());n.points.add({time:r,labelText:c,editable:!0,color:"#666"}),a||n.player.play()}},i.editLyric=function(e){var t=i.state.instance;if(null!==t)if("#666"!==e.color)window.confirm("Do you want to delete this end marker?")&&t.points.removeById(e.id);else{var n=prompt("Update lyric, leave blank to remove",e.labelText);null!==n&&0!==n.trim().length?e.update({labelText:n}):t.points.removeById(e.id)}},i.addEndOfLyric=function(){var e=i.state.instance;if(null!==e){var t=i.audio.current.paused;e.player.pause(),e.points.add({time:e.player.getCurrentTime(),labelText:"(end of lyric)",editable:!0,color:"#0000FF"}),t||e.player.play()}},i.addEndOfVerse=function(){var e=i.state.instance;if(null!==e){var t=i.audio.current.paused;e.player.pause(),e.points.add({time:e.player.getCurrentTime(),labelText:"(end of verse)",editable:!0,color:"#FF0000"}),t||e.player.play()}},i.changeVolume=function(){if(null!==i.state.instance){var e=parseFloat(document.querySelector('input[data-action="change-volume"]').value)||0;i.audio.current.volume=e}},i.changePlaybackSpeed=function(){if(null!==i.state.instance){var e=parseFloat(document.querySelector('input[data-action="change-playback-speed"]').value)||1;i.audio.current.playbackRate=e,i.setState({playbackSpeed:e})}},i.togglePaused=function(){var e=i.state.instance;if(null!==e){var t=i.audio.current.paused;i.setState({currentLyric:null,playButtonText:t?"Pause":"Play"}),t?e.player.play():e.player.pause()}},i.zoomIn=function(){var e=i.state.instance;null!==e&&e.zoom.zoomIn()},i.zoomOut=function(){var e=i.state.instance;null!==e&&e.zoom.zoomOut()},i.resizeView=function(){var e=i.state.instance;null!==e&&[e.views.getView("zoomview"),e.views.getView("overview")].forEach((function(e){return e.fitToContainer()}))},i.state={importedLyrics:[],instance:null,currentLyric:null,playButtonText:"Play",playbackSpeed:1},i.audio=r.a.createRef(),window.addEventListener("resize",i.resizeView),i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.initializePeaks(),this.addEventListeners()}},{key:"componentDidUpdate",value:function(){var e=this,t=this.props,n=t.lyrics,i=void 0===n?[]:n,a=t.points,r=void 0===a?[]:a,c=t.resetLyrics,s=t.resetPoints;r.length>0?s((function(){var t=e.state.instance;t.points.removeAll(),r.forEach((function(e){return t.points.add(e)}))})):i.length>0&&c((function(){e.setState({importedLyrics:i},e.resizeView)}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.media,a=t.toggleImportView,r=this.state,c=r.importedLyrics,s=r.instance,l=r.currentLyric,o=r.playButtonText,u=r.playbackSpeed;return Object(i.jsxs)("div",{className:"uk-card uk-card-default uk-card-body",children:[Object(i.jsx)("h3",{className:"uk-card-title",children:n.title}),Object(i.jsx)("h4",{className:"uk-heading-bullet",children:Object(i.jsx)("span",{children:l})}),Object(i.jsxs)("div",{"uk-grid":"true",children:[Object(i.jsxs)("div",{id:"peaks-container",className:"uk-width-expand",children:[Object(i.jsx)("div",{id:"zoomview-container",style:{height:"20vh"}}),Object(i.jsx)("div",{id:"overview-container",style:{height:"15vh"}})]}),c.length>0&&Object(i.jsx)(g,{clear:this.clearLyrics,lyrics:c})]}),null===s?Object(i.jsxs)("dl",{className:"uk-description-list",children:[Object(i.jsx)("dt",{children:"Processing song data..."}),Object(i.jsxs)("dd",{children:['Please wait as "',n.title,'" is processed...']}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{"uk-spinner":"ratio: 1"})]}):Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("div",{className:"uk-form-stacked",children:[Object(i.jsxs)("div",{"uk-grid":"true",className:"uk-margin-top uk-child-width-expand",children:[Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{className:"uk-form-label",children:"Controls"}),Object(i.jsxs)("div",{className:"uk-button-group",children:[Object(i.jsx)(y,{onClick:this.togglePaused,text:o,title:"(SPACE)"}),Object(i.jsx)(y,{onClick:this.zoomIn,text:"Zoom in"}),Object(i.jsx)(y,{onClick:this.zoomOut,text:"Zoom out"})]})]}),Object(i.jsxs)("div",{children:[Object(i.jsxs)("label",{className:"uk-form-label",children:["Playback Speed (",u,"x)"]}),Object(i.jsx)("div",{className:"uk-form-controls",children:Object(i.jsx)("input",{className:"uk-range","data-action":"change-playback-speed",type:"range",defaultValue:"1",min:"0.25",max:"1",step:"0.01"})})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{className:"uk-form-label",children:"Volume"}),Object(i.jsx)("div",{className:"uk-form-controls",children:Object(i.jsx)("input",{className:"uk-range","data-action":"change-volume",type:"range",defaultValue:"1",min:"0",max:"1",step:"0.01"})})]})]}),Object(i.jsxs)("div",{className:"uk-margin-top",children:[Object(i.jsx)("label",{className:"uk-form-label",children:"Lyric Options"}),Object(i.jsxs)("div",{className:"uk-button-group",children:[Object(i.jsx)(y,{onClick:function(){return a(e.resizeView)},text:"Import",type:"secondary"}),Object(i.jsx)(y,{onClick:this.export,text:"Save",type:"primary"}),Object(i.jsx)(y,{onClick:this.addLyric,text:"Add lyric at current time",title:"(H)"}),Object(i.jsx)(y,{onClick:this.addEndOfLyric,text:"End lyric at current time",title:"(J)"}),Object(i.jsx)(y,{onClick:this.addEndOfVerse,text:"End verse at current time",title:"(K)"})]})]})]})}),Object(i.jsx)("audio",{ref:this.audio,hidden:!0})]})}}]),n}(a.Component),C=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(l.a)(this,n),(i=t.call(this,e)).setMedia=function(e,t,n){i.setState({media:null},(function(){i.setState({media:{title:e,type:t,url:n}})}))},i.setLyrics=function(e,t){i.setState({lyrics:e},t)},i.setPoints=function(e,t){i.setState({points:e},t)},i.toggleImportView=function(e){var t=i.state.showImportView;i.setState({showImportView:!t},e)},i.state={lyrics:[],media:null,points:[],showImportView:!1},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setState({media:null})}},{key:"render",value:function(){var e=this,t=this.state,n=t.lyrics,a=t.media,r=t.points,c=t.showImportView;return Object(i.jsxs)("div",{className:"uk-container",children:[Object(i.jsx)(b,{}),Object(i.jsx)(p,{setMedia:this.setMedia}),Object(i.jsxs)("div",{"uk-grid":"true",className:"uk-margin-top",children:[Object(i.jsx)("div",{className:"uk-width-expand",children:null!==a&&Object(i.jsx)(N,{lyrics:n,media:a,points:r,toggleImportView:this.toggleImportView,resetLyrics:function(t){return e.setLyrics([],e.toggleImportView(t))},resetPoints:function(t){return e.setPoints([],e.toggleImportView(t))}})}),c&&Object(i.jsx)("div",{className:"uk-width-1-3 uk-grid-item-match",children:Object(i.jsx)(v,{onImportLyrics:this.setLyrics,onImportPoints:this.setPoints})})]}),Object(i.jsx)(m,{})]})}}]),n}(a.Component);s.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(C,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.7a175e33.chunk.js.map