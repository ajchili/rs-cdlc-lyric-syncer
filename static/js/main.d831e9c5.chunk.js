(this["webpackJsonprs-cdlc-lyric-syncer"]=this["webpackJsonprs-cdlc-lyric-syncer"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),o=n.n(c),i=n(7),r=n.n(i),l=n(2),u=n(3),s=n(5),d=n(4),m=function(e){Object(s.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).audioInputValueChanged=function(){var e=a.props.setMedia;if(e){var t=a.audioInput.current.files[0],n=URL.createObjectURL(t);e(t.name,t.type,n)}},a.selectAudioSource=function(){a.audioInput.current.click()},a.audioInput=o.a.createRef(),a}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small",onClick:this.selectAudioSource,children:"Select Audio Source"}),Object(a.jsx)("input",{type:"file",accept:"audio/*",ref:this.audioInput,onChange:this.audioInputValueChanged,hidden:!0})]})}}]),n}(c.Component),b=function(e){Object(s.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"uk-margin-top",children:Object(a.jsx)("h1",{className:"uk-heading-line uk-text-center",children:Object(a.jsx)("span",{children:"Better UltraStar Creator"})})})}}]),n}(c.Component),p=n(9),j=n(8),h=n.n(j),y=window.AudioContext||window.webkitAudioContext,v=function(e){Object(s.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).initializePeaks=function(){var e=a.props.media;a.setState({instance:null}),a.audio.current.setAttribute("src",e.url),a.audio.current.setAttribute("type",e.type),a.audio.current.load();var t=new y,n={containers:{overview:document.getElementById("overview-container"),zoomview:document.getElementById("zoomview-container")},emitCueEvents:!0,mediaElement:a.audio.current,webAudio:{audioContext:t,scale:64,multiChannel:!0},keyboard:!0,showPlayheadTime:!0,zoomLevels:[64,128,256,512,1024,2048,4096,8192]};h.a.init(n,(function(e,t){a.setState({instance:t}),e?console.error(e.message):(console.log("Peak instance initialized."),t.on("points.enter",(function(e){var t="#666"===e.color;a.setState({currentLyric:t?e.labelText:null})})),t.on("points.dblclick",a.editLyric),document.querySelector('button[data-action="toggle-paused"]').onclick=a.togglePaused,document.querySelector('button[data-action="zoom-in"]').onclick=a.zoomIn,document.querySelector('button[data-action="zoom-out"]').onclick=a.zoomOut,document.querySelector('button[data-action="add-lyric"]').onclick=a.addLyric,document.querySelector('button[data-action="end-lyric"]').onclick=a.addEndOfLyric,document.querySelector('button[data-action="end-verse"]').onclick=a.addEndOfVerse,document.querySelector('input[data-action="change-volume"]').onchange=a.changeVolume)}))},a.addEventListeners=function(){document.onkeydown=a.handleKeyDown},a.download=function(e,t,n){var a="".concat(t," - ").concat(e," lyrics.txt"),c=new Blob([n],{type:"data:text/plain;"}),o=URL.createObjectURL(c),i=document.createElement("a");i.setAttribute("href",o),i.setAttribute("download",a),i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)},a.export=function(){var e=a.props.media,t=a.state.instance;if(null!==t){var n=prompt("Song title",e.title);if(null!==n&&0!==n.trim().length){var c=prompt("Artist","");if(null!==c&&0!==c.trim().length){var o=prompt("BPM","100");if(null!==o&&0!==o.trim().length){o=parseInt(o,10);var i=t.points.getPoints().sort((function(e,t){return e.time-t.time})),r=1e3*(i.length>0?i[0].time:0),l=o*(1/60)*.001,u=["#TITLE:".concat(n),"#ARTIST:".concat(c),"#BPM:".concat(o),"#GAP:".concat(Math.floor(r))].concat(Object(p.a)(i.map((function(e,t){if("#0000FF"===e.color)return null;var n="#FF0000"===e.color,a=1e3*e.time,c=Math.floor((a-r)*l);if(n)return"- ".concat(t>0?Math.max(c+1,c):c);var o=1;if(t+1<i.length){var u=1e3*i[t+1].time,s=Math.floor((u-r)*l);o=Math.max(1,s-c)}var d=e.labelText;return"-"===d.slice(-1)&&(d=d.substr(0,d.length-1)),t>0&&"#FF0000"===i[t-1].color||t>0&&"-"!==i[t-1].labelText.slice(-1)?": ".concat(c," ").concat(o," 0  ").concat(d):": ".concat(c," ").concat(o," 0 ").concat(d)}))),["E"]).filter((function(e){return null!==e}));a.download(n,c,u.join("\n"))}}}}},a.handleKeyDown=function(e){switch(e.code.toLowerCase()){case"space":a.togglePaused();break;case"keyh":a.addLyric();break;case"keyj":a.addEndOfLyric();break;case"keyk":a.addEndOfVerse();break;default:console.log(e)}},a.addLyric=function(){var e=a.state.instance;if(null!==e){var t=a.audio.current.paused;e.player.pause();var n=prompt("Please provide a lyric","");null!==n&&0!==n.trim().length?(e.points.add({time:e.player.getCurrentTime(),labelText:n,editable:!0,color:"#666"}),t||e.player.play()):t||e.player.play()}},a.editLyric=function(e){var t=a.state.instance;if(null!==t)if("#666"!==e.color)window.confirm("Do you want to delete this end marker?")&&t.points.removeById(e.id);else{var n=prompt("Update lyric, leave blank to remove",e.labelText);null!==n&&0!==n.trim().length?e.update({labelText:n}):t.points.removeById(e.id)}},a.addEndOfLyric=function(){var e=a.state.instance;if(null!==e){var t=a.audio.current.paused;e.player.pause(),e.points.add({time:e.player.getCurrentTime(),labelText:"(end of lyric)",editable:!0,color:"#0000FF"}),t||e.player.play()}},a.addEndOfVerse=function(){var e=a.state.instance;if(null!==e){var t=a.audio.current.paused;e.player.pause(),e.points.add({time:e.player.getCurrentTime(),labelText:"(end of verse)",editable:!0,color:"#FF0000"}),t||e.player.play()}},a.changeVolume=function(){if(null!==a.state.instance){var e=parseFloat(document.querySelector('input[data-action="change-volume"]').value)||0;a.audio.current.volume=e}},a.togglePaused=function(){var e=a.state.instance;if(null!==e){a.setState({currentLyric:null});var t=a.audio.current.paused;document.querySelector('button[data-action="toggle-paused"]').textContent=t?"Pause":"Play",t?e.player.play():e.player.pause()}},a.zoomIn=function(){var e=a.state.instance;null!==e&&e.zoom.zoomIn()},a.zoomOut=function(){var e=a.state.instance;null!==e&&e.zoom.zoomOut()},a.state={instance:null,currentLyric:null},a.audio=o.a.createRef(),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.initializePeaks(),this.addEventListeners()}},{key:"render",value:function(){var e=this.props.media,t=this.state,n=t.instance,c=t.currentLyric;return Object(a.jsxs)("div",{className:"uk-card uk-card-default uk-card-body uk-margin-top",children:[Object(a.jsx)("h3",{className:"uk-card-title",children:e.title}),Object(a.jsx)("h4",{className:"uk-heading-bullet",children:Object(a.jsx)("span",{children:c})}),Object(a.jsxs)("div",{id:"peaks-container",children:[Object(a.jsx)("div",{id:"zoomview-container"}),Object(a.jsx)("div",{id:"overview-container"})]}),null===n?Object(a.jsxs)("dl",{className:"uk-description-list",children:[Object(a.jsx)("dt",{children:"Processing song data..."}),Object(a.jsxs)("dd",{children:['Please wait as "',e.title,'" is processed...']}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{"uk-spinner":"ratio: 1"})]}):Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:"uk-form-stacked",children:[Object(a.jsxs)("div",{className:"uk-margin-top",children:[Object(a.jsx)("label",{className:"uk-form-label",children:"Controls"}),Object(a.jsxs)("div",{className:"uk-button-group",children:[Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"toggle-paused",title:"(SPACE)",children:"Play"}),Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"zoom-in",children:"Zoom in"}),Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"zoom-out",children:"Zoom out"}),Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"add-lyric",title:"(H)",children:"Add a lyrics at current time"}),Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"end-lyric",title:"(J)",children:"End lyrics at current time"}),Object(a.jsx)("button",{className:"uk-button uk-button-default uk-button-small","data-action":"end-verse",title:"(K)",children:"End verse at current time"})]})]}),Object(a.jsxs)("div",{className:"uk-margin-top",children:[Object(a.jsx)("label",{className:"uk-form-label",children:"Volume"}),Object(a.jsx)("div",{className:"uk-form-controls",children:Object(a.jsx)("input",{className:"uk-range","data-action":"change-volume",type:"range",defaultValue:"1",min:"0",max:"1",step:"0.01"})})]}),Object(a.jsx)("div",{className:"uk-margin-top",children:Object(a.jsx)("button",{className:"uk-button uk-button-primary uk-button-small",onClick:this.export,children:"Export"})})]})}),Object(a.jsx)("audio",{ref:this.audio,hidden:!0})]})}}]),n}(c.Component),f=function(e){Object(s.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).setMedia=function(e,t,n){a.setState({media:null},(function(){a.setState({media:{title:e,type:t,url:n}})}))},a.state={media:null},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.setState({media:null})}},{key:"render",value:function(){var e=this.state.media;return Object(a.jsxs)("div",{className:"uk-container",children:[Object(a.jsx)(b,{}),Object(a.jsx)(m,{setMedia:this.setMedia}),null!==e&&Object(a.jsx)(v,{media:e})]})}}]),n}(c.Component);r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(f,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.d831e9c5.chunk.js.map